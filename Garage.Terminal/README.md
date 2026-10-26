# Garage Workspace

A separate Terminal.Gui app sharing the existing Garage and Vehicle projects. The original Garage.Console remains available.

## Run

From the Garage-v2 directory:

```text
dotnet run --project Garage.Terminal
```

To start without sample garages or vehicles:

```text
dotnet run --project Garage.Terminal -- --empty
```

Use a terminal with at least 80 columns and 24 rows; 120 by 32 or larger is recommended. The layout responds to resizing. Short terminals hide the details panel to show more table rows; the Details action still opens the full record. Colours adapt to terminal capabilities.

## Workspace

- **Overview:** garages, capacity, availability, and occupancy bars. Enter opens the selected garage.
- **Vehicle catalog:** parked and available vehicles from every garage, with current location and spot.
- **Parking:** vehicles in the selected garage. The garage selector stays at the top.
- **Search garage:** every existing search criterion, including multiple vehicle types and vehicle-specific filters. Find narrows the visible results as you type.

The sidebar creates garages or imports layout JSON with optional placements. Garage creation supports unrestricted spots, default dimensions, and individual spot overrides.

## Vehicle and engine creation

The vehicle wizard covers cars, motorcycles, airplanes, buses, boats, and trucks. Short form pages retain their values when moving back or correcting validation errors. Enum and boolean fields use selection lists. Numeric fields display their units and reject invalid values.

Before creating the vehicle, add, review, or remove engines. All ten existing engine types are supported. The same domain factories and Garage services perform creation and validation.

Use **Spots / create & park** to create a vehicle directly in the selected garage. Choose the first suitable spot or a specific open spot. Failed parking leaves the catalog unchanged.

## JSON files

Import actions open a file browser filtered to JSON, starting in the bundled Data folder. Browse files or paste a path into the location field.

- Vehicle import reads **one vehicle object** and can optionally park it immediately.
- Garage import reads a **layout**, followed optionally by a **placement file**.
- The formats and samples are the same as the original console.
- Successful vehicle imports select the new record in the catalog.

## Keyboard and mouse

| Key | Action |
| --- | --- |
| Tab / Shift+Tab | Move between controls across all dashboard panels |
| Arrow keys | Move within lists and tables |
| Enter | Activate a button, open a choice, or inspect a table row |
| Space | Mark a vehicle type in the multi-selection list |
| Ctrl+F | Focus the live Find field |
| F1 | Help |
| F2 | Create a vehicle |
| F3 | Search filters |
| F4 | Create a garage |
| F5 | Refresh |
| Esc | Cancel a dialog; on the dashboard, ask to quit |
| Ctrl+Q | Ask to quit |

Mouse selection and buttons are also supported. Removal asks for confirmation and keeps the vehicle in the catalog as available.

## Session data

Like the original console, changes stay in the running session. Imports never overwrite their source files. Quitting does not save garages or vehicles back to JSON.

## Structure

`Forms` describes each vehicle and engine form and calls the matching domain factory directly. The field definitions and factory calls are kept in separate files. In `Presentation`, `GarageWorkspace.cs` builds and refreshes the dashboard, `WorkspaceButtons.cs` groups its persistent buttons, and `GarageWorkspace.Actions.cs` handles their workflows. `Dialogs.cs` owns temporary dialogs and their buttons. `Theme.cs` keeps colours and shared control styling in one place. Garage business rules remain in Garage; this project does not reference Garage.Console.

The Terminal.Gui dependency is pinned to 2.4.17. See the [Terminal.Gui documentation](https://tui-cs.github.io/Terminal.Gui/docs/getting-started.html).
