static class Tests
{
    public static int Run()
    {
        var root = Path.Combine(Path.GetTempPath(), "garage-uml-tests-" + Guid.NewGuid().ToString("N"));
        Directory.CreateDirectory(root);
        int count = 0;
        void Assert(bool condition, string name)
        {
            if (!condition) throw new Exception("Self-test failed: " + name);
            Console.WriteLine("PASS: " + name);
            count++;
        }
        void Throws(Action action, string name)
        {
            bool threw = false;
            try { action(); } catch { threw = true; }
            Assert(threw, name);
        }
        try
        {
            const string project = "App/App.csproj";
            const string original = "namespace Demo; public partial class Car { public int Park(int n) { return n + 1; } }";
            Uml.Write(Uml.At(root, project), "<Project Sdk=\"Microsoft.NET.Sdk\"><PropertyGroup><TargetFramework>net10.0</TargetFramework></PropertyGroup></Project>");
            var source = Uml.At(root, "App/Car.cs");
            Uml.Write(source, original);
            var diagrams = Uml.Types.Select(type => new Diagram(type, type, type, $"docs/uml/{type}.puml",
                type == "class" ? "generated" : type == "sequence" ? "reviewed" : "manual", "active", type == "class" ? project : null,
                type == "sequence" ? ["App/**/*.cs"] : [], [], [], type == "class" ? ["sequence"] : [])).ToArray();
            var manifest = new Manifest(1, [project], [], diagrams);
            Uml.Write(Uml.At(root, "docs/uml/manifest.json"), Uml.Serialize(manifest));
            Uml.Write(Uml.At(root, "docs/uml/registry.json"), Uml.Serialize(new Registry([])));
            foreach (var d in diagrams.Where(d => d.Maintenance != "generated"))
            {
                var content = d.Type switch {
                    "sequence" => "participant Example\nExample -> Example : Message",
                    "activity" or "interaction-overview" => "start\n:Example;\nstop",
                    "state-machine" => "[*] --> Example",
                    "timing" => "robust \"Example\" as Example\n@0\nExample is Empty",
                    _ => "class Example"
                };
                Uml.Write(Uml.At(root, d.File), $"@startuml\n' diagram-id: {d.Id}\n{content}\n@enduml\n");
            }
            var model = Uml.Extract(root, manifest);
            Uml.Validate(root, manifest, model);
            Assert(model.Types.Single().Id == "type:App/App.csproj:Demo.Car", "stable qualified type identity");
            Assert(Uml.Glob("App/**/*.cs", "App/Car.cs") && Uml.Glob("App/**/*.cs", "App/Sub/Car.cs") && !Uml.Glob("App/*.cs", "App/Sub/Car.cs"), "recursive and direct glob scopes");
            var generated = Uml.Outputs(root, manifest, model);
            using (var browserData = System.Text.Json.JsonDocument.Parse(generated["docs/uml/diagrams.generated.js"].Split('=', 2)[1].Trim().TrimEnd(';')))
            {
                var snapshots = browserData.RootElement.GetProperty("diagrams").EnumerateArray().ToArray();
                Assert(snapshots.All(d => d.GetProperty("pumlHash").GetString() == Uml.Hash(d.GetProperty("puml").GetString()!)), "every diagram presentation shares a source fingerprint");
                Assert(snapshots.Single(d => d.GetProperty("id").GetString() == "class").GetProperty("puml").GetString() == generated["docs/uml/class.puml"], "PUML source view uses freshly generated text instead of an older file");
            }
            Assert(generated.SequenceEqual(Uml.Outputs(root, manifest, Uml.Extract(root, manifest))), "generation is deterministic");
            foreach (var (path, content) in generated) Uml.Write(Uml.At(root, path), content);
            Assert(Uml.Run(["approve", "--root", root, "--id", "sequence", "--note", "Fixture matches source"]) == 0, "review acknowledgement command");
            Assert(Uml.Check(root, manifest, model, true) == 0, "clean strict check");
            var sequencePath = Uml.At(root, "docs/uml/sequence.puml");
            var sequenceSource = File.ReadAllText(sequencePath);
            Uml.Write(sequencePath, sequenceSource.Replace("\n", "\r\n"));
            Assert(Uml.Check(root, manifest, model, true) == 0, "review baselines survive CRLF checkout conversion");
            Uml.Write(sequencePath, sequenceSource.Replace("@startuml", "@startuml\ntitle Changed"));
            Assert(Uml.Check(root, manifest, model, true) == 1, "diagram edits require a fresh review");
            Uml.Write(sequencePath, sequenceSource);

            Uml.Write(source, "// A comment\n" + original.Replace("n + 1", "n  +  1").Replace("int n", "int /* parameter comment */ n"));
            var cosmetic = Uml.Extract(root, manifest);
            Assert(model.Fingerprints["App/Car.cs"] == cosmetic.Fingerprints["App/Car.cs"], "comments and whitespace do not trigger review");
            Assert(generated.SequenceEqual(Uml.Outputs(root, manifest, cosmetic)), "signature formatting and comments do not change generated output");
            Assert(model.Types.Single().Operations.Single().Id == "operation:App/App.csproj:Demo.Car.Park(int)", "overload-aware operation identities");
            Uml.Write(source, original.Replace("n + 1", "n + 2"));
            var body = Uml.Extract(root, manifest);
            Assert(model.Fingerprints["App/Car.cs"] != body.Fingerprints["App/Car.cs"], "method body changes trigger review");
            Assert(generated.SequenceEqual(Uml.Outputs(root, manifest, body)), "body-only changes leave structural diagrams current");
            Assert(Uml.Check(root, manifest, body, false) == 0 && Uml.Check(root, manifest, body, true) == 1, "advisory and strict review policies");

            Uml.Write(source, original.Replace("int Park", "long Park"));
            var api = Uml.Extract(root, manifest);
            var apiOutput = Uml.Outputs(root, manifest, api);
            using (var browserData = System.Text.Json.JsonDocument.Parse(apiOutput["docs/uml/diagrams.generated.js"].Split('=', 2)[1].Trim().TrimEnd(';')))
                Assert(browserData.RootElement.GetProperty("diagrams").EnumerateArray().Single(d => d.GetProperty("id").GetString() == "class").GetProperty("puml").GetString() == apiOutput["docs/uml/class.puml"], "code changes update the PUML snapshot and interactive graph together");
            Assert(generated["docs/uml/class.puml"] != Uml.Outputs(root, manifest, api)["docs/uml/class.puml"], "signature changes update class diagrams");
            Assert(Uml.Check(root, manifest, api, false) == 1, "stale generated output fails even in advisory mode");
            Uml.Write(source, original);
            Uml.Write(Uml.At(root, "App/Other.cs"), "namespace Demo; public partial class Car { public string Name { get; set; } }");
            var partial = Uml.Extract(root, manifest);
            Assert(partial.Types.Single().Files.Length == 2 && partial.Types.Single().Members.Length == 2, "partial classes merge across files");
            Assert(Uml.Fingerprints(diagrams.Single(d => d.Id == "sequence"), partial).ContainsKey("App/Other.cs"), "new files enter review scopes");
            File.Delete(Uml.At(root, "App/Other.cs"));
            Uml.Write(Uml.At(root, "App/Renamed.cs"), original);
            File.Delete(source);
            var moved = Uml.Extract(root, manifest);
            Assert(moved.Types.Single().Id == model.Types.Single().Id, "type IDs survive file renames");
            Assert(Uml.Check(root, manifest, moved, false) == 1, "source-location model drift is detected");
            Uml.Write(source, original);
            File.Delete(Uml.At(root, "App/Renamed.cs"));
            Uml.Write(Uml.At(root, "App/Point.cs"), "namespace Demo; public readonly record struct Point(int X, int Y);");
            var records = Uml.Extract(root, manifest);
            Assert(records.Types.Single(t => t.Name == "Point").Members.Single().Contains("int X, int Y"), "record primary constructors are included");
            Assert(records.Types.Single(t => t.Name == "Point").Kind == "record struct", "record structs retain value-type identity");
            File.Delete(Uml.At(root, "App/Point.cs"));
            var broken = manifest with { Diagrams = diagrams.Select(d => d.Id == "class" ? d with { Related = ["missing"] } : d).ToArray() };
            Throws(() => Uml.Validate(root, broken, model), "dangling diagram links are rejected");
            broken = manifest with { Diagrams = diagrams.Select(d => d.Id == "sequence" ? d with { TrackSymbols = ["type:missing"] } : d).ToArray() };
            Throws(() => Uml.Validate(root, broken, model), "deleted tracked symbols are rejected");
            Uml.Write(Uml.At(root, "docs/uml/registry.json"), Uml.Serialize(new Registry([new Entity("bad", "type", ["type:missing"])])));
            Throws(() => Uml.Validate(root, manifest, model), "unresolved registry targets are rejected");
            Uml.Write(Uml.At(root, "docs/uml/registry.json"), Uml.Serialize(new Registry([])));
            Uml.Write(Uml.At(root, "docs/uml/sequence.puml"), "invalid");
            Throws(() => Uml.Validate(root, manifest, model), "broken PlantUML envelope is rejected");
            Uml.Write(source, "namespace Demo; public class {");
            Throws(() => Uml.Extract(root, manifest), "invalid C# fails extraction");
            Throws(() => Uml.At(root, "../escape.puml"), "repository path traversal is rejected");
            File.Delete(Uml.At(root, project));
            Throws(() => Uml.Extract(root, manifest), "missing projects fail instead of disappearing silently");
            count += GraphDataTests.Run();
            count += AuthoredDataTests.Run();
            Console.WriteLine($"{count} UML self-tests passed.");
            return 0;
        }
        finally
        {
            // Delete only the unique fixture directory allocated by this test run.
            var safe = Path.GetFullPath(root);
            var temp = Path.GetFullPath(Path.GetTempPath());
            if (Path.GetDirectoryName(safe)?.TrimEnd(Path.DirectorySeparatorChar) == temp.TrimEnd(Path.DirectorySeparatorChar)
                && Path.GetFileName(safe).StartsWith("garage-uml-tests-", StringComparison.Ordinal)) Directory.Delete(safe, true);
        }
    }
}
