# Use cases

These stories define what the application should provide. The [requirements checklist](requirements/README.md) follows the Garage 1.0 assignment, with **lists instead of arrays**.

## Catalogue

- [Read stories in the diagram browser](../docs/uml/index.html#use-cases).
- [Read the generated Markdown catalogue](catalogue.generated.md).
- Required story files live in `garage/`; optional story files live in `optional/`.
- [Optional enhancement ideas](optional/README.md) and [implementation notes](implementation/README.md) remain separate.

Every story file is a complete, reviewed specification. There are no draft states. An incomplete file, unresolved placeholder, duplicate ID or broken reference is an error. Requirement priority is independent of whether functionality is implemented or tested.

## Manager

```powershell
dotnet run --project tools/UseCaseManager -- validate
dotnet run --project tools/UseCaseManager -- generate
```

The [manager guide](../tools/UseCaseManager/README.md) explains how to create a story with the `new` command. It requires the content rather than creating a placeholder file. You can also write a story directly using the [format reference](templates/use-case.md); replace all placeholders before placing it in the catalogue.

Keep the format short: goal, actor, flow, alternatives and done conditions. The final metadata block contains only `id`, `priority` and `requirements`. Checklists, implementation notes and the template are not story files.

The catalogue and requirements use-case diagram read these documents directly. Choose **Diagrams & code** on any story to see its linked diagrams and annotated implementation. Code uses `[UseCase("park-vehicle")]`: the title and actor come from the matching story, and unknown IDs fail generation. A code link identifies related implementation; it does not certify complete behavior or test coverage.

Parking also generates a requirements activity from its existing numbered Flow and Alternatives. An alternative's hidden `<!-- after: 2; outcome: end -->` annotation explicitly places the condition after step 2 and ends that rejected request. The reader hides these annotations. Every alternative needs a valid mapping before its activity can be generated; the tool does not infer branches from prose. Current activity support covers a linear success flow with terminating alternatives. Retry loops, rejoining branches and nested decisions need additional explicit support.

Run `pwsh -File tools/uml/render.ps1` after editing stories or code, then reload the browser. It refreshes the shared model, interactive diagrams and PlantUML previews together. `check` detects stale generated output; `storyIds` in the diagram manifest makes linked authored diagrams require review when the story changes. Parking's sequence reads the implementation; its requirements activity reads the story.

Parking's communication and interaction-overview diagrams use the same captured participants, messages and guarded alternatives as its sequence. Their manifest entries inherit the story ID through `interactionSource`. Open **Diagrams & code** to reach those views; expand a participant or interaction reference for details, then use **Open sequence** to see the original context. The story view also lists source branches. Timing remains a linked illustrative template until duration requirements or measured traces are available.
