# Garage UML

The browser's **Use-case stories** entry opens the readable requirements catalogue, grouped into required and optional stories. Its source is `UseCases/`, managed by the separate [UseCaseManager project](../../tools/UseCaseManager/README.md). Every story is treated as complete; invalid content stops generation. Normal UML generation and checking also refresh or check the catalogue. Choose **Diagrams & code** on a story to open its linked requirements views, implementation sequence, reviewed behavior and shared class structure. The use-case diagram reads all story goals and actors; code annotations link implementations to those same story IDs.

This folder connects stories and diagrams to the code in **Garage-v2**. It contains all 14 UML diagram types: 19 diagram files, of which ten are generated, three are reviewed views of the current application, and six are explicitly labeled templates.

Start with the [diagram browser](index.html), [components](structural/component/garage-components.puml), or [parking sequence](interaction/sequence/parking-sequence.puml). Render first to create local SVG previews. Every diagram has a stable ID and related-diagram links in the manifest; diagram sources also link to related views.

The browser's **How to read UML** guide illustrates inheritance, interface implementation, association, dependencies, composition and aggregation, along with visibility, multiplicity and flow symbols. Generated class diagrams also include a compact legend; component and package views explain their project-reference arrows. Legends are regenerated with the diagrams.

The explorer displays **all 19 diagrams as live views**, covering all 14 UML types. Generated structural graphs use HTML cards and SVG relationship edges. Click a card to expand its members inside the graph; opening another card collapses the previous one. ELK.js recalculates positions and edge routes. Expanded member lists scroll inside their card, and source links remain available. Namespace panels group independent classes. Connected components that span namespaces retain namespace badges.

The **Interactive / PlantUML / PUML source** switch chooses the presentation for the selected diagram. Interactive and PlantUML previews have their own pan/zoom positions; returning to Interactive keeps its expanded element. PUML source displays the exact shared definition as read-only text. The selection stays in effect when navigating between diagrams.

These are presentations of one definition. Class/component/package sources are generated from the code model. The use-case view reads the Markdown stories; parking's requirements activity reads its story Flow and explicitly mapped Alternatives. The parking sequence reads C# implementation linked by a story ID. Edit their inputs, then regenerate; their `.puml` files are output. The remaining authored diagrams are edited in their `.puml` source. `generate` captures the source text and its SHA-256 alongside the interactive data. The render command automatically runs generation, renders that exact captured PUML snapshot, and writes matching preview fingerprints. If a preview has not been refreshed against the current source, PlantUML mode shows a refresh message instead of displaying stale output.

Use the sidebar to choose a diagram, **Find a class** to locate a type, and **Focus selection** to show that type with its direct neighbors. Large class views initially select a useful namespace so names remain readable; the type count shows how many of the project's types are visible. Filter by namespace to explore another area; **Show all** clears the filters. Search always covers the entire project. **Fit view**, **+ / −**, and **1:1** control the camera. Drag the background to pan, scroll to zoom, or use touch pinch. The fullscreen control enlarges the workbench. Keyboard users can tab to cards and press Enter to open them; on the focused canvas use +, −, 0 or F (fit), and arrow keys to pan. Member-list scrolling is independent of canvas zoom.

`diagrams.generated.js` includes explicit graph nodes and edges from the C# model and the authored PlantUML sources. The locally bundled [ELK.js layout engine](https://github.com/kieler/elkjs) computes geometry; it does not infer UML relationships. Generated class views draw only unambiguous in-project inheritance and interface relationships. Other declared bases appear in the expanded card. Component and package arrows represent exact project references; package cards expand to list namespaces. Authored diagrams preserve their own notation and meaning:

| View | Interaction and notation |
| --- | --- |
| Sequence | Lifelines, call/reply arrows, notes and nested alternative frames. Open an `alt` frame to reveal its guarded branches; nested expansion keeps the outer context. |
| Activity / interaction overview | Actions, reference nodes, decision/merge diamonds, guard labels and independent termination points. Large flows initially focus on a decision neighborhood; **Show all** displays the complete flow. |
| State machine | Initial symbol, states and transitions, including self-loops and trigger/guard/action labels. Open a state for its source notes. |
| Use case | Actor symbols outside a system boundary, with elliptical use cases and associations. |
| Deployment | Nested device/runtime frames, artifacts, files and dependency connectors. Container headers open details while children remain inside their frames. |
| Object / composite structure / profile / communication | Instance values, owning diamonds, contained parts, metaclass/stereotype roles and numbered messages are retained. |
| Timing | Explicit time coordinates, state levels and a step trace. Click a time point to open its state/time details below the trace. |

The six illustrative templates remain labeled **Template**. Their interactive presentation does not promote them to reviewed descriptions of the implementation. **Diagram notes** exposes source annotations. Static SVG exports remain available through **SVG export**. See [vendor provenance and license](vendor/README.md). No CDN, account, build step or server is required to use the page.

`AuthoredData.cs` reads the bounded PlantUML notation used by the current diagrams, including the generated sequence/use-case sources: entity declarations, containment, member values, notes, labeled connections, activities with `if`/`else`/`endif`, sequence messages and nested `alt` frames, and robust timing signals with increasing sample times. It is not a general PlantUML interpreter. Unsupported statements or unresolved endpoints fail generation with a source location, so new notation must be supported explicitly before it can appear in the live viewer. No second hand-maintained diagram model is required.

In Visual Studio, open `GarageArrays.slnx` and expand **UML Diagrams** in Solution Explorer. All 19 diagram sources are grouped by category and type; the browser, guide and tracking files are at the top, with tooling under **Automation**. Reload the solution if it was already open when these folders were added. Open `index.html` in a web browser to view the rendered diagrams.

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
  semantic-layout.js          Sequence, timing and nested containment geometry
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

`generate` updates the ten generated diagrams, shared model and browser. It never overwrites hand-authored diagrams or records a review. `check` is read-only for sources and review state; it writes local reports. Generated drift and broken references fail checks. Pending reviews are advisory by default and fail with `--strict`. Exit codes: 0 passed, 1 outdated output or strict review pending, 2 invalid input/tool error. From elsewhere, pass `--root /path/to/Garage-v2` after the command. Add `--verbose` to print exception details when diagnosing a tool error.

Render and validate full PlantUML syntax with PowerShell 7:

```powershell
pwsh -File tools/uml/render.ps1 -CheckOnly
pwsh -File tools/uml/render.ps1
```

Running `pwsh -File tools/uml/render.ps1` refreshes **both presentations together** from a shared source snapshot. Reload the browser afterward. `-CheckOnly` validates current source syntax without regenerating files. The renderer downloads the official PlantUML **1.2026.8** release into the ignored `tools/uml/.cache` folder and verifies its SHA-256 checksum. Windows x64 uses a portable native executable. Other platforms require Java 21 or newer. After the first download rendering works offline. Smetana provides layout without installing Graphviz. Diagram source stays on your machine. See the [PlantUML command-line documentation](https://plantuml.com/command-line), [Smetana documentation](https://plantuml.com/smetana02), and [pinned release](https://github.com/plantuml/plantuml/releases/tag/v1.2026.8).

Open `docs/uml/index.html` directly in a browser. All live views are ready as soon as `generate` has run; rendering creates the static SVG exports. The same folder is uploaded as a CI artifact. Download and extract the artifact, then open its `index.html` locally. Run `node tools/uml/graph-layout-tests.js` and `node tools/uml/semantic-layout-tests.js` to test the layouts with the pinned ELK engine.

## Generate use cases and sequences from code

The annotations in `Garage/Documentation/DiagramAttributes.cs` reference a story ID and supply sequence scope. The matching Markdown story supplies the title and actor. The generator reads the implementation for sequence messages, decisions and returns. These annotations do not change application execution.

For example, the parking entry in `Garage/Services/GarageService.cs` is marked:

```csharp
[UseCase("park-vehicle")]
[SequenceView("parking-sequence", MaxDepth = 3,
    ExpandNamespaces = new[] { "Garage.Services", "Garage.Models" })]
public ParkingResult Park(Vehicle vehicle, VehicleGarage garage, int? spotNumber = null)
```

`UseCase` can mark methods or properties. Its sole argument must match a complete story ID in `UseCases/`; unknown IDs fail with a C# source location. The generated `garage-use-cases` view includes every required and optional story, including goals without linked code. Cards link to the story and its annotated C# files. A code link identifies related implementation and does not certify complete behavior or test coverage. The shared model records story-to-code and story-to-diagram links. Choose **Diagrams & code** in the catalogue, or **Story & diagrams** on a use-case card, to explore them.

To add a separate capability, write its complete story first, then use `[UseCase("story-id")]` on the related operations. Reuse an ID to link several operations to one story. Change the title or actor once in Markdown, then regenerate. Existing implementation extensions have separate optional stories for sized garage creation, catalogue vehicle creation/import and space inspection.

`parking-story-activity` generates the requirements flow directly from `UseCases/garage/park-vehicle.md`. Its manifest entry uses `storyIds: ["park-vehicle"]`. Each alternative has an explicit hidden marker such as `<!-- after: 2; outcome: end -->`: check its stated condition after Flow step 2, perform the alternative response and terminate that request. The normal path continues to the next numbered step. Unknown step references, malformed markers and unmapped alternatives fail generation. Current support covers a linear success path and terminating alternatives; retries, rejoining branches and nested decisions need explicit additional support. The readable catalogue hides these markers. Done conditions become diagram notes. This requirements view is distinct from the existing reviewed implementation activity and code-generated sequence.

`SequenceView` marks one implemented method with exactly one `UseCase`. Its ID must match a generated sequence entry in `manifest.json`; the manifest supplies the output path, title and related views. Duplicate or missing roots fail generation. Add the manifest entry when introducing another sequence, then maintain calls and branches in C# rather than PUML. The existing `parking-sequence` is the working example.

`CodeDiagrams.cs` creates Roslyn compilations with local project references, .NET platform references and SDK-style implicit usings. Symbol binding distinguishes aliases, overloads and cross-project calls. Each sequence starts at its annotated method. It preserves receiver/argument evaluation order, ordinary calls, expression-bodied methods, `if`/`else`, early returns, conditional expressions, short-circuit operators and explicit throws. Code after an early return appears only on the continuing path. Arguments retain the expressions at each call site; parameter values are not symbolically propagated between methods.

The root body is always analyzed. `MaxDepth` (0–6) limits additional method-body expansion: 0 shows direct calls without expanding their bodies. `ExpandNamespaces` optionally restricts expansion to listed namespaces and their children. Calls outside the scope remain visible as labeled boundaries. Parking expands services and models, keeping result factories as boundary calls. Recursive calls, interfaces and overridable methods also stop at explicit boundaries; the generator does not guess runtime dispatch targets.

The generated view describes **possible source paths**, not an execution trace. Lifelines group calls by their declared type, not by individual object instance. It does not prove that every combination of guards is feasible. Caller continuation assumes normal return from the callee. Property accessors, constructor/initializer bodies, external implementations, delegate execution and lambda callbacks are boundaries, and implicit/external exceptions are not traced. Callback source is shown in a note, rather than executed or drawn as one unconditional invocation. Unsupported expanded control flow (including loops, `switch`, `try` and async bodies) fails with a C# source location; reduce scope/depth or add explicit support. A 1,400-statement budget bounds path expansion.

As with structural extraction, this is not an MSBuild evaluation: conditional project settings, custom compile items, generated source and package references are not resolved. Calls that cannot be bound are visibly labeled unresolved. Application compilation and tests remain independent checks. An instrumented test trace would be a separate future input for exact scenario sequences and measured timing.

After changing stories, annotations or code, run `pwsh -File tools/uml/render.ps1` to regenerate the model, PUML, interactive views and SVG previews together, then reload `index.html`. The implementation activity/state/deployment views and six templates retain their maintenance policies. Parking's reviewed activity and spot state also reference `park-vehicle` through `storyIds`, so changes to that specification trigger their review.

## How change detection works

1. Parse C# with Roslyn from the installed SDK. Extract project references, namespace containment, type declarations, ordinary methods, member signatures, primary constructors, and source locations.
2. Compare freshly generated output with the committed files. Type/signature/project changes require regeneration. Annotated entry-point bodies and transitively expanded callees drive sequence output; Markdown stories drive use-case and story-activity output. Story title/actor changes update linked sequence metadata too. Body-only changes leave structural output alone.
3. Compute SHA-256 fingerprints of C# tokens for each tracked file or symbol. Active-source comments and formatting are ignored. Implementation changes, new/deleted files within glob scopes, and changes to input JSON or project configuration affect the appropriate reviews.
4. Compare each reviewed diagram with its last acknowledged source fingerprints. `storyIds` adds the linked story and its referenced requirement definitions to these fingerprints. Editing the diagram or its tracking policy also requires a new review. Reports identify changed sources and related diagrams.
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
3. Choose `generated` for supported class/component/package views, the story use-case view, a story activity with exactly one `storyIds` entry and mapped alternatives, or a sequence with a matching `SequenceView` method. Choose `reviewed` with `status: active` for a view checked against implementation. Use `manual` with `status: template` for an illustrative starting point.
4. For a reviewed view, add concrete tracking scopes. Example: `Garage/Services/**/*.cs`. A `*` matches within one directory; `**` spans directories; `?` matches one non-separator character. Paths use `/` and are case-sensitive, including on Windows. Exact symbols are copied from `model.generated.json` into `trackSymbols`.
5. Link shared entity IDs and related diagrams. Add registry entities when needed. Replace illustrative values and template labels before promotion.
6. Run `generate`, review and acknowledge the new view, then run `check --strict`, full syntax validation and rendering.

Keep source scopes broad enough to include new collaborators and error/result types. The current parking views track the service, garage, spot, parking result and error-code files together. Local deployment tracks startup, project configuration, imports and sample JSON. Add new input patterns when deployment or contracts move elsewhere.

## Pull requests

The workflow builds and tests the UML tool, checks committed diagrams, validates full syntax, renders SVG previews, writes a job summary, and uploads the diagram folder. It does not post comments, edit the pull request, or publish anything externally. It starts with advisory reviews; add `--strict` to the workflow's check command when the team wants review acknowledgements to block that job. Requiring the job before merging is a repository branch-protection setting.

Local reports, SVG images, `previews.generated.js`, renderer downloads, and normal .NET build outputs are ignored. Commit diagram sources, manifest, registry, generated model/browser, and review acknowledgements together.
