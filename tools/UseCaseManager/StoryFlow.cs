using System.Text.RegularExpressions;

namespace UseCaseManagement;

public sealed record StoryStep(int Number, string Text);
public sealed record StoryAlternative(string Condition, string Response, int? AfterStep);
public sealed record StoryFlow(StoryStep[] Steps, StoryAlternative[] Alternatives, string[] Done)
{
    // Branch locations are explicit annotations on the existing alternative, not inferred from prose.
    public static StoryFlow Read(Story story)
    {
        var steps = story.Sections.Single(s => s.Heading == "Flow").Lines
            .Select(l => Regex.Match(l, @"^(\d+)\. (.+)$")).Where(m => m.Success)
            .Select(m => new StoryStep(int.Parse(m.Groups[1].Value, System.Globalization.CultureInfo.InvariantCulture), Plain(m.Groups[2].Value))).ToArray();
        var alternatives = new List<StoryAlternative>();
        foreach (var line in story.Sections.Single(s => s.Heading == "Alternatives").Lines.Where(l => l.StartsWith("- ", StringComparison.Ordinal)))
        {
            var text = line[2..];
            int? after = null;
            if (text.Contains("<!--", StringComparison.Ordinal))
            {
                var marker = Regex.Match(text, @"\s*<!-- after: ([1-9][0-9]*); outcome: end -->$");
                if (!marker.Success || text[..marker.Index].Contains("<!--", StringComparison.Ordinal))
                    throw new InvalidDataException(story.Source + ": use <!-- after: STEP; outcome: end --> on an alternative.");
                if (!int.TryParse(marker.Groups[1].Value, out var number) || !steps.Any(s => s.Number == number))
                    throw new InvalidDataException(story.Source + ": alternative refers to an unknown Flow step.");
                after = number;
                text = text[..marker.Index];
            }
            var split = Regex.Match(text, @"^\*\*(.+?):\*\*\s+(.+)$");
            if (after is not null && !split.Success)
                throw new InvalidDataException(story.Source + ": a mapped alternative needs **Condition:** response.");
            alternatives.Add(new(split.Success ? Plain(split.Groups[1].Value) : "Alternative",
                Plain(split.Success ? split.Groups[2].Value : text), after));
        }
        var done = story.Sections.Single(s => s.Heading == "Done when").Lines.Where(l => l.StartsWith("- ", StringComparison.Ordinal)).Select(l => Plain(l[2..])).ToArray();
        return new(steps, alternatives.ToArray(), done);
    }

    public static string Plain(string text)
    {
        text = Regex.Replace(text, @"\s*<!-- after: [1-9][0-9]*; outcome: end -->", "");
        text = Regex.Replace(text, @"\[([^\]]+)\]\([^)]+\)", "$1");
        return text.Replace("**", "", StringComparison.Ordinal).Replace("`", "", StringComparison.Ordinal).Trim();
    }
}
