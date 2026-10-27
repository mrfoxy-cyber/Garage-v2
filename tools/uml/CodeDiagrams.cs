using System.Text.RegularExpressions;
using System.Xml.Linq;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

record CodeUseCase(string Id, string Title, string Actor, string[] Sources);
record CodeSequenceEntry(string Id, string EntryPoint, string Source, int MaxDepth, string[] ExpandNamespaces);
record GeneratedCodeDiagram(string Puml, Dictionary<string, string[]> ParticipantSources);
record CodeDiagramSet(CodeUseCase[] UseCases, CodeSequenceEntry[] SequenceEntries,
    SortedDictionary<string, GeneratedCodeDiagram> Diagrams);

// Documentation annotations supply intent. Calls and branches always come from C# syntax
// bound with Roslyn, never from a second hand-written interaction description.
static class CodeDiagrams
{
    const string UseCaseName = "Garage.Documentation.UseCaseAttribute";
    const string SequenceName = "Garage.Documentation.SequenceViewAttribute";
    static readonly Lazy<MetadataReference[]> Platform = new(() =>
        ((string?)AppContext.GetData("TRUSTED_PLATFORM_ASSEMBLIES") ?? throw new Exception("Cannot locate .NET references."))
        .Split(Path.PathSeparator).Select(p => MetadataReference.CreateFromFile(p)).ToArray<MetadataReference>());

    public static CodeDiagramSet Extract(string root, Manifest manifest)
    {
        var diagrams = new SortedDictionary<string, GeneratedCodeDiagram>(StringComparer.Ordinal);
        if (!manifest.Diagrams.Any(d => d.Maintenance == "generated" && (d.Type is "sequence" or "use-case")))
            return new([], [], diagrams);
        var session = new Session(root, manifest);
        var cases = new List<CodeUseCase>();
        var entries = new List<(CodeSequenceEntry Entry, MethodDeclarationSyntax Syntax, string Actor)>();
        foreach (var compilation in session.Compilations.Values)
        foreach (var tree in compilation.SyntaxTrees.Where(t => t.FilePath.Length > 0))
        {
            var semantic = compilation.GetSemanticModel(tree);
            foreach (var member in tree.GetRoot().DescendantNodes().Where(n => n is MethodDeclarationSyntax or PropertyDeclarationSyntax))
            {
                var symbol = semantic.GetDeclaredSymbol(member)!;
                var attributes = symbol.GetAttributes();
                var useCases = attributes.Where(a => a.AttributeClass?.ToDisplayString() == UseCaseName).Select(a =>
                {
                    if (a.ConstructorArguments.Length != 2) throw Error(member, "UseCase needs an ID and title.");
                    var id = Value(a.ConstructorArguments[0], member);
                    var title = Value(a.ConstructorArguments[1], member);
                    var actor = a.NamedArguments.FirstOrDefault(p => p.Key == "Actor").Value.Value as string ?? "Garage operator";
                    if (!Regex.IsMatch(id, "^[a-z0-9-]+$") || string.IsNullOrWhiteSpace(title) || string.IsNullOrWhiteSpace(actor))
                        throw Error(member, "UseCase needs a lowercase stable ID, title and actor.");
                    return new CodeUseCase(id, title, actor, [Uml.Relative(root, tree.FilePath)]);
                }).ToArray();
                cases.AddRange(useCases);
                foreach (var annotation in attributes.Where(a => a.AttributeClass?.ToDisplayString() == SequenceName))
                {
                    if (member is not MethodDeclarationSyntax method || useCases.Length != 1)
                        throw Error(member, "SequenceView requires a method with exactly one UseCase annotation.");
                    if (method.Body is null && method.ExpressionBody is null) throw Error(member, "Sequence entry needs an implementation.");
                    var id = Value(annotation.ConstructorArguments.Single(), member);
                    var depth = annotation.NamedArguments.FirstOrDefault(p => p.Key == "MaxDepth").Value.Value as int? ?? 3;
                    if (depth is < 0 or > 6) throw Error(member, "SequenceView MaxDepth must be between 0 and 6.");
                    var expansion = annotation.NamedArguments.FirstOrDefault(p => p.Key == "ExpandNamespaces").Value;
                    var namespaces = expansion.Kind == TypedConstantKind.Array && !expansion.IsNull
                        ? expansion.Values.Select(v => Value(v, member)).Distinct().Order(StringComparer.Ordinal).ToArray() : [];
                    if (namespaces.Any(n => !Regex.IsMatch(n, @"^\w+(\.\w+)*$"))) throw Error(member, "ExpandNamespaces needs nonempty namespace names.");
                    entries.Add((new(id, symbol.ToDisplayString(), Uml.Relative(root, tree.FilePath), depth, namespaces), method, useCases[0].Actor));
                }
            }
        }
        var grouped = cases.GroupBy(c => c.Id).OrderBy(g => g.Key, StringComparer.Ordinal).Select(g =>
        {
            if (g.Select(c => (c.Title, c.Actor)).Distinct().Count() != 1)
                throw new Exception($"Conflicting UseCase metadata for {g.Key}. Use the same title and actor at each implementation.");
            return g.First() with { Sources = g.SelectMany(c => c.Sources).Distinct().Order(StringComparer.Ordinal).ToArray() };
        }).ToArray();
        foreach (var duplicate in entries.GroupBy(e => e.Entry.Id).Where(g => g.Count() > 1))
            throw new Exception($"Duplicate SequenceView ID: {duplicate.Key}");
        foreach (var entry in entries)
            if (!manifest.Diagrams.Any(d => d.Id == entry.Entry.Id && d.Type == "sequence" && d.Maintenance == "generated"))
                throw Error(entry.Syntax, $"SequenceView {entry.Entry.Id} needs a generated sequence entry in manifest.json.");
        foreach (var diagram in manifest.Diagrams.Where(d => d.Maintenance == "generated"))
        {
            if (diagram.Type == "use-case")
            {
                if (grouped.Length == 0) throw new Exception($"No UseCase annotations for {diagram.Id}.");
                diagrams.Add(diagram.Id, Related(root, manifest, diagram, UseCases(diagram, grouped)));
            }
            if (diagram.Type == "sequence")
            {
                var matches = entries.Where(e => e.Entry.Id == diagram.Id).ToArray();
                if (matches.Length != 1) throw new Exception($"Generated sequence {diagram.Id} needs exactly one matching SequenceView annotation.");
                var entry = matches[0];
                diagrams.Add(diagram.Id, Related(root, manifest, diagram,
                    new SequenceWriter(session, entry.Entry.MaxDepth, entry.Entry.ExpandNamespaces).Generate(diagram, entry.Syntax, entry.Actor)));
            }
        }
        return new(grouped, entries.Select(e => e.Entry).OrderBy(e => e.Id, StringComparer.Ordinal).ToArray(), diagrams);
    }

    static string Value(TypedConstant value, SyntaxNode node) => value.Value as string ?? throw Error(node, "Annotation value must be a constant string.");
    internal static Exception Error(SyntaxNode node, string message)
    {
        var location = node.GetLocation().GetLineSpan();
        return new Exception($"{location.Path}:{location.StartLinePosition.Line + 1}: {message}");
    }
    static string Text(string text) => text.Replace("&", "&amp;").Replace("\r", " ").Replace("\n", " ").Replace("\\", "&#92;")
        .Replace("\"", "&quot;").Replace("<", "&lt;").Replace(">", "&gt;");
    public static GraphView View(Diagram diagram, GeneratedCodeDiagram generated)
    {
        // PUML needs encoded text; the interactive viewer uses textContent and needs
        // the original characters. Decode exactly once after parsing the snapshot.
        static string Decode(string text) => System.Net.WebUtility.HtmlDecode(text);
        static SequenceItem Item(SequenceItem item) => item with { Label = Decode(item.Label), Branches = item.Branches.Select(b =>
            b with { Label = Decode(b.Label), Items = b.Items.Select(Item).ToArray() }).ToArray() };
        var view = AuthoredData.Parse(diagram, generated.Puml);
        return view with
        {
            Nodes = view.Nodes.Select(n => {
                var name = Decode(n.Name);
                return n with { Name = name, Group = Decode(n.Group), Members = n.Members.Select(Decode).ToArray(),
                    Files = generated.ParticipantSources.GetValueOrDefault(name, n.Files) };
            }).ToArray(),
            Edges = view.Edges.Select(e => e with { Label = Decode(e.Label) }).ToArray(),
            Notes = view.Notes?.Select(Decode).ToArray(),
            Sequence = view.Sequence is null ? null : view.Sequence with { Items = view.Sequence.Items.Select(Item).ToArray() }
        };
    }
    static string Label(SyntaxNode node)
    {
        var label = node.ReplaceTrivia(node.DescendantTrivia(), (_, _) => default).NormalizeWhitespace(indentation: "", eol: " ").ToFullString();
        return Text(label.Length <= 160 ? label : label[..157] + "…");
    }
    static List<string> Header(Diagram diagram) => ["@startuml", "' diagram-id: " + diagram.Id,
        "' Generated from code annotations and source. Run generate; do not edit by hand.", "title " + Text(diagram.Title)];
    static GeneratedCodeDiagram Related(string root, Manifest manifest, Diagram diagram, GeneratedCodeDiagram generated)
    {
        if (diagram.Related.Length == 0) return generated;
        var lines = new List<string> { "legend bottom" };
        foreach (var id in diagram.Related)
        {
            var target = manifest.Diagrams.SingleOrDefault(d => d.Id == id) ?? throw new Exception("Unknown related diagram: " + id);
            lines.Add($"  [[{Uml.Relative(Path.GetDirectoryName(Uml.At(root, diagram.File))!, Uml.At(root, target.File))} {Text(target.Title)}]]");
        }
        lines.Add("endlegend");
        return generated with { Puml = generated.Puml.Replace("@enduml\n", string.Join("\n", lines) + "\n@enduml\n", StringComparison.Ordinal) };
    }
    static GeneratedCodeDiagram UseCases(Diagram diagram, CodeUseCase[] cases)
    {
        var lines = Header(diagram);
        var sources = new Dictionary<string, string[]>(StringComparer.Ordinal);
        lines.Add("left to right direction");
        foreach (var actor in cases.Select(c => c.Actor).Distinct().Order(StringComparer.Ordinal))
            lines.Add($"actor \"{Text(actor)}\" as a_{Uml.Hash(actor)[..12]}");
        lines.Add("rectangle \"Garage application\" {");
        foreach (var item in cases)
        {
            lines.Add($"  usecase \"{Text(item.Title)}\" as u_{item.Id.Replace('-', '_')}");
            sources[item.Title] = sources.GetValueOrDefault(item.Title, []).Concat(item.Sources).Distinct().Order(StringComparer.Ordinal).ToArray();
        }
        lines.Add("}");
        foreach (var item in cases) lines.Add($"a_{Uml.Hash(item.Actor)[..12]} --> u_{item.Id.Replace('-', '_')}");
        lines.Add("@enduml");
        return new(string.Join("\n", lines) + "\n", sources);
    }

    sealed class Session
    {
        public string Root { get; }
        public Dictionary<string, CSharpCompilation> Compilations { get; } = new(StringComparer.Ordinal);
        readonly Dictionary<SyntaxTree, CSharpCompilation> owners = [];
        public Session(string root, Manifest manifest)
        {
            Root = root;
            var pending = new HashSet<string>(StringComparer.Ordinal);
            CSharpCompilation Build(string project)
            {
                if (Compilations.TryGetValue(project, out var existing)) return existing;
                if (!pending.Add(project)) throw new Exception("Cyclic project references in source diagrams: " + project);
                var absolute = Uml.At(root, project);
                var xml = XDocument.Load(absolute);
                var directory = Path.GetDirectoryName(absolute)!;
                var references = new List<MetadataReference>(Platform.Value);
                foreach (var reference in xml.Descendants().Where(e => e.Name.LocalName == "ProjectReference"))
                {
                    var target = Uml.Relative(root, Path.GetFullPath(Path.Combine(directory, reference.Attribute("Include")!.Value.Replace('\\', '/'))));
                    references.Add(Build(target).ToMetadataReference());
                }
                var trees = Uml.SourceFiles(directory).Where(f => Path.GetExtension(f) == ".cs").Order(StringComparer.Ordinal)
                    .Select(f => CSharpSyntaxTree.ParseText(File.ReadAllText(f), new CSharpParseOptions(LanguageVersion.Preview), f)).ToList();
                if (xml.Descendants().Any(e => e.Name.LocalName == "ImplicitUsings" && e.Value == "enable"))
                    trees.Add(CSharpSyntaxTree.ParseText("global using System; global using System.Collections.Generic; global using System.IO; global using System.Linq; global using System.Net.Http; global using System.Threading; global using System.Threading.Tasks;", new CSharpParseOptions(LanguageVersion.Preview)));
                var compilation = CSharpCompilation.Create("Uml_" + Uml.Hash(project)[..16], trees, references,
                    new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary, nullableContextOptions: NullableContextOptions.Enable));
                Compilations[project] = compilation;
                foreach (var tree in trees) owners.Add(tree, compilation);
                pending.Remove(project);
                return compilation;
            }
            foreach (var project in manifest.Projects) Build(project);
        }
        public SemanticModel Semantic(SyntaxNode node) => owners[node.SyntaxTree].GetSemanticModel(node.SyntaxTree);
    }

    sealed class SequenceWriter(Session session, int maxDepth, string[] expandNamespaces)
    {
        readonly List<string> body = [];
        readonly Dictionary<string, (string Alias, string Name, string[] Files)> participants = new(StringComparer.Ordinal);
        readonly HashSet<string> stack = new(StringComparer.Ordinal);
        int emitted;
        string Participant(IMethodSymbol method)
        {
            var type = method.ContainingType;
            var key = type.ContainingAssembly.Name + ":" + type.ToDisplayString();
            if (!participants.TryGetValue(key, out var item))
            {
                item = ("p_" + Uml.Hash(key)[..12], type.ToDisplayString(), type.DeclaringSyntaxReferences
                    .Select(s => Uml.Relative(session.Root, s.SyntaxTree.FilePath)).Distinct().Order(StringComparer.Ordinal).ToArray());
                participants.Add(key, item);
            }
            return item.Alias;
        }
        void Add(string line)
        {
            if (++emitted > 1400) throw new Exception("Sequence exceeds 1400 statements; reduce MaxDepth or choose a smaller entry point.");
            body.Add(line);
        }
        void Note(string owner, string text) { Add("note over " + owner); Add(text); Add("end note"); }
        public GeneratedCodeDiagram Generate(Diagram diagram, MethodDeclarationSyntax entry, string actor)
        {
            var method = (IMethodSymbol)session.Semantic(entry).GetDeclaredSymbol(entry)!;
            var owner = Participant(method);
            Add($"Actor -> {owner} : {Text(method.Name)}({string.Join(", ", method.Parameters.Select(p => p.Name))})");
            Method(entry, method, owner, "Actor", 0);
            var lines = Header(diagram);
            lines.Add($"actor \"{Text(actor)}\" as Actor");
            foreach (var p in participants.Values) lines.Add($"participant \"{Text(p.Name)}\" as {p.Alias}");
            lines.Add("note over " + owner);
            lines.Add($"Static source view; MaxDepth={maxDepth}. Lifelines group calls by declared type, not runtime instance.");
            lines.Add("Alternatives are possible source paths, not a recorded execution. Guards may be infeasible together.");
            lines.Add("Property getters and implicit/external exceptions are not expanded. Framework calls and callbacks are boundaries.");
            lines.Add("Caller continuation assumes the callee returns normally. Async scheduling is not modeled.");
            if (expandNamespaces.Length > 0) lines.Add("Expand bodies in: " + string.Join(", ", expandNamespaces) + ". Other calls remain visible as boundaries.");
            lines.Add("end note");
            lines.AddRange(body);
            lines.Add("@enduml");
            return new(string.Join("\n", lines) + "\n", participants.Values.GroupBy(p => p.Name).ToDictionary(g => g.Key,
                g => g.SelectMany(p => p.Files).Distinct().Order(StringComparer.Ordinal).ToArray(), StringComparer.Ordinal));
        }
        void Method(MethodDeclarationSyntax syntax, IMethodSymbol method, string owner, string caller, int depth)
        {
            var key = method.ContainingType.ToDisplayString() + ":" + method.ToDisplayString();
            if (!stack.Add(key)) { Note(owner, "Recursion boundary: " + Text(method.ToDisplayString())); Reply(owner, caller, "Result (recursion not expanded)"); return; }
            try
            {
                if (syntax.ExpressionBody is { } expression)
                {
                    if (method.ReturnsVoid) { Expression(expression.Expression, owner, depth); Reply(owner, caller, "complete"); }
                    else Return(expression.Expression, owner, caller, depth);
                }
                else Statements(syntax.Body!.Statements.ToArray(), owner, caller, depth, method.ReturnsVoid);
            }
            finally { stack.Remove(key); }
        }
        void Reply(string owner, string caller, string label) => Add($"{owner} --> {caller} : {label}");
        void Statements(StatementSyntax[] statements, string owner, string caller, int depth, bool returnsVoid)
        {
            if (statements.Length == 0) { if (returnsVoid) Reply(owner, caller, "complete"); return; }
            var first = statements[0];
            var rest = statements[1..];
            switch (first)
            {
                case BlockSyntax block:
                    Statements(block.Statements.Concat(rest).ToArray(), owner, caller, depth, returnsVoid); return;
                case IfStatementSyntax condition:
                    Expression(condition.Condition, owner, depth);
                    Add("alt " + Label(condition.Condition));
                    Statements(Unwrap(condition.Statement).Concat(rest).ToArray(), owner, caller, depth, returnsVoid);
                    Add("else otherwise");
                    Statements((condition.Else is null ? [] : Unwrap(condition.Else.Statement)).Concat(rest).ToArray(), owner, caller, depth, returnsVoid);
                    Add("end"); return;
                case ReturnStatementSyntax returned:
                    if (returned.Expression is { } result) Return(result, owner, caller, depth);
                    else Reply(owner, caller, "complete");
                    return;
                case ThrowStatementSyntax thrown:
                    if (thrown.Expression is { } exception) Expression(exception, owner, depth);
                    Note(owner, "Throws: " + (thrown.Expression is null ? "rethrow" : Label(thrown.Expression)) + "; this path terminates here."); return;
                case ExpressionStatementSyntax expression:
                    Expression(expression.Expression, owner, depth); break;
                case LocalDeclarationStatementSyntax declaration:
                    foreach (var variable in declaration.Declaration.Variables)
                        if (variable.Initializer is { } value) Expression(value.Value, owner, depth);
                    break;
                case EmptyStatementSyntax: break;
                default: throw Error(first, $"Sequence analysis does not support {first.Kind()}; lower MaxDepth to keep this method as a boundary.");
            }
            Statements(rest, owner, caller, depth, returnsVoid);
        }
        static IEnumerable<StatementSyntax> Unwrap(StatementSyntax statement)
        {
            if (statement is BlockSyntax block) return block.Statements;
            // Keep original red nodes: constructing a SyntaxList here would detach the
            // single statement from the semantic model's syntax tree.
            return new[] { statement };
        }
        void Return(ExpressionSyntax result, string owner, string caller, int depth)
        {
            if (result is ConditionalExpressionSyntax conditional)
            {
                Expression(conditional.Condition, owner, depth);
                Add("alt " + Label(conditional.Condition));
                Return(conditional.WhenTrue, owner, caller, depth);
                Add("else otherwise");
                Return(conditional.WhenFalse, owner, caller, depth);
                Add("end");
            }
            else if (result is ThrowExpressionSyntax thrown)
            {
                Expression(thrown.Expression, owner, depth);
                Note(owner, "Throws: " + Label(thrown.Expression) + "; this path terminates here.");
            }
            else { Expression(result, owner, depth); Reply(owner, caller, Label(result)); }
        }
        void Expression(ExpressionSyntax expression, string owner, int depth)
        {
            switch (expression)
            {
                case AnonymousFunctionExpressionSyntax:
                    Note(owner, "Callback boundary (not executed by this analysis): " + Label(expression)); return;
                case ConditionalExpressionSyntax conditional:
                    Expression(conditional.Condition, owner, depth);
                    Add("alt " + Label(conditional.Condition)); Expression(conditional.WhenTrue, owner, depth);
                    Add("else otherwise"); Expression(conditional.WhenFalse, owner, depth); Add("end"); return;
                case BinaryExpressionSyntax binary when binary.IsKind(SyntaxKind.LogicalAndExpression) || binary.IsKind(SyntaxKind.LogicalOrExpression) || binary.IsKind(SyntaxKind.CoalesceExpression):
                    Expression(binary.Left, owner, depth);
                    if (!binary.Right.DescendantNodesAndSelf().Any(n => n is InvocationExpressionSyntax or ObjectCreationExpressionSyntax or ImplicitObjectCreationExpressionSyntax)) return;
                    Add("alt " + Label(binary.Left) + (binary.IsKind(SyntaxKind.LogicalAndExpression) ? " is true" : binary.IsKind(SyntaxKind.LogicalOrExpression) ? " is false" : " is null"));
                    Expression(binary.Right, owner, depth); Add("else short-circuit"); Add("end"); return;
                case ConditionalAccessExpressionSyntax conditional:
                    Expression(conditional.Expression, owner, depth);
                    Add("alt " + Label(conditional.Expression) + " is not null"); Expression(conditional.WhenNotNull, owner, depth);
                    Add("else receiver is null"); Add("end"); return;
                case InvocationExpressionSyntax invocation:
                    if (invocation.Expression is IdentifierNameSyntax { Identifier.ValueText: "nameof" } && session.Semantic(invocation).GetConstantValue(invocation).HasValue) return;
                    // Receiver and argument expressions execute before the invocation itself.
                    Expression(invocation.Expression, owner, depth);
                    foreach (var argument in invocation.ArgumentList.Arguments) Expression(argument.Expression, owner, depth);
                    Call(invocation, owner, depth); return;
                case SwitchExpressionSyntax:
                case QueryExpressionSyntax:
                case AssignmentExpressionSyntax assignment when assignment.IsKind(SyntaxKind.CoalesceAssignmentExpression):
                    throw Error(expression, "Unsupported conditional expression in sequence analysis.");
                case ObjectCreationExpressionSyntax creation:
                    foreach (var argument in creation.ArgumentList?.Arguments ?? default) Expression(argument.Expression, owner, depth);
                    Note(owner, "Constructor/initializer boundary (not expanded): " + Label(creation)); return;
                case ImplicitObjectCreationExpressionSyntax creation:
                    foreach (var argument in creation.ArgumentList.Arguments) Expression(argument.Expression, owner, depth);
                    Note(owner, "Constructor/initializer boundary (not expanded): " + Label(creation)); return;
                case ElementAccessExpressionSyntax element:
                    Expression(element.Expression, owner, depth);
                    foreach (var argument in element.ArgumentList.Arguments) Expression(argument.Expression, owner, depth);
                    return;
                case ElementBindingExpressionSyntax element:
                    foreach (var argument in element.ArgumentList.Arguments) Expression(argument.Expression, owner, depth);
                    return;
                case InterpolatedStringExpressionSyntax interpolation:
                    foreach (var part in interpolation.Contents.OfType<InterpolationSyntax>())
                    {
                        Expression(part.Expression, owner, depth);
                        if (part.AlignmentClause is { } alignment) Expression(alignment.Value, owner, depth);
                    }
                    return;
                case AwaitExpressionSyntax:
                    throw Error(expression, "Async scheduling is not supported in expanded sequence bodies; use a depth or namespace boundary.");
                case ThrowExpressionSyntax:
                    throw Error(expression, "Throw expressions are supported only as direct return alternatives.");
            }
            ExpressionChildren(expression, owner, depth);
        }
        void ExpressionChildren(SyntaxNode node, string owner, int depth)
        {
            foreach (var child in node.ChildNodes())
                if (child is ExpressionSyntax expression) Expression(expression, owner, depth);
                else ExpressionChildren(child, owner, depth);
        }
        void Call(InvocationExpressionSyntax invocation, string owner, int depth)
        {
            var info = session.Semantic(invocation).GetSymbolInfo(invocation);
            if (info.Symbol is not IMethodSymbol method)
            {
                Note(owner, "Unresolved call boundary (not expanded): " + Label(invocation)); return;
            }
            method = method.ReducedFrom ?? method;
            var declaration = method.DeclaringSyntaxReferences.Select(r => r.GetSyntax()).OfType<MethodDeclarationSyntax>().FirstOrDefault();
            if (declaration is null && method.ContainingType.TypeKind != TypeKind.Interface)
            {
                Note(owner, "External/delegate call boundary (not expanded): " + Label(invocation)); return;
            }
            var target = Participant(method);
            Add($"{owner} -> {target} : {Text(method.Name)}({string.Join(", ", invocation.ArgumentList.Arguments.Select(a => Label(a)))})");
            var dispatch = method.ContainingType.TypeKind == TypeKind.Interface || method.IsAbstract ||
                (method.IsVirtual || method.IsOverride) && !method.IsSealed && !method.ContainingType.IsSealed;
            var ns = method.ContainingNamespace.ToDisplayString();
            var inScope = expandNamespaces.Length == 0 || expandNamespaces.Any(n => ns == n || ns.StartsWith(n + ".", StringComparison.Ordinal));
            if (dispatch || declaration?.Body is null && declaration?.ExpressionBody is null || depth >= maxDepth || !inScope)
            {
                Note(target, dispatch ? "Dispatch boundary: declared contract shown; runtime implementation is unknown." : !inScope ? "Scope boundary: method body not expanded." : depth >= maxDepth ? "Depth boundary: method body not expanded." : "Implementation unavailable; body not expanded.");
                Reply(target, owner, method.ReturnsVoid ? "complete (if call returns)" : Text(method.ReturnType.ToDisplayString()) + " (if call returns)");
            }
            else Method(declaration!, method, target, owner, depth + 1);
        }
    }
}
