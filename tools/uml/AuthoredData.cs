using System.Globalization;
using System.Text.RegularExpressions;

// A deliberately bounded reader for the notation used by our authored diagrams.
// Unsupported statements fail generation with a source location instead of producing a misleading view.
static class AuthoredData
{
    public static SortedDictionary<string, GraphView> Create(string root, Manifest manifest)
    {
        var views = new SortedDictionary<string, GraphView>(StringComparer.Ordinal);
        foreach (var diagram in manifest.Diagrams.Where(d => d.Maintenance != "generated"))
            views[diagram.Id] = Parse(diagram, File.ReadAllText(Uml.At(root, diagram.File)));
        return views;
    }

    public static GraphView Parse(Diagram diagram, string source) => new Reader(diagram, source).Read();

    sealed class Reader
    {
        readonly Diagram diagram;
        readonly string[] lines;
        readonly Dictionary<string, GraphNode> nodes = new(StringComparer.Ordinal);
        readonly List<GraphEdge> edges = [];
        readonly List<string> notes = [];
        readonly Stack<string> containers = new();
        int serial;
        int cursor;

        public Reader(Diagram diagram, string source)
        {
            this.diagram = diagram;
            lines = source.Replace("\r\n", "\n").Split('\n').Select(l => l.Trim()).ToArray();
        }
        string Id(string local) => diagram.Id + ":" + local;
        string Next(string prefix) => Id(prefix + "-" + ++serial);
        static string Text(string text) => text.Replace("\\n", " ").Trim();
        string Error(string text) => $"{diagram.File}:{cursor + 1}: {text}";
        GraphNode Add(string alias, string name, string kind, string? parent = null, string[]? members = null)
        {
            var id = Id(alias);
            var group = parent is not null && nodes.TryGetValue(parent, out var owner) ? owner.Name : "";
            var node = new GraphNode(id, Text(name), kind, group, members ?? [], [diagram.File], "", [], parent);
            if (!nodes.TryAdd(id, node)) throw new Exception(Error("Duplicate entity " + alias));
            return node;
        }
        GraphNode AddAuto(string name, string kind, string? parent = null, string[]? members = null) => Add("element-" + ++serial, name, kind, parent, members);
        void Link(string from, string to, string kind, string label = "") => edges.Add(new GraphEdge(Next("edge"), from, to, kind, Text(label)));
        bool Skip()
        {
            var line = lines[cursor];
            if (line.Length == 0 || line.StartsWith('\'') || line.StartsWith('@') && !Regex.IsMatch(line, "^@[-0-9]") ||
                line.StartsWith("title ", StringComparison.Ordinal) || line == "left to right direction" || line.StartsWith("skinparam ", StringComparison.Ordinal) || line.StartsWith("hide ", StringComparison.Ordinal)) { cursor++; return true; }
            if (line.StartsWith("legend", StringComparison.Ordinal))
            {
                while (cursor < lines.Length && lines[cursor] != "endlegend") cursor++;
                if (cursor == lines.Length) throw new Exception(Error("Unclosed legend"));
                cursor++; return true;
            }
            return false;
        }
        string ReadNote()
        {
            var start = lines[cursor++];
            var content = new List<string>();
            while (cursor < lines.Length && lines[cursor] != "end note") content.Add(lines[cursor++]);
            if (cursor == lines.Length) throw new Exception(Error("Unclosed note"));
            cursor++;
            var text = Text(string.Join(" ", content));
            notes.Add(text);
            var reference = Regex.Match(start, @"\bof\s+(\w+)$");
            if (reference.Success && nodes.TryGetValue(Id(reference.Groups[1].Value), out var node)) nodes[node.Id] = node with { Members = node.Members.Append(text).ToArray() };
            return text;
        }
        public GraphView Read()
        {
            SequenceSpec? sequence = null;
            TimingSpec? timing = null;
            if (diagram.Type == "sequence") sequence = ReadSequence();
            else if (diagram.Type == "timing") timing = ReadTiming();
            else if (diagram.Type is "activity" or "interaction-overview") ReadActivity();
            else ReadEntities();
            foreach (var container in nodes.Values.ToArray())
            {
                var children = nodes.Values.Where(n => n.Parent == container.Id).ToArray();
                if (children.Length > 0 && diagram.Type is not ("sequence" or "timing")) nodes[container.Id] = container with { Members = container.Members.Concat(children.Select(n => "Contains: " + n.Name)).ToArray() };
            }
            if (nodes.Count == 0) throw new Exception(Error("No supported diagram elements found"));
            foreach (var edge in edges)
                if (!nodes.ContainsKey(edge.Source) || !nodes.ContainsKey(edge.Target)) throw new Exception(Error("Unresolved relation " + edge.Label));
            return new GraphView(diagram.Id, diagram.Title, diagram.Type, nodes.Values.ToArray(), edges.ToArray(), sequence, timing, notes.ToArray());
        }
        void ReadEntities()
        {
            while (cursor < lines.Length)
            {
                if (Skip()) continue;
                var line = lines[cursor];
                if (line.StartsWith("note ", StringComparison.Ordinal)) { ReadNote(); continue; }
                if (line == "}") { if (!containers.TryPop(out _)) throw new Exception(Error("Unmatched entity brace")); cursor++; continue; }
                var declaration = Regex.Match(line, "^(actor|object|component|rectangle|node|artifact|folder|package|class|usecase)\\s+(?:\"([^\"]+)\"(?:\\s+as\\s+(\\w+))?|(\\w+))(?:\\s+<<([^>]+)>>)?\\s*(\\{)?$");
                if (declaration.Success)
                {
                    var keyword = declaration.Groups[1].Value;
                    var name = declaration.Groups[2].Success ? declaration.Groups[2].Value : declaration.Groups[4].Value;
                    var alias = declaration.Groups[3].Success ? declaration.Groups[3].Value : declaration.Groups[4].Success ? declaration.Groups[4].Value : "container-" + ++serial;
                    var hasBody = declaration.Groups[6].Success;
                    var nodeKind = keyword switch { "node" => "device", "rectangle" => "boundary", "usecase" => "use-case", "class" when declaration.Groups[5].Success => declaration.Groups[5].Value, _ => keyword };
                    var parent = containers.TryPeek(out var owner) ? owner : null;
                    var node = Add(alias, name, nodeKind, parent);
                    cursor++;
                    if (hasBody && keyword is "object" or "class")
                    {
                        var members = new List<string>();
                        while (cursor < lines.Length && lines[cursor] != "}") members.Add(Text(lines[cursor++]));
                        if (cursor == lines.Length) throw new Exception(Error("Unclosed member compartment"));
                        cursor++; nodes[node.Id] = node with { Members = members.ToArray() };
                    }
                    else if (hasBody) containers.Push(node.Id);
                    continue;
                }
                var relationship = Regex.Match(line, @"^(\[\*\]|\w+)\s+([.*<|o-]+>)?([.*<|o-]+)?\s*(\[\*\]|\w+)(?:\s*:\s*(.+))?$");
                if (!relationship.Success) throw new Exception(Error("Unsupported statement: " + line));
                var from = relationship.Groups[1].Value;
                var arrow = relationship.Groups[2].Value + relationship.Groups[3].Value;
                var to = relationship.Groups[4].Value;
                var label = relationship.Groups[5].Value;
                if (diagram.Type == "state-machine")
                {
                    if (from == "[*]") { from = "initial"; if (!nodes.ContainsKey(Id(from))) Add(from, "Start", "initial"); }
                    else if (!nodes.ContainsKey(Id(from))) Add(from, from, "state");
                    if (to == "[*]") { to = "final"; if (!nodes.ContainsKey(Id(to))) Add(to, "End", "final"); }
                    else if (!nodes.ContainsKey(Id(to))) Add(to, to, "state");
                }
                var kind = arrow.Contains("|>", StringComparison.Ordinal) ? "inheritance" : arrow.Contains('*') ? "composition" : arrow.StartsWith('o') ? "aggregation" : diagram.Type == "state-machine" ? "transition" : diagram.Type == "communication" ? "message" : diagram.Type == "use-case" ? "association" : arrow.Contains('.') ? "dependency" : "connection";
                Link(Id(from), Id(to), kind, label);
                cursor++;
            }
            if (containers.Count != 0) throw new Exception(Error("Unclosed container"));
        }

        void ReadActivity()
        {
            var tails = new List<(string Id, string Label)>();
            var conditions = new Stack<ActivityBranch>();
            void Connect(GraphNode node)
            {
                foreach (var tail in tails) Link(tail.Id, node.Id, "flow", tail.Label);
                tails = [(node.Id, "")];
            }
            while (cursor < lines.Length)
            {
                if (Skip()) continue;
                var line = lines[cursor];
                if (line.StartsWith("note ", StringComparison.Ordinal)) { ReadNote(); continue; }
                if (line == "start") { Connect(AddAuto("Start", "initial")); cursor++; continue; }
                if (line is "stop" or "end") { Connect(AddAuto("End", "final")); tails = []; cursor++; continue; }
                if (line.StartsWith(':') && line.EndsWith(';')) { var label = Text(line[1..^1]); Connect(AddAuto(label, label.StartsWith("ref -", StringComparison.Ordinal) ? "interaction" : "action")); cursor++; continue; }
                var condition = Regex.Match(line, @"^if\s*\((.+)\)\s*then\s*\((.+)\)$");
                if (condition.Success)
                {
                    var decision = AddAuto(condition.Groups[1].Value, "decision");
                    Connect(decision);
                    conditions.Push(new ActivityBranch(decision.Id));
                    tails = [(decision.Id, condition.Groups[2].Value)]; cursor++; continue;
                }
                var alternative = Regex.Match(line, @"^else(?:\s*\((.+)\))?$");
                if (alternative.Success)
                {
                    if (!conditions.TryPeek(out var branch)) throw new Exception(Error("else without if"));
                    branch.Then = tails; branch.HasElse = true;
                    tails = [(branch.Decision, alternative.Groups[1].Success ? alternative.Groups[1].Value : "else")]; cursor++; continue;
                }
                if (line == "endif")
                {
                    if (!conditions.TryPop(out var branch)) throw new Exception(Error("endif without if"));
                    var incoming = branch.HasElse ? branch.Then.Concat(tails).ToList() : tails.Append((branch.Decision, "no")).ToList();
                    if (incoming.Count > 1) { tails = incoming; Connect(AddAuto("Merge", "merge")); }
                    else tails = incoming;
                    cursor++; continue;
                }
                throw new Exception(Error("Unsupported activity statement: " + line));
            }
            if (conditions.Count != 0) throw new Exception(Error("Unclosed activity condition"));
        }
        sealed class ActivityBranch(string decision)
        {
            public string Decision { get; } = decision;
            public bool HasElse { get; set; }
            public List<(string Id, string Label)> Then { get; set; } = [];
        }

        SequenceSpec ReadSequence()
        {
            var participants = new List<string>();
            while (cursor < lines.Length)
            {
                if (Skip()) continue;
                var declaration = Regex.Match(lines[cursor], "^(actor|participant)\\s+(?:\"([^\"]+)\"\\s+as\\s+(\\w+)|(\\w+))$");
                if (!declaration.Success) break;
                var alias = declaration.Groups[3].Success ? declaration.Groups[3].Value : declaration.Groups[4].Value;
                var name = declaration.Groups[2].Success ? declaration.Groups[2].Value : alias;
                participants.Add(Add(alias, name, declaration.Groups[1].Value).Id); cursor++;
            }
            var items = SequenceItems(null);
            while (cursor < lines.Length) if (!Skip()) throw new Exception(Error("Unmatched sequence control statement: " + lines[cursor]));
            if (participants.Count == 0) throw new Exception(Error("Sequence has no participants"));
            return new SequenceSpec(participants.ToArray(), items);
        }
        SequenceItem[] SequenceItems(string? parent)
        {
            var items = new List<SequenceItem>();
            while (cursor < lines.Length)
            {
                if (Skip()) continue;
                var line = lines[cursor];
                if (line == "end" || line.StartsWith("else", StringComparison.Ordinal)) break;
                if (line.StartsWith("alt ", StringComparison.Ordinal))
                {
                    var node = AddAuto("Alternative paths", "fragment", parent);
                    var branches = new List<SequenceBranch>();
                    var label = line[4..]; cursor++;
                    while (true)
                    {
                        branches.Add(new SequenceBranch(label, SequenceItems(node.Id)));
                        if (cursor >= lines.Length) throw new Exception(Error("Unclosed sequence alt"));
                        if (lines[cursor] == "end") { cursor++; break; }
                        if (!lines[cursor].StartsWith("else", StringComparison.Ordinal)) throw new Exception(Error("Invalid sequence branch"));
                        label = lines[cursor][4..].Trim(); cursor++;
                    }
                    nodes[node.Id] = node with { Name = "alt · " + branches.Count + " paths", Members = branches.Select(b => b.Label).ToArray() };
                    items.Add(new SequenceItem(node.Id, "fragment", "Alternative paths", null, null, false, branches.ToArray())); continue;
                }
                if (line.StartsWith("note ", StringComparison.Ordinal))
                {
                    var note = AddAuto(ReadNote(), "note", parent);
                    items.Add(new SequenceItem(note.Id, "note", note.Name, null, null, false, [])); continue;
                }
                var message = Regex.Match(line, @"^(\w+)\s*(--?>)\s*(\w+)\s*:\s*(.+)$");
                if (!message.Success) throw new Exception(Error("Unsupported sequence statement: " + line));
                var from = Id(message.Groups[1].Value); var to = Id(message.Groups[3].Value);
                if (!nodes.ContainsKey(from) || !nodes.ContainsKey(to)) throw new Exception(Error("Unknown sequence participant"));
                var reply = message.Groups[2].Value == "-->";
                var msg = AddAuto(message.Groups[4].Value, reply ? "reply" : "message", parent,
                    [$"From {nodes[from].Name} to {nodes[to].Name}", reply ? "Reply / returned result" : "Synchronous message / call"]);
                Link(from, to, reply ? "reply" : "message", msg.Name);
                items.Add(new SequenceItem(msg.Id, msg.Kind, msg.Name, from, to, reply, [])); cursor++;
            }
            return items.ToArray();
        }
        TimingSpec ReadTiming()
        {
            var lanes = new Dictionary<string, List<TimingSample>>(StringComparer.Ordinal);
            double? time = null;
            while (cursor < lines.Length)
            {
                if (Skip()) continue;
                var line = lines[cursor];
                var declaration = Regex.Match(line, "^robust\\s+\"([^\"]+)\"\\s+as\\s+(\\w+)$");
                if (declaration.Success) { var lane = Add(declaration.Groups[2].Value, declaration.Groups[1].Value, "signal"); lanes[lane.Id] = []; cursor++; continue; }
                if (line.StartsWith('@') && double.TryParse(line[1..], NumberStyles.Float, CultureInfo.InvariantCulture, out var value)) { time = value; cursor++; continue; }
                var sample = Regex.Match(line, @"^(\w+)\s+is\s+(.+)$");
                if (!sample.Success || time is null || !lanes.TryGetValue(Id(sample.Groups[1].Value), out var samples)) throw new Exception(Error("Unsupported timing statement: " + line));
                if (samples.Count > 0 && time <= samples[^1].Time) throw new Exception(Error("Timing samples must increase strictly"));
                var state = Text(sample.Groups[2].Value);
                var point = AddAuto(state + " @ t=" + time.Value.ToString(CultureInfo.InvariantCulture), "timing-event", Id(sample.Groups[1].Value), [$"State: {state}", $"Time: {time.Value.ToString(CultureInfo.InvariantCulture)}", "Illustrative units; no measured duration is implied."]);
                samples.Add(new TimingSample(point.Id, time.Value, state)); cursor++;
            }
            foreach (var lane in lanes)
            {
                if (lane.Value.Count == 0) throw new Exception(Error("Empty timing lane"));
                nodes[lane.Key] = nodes[lane.Key] with { Members = lane.Value.Select(sample => sample.Time.ToString(CultureInfo.InvariantCulture) + ": " + sample.State).ToArray() };
            }
            return new TimingSpec(lanes.Select(lane => new TimingLane(lane.Key, nodes[lane.Key].Name, lane.Value.ToArray())).ToArray());
        }
    }
}
