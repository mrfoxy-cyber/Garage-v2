// The live viewer uses the same stable identities as the PlantUML sources.
// Edges are explicit data rather than relationships re-inferred by browser code.
static class GraphData
{
    public static SortedDictionary<string, GraphView> Create(Manifest manifest, Model model)
    {
        var views = new SortedDictionary<string, GraphView>(StringComparer.Ordinal);
        foreach (var diagram in manifest.Diagrams.Where(d => d.Maintenance == "generated").OrderBy(d => d.Id, StringComparer.Ordinal))
        {
            if (diagram.Type == "class")
            {
                var types = model.Types.Where(t => t.Project == diagram.Project).OrderBy(t => t.Id, StringComparer.Ordinal).ToArray();
                var nodes = types.Select(t => new GraphNode(t.Id, t.Name, t.Kind, t.Namespace,
                    t.Members, t.Files, t.Declaration, t.Bases)).ToArray();
                var edges = new List<GraphEdge>();
                foreach (var type in types)
                {
                    foreach (var declaredBase in type.Bases)
                    {
                        // Match the existing PlantUML generator: only unique in-project names.
                        // This syntax model does not resolve aliases or external library types.
                        var matches = types.Where(candidate => candidate.Name == declaredBase ||
                            (candidate.Namespace.Length == 0 ? candidate.Name : candidate.Namespace + "." + candidate.Name) == declaredBase).ToArray();
                        if (matches.Length != 1) continue;
                        var parent = matches[0];
                        var kind = parent.Kind == "interface" && type.Kind != "interface" ? "realization" : "inheritance";
                        edges.Add(Edge(type.Id, parent.Id, kind, kind == "realization" ? "implements" : "inherits"));
                    }
                }
                // Member signatures do not establish ownership: no association/composition is guessed.
                views.Add(diagram.Id, View(diagram, nodes, edges));
            }
            else if (diagram.Type is "component" or "package")
            {
                var projects = model.Projects.OrderBy(p => p.Id, StringComparer.Ordinal).ToArray();
                var nodes = projects.Select(project => new GraphNode(project.Id, project.Name,
                    diagram.Type == "package" ? "package" : "component", "",
                    diagram.Type == "package"
                        ? model.Types.Where(t => t.Project == project.File).Select(t => t.Namespace.Length == 0 ? "(global namespace)" : t.Namespace)
                            .Distinct(StringComparer.Ordinal).Order(StringComparer.Ordinal).ToArray()
                        : [],
                    [project.File], "Project " + project.File, [])).ToArray();
                var byFile = projects.ToDictionary(p => p.File, StringComparer.Ordinal);
                var edges = new List<GraphEdge>();
                foreach (var project in projects)
                {
                    foreach (var reference in project.References)
                    {
                        if (!byFile.TryGetValue(reference, out var target))
                            throw new InvalidOperationException($"Unresolved project reference in graph {diagram.Id}: {project.File} -> {reference}");
                        edges.Add(Edge(project.Id, target.Id, "reference", "references"));
                    }
                }
                // The package view uses project-level boxes whose members are namespaces.
                // References are declared between projects; namespace dependencies are not inferred.
                views.Add(diagram.Id, View(diagram, nodes, edges));
            }
        }
        return views;
    }

    static GraphView View(Diagram diagram, GraphNode[] nodes, IEnumerable<GraphEdge> edges) =>
        new(diagram.Id, diagram.Title, diagram.Type, nodes,
            edges.DistinctBy(e => e.Id).OrderBy(e => e.Id, StringComparer.Ordinal).ToArray());

    static GraphEdge Edge(string source, string target, string kind, string label) =>
        new("edge:" + Uml.Hash(kind + "\n" + source + "\n" + target), source, target, kind, label);
}

record GraphView(string Id, string Title, string Type, GraphNode[] Nodes, GraphEdge[] Edges);
record GraphNode(string Id, string Name, string Kind, string Group, string[] Members, string[] Files, string Declaration, string[] Bases);
record GraphEdge(string Id, string Source, string Target, string Kind, string Label);
