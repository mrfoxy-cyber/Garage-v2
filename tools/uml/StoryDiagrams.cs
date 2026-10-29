using UseCaseManagement;

record StoryTrace(string Id, string Title, string Goal, string Actor, string Priority, string Source,
    string[] Requirements, StoryStep[] Flow, StoryAlternative[] Alternatives, string[] Done,
    CodeImplementation[] Implementations, string[] Diagrams);

static class StoryDiagrams
{
    static string Text(string value) => CodeDiagrams.Text(StoryFlow.Plain(value));
    public static Manifest Describe(Manifest manifest, Catalogue? catalogue) => manifest with { Diagrams = manifest.Diagrams.Select(d =>
        d.Maintenance == "generated" && d.Type == "activity" && d.StoryIds is { Length: 1 } && catalogue?.Stories.SingleOrDefault(s => s.Id == d.StoryIds[0]) is { } story
            ? d with { Title = story.Title + " — requirements flow" } : d).ToArray() };
    public static string[] StoryIds(Diagram diagram, Model model) => (diagram.StoryIds ?? [])
        .Concat(diagram.Type == "use-case" && diagram.Maintenance == "generated" ? model.Stories?.Stories.Select(s => s.Id) ?? [] : [])
        .Concat(model.CodeDiagrams?.SequenceEntries.Where(s => s.Id == diagram.Id).Select(s => s.StoryId) ?? [])
        .Concat(model.CodeDiagrams?.SequenceEntries.Where(s => s.Id == diagram.InteractionSource).Select(s => s.StoryId) ?? [])
        .Distinct(StringComparer.Ordinal).Order(StringComparer.Ordinal).ToArray();

    public static StoryTrace[] Traces(Manifest manifest, Model model) => model.Stories?.Stories.Select(story =>
    {
        var flow = StoryFlow.Read(story);
        var implementations = model.CodeDiagrams?.UseCases.SingleOrDefault(c => c.Id == story.Id)?.Implementations ?? [];
        var diagrams = manifest.Diagrams.Where(d => StoryIds(d, model).Contains(story.Id) ||
            d.Maintenance == "generated" && d.Type == "class" && implementations.Any(i => i.Project == d.Project))
            .Select(d => d.Id).ToArray();
        return new StoryTrace(story.Id, story.Title, story.Goal, story.Actor, story.Priority, story.Source,
            story.Requirements.ToArray(), flow.Steps, flow.Alternatives, flow.Done, implementations, diagrams);
    }).ToArray() ?? [];

    public static GeneratedCodeDiagram UseCases(Diagram diagram, Catalogue catalogue, CodeUseCase[] implementations)
    {
        var lines = new List<string> { "@startuml", "' diagram-id: " + diagram.Id,
            "' Generated from UseCases/ stories; C# annotations link implementations.", "title " + Text(diagram.Title), "left to right direction" };
        var sources = new Dictionary<string, string[]>(StringComparer.Ordinal);
        foreach (var actor in catalogue.Stories.Select(s => s.Actor).Distinct().Order(StringComparer.Ordinal))
            lines.Add($"actor \"{Text(actor)}\" as a_{Uml.Hash(actor)[..12]}");
        lines.Add("rectangle \"Garage application\" {");
        foreach (var story in catalogue.Stories.OrderBy(s => s.Id, StringComparer.Ordinal))
        {
            lines.Add($"  usecase \"{Text(story.Title)}\" as u_{story.Id.Replace('-', '_')}");
            var code = implementations.SingleOrDefault(c => c.Id == story.Id);
            sources[diagram.Id + ":u_" + story.Id.Replace('-', '_')] = new[] { story.Source }.Concat(code?.Sources ?? []).Distinct().ToArray();
        }
        lines.Add("}");
        foreach (var story in catalogue.Stories.OrderBy(s => s.Id, StringComparer.Ordinal))
        {
            var alias = "u_" + story.Id.Replace('-', '_');
            lines.Add($"a_{Uml.Hash(story.Actor)[..12]} --> {alias}");
            lines.Add("note right of " + alias);
            lines.Add(Text(story.Goal));
            lines.Add(Text(story.Priority + " · " + story.Id + " · " + string.Join(", ", story.Requirements)));
            lines.Add(implementations.Any(c => c.Id == story.Id) ? "Linked implementation; coverage requires separate verification." : "No code annotation linked yet.");
            lines.Add("end note");
        }
        lines.Add("@enduml");
        return new(string.Join("\n", lines) + "\n", sources);
    }

    public static GeneratedCodeDiagram Activity(Diagram diagram, Catalogue catalogue)
    {
        if (diagram.StoryIds is not { Length: 1 }) throw new Exception($"Story activity {diagram.Id} needs exactly one storyIds entry.");
        var story = catalogue.Stories.SingleOrDefault(s => s.Id == diagram.StoryIds[0])
            ?? throw new Exception($"Unknown story in {diagram.Id}: {diagram.StoryIds[0]}");
        var flow = StoryFlow.Read(story);
        if (flow.Alternatives.Any(a => a.AfterStep is null))
            throw new Exception($"{story.Source}: every alternative needs an explicit <!-- after: STEP; outcome: end --> before generating an activity.");
        var lines = new List<string> { "@startuml", "' diagram-id: " + diagram.Id,
            "' Generated from the story Flow and explicitly mapped Alternatives; edit the Markdown story.",
            "title " + Text(story.Title) + " — requirements flow", "start" };
        var sources = new Dictionary<string, string[]>(StringComparer.Ordinal);
        void Action(string text) { lines.Add(":" + Text(text) + ";"); sources[StoryFlow.Plain(text)] = [story.Source]; }
        foreach (var step in flow.Steps)
        {
            Action(step.Text);
            foreach (var alternative in flow.Alternatives.Where(a => a.AfterStep == step.Number))
            {
                lines.Add("if (" + Text(alternative.Condition) + ") then (yes)");
                sources[alternative.Condition] = [story.Source];
                Action(alternative.Response); lines.Add("stop"); lines.Add("else (no)"); lines.Add("endif");
            }
        }
        lines.Add("stop");
        lines.Add("note right"); lines.Add(Text("Story: " + story.Id + " · Actor: " + story.Actor));
        lines.Add(Text(story.Goal));
        foreach (var done in flow.Done) lines.Add(Text("Done when: " + done));
        lines.Add("end note"); lines.Add("@enduml");
        return new(string.Join("\n", lines) + "\n", sources);
    }
}
