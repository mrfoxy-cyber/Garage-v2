using System.Net;
using System.Text;
using System.Text.RegularExpressions;

namespace UseCaseManagement;

public sealed record Requirement(string Id, string Title, string Description, string Priority, string Source);
public sealed record StorySection(string Heading, List<string> Lines);
public sealed record Story(string Id, string Title, string Goal, string Actor, string Priority,
    List<string> Requirements, List<StorySection> Sections, string Source);
public sealed record Catalogue(int Version, List<Requirement> Requirements, List<Story> Stories);

public static class CatalogueStore
{
    public const string MarkdownOutput = "UseCases/catalogue.generated.md";
    public const string HtmlOutput = "docs/uml/use-cases.generated.html";
    public static string Read(string path) => File.ReadAllText(path).Replace("\r\n", "\n").TrimStart('\uFEFF');
    public static bool ValidId(string id) => Regex.IsMatch(id, @"\A[a-z0-9]+(?:-[a-z0-9]+)*\z");
    public static string At(string root, string relative)
    {
        var path = Path.GetFullPath(Path.Combine(root, relative));
        var local = Path.GetRelativePath(root, path);
        if (local == ".." || local.StartsWith(".." + Path.DirectorySeparatorChar, StringComparison.Ordinal) || Path.IsPathRooted(local))
            throw new InvalidDataException("Path escapes the repository: " + relative);
        return path;
    }
    static void Require(bool condition, string source, string message)
    {
        if (!condition) throw new InvalidDataException(source + ": " + message);
    }
    public static Catalogue? TryLoad(string root) => Directory.Exists(Path.Combine(root, "UseCases")) ? Load(root) : null;
    public static Catalogue Load(string root)
    {
        var requirements = new List<Requirement>();
        foreach (var (source, priority) in new[] { ("UseCases/requirements/README.md", "required"), ("UseCases/optional/README.md", "optional") })
            foreach (Match match in Regex.Matches(Read(At(root, source)), @"(?m)^- \*\*((?:GAR|OPT)-\d+) — (.+?):\*\* (.+)$"))
                requirements.Add(new(match.Groups[1].Value, match.Groups[2].Value, match.Groups[3].Value, priority, source));
        Require(requirements.Any(r => r.Priority == "required"), "Requirements", "no required definitions found.");
        Require(requirements.Select(r => r.Id).Distinct(StringComparer.Ordinal).Count() == requirements.Count, "Requirements", "duplicate requirement ID.");
        var stories = new List<Story>();
        foreach (var folder in new[] { "UseCases/garage", "UseCases/optional" })
            foreach (var file in Directory.EnumerateFiles(At(root, folder), "*.md", SearchOption.AllDirectories).Order(StringComparer.Ordinal))
                if (!Path.GetFileName(file).Equals("README.md", StringComparison.OrdinalIgnoreCase))
                {
                    var source = Path.GetRelativePath(root, file).Replace('\\', '/');
                    var text = Read(file);
                    stories.Add(Parse(source, text));
                    ValidateLinks(root, source, text);
                }
        Require(stories.Select(s => s.Id).Distinct(StringComparer.Ordinal).Count() == stories.Count, "Stories", "duplicate story ID.");
        var catalogue = new Catalogue(1, requirements.OrderBy(r => r.Id, StringComparer.Ordinal).ToList(),
            stories.OrderBy(s => s.Priority == "required" ? 0 : 1).ThenBy(s => s.Title, StringComparer.Ordinal).ThenBy(s => s.Id, StringComparer.Ordinal).ToList());
        foreach (var story in stories) ValidateReferences(story, catalogue);
        return catalogue;
    }
    public static Story Parse(string source, string text)
    {
        var footer = Regex.Match(text, @"(?m)^\x60{3}yaml\n([\s\S]*?)^\x60{3}\s*\z");
        Require(footer.Success, source, "a final yaml footer with id, priority and requirements is required.");
        var fields = new Dictionary<string, string>(StringComparer.Ordinal);
        foreach (var line in footer.Groups[1].Value.Split('\n').Where(l => l.Length > 0))
        {
            var pair = line.Split(':', 2);
            Require(pair.Length == 2 && new[] { "id", "priority", "requirements" }.Contains(pair[0]) && fields.TryAdd(pair[0], pair[1].Trim()),
                source, "unknown or duplicate metadata field: " + line);
        }
        Require(fields.Count == 3, source, "supply id, priority and requirements.");
        Require(ValidId(fields["id"]), source, "invalid lowercase story ID.");
        Require(fields["priority"] is "required" or "optional", source, "priority must be required or optional.");
        Require(source.StartsWith(fields["priority"] == "required" ? "UseCases/garage/" : "UseCases/optional/", StringComparison.Ordinal), source, "folder and priority disagree.");
        var references = fields["requirements"];
        Require(Regex.IsMatch(references, @"\A\[(?:(?:GAR|OPT)-\d+(?:,\s*(?:GAR|OPT)-\d+)*)?\]\z"), source, "requirements must be a list of checklist IDs.");
        var ids = Regex.Matches(references, @"(?:GAR|OPT)-\d+").Select(m => m.Value).ToList();
        Require(ids.Distinct(StringComparer.Ordinal).Count() == ids.Count, source, "duplicate requirement reference.");
        var body = text[..footer.Index];
        Require(!Regex.IsMatch(body, @"\[(?:User |The outcome|System response|Successful outcome|Condition|Expected response|An observable|An important)[^\]]*\]"),
            source, "replace template placeholders; every story must be complete.");
        string One(string pattern, string label)
        {
            var matches = Regex.Matches(body, pattern, RegexOptions.Multiline);
            Require(matches.Count == 1 && !string.IsNullOrWhiteSpace(matches[0].Groups[1].Value), source, "supply one " + label + ".");
            return matches[0].Groups[1].Value.Trim();
        }
        var title = One(@"^# (.+)$", "title");
        var goal = One(@"^\*\*Goal:\*\* (.+)$", "goal");
        var actor = One(@"^\*\*Actor:\*\* (.+)$", "actor");
        var headings = Regex.Matches(body, @"(?m)^## (.+)$");
        Require(headings.Select(h => h.Groups[1].Value).SequenceEqual(new[] { "Flow", "Alternatives", "Done when" }), source, "use Flow, Alternatives and Done when sections.");
        var sections = new List<StorySection>();
        for (var i = 0; i < headings.Count; i++)
            sections.Add(new(headings[i].Groups[1].Value, body[(headings[i].Index + headings[i].Length)..(i + 1 < headings.Count ? headings[i + 1].Index : body.Length)].Trim().Split('\n').ToList()));
        var steps = sections[0].Lines.Select(l => Regex.Match(l, @"^(\d+)\. .+")).Where(m => m.Success).ToList();
        Require(steps.Count > 0 && steps.Select(m => m.Groups[1].Value).SequenceEqual(Enumerable.Range(1, steps.Count).Select(n => n.ToString(System.Globalization.CultureInfo.InvariantCulture))), source, "number Flow steps from 1 without gaps.");
        Require(sections.Skip(1).All(s => s.Lines.Any(l => Regex.IsMatch(l, @"^- \S"))), source, "Alternatives and Done when each need content.");
        var story = new Story(fields["id"], title, goal, actor, fields["priority"], ids, sections, source);
        StoryFlow.Read(story);
        return story;
    }
    public static void ValidateReferences(Story story, Catalogue catalogue)
    {
        Require(!catalogue.Stories.Any(s => s.Id == story.Id && s.Source != story.Source), story.Source, "duplicate story ID.");
        foreach (var id in story.Requirements)
        {
            var requirement = catalogue.Requirements.SingleOrDefault(r => r.Id == id);
            Require(requirement is not null, story.Source, "unknown requirement " + id);
            Require(story.Priority == "optional" || requirement!.Priority == "required", story.Source, "optional requirement cannot become mandatory: " + id);
        }
        Require(story.Priority != "required" || story.Requirements.Count > 0, story.Source, "required story needs a checklist reference.");
    }
    public static void ValidateLinks(string root, string source, string text)
    {
        foreach (Match link in Regex.Matches(text, @"\[[^\]\n]+\]\(([^)\n]+)\)"))
        {
            var target = link.Groups[1].Value.Split('#')[0];
            if (target.Length == 0 || Regex.IsMatch(target, @"\A(?:https?://|mailto:)", RegexOptions.IgnoreCase)) continue;
            Require(!Regex.IsMatch(target, @"\A[a-zA-Z][\w+.-]*:"), source, "unsupported link: " + target);
            var path = At(root, Path.Combine(Path.GetDirectoryName(source)!, Uri.UnescapeDataString(target)));
            Require(File.Exists(path) || Directory.Exists(path), source, "broken local link: " + target);
        }
    }
    public static SortedDictionary<string, string> Outputs(Catalogue catalogue)
    {
        var md = new StringBuilder("# Use-case catalogue\n\nGenerated from complete story files. Edit the stories, then regenerate.\n\nRequired/optional describes scope; inclusion does not certify implementation or test coverage.\n");
        foreach (var priority in new[] { "required", "optional" })
        {
            var group = catalogue.Stories.Where(s => s.Priority == priority).ToList();
            md.Append($"\n## {(priority == "required" ? "Required" : "Optional")} ({group.Count})\n\n");
            if (group.Count == 0) { md.Append("No stories in this category. Candidate ideas are in the [enhancement list](optional/README.md).\n"); continue; }
            foreach (var story in group)
            {
                var title = story.Title.Replace("[", "\\[").Replace("]", "\\]").Replace("<", "&lt;").Replace(">", "&gt;");
                var url = string.Join('/', story.Source["UseCases/".Length..].Split('/').Select(Uri.EscapeDataString));
                md.Append($"- [{title}]({url}) — {story.Id}\n");
            }
        }
        return new(StringComparer.Ordinal) { [MarkdownOutput] = md.ToString(), [HtmlOutput] = Html(catalogue) };
    }
    static string Html(Catalogue catalogue)
    {
        static string H(string text) => WebUtility.HtmlEncode(text);
        static string Url(string source) => "../../" + string.Join('/', source.Split('/').Select(Uri.EscapeDataString));
        static string Inline(string text, Story story)
        {
            text = Regex.Replace(text, @"\s*<!-- after: [1-9][0-9]*; outcome: end -->", "");
            var encoded = H(text);
            encoded = Regex.Replace(encoded, @"\*\*(.+?)\*\*", "<strong>$1</strong>");
            encoded = Regex.Replace(encoded, @"\x60([^\x60]+)\x60", "<code>$1</code>");
            return Regex.Replace(encoded, @"\[([^\]]+)\]\(([^)]+)\)", match => {
                var target = WebUtility.HtmlDecode(match.Groups[2].Value);
                var href = Regex.IsMatch(target, @"\A(?:https?://|mailto:)", RegexOptions.IgnoreCase) ? target : "../../" + Path.GetDirectoryName(story.Source)!.Replace('\\', '/') + "/" + target;
                return "<a target=\"_top\" href=\"" + H(href) + "\">" + match.Groups[1].Value + "</a>";
            });
        }
        var html = new StringBuilder("""
            <!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Use-case stories</title>
            <style>:root{font:15px/1.65 'Segoe UI',system-ui,sans-serif;color:#1b2c3c;background:#f6f8fa}body{max-width:920px;margin:auto;padding:24px}h1{font-size:30px;margin:0}h2{font-size:18px;margin:30px 0 12px}h3{font-size:16px;margin:24px 0 8px}p{margin:8px 0}a{color:#286f60}nav{display:flex;gap:18px;margin:20px 0}details{border:1px solid #dfe6eb;border-radius:10px;background:white;margin:10px 0}summary{cursor:pointer;padding:16px 20px;font-weight:650}summary small{float:right;font-weight:400;color:#647587}.story{padding:0 24px 24px}.meta{color:#647587;font-size:13px}.references{border-top:1px solid #e2e8ee;margin-top:24px;padding-top:12px}li{margin:6px 0}code{background:#edf2f6;padding:2px 4px;border-radius:4px}details:focus-within{outline:2px solid #79ac99}small{font-size:12px}@media(max-width:600px){body{padding:14px}summary small{float:none;display:block}.story{padding:0 16px 16px}}</style></head><body>
            <h1>Use-case stories</h1><p>What the application should provide. Every story is a complete, reviewed specification; inclusion does not certify its implementation.</p><nav><a href="#required">Required</a><a href="#optional">Optional</a><a target="_top" href="../../UseCases/catalogue.generated.md">Catalogue source</a></nav>
            """);
        foreach (var priority in new[] { "required", "optional" })
        {
            var group = catalogue.Stories.Where(s => s.Priority == priority).ToList();
            html.Append($"<h2 id=\"{priority}\">{(priority == "required" ? "Required" : "Optional")} · {group.Count}</h2>");
            if (group.Count == 0) html.Append("<p>No stories in this category. See the <a target=\"_top\" href=\"../../UseCases/optional/README.md\">enhancement ideas</a>.</p>");
            foreach (var story in group)
            {
                html.Append($"<details id=\"{story.Id}\"><summary>{H(story.Title)}<small>{story.Id}</small></summary><article class=\"story\"><p>{Inline(story.Goal, story)}</p><p class=\"meta\">Actor: {H(story.Actor)} · {priority}</p>");
                foreach (var section in story.Sections)
                {
                    html.Append("<h3>" + H(section.Heading) + "</h3>");
                    string? list = null;
                    foreach (var line in section.Lines)
                    {
                        var item = Regex.Match(line, @"^(?:\d+\. |- )(.+)$");
                        var kind = item.Success ? line.StartsWith("- ", StringComparison.Ordinal) ? "ul" : "ol" : null;
                        if (list != kind) { if (list is not null) html.Append("</" + list + ">"); if (kind is not null) html.Append("<" + kind + ">"); list = kind; }
                        if (kind is not null) html.Append("<li>" + Inline(item.Groups[1].Value, story) + "</li>");
                        else if (!string.IsNullOrWhiteSpace(line)) html.Append("<p>" + Inline(line, story) + "</p>");
                    }
                    if (list is not null) html.Append("</" + list + ">");
                }
                html.Append("<div class=\"references\"><a target=\"_top\" href=\"index.html#story/" + H(story.Id) + "\">Diagrams &amp; code →</a> · <a target=\"_top\" href=\"" + Url(story.Source) + "\">Read Markdown</a><p>Requirements: ");
                foreach (var reference in story.Requirements)
                {
                    var requirement = catalogue.Requirements.Single(r => r.Id == reference);
                    html.Append($"<a target=\"_top\" title=\"{H(requirement.Title)}\" href=\"{Url(requirement.Source)}\">{reference}</a> ");
                }
                html.Append("</p></div></article></details>");
            }
        }
        return html.Append("</body></html>\n").ToString();
    }
    public static void WriteOutputs(string root, Catalogue catalogue)
    {
        foreach (var (relative, content) in Outputs(catalogue))
        {
            var path = At(root, relative);
            Directory.CreateDirectory(Path.GetDirectoryName(path)!);
            File.WriteAllText(path, content, new UTF8Encoding(false));
        }
    }
}
