static class GraphDataTests
{
    // Pure fixture tests: no repository changes, application build, or renderer required.
    // Returns the number of assertions so the existing self-test runner can include it.
    public static int Run()
    {
        int count = 0;
        void Assert(bool condition, string name)
        {
            if (!condition) throw new InvalidOperationException("Graph data self-test failed: " + name);
            Console.WriteLine("PASS: " + name);
            count++;
        }

        const string domain = "Domain/Domain.csproj";
        const string shared = "Shared/Shared.csproj";
        TypeModel Type(string ns, string name, string kind = "class", string[]? bases = null, string[]? members = null, string project = domain) =>
            new($"type:{project}:{(ns.Length == 0 ? "" : ns + ".")}{name}", project, ns, name, kind,
                $"public {kind} {name}", [project[..project.LastIndexOf('/')] + "/" + name.Split('<')[0] + ".cs"], bases ?? [], members ?? [], []);
        Diagram Diagram(string id, string type, string mode = "generated", string? project = null) =>
            new(id, type, id, $"docs/uml/{id}.puml", mode, "active", project, [], [], [], []);

        var vehicle = Type("Demo", "Vehicle");
        var identifiable = Type("Demo", "IIdentifiable", "interface");
        var carInterface = Type("Demo", "ICar", "interface", ["IIdentifiable"]);
        var car = Type("Demo", "Car", bases: ["Vehicle", "ICar"], members: ["public Vehicle? Other { get; }"]);
        var ambiguousA = Type("A", "Duplicate");
        var ambiguousB = Type("B", "Duplicate");
        var ambiguousChild = Type("Demo", "AmbiguousChild", bases: ["Duplicate"]);
        var qualifiedChild = Type("Demo", "QualifiedChild", bases: ["A.Duplicate"]);
        var externalChild = Type("Demo", "ExternalChild", bases: ["ExternalBase"]);
        var externalBase = Type("Demo", "ExternalBase", project: shared);
        var nested = Type("Demo", "Outer.Inner< T >");
        var globalType = Type("", "GlobalType");
        var projects = new[]
        {
            new ProjectModel("project:" + shared, "Shared", shared, []),
            new ProjectModel("project:" + domain, "Domain", domain, [shared])
        };
        var types = new[] { car, externalBase, ambiguousB, vehicle, nested, identifiable, qualifiedChild,
            ambiguousChild, carInterface, globalType, externalChild, ambiguousA };
        var model = new Model(projects, types, new SortedDictionary<string, string>(StringComparer.Ordinal));
        var manifest = new Manifest(1, [domain, shared], [],
            [Diagram("classes", "class", project: domain), Diagram("components", "component"),
             Diagram("packages", "package"), Diagram("manual", "sequence", "reviewed")]);
        var views = GraphData.Create(manifest, model);

        Assert(views.Keys.SequenceEqual(new[] { "classes", "components", "packages" }), "only generated structural views become graphs");
        var classes = views["classes"];
        Assert(classes.Nodes.Length == 11 && classes.Nodes.All(n => n.Id != externalBase.Id), "class graph stays within its declared project");
        Assert(classes.Nodes.Single(n => n.Id == nested.Id).Name == "Outer.Inner< T >", "nested and generic class names remain intact");
        Assert(classes.Nodes.Single(n => n.Id == car.Id).Members.SequenceEqual(car.Members) && classes.Nodes.Single(n => n.Id == car.Id).Group == "Demo", "class metadata and namespace groups are preserved");
        Assert(classes.Edges.Any(e => e.Source == car.Id && e.Target == vehicle.Id && e.Kind == "inheritance"), "inheritance points from child to parent");
        Assert(classes.Edges.Any(e => e.Source == car.Id && e.Target == carInterface.Id && e.Kind == "realization"), "class interface implementation is realization");
        Assert(classes.Edges.Any(e => e.Source == carInterface.Id && e.Target == identifiable.Id && e.Kind == "inheritance"), "interface extension remains inheritance");
        Assert(!classes.Edges.Any(e => e.Source == ambiguousChild.Id) && classes.Edges.Any(e => e.Source == qualifiedChild.Id && e.Target == ambiguousA.Id), "ambiguous base names are skipped and qualified names resolve");
        Assert(!classes.Edges.Any(e => e.Source == externalChild.Id), "cross-project or external base types are not guessed");
        Assert(classes.Edges.Length == 4, "member type mentions do not invent associations");
        Assert(views["components"].Edges.Single() is { Source: "project:Domain/Domain.csproj", Target: "project:Shared/Shared.csproj", Kind: "reference" }, "component edges reflect exact project references");
        var package = views["packages"].Nodes.Single(n => n.Id == "project:" + domain);
        Assert(package.Kind == "package" && package.Group == "" && package.Members.SequenceEqual(new[] { "(global namespace)", "A", "B", "Demo" }), "package nodes list distinct namespaces inside each project");
        Assert(views["packages"].Edges.Select(e => e.Id).SequenceEqual(views["components"].Edges.Select(e => e.Id)), "package graph preserves project-level reference semantics");
        Assert(views.Values.All(view => view.Edges.All(edge => view.Nodes.Any(n => n.Id == edge.Source) && view.Nodes.Any(n => n.Id == edge.Target))), "every edge endpoint belongs to its view");
        var reordered = model with { Projects = projects.Reverse().ToArray(), Types = types.Reverse().ToArray() };
        Assert(Uml.Serialize(views) == Uml.Serialize(GraphData.Create(manifest, reordered)), "graph output is deterministic across discovery order");

        bool missingReferenceRejected = false;
        try
        {
            GraphData.Create(manifest, model with { Projects = [projects[0] with { References = ["Missing/Missing.csproj"] }, projects[1]] });
        }
        catch (InvalidOperationException e) { missingReferenceRejected = e.Message.Contains("Unresolved project reference", StringComparison.Ordinal); }
        Assert(missingReferenceRejected, "missing project references fail instead of creating dangling edges");
        return count;
    }
}
