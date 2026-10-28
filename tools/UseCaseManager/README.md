# Use-case manager

A small .NET 10 tool for complete Markdown use cases. It has no package dependencies and is separate from the application projects.

Every story file is treated as a complete, reviewed specification. There are no draft or review states. Missing content, template placeholders, duplicate IDs or broken references cause an error. This contract concerns the specification; implementation and test coverage stay separate.

Run from the Garage-v2 root:

```powershell
dotnet run --project tools/UseCaseManager -- validate
dotnet run --project tools/UseCaseManager -- generate
```

Open `docs/uml/index.html#use-cases`, or choose **Use-case stories** in the existing diagram browser. The generated reader groups required and optional stories. **Diagrams & code** opens each story's linked UML views and code. The Markdown catalogue is `UseCases/catalogue.generated.md`.

Create a complete story by supplying its content:

```powershell
dotnet run --project tools/UseCaseManager -- new --id choose-parking-space --title "Choose a parking space" --priority optional --goal "Park in the requested space." --steps "The user selects a space.|The system checks availability and parks." --alternatives "Occupied: reject without changing the existing vehicle." --done "The requested space is used or a clear reason is shown." --requirements OPT-09
```

Separate multiple steps or bullets with `|` inside a quoted value. `--actor` defaults to `Garage user.`. Required stories need required checklist IDs; optional stories may reference either list or use no requirement references. `new` never overwrites a file. Run `generate` after creation or editing. You can also write complete Markdown files directly.

- Required stories: `UseCases/garage/*.md`.
- Optional stories: `UseCases/optional/*.md`, excluding its README.
- Footer fields: `id`, `priority`, `requirements`. Keep them on separate lines; requirement references use a one-line list such as `[GAR-01, GAR-02]`.
- Story content: title, goal, actor, numbered **Flow**, bulleted **Alternatives** and **Done when**.

The UML tool resolves C# `[UseCase("story-id")]` annotations against this catalogue. Titles and actors are read from Markdown. Add a complete optional story before linking an enhancement in code. To generate an activity, add a generated activity entry with `storyIds: ["story-id"]` to `docs/uml/manifest.json`. Every alternative must use `**Condition:** response <!-- after: STEP; outcome: end -->`; the step must exist. This explicitly models a terminating alternative after that step. These markers are validated and hidden by the reader. Retry/rejoining/nested flows are outside this activity subset. Parking is the working example. Use the UML render command to refresh all diagram presentations after a change.

Use `--root PATH` from another directory. `validate --check-generated` also detects stale catalogue output. Exit codes: 0 success, 1 invalid story/reference or stale output, 2 command/file error.

`dotnet run --project tools/UseCaseManager -- self-test` runs the compact fixture checks. The UML tool reuses this project so its normal generation and checking also refresh or check the catalogue. The application has no dependency on the manager.
