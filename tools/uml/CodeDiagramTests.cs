static class CodeDiagramTests
{
    public static int Run(string parent)
    {
        var root = Path.Combine(parent, "code-diagrams");
        int count = 0;
        void Assert(bool condition, string name)
        {
            if (!condition) throw new Exception("Code diagram test failed: " + name);
            Console.WriteLine("PASS: " + name); count++;
        }
        void Throws(Action action, string text, string name)
        {
            string message = "";
            try { action(); } catch (Exception e) { message = e.Message; }
            Assert(message.Contains(text, StringComparison.Ordinal), name + " (" + text + ")");
        }
        void Write(string path, string text) => Uml.Write(Uml.At(root, path), text);
        Write("App/App.csproj", "<Project><PropertyGroup><ImplicitUsings>enable</ImplicitUsings></PropertyGroup><ItemGroup><ProjectReference Include='../Library/Library.csproj' /></ItemGroup></Project>");
        Write("Library/Library.csproj", "<Project><PropertyGroup><ImplicitUsings>enable</ImplicitUsings></PropertyGroup></Project>");
        Write("Library/Attributes.cs", """
            namespace Garage.Documentation;
            [AttributeUsage(AttributeTargets.Method | AttributeTargets.Property, AllowMultiple = true)]
            public sealed class UseCaseAttribute(string id) : Attribute { }
            [AttributeUsage(AttributeTargets.Method)]
            public sealed class SequenceViewAttribute(string id) : Attribute {
                public int MaxDepth { get; set; } = 3;
                public string[] ExpandNamespaces { get; set; } = [];
            }
            """);
        Write("Library/Garage.cs", """
            namespace Library;
            public sealed class Garage {
                public int Park(int spot) => spot + 1;
                public int Park(int spot, string label) => spot + 2;
            }
            public interface IOperation { int Run(); }
            public class DynamicOperation { public virtual int Run() => 123; }
            """);
        const string original = """
            using Garage.Documentation;
            using VehicleGarage = Library.Garage;
            namespace Demo;
            public sealed class Service {
                private readonly VehicleGarage garage = new();
                [UseCase("park-vehicle")]
                [SequenceView("sequence", MaxDepth = 3)]
                public int Park(int? spot) {
                    if (spot is null) return garage.Park(1);
                    return garage.Park(spot.Value, "chosen");
                }
                private int First() => 1;
                private int Second() => 2;
                private int Combine(int a, int b) => a + b;
                private int Recursive() => Recursive();
            }
            """;
        var source = original;
        Write("UseCases/requirements/README.md", "- **GAR-01 — Parking:** Park vehicles.");
        Write("UseCases/optional/README.md", "# Optional enhancements");
        Write("UseCases/garage/park-vehicle.md", """
            # Park a vehicle

            **Goal:** Park a vehicle safely.
            **Actor:** Operator
            ## Flow
            1. Choose a vehicle.
            2. Park the vehicle.
            ## Alternatives
            - **Full:** reject parking.
            ## Done when
            - A valid vehicle is parked.
            ```yaml
            id: park-vehicle
            priority: required
            requirements: [GAR-01]
            ```
            """);
        Write("App/Service.cs", source);
        Diagram Diagram(string id, string type) => new(id, type, id, $"docs/uml/{id}.puml", "generated", "active", null, [], [], [], []);
        var manifest = new Manifest(1, ["App/App.csproj", "Library/Library.csproj"], [], [Diagram("sequence", "sequence"), Diagram("use-cases", "use-case")]);
        CodeDiagramSet Extract() => CodeDiagrams.Extract(root, manifest);
        string Puml() { Write("App/Service.cs", source); return Extract().Diagrams["sequence"].Puml; }
        var extracted = Extract();
        var baseline = extracted.Diagrams["sequence"].Puml;
        Assert(baseline.Contains("spot + 1") && baseline.Contains("spot + 2") && !baseline.Contains("Unresolved call"), "semantic binding resolves aliases and overloads across project references");
        Assert(extracted.UseCases.Single() is { Actor: "Operator", Title: "Park a vehicle" } && extracted.SequenceEntries.Single().EntryPoint.Contains("Demo.Service.Park"), "shared model records annotation intent and sequence provenance");
        var graph = AuthoredData.Parse(manifest.Diagrams[0], baseline);
        var outer = graph.Sequence!.Items.Single(i => i.Kind == "fragment");
        Assert(outer.Branches.Length == 2 && outer.Branches[0].Items.Any(i => i.Label.Contains("Park(1)")) &&
            outer.Branches[0].Items.All(i => !i.Label.Contains("chosen")) && outer.Branches[1].Items.Any(i => i.Label.Contains("chosen")), "early return keeps the continuation exclusively in the other branch");
        Assert(baseline == Puml(), "code-based diagram generation is deterministic");
        source = original.Replace("return garage.Park(spot.Value, \"chosen\");", "return First() < Second() ? 0 : 1;");
        Write("App/Service.cs", source);
        var readable = CodeDiagrams.View(manifest.Diagrams[0], Extract().Diagrams["sequence"]);
        Assert(readable.Sequence!.Items.SelectMany(i => i.Branches).SelectMany(b => b.Items).Any(i =>
            i.Branches.Any(b => b.Label.Contains("<"))) && !readable.Nodes.Any(n => n.Name.Contains("&lt;")), "interactive labels decode PUML text while preserving comparison symbols");
        source = original.Replace("return garage.Park(spot.Value, \"chosen\");", "return garage.Park(spot.Value);");
        Assert(Puml() != baseline && !Puml().Contains("spot + 2"), "changing the source overload updates the sequence without editing PUML");
        source = original.Replace("MaxDepth = 3", "MaxDepth = 0");
        Assert(Puml().Contains("Depth boundary") && !Puml().Contains("spot + 1"), "depth limits retain calls while bounding body expansion");
        source = original.Replace("MaxDepth = 3", "MaxDepth = 3, ExpandNamespaces = new[] { \"Demo\" }");
        Assert(Puml().Contains("Scope boundary") && !Puml().Contains("spot + 1"), "namespace scope keeps collaborator calls visible without expanding their bodies");
        source = original.Replace("return garage.Park(spot.Value, \"chosen\");", "return new object[] { First(), Second() }[First()].GetHashCode();");
        var indexed = Puml();
        Assert(indexed.Split(": First()", StringSplitOptions.None).Length == 3 && indexed.IndexOf(": Second()", StringComparison.Ordinal) < indexed.LastIndexOf(": First()", StringComparison.Ordinal), "index expressions preserve argument evaluation order");
        source = original.Replace("return garage.Park(spot.Value, \"chosen\");", "return $\"Value {First()}\".Length;");
        Assert(Puml().Contains(": First()"), "interpolated string expressions retain embedded calls");
        source = original.Replace("return garage.Park(spot.Value, \"chosen\");", "return (First(), Second()).Item1;");
        Assert(Puml().Contains(": First()") && Puml().Contains(": Second()"), "tuple argument wrappers retain embedded calls");
        source = original.Replace("return garage.Park(spot.Value, \"chosen\");", "return nameof(First).Length;");
        Assert(!Puml().Contains("Unresolved call"), "nameof is compile-time metadata rather than an unresolved runtime call");
        source = original.Replace("if (spot is null) return garage.Park(1);", "if (First() > 0 && Second() > 0) return 0;");
        var shortCircuit = AuthoredData.Parse(manifest.Diagrams[0], Puml());
        var gate = shortCircuit.Sequence!.Items.Single(i => i.Kind == "fragment" && i.Branches.Any(b => b.Label.EndsWith("is true")));
        Assert(gate.Branches[0].Items.Any(i => i.Label.Contains("Second()")) && gate.Branches[1].Items.Length == 0, "short-circuit evaluation guards the right-hand call");
        source = original.Replace("return garage.Park(spot.Value, \"chosen\");", "return Combine(First(), Second());");
        var ordered = Puml();
        Assert(ordered.IndexOf(": First()", StringComparison.Ordinal) < ordered.IndexOf(": Second()", StringComparison.Ordinal) &&
            ordered.IndexOf(": Second()", StringComparison.Ordinal) < ordered.IndexOf(": Combine(", StringComparison.Ordinal), "argument calls precede the enclosing call in source order");
        source = original.Replace("return garage.Park(spot.Value, \"chosen\");", "return Recursive();");
        Assert(Puml().Contains("Recursion boundary"), "recursive calls terminate at an explicit boundary");
        source = original.Replace("int? spot)", "int? spot, Library.IOperation op)").Replace("return garage.Park(spot.Value, \"chosen\");", "return op.Run();");
        Assert(Puml().Contains("Dispatch boundary") && Puml().Contains("Library.IOperation"), "interface dispatch shows the declared contract without guessing an implementation");
        source = original.Replace("int? spot)", "int? spot, Library.DynamicOperation op)").Replace("return garage.Park(spot.Value, \"chosen\");", "return op.Run();");
        Assert(Puml().Contains("Dispatch boundary") && !Puml().Contains("123"), "virtual methods remain a runtime dispatch boundary");
        source = original.Replace("return garage.Park(spot.Value, \"chosen\");", "return new[] { 1, 2 }.First(x => Second() > x);");
        var callback = Puml();
        Assert(callback.Contains("Callback boundary") && callback.Contains("External/delegate call boundary") && !callback.Contains(": Second()"), "callbacks are explicit boundaries, never invented as one unconditional execution");
        source = original.Replace("return garage.Park(spot.Value, \"chosen\");", "return MissingMethod();");
        Assert(Puml().Contains("Unresolved call boundary"), "unresolved calls remain visible instead of being matched by method name");
        source = original.Replace("return garage.Park(spot.Value, \"chosen\");", "while (true) { } return 1;");
        Throws(() => Puml(), "Service.cs:", "unsupported control flow fails with a source location");
        source = original.Replace("MaxDepth = 3", "MaxDepth = -1");
        Throws(() => Puml(), "MaxDepth", "invalid depth annotation is rejected");
        source = original.Replace("[UseCase(\"park-vehicle\")]", "");
        Throws(() => Puml(), "exactly one UseCase", "sequence annotation needs explicit actor and goal metadata");
        source = original.Replace("private int First()", "[UseCase(\"missing-story\")] private int First()");
        Throws(() => Puml(), "Unknown UseCase story ID", "unknown story links fail rather than inventing metadata");
        source = original.Replace("private int First()", "[UseCase(\"park-vehicle\")][SequenceView(\"sequence\")] private int First()");
        Throws(() => Puml(), "Duplicate SequenceView", "duplicate sequence roots are rejected");
        source = original.Replace("SequenceView(\"sequence\"", "SequenceView(\"unregistered\"");
        Throws(() => Puml(), "manifest.json", "orphan sequence annotations are rejected");
        source = original.Replace("private int First()", "[UseCase(\"park-vehicle\")] private int First()");
        Write("App/Service.cs", source);
        Assert(Extract().UseCases.Length == 1, "one use case may link several implementing operations");
        source = original;
        Write("App/Service.cs", source);
        var model = Uml.Extract(root, manifest);
        var outputs = Uml.Outputs(root, manifest, model);
        foreach (var (path, content) in outputs) Write(path, content);
        Assert(outputs["docs/uml/sequence.puml"] == model.CodeDiagrams!.Diagrams["sequence"].Puml &&
            outputs["docs/uml/diagrams.generated.js"].Contains("App/Service.cs"), "generated PUML and interactive data share the freshly extracted definition and source links");
        Write("App/Service.cs", original.Replace("return garage.Park(spot.Value, \"chosen\");", "return 42;"));
        Assert(Uml.Outputs(root, manifest, model)["docs/uml/sequence.puml"] == outputs["docs/uml/sequence.puml"], "outputs use the captured model without re-reading changed source files");
        Assert(Uml.Check(root, manifest, Uml.Extract(root, manifest), false) == 1, "source body changes fail checks until generated sequence outputs are refreshed");
        return count;
    }
}
