# Garage UML

This folder connects diagrams to the code in **Garage-v2**. It contains all 14 UML diagram types: 18 diagram files, of which seven are generated, five are reviewed views of the current application, and six are explicitly labeled templates.

Start with the [diagram browser](index.html), [components](structural/component/garage-components.puml), or [parking sequence](interaction/sequence/parking-sequence.puml). Render first to create local SVG previews. Every diagram has a stable ID and related-diagram links in the manifest; diagram sources also link to related views.

The browser's **How to read UML** guide illustrates inheritance, interface implementation, association, dependencies, composition and aggregation, along with visibility, multiplicity and flow symbols. Generated class diagrams also include a compact legend; component and package views explain their project-reference arrows. Legends are regenerated with the diagrams.

The explorer displays **live class, component and package graphs** using HTML cards and SVG relationship edges. Click a card to expand its members inside the graph; opening another card collapses the previous one. ELK.js recalculates positions and edge routes. Expanded member lists scroll inside their card, and source links remain available. Namespace panels group independent classes. Connected components that span namespaces retain namespace badges.

Use the sidebar to choose a diagram, **Find a class** to locate a type, and **Focus selection** to show that type with its direct neighbors. Large class views initially select a useful namespace so names remain readable; the type count shows how many of the project's types are visible. Filter by namespace to explore another area; **Show all** clears the filters. Search always covers the entire project. **Fit view**, **+ / −**, and **1:1** control the camera. Drag the background to pan, scroll to zoom, or use touch pinch. The fullscreen control enlarges the workbench. Keyboard users can tab to cards and press Enter to open them; on the focused canvas use +, −, 0 or F (fit), and arrow keys to pan. Member-list scrolling is independent of canvas zoom.

`diagrams.generated.js` includes explicit graph nodes and edges from the same C# model as the PlantUML sources. The locally bundled [ELK.js layout engine](https://github.com/kieler/elkjs) computes geometry; it does not infer UML relationships. Generated class views draw only unambiguous in-project inheritance and interface relationships. Other declared bases appear in the expanded card. Component and package arrows represent exact project references; package cards expand to list namespaces. The remaining authored diagrams use their SVG previews with the same pan/zoom controls. See [vendor provenance and license](vendor/README.md). No CDN, account, build step or server is required to use the page.

In Visual Studio, open `GarageArrays.slnx` and expand **UML Diagrams** in Solution Explorer. All 18 diagram sources are grouped by category and type; the browser, guide and tracking files are at the top, with tooling under **Automation**. Reload the solution if it was already open when these folders were added. Open `index.html` in a web browser to view the rendered diagrams.

## Layout

```text
docs/uml/
  manifest.json              Diagram policies, source scopes, entities and links
  registry.json              Stable logical IDs pointing to extracted code IDs
  model.generated.json       Projects, types, methods and source locations
  index.html                 Generated architecture explorer
  diagrams.generated.js      Explicit graph nodes, edges and diagram metadata
  viewer.js / viewer.css      Interactive cards, camera, filters and navigation
  graph-layout.js             ELK layout and namespace/component packing
  vendor/                    Pinned local ELK browser bundle and license
  structural/
    class/                   One generated class view per project
    object/                  Template: an example object snapshot
    component/               Generated project-reference graph
    composite-structure/     Template: parts and connectors
    package/                 Generated namespace containment and project references
    deployment/              Reviewed local runtime
    profile/                 Template: optional modeling conventions
  behavioral/
    use-case/                Reviewed user capabilities
    activity/                Reviewed parking flow
    state-machine/           Reviewed parking spot lifecycle
  interaction/
    sequence/                Reviewed parking collaboration
    communication/           Template: numbered object messages
    interaction-overview/    Template: interaction references
    timing/                  Template: illustrative occupancy timeline
  state/reviews.json         Committed review fingerprints and explanations
  reports/                  Ignored Markdown and JSON check results
tools/uml/                  C# extraction, generation, validation, tests and renderer
.github/workflows/uml-check.yml
```

Interaction diagrams are a subset of behavioral UML diagrams, grouped separately here for navigation. The manifest uses JSON so the .NET tooling needs no YAML parser or NuGet packages. Text sources use PlantUML. Communication, interaction overview, composite structure and profile templates use PlantUML's available object, activity, component and class notation; these are not an executable UML metamodel or XMI export.

## Everyday commands

Run from the Garage-v2 root with the .NET 10 SDK:

```sh
dotnet run --project tools/uml -- generate
dotnet run --project tools/uml -- check
dotnet run --project tools/uml -- check --strict
dotnet run --project tools/uml -- self-test
```

`generate` updates the seven generated diagrams, shared model and browser. It never overwrites hand-authored diagrams or records a review. `check` is read-only for sources and review state; it writes local reports. Generated drift and broken references fail checks. Pending reviews are advisory by default and fail with `--strict`. Exit codes: 0 passed, 1 outdated output or strict review pending, 2 invalid input/tool error. From elsewhere, pass `--root /path/to/Garage-v2` after the command.

Render and validate full PlantUML syntax with PowerShell 7:

```powershell
pwsh -File tools/uml/render.ps1 -CheckOnly
pwsh -File tools/uml/render.ps1
```

The renderer downloads the official PlantUML **1.2026.8** release into the ignored `tools/uml/.cache` folder and verifies its SHA-256 checksum. Windows x64 uses a portable native executable. Other platforms require Java 21 or newer. After the first download rendering works offline. Smetana provides layout without installing Graphviz. Diagram source stays on your machine. See the [PlantUML command-line documentation](https://plantuml.com/command-line), [Smetana documentation](https://plantuml.com/smetana02), and [pinned release](https://github.com/plantuml/plantuml/releases/tag/v1.2026.8).

Open `docs/uml/index.html` directly in a browser. Generated structural views are interactive as soon as `generate` has run; rendering creates the authored SVG previews and static exports. The same folder is uploaded as a CI artifact. Download and extract the artifact, then open its `index.html` locally. Run `node tools/uml/graph-layout-tests.js` to test the live layout with the pinned ELK engine.

## How change detection works

1. Parse C# with Roslyn from the installed SDK. Extract project references, namespace containment, type declarations, ordinary methods, member signatures, primary constructors, and source locations.
2. Compare freshly generated output with the committed files. Type/signature/project changes require regeneration. Body-only changes leave structural output alone.
3. Compute SHA-256 fingerprints of C# tokens for each tracked file or symbol. Active-source comments and formatting are ignored. Implementation changes, new/deleted files within glob scopes, and changes to input JSON or project configuration affect the appropriate reviews.
4. Compare each reviewed diagram with its last acknowledged source fingerprints. Editing the diagram or its tracking policy also requires a new review. Reports identify changed sources and related diagrams.
5. Validate IDs, related-diagram links, registry targets, tracking scopes, syntax envelopes, and coverage of all 14 diagram types. CI additionally runs PlantUML's full syntax checker and renders previews.

Review baselines are committed, so the checks work without Git history and also see uncommitted source changes. A rename preserves a type's qualified ID but changes the model's source location and file-based review scope. A tracked type or method that disappears causes a validation error until its reference is repaired.

The tool parses checked-in `.cs` files under each listed project, excluding `bin`, `obj`, `.git`, `.vs`, `node_modules` and directory links. It does not evaluate MSBuild conditions, custom Compile globs, generated sources, compilation symbols, alias resolution, runtime calls or external library types. Inactive conditional code is fingerprinted as text, but is not extracted into the structural model. Inheritance arrows use unambiguous name matches within the diagram's project; there is no inferred association, ownership or cross-project type dependency graph. Use the component graph for exact declared project references.

A passing check establishes that generated views match this extracted model and that reviewed views were acknowledged against the tracked sources. It cannot prove behavioral diagrams are semantically correct. Full application compilation and domain tests remain separate checks.

## Review an affected diagram

Read the reported source changes, inspect related diagrams, then update the reviewed diagram if its behavior changed. Record the result, including when a diagram remains accurate:

```sh
dotnet run --project tools/uml -- approve --id parking-sequence --note "Checked parking validation changes; the existing result branches remain accurate."
dotnet run --project tools/uml -- check --strict
```

Commit the diagram when changed, generated output when needed, and `state/reviews.json`. Approval records only the named diagram's current source and diagram fingerprints; it does not approve other diagrams. A meaningful explanation is required. The initial baseline was checked against the current parking implementation, interface startup, imports and application documentation.

## Shared identities and links

`registry.json` maps logical IDs such as `service:garage` and `operation:park` to extracted IDs. A type ID includes the project path, namespace, nested type name and generic parameters. Ordinary method IDs also include parameter types and modifiers to distinguish overloads. File moves preserve these IDs; namespace/type/project renames require updating references.

```text
system:garage
  -> component:domain -> project:Garage/Garage.csproj
  -> service:garage -> type:Garage/Garage.csproj:Garage.Services.GarageService
  -> operation:park -> operation:Garage/Garage.csproj:Garage.Services.GarageService.Park(Vehicle,VehicleGarage,int?)
```

Each manifest entry declares `entities` for shared context and `related` for navigation. These links are validated, but do not automatically invalidate all neighboring diagrams. `trackFiles` and `trackSymbols` explicitly control review triggers, keeping unrelated diagrams quiet. Project configuration and files matched by top-level `inputs` are available alongside C# files as tracked inputs.

## Add a diagram or promote a template

1. Create a `.puml` file in the appropriate type folder. Include `@startuml`, a `' diagram-id: unique-id` line, and `@enduml`.
2. Add a manifest entry with a unique `id`, `type`, `title`, `file`, `maintenance`, `status`, `project` (null unless a generated class view), `trackFiles`, `trackSymbols`, `entities`, and `related`.
3. Choose `generated` only for supported class/component/package views. Choose `reviewed` with `status: active` for a view checked against implementation. Use `manual` with `status: template` for an illustrative starting point.
4. For a reviewed view, add concrete tracking scopes. Example: `Garage/Services/**/*.cs`. A `*` matches within one directory; `**` spans directories; `?` matches one non-separator character. Paths use `/` and are case-sensitive, including on Windows. Exact symbols are copied from `model.generated.json` into `trackSymbols`.
5. Link shared entity IDs and related diagrams. Add registry entities when needed. Replace illustrative values and template labels before promotion.
6. Run `generate`, review and acknowledge the new view, then run `check --strict`, full syntax validation and rendering.

Keep source scopes broad enough to include new collaborators and error/result types. The current parking views track the service, garage, spot, parking result and error-code files together. Local deployment tracks startup, project configuration, imports and sample JSON. Add new input patterns when deployment or contracts move elsewhere.

## Pull requests

The workflow builds and tests the UML tool, checks committed diagrams, validates full syntax, renders SVG previews, writes a job summary, and uploads the diagram folder. It does not post comments, edit the pull request, or publish anything externally. It starts with advisory reviews; add `--strict` to the workflow's check command when the team wants review acknowledgements to block that job. Requiring the job before merging is a repository branch-protection setting.

Local reports, SVG images, renderer downloads, and normal .NET build outputs are ignored. Commit diagram sources, manifest, registry, generated model/browser, and review acknowledgements together.
