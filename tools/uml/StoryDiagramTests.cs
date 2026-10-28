using System.Text.Json;
using UseCaseManagement;

static class StoryDiagramTests
{
    public static int Run(string parent)
    {
        var root = Path.Combine(parent, "story-diagrams");
        var count = 0;
        void Assert(bool value, string name) { if (!value) throw new Exception("Story diagram test failed: " + name); Console.WriteLine("PASS: " + name); count++; }
        void Reject(Action action, string expected)
        {
            string message = ""; try { action(); } catch (Exception e) { message = e.Message; }
            Assert(message.Contains(expected, StringComparison.Ordinal), "story validation: " + expected);
        }
        void Write(string path, string content) => Uml.Write(Uml.At(root, path), content);
        const string source = "UseCases/garage/park-vehicle.md";
        const string story = """
            # Park vehicle

            **Goal:** Park a valid vehicle safely.
            **Actor:** Garage user

            ## Flow
            1. Request parking.
            2. Validate capacity.
            3. Confirm parking.

            ## Alternatives
            - **Full:** Reject without changes. <!-- after: 2; outcome: end -->

            ## Done when
            - The parked vehicle is confirmed.

            ```yaml
            id: park-vehicle
            priority: required
            requirements: [GAR-01]
            ```
            """;
        const string code = """
            namespace Garage.Documentation {
                [System.AttributeUsage(System.AttributeTargets.Method)]
                public sealed class UseCaseAttribute(string id) : System.Attribute { }
                [System.AttributeUsage(System.AttributeTargets.Method)]
                public sealed class SequenceViewAttribute(string id) : System.Attribute {
                    public int MaxDepth { get; set; }
                }
            }
            namespace Demo {
                public sealed class Service {
                    [Garage.Documentation.UseCase("park-vehicle")]
                    [Garage.Documentation.SequenceView("story-sequence", MaxDepth = 0)]
                    public int Park() => 1;
                }
            }
            """;
        Write("App/App.csproj", "<Project />"); Write("App/Service.cs", code);
        Write("UseCases/requirements/README.md", "- **GAR-01 — Parking:** Park valid vehicles.");
        Write("UseCases/optional/README.md", "# Optional enhancements"); Write(source, story);
        Write("UseCases/garage/unlinked.md", story.Replace("Park vehicle", "Unlinked goal").Replace("id: park-vehicle", "id: unlinked"));
        Diagram D(string id, string type, string[]? storyIds = null) => new(id, type, id, "docs/uml/" + id + ".puml", "generated", "active", type == "class" ? "App/App.csproj" : null, [], [], [], [], storyIds);
        var reviewed = D("reviewed", "activity", ["park-vehicle"]) with { Maintenance = "reviewed", TrackFiles = ["App/Service.cs"] };
        Write(reviewed.File, "@startuml\n' diagram-id: reviewed\nstart\n:Validate parking;\nstop\n@enduml\n");
        var manifest = new Manifest(1, ["App/App.csproj"], [], [D("use-cases", "use-case"), D("story-sequence", "sequence"), D("story-activity", "activity", ["park-vehicle"]), D("classes", "class"), reviewed]);
        var model = Uml.Extract(root, manifest);
        var outputs = Uml.Outputs(root, manifest, model);
        var sequence = outputs["docs/uml/story-sequence.puml"];
        var activity = outputs["docs/uml/story-activity.puml"];
        Assert(sequence.Contains("Garage user") && sequence.Contains("park-vehicle — Park vehicle") && outputs["docs/uml/use-cases.puml"].Contains("Unlinked goal"), "story metadata drives sequence actor and all requirements use cases, including goals without code");
        var traces = StoryDiagrams.Traces(manifest, model);
        var parking = traces.Single(s => s.Id == "park-vehicle");
        Assert(parking.Implementations.Single().Member == "Demo.Service.Park()" && parking.Diagrams.Contains("classes") && parking.Diagrams.Contains("reviewed") && parking.Diagrams.Contains("story-sequence") && parking.Diagrams.Contains("story-activity"), "one story ID links requirements, code, sequence, reviewed behavior and shared class structure");
        Assert(traces.Single(s => s.Id == "unlinked").Implementations.Length == 0, "unlinked stories never claim an implementation");
        var graph = CodeDiagrams.View(manifest.Diagrams[2], StoryDiagrams.Activity(manifest.Diagrams[2], model.Stories!));
        var decision = graph.Nodes.Single(n => n.Kind == "decision");
        var rejection = graph.Nodes.Single(n => n.Name == "Reject without changes.");
        var confirmation = graph.Nodes.Single(n => n.Name == "Confirm parking.");
        Assert(graph.Edges.Any(e => e.Source == decision.Id && e.Target == rejection.Id && e.Label == "yes") && graph.Edges.Any(e => e.Source == decision.Id && e.Target == confirmation.Id && e.Label == "no") && graph.Edges.Where(e => e.Source == rejection.Id).All(e => graph.Nodes.Single(n => n.Id == e.Target).Kind == "final"), "explicit alternative anchor creates the correct guarded termination without entering the success path");
        Assert(graph.Nodes.Where(n => n.Kind == "action").All(n => n.Files.SequenceEqual([source])) && activity.Contains("Done when:"), "activity source links and acceptance notes come from the same story");
        using (var json = JsonDocument.Parse(outputs["docs/uml/diagrams.generated.js"].Split('=', 2)[1].Trim().TrimEnd(';')))
        {
            Assert(json.RootElement.GetProperty("stories").GetArrayLength() == 2 && json.RootElement.GetProperty("views").GetProperty("use-cases").GetProperty("nodes").EnumerateArray().Any(n => n.GetProperty("storyId").GetString() == "park-vehicle"), "browser snapshot includes traceability and direct story navigation on use cases");
        }
        var baseline = new SortedDictionary<string, Review>(StringComparer.Ordinal) { [reviewed.Id] = new(Uml.Fingerprints(reviewed, model), Uml.Hash(File.ReadAllText(Uml.At(root, reviewed.File))), "Fixture reviewed.") };
        Write("docs/uml/state/reviews.json", Uml.Serialize(baseline));
        foreach (var (path, content) in outputs) Write(path, content);
        Assert(Uml.Check(root, manifest, model, true) == 0, "baseline story links pass strict checks");
        Write(source, story.Replace("# Park vehicle", "# Park safely").Replace("Garage user", "Garage attendant").Replace("Validate capacity.", "Check available capacity.").Replace("Reject without changes.", "Explain the full garage."));
        Assert(outputs.SequenceEqual(Uml.Outputs(root, manifest, model)), "one captured story snapshot feeds all outputs even if Markdown changes during generation");
        var changed = Uml.Extract(root, manifest);
        var refreshed = Uml.Outputs(root, manifest, changed);
        Assert(refreshed["docs/uml/use-cases.puml"].Contains("Park safely") && refreshed["docs/uml/story-sequence.puml"].Contains("Garage attendant") && refreshed["docs/uml/story-activity.puml"].Contains("Check available capacity.") && refreshed["docs/uml/story-activity.puml"].Contains("Explain the full garage."), "editing story metadata, steps and alternatives updates their diagrams together");
        Assert(refreshed["docs/uml/index.html"].Contains("Park safely — requirements flow") && refreshed["docs/uml/diagrams.generated.js"].Contains("Park safely"), "story title edits also update browser navigation and diagram headings");
        Assert(Uml.Fingerprints(reviewed, model)[source] != Uml.Fingerprints(reviewed, changed)[source] && Uml.Check(root, manifest, changed, true) == 1, "story edits detect generated drift and flag the related reviewed diagram");
        foreach (var (path, content) in refreshed) Write(path, content);
        Assert(Uml.Check(root, manifest, changed, false) == 0 && Uml.Check(root, manifest, changed, true) == 1, "regeneration clears drift while a changed story still requires behavioral review");
        Write(source, story.Replace(" <!-- after: 2; outcome: end -->", ""));
        Reject(() => StoryDiagrams.Activity(manifest.Diagrams[2], CatalogueStore.Load(root)), "every alternative needs an explicit");
        Write(source, story.Replace("after: 2", "after: 99")); Reject(() => CatalogueStore.Load(root), "unknown Flow step");
        Write(source, story.Replace("outcome: end", "outcome: guess")); Reject(() => CatalogueStore.Load(root), "outcome: end");
        Write(source, story); Write("App/Service.cs", code.Replace("UseCase(\"park-vehicle\")", "UseCase(\"missing\")"));
        Reject(() => Uml.Extract(root, manifest), "Service.cs:");
        return count;
    }
}
