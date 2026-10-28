using System.Text;
namespace UseCaseManagement;

public static class Commands
{
    public static int Run(string[] args)
    {
        try
        {
            if (args.Length == 0 || args[0] is "help" or "--help")
            {
                Console.WriteLine("Use-case manager: new | validate [--check-generated] | generate | self-test\n" +
                    "new requires --id, --title, --priority, --goal, --steps, --alternatives, --done.\n" +
                    "Separate multiple steps/bullets with | inside a quoted value. Optional: --actor, --requirements.\n" +
                    "Required stories need --requirements GAR-01,GAR-02. Add --root PATH to any command.");
                return 0;
            }
            if (args[0] == "self-test") return Tests.Run();
            var command = args[0];
            var allowed = command switch
            {
                "new" or "create" => new[] { "--root", "--id", "--title", "--priority", "--goal", "--actor", "--steps", "--alternatives", "--done", "--requirements" },
                "validate" => ["--root", "--check-generated"],
                "generate" => ["--root"],
                _ => throw new ArgumentException("Unknown command: " + command)
            };
            var options = new Dictionary<string, string>(StringComparer.Ordinal);
            for (var i = 1; i < args.Length; i++)
            {
                var key = args[i];
                if (!allowed.Contains(key)) throw new ArgumentException("Unknown option: " + key);
                var value = key == "--check-generated" ? "true" : ++i < args.Length && !args[i].StartsWith("--", StringComparison.Ordinal) ? args[i] : throw new ArgumentException("Missing value for " + key);
                if (!options.TryAdd(key, value)) throw new ArgumentException("Duplicate option: " + key);
            }
            var root = Path.GetFullPath(options.GetValueOrDefault("--root") ?? FindRoot());
            if (command is "new" or "create") { Console.WriteLine("Created: " + Create(root, options)); return 0; }
            var catalogue = CatalogueStore.Load(root);
            if (command == "generate") CatalogueStore.WriteOutputs(root, catalogue);
            else if (options.ContainsKey("--check-generated"))
                foreach (var (path, expected) in CatalogueStore.Outputs(catalogue))
                    if (!File.Exists(CatalogueStore.At(root, path)) || CatalogueStore.Read(CatalogueStore.At(root, path)) != expected)
                        throw new InvalidDataException("Outdated catalogue: " + path + ". Run generate.");
            Console.WriteLine($"{(command == "generate" ? "Generated" : "Validated")} {catalogue.Stories.Count} complete stories.");
            return 0;
        }
        catch (InvalidDataException e) { Console.Error.WriteLine(e.Message); return 1; }
        catch (Exception e) when (e is ArgumentException or IOException or UnauthorizedAccessException) { Console.Error.WriteLine(e.Message); return 2; }
    }
    public static string Create(string root, IReadOnlyDictionary<string, string> options)
    {
        string Required(string key) => options.TryGetValue(key, out var value) && !string.IsNullOrWhiteSpace(value) && !value.Any(char.IsControl) ? value : throw new ArgumentException("Supply single-line " + key);
        var id = Required("--id"); var title = Required("--title"); var priority = Required("--priority"); var goal = Required("--goal");
        if (!CatalogueStore.ValidId(id) || priority is not ("required" or "optional")) throw new ArgumentException("Supply a lowercase ID and required/optional priority.");
        var catalogue = CatalogueStore.Load(root);
        if (catalogue.Stories.Any(s => s.Id == id)) throw new InvalidDataException("Story ID already exists: " + id);
        var actor = options.ContainsKey("--actor") ? Required("--actor") : "Garage user.";
        var content = new StringBuilder($"# {title}\n\n**Goal:** {goal}\n\n**Actor:** {actor}\n");
        foreach (var (option, heading, numbered) in new[] { ("--steps", "Flow", true), ("--alternatives", "Alternatives", false), ("--done", "Done when", false) })
        {
            var items = Required(option).Split('|').Select(s => s.Trim()).ToList();
            if (items.Any(string.IsNullOrWhiteSpace)) throw new ArgumentException(option + " contains an empty item.");
            content.Append("\n## " + heading + "\n\n");
            for (var i = 0; i < items.Count; i++) content.Append((numbered ? (i + 1) + ". " : "- ") + items[i] + "\n");
        }
        var fence = new string('\u0060', 3);
        content.Append($"\n{fence}yaml\nid: {id}\npriority: {priority}\nrequirements: [{string.Join(", ", options.GetValueOrDefault("--requirements", "").Split(',', StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries))}]\n{fence}\n");
        var source = $"UseCases/{(priority == "required" ? "garage" : "optional")}/{id}.md";
        CatalogueStore.ValidateReferences(CatalogueStore.Parse(source, content.ToString()), catalogue);
        CatalogueStore.ValidateLinks(root, source, content.ToString());
        var path = CatalogueStore.At(root, source);
        Directory.CreateDirectory(Path.GetDirectoryName(path)!);
        using var stream = new FileStream(path, FileMode.CreateNew, FileAccess.Write);
        using var writer = new StreamWriter(stream, new UTF8Encoding(false));
        writer.Write(content);
        return source;
    }
    static string FindRoot()
    {
        for (var directory = new DirectoryInfo(Environment.CurrentDirectory); directory is not null; directory = directory.Parent)
            if (Directory.Exists(Path.Combine(directory.FullName, "UseCases"))) return directory.FullName;
        throw new ArgumentException("Cannot find UseCases/. Pass --root PATH.");
    }
}
