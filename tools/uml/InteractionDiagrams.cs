// Communication and overview are projections of one captured sequence, including its
// alternatives and extraction boundaries. No calls or business scenarios are inferred here.
record InteractionBranch(string Id, string FragmentId, string Label, string[] ParentIds, string FrameLabel);
record InteractionMessage(string Id, string Number, string Source, string Target, string Label, bool Reply, string[] BranchIds);
record InteractionModel(string Id, string StoryId, string SourceHash, GraphView Sequence,
    InteractionMessage[] Messages, InteractionBranch[] Branches);
record InteractionProjection(GeneratedCodeDiagram Definition, GraphView View);

static class InteractionDiagrams
{
    static string Text(string text) => CodeDiagrams.Text(text);
    public static bool IsProjection(Diagram diagram) => diagram.Maintenance == "generated" && diagram.Type is "communication" or "interaction-overview";

    public static SortedDictionary<string, InteractionModel> Capture(Manifest manifest, Model model)
    {
        var result = new SortedDictionary<string, InteractionModel>(StringComparer.Ordinal);
        foreach (var entry in model.CodeDiagrams?.SequenceEntries ?? [])
        {
            var diagram = manifest.Diagrams.Single(d => d.Id == entry.Id && d.Type == "sequence");
            var definition = model.CodeDiagrams!.Diagrams[entry.Id];
            var view = CodeDiagrams.View(diagram, definition);
            result.Add(entry.Id, Capture(entry.Id, entry.StoryId, Uml.Hash(definition.Puml), view));
        }
        return result;
    }

    public static InteractionModel Capture(string id, string storyId, string sourceHash, GraphView view)
    {
        if (view.Sequence is null) throw new Exception($"Interaction {id} needs a sequence model.");
        var messages = new List<InteractionMessage>();
        var branches = new List<InteractionBranch>();
        var participants = view.Sequence.Participants.ToHashSet(StringComparer.Ordinal);
        void Walk(SequenceItem[] items, string prefix, string[] guards)
        {
            int ordinal = 0;
            foreach (var item in items)
            {
                if (item.Kind == "note") continue;
                var number = prefix + ++ordinal;
                if (item.Kind == "fragment")
                {
                    for (var i = 0; i < item.Branches.Length; i++)
                    {
                        var branch = item.Branches[i];
                        var path = storyId + "/" + id + "/branch-" + Uml.Hash(string.Join("\n", guards) + "\n" + number + "\n" + branch.Label)[..12];
                        branches.Add(new(path, item.Id, branch.Label, guards, item.Branches[0].Label));
                        Walk(branch.Items, number + "." + (i + 1) + ".", [.. guards, path]);
                    }
                    continue;
                }
                if (item.Kind is not ("message" or "reply") || item.Source is null || item.Target is null || !participants.Contains(item.Source) || !participants.Contains(item.Target))
                    throw new Exception($"Invalid message in interaction {id}: {item.Id}");
                messages.Add(new(item.Id, number, item.Source, item.Target, item.Label, item.Reply, guards));
            }
        }
        Walk(view.Sequence.Items, "", []);
        if (messages.Select(m => m.Id).Distinct().Count() != messages.Count) throw new Exception($"Duplicate messages in interaction {id}.");
        return new(id, storyId, sourceHash, view, messages.ToArray(), branches.ToArray());
    }

    public static InteractionModel Source(Diagram diagram, IReadOnlyDictionary<string, InteractionModel> interactions) =>
        diagram.InteractionSource is not null && interactions.TryGetValue(diagram.InteractionSource, out var source) ? source
            : throw new Exception($"{diagram.Id} needs interactionSource pointing to a generated sequence.");

    static List<string> Header(Diagram diagram, InteractionModel source) => ["@startuml", "' diagram-id: " + diagram.Id,
        "' Generated from shared interaction: " + source.Id, "' source-puml-sha256: " + source.SourceHash,
        "' story-id: " + source.StoryId, "title " + Text(diagram.Title)];
    static string Guard(InteractionModel source, InteractionMessage message) => string.Join(" AND ", message.BranchIds.Select(id => {
        var branch = source.Branches.Single(b => b.Id == id);
        return branch.Label is "otherwise" or "else" ? "otherwise of (" + branch.FrameLabel + ")" : branch.Label;
    }));
    static string Message(InteractionModel source, InteractionMessage message) => message.Number + ": " + (message.Reply ? "reply " : "call ") +
        message.Label + (message.BranchIds.Length == 0 ? "" : " [" + Guard(source, message) + "]");

    public static InteractionProjection Generate(Diagram diagram, InteractionModel source) => diagram.Type switch
    {
        "communication" => Communication(diagram, source),
        "interaction-overview" => Overview(diagram, source),
        _ => throw new Exception("Unsupported interaction projection: " + diagram.Type)
    };

    static InteractionProjection Communication(Diagram diagram, InteractionModel source)
    {
        var participants = source.Sequence.Sequence!.Participants.Select(id => source.Sequence.Nodes.Single(n => n.Id == id)).ToArray();
        var aliases = participants.Select((node, index) => (node.Id, Alias: "p" + index)).ToDictionary(p => p.Id, p => p.Alias, StringComparer.Ordinal);
        var lines = Header(diagram, source);
        lines.Add("allowmixing");
        lines.Add("left to right direction");
        var sourceFiles = new Dictionary<string, string[]>(StringComparer.Ordinal);
        var details = new Dictionary<string, string[]>(StringComparer.Ordinal);
        foreach (var participant in participants)
        {
            var alias = aliases[participant.Id];
            var outgoing = source.Messages.Where(m => m.Source == participant.Id).Select(m =>
                Message(source, m) + " → " + participants.Single(p => p.Id == m.Target).Name).ToArray();
            details[diagram.Id + ":" + alias] = outgoing;
            sourceFiles[diagram.Id + ":" + alias] = participant.Files;
            lines.Add((participant.Kind == "actor" ? "actor" : "object") + " \"" + Text(participant.Name) + "\" as " + alias);
            if (outgoing.Length == 0) continue;
            if (participant.Kind == "actor")
            {
                lines.Add("note right of " + alias);
                foreach (var message in outgoing) lines.Add(Text(message));
                lines.Add("end note");
            }
            else
            {
                // Member compartments preserve every numbered message while connections stay compact.
                lines[^1] += " {";
                foreach (var message in outgoing) lines.Add("  " + Text(message));
                lines.Add("}");
            }
        }
        var groups = source.Messages.GroupBy(m => (m.Source, m.Target, m.Reply)).ToArray();
        foreach (var group in groups)
        {
            var numbers = group.Select(m => m.Number).ToArray();
            var label = (group.Key.Reply ? "Replies " : "Calls ") + numbers[0] + (numbers.Length > 1 ? " … " + numbers[^1] : "") + " (" + numbers.Length + ")";
            lines.Add(aliases[group.Key.Source] + (group.Key.Reply ? " ..> " : " --> ") + aliases[group.Key.Target] + " : " + Text(label));
        }
        const string explanation = "Numbers identify source order within alternative branches, not one runtime trace. Guarded paths are alternatives. Expand an object for all outgoing calls and replies; use Open sequence for the original context.";
        foreach (var note in source.Sequence.Notes ?? []) lines.Add("' Source note: " + Text(note));
        lines.Add("note bottom"); lines.Add(Text(explanation)); lines.Add("end note"); lines.Add("@enduml");
        var definition = new GeneratedCodeDiagram(string.Join("\n", lines) + "\n", sourceFiles);
        var view = CodeDiagrams.View(diagram, definition);
        var graphAliases = aliases.ToDictionary(p => diagram.Id + ":" + p.Value, p => p.Key, StringComparer.Ordinal);
        view = view with { InteractionId = source.Id, Notes = (view.Notes ?? []).Concat(source.Sequence.Notes ?? []).Distinct().ToArray(), Nodes = view.Nodes.Select(n => n with {
            Members = details[n.Id], StoryId = source.StoryId, Reference = new(source.Id, graphAliases[n.Id]) }).ToArray(),
            Edges = view.Edges.Select((e, i) => e with { Kind = groups[i].Key.Reply ? "reply" : "message", MessageIds = groups[i].Select(m => m.Id).ToArray() }).ToArray() };
        return new(definition, view);
    }

    sealed record Segment(string Label, string[] Details, string SourceElement, string[] Files);
    static InteractionProjection Overview(Diagram diagram, InteractionModel source)
    {
        var lines = Header(diagram, source);
        var segments = new List<Segment>();
        var decisions = new List<SequenceItem>();
        var messages = source.Messages.ToDictionary(m => m.Id, StringComparer.Ordinal);
        var representedMessages = new List<string>();
        var nodes = source.Sequence.Nodes.ToDictionary(n => n.Id, StringComparer.Ordinal);
        int number = 0;
        void Flush(List<SequenceItem> run)
        {
            if (run.Count == 0) return;
            var first = run.FirstOrDefault(i => i.Kind != "note") ?? run[0];
            var label = "ref - " + ++number + ". " + (first.Kind == "note" ? "Source boundary" : first.Label);
            var details = run.Select(i => messages.TryGetValue(i.Id, out var message) ? Message(source, message) : i.Label).ToArray();
            representedMessages.AddRange(run.Where(i => messages.ContainsKey(i.Id)).Select(i => i.Id));
            var files = run.Where(i => i.Source is not null).SelectMany(i => nodes[i.Source!].Files).Distinct().ToArray();
            segments.Add(new(label, details, first.Id, files.Length > 0 ? files : [diagram.File]));
            lines.Add(":" + Text(label) + ";");
            lines.Add("' source-segment: " + first.Id);
            foreach (var detail in details) lines.Add("' " + Text(detail));
            run.Clear();
        }
        bool Branch(SequenceItem item, int index)
        {
            decisions.Add(item);
            lines.Add("if (Source alternatives) then (" + Text(item.Branches[index].Label) + ")");
            var ended = Emit(item.Branches[index].Items);
            var final = index + 2 == item.Branches.Length;
            lines.Add("else (" + (final ? Text(item.Branches[index + 1].Label) : "other source alternatives") + ")");
            var otherEnded = final ? Emit(item.Branches[index + 1].Items) : Branch(item, index + 1);
            lines.Add("endif"); return ended && otherEnded;
        }
        bool Emit(SequenceItem[] items)
        {
            var run = new List<SequenceItem>();
            foreach (var item in items)
            {
                if (item.Kind == "fragment")
                {
                    Flush(run);
                    if (item.Branches.Length < 2) throw new Exception($"Interaction fragment {item.Id} needs at least two branches.");
                    if (Branch(item, 0)) return true;
                }
                else
                {
                    run.Add(item);
                    if (item.Reply && source.Sequence.Nodes.Single(n => n.Id == item.Target).Kind == "actor")
                    {
                        Flush(run); lines.Add("stop"); return true;
                    }
                }
            }
            Flush(run); return false;
        }
        lines.Add("start"); if (!Emit(source.Sequence.Sequence!.Items)) lines.Add("stop");
        if (!representedMessages.SequenceEqual(source.Messages.Select(m => m.Id)))
            throw new Exception($"Overview {diagram.Id} cannot partition the source interaction without losing messages. Replies to the external actor must terminate their path.");
        lines.Add("note right");
        lines.Add("Each ref groups a contiguous segment of " + Text(source.Id) + ". Open a reference for its messages and boundaries.");
        lines.Add("Guards and replies come from the same source sequence. Alternative paths are not an execution trace.");
        lines.Add("end note"); lines.Add("@enduml");
        var definition = new GeneratedCodeDiagram(string.Join("\n", lines) + "\n", new(StringComparer.Ordinal));
        var view = CodeDiagrams.View(diagram, definition);
        int decision = 0;
        view = view with { InteractionId = source.Id, Nodes = view.Nodes.Select(n => {
            var segment = segments.SingleOrDefault(s => s.Label == n.Name);
            if (segment is not null) return n with { Members = segment.Details, Files = segment.Files,
                StoryId = source.StoryId, Reference = new(source.Id, segment.SourceElement) };
            if (n.Kind == "decision") { var original = decisions[decision++]; return n with {
                Members = original.Branches.Select(b => b.Label).ToArray(), StoryId = source.StoryId, Reference = new(source.Id, original.Id) }; }
            return n with { StoryId = source.StoryId };
        }).ToArray() };
        return new(definition, view);
    }
}
