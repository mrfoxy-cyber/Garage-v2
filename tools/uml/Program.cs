using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Xml.Linq;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

return Uml.Run(args);

static class Uml
{
    public static readonly JsonSerializerOptions Json = new() { WriteIndented = true, PropertyNamingPolicy = JsonNamingPolicy.CamelCase, NewLine = "\n" };
    public static readonly string[] Types = ["class", "object", "component", "composite-structure", "package", "deployment", "profile", "use-case", "activity", "state-machine", "sequence", "communication", "interaction-overview", "timing"];

    public static int Run(string[] args)
    {
        try
        {
            if (args.Length == 0 || args[0] is "help" or "--help")
            {
                Console.WriteLine("UML: generate | check [--strict] | approve --id ID --note REASON | self-test\nOptional: --root PATH. Run from the repository, or pass its root explicitly.");
                return 0;
            }
            if (args[0] == "self-test") return Tests.Run();
            var root = Path.GetFullPath(Option(args, "--root") ?? FindRoot());
            var manifest = Read<Manifest>(At(root, "docs/uml/manifest.json"));
            var model = Extract(root, manifest);
            Validate(root, manifest, model);
            switch (args[0])
            {
                case "generate":
                    foreach (var (path, content) in Outputs(root, manifest, model)) Write(At(root, path), content);
                    Console.WriteLine($"Generated {manifest.Diagrams.Count(d => d.Maintenance == "generated")} diagrams and the shared model.");
                    return 0;
                case "check": return Check(root, manifest, model, args.Contains("--strict"));
                case "approve":
                    var id = Option(args, "--id") ?? throw new Exception("approve requires --id.");
                    var note = Option(args, "--note");
                    if (string.IsNullOrWhiteSpace(note)) throw new Exception("approve requires a meaningful --note explaining your review.");
                    var diagram = manifest.Diagrams.SingleOrDefault(d => d.Id == id) ?? throw new Exception($"Unknown diagram: {id}");
                    if (diagram.Maintenance != "reviewed") throw new Exception("Only reviewed diagrams can be approved.");
                    var reviews = Reviews(root);
                    reviews[id] = new Review(Fingerprints(diagram, model), DiagramHash(root, diagram), note);
                    Write(At(root, "docs/uml/state/reviews.json"), Serialize(reviews));
                    Console.WriteLine($"Recorded review for {id}: {note}");
                    return 0;
                default: throw new Exception($"Unknown command: {args[0]}");
            }
        }
        catch (Exception e) { Console.Error.WriteLine($"UML error: {e.Message}"); return 2; }
    }

    public static Model Extract(string root, Manifest manifest)
    {
        var projects = new List<ProjectModel>();
        var types = new List<TypeModel>();
        var fingerprints = new SortedDictionary<string, string>(StringComparer.Ordinal);
        foreach (var projectPath in manifest.Projects.Order(StringComparer.Ordinal))
        {
            var absolute = At(root, projectPath);
            if (!File.Exists(absolute)) throw new Exception($"Missing project: {projectPath}. Restore the checkout before checking diagrams.");
            var xml = XDocument.Load(absolute);
            var references = xml.Descendants().Where(x => x.Name.LocalName == "ProjectReference")
                .Select(x => x.Attribute("Include")?.Value ?? throw new Exception("ProjectReference without Include."))
                .Select(p => Relative(root, Path.GetFullPath(Path.Combine(Path.GetDirectoryName(absolute)!, p.Replace('\\', '/')))))
                .Order(StringComparer.Ordinal).ToArray();
            foreach (var reference in references)
                if (!manifest.Projects.Contains(reference)) throw new Exception($"Project {projectPath} references untracked project {reference}; add it to manifest.projects.");
            projects.Add(new ProjectModel("project:" + projectPath, Path.GetFileNameWithoutExtension(projectPath), projectPath, references));
            var directory = Path.GetDirectoryName(absolute)!;
            foreach (var file in SourceFiles(directory).Where(p => Path.GetExtension(p) == ".cs").Order(StringComparer.Ordinal))
            {
                var local = Relative(directory, file);
                if (local.Split('/').Any(s => s is "bin" or "obj" or ".git" or ".vs")) continue;
                var path = Relative(root, file);
                if (Path.GetExtension(file) != ".cs") continue;
                var source = File.ReadAllText(file);
                var tree = CSharpSyntaxTree.ParseText(source, new CSharpParseOptions(LanguageVersion.Preview));
                var errors = tree.GetDiagnostics().Where(d => d.Severity == DiagnosticSeverity.Error).ToArray();
                if (errors.Length > 0) throw new Exception($"Cannot parse {path}: {errors[0]}");
                var syntax = tree.GetRoot();
                fingerprints[path] = Hash(Tokens(syntax));
                syntax = syntax.ReplaceTrivia(syntax.DescendantTrivia(), (_, _) => default).NormalizeWhitespace(eol: "\n");
                foreach (var type in syntax.DescendantNodes().OfType<BaseTypeDeclarationSyntax>())
                {
                    var ns = string.Join(".", type.Ancestors().OfType<BaseNamespaceDeclarationSyntax>().Reverse().Select(n => n.Name.ToString()));
                    var nested = type.Ancestors().OfType<TypeDeclarationSyntax>().Reverse().Select(TypeName).Append(TypeName(type));
                    var name = string.Join(".", nested);
                    var full = string.IsNullOrEmpty(ns) ? name : ns + "." + name;
                    var id = $"type:{projectPath}:{full}";
                    var members = type is TypeDeclarationSyntax td ? td.Members.Select(Signature).Where(s => s != "").Order(StringComparer.Ordinal).ToArray()
                        : ((EnumDeclarationSyntax)type).Members.Select(m => m.Identifier.Text + (m.EqualsValue is null ? "" : " = " + m.EqualsValue.Value.ToString())).ToArray();
                    var kind = type switch { InterfaceDeclarationSyntax => "interface", EnumDeclarationSyntax => "enum", StructDeclarationSyntax => "struct", RecordDeclarationSyntax r when r.ClassOrStructKeyword.IsKind(SyntaxKind.StructKeyword) => "record struct", RecordDeclarationSyntax => "record", _ => "class" };
                    var declarationText = string.Join(" ", type.Modifiers.Select(m => m.Text).Append(kind).Append(TypeName(type)));
                    if (type is TypeDeclarationSyntax primary)
                    {
                        if (primary.ParameterList is not null)
                        {
                            declarationText += Clean(primary.ParameterList);
                            members = members.Prepend("primary constructor " + TypeName(type) + Clean(primary.ParameterList)).ToArray();
                        }
                        declarationText += string.Concat(primary.ConstraintClauses.Select(c => " " + Clean(c)));
                    }
                    var bases = type.BaseList?.Types.Select(b => b.Type.ToString()).ToArray() ?? [];
                    var operations = type is TypeDeclarationSyntax declaration ? declaration.Members.OfType<MethodDeclarationSyntax>().Select(method =>
                    {
                        var parameters = string.Join(",", method.ParameterList.Parameters.Select(p => string.Join(" ", p.Modifiers.Select(m => m.Text).Append(p.Type?.ToString() ?? ""))));
                        var operationId = $"operation:{projectPath}:{full}.{method.ExplicitInterfaceSpecifier}{method.Identifier}{method.TypeParameterList}({parameters})";
                        fingerprints["symbol:" + operationId] = Hash(Tokens(method));
                        return new OperationModel(operationId, method.Identifier.Text, Signature(method));
                    }).OrderBy(o => o.Id, StringComparer.Ordinal).ToArray() : [];
                    types.Add(new TypeModel(id, projectPath, ns, name, kind, declarationText, [path], bases, members, operations));
                    // Partial declarations contribute to one stable identity, independent of file location.
                    var symbolKey = "symbol:" + id;
                    fingerprints[symbolKey] = Hash(fingerprints.GetValueOrDefault(symbolKey, "") + Tokens(type));
                }
            }
        }
        foreach (var pattern in manifest.Inputs)
        {
            var matches = SourceFiles(root)
                .Where(p => Glob(pattern, Relative(root, p))).Order(StringComparer.Ordinal).ToArray();
            if (matches.Length == 0) throw new Exception($"Input pattern has no matches: {pattern}");
            foreach (var file in matches)
            {
                var path = Relative(root, file);
                fingerprints[path] = Hash(File.ReadAllText(file).Replace("\r\n", "\n"));
            }
        }
        foreach (var project in projects)
            fingerprints[project.File] = Hash(XDocument.Load(At(root, project.File)).ToString(SaveOptions.DisableFormatting));
        var merged = types.GroupBy(t => t.Id).Select(g => g.First() with {
            Files = g.SelectMany(t => t.Files).Distinct().Order(StringComparer.Ordinal).ToArray(),
            Members = g.SelectMany(t => t.Members).Distinct().Order(StringComparer.Ordinal).ToArray(),
            Bases = g.SelectMany(t => t.Bases).Distinct().Order(StringComparer.Ordinal).ToArray(),
            Operations = g.SelectMany(t => t.Operations).DistinctBy(o => o.Id).OrderBy(o => o.Id, StringComparer.Ordinal).ToArray(),
            Declaration = string.Join("; ", g.Select(t => t.Declaration).Distinct().Order(StringComparer.Ordinal))
        }).OrderBy(t => t.Id, StringComparer.Ordinal).ToArray();
        return new Model(projects.ToArray(), merged, fingerprints);
    }

    static string TypeName(BaseTypeDeclarationSyntax type) => type.Identifier.Text +
        (type is TypeDeclarationSyntax t && t.TypeParameterList is not null ? Tokens(t.TypeParameterList) : "");
    static string Tokens(SyntaxNode node) => string.Join(" ", node.DescendantTokens().Select(t => t.Text)) +
        string.Concat(node.DescendantTrivia().Where(t => t.IsDirective).Select(t => "\n" + Clean(t.GetStructure()!))) +
        string.Concat(node.DescendantTrivia().Where(t => t.IsKind(SyntaxKind.DisabledTextTrivia)).Select(t => "\n" + t.ToString().Replace("\r\n", "\n")));
    static string Clean(SyntaxNode node) => node.ReplaceTrivia(node.DescendantTrivia(), (_, _) => default).NormalizeWhitespace(eol: "\n").ToFullString();
    static string Signature(MemberDeclarationSyntax member) => member switch
    {
        MethodDeclarationSyntax m => Clean(m.WithBody(null).WithExpressionBody(null).WithSemicolonToken(default)),
        ConstructorDeclarationSyntax c => Clean(c.WithBody(null).WithExpressionBody(null).WithInitializer(null).WithSemicolonToken(default)),
        PropertyDeclarationSyntax p => $"{p.Modifiers} {p.Type} {p.Identifier} {{ {string.Join(" ", p.AccessorList?.Accessors.Select(a => $"{a.Modifiers} {a.Keyword.Text};" ) ?? ["get;"])} }}".Trim(),
        FieldDeclarationSyntax f => $"{f.Modifiers} {f.Declaration.Type} {string.Join(", ", f.Declaration.Variables.Select(v => v.Identifier.Text))}".Trim(),
        EventFieldDeclarationSyntax e => $"{e.Modifiers} event {e.Declaration.Type} {string.Join(", ", e.Declaration.Variables.Select(v => v.Identifier.Text))}".Trim(),
        IndexerDeclarationSyntax i => $"{i.Modifiers} {i.Type} this{i.ParameterList}".Trim(),
        OperatorDeclarationSyntax o => Clean(o.WithBody(null).WithExpressionBody(null).WithSemicolonToken(default)),
        ConversionOperatorDeclarationSyntax c => Clean(c.WithBody(null).WithExpressionBody(null).WithSemicolonToken(default)),
        EventDeclarationSyntax e => $"{e.Modifiers} event {e.Type} {e.Identifier}".Trim(),
        _ => ""
    };

    public static void Validate(string root, Manifest manifest, Model model)
    {
        if (manifest.Version != 1) throw new Exception("Unsupported manifest version.");
        if (manifest.Projects.Length == 0 || manifest.Projects.Distinct().Count() != manifest.Projects.Length) throw new Exception("Projects must be nonempty and unique.");
        var ids = manifest.Diagrams.Select(d => d.Id).ToHashSet(StringComparer.Ordinal);
        if (ids.Count != manifest.Diagrams.Length) throw new Exception("Duplicate diagram IDs.");
        if (manifest.Diagrams.Select(d => d.File).Distinct(StringComparer.OrdinalIgnoreCase).Count() != manifest.Diagrams.Length) throw new Exception("Duplicate diagram files.");
        var registry = Read<Registry>(At(root, "docs/uml/registry.json"));
        var entities = registry.Entities.Select(e => e.Id).ToHashSet(StringComparer.Ordinal);
        if (entities.Count != registry.Entities.Length) throw new Exception("Duplicate registry entity IDs.");
        var targets = model.Projects.Select(p => p.Id).Concat(model.Types.Select(t => t.Id)).Concat(model.Types.SelectMany(t => t.Operations.Select(o => o.Id))).ToHashSet(StringComparer.Ordinal);
        foreach (var entity in registry.Entities)
            foreach (var target in entity.Targets)
                if (!targets.Contains(target)) throw new Exception($"Entity {entity.Id} has unresolved target: {target}");
        foreach (var d in manifest.Diagrams)
        {
            if (!Regex.IsMatch(d.Id, "^[a-z0-9-]+$") || !Types.Contains(d.Type)) throw new Exception($"Invalid ID/type: {d.Id}");
            if (d.Maintenance is not ("generated" or "reviewed" or "manual")) throw new Exception($"Invalid maintenance mode: {d.Id}");
            if (d.Status is not ("active" or "template")) throw new Exception($"Invalid status: {d.Id}");
            if (!d.File.StartsWith("docs/uml/", StringComparison.Ordinal) || !d.File.EndsWith(".puml", StringComparison.Ordinal)) throw new Exception($"Invalid diagram path: {d.File}");
            At(root, d.File);
            if (d.Maintenance == "generated" && d.Type is not ("class" or "component" or "package")) throw new Exception($"No generator for {d.Type}.");
            if (d.Type == "class" && d.Maintenance == "generated" && !manifest.Projects.Contains(d.Project)) throw new Exception($"Unknown class diagram project: {d.Id}");
            foreach (var related in d.Related)
                if (related == d.Id || !ids.Contains(related)) throw new Exception($"Invalid diagram link {d.Id} -> {related}");
            foreach (var entity in d.Entities)
                if (!entities.Contains(entity)) throw new Exception($"Unknown entity {entity} in {d.Id}");
            foreach (var symbol in d.TrackSymbols)
                if (!model.Fingerprints.ContainsKey("symbol:" + symbol)) throw new Exception($"Tracked symbol no longer exists in {d.Id}: {symbol}");
            foreach (var pattern in d.TrackFiles)
                if (!model.Fingerprints.Keys.Any(k => !k.StartsWith("symbol:", StringComparison.Ordinal) && Glob(pattern, k))) throw new Exception($"Tracked input has no matches in {d.Id}: {pattern}");
            if (d.Maintenance == "reviewed" && d.TrackFiles.Length + d.TrackSymbols.Length == 0) throw new Exception($"Reviewed diagram {d.Id} needs tracked sources.");
            if (d.Maintenance != "generated") ValidateEnvelope(root, d);
        }
        var missingTypes = Types.Except(manifest.Diagrams.Select(d => d.Type)).ToArray();
        if (missingTypes.Length > 0) throw new Exception("Missing UML types: " + string.Join(", ", missingTypes));
    }

    static void ValidateEnvelope(string root, Diagram d)
    {
        var path = At(root, d.File);
        if (!File.Exists(path)) throw new Exception($"Missing diagram: {d.File}");
        var source = File.ReadAllText(path).Replace("\r\n", "\n").Trim();
        if (!source.StartsWith("@startuml\n", StringComparison.Ordinal) || !source.EndsWith("@enduml", StringComparison.Ordinal)
            || Regex.Matches(source, "(?m)^@startuml$").Count != 1 || Regex.Matches(source, "(?m)^@enduml$").Count != 1)
            throw new Exception($"Invalid PlantUML envelope: {d.File}. Full syntax validation runs in CI.");
        if (!source.Contains("' diagram-id: " + d.Id + "\n", StringComparison.Ordinal)) throw new Exception($"Missing diagram-id header: {d.File}");
    }

    public static SortedDictionary<string, string> Outputs(string root, Manifest manifest, Model model)
    {
        var output = new SortedDictionary<string, string>(StringComparer.Ordinal);
        output["docs/uml/model.generated.json"] = Serialize(new { version = 1, projects = model.Projects, types = model.Types });
        foreach (var d in manifest.Diagrams.Where(d => d.Maintenance == "generated"))
        {
            var lines = new List<string> { "@startuml", "' diagram-id: " + d.Id, "' Generated. Run the UML generate command; do not edit by hand.", "hide empty members", "skinparam classAttributeIconSize 0", "title " + d.Title };
            if (d.Type == "component")
            {
                foreach (var p in model.Projects) lines.Add($"component \"{Escape(p.Name)}\" as {Alias(p.Id)}");
                foreach (var p in model.Projects)
                    foreach (var r in p.References) lines.Add($"{Alias(p.Id)} --> {Alias("project:" + r)} : references");
            }
            else if (d.Type == "package")
            {
                // Project containment is exact; namespace dependencies require semantic binding and are not inferred.
                foreach (var p in model.Projects)
                {
                    lines.Add($"package \"{Escape(p.Name)}\" as {Alias(p.Id)} {{");
                    foreach (var ns in model.Types.Where(t => t.Project == p.File).Select(t => t.Namespace).Distinct().Order(StringComparer.Ordinal))
                        lines.Add($"  package \"{Escape(ns == "" ? "(global)" : ns)}\" as {Alias(p.Id + ":" + ns)} {{ }}");
                    lines.Add("}");
                }
                foreach (var p in model.Projects)
                    foreach (var r in p.References) lines.Add($"{Alias(p.Id)} ..> {Alias("project:" + r)} : references");
            }
            else
            {
                var types = model.Types.Where(t => t.Project == d.Project).ToArray();
                var namespaces = types.GroupBy(t => t.Namespace).OrderBy(g => g.Key, StringComparer.Ordinal).ToArray();
                foreach (var group in namespaces)
                {
                    lines.Add($"package \"{Escape(group.Key == "" ? "(global)" : group.Key)}\" as {Alias(d.Id + ":" + group.Key)} {{");
                    var groupedTypes = group.ToArray();
                    foreach (var t in groupedTypes)
                    {
                        var keyword = t.Kind switch { "record" => "class", "record struct" => "struct", _ => t.Kind };
                        if (keyword == "class" && t.Declaration.Split(' ').Contains("abstract")) keyword = "abstract class";
                        lines.Add($"{keyword} \"{Escape(t.Name)}\" as {Alias(t.Id)} {{");
                        foreach (var member in t.Members) lines.Add("  " + Escape(member).Replace("{", "&#123;").Replace("}", "&#125;"));
                        lines.Add("}");
                    }
                    // Invisible layout constraints keep unrelated classes from forming one enormous row.
                    for (int i = 3; i < groupedTypes.Length; i++) lines.Add($"{Alias(groupedTypes[i - 3].Id)} -[hidden]down-> {Alias(groupedTypes[i].Id)}");
                    lines.Add("}");
                }
                for (int i = 1; i < namespaces.Length; i++)
                    lines.Add($"{Alias(d.Id + ":" + namespaces[i - 1].Key)} -[hidden]down-> {Alias(d.Id + ":" + namespaces[i].Key)}");
                foreach (var t in types)
                    foreach (var b in t.Bases)
                    {
                        var candidates = types.Where(x => x.Name == b || (x.Namespace == "" ? x.Name : x.Namespace + "." + x.Name) == b).ToArray();
                        if (candidates.Length == 1)
                        {
                            var relationship = candidates[0].Kind == "interface" && t.Kind != "interface" ? "<|.." : "<|--";
                            lines.Add($"{Alias(candidates[0].Id)} {relationship} {Alias(t.Id)}");
                        }
                    }
            }
            if (d.Related.Length > 0 || d.Type == "class")
            {
                lines.Add("legend bottom");
                if (d.Type == "class")
                {
                    lines.Add("  <b>How to read this class diagram</b>");
                    lines.Add("  Child --|> Parent : solid line + hollow triangle = inherits from");
                    lines.Add("  Class ..|> Interface : dashed line + hollow triangle = implements");
                    lines.Add("  The triangle points to the parent class or interface.");
                    lines.Add("  C = class; A = abstract class; I = interface; E = enum; S = struct.");
                    lines.Add("  Boxes group members; folder-shaped boxes group namespaces.");
                    lines.Add("  public / + = accessible publicly; private / - = within the class");
                    lines.Add("  protected / # = class and derived classes; internal = same assembly");
                    lines.Add("  Type Name = field/property; Name(...) = method or constructor.");
                    lines.Add("  --- Related diagrams ---");
                }
                else if (d.Type == "component")
                    lines.Add("  Solid arrow: source project references the target project.");
                else if (d.Type == "package")
                    lines.Add("  Folder boxes: projects/namespaces; dashed arrows: project references.");
                foreach (var id in d.Related)
                {
                    var related = manifest.Diagrams.Single(x => x.Id == id);
                    var relative = Relative(Path.GetDirectoryName(At(root, d.File))!, At(root, related.File));
                    lines.Add($"  [[{relative} {related.Title}]]");
                }
                lines.Add("endlegend");
            }
            lines.Add("@enduml");
            output[d.File] = string.Join("\n", lines) + "\n";
        }
        output["docs/uml/index.html"] = Gallery(manifest);
        return output;
    }

    static string Gallery(Manifest manifest)
    {
        static string H(string value) => System.Net.WebUtility.HtmlEncode(value);
        var html = new StringBuilder("<!doctype html>\n<html lang=\"en\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Garage UML diagrams</title>\n<style>body{font:16px system-ui;margin:0;background:#f3f5f8;color:#182437}main{max-width:1200px;margin:auto;padding:36px}h1{margin-bottom:8px}nav{display:flex;gap:12px;flex-wrap:wrap;margin:24px 0}input,select{padding:10px;border:1px solid #b6c2d3;border-radius:6px;font:inherit}details{background:white;border:1px solid #d3dbe5;border-radius:8px;margin:14px 0;padding:18px}summary{cursor:pointer;font-weight:600}small{font-weight:400;color:#53647c}img{max-width:100%;height:auto;display:block;margin:20px auto}a{color:#155ca8}p{line-height:1.5}.diagram{overflow:auto}.links{font-size:14px}footer{margin-top:28px;color:#53647c}</style>\n<main><h1>Garage UML diagrams</h1><p>Connected views of the Garage code and parking workflows. Expand a diagram to view it. Templates are starting points and do not claim to describe the implementation.</p><p><a href=\"README.md\">Maintenance guide</a> · <a href=\"manifest.json\">Manifest</a> · <a href=\"registry.json\">Shared identities</a> · <a href=\"reports/check.md\">Latest local check</a></p><nav><input id=\"search\" aria-label=\"Find diagram\" placeholder=\"Find diagram…\"><select id=\"mode\" aria-label=\"Maintenance mode\"><option value=\"\">All maintenance modes</option><option>generated</option><option>reviewed</option><option>manual</option></select></nav>\n");
        html.Append(SymbolGuide());
        foreach (var d in manifest.Diagrams)
        {
            var source = d.File["docs/uml/".Length..];
            var svg = Path.ChangeExtension(source, ".svg").Replace('\\', '/');
            html.Append($"<details data-mode=\"{H(d.Maintenance)}\" data-search=\"{H(d.Title + " " + d.Type + " " + d.Id)}\"{(d.Id == "garage-components" ? " open" : "")}><summary>{H(d.Title)} <small>— {H(d.Type)} · {H(d.Maintenance)} · {H(d.Status)}</small></summary><p class=\"links\"><a href=\"{H(source)}\">Diagram source</a> · <a href=\"{H(svg)}\">Full-size SVG</a></p><div class=\"diagram\"><img loading=\"lazy\" src=\"{H(svg)}\" alt=\"{H(d.Title)}\"></div><p class=\"links\">Related: ");
            html.Append(string.Join(" · ", d.Related.Select(id => $"<a href=\"#{H(id)}\">{H(manifest.Diagrams.Single(x => x.Id == id).Title)}</a>")));
            html.Append($"</p><span id=\"{H(d.Id)}\"></span></details>\n");
        }
        html.Append("<footer>Run the render command in the maintenance guide to create SVG previews. Source diagrams and tracking state are versioned; rendered images and check reports are local build outputs.</footer></main><script>const search=document.querySelector('#search'),mode=document.querySelector('#mode');function filter(){for(const d of document.querySelectorAll('details[data-mode]'))d.hidden=!(d.dataset.search.toLowerCase().includes(search.value.toLowerCase())&&(!mode.value||d.dataset.mode===mode.value))}search.addEventListener('input',filter);mode.addEventListener('change',filter);function reveal(){const target=document.getElementById(location.hash.slice(1));if(target){const d=target.closest('details');d.hidden=false;d.open=true;d.scrollIntoView({block:'start'})}}window.addEventListener('hashchange',reveal);reveal();</script></html>\n");
        return html.ToString();
    }

    static string SymbolGuide() => """
        <style>
        .symbol-guide table{width:100%;border-collapse:collapse;margin-top:16px;text-align:left}
        .symbol-guide th,.symbol-guide td{padding:12px 10px;border-bottom:1px solid #e1e6ed;vertical-align:middle}
        .symbol-guide svg{width:155px;height:34px;display:block;color:#234664}
        .symbol-guide code{background:#edf2f8;border-radius:4px;padding:2px 5px;white-space:nowrap}
        .symbol-guide .table-scroll{overflow-x:auto}
        .symbol-guide .key{display:flex;gap:12px;flex-wrap:wrap;line-height:1.8}
        .symbol-guide h3{font-size:16px;margin-bottom:8px}
        </style>
        <details class="symbol-guide" open>
          <summary>How to read UML — symbols and arrows</summary>
          <p>Read each example from left to right. A hollow triangle points toward the parent class or interface; a diamond sits at the owning or grouping end.</p>
          <div class="table-scroll"><table>
            <thead><tr><th scope="col">Symbol</th><th scope="col">Meaning</th><th scope="col">Example</th></tr></thead>
            <tbody>
              <tr><td><svg viewBox="0 0 155 34" role="img" aria-label="Solid line with hollow triangle"><path d="M5 17H128M128 7L148 17L128 27Z" fill="white" stroke="currentColor" stroke-width="2"/></svg></td><td><strong>Inheritance</strong><br>A child class inherits from its parent.</td><td><code>Car : Vehicle</code><br>The triangle points to Vehicle.</td></tr>
              <tr><td><svg viewBox="0 0 155 34" role="img" aria-label="Dashed line with hollow triangle"><path d="M5 17H128" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="7 5"/><path d="M128 7L148 17L128 27Z" fill="white" stroke="currentColor" stroke-width="2"/></svg></td><td><strong>Interface implementation</strong><br>A class fulfills an interface's contract.</td><td><code>Garage : IGarage</code><br>The triangle points to IGarage (illustrative).</td></tr>
              <tr><td><svg viewBox="0 0 155 34" role="img" aria-label="Solid line"><path d="M5 17H148" fill="none" stroke="currentColor" stroke-width="2"/></svg></td><td><strong>Association</strong><br>Objects have a structural relationship.</td><td>A driver is associated with a car.</td></tr>
              <tr><td><svg viewBox="0 0 155 34" role="img" aria-label="Dashed line with open arrow"><path d="M5 17H148" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="7 5"/><path d="M137 9L148 17L137 25" fill="none" stroke="currentColor" stroke-width="2"/></svg></td><td><strong>Dependency / uses</strong><br>The source uses the target.</td><td>A service uses a loader.<br>In the package view: a project reference.</td></tr>
              <tr><td><svg viewBox="0 0 155 34" role="img" aria-label="Solid line with open arrow"><path d="M5 17H148M137 9L148 17L137 25" fill="none" stroke="currentColor" stroke-width="2"/></svg></td><td><strong>Directed connection</strong><br>Read the diagram's context and arrow label.</td><td>Component view: a project reference.<br>Sequence view: a message or call.</td></tr>
              <tr><td><svg viewBox="0 0 155 34" role="img" aria-label="Filled diamond at the owner end"><path d="M5 17L18 8L31 17L18 26Z" fill="currentColor" stroke="currentColor" stroke-width="2"/><path d="M31 17H148" stroke="currentColor" stroke-width="2"/></svg></td><td><strong>Composition / owns</strong><br>A part belongs to at most one whole at a time; its lifetime is tied to the whole.</td><td>Garage ◆— ParkingSpot<br>The diamond is beside Garage.</td></tr>
              <tr><td><svg viewBox="0 0 155 34" role="img" aria-label="Hollow diamond at the grouping end"><path d="M5 17L18 8L31 17L18 26Z" fill="white" stroke="currentColor" stroke-width="2"/><path d="M31 17H148" stroke="currentColor" stroke-width="2"/></svg></td><td><strong>Aggregation / groups</strong><br>A whole groups parts that can exist independently.</td><td>Fleet ◇— Vehicle (illustrative)</td></tr>
            </tbody>
          </table></div>
          <h3>Boxes, members and visibility</h3>
          <p class="key"><span><code>C</code> class</span><span><code>A</code> abstract class</span><span><code>I</code> interface</span><span><code>E</code> enum</span><span><code>S</code> struct</span></p>
          <p>In class views, a box names a type and lists its fields, properties and methods. Folder-shaped boxes group namespaces. <code>Park(...)</code> is a method or constructor; <code>Vehicle Vehicle</code> is a field or property.</p>
          <p class="key"><span><code>+</code> public</span><span><code>-</code> private</span><span><code>#</code> protected</span><span><code>~</code> UML package visibility</span></p>
          <p>The C# diagrams spell out visibility: <code>internal</code> means the same assembly; <code>protected</code> includes derived classes. A package in UML and a C# assembly have different visibility rules.</p>
          <h3>Other common symbols</h3>
          <p><code>1</code> exactly one · <code>0..1</code> optional · <code>*</code> or <code>0..*</code> zero or more · <code>1..*</code> one or more. These labels describe how many objects participate at an association end.</p>
          <p>Sequence diagrams: vertical dashed lines are lifelines; horizontal arrows are messages, and dashed arrows usually show replies. <code>alt</code> groups alternative paths, and <code>[condition]</code> is a guard. Activity diagrams: a filled circle starts the flow, a bullseye ends it, and a diamond is a decision or merge. State diagrams: arrows show transitions; their labels describe triggers, guards and actions.</p>
          <p><small>These are reference examples. Current generated views show inheritance, interface implementation, namespace grouping and project references. The object template illustrates composition. Arrow labels and diagram type provide the context.</small></p>
        </details>
        """;

    public static int Check(string root, Manifest manifest, Model model, bool strict)
    {
        var failures = new List<string>();
        foreach (var (path, expected) in Outputs(root, manifest, model))
            if (!File.Exists(At(root, path)) || File.ReadAllText(At(root, path)).Replace("\r\n", "\n") != expected)
                failures.Add($"Outdated generated file: {path}. Run generate.");
        var reviews = Reviews(root);
        var pending = new List<object>();
        var report = new StringBuilder("# UML check\n\n");
        foreach (var failure in failures) report.AppendLine("- ERROR: " + failure);
        foreach (var d in manifest.Diagrams.Where(d => d.Maintenance == "reviewed"))
        {
            var current = Fingerprints(d, model);
            reviews.TryGetValue(d.Id, out var review);
            var changed = current.Keys.Union(review?.Fingerprints.Keys ?? Enumerable.Empty<string>())
                .Where(k => current.GetValueOrDefault(k) != review?.Fingerprints.GetValueOrDefault(k)).Order(StringComparer.Ordinal).ToArray();
            var diagramChanged = review?.DiagramHash != DiagramHash(root, d);
            if (changed.Length == 0 && !diagramChanged) continue;
            var reasons = changed.Concat(diagramChanged ? ["diagram source changed or has no recorded review"] : []).ToArray();
            pending.Add(new { id = d.Id, file = d.File, reasons, related = d.Related });
            report.AppendLine($"- REVIEW: {d.Id} ({d.File})");
            foreach (var reason in reasons) report.AppendLine("  - " + reason);
            if (d.Related.Length > 0) report.AppendLine("  - Related diagrams: " + string.Join(", ", d.Related));
        }
        if (failures.Count == 0 && pending.Count == 0) report.AppendLine("Generated diagrams match the code. All tracked diagrams have current reviews.");
        report.AppendLine($"\n{manifest.Diagrams.Count(d => d.Status == "template")} diagrams are templates; they do not claim to describe the implementation.");
        report.AppendLine("\nLocal checks validate references and PlantUML envelopes. CI also validates full PlantUML syntax and renders SVG previews.");
        Write(At(root, "docs/uml/reports/check.md"), report.ToString().Replace("\r\n", "\n"));
        Write(At(root, "docs/uml/reports/check.json"), Serialize(new { failures, pendingReviews = pending, strict }));
        Console.Write(report);
        return failures.Count > 0 || (strict && pending.Count > 0) ? 1 : 0;
    }

    public static SortedDictionary<string, string> Fingerprints(Diagram d, Model model)
    {
        var result = new SortedDictionary<string, string>(StringComparer.Ordinal);
        foreach (var (key, hash) in model.Fingerprints)
            if ((!key.StartsWith("symbol:", StringComparison.Ordinal) && d.TrackFiles.Any(p => Glob(p, key))) || d.TrackSymbols.Any(s => key == "symbol:" + s)) result[key] = hash;
        result["tracking-policy"] = Hash(Serialize(new { d.TrackFiles, d.TrackSymbols, d.Entities, d.Related }));
        return result;
    }
    public static SortedDictionary<string, Review> Reviews(string root) => File.Exists(At(root, "docs/uml/state/reviews.json")) ? Read<SortedDictionary<string, Review>>(At(root, "docs/uml/state/reviews.json")) : new(StringComparer.Ordinal);
    static IEnumerable<string> SourceFiles(string directory)
    {
        foreach (var file in Directory.EnumerateFiles(directory)) yield return file;
        foreach (var child in Directory.EnumerateDirectories(directory).Order(StringComparer.Ordinal))
        {
            if (Path.GetFileName(child) is "bin" or "obj" or ".git" or ".vs" or "node_modules") continue;
            if ((File.GetAttributes(child) & FileAttributes.ReparsePoint) != 0) continue;
            foreach (var file in SourceFiles(child)) yield return file;
        }
    }
    public static bool Glob(string pattern, string path) => Regex.IsMatch(path, "^" + Regex.Escape(pattern).Replace(@"\*\*/", "(?:.*/)?").Replace(@"\*\*", ".*").Replace(@"\*", "[^/]*").Replace(@"\?", "[^/]") + "$", RegexOptions.CultureInvariant);
    public static string Hash(string value) => Convert.ToHexStringLower(SHA256.HashData(Encoding.UTF8.GetBytes(value)));
    static string DiagramHash(string root, Diagram d) => Hash(File.ReadAllText(At(root, d.File)).Replace("\r\n", "\n"));
    static string Alias(string id) => "e_" + Hash(id)[..20];
    static string Escape(string value) => value.Replace("\\", "\\\\").Replace("\"", "\\\"").Replace("\r", " ").Replace("\n", " ");
    public static string Serialize<T>(T value) => JsonSerializer.Serialize(value, Json) + "\n";
    public static T Read<T>(string path) => JsonSerializer.Deserialize<T>(File.ReadAllText(path), Json) ?? throw new Exception($"Empty JSON: {path}");
    public static void Write(string path, string value) { Directory.CreateDirectory(Path.GetDirectoryName(path)!); File.WriteAllText(path, value, new UTF8Encoding(false)); }
    public static string Relative(string root, string path) => Path.GetRelativePath(root, path).Replace('\\', '/');
    public static string At(string root, string path)
    {
        var absolute = Path.GetFullPath(Path.Combine(root, path));
        var relative = Relative(root, absolute);
        if (relative == ".." || relative.StartsWith("../", StringComparison.Ordinal) || Path.IsPathRooted(relative)) throw new Exception($"Path escapes repository: {path}");
        return absolute;
    }
    static string? Option(string[] args, string name)
    {
        var index = Array.IndexOf(args, name);
        return index < 0 ? null : index + 1 < args.Length ? args[index + 1] : throw new Exception($"Missing value for {name}.");
    }
    static string FindRoot()
    {
        for (var dir = new DirectoryInfo(Environment.CurrentDirectory); dir is not null; dir = dir.Parent)
            if (File.Exists(Path.Combine(dir.FullName, "docs/uml/manifest.json"))) return dir.FullName;
        throw new Exception("Cannot find docs/uml/manifest.json. Run from the repository or use --root.");
    }
}

record Manifest(int Version, string[] Projects, string[] Inputs, Diagram[] Diagrams);
record Diagram(string Id, string Type, string Title, string File, string Maintenance, string Status, string? Project, string[] TrackFiles, string[] TrackSymbols, string[] Entities, string[] Related);
record Registry(Entity[] Entities);
record Entity(string Id, string Kind, string[] Targets);
record ProjectModel(string Id, string Name, string File, string[] References);
record TypeModel(string Id, string Project, string Namespace, string Name, string Kind, string Declaration, string[] Files, string[] Bases, string[] Members, OperationModel[] Operations);
record OperationModel(string Id, string Name, string Signature);
record Model(ProjectModel[] Projects, TypeModel[] Types, SortedDictionary<string, string> Fingerprints);
record Review(SortedDictionary<string, string> Fingerprints, string DiagramHash, string Note);
