namespace UseCaseManagement;

static class Tests
{
    public static int Run()
    {
        var root = Path.Combine(Path.GetTempPath(), "garage-usecase-tests-" + Guid.NewGuid().ToString("N"));
        Directory.CreateDirectory(root);
        int count = 0;
        void Assert(bool value, string label) { if (!value) throw new Exception(label); Console.WriteLine("PASS: " + label); count++; }
        void Reject(Action action, string expected)
        {
            string error = "";
            try { action(); } catch (Exception e) { error = e.Message; }
            Assert(error.Contains(expected, StringComparison.OrdinalIgnoreCase), "Rejects " + expected);
        }
        void Write(string relative, string text)
        {
            var path = CatalogueStore.At(root, relative); Directory.CreateDirectory(Path.GetDirectoryName(path)!); File.WriteAllText(path, text);
        }
        var fence = new string('\u0060', 3);
        var original = "# Park vehicle\n\n**Goal:** Park a vehicle.\n\n**Actor:** Garage user.\n\n## Flow\n\n1. Request parking.\n2. Validate and park.\n\n## Alternatives\n\n- Full: reject without changes.\n\n## Done when\n\n- The vehicle is parked or a reason is shown.\n\n" + fence + "yaml\nid: park-vehicle\npriority: required\nrequirements: [GAR-01]\n" + fence + "\n";
        const string source = "UseCases/garage/park-vehicle.md";
        try
        {
            Write("UseCases/requirements/README.md", "- **GAR-01 — Parking:** Park vehicles.\n");
            Write("UseCases/optional/README.md", "- **OPT-01 — Sizes:** Sized spaces.\n");
            Write(source, original);
            var catalogue = CatalogueStore.Load(root);
            var outputs = CatalogueStore.Outputs(catalogue);
            Assert(catalogue.Stories.Single().Requirements.Single() == "GAR-01", "Reads complete stories and requirement references");
            Assert(outputs.SequenceEqual(CatalogueStore.Outputs(CatalogueStore.Load(root))), "Deterministic catalogue");
            Write(source, original.Replace("\n", "\r\n"));
            Assert(outputs.SequenceEqual(CatalogueStore.Outputs(CatalogueStore.Load(root))), "Stable across CRLF conversion");
            Write(source, original);
            CatalogueStore.WriteOutputs(root, catalogue);
            Assert(Commands.Run(["validate", "--root", root, "--check-generated"]) == 0, "Generated catalogue validates");
            Write(source, original.Replace("Park a vehicle.", "Park safely."));
            Assert(Commands.Run(["validate", "--root", root, "--check-generated"]) == 1, "Story edits invalidate generated data");
            Write(source, original);
            var options = new Dictionary<string, string> {
                ["--id"]="sized-spaces", ["--title"]="Use sized spaces", ["--priority"]="optional", ["--goal"]="Park fitting vehicles.",
                ["--steps"]="Choose a vehicle.|Check dimensions and park.", ["--alternatives"]="Too large: reject without changes.",
                ["--done"]="Only a fitting vehicle is parked.", ["--requirements"]="OPT-01"
            };
            var created = Commands.Create(root, options);
            Assert(CatalogueStore.Load(root).Stories.Count == 2 && created == "UseCases/optional/sized-spaces.md", "Creates a complete optional story");
            var preserved = File.ReadAllText(CatalogueStore.At(root, created));
            Reject(() => Commands.Create(root, options), "already exists");
            Assert(preserved == File.ReadAllText(CatalogueStore.At(root, created)), "Creation never overwrites an existing story");
            var incomplete = new Dictionary<string, string>(options) { ["--id"] = "incomplete" }; incomplete.Remove("--done");
            Reject(() => Commands.Create(root, incomplete), "--done");
            Assert(!File.Exists(CatalogueStore.At(root, "UseCases/optional/incomplete.md")), "Incomplete creation leaves no file");
            Write(source, original.Replace("GAR-01", "GAR-99")); Reject(() => CatalogueStore.Load(root), "unknown requirement");
            Write(source, original.Replace("GAR-01", "OPT-01")); Reject(() => CatalogueStore.Load(root), "optional requirement");
            Write(source, original.Replace("requirements: [GAR-01]", "requirements: []")); Reject(() => CatalogueStore.Load(root), "checklist reference");
            Write(source, original.Replace("priority: required", "priority: required\nstatus: draft")); Reject(() => CatalogueStore.Load(root), "unknown or duplicate metadata");
            Write(source, original.Replace("Park a vehicle.", "[The outcome the user needs.]")); Reject(() => CatalogueStore.Load(root), "placeholders");
            Write(source, original.Replace("2. Validate", "3. Validate")); Reject(() => CatalogueStore.Load(root), "without gaps");
            Write(source, original.Replace("- Full: reject without changes.", "")); Reject(() => CatalogueStore.Load(root), "need content");
            Write(source, original[..original.IndexOf(fence + "yaml", StringComparison.Ordinal)]); Reject(() => CatalogueStore.Load(root), "footer");
            Write(source, original.Replace("Park a vehicle.", "[Missing](missing.md)")); Reject(() => CatalogueStore.Load(root), "broken local link");
            Write(source, original.Replace("Park a vehicle.", "[Unsafe](javascript:alert)")); Reject(() => CatalogueStore.Load(root), "unsupported link");
            Write(source, original);
            Write("UseCases/garage/duplicate.md", original); Reject(() => CatalogueStore.Load(root), "duplicate story");
            File.Delete(CatalogueStore.At(root, "UseCases/garage/duplicate.md"));
            Reject(() => CatalogueStore.At(root, "../escape.md"), "escapes");
            var escaping = new Dictionary<string, string>(options) { ["--id"]="../escape" };
            Reject(() => Commands.Create(root, escaping), "lowercase");
            Assert(Commands.Run(["new", "--root", root, "--typo", "x"]) == 2, "Unknown options fail clearly");
            Write(source, original.Replace("# Park vehicle", "# <script>alert(1)</script>"));
            Assert(!CatalogueStore.Outputs(CatalogueStore.Load(root))[CatalogueStore.HtmlOutput].Contains("<script>", StringComparison.Ordinal), "Generated reader escapes HTML-sensitive text");
            Console.WriteLine($"{count} manager checks passed."); return 0;
        }
        finally
        {
            var target = Path.GetFullPath(root);
            if (Path.GetDirectoryName(target)?.TrimEnd(Path.DirectorySeparatorChar) == Path.GetFullPath(Path.GetTempPath()).TrimEnd(Path.DirectorySeparatorChar)
                && Path.GetFileName(target).StartsWith("garage-usecase-tests-", StringComparison.Ordinal)) Directory.Delete(target, true);
        }
    }
}
