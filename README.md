# Garage

A console application with three projects and one dependency direction:

```text
Garage.Console -> Garage -> Vehicle
```

## Responsibilities

- **Garage.Console** collects input, holds unfinished drafts, maps input into factory arguments, and displays results.
- **Garage** owns valid garage state, parking rules, the vehicle catalog, application operations, queries, JSON persistence, and diagnostics.
- **Vehicle** defines vehicle and engine models, specifications, validation, and factories.

The Garage and Vehicle projects do not reference the console or use console input/output. Application startup wires the projects together in `Garage.Console/Program.cs`.

```text
Garage/
  Models/          Garage, ParkingSpot, VehicleCatalog
  Services/        GarageService, VehicleCreationService
  Queries/         VehicleSearchCriteria, ParkingSpotInfo,
                   ParkedVehicleInfo, VehicleTypeGroup
  Specifications/  Garage layout, spot sizes, and placement descriptions
  Results/         Operation outcomes and error codes
  Persistence/
    Json/          JSON loaders, mapper, settings, and internal contracts
  Diagnostics/     Error logging
  Data/            Sample JSON files

Garage.Console/
  Menus/           Navigation and actions
  Prompts/         Input and search-filter selection
  Drafts/          Incomplete vehicle and engine input
  Mapping/         UI draft adapters
  Display/         Vehicle, engine, and screen rendering
  Program.cs       Application startup
```

## Models and operations

`Garage` owns its parking spots. Only its methods can change their occupants. Public collections are read-only, and parking/search queries return named records. Public APIs use **one-based spot numbers**; indexes stay inside the model.

`GarageService` owns the registered garages and a `VehicleCatalog` containing both parked and available vehicles. Garage names and vehicle registrations are unique, ignoring case. It offers garage creation, JSON import, parkable-vehicle selection, and parking across garages.

`VehicleCreationService`, available through `GarageService.VehicleCreation`, creates and registers vehicles. It also handles **create and park** as one operation: validation, duplicate checks, and parking must succeed before the catalog changes. Failed creation leaves both collections unchanged. A parked vehicle must be removed before it can be parked in another garage.

UI drafts can be incomplete. JSON contracts describe the file format. Neither acts as live garage state.

## Results

- `ParkingResult`: success, spot number, message, and error code.
- `VehicleCreationResult`: success, cancellation, vehicle, optional parking details, message, and error code.
- `GarageCreationResult`: success, garage, message, and error code.
- `GarageOperationResult`: removal outcome, spot number, message, and error code.

Results have private constructors and named success/failure factories. Successful creation always contains its object; failed creation contains no object. Expected validation and file errors become failed results. Unexpected failures reach the application's error logger.

## Create a vehicle from JSON

Choose **Create and list vehicles -> Create vehicle from JSON file** and enter:

```text
P:\Lexicon-Workspace\Garage-v2\Garage\Data\example-vehicle.json
```

The file contains one vehicle object, including its engines. The catalog files `vehicles.json` and `created-vehicles.json` contain arrays of the same object format. JSON is checked for unknown fields, enum values, and model validation.

A single-vehicle path may be absolute or relative to the current working directory. Startup catalog filenames resolve under the application's output `Data` folder.

The imported vehicle is registered for the current session. Import does not write back to the file. When opened through **Create and park vehicle**, successful import also parks the vehicle.

## Create a garage from JSON

Choose **Create garage from JSON files** and enter a layout path, optionally followed by a placement path. Paths may be absolute or relative to the current working directory.

The layout contains `garageName`, `capacity`, optional `defaultSpotSize`, and optional `spots` with custom sizes. Sizes use `lengthMeters`, `widthMeters`, and `heightMeters`. Omitting sizes creates unrestricted spots.

The placement file contains the same `garageName`, a `vehiclesFile`, and `assignments` containing `spotNumber` and `registrationNumber`. The vehicle file resolves relative to the placement file. Assignments must be unique, refer to existing vehicles, and fit the requested spots.

See `Garage/Data/example-garage.json` and `Garage/Data/example-placements.json`. Existing registrations in the running application cannot be imported again; the example placements reuse the startup catalog, so use an empty session or different registrations to import those placements. Loading the example layout without placements creates an empty garage.

## Verification

```text
dotnet build GarageArrays.slnx
dotnet test Garage.Tests/Garage.Tests.csproj
```

Tests cover parking and removal rules, search, registration validation, JSON imports, duplicate detection, protected collections, result invariants, and creation failures that leave state unchanged.
