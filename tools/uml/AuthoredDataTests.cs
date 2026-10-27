static class AuthoredDataTests
{
    public static int Run()
    {
        int count = 0;
        GraphView Read(string type, string body) => AuthoredData.Parse(new Diagram("example", type, "Example", "docs/uml/example.puml", "reviewed", "active", null, [], [], [], []), "@startuml\n" + body + "\n@enduml");
        void Assert(bool value, string label) { if (!value) throw new Exception("Authored data test failed: " + label); count++; Console.WriteLine("PASS: " + label); }
        void Reject(Action action, string label) { bool failed = false; try { action(); } catch (Exception e) { failed = e.Message.Contains("docs/uml/example.puml:", StringComparison.Ordinal); } Assert(failed, label); }

        var sequence = Read("sequence", "participant A\nparticipant B\nA -> B : Request\nalt Reject\nB --> A : Failure\nelse Continue\nalt Explicit\nA -> B : Specific\nelse Automatic\nA -> B : Auto\nend\nB --> A : Success\nend");
        Assert(sequence.Sequence!.Participants.Length == 2 && sequence.Sequence.Items[0].Label == "Request", "sequence preserves participant and message order");
        var alternatives = sequence.Sequence.Items[1];
        Assert(alternatives.Branches.Select(b => b.Label).SequenceEqual(new[] { "Reject", "Continue" }), "sequence alternatives remain mutually exclusive branches");
        Assert(alternatives.Branches[1].Items[0].Branches.Length == 2 && alternatives.Branches[0].Items[0].Reply, "nested sequence frames and replies retain semantics");
        Assert(sequence.Nodes.Single(n => n.Name == "Specific").Parent == alternatives.Branches[1].Items[0].Id, "sequence items retain nested frame ancestry");
        Reject(() => Read("sequence", "participant A\nA -> Missing : Request"), "unresolved lifelines are rejected with source location");
        Reject(() => Read("sequence", "participant A\nalt Open\nA -> A : Request"), "unclosed alternative frames are rejected");

        var activity = Read("activity", "start\nif (Allowed?) then (yes)\n:Continue;\nelse (no)\n:Reject;\nstop\nendif\n:Complete;\nstop");
        var decision = activity.Nodes.Single(n => n.Kind == "decision");
        Assert(activity.Edges.Where(e => e.Source == decision.Id).Select(e => e.Label).Order().SequenceEqual(new[] { "no", "yes" }), "activity guards remain on the correct decision branches");
        var rejected = activity.Nodes.Single(n => n.Name == "Reject");
        Assert(activity.Nodes.Single(n => n.Id == activity.Edges.Single(e => e.Source == rejected.Id).Target).Kind == "final", "terminated activity branches do not reconnect to success paths");
        Assert(activity.Nodes.Count(n => n.Kind == "final") == 2, "independent activity termination points are preserved");
        var merge = Read("activity", "start\nif (Choice?) then (yes)\n:First;\nelse (no)\n:Second;\nendif\n:After;\nstop");
        Assert(merge.Nodes.Any(n => n.Kind == "merge"), "converging alternatives have an explicit merge node");

        var state = Read("state-machine", "[*] --> Empty\nEmpty --> Empty : Clear() / no change\nEmpty --> Occupied : Park() [fits]\nnote right of Empty\nRejected parking leaves the state unchanged.\nend note");
        Assert(state.Edges.Any(e => e.Source == e.Target && e.Label.Contains("Clear()", StringComparison.Ordinal)), "state self-transitions retain triggers and actions");
        Assert(state.Nodes.Single(n => n.Name == "Empty").Members.Single().Contains("unchanged", StringComparison.Ordinal), "state notes remain attached to their state");

        var deployment = Read("deployment", "node \"Machine\" as Host {\nnode \"Runtime\" as Runtime {\nartifact \"App\" as App\n}\nfolder \"Files\" as Files\nApp ..> Files : reads\n}");
        Assert(deployment.Nodes.Single(n => n.Name == "App").Parent == deployment.Nodes.Single(n => n.Name == "Runtime").Id, "deployment keeps nested runtime containment");
        Assert(deployment.Nodes.Single(n => n.Name == "Runtime").Parent == deployment.Nodes.Single(n => n.Name == "Machine").Id && deployment.Edges.Single().Kind == "dependency", "deployment hierarchy and dependency notation remain distinct");
        var useCase = Read("use-case", "actor User\nrectangle \"System\" {\nusecase \"Park\" as Park\n}\nUser --> Park");
        Assert(useCase.Nodes.Single(n => n.Name == "User").Parent is null && useCase.Nodes.Single(n => n.Name == "Park").Parent is not null, "actors stay outside the use-case system boundary");
        var objects = Read("object", "object \"garage : Garage\" as Garage {\nCapacity = 2\n}\nobject \"spot : Spot\" as Spot\nGarage *-- Spot : spots");
        Assert(objects.Nodes[0].Members.Single() == "Capacity = 2" && objects.Edges.Single().Kind == "composition", "object values and composition are preserved");
        var profile = Read("profile", "class \"Class\" as Class <<metaclass>>\nclass \"Entity\" as Entity <<stereotype>>\nEntity --|> Class : extends");
        Assert(profile.Nodes.Select(n => n.Kind).SequenceEqual(new[] { "metaclass", "stereotype" }), "profile metaclasses and stereotypes retain their roles");
        var communication = Read("communication", "object A\nobject B\nA --> B : 1.1: Call()");
        Assert(communication.Edges.Single().Label == "1.1: Call()", "communication message numbering is preserved");

        var timing = Read("timing", "robust \"Spot\" as Spot\n@0\nSpot is Empty\n@10\nSpot is Occupied\n@20\nSpot is Empty");
        Assert(timing.Timing!.Lanes[0].Samples.Select(s => s.Time).SequenceEqual(new double[] { 0, 10, 20 }) && timing.Timing.Lanes[0].Samples[1].State == "Occupied", "timing samples preserve explicit time and state");
        Reject(() => Read("timing", "robust \"Spot\" as Spot\n@10\nSpot is Empty\n@5\nSpot is Occupied"), "non-monotonic timing samples are rejected");
        Reject(() => Read("activity", "start\nfork\nstop"), "unsupported notation fails explicitly instead of silently dropping semantics");
        return count;
    }
}
