static class InteractionDiagramTests
{
    public static int Run(string parent)
    {
        var count = 0;
        void Assert(bool value, string name) { if (!value) throw new Exception("Interaction diagram test failed: " + name); Console.WriteLine("PASS: " + name); count++; }
        void Reject(Action action, string expected)
        {
            string message = ""; try { action(); } catch (Exception e) { message = e.Message; }
            Assert(message.Contains(expected, StringComparison.Ordinal), "interaction validation: " + expected);
        }
        Diagram D(string id, string type) => new(id, type, id, "docs/uml/" + id + ".puml", "generated", "active", null, [], [], [], []);
        var sequence = D("parking-sequence", "sequence");
        var communication = D("parking-communication", "communication") with { InteractionSource = sequence.Id };
        var overview = D("parking-overview", "interaction-overview") with { InteractionSource = sequence.Id };
        var timing = D("parking-timing", "timing") with { Maintenance = "manual", Status = "template", InteractionSource = sequence.Id };
        const string source = """
            @startuml
            ' diagram-id: parking-sequence
            actor "Garage user" as User
            participant "Service" as Service
            participant "Garage" as Garage
            participant "Spot" as Spot
            note over Service
              An external validation call is a source boundary.
            end note
            User -> Service : Park(vehicle)
            alt capacity < 1
              Service --> User : Rejected
            else capacity >= 1
              Service -> Garage : Park(vehicle)
              alt Fits(vehicle) is true
                Garage -> Spot : Park(vehicle)
                Spot --> Garage : Completed
                Garage --> Service : Completed
                Service --> User : Success
              else Fits(vehicle) is false
                Garage --> Service : DoesNotFit
                Service --> User : Failure
              end
            end
            @enduml
            """;
        var definition = new GeneratedCodeDiagram(source, new() { ["Service"] = ["App/Service.cs"], ["Garage"] = ["App/Garage.cs"], ["Spot"] = ["App/Spot.cs"] });
        var sourceView = CodeDiagrams.View(sequence, definition);
        var interaction = InteractionDiagrams.Capture(sequence.Id, "park-vehicle", Uml.Hash(source), sourceView);
        var comm = InteractionDiagrams.Generate(communication, interaction);
        var flow = InteractionDiagrams.Generate(overview, interaction);
        Assert(interaction.Messages.Length == sourceView.Edges.Length && interaction.Messages.Select(m => m.Id).Distinct().Count() == interaction.Messages.Length, "shared interaction captures every call and reply exactly once");
        Assert(interaction.Branches.Length == 4 && interaction.Branches.All(b => b.Id.StartsWith("park-vehicle/parking-sequence/branch-", StringComparison.Ordinal)) &&
            interaction.Messages.All(m => m.BranchIds.All(id => interaction.Branches.Any(b => b.Id == id))), "branch identities and nested guard context are explicit shared data");
        Assert(Uml.Serialize(interaction) == Uml.Serialize(InteractionDiagrams.Capture(sequence.Id, "park-vehicle", Uml.Hash(source), sourceView)), "interaction identities are deterministic for the same snapshot");
        Assert(comm.View.Nodes.Length == sourceView.Sequence!.Participants.Length && comm.View.Nodes.All(n => n.StoryId == "park-vehicle" && n.Reference!.DiagramId == sequence.Id), "communication preserves the exact participants and links every object to its story and sequence");
        var represented = comm.View.Edges.SelectMany(e => e.MessageIds!).ToArray();
        Assert(represented.Length == interaction.Messages.Length && represented.Distinct().Order().SequenceEqual(interaction.Messages.Select(m => m.Id).Order()), "grouped communication links retain every message without loss or duplication");
        Assert(comm.View.Edges.Where(e => e.Kind == "reply").SelectMany(e => e.MessageIds!).All(id => interaction.Messages.Single(m => m.Id == id).Reply), "communication retains reply semantics separately from calls");
        var service = comm.View.Nodes.Single(n => n.Name == "Service");
        Assert(service.Files.SequenceEqual(["App/Service.cs"]) && service.Members.Any(m => m.Contains("capacity < 1")) && service.Members.Any(m => m.Contains("Rejected")), "communication details preserve original guards, message text and C# source provenance");
        var implicitElse = InteractionDiagrams.Capture(sequence.Id, "park-vehicle", "fixture", CodeDiagrams.View(sequence, definition with { Puml = source.Replace("else capacity >= 1", "else otherwise") }));
        Assert(InteractionDiagrams.Generate(communication, implicitElse).View.Nodes.SelectMany(n => n.Members).Any(m => m.Contains("otherwise of (capacity < 1)")), "otherwise guards retain their enclosing condition instead of becoming ambiguous labels");
        Assert(flow.View.Nodes.Any(n => n.Kind == "interaction") && flow.View.Nodes.Count(n => n.Kind == "decision") == 2 &&
            interaction.Branches.All(b => flow.View.Edges.Any(e => e.Label == b.Label)), "overview references and decision edges preserve every source branch");
        Assert(interaction.Messages.All(m => flow.View.Nodes.SelectMany(n => n.Members).Count(t => t.StartsWith(m.Number + ":", StringComparison.Ordinal)) == 1), "overview segments partition the original messages exactly once");
        var rejected = flow.View.Nodes.Single(n => n.Members.Any(m => m.Contains("Rejected")));
        Assert(flow.View.Edges.Where(e => e.Source == rejected.Id).All(e => flow.View.Nodes.Single(n => n.Id == e.Target).Kind == "final"), "a rejected root reply terminates its overview path before any success interactions");
        Assert(flow.View.Nodes.Where(n => n.Kind is "interaction" or "decision").All(n => n.Reference is not null && sourceView.Nodes.Any(s => s.Id == n.Reference.NodeId)), "every overview reference and decision opens a real source sequence element");
        Assert(comm.Definition.Puml.Contains(interaction.SourceHash) && flow.Definition.Puml.Contains(interaction.SourceHash), "both PUML projections declare the same captured sequence fingerprint");
        Assert(comm.View.Notes!.Any(n => n.Contains("external validation call")) && comm.Definition.Puml.Contains("external validation call"), "communication retains the source extraction boundaries in notes and exported provenance");
        var nonterminalReply = definition with { Puml = source.Replace("Service --> User : Rejected", "Service --> User : Rejected\nUser -> Service : Another request") };
        Reject(() => InteractionDiagrams.Generate(overview, InteractionDiagrams.Capture(sequence.Id, "park-vehicle", "fixture", CodeDiagrams.View(sequence, nonterminalReply))), "without losing messages");
        var root = Path.Combine(parent, "interaction-projections");
        var manifest = new Manifest(1, ["App/App.csproj"], [], [communication, overview, sequence]);
        var code = new CodeDiagramSet([], [new(sequence.Id, "Service.Park", "App/Service.cs", 1, [], "park-vehicle")],
            new(StringComparer.Ordinal) { [sequence.Id] = definition });
        var model = new Model([], [], new(StringComparer.Ordinal), code);
        void Write(string file, string text) => Uml.Write(Uml.At(root, file), text);
        var outputs = Uml.Outputs(root, manifest, model);
        foreach (var (file, text) in outputs) Write(file, text);
        Assert(StoryDiagrams.StoryIds(communication, model).SequenceEqual(["park-vehicle"]) && StoryDiagrams.StoryIds(overview, model).SequenceEqual(["park-vehicle"]) && StoryDiagrams.StoryIds(timing, model).SequenceEqual(["park-vehicle"]), "derived interactions and illustrative timing inherit their source use-case ID");
        Write(sequence.File, source.Replace("Rejected", "stale hand-edited label"));
        Assert(outputs.SequenceEqual(Uml.Outputs(root, manifest, model)), "projections use the captured code definition even when generated PUML files are edited");
        var changedCode = code with { Diagrams = new(StringComparer.Ordinal) { [sequence.Id] = definition with { Puml = source.Replace("Rejected", "GarageFull") } } };
        var changed = model with { CodeDiagrams = changedCode };
        var next = Uml.Outputs(root, manifest, changed);
        Assert(next[sequence.File].Contains("GarageFull") && next[communication.File].Contains("GarageFull") && next[overview.File] != outputs[overview.File], "source-message changes regenerate sequence, communication and overview together");
        Assert(Uml.Check(root, manifest, changed, false) == 1, "changed interaction data fails stale-output checks across its projections");
        Write("docs/uml/registry.json", Uml.Serialize(new Registry([])));
        Reject(() => Uml.Validate(root, manifest with { Diagrams = [communication with { InteractionSource = "missing" }, sequence] }, model), "interactionSource");
        Reject(() => Uml.Validate(root, manifest with { Diagrams = [communication with { StoryIds = ["wrong-story"] }, sequence] }, model), "disagree");
        Reject(() => InteractionDiagrams.Source(communication with { InteractionSource = null }, new Dictionary<string, InteractionModel>()), "interactionSource");
        return count;
    }
}
