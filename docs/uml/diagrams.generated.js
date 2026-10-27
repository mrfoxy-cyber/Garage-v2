globalThis.GARAGE_UML_DATA = {
  "version": 2,
  "diagrams": [
    {
      "id": "garage-classes",
      "type": "class",
      "title": "Garage classes",
      "maintenance": "generated",
      "status": "active",
      "related": [
        "garage-components",
        "garage-packages"
      ],
      "source": "structural/class/garage-classes.puml",
      "svg": "structural/class/garage-classes.svg"
    },
    {
      "id": "vehicle-classes",
      "type": "class",
      "title": "Vehicle classes",
      "maintenance": "generated",
      "status": "active",
      "related": [
        "garage-components",
        "garage-packages"
      ],
      "source": "structural/class/vehicle-classes.puml",
      "svg": "structural/class/vehicle-classes.svg"
    },
    {
      "id": "garage-console-classes",
      "type": "class",
      "title": "Garage.Console classes",
      "maintenance": "generated",
      "status": "active",
      "related": [
        "garage-components",
        "garage-packages"
      ],
      "source": "structural/class/garage-console-classes.puml",
      "svg": "structural/class/garage-console-classes.svg"
    },
    {
      "id": "garage-terminal-classes",
      "type": "class",
      "title": "Garage.Terminal classes",
      "maintenance": "generated",
      "status": "active",
      "related": [
        "garage-components",
        "garage-packages"
      ],
      "source": "structural/class/garage-terminal-classes.puml",
      "svg": "structural/class/garage-terminal-classes.svg"
    },
    {
      "id": "garage-tests-classes",
      "type": "class",
      "title": "Garage.Tests classes",
      "maintenance": "generated",
      "status": "active",
      "related": [
        "garage-components",
        "garage-packages"
      ],
      "source": "structural/class/garage-tests-classes.puml",
      "svg": "structural/class/garage-tests-classes.svg"
    },
    {
      "id": "garage-components",
      "type": "component",
      "title": "Garage project components",
      "maintenance": "generated",
      "status": "active",
      "related": [
        "garage-packages",
        "garage-classes",
        "vehicle-classes",
        "garage-console-classes",
        "garage-terminal-classes",
        "garage-tests-classes",
        "parking-sequence",
        "local-deployment"
      ],
      "source": "structural/component/garage-components.puml",
      "svg": "structural/component/garage-components.svg"
    },
    {
      "id": "garage-packages",
      "type": "package",
      "title": "Garage projects and namespaces",
      "maintenance": "generated",
      "status": "active",
      "related": [
        "garage-components"
      ],
      "source": "structural/package/garage-packages.puml",
      "svg": "structural/package/garage-packages.svg"
    },
    {
      "id": "parking-sequence",
      "type": "sequence",
      "title": "Park an existing catalog vehicle",
      "maintenance": "reviewed",
      "status": "active",
      "related": [
        "garage-components",
        "garage-classes",
        "parking-activity",
        "parking-spot-state"
      ],
      "source": "interaction/sequence/parking-sequence.puml",
      "svg": "interaction/sequence/parking-sequence.svg"
    },
    {
      "id": "parking-activity",
      "type": "activity",
      "title": "Parking validation and assignment",
      "maintenance": "reviewed",
      "status": "active",
      "related": [
        "parking-sequence",
        "parking-spot-state"
      ],
      "source": "behavioral/activity/parking-activity.puml",
      "svg": "behavioral/activity/parking-activity.svg"
    },
    {
      "id": "parking-spot-state",
      "type": "state-machine",
      "title": "Parking spot occupancy",
      "maintenance": "reviewed",
      "status": "active",
      "related": [
        "parking-sequence",
        "parking-activity"
      ],
      "source": "behavioral/state-machine/parking-spot-state.puml",
      "svg": "behavioral/state-machine/parking-spot-state.svg"
    },
    {
      "id": "local-deployment",
      "type": "deployment",
      "title": "Local Garage runtime",
      "maintenance": "reviewed",
      "status": "active",
      "related": [
        "garage-components",
        "garage-use-cases"
      ],
      "source": "structural/deployment/local-deployment.puml",
      "svg": "structural/deployment/local-deployment.svg"
    },
    {
      "id": "garage-use-cases",
      "type": "use-case",
      "title": "Garage user capabilities",
      "maintenance": "reviewed",
      "status": "active",
      "related": [
        "garage-components",
        "parking-sequence"
      ],
      "source": "behavioral/use-case/garage-use-cases.puml",
      "svg": "behavioral/use-case/garage-use-cases.svg"
    },
    {
      "id": "garage-object",
      "type": "object",
      "title": "Template: object",
      "maintenance": "manual",
      "status": "template",
      "related": [
        "garage-classes"
      ],
      "source": "structural/object/garage-object.puml",
      "svg": "structural/object/garage-object.svg"
    },
    {
      "id": "garage-composite",
      "type": "composite-structure",
      "title": "Template: composite-structure",
      "maintenance": "manual",
      "status": "template",
      "related": [
        "garage-components"
      ],
      "source": "structural/composite-structure/garage-composite.puml",
      "svg": "structural/composite-structure/garage-composite.svg"
    },
    {
      "id": "garage-profile",
      "type": "profile",
      "title": "Template: profile",
      "maintenance": "manual",
      "status": "template",
      "related": [
        "garage-components"
      ],
      "source": "structural/profile/garage-profile.puml",
      "svg": "structural/profile/garage-profile.svg"
    },
    {
      "id": "parking-communication",
      "type": "communication",
      "title": "Template: communication",
      "maintenance": "manual",
      "status": "template",
      "related": [
        "parking-sequence"
      ],
      "source": "interaction/communication/parking-communication.puml",
      "svg": "interaction/communication/parking-communication.svg"
    },
    {
      "id": "parking-interaction-overview",
      "type": "interaction-overview",
      "title": "Template: interaction-overview",
      "maintenance": "manual",
      "status": "template",
      "related": [
        "parking-sequence"
      ],
      "source": "interaction/interaction-overview/parking-interaction-overview.puml",
      "svg": "interaction/interaction-overview/parking-interaction-overview.svg"
    },
    {
      "id": "parking-timing",
      "type": "timing",
      "title": "Template: timing",
      "maintenance": "manual",
      "status": "template",
      "related": [
        "parking-spot-state"
      ],
      "source": "interaction/timing/parking-timing.puml",
      "svg": "interaction/timing/parking-timing.svg"
    }
  ],
  "views": {
    "garage-classes": {
      "id": "garage-classes",
      "title": "Garage classes",
      "type": "class",
      "nodes": [
        {
          "id": "type:Garage/Garage.csproj:Garage.Diagnostics.ErrorLogger",
          "name": "ErrorLogger",
          "kind": "class",
          "group": "Garage.Diagnostics",
          "members": [
            "private const int LabelWidth",
            "private static string LogField(string label, object? value)",
            "public static bool TryLog(Exception exception, string? operation = null, object? relatedObject = null)"
          ],
          "files": [
            "Garage/Diagnostics/ErrorLogger.cs"
          ],
          "declaration": "public static class ErrorLogger",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Models.Garage",
          "name": "Garage",
          "kind": "class",
          "group": "Garage.Models",
          "members": [
            "private Garage(string garageName, int capacity, List\u003CVehicle\u003E initialVehicles, IReadOnlyList\u003CDimensions\u003E? spotDimensions)",
            "private bool RegistrationExists(string registrationNumber)",
            "private readonly List\u003CParkingSpot\u003E parkingSpots",
            "private static ParkingResult DuplicateRegistration(Vehicle vehicle)",
            "public Garage(string garageName, IReadOnlyList\u003CDimensions\u003E spotDimensions, List\u003CVehicle\u003E? initialVehicles = null)",
            "public Garage(string garageName, List\u003CVehicle\u003E vehicles)",
            "public Garage(string garageName, int capacity)",
            "public Garage(string garageName, int capacity, List\u003CVehicle\u003E initialVehicles)",
            "public GarageOperationResult Remove(string registrationNumber)",
            "public GarageOperationResult RemoveAtSpot(int spotNumber)",
            "public IReadOnlyList\u003CParkedVehicleInfo\u003E ParkedVehicles { get; }",
            "public IReadOnlyList\u003CParkingSpotInfo\u003E SpotDetails { get; }",
            "public IReadOnlyList\u003CVehicle\u003E Search(VehicleSearchCriteria criteria)",
            "public IReadOnlyList\u003CVehicle\u003E Vehicles { get; }",
            "public IReadOnlyList\u003CVehicleTypeGroup\u003E VehiclesByType { get; }",
            "public IReadOnlyList\u003Cint\u003E AvailableSpotsFor(Vehicle vehicle)",
            "public ParkedVehicleInfo? FindVehicleByRegistration(string registrationNumber)",
            "public ParkingResult Park(Vehicle vehicle)",
            "public ParkingResult Park(Vehicle vehicle, int spot)",
            "public const int MaximumGarageCapacity",
            "public int AvailableSpaces { get; }",
            "public int Capacity {  get; }",
            "public int OccupiedSpaces { get; }",
            "public string GarageName {  get; }"
          ],
          "files": [
            "Garage/Models/Garage.cs"
          ],
          "declaration": "public sealed class Garage",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Models.ParkingSpot",
          "name": "ParkingSpot",
          "kind": "class",
          "group": "Garage.Models",
          "members": [
            "public Dimensions? Dimensions {  get; }",
            "public ParkingSpot(int number, Dimensions? dimensions)",
            "public Vehicle? Vehicle {  get; private set; }",
            "public bool Fits(Vehicle vehicle)",
            "public int Number {  get; }",
            "public void Clear()",
            "public void Park(Vehicle vehicle)"
          ],
          "files": [
            "Garage/Models/ParkingSpot.cs"
          ],
          "declaration": "internal sealed class ParkingSpot",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Models.VehicleCatalog",
          "name": "VehicleCatalog",
          "kind": "class",
          "group": "Garage.Models",
          "members": [
            "internal void Add(Vehicle vehicle)",
            "private readonly List\u003CVehicle\u003E vehicles",
            "public IReadOnlyList\u003CVehicle\u003E Vehicles { get; }",
            "public VehicleCatalog(List\u003CVehicle\u003E? initialVehicles = null)",
            "public bool ContainsRegistration(string registrationNumber)"
          ],
          "files": [
            "Garage/Models/VehicleCatalog.cs"
          ],
          "declaration": "public sealed class VehicleCatalog",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Persistence.Json.Contracts.EngineJsonContract",
          "name": "EngineJsonContract",
          "kind": "class",
          "group": "Garage.Persistence.Json.Contracts",
          "members": [
            "public FuelType? FuelType {  get;  init; }",
            "public double? BoilerPressureBar {  get;  init; }",
            "public double? BypassRatio {  get;  init; }",
            "public double? PowerKw {  get;  init; }",
            "public double? ThrustKn {  get;  init; }",
            "public double? Voltage {  get;  init; }",
            "public int? CylinderCount {  get;  init; }",
            "public int? DisplacementCc {  get;  init; }",
            "public int? HorsePower {  get;  init; }",
            "public int? RotorCount {  get;  init; }",
            "public int? ShaftHorsePower {  get;  init; }",
            "public required string Model {  get;  init; }",
            "public required string SerialNumber {  get;  init; }",
            "public required string Type {  get;  init; }"
          ],
          "files": [
            "Garage/Persistence/Json/Contracts/EngineJsonContract.cs"
          ],
          "declaration": "internal sealed class EngineJsonContract",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Persistence.Json.Contracts.VehicleJsonContract",
          "name": "VehicleJsonContract",
          "kind": "class",
          "group": "Garage.Persistence.Json.Contracts",
          "members": [
            "public BoatType? BoatType {  get;  init; }",
            "public BodyType? BodyType {  get;  init; }",
            "public List\u003CEngineJsonContract\u003E Engines {  get;  init; }",
            "public MotorcycleType? MotorcycleType {  get;  init; }",
            "public bool? HasCabin {  get;  init; }",
            "public bool? HasDualControls {  get;  init; }",
            "public bool? HasSidecar {  get;  init; }",
            "public double? DraftMeters {  get;  init; }",
            "public double? MaximumAltitudeMeters {  get;  init; }",
            "public double? MaximumLoadKg {  get;  init; }",
            "public double? WingspanMeters {  get;  init; }",
            "public int? CabinCrewSeatCount {  get;  init; }",
            "public int? CabinPassengerSeatCount {  get;  init; }",
            "public int? CrewSeatCount {  get;  init; }",
            "public int? DriverSeatCount {  get;  init; }",
            "public int? DriverSeats {  get;  init; }",
            "public int? NumberOfAxles {  get;  init; }",
            "public int? NumberOfDoors {  get;  init; }",
            "public int? NumberOfSeats {  get;  init; }",
            "public int? NumberOfWheels {  get;  init; }",
            "public int? PassengerCapacity {  get;  init; }",
            "public int? PassengerSeatCount {  get;  init; }",
            "public int? PilotSeatCount {  get;  init; }",
            "public int? StandingPassengerCapacity {  get;  init; }",
            "public required CountryCode CountryCode {  get;  init; }",
            "public required VehicleColor Color {  get;  init; }",
            "public required double HeightMeters {  get;  init; }",
            "public required double LengthMeters {  get;  init; }",
            "public required double WeightKg {  get;  init; }",
            "public required double WidthMeters {  get;  init; }",
            "public required int ManufacturingYear {  get;  init; }",
            "public required string Manufacturer {  get;  init; }",
            "public required string Model {  get;  init; }",
            "public required string RegistrationNumber {  get;  init; }",
            "public required string Type {  get;  init; }",
            "public string? AirframeSerialNumber {  get;  init; }",
            "public string? Hin {  get;  init; }",
            "public string? Vin {  get;  init; }"
          ],
          "files": [
            "Garage/Persistence/Json/Contracts/VehicleJsonContract.cs"
          ],
          "declaration": "internal sealed class VehicleJsonContract",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Persistence.Json.GarageJsonLoader",
          "name": "GarageJsonLoader",
          "kind": "class",
          "group": "Garage.Persistence.Json",
          "members": [
            "private static Dimensions ToDimensions(SpotSizeSpecification size, string location)",
            "private static GaragePlacementSpecification ReadPlacementSpecification(string path)",
            "private static GarageSpecification ReadGarageSpecification(string path)",
            "private static string ReadJson(string path)",
            "private static void ApplyPlacements(VehicleGarage garage, string placementPath)",
            "public static VehicleGarage Load(string configurationPath, string? placementPath = null)"
          ],
          "files": [
            "Garage/Persistence/Json/GarageJsonLoader.cs"
          ],
          "declaration": "public static class GarageJsonLoader",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Persistence.Json.JsonSettings",
          "name": "JsonSettings",
          "kind": "class",
          "group": "Garage.Persistence.Json",
          "members": [
            "private static JsonSerializerOptions Create()",
            "public static JsonSerializerOptions Options {  get; }"
          ],
          "files": [
            "Garage/Persistence/Json/JsonSettings.cs"
          ],
          "declaration": "internal static class JsonSettings",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Persistence.Json.VehicleJsonLoader",
          "name": "VehicleJsonLoader",
          "kind": "class",
          "group": "Garage.Persistence.Json",
          "members": [
            "public static List\u003CVehicle\u003E LoadVehicles(string? filePath = null)",
            "public static Vehicle LoadVehicle(string filePath)"
          ],
          "files": [
            "Garage/Persistence/Json/VehicleJsonLoader.cs"
          ],
          "declaration": "public static class VehicleJsonLoader",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Persistence.Json.VehicleJsonMapper",
          "name": "VehicleJsonMapper",
          "kind": "class",
          "group": "Garage.Persistence.Json",
          "members": [
            "private static Airplane CreateAirplane(VehicleJsonContract seed)",
            "private static Boat CreateBoat(VehicleJsonContract seed)",
            "private static BoatType Require(BoatType? value, VehicleJsonContract seed, string propertyName)",
            "private static BodyType Require(BodyType? value, VehicleJsonContract seed, string propertyName)",
            "private static Bus CreateBus(VehicleJsonContract seed)",
            "private static Car CreateCar(VehicleJsonContract seed)",
            "private static Engine CreateEngine(EngineJsonContract seed)",
            "private static FuelType Require(FuelType? value, EngineJsonContract seed, string propertyName)",
            "private static InvalidDataException MissingProperty(VehicleJsonContract seed, string propertyName)",
            "private static List\u003CEngine\u003E CreateEngines(VehicleJsonContract vehicle)",
            "private static Motorcycle CreateMotorcycle(VehicleJsonContract seed)",
            "private static MotorcycleType Require(MotorcycleType? value, VehicleJsonContract seed, string propertyName)",
            "private static Truck CreateTruck(VehicleJsonContract seed)",
            "private static bool Require(bool? value, VehicleJsonContract seed, string propertyName)",
            "private static double Require(double? value, EngineJsonContract seed, string propertyName)",
            "private static double Require(double? value, VehicleJsonContract seed, string propertyName)",
            "private static int Require(int? value, EngineJsonContract seed, string propertyName)",
            "private static int Require(int? value, VehicleJsonContract seed, string propertyName)",
            "private static string Require(string? value, EngineJsonContract seed, string propertyName)",
            "private static string Require(string? value, VehicleJsonContract seed, string propertyName)",
            "public static Vehicle Create(VehicleJsonContract seed)"
          ],
          "files": [
            "Garage/Persistence/Json/VehicleJsonMapper.cs"
          ],
          "declaration": "internal static class VehicleJsonMapper",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Queries.ParkedVehicleInfo",
          "name": "ParkedVehicleInfo",
          "kind": "record",
          "group": "Garage.Queries",
          "members": [
            "primary constructor ParkedVehicleInfo(int SpotNumber, Vehicle Vehicle)"
          ],
          "files": [
            "Garage/Queries/ParkedVehicleInfo.cs"
          ],
          "declaration": "public sealed record ParkedVehicleInfo(int SpotNumber, Vehicle Vehicle)",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Queries.ParkingSpotInfo",
          "name": "ParkingSpotInfo",
          "kind": "record",
          "group": "Garage.Queries",
          "members": [
            "primary constructor ParkingSpotInfo(int SpotNumber, Dimensions? Dimensions, bool IsOccupied)"
          ],
          "files": [
            "Garage/Queries/ParkingSpotInfo.cs"
          ],
          "declaration": "public sealed record ParkingSpotInfo(int SpotNumber, Dimensions? Dimensions, bool IsOccupied)",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Queries.VehicleSearch",
          "name": "VehicleSearch",
          "kind": "class",
          "group": "Garage.Queries",
          "members": [
            "private static bool MatchesMeasurement(double actual, double expected)",
            "public static bool Matches(Vehicle vehicle, VehicleSearchCriteria criteria)"
          ],
          "files": [
            "Garage/Queries/VehicleSearch.cs"
          ],
          "declaration": "internal static class VehicleSearch",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Queries.VehicleSearchCriteria",
          "name": "VehicleSearchCriteria",
          "kind": "class",
          "group": "Garage.Queries",
          "members": [
            "public BoatType? BoatType {  get;  init; }",
            "public BodyType? BodyType {  get;  init; }",
            "public Garage.Engines.FuelType? FuelType {  get;  init; }",
            "public IReadOnlyList\u003CType\u003E VehicleTypes {  get;  init; }",
            "public MotorcycleType? MotorcycleType {  get;  init; }",
            "public VehicleColor? Color {  get;  init; }",
            "public bool? HasSidecar {  get;  init; }",
            "public double? CylinderVolumeCc {  get;  init; }",
            "public double? DraftMeters {  get;  init; }",
            "public double? LengthMeters {  get;  init; }",
            "public double? MaximumAltitudeMeters {  get;  init; }",
            "public double? MaximumLoadKg {  get;  init; }",
            "public double? WingspanMeters {  get;  init; }",
            "public int? ManufacturingYear {  get;  init; }",
            "public int? NumberOfAxles {  get;  init; }",
            "public int? NumberOfEngines {  get;  init; }",
            "public int? NumberOfSeats {  get;  init; }",
            "public int? NumberOfWheels {  get;  init; }",
            "public int? StandingPassengerCapacity {  get;  init; }",
            "public string? Manufacturer {  get;  init; }",
            "public string? Model {  get;  init; }",
            "public string? RegistrationNumber {  get;  init; }"
          ],
          "files": [
            "Garage/Queries/VehicleSearchCriteria.cs"
          ],
          "declaration": "public sealed class VehicleSearchCriteria",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Queries.VehicleTypeGroup",
          "name": "VehicleTypeGroup",
          "kind": "record",
          "group": "Garage.Queries",
          "members": [
            "primary constructor VehicleTypeGroup(string VehicleType, IReadOnlyList\u003CParkedVehicleInfo\u003E Vehicles)"
          ],
          "files": [
            "Garage/Queries/VehicleTypeGroup.cs"
          ],
          "declaration": "public sealed record VehicleTypeGroup(string VehicleType, IReadOnlyList\u003CParkedVehicleInfo\u003E Vehicles)",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Results.GarageCreationResult",
          "name": "GarageCreationResult",
          "kind": "record",
          "group": "Garage.Results",
          "members": [
            "private GarageCreationResult(VehicleGarage? garage, string message, OperationError error)",
            "public OperationError Error {  get; }",
            "public VehicleGarage? Garage {  get; }",
            "public bool Success { get; }",
            "public static GarageCreationResult Completed(VehicleGarage garage)",
            "public static GarageCreationResult Failed(string message, OperationError error = OperationError.ValidationFailed)",
            "public string Message {  get; }"
          ],
          "files": [
            "Garage/Results/GarageCreationResult.cs"
          ],
          "declaration": "public sealed record GarageCreationResult",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Results.GarageOperationResult",
          "name": "GarageOperationResult",
          "kind": "record",
          "group": "Garage.Results",
          "members": [
            "private GarageOperationResult(int? spotNumber, string message, OperationError error)",
            "public OperationError Error {  get; }",
            "public bool Success { get; }",
            "public int? SpotNumber {  get; }",
            "public static GarageOperationResult Completed(int spotNumber, string message)",
            "public static GarageOperationResult Failed(string message, OperationError error)",
            "public string Message {  get; }"
          ],
          "files": [
            "Garage/Results/GarageOperationResult.cs"
          ],
          "declaration": "public sealed record GarageOperationResult",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Results.OperationError",
          "name": "OperationError",
          "kind": "enum",
          "group": "Garage.Results",
          "members": [
            "Cancelled",
            "DuplicateGarageName",
            "DuplicateRegistration",
            "FileAccessDenied",
            "FileNotFound",
            "FileReadFailed",
            "GarageFull",
            "InvalidJson",
            "None",
            "SpotEmpty",
            "SpotOccupied",
            "SpotOutOfRange",
            "UnsupportedOperation",
            "ValidationFailed",
            "VehicleAlreadyParked",
            "VehicleDoesNotFit",
            "VehicleNotFound"
          ],
          "files": [
            "Garage/Results/OperationError.cs"
          ],
          "declaration": "public enum OperationError",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Results.ParkingResult",
          "name": "ParkingResult",
          "kind": "record",
          "group": "Garage.Results",
          "members": [
            "private ParkingResult(int? spotNumber, string message, OperationError error)",
            "public OperationError Error {  get; }",
            "public bool Success { get; }",
            "public int? SpotNumber {  get; }",
            "public static ParkingResult Completed(int spotNumber, string message)",
            "public static ParkingResult Failed(string message, OperationError error)",
            "public string Message {  get; }"
          ],
          "files": [
            "Garage/Results/ParkingResult.cs"
          ],
          "declaration": "public sealed record ParkingResult",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Results.VehicleCreationResult",
          "name": "VehicleCreationResult",
          "kind": "record",
          "group": "Garage.Results",
          "members": [
            "private VehicleCreationResult(Vehicle? vehicle, string message, OperationError error, ParkingResult? parking = null)",
            "public OperationError Error {  get; }",
            "public ParkingResult? Parking {  get; }",
            "public Vehicle? Vehicle {  get; }",
            "public bool Cancelled { get; }",
            "public bool Success { get; }",
            "public static VehicleCreationResult Cancel()",
            "public static VehicleCreationResult Completed(Vehicle vehicle, ParkingResult? parking = null, string? message = null)",
            "public static VehicleCreationResult Failed(string message, OperationError error = OperationError.ValidationFailed)",
            "public string Message {  get; }"
          ],
          "files": [
            "Garage/Results/VehicleCreationResult.cs"
          ],
          "declaration": "public sealed record VehicleCreationResult",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Services.ExpectedFailure",
          "name": "ExpectedFailure",
          "kind": "class",
          "group": "Garage.Services",
          "members": [
            "public static OperationError Code(Exception exception)",
            "public static bool IsExpected(Exception exception)"
          ],
          "files": [
            "Garage/Services/ExpectedFailure.cs"
          ],
          "declaration": "internal static class ExpectedFailure",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Services.GarageService",
          "name": "GarageService",
          "kind": "class",
          "group": "Garage.Services",
          "members": [
            "private GarageCreationResult CreateAndRegister(Func\u003CVehicleGarage\u003E factory)",
            "private GarageCreationResult RegisterGarage(VehicleGarage garage)",
            "private ParkingResult ParkNewVehicle(Vehicle vehicle, VehicleGarage garage, int? spotNumber)",
            "private readonly List\u003CVehicleGarage\u003E garages",
            "public GarageCreationResult CreateGarage(string name, IReadOnlyList\u003CDimensions\u003E sizes)",
            "public GarageCreationResult CreateGarage(string name, int capacity)",
            "public GarageCreationResult CreateGarageFromJson(string configurationPath, string? placementPath = null)",
            "public GarageService(List\u003CVehicleGarage\u003E initialGarages, List\u003CVehicle\u003E initialVehicles)",
            "public IReadOnlyList\u003CVehicle\u003E GetParkableVehicles(VehicleGarage garage, int? spotNumber = null)",
            "public IReadOnlyList\u003CVehicleGarage\u003E Garages { get; }",
            "public ParkingResult Park(Vehicle vehicle, VehicleGarage garage, int? spotNumber = null)",
            "public VehicleCatalog Catalog {  get; }",
            "public VehicleCreationService VehicleCreation {  get; }",
            "public bool ContainsGarage(string name)",
            "public bool IsParked(Vehicle vehicle)"
          ],
          "files": [
            "Garage/Services/GarageService.cs"
          ],
          "declaration": "public sealed class GarageService",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Services.VehicleCreationService",
          "name": "VehicleCreationService",
          "kind": "class",
          "group": "Garage.Services",
          "members": [
            "internal VehicleCreationService(VehicleCatalog catalog, Func\u003CVehicle, VehicleGarage, int?, ParkingResult\u003E park)",
            "private readonly Func\u003CVehicle, VehicleGarage, int?, ParkingResult\u003E park",
            "private readonly VehicleCatalog catalog",
            "public VehicleCreationResult Create(Func\u003CVehicle\u003E factory, VehicleGarage? targetGarage = null, int? spotNumber = null)",
            "public VehicleCreationResult FromJson(string path, VehicleGarage? targetGarage = null, int? spotNumber = null)"
          ],
          "files": [
            "Garage/Services/VehicleCreationService.cs"
          ],
          "declaration": "public sealed class VehicleCreationService",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Specifications.GaragePlacementSpecification",
          "name": "GaragePlacementSpecification",
          "kind": "record",
          "group": "Garage.Specifications",
          "members": [
            "public IReadOnlyList\u003CSpotAssignment\u003E? Assignments {  get;  init; }",
            "public string? GarageName {  get;  init; }",
            "public string? VehiclesFile {  get;  init; }"
          ],
          "files": [
            "Garage/Specifications/GaragePlacementSpecification.cs"
          ],
          "declaration": "public sealed record GaragePlacementSpecification",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Specifications.GarageSpecification",
          "name": "GarageSpecification",
          "kind": "record",
          "group": "Garage.Specifications",
          "members": [
            "public IReadOnlyList\u003CSpotSpecification\u003E? Spots {  get;  init; }",
            "public SpotSizeSpecification? DefaultSpotSize {  get;  init; }",
            "public int Capacity {  get;  init; }",
            "public string? GarageName {  get;  init; }"
          ],
          "files": [
            "Garage/Specifications/GarageSpecification.cs"
          ],
          "declaration": "public sealed record GarageSpecification",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Specifications.SpotAssignment",
          "name": "SpotAssignment",
          "kind": "record",
          "group": "Garage.Specifications",
          "members": [
            "public int SpotNumber {  get;  init; }",
            "public string? RegistrationNumber {  get;  init; }"
          ],
          "files": [
            "Garage/Specifications/SpotAssignment.cs"
          ],
          "declaration": "public sealed record SpotAssignment",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Specifications.SpotSizeSpecification",
          "name": "SpotSizeSpecification",
          "kind": "record",
          "group": "Garage.Specifications",
          "members": [
            "public double HeightMeters {  get;  init; }",
            "public double LengthMeters {  get;  init; }",
            "public double WidthMeters {  get;  init; }"
          ],
          "files": [
            "Garage/Specifications/SpotSizeSpecification.cs"
          ],
          "declaration": "public sealed record SpotSizeSpecification",
          "bases": []
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Specifications.SpotSpecification",
          "name": "SpotSpecification",
          "kind": "record",
          "group": "Garage.Specifications",
          "members": [
            "public SpotSizeSpecification? Size {  get;  init; }",
            "public int SpotNumber {  get;  init; }"
          ],
          "files": [
            "Garage/Specifications/SpotSpecification.cs"
          ],
          "declaration": "public sealed record SpotSpecification",
          "bases": []
        }
      ],
      "edges": []
    },
    "garage-components": {
      "id": "garage-components",
      "title": "Garage project components",
      "type": "component",
      "nodes": [
        {
          "id": "project:Garage.Console/Garage.Console.csproj",
          "name": "Garage.Console",
          "kind": "component",
          "group": "",
          "members": [],
          "files": [
            "Garage.Console/Garage.Console.csproj"
          ],
          "declaration": "Project Garage.Console/Garage.Console.csproj",
          "bases": []
        },
        {
          "id": "project:Garage.Terminal/Garage.Terminal.csproj",
          "name": "Garage.Terminal",
          "kind": "component",
          "group": "",
          "members": [],
          "files": [
            "Garage.Terminal/Garage.Terminal.csproj"
          ],
          "declaration": "Project Garage.Terminal/Garage.Terminal.csproj",
          "bases": []
        },
        {
          "id": "project:Garage.Tests/Garage.Tests.csproj",
          "name": "Garage.Tests",
          "kind": "component",
          "group": "",
          "members": [],
          "files": [
            "Garage.Tests/Garage.Tests.csproj"
          ],
          "declaration": "Project Garage.Tests/Garage.Tests.csproj",
          "bases": []
        },
        {
          "id": "project:Garage/Garage.csproj",
          "name": "Garage",
          "kind": "component",
          "group": "",
          "members": [],
          "files": [
            "Garage/Garage.csproj"
          ],
          "declaration": "Project Garage/Garage.csproj",
          "bases": []
        },
        {
          "id": "project:Vehicle/Vehicle.csproj",
          "name": "Vehicle",
          "kind": "component",
          "group": "",
          "members": [],
          "files": [
            "Vehicle/Vehicle.csproj"
          ],
          "declaration": "Project Vehicle/Vehicle.csproj",
          "bases": []
        }
      ],
      "edges": [
        {
          "id": "edge:38f6367f27bdefe266a27fe6bdb9c2327ba3422f7bf6233e5d87b3d465d39d99",
          "source": "project:Garage/Garage.csproj",
          "target": "project:Vehicle/Vehicle.csproj",
          "kind": "reference",
          "label": "references"
        },
        {
          "id": "edge:416844e7648592bb64920579ef2666d78f34b297ec354653927c1b1cfab9f133",
          "source": "project:Garage.Tests/Garage.Tests.csproj",
          "target": "project:Garage.Terminal/Garage.Terminal.csproj",
          "kind": "reference",
          "label": "references"
        },
        {
          "id": "edge:4f9aeaac36174524816bbeaf8c7cd8856db5a78476ffc2a7e1c425670b8ef2bc",
          "source": "project:Garage.Tests/Garage.Tests.csproj",
          "target": "project:Garage/Garage.csproj",
          "kind": "reference",
          "label": "references"
        },
        {
          "id": "edge:79c77fce3ceec87f13682313be995a3f3fa3dd4c512dadb0cfbfb127b146d91c",
          "source": "project:Garage.Tests/Garage.Tests.csproj",
          "target": "project:Garage.Console/Garage.Console.csproj",
          "kind": "reference",
          "label": "references"
        },
        {
          "id": "edge:7fd3478d36902ea4238765d3fd1036a0c5cae099a38c96dde29dc7eba8e22ed2",
          "source": "project:Garage.Console/Garage.Console.csproj",
          "target": "project:Garage/Garage.csproj",
          "kind": "reference",
          "label": "references"
        },
        {
          "id": "edge:a73e473c35839c363db01cd43a7097864b5cbbbafb1e6a3387c95e86af352389",
          "source": "project:Garage.Tests/Garage.Tests.csproj",
          "target": "project:Vehicle/Vehicle.csproj",
          "kind": "reference",
          "label": "references"
        },
        {
          "id": "edge:c386f9d8aecc389821cb62dc18099c2f7ab529fd16294e1af817bf15b5092648",
          "source": "project:Garage.Terminal/Garage.Terminal.csproj",
          "target": "project:Garage/Garage.csproj",
          "kind": "reference",
          "label": "references"
        }
      ]
    },
    "garage-console-classes": {
      "id": "garage-console-classes",
      "title": "Garage.Console classes",
      "type": "class",
      "nodes": [
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Display.ConsoleScreen",
          "name": "ConsoleScreen",
          "kind": "class",
          "group": "Garage.ConsoleApp.Display",
          "members": [
            "public static void Clear()"
          ],
          "files": [
            "Garage.Console/Display/ConsoleScreen.cs"
          ],
          "declaration": "internal static class ConsoleScreen",
          "bases": []
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Display.EngineDisplay",
          "name": "EngineDisplay",
          "kind": "class",
          "group": "Garage.ConsoleApp.Display",
          "members": [
            "public static void PrintEngine(Engine engine)"
          ],
          "files": [
            "Garage.Console/Display/EngineDisplay.cs"
          ],
          "declaration": "internal static class EngineDisplay",
          "bases": []
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Display.VehicleDisplay",
          "name": "VehicleDisplay",
          "kind": "class",
          "group": "Garage.ConsoleApp.Display",
          "members": [
            "public static void PrintVehicle(int spotNumber, Vehicle vehicle)"
          ],
          "files": [
            "Garage.Console/Display/VehicleDisplay.cs"
          ],
          "declaration": "internal static class VehicleDisplay",
          "bases": []
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.AirplaneDraft",
          "name": "AirplaneDraft",
          "kind": "class",
          "group": "Garage.ConsoleApp.Drafts",
          "members": [
            "public bool? HasDualControls {  get;  set; }",
            "public double? MaximumAltitudeMeters {  get;  set; }",
            "public double? WingspanMeters {  get;  set; }",
            "public int? CrewSeats {  get;  set; }",
            "public int? NumberOfWheels {  get;  set; }",
            "public int? PassengerSeats {  get;  set; }",
            "public int? PilotSeats {  get;  set; }",
            "public override List\u003Cstring\u003E GetMissingFields()",
            "public override void Clear()",
            "public string? AirframeSerialNumber {  get;  set; }"
          ],
          "files": [
            "Garage.Console/Drafts/AirplaneDraft.cs"
          ],
          "declaration": "internal sealed class AirplaneDraft",
          "bases": [
            "VehicleDraft"
          ]
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.BoatDraft",
          "name": "BoatDraft",
          "kind": "class",
          "group": "Garage.ConsoleApp.Drafts",
          "members": [
            "public BoatType? BoatType {  get;  set; }",
            "public bool? HasCabin {  get;  set; }",
            "public double? DraftMeters {  get;  set; }",
            "public int? CabinCrewSeats {  get;  set; }",
            "public int? CabinPassengerSeats {  get;  set; }",
            "public int? DriverSeats {  get;  set; }",
            "public int? PassengerCapacity {  get;  set; }",
            "public override List\u003Cstring\u003E GetMissingFields()",
            "public override void Clear()",
            "public string? Hin {  get;  set; }"
          ],
          "files": [
            "Garage.Console/Drafts/BoatDraft.cs"
          ],
          "declaration": "internal sealed class BoatDraft",
          "bases": [
            "VehicleDraft"
          ]
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.BusDraft",
          "name": "BusDraft",
          "kind": "class",
          "group": "Garage.ConsoleApp.Drafts",
          "members": [
            "public int? DriverSeats {  get;  set; }",
            "public int? NumberOfDoors {  get;  set; }",
            "public int? NumberOfWheels {  get;  set; }",
            "public int? PassengerSeats {  get;  set; }",
            "public int? StandingPassengerCapacity {  get;  set; }",
            "public override List\u003Cstring\u003E GetMissingFields()",
            "public override void Clear()",
            "public string? Vin {  get;  set; }"
          ],
          "files": [
            "Garage.Console/Drafts/BusDraft.cs"
          ],
          "declaration": "internal sealed class BusDraft",
          "bases": [
            "VehicleDraft"
          ]
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.CarDraft",
          "name": "CarDraft",
          "kind": "class",
          "group": "Garage.ConsoleApp.Drafts",
          "members": [
            "public BodyType? BodyType {  get;  set; }",
            "public int? NumberOfDoors {  get;  set; }",
            "public int? NumberOfSeats {  get;  set; }",
            "public override List\u003Cstring\u003E GetMissingFields()",
            "public override void Clear()",
            "public string BodyTypeText { get; }",
            "public string DoorsText { get; }",
            "public string SeatsText { get; }",
            "public string VinText { get; }",
            "public string? Vin {  get;  set; }"
          ],
          "files": [
            "Garage.Console/Drafts/CarDraft.cs"
          ],
          "declaration": "internal sealed class CarDraft",
          "bases": [
            "VehicleDraft"
          ]
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.EngineCreatorResult",
          "name": "EngineCreatorResult",
          "kind": "record",
          "group": "Garage.ConsoleApp.Drafts",
          "members": [
            "primary constructor EngineCreatorResult(bool Success, bool Cancelled, List\u003CEngine\u003E Engines, string Message)",
            "public static EngineCreatorResult Cancel()",
            "public static EngineCreatorResult Completed(List\u003CEngine\u003E engines)",
            "public static EngineCreatorResult Failed(string message)"
          ],
          "files": [
            "Garage.Console/Drafts/EngineCreatorResult.cs"
          ],
          "declaration": "internal sealed record EngineCreatorResult(bool Success, bool Cancelled, List\u003CEngine\u003E Engines, string Message)",
          "bases": []
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.EngineDraft",
          "name": "EngineDraft",
          "kind": "class",
          "group": "Garage.ConsoleApp.Drafts",
          "members": [
            "private static void AddMissingField(List\u003Cstring\u003E missing, string fieldName)",
            "private void RequireDisplacement(List\u003Cstring\u003E missing)",
            "private void RequireFuel(List\u003Cstring\u003E missing)",
            "private void RequireHorsePower(List\u003Cstring\u003E missing)",
            "private void RequireTurbineFields(List\u003Cstring\u003E missing)",
            "public EngineKind? Kind {  get;  set; }",
            "public FuelType? FuelType {  get;  set; }",
            "public List\u003Cstring\u003E GetMissingFields()",
            "public double? BoilerPressureBar {  get;  set; }",
            "public double? BypassRatio {  get;  set; }",
            "public double? PowerKw {  get;  set; }",
            "public double? ThrustKn {  get;  set; }",
            "public double? Voltage {  get;  set; }",
            "public int? CylinderCount {  get;  set; }",
            "public int? DisplacementCc {  get;  set; }",
            "public int? HorsePower {  get;  set; }",
            "public int? RotorCount {  get;  set; }",
            "public int? ShaftHorsePower {  get;  set; }",
            "public string BoilerPressureText { get; }",
            "public string BypassRatioText { get; }",
            "public string CylinderCountText { get; }",
            "public string DisplacementText { get; }",
            "public string FuelTypeText { get; }",
            "public string HorsePowerText { get; }",
            "public string ModelText { get; }",
            "public string PowerText { get; }",
            "public string RotorCountText { get; }",
            "public string SerialNumberText { get; }",
            "public string ShaftHorsePowerText { get; }",
            "public string ThrustText { get; }",
            "public string VoltageText { get; }",
            "public string? Model {  get;  set; }",
            "public string? SerialNumber {  get;  set; }",
            "public void Clear()"
          ],
          "files": [
            "Garage.Console/Drafts/EngineDraft.cs"
          ],
          "declaration": "internal sealed class EngineDraft",
          "bases": []
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.EngineKind",
          "name": "EngineKind",
          "kind": "enum",
          "group": "Garage.ConsoleApp.Drafts",
          "members": [
            "ElectricMotor",
            "Flat",
            "Inline",
            "Rotary",
            "Steam",
            "Turbofan",
            "Turbojet",
            "Turboprop",
            "Turboshaft",
            "VEngine"
          ],
          "files": [
            "Garage.Console/Drafts/EngineKind.cs"
          ],
          "declaration": "internal enum EngineKind",
          "bases": []
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.MotorcycleDraft",
          "name": "MotorcycleDraft",
          "kind": "class",
          "group": "Garage.ConsoleApp.Drafts",
          "members": [
            "public MotorcycleType? MotorcycleType {  get;  set; }",
            "public bool? HasSidecar {  get;  set; }",
            "public int? DriverSeats {  get;  set; }",
            "public int? NumberOfWheels {  get;  set; }",
            "public int? PassengerCapacity {  get;  set; }",
            "public override List\u003Cstring\u003E GetMissingFields()",
            "public override void Clear()",
            "public string? Vin {  get;  set; }"
          ],
          "files": [
            "Garage.Console/Drafts/MotorcycleDraft.cs"
          ],
          "declaration": "internal sealed class MotorcycleDraft",
          "bases": [
            "VehicleDraft"
          ]
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.TruckDraft",
          "name": "TruckDraft",
          "kind": "class",
          "group": "Garage.ConsoleApp.Drafts",
          "members": [
            "public double? MaximumLoadKg {  get;  set; }",
            "public int? NumberOfAxles {  get;  set; }",
            "public int? NumberOfWheels {  get;  set; }",
            "public override List\u003Cstring\u003E GetMissingFields()",
            "public override void Clear()",
            "public string? Vin {  get;  set; }"
          ],
          "files": [
            "Garage.Console/Drafts/TruckDraft.cs"
          ],
          "declaration": "internal sealed class TruckDraft",
          "bases": [
            "VehicleDraft"
          ]
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.VehicleDraft",
          "name": "VehicleDraft",
          "kind": "class",
          "group": "Garage.ConsoleApp.Drafts",
          "members": [
            "private List\u003CEngine\u003E engines",
            "public CountryCode? CountryCode {  get;  set; }",
            "public List\u003CEngine\u003E Engines { get; }",
            "public VehicleColor? Color {  get;  set; }",
            "public bool RemoveEngine(Engine engine)",
            "public double? HeightMeters {  get;  set; }",
            "public double? LengthMeters {  get;  set; }",
            "public double? WeightKg {  get;  set; }",
            "public double? WidthMeters {  get;  set; }",
            "public int? ManufacturingYear {  get;  set; }",
            "public string ColorText { get; }",
            "public string DimensionsText { get; }",
            "public string EnginesText { get; }",
            "public string ManufacturerText { get; }",
            "public string ModelText { get; }",
            "public string RegistrationText { get; }",
            "public string WeightText { get; }",
            "public string YearText { get; }",
            "public string? Manufacturer {  get;  set; }",
            "public string? Model {  get;  set; }",
            "public string? RegistrationNumber {  get;  set; }",
            "public virtual List\u003Cstring\u003E GetMissingFields()",
            "public virtual void Clear()",
            "public void AddEngines(List\u003CEngine\u003E newEngines)"
          ],
          "files": [
            "Garage.Console/Drafts/VehicleDraft.cs"
          ],
          "declaration": "internal abstract class VehicleDraft",
          "bases": []
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Mapping.EngineDraftMapper",
          "name": "EngineDraftMapper",
          "kind": "class",
          "group": "Garage.ConsoleApp.Mapping",
          "members": [
            "public EngineCreatorResult CreateEngine(EngineDraft draft)"
          ],
          "files": [
            "Garage.Console/Mapping/EngineDraftMapper.cs"
          ],
          "declaration": "internal sealed class EngineDraftMapper",
          "bases": []
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Mapping.VehicleDraftMapper",
          "name": "VehicleDraftMapper",
          "kind": "class",
          "group": "Garage.ConsoleApp.Mapping",
          "members": [
            "public Airplane CreateAirplane(AirplaneDraft draft)",
            "public Boat CreateBoat(BoatDraft draft)",
            "public Bus CreateBus(BusDraft draft)",
            "public Car CreateCar(CarDraft draft)",
            "public Motorcycle CreateMotorcycle(MotorcycleDraft draft)",
            "public Truck CreateTruck(TruckDraft draft)"
          ],
          "files": [
            "Garage.Console/Mapping/VehicleDraftMapper.cs"
          ],
          "declaration": "internal sealed class VehicleDraftMapper",
          "bases": []
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Menus.ConsoleMenu",
          "name": "ConsoleMenu",
          "kind": "class",
          "group": "Garage.ConsoleApp.Menus",
          "members": [
            "private readonly List\u003CMenuOption\u003E options",
            "private void Display()",
            "public ConsoleMenu(string title, List\u003CMenuOption\u003E options, string backOptionText = \u0022Back\u0022)",
            "public string BackOptionText {  get; }",
            "public string Title {  get; }",
            "public void Show()"
          ],
          "files": [
            "Garage.Console/Menus/ConsoleMenu.cs"
          ],
          "declaration": "internal sealed class ConsoleMenu",
          "bases": []
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Menus.EngineCreator",
          "name": "EngineCreator",
          "kind": "class",
          "group": "Garage.ConsoleApp.Menus",
          "members": [
            "private List\u003CMenuOption\u003E CreateOptions(EngineCreatedHandler handleCreatedEngine)",
            "private readonly EngineDraft draft",
            "private readonly EngineDraftMapper engineActions",
            "private void AddDisplacementOption(ref List\u003CMenuOption\u003E options)",
            "private void AddFuelOption(ref List\u003CMenuOption\u003E options)",
            "private void AddHorsePowerOption(ref List\u003CMenuOption\u003E options)",
            "private void AddTurbineOptions(ref List\u003CMenuOption\u003E options)",
            "private void ChooseBoilerPressure()",
            "private void ChooseBypassRatio()",
            "private void ChooseCylinderCount()",
            "private void ChooseDisplacement()",
            "private void ChooseFuelType()",
            "private void ChooseHorsePower()",
            "private void ChooseModel()",
            "private void ChoosePower()",
            "private void ChooseRotorCount()",
            "private void ChooseSerialNumber()",
            "private void ChooseShaftHorsePower()",
            "private void ChooseThrust()",
            "private void ChooseVoltage()",
            "private void ClearFields()",
            "private void CreateEngine(EngineCreatedHandler handleCreatedEngine)",
            "public void ShowCreateEngineMenu(EngineCreatedHandler handleCreatedEngine)"
          ],
          "files": [
            "Garage.Console/Menus/EngineCreator.cs"
          ],
          "declaration": "internal sealed class EngineCreator",
          "bases": []
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Menus.GarageActions",
          "name": "GarageActions",
          "kind": "class",
          "group": "Garage.ConsoleApp.Menus",
          "members": [
            "private Vehicle? SelectVehicle(int? spotNumber = null)",
            "private readonly GarageService service",
            "private readonly VehicleGarage garage",
            "private static void ShowVehicleSpecificFilters(SearchCriteriaCreator criteriaCreator)",
            "private void Park(Vehicle vehicle)",
            "private void Park(Vehicle vehicle, int spot)",
            "private void ShowOpenSpots()",
            "private void ShowSearchResults(VehicleSearchCriteria criteria)",
            "public GarageActions(VehicleGarage garage, GarageService service)",
            "public void FindVehicleByRegistration()",
            "public void ListParkedVehicles()",
            "public void ListParkingSpots()",
            "public void ListVehicleTypes()",
            "public void ParkVehicle()",
            "public void ParkVehicleAtSpot()",
            "public void RemoveVehicle()",
            "public void SearchVehicles()"
          ],
          "files": [
            "Garage.Console/Menus/GarageActions.cs"
          ],
          "declaration": "internal sealed class GarageActions",
          "bases": []
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Menus.GarageApplication",
          "name": "GarageApplication",
          "kind": "class",
          "group": "Garage.ConsoleApp.Menus",
          "members": [
            "private readonly GarageService service",
            "private readonly VehicleCreator vehicleCreator",
            "private static Dimensions ReadSpotDimensions()",
            "private void ChooseGarage()",
            "private void CreateGarage()",
            "private void CreateGarage(bool useSpotDimensions)",
            "private void CreateGarageFromJson()",
            "private void CreateGarageWithSizedSpots()",
            "private void OpenGarage(VehicleGarage garage)",
            "public GarageApplication(GarageService service)",
            "public void Run()"
          ],
          "files": [
            "Garage.Console/Menus/GarageApplication.cs"
          ],
          "declaration": "internal sealed class GarageApplication",
          "bases": []
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Menus.MenuOption",
          "name": "MenuOption",
          "kind": "class",
          "group": "Garage.ConsoleApp.Menus",
          "members": [
            "private readonly Action action",
            "private readonly MenuTextProvider textProvider",
            "public MenuOption(MenuTextProvider textProvider, Action action)",
            "public MenuOption(string text, Action action)",
            "public MenuOption(string text, ConsoleMenu submenu)",
            "public override string ToString()",
            "public string Text { get; }",
            "public void Execute()"
          ],
          "files": [
            "Garage.Console/Menus/MenuOption.cs"
          ],
          "declaration": "internal sealed class MenuOption",
          "bases": []
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Menus.VehicleCreator",
          "name": "VehicleCreator",
          "kind": "class",
          "group": "Garage.ConsoleApp.Menus",
          "members": [
            "private VehicleGarage? targetGarage",
            "private int? targetSpotNumber",
            "private readonly AirplaneDraft airplaneDraft",
            "private readonly BoatDraft boatDraft",
            "private readonly BusDraft busDraft",
            "private readonly CarDraft carDraft",
            "private readonly EngineCreator engineCreator",
            "private readonly GarageService service",
            "private readonly MotorcycleDraft motorcycleDraft",
            "private readonly TruckDraft truckDraft",
            "private readonly VehicleDraftMapper vehicleActions",
            "private static List\u003CMenuOption\u003E CreateCommonOptions(VehicleDraft draft, string middleDimensionName)",
            "private static MenuOption BoolOption(string label, BoolValueGetter getter, BoolValueSetter setter)",
            "private static MenuOption DoubleOption(string label, string unit, DoubleValueGetter getter, DoubleValueSetter setter, double minimum, double maximum)",
            "private static MenuOption IntOption(string label, IntValueGetter getter, IntValueSetter setter, int minimum, int maximum)",
            "private static MenuOption TextOption(string label, TextValueGetter getter, TextValueSetter setter)",
            "private static double ReadMeasurement(string prompt)",
            "private static string ValueText(object? value, string? unit = null)",
            "private static void ListDraftEngines(VehicleDraft draft)",
            "private static void RemoveDraftEngine(VehicleDraft draft)",
            "private void AddEngine(VehicleDraft draft)",
            "private void CreateVehicle(VehicleDraft draft, VehicleFactory factory)",
            "private void CreateVehicleFromJson()",
            "private void ListVehicles()",
            "private void ShowAirplaneMenu()",
            "private void ShowBoatMenu()",
            "private void ShowBusMenu()",
            "private void ShowCarMenu()",
            "private void ShowDraftMenu(string title, VehicleDraft draft, List\u003CMenuOption\u003E typeOptions, Action createVehicle, string middleDimensionName = \u0022Width\u0022)",
            "private void ShowMenuCore(VehicleGarage? garage, int? spotNumber)",
            "private void ShowMotorcycleMenu()",
            "private void ShowTruckMenu()",
            "public VehicleCreator(GarageService service)",
            "public void ShowMenu()",
            "public void ShowMenuForGarage(VehicleGarage garage)",
            "public void ShowMenuForGarageAtSpot(VehicleGarage garage)"
          ],
          "files": [
            "Garage.Console/Menus/VehicleCreator.cs"
          ],
          "declaration": "internal sealed class VehicleCreator",
          "bases": []
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Prompts.ConsoleInput",
          "name": "ConsoleInput",
          "kind": "class",
          "group": "Garage.ConsoleApp.Prompts",
          "members": [
            "public static Enum ReadEnum(Type enumType, string prompt)",
            "public static Enum? ReadEnumOrCancel(Type enumType, string prompt, string cancelOptionText = \u0022Cancel\u0022)",
            "public static Enum? ReadOptionalEnum(Type enumType, string prompt)",
            "public static bool ReadBoolean(string prompt)",
            "public static double ReadDouble(string prompt, double minimum, double maximum)",
            "public static double? ReadOptionalDouble(string prompt, double minimum, double maximum)",
            "public static int ReadInt(string prompt, int minimum, int maximum)",
            "public static int? ReadOptionalInt(string prompt, int minimum, int maximum)",
            "public static string ReadRequiredString(string prompt)",
            "public static string? ReadOptionalString(string prompt)",
            "public static void Pause()"
          ],
          "files": [
            "Garage.Console/Prompts/ConsoleInput.cs"
          ],
          "declaration": "internal static class ConsoleInput",
          "bases": []
        },
        {
          "id": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Prompts.SearchCriteriaCreator",
          "name": "SearchCriteriaCreator",
          "kind": "class",
          "group": "Garage.ConsoleApp.Prompts",
          "members": [
            "private BoatType? boatType",
            "private BodyType? bodyType",
            "private FuelType? fuelType",
            "private List\u003CType\u003E CreateSelectedVehicleTypes()",
            "private MotorcycleType? motorcycleType",
            "private VehicleColor? color",
            "private bool? hasSidecar",
            "private double? cylinderVolumeCc",
            "private double? draftMeters",
            "private double? lengthMeters",
            "private double? maximumAltitudeMeters",
            "private double? maximumLoadKg",
            "private double? wingspanMeters",
            "private int? manufacturingYear",
            "private int? numberOfAxles",
            "private int? numberOfEngines",
            "private int? numberOfSeats",
            "private int? numberOfWheels",
            "private int? standingPassengerCapacity",
            "private readonly List\u003CType\u003E availableVehicleTypes",
            "private readonly List\u003Cbool\u003E selectedVehicleTypes",
            "private string? manufacturer",
            "private string? model",
            "private string? registrationNumber",
            "public VehicleSearchCriteria Create()",
            "public string BoatTypeText { get; }",
            "public string BodyTypeText { get; }",
            "public string ColorText { get; }",
            "public string CylinderVolumeText { get; }",
            "public string DraftText { get; }",
            "public string FuelTypeText { get; }",
            "public string HasSidecarText { get; }",
            "public string LengthText { get; }",
            "public string ManufacturerText { get; }",
            "public string ManufacturingYearText { get; }",
            "public string MaximumAltitudeText { get; }",
            "public string MaximumLoadText { get; }",
            "public string ModelText { get; }",
            "public string MotorcycleTypeText { get; }",
            "public string NumberOfAxlesText { get; }",
            "public string NumberOfEnginesText { get; }",
            "public string NumberOfSeatsText { get; }",
            "public string NumberOfWheelsText { get; }",
            "public string RegistrationNumberText { get; }",
            "public string StandingPassengerCapacityText { get; }",
            "public string VehicleTypesText {  get; }",
            "public string WingspanText { get; }",
            "public void ChooseBoatType()",
            "public void ChooseBodyType()",
            "public void ChooseColor()",
            "public void ChooseCylinderVolume()",
            "public void ChooseDraft()",
            "public void ChooseFuelType()",
            "public void ChooseHasSidecar()",
            "public void ChooseLength()",
            "public void ChooseManufacturer()",
            "public void ChooseManufacturingYear()",
            "public void ChooseMaximumAltitude()",
            "public void ChooseMaximumLoad()",
            "public void ChooseModel()",
            "public void ChooseMotorcycleType()",
            "public void ChooseNumberOfAxles()",
            "public void ChooseNumberOfEngines()",
            "public void ChooseNumberOfSeats()",
            "public void ChooseNumberOfWheels()",
            "public void ChooseRegistrationNumber()",
            "public void ChooseStandingPassengerCapacity()",
            "public void ChooseVehicleTypes()",
            "public void ChooseWingspan()",
            "public void Clear()"
          ],
          "files": [
            "Garage.Console/Prompts/SearchCriteriaCreator.cs"
          ],
          "declaration": "internal sealed class SearchCriteriaCreator",
          "bases": []
        }
      ],
      "edges": [
        {
          "id": "edge:0a89b7a62456b760627041926fd0a8bab870c996b63ad3b29bbec13f625e72ef",
          "source": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.CarDraft",
          "target": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.VehicleDraft",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:3af92131ecb2ab1c48fcb7c92e2dad8c9b8117edb39292896f90bcdbca0f7975",
          "source": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.BoatDraft",
          "target": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.VehicleDraft",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:7ff8390fe7b9741b47873dbe94a0d1bc5031918029449bdc8aebec3bc5e44062",
          "source": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.MotorcycleDraft",
          "target": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.VehicleDraft",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:96d8996bbbf7cfca0091084221ca3d7ad362ad2910bce3053ba7fac2f7685c21",
          "source": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.TruckDraft",
          "target": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.VehicleDraft",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:d6e794080f503c233c8ba461e1830838d35d416e15c331c9e7b516986dca2b6f",
          "source": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.BusDraft",
          "target": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.VehicleDraft",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:e72fa030850d4c4b2464c65d2c7b700448e0160e429b9679a2b83597bb4f1ea9",
          "source": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.AirplaneDraft",
          "target": "type:Garage.Console/Garage.Console.csproj:Garage.ConsoleApp.Drafts.VehicleDraft",
          "kind": "inheritance",
          "label": "inherits"
        }
      ]
    },
    "garage-packages": {
      "id": "garage-packages",
      "title": "Garage projects and namespaces",
      "type": "package",
      "nodes": [
        {
          "id": "project:Garage.Console/Garage.Console.csproj",
          "name": "Garage.Console",
          "kind": "package",
          "group": "",
          "members": [
            "Garage.ConsoleApp.Display",
            "Garage.ConsoleApp.Drafts",
            "Garage.ConsoleApp.Mapping",
            "Garage.ConsoleApp.Menus",
            "Garage.ConsoleApp.Prompts"
          ],
          "files": [
            "Garage.Console/Garage.Console.csproj"
          ],
          "declaration": "Project Garage.Console/Garage.Console.csproj",
          "bases": []
        },
        {
          "id": "project:Garage.Terminal/Garage.Terminal.csproj",
          "name": "Garage.Terminal",
          "kind": "package",
          "group": "",
          "members": [
            "Garage.Terminal.Forms",
            "Garage.Terminal.Presentation"
          ],
          "files": [
            "Garage.Terminal/Garage.Terminal.csproj"
          ],
          "declaration": "Project Garage.Terminal/Garage.Terminal.csproj",
          "bases": []
        },
        {
          "id": "project:Garage.Tests/Garage.Tests.csproj",
          "name": "Garage.Tests",
          "kind": "package",
          "group": "",
          "members": [
            "Garage.Tests",
            "Garage.Tests.Fixtures"
          ],
          "files": [
            "Garage.Tests/Garage.Tests.csproj"
          ],
          "declaration": "Project Garage.Tests/Garage.Tests.csproj",
          "bases": []
        },
        {
          "id": "project:Garage/Garage.csproj",
          "name": "Garage",
          "kind": "package",
          "group": "",
          "members": [
            "Garage.Diagnostics",
            "Garage.Models",
            "Garage.Persistence.Json",
            "Garage.Persistence.Json.Contracts",
            "Garage.Queries",
            "Garage.Results",
            "Garage.Services",
            "Garage.Specifications"
          ],
          "files": [
            "Garage/Garage.csproj"
          ],
          "declaration": "Project Garage/Garage.csproj",
          "bases": []
        },
        {
          "id": "project:Vehicle/Vehicle.csproj",
          "name": "Vehicle",
          "kind": "package",
          "group": "",
          "members": [
            "Garage.Engines",
            "Garage.Engines.Electric",
            "Garage.Engines.ExternalCombustion",
            "Garage.Engines.InternalCombustion",
            "Garage.Engines.InternalCombustion.Piston",
            "Garage.Engines.InternalCombustion.Turbine",
            "Garage.Engines.Specifications",
            "Garage.Factories",
            "Garage.Vehicles",
            "Garage.Vehicles.Components",
            "Garage.Vehicles.Interfaces",
            "Garage.Vehicles.Specifications",
            "Garage.Vehicles.Types"
          ],
          "files": [
            "Vehicle/Vehicle.csproj"
          ],
          "declaration": "Project Vehicle/Vehicle.csproj",
          "bases": []
        }
      ],
      "edges": [
        {
          "id": "edge:38f6367f27bdefe266a27fe6bdb9c2327ba3422f7bf6233e5d87b3d465d39d99",
          "source": "project:Garage/Garage.csproj",
          "target": "project:Vehicle/Vehicle.csproj",
          "kind": "reference",
          "label": "references"
        },
        {
          "id": "edge:416844e7648592bb64920579ef2666d78f34b297ec354653927c1b1cfab9f133",
          "source": "project:Garage.Tests/Garage.Tests.csproj",
          "target": "project:Garage.Terminal/Garage.Terminal.csproj",
          "kind": "reference",
          "label": "references"
        },
        {
          "id": "edge:4f9aeaac36174524816bbeaf8c7cd8856db5a78476ffc2a7e1c425670b8ef2bc",
          "source": "project:Garage.Tests/Garage.Tests.csproj",
          "target": "project:Garage/Garage.csproj",
          "kind": "reference",
          "label": "references"
        },
        {
          "id": "edge:79c77fce3ceec87f13682313be995a3f3fa3dd4c512dadb0cfbfb127b146d91c",
          "source": "project:Garage.Tests/Garage.Tests.csproj",
          "target": "project:Garage.Console/Garage.Console.csproj",
          "kind": "reference",
          "label": "references"
        },
        {
          "id": "edge:7fd3478d36902ea4238765d3fd1036a0c5cae099a38c96dde29dc7eba8e22ed2",
          "source": "project:Garage.Console/Garage.Console.csproj",
          "target": "project:Garage/Garage.csproj",
          "kind": "reference",
          "label": "references"
        },
        {
          "id": "edge:a73e473c35839c363db01cd43a7097864b5cbbbafb1e6a3387c95e86af352389",
          "source": "project:Garage.Tests/Garage.Tests.csproj",
          "target": "project:Vehicle/Vehicle.csproj",
          "kind": "reference",
          "label": "references"
        },
        {
          "id": "edge:c386f9d8aecc389821cb62dc18099c2f7ab529fd16294e1af817bf15b5092648",
          "source": "project:Garage.Terminal/Garage.Terminal.csproj",
          "target": "project:Garage/Garage.csproj",
          "kind": "reference",
          "label": "references"
        }
      ]
    },
    "garage-terminal-classes": {
      "id": "garage-terminal-classes",
      "title": "Garage.Terminal classes",
      "type": "class",
      "nodes": [
        {
          "id": "type:Garage.Terminal/Garage.Terminal.csproj:Garage.Terminal.Forms.FactoryDefinition",
          "name": "FactoryDefinition",
          "kind": "class",
          "group": "Garage.Terminal.Forms",
          "members": [
            "private FactoryDefinition(string name, string methodName)",
            "private readonly string methodName",
            "private static FieldDefinition Field(string name, Type type)",
            "private static List\u003CFieldDefinition\u003E BuildFields(string methodName)",
            "private static string Default(string name, Type type)",
            "public List\u003CFieldDefinition\u003E Fields {  get; }",
            "public object Create(Dictionary\u003Cstring, object?\u003E values, List\u003CEngine\u003E? engines = null)",
            "public static List\u003CFactoryDefinition\u003E Engines {  get; }",
            "public static List\u003CFactoryDefinition\u003E Vehicles {  get; }",
            "public string Name {  get; }"
          ],
          "files": [
            "Garage.Terminal/Forms/FactoryDefinition.Create.cs",
            "Garage.Terminal/Forms/FactoryDefinition.Fields.cs",
            "Garage.Terminal/Forms/FactoryDefinition.cs"
          ],
          "declaration": "internal sealed partial class FactoryDefinition",
          "bases": []
        },
        {
          "id": "type:Garage.Terminal/Garage.Terminal.csproj:Garage.Terminal.Forms.FieldDefinition",
          "name": "FieldDefinition",
          "kind": "record",
          "group": "Garage.Terminal.Forms",
          "members": [
            "primary constructor FieldDefinition(string Name, string Label, Type Type, bool Required = true, string Initial = \u0022\u0022)",
            "public object? Parse(string text)",
            "public static string FriendlyLabel(string name)",
            "public static string Humanize(string name)"
          ],
          "files": [
            "Garage.Terminal/Forms/FieldDefinition.cs"
          ],
          "declaration": "internal sealed record FieldDefinition(string Name, string Label, Type Type, bool Required = true, string Initial = \u0022\u0022)",
          "bases": []
        },
        {
          "id": "type:Garage.Terminal/Garage.Terminal.csproj:Garage.Terminal.Forms.SearchForm",
          "name": "SearchForm",
          "kind": "class",
          "group": "Garage.Terminal.Forms",
          "members": [
            "public static VehicleSearchCriteria? Show(Dialogs dialogs, VehicleSearchCriteria current)"
          ],
          "files": [
            "Garage.Terminal/Forms/SearchForm.cs"
          ],
          "declaration": "internal static class SearchForm",
          "bases": []
        },
        {
          "id": "type:Garage.Terminal/Garage.Terminal.csproj:Garage.Terminal.Presentation.DashboardState",
          "name": "DashboardState",
          "kind": "class",
          "group": "Garage.Terminal.Presentation",
          "members": [
            "primary constructor DashboardState(GarageService service)",
            "public GarageService Service {  get; }",
            "public IReadOnlyList\u003CVehicle\u003E VisibleVehicles()",
            "public VehicleGarage? Garage {  get;  set; }",
            "public VehicleGarage? Location(Vehicle vehicle)",
            "public VehicleSearchCriteria Criteria {  get;  set; }",
            "public WorkspacePage Page {  get;  set; }",
            "public int? Spot(Vehicle vehicle)",
            "public string QuickFilter {  get;  set; }"
          ],
          "files": [
            "Garage.Terminal/Presentation/DashboardState.cs"
          ],
          "declaration": "internal sealed class DashboardState(GarageService service)",
          "bases": []
        },
        {
          "id": "type:Garage.Terminal/Garage.Terminal.csproj:Garage.Terminal.Presentation.Dialogs",
          "name": "Dialogs",
          "kind": "class",
          "group": "Garage.Terminal.Presentation",
          "members": [
            "primary constructor Dialogs(IApplication app)",
            "public Dictionary\u003Cstring, object?\u003E? Form(string title, IReadOnlyList\u003CFieldDefinition\u003E fields, string finish = \u0022_Continue\u0022, IReadOnlyDictionary\u003Cstring, object?\u003E? initial = null)",
            "public IReadOnlyList\u003Cint\u003E? ChooseMany(string title, IReadOnlyList\u003Cstring\u003E choices, List\u003Cint\u003E? selected = null)",
            "public Window Modal(string title, int height = 22)",
            "public bool Confirm(string title, string message, string accept = \u0022_Continue\u0022)",
            "public int? Choose(string title, IReadOnlyList\u003Cstring\u003E choices, int selected = 0)",
            "public string? JsonFile(string title)",
            "public void Message(string title, string message)"
          ],
          "files": [
            "Garage.Terminal/Presentation/Dialogs.cs"
          ],
          "declaration": "internal sealed class Dialogs(IApplication app)",
          "bases": []
        },
        {
          "id": "type:Garage.Terminal/Garage.Terminal.csproj:Garage.Terminal.Presentation.GarageWorkspace",
          "name": "GarageWorkspace",
          "kind": "class",
          "group": "Garage.Terminal.Presentation",
          "members": [
            "internal void AdvanceWorkspaceFocus(bool backwards = false)",
            "private IReadOnlyList\u003CVehicle\u003E displayedVehicles",
            "private IReadOnlyList\u003CVehicleGarage\u003E displayedGarages",
            "private Vehicle? SelectedVehicle { get; }",
            "private bool refreshing",
            "private int? ChooseSpot(Vehicle? vehicle)",
            "private readonly DashboardState state",
            "private readonly Dialogs dialogs",
            "private readonly GarageWorkspaceLayout layout",
            "private readonly IApplication application",
            "private readonly IReadOnlyList\u003CView\u003E focusOrder",
            "private readonly Workflows workflows",
            "private readonly WorkspaceButtons buttons",
            "private static void AddColumns(DataTable data, List\u003Cstring\u003E names)",
            "private void ChooseGarage()",
            "private void ConnectEvents()",
            "private void CreateVehicle(bool parkImmediately)",
            "private void Execute(WorkspaceCommand command)",
            "private void GarageResult(GarageCreationResult? result)",
            "private void Guard(Action action)",
            "private void Help()",
            "private void ImportVehicle()",
            "private void OpenDetails()",
            "private void ParkVehicle()",
            "private void ParkingActions()",
            "private void Quit()",
            "private void RefreshRows()",
            "private void RemoveVehicle()",
            "private void RevealVehicle(Vehicle vehicle)",
            "private void Search()",
            "private void SetStatus(string message)",
            "private void ShowParkingSpots(VehicleGarage garage)",
            "private void ShowVehicleTypeCounts(VehicleGarage garage)",
            "private void UpdateDetails()",
            "public GarageWorkspace(IApplication application, GarageService service)"
          ],
          "files": [
            "Garage.Terminal/Presentation/GarageWorkspace.Actions.cs",
            "Garage.Terminal/Presentation/GarageWorkspace.Rendering.cs",
            "Garage.Terminal/Presentation/GarageWorkspace.cs"
          ],
          "declaration": "internal sealed partial class GarageWorkspace",
          "bases": [
            "Window"
          ]
        },
        {
          "id": "type:Garage.Terminal/Garage.Terminal.csproj:Garage.Terminal.Presentation.GarageWorkspaceLayout",
          "name": "GarageWorkspaceLayout",
          "kind": "class",
          "group": "Garage.Terminal.Presentation",
          "members": [
            "public FrameView DetailFrame {  get; }",
            "public FrameView TableFrame {  get; }",
            "public GarageWorkspaceLayout(Window workspace, WorkspaceButtons buttons)",
            "public Label Details {  get; }",
            "public Label Stats {  get; }",
            "public Label Status {  get; }",
            "public ListView Navigation {  get; }",
            "public TableView Table {  get; }",
            "public TextField Query {  get; }",
            "public void ArrangeForHeight(int height)"
          ],
          "files": [
            "Garage.Terminal/Presentation/GarageWorkspaceLayout.cs"
          ],
          "declaration": "internal sealed class GarageWorkspaceLayout",
          "bases": []
        },
        {
          "id": "type:Garage.Terminal/Garage.Terminal.csproj:Garage.Terminal.Presentation.Theme",
          "name": "Theme",
          "kind": "class",
          "group": "Garage.Terminal.Presentation",
          "members": [
            "private static Scheme Create(string text, string background, string selection)",
            "private static void ApplyScheme(View view, Scheme? scheme)",
            "public static Button Apply(Button view, Scheme? scheme = null)",
            "public static Button Button(string text, Action action)",
            "public static FrameView Apply(FrameView view, Scheme? scheme = null)",
            "public static Label Apply(Label view, Scheme? scheme = null)",
            "public static ListView Apply(ListView view, Scheme? scheme = null)",
            "public static OpenDialog Apply(OpenDialog view, Scheme? scheme = null)",
            "public static TableView Apply(TableView view, Scheme? scheme = null)",
            "public static TextField Apply(TextField view, Scheme? scheme = null)",
            "public static View Apply(View view, Scheme? scheme = null)",
            "public static Window Apply(Window view, Scheme? scheme = null)",
            "public static readonly Scheme Accent",
            "public static readonly Scheme Danger",
            "public static readonly Scheme Input",
            "public static readonly Scheme Muted",
            "public static readonly Scheme Panel",
            "public static readonly Scheme Surface"
          ],
          "files": [
            "Garage.Terminal/Presentation/Theme.cs"
          ],
          "declaration": "internal static class Theme",
          "bases": []
        },
        {
          "id": "type:Garage.Terminal/Garage.Terminal.csproj:Garage.Terminal.Presentation.VehicleDetails",
          "name": "VehicleDetails",
          "kind": "class",
          "group": "Garage.Terminal.Presentation",
          "members": [
            "private static string Properties(object value, List\u003Cstring\u003E? excluded = null)",
            "public static string Engines(List\u003CEngine\u003E engines)",
            "public static string Full(Vehicle vehicle)",
            "public static string Summary(Vehicle vehicle)"
          ],
          "files": [
            "Garage.Terminal/Presentation/VehicleDetails.cs"
          ],
          "declaration": "internal static class VehicleDetails",
          "bases": []
        },
        {
          "id": "type:Garage.Terminal/Garage.Terminal.csproj:Garage.Terminal.Presentation.Workflows",
          "name": "Workflows",
          "kind": "class",
          "group": "Garage.Terminal.Presentation",
          "members": [
            "primary constructor Workflows(Dialogs dialogs, GarageService service)",
            "private Dimensions? ReadDimensions(string title)",
            "private Engine? CreateEngine()",
            "public GarageCreationResult? CreateGarage()",
            "public GarageCreationResult? ImportGarage()",
            "public VehicleCreationResult? CreateVehicle(VehicleGarage? garage = null, int? spotNumber = null)"
          ],
          "files": [
            "Garage.Terminal/Presentation/Workflows.cs"
          ],
          "declaration": "internal sealed class Workflows(Dialogs dialogs, GarageService service)",
          "bases": []
        },
        {
          "id": "type:Garage.Terminal/Garage.Terminal.csproj:Garage.Terminal.Presentation.WorkspaceButtons",
          "name": "WorkspaceButtons",
          "kind": "class",
          "group": "Garage.Terminal.Presentation",
          "members": [
            "public Button CreateGarage {  get; }",
            "public Button CreateVehicle {  get; }",
            "public Button Details {  get; }",
            "public Button Filters {  get; }",
            "public Button GaragePicker {  get; }",
            "public Button Help {  get; }",
            "public Button ImportGarage {  get; }",
            "public Button ImportVehicle {  get; }",
            "public Button Park {  get; }",
            "public Button Quit {  get; }",
            "public Button Remove {  get; }",
            "public Button Spots {  get; }",
            "public IReadOnlyList\u003CView\u003E FocusOrder(ListView navigation, TextField query, TableView table)",
            "public WorkspaceButtons(Action\u003CWorkspaceCommand\u003E execute)",
            "public void AddActionsTo(View actions)",
            "public void AddHeaderTo(View header)",
            "public void AddSearchTo(View content)",
            "public void AddSidebarTo(View sidebar)"
          ],
          "files": [
            "Garage.Terminal/Presentation/WorkspaceButtons.cs"
          ],
          "declaration": "internal sealed class WorkspaceButtons",
          "bases": []
        },
        {
          "id": "type:Garage.Terminal/Garage.Terminal.csproj:Garage.Terminal.Presentation.WorkspaceCommand",
          "name": "WorkspaceCommand",
          "kind": "enum",
          "group": "Garage.Terminal.Presentation",
          "members": [
            "ChooseGarage",
            "CreateGarage",
            "CreateVehicle",
            "FocusFind",
            "Help",
            "ImportGarage",
            "ImportVehicle",
            "OpenDetails",
            "ParkVehicle",
            "ParkingActions",
            "Quit",
            "Refresh",
            "RemoveVehicle",
            "Search"
          ],
          "files": [
            "Garage.Terminal/Presentation/WorkspaceButtons.cs"
          ],
          "declaration": "internal enum WorkspaceCommand",
          "bases": []
        },
        {
          "id": "type:Garage.Terminal/Garage.Terminal.csproj:Garage.Terminal.Presentation.WorkspacePage",
          "name": "WorkspacePage",
          "kind": "enum",
          "group": "Garage.Terminal.Presentation",
          "members": [
            "Overview",
            "Parking",
            "Search",
            "Vehicles"
          ],
          "files": [
            "Garage.Terminal/Presentation/DashboardState.cs"
          ],
          "declaration": "internal enum WorkspacePage",
          "bases": []
        }
      ],
      "edges": []
    },
    "garage-tests-classes": {
      "id": "garage-tests-classes",
      "title": "Garage.Tests classes",
      "type": "class",
      "nodes": [
        {
          "id": "type:Garage.Tests/Garage.Tests.csproj:Garage.Tests.ConsoleOutputCollection",
          "name": "ConsoleOutputCollection",
          "kind": "class",
          "group": "Garage.Tests",
          "members": [],
          "files": [
            "Garage.Tests/VehicleEngineTests.cs"
          ],
          "declaration": "public class ConsoleOutputCollection",
          "bases": []
        },
        {
          "id": "type:Garage.Tests/Garage.Tests.csproj:Garage.Tests.CreationResultTests",
          "name": "CreationResultTests",
          "kind": "class",
          "group": "Garage.Tests",
          "members": [
            "[Fact]\npublic void CreateGarage_DuplicateAndInvalidCapacityReturnFailure()",
            "[Fact]\npublic void CreateGarage_ReturnsRegisteredGarage()",
            "[Fact]\npublic void CreateVehicle_ReturnsCreatedVehicleOrValidationFailure()",
            "[Fact]\npublic void Park_ReturnsParkingResultWithDisplaySpotNumber()"
          ],
          "files": [
            "Garage.Tests/CreationResultTests.cs"
          ],
          "declaration": "public class CreationResultTests",
          "bases": []
        },
        {
          "id": "type:Garage.Tests/Garage.Tests.csproj:Garage.Tests.Fixtures.EngineFixtures",
          "name": "EngineFixtures",
          "kind": "class",
          "group": "Garage.Tests.Fixtures",
          "members": [
            "public static FlatEngine CreateFlatEngine(string serialNumber = \u0022FLAT123\u0022, string model = \u0022Aircraft flat 4\u0022, FuelType fuelType = FuelType.AviationGasoline, int horsePower = 180, int displacementCc = 5_900, int cylinderCount = 4)",
            "public static InlineEngine CreateEngine(string serialNumber = \u0022ENG123\u0022, string model = \u0022Inline 4\u0022, FuelType fuelType = FuelType.Gasoline, int horsePower = 150, int displacementCc = 2_000, int cylinderCount = 4)"
          ],
          "files": [
            "Garage.Tests/Fixtures/EngineFixtures.cs"
          ],
          "declaration": "internal static class EngineFixtures",
          "bases": []
        },
        {
          "id": "type:Garage.Tests/Garage.Tests.csproj:Garage.Tests.Fixtures.VehicleFixtures",
          "name": "VehicleFixtures",
          "kind": "class",
          "group": "Garage.Tests.Fixtures",
          "members": [
            "public static Airplane CreateAirplane(int pilotSeats = 2, bool hasDualControls = true, Engine? engine = null, string registrationNumber = \u0022SE-ABC\u0022, CountryCode countryCode = CountryCode.SWE)",
            "public static Boat CreateBoat(int passengerCapacity = 8, int cabinPassengerSeats = 4, Engine? engine = null, string registrationNumber = \u0022SFB-2345\u0022, CountryCode countryCode = CountryCode.SWE)",
            "public static Bus CreateBus(int passengerSeats = 30, int standingCapacity = 20, int driverSeats = 1, Engine? engine = null)",
            "public static Car CreateCar(string registrationNumber = \u0022ABC123\u0022, VehicleColor color = VehicleColor.Black, string manufacturer = \u0022Volvo\u0022, int manufacturingYear = 2020, Engine? engine = null, CountryCode countryCode = CountryCode.SWE)",
            "public static Motorcycle CreateMotorcycle(string registrationNumber = \u0022MCY123\u0022, VehicleColor color = VehicleColor.Red, int numberOfWheels = 2, Engine? engine = null)",
            "public static Truck CreateTruck(int numberOfWheels = 6, int numberOfAxles = 3, double maximumLoadKg = 25_000, Engine? engine = null)"
          ],
          "files": [
            "Garage.Tests/Fixtures/VehicleFixtures.cs"
          ],
          "declaration": "internal static class VehicleFixtures",
          "bases": []
        },
        {
          "id": "type:Garage.Tests/Garage.Tests.csproj:Garage.Tests.GarageConstructionTests",
          "name": "GarageConstructionTests",
          "kind": "class",
          "group": "Garage.Tests",
          "members": [
            "[Fact]\npublic void Constructor_ParksInitialVehicles()",
            "[Fact]\npublic void Constructor_RejectsDuplicateRegistrationsIgnoringCase()",
            "[Fact]\npublic void Constructor_RejectsNullVehicleInInitialArray()",
            "[Fact]\npublic void Constructor_SetsCapacity()"
          ],
          "files": [
            "Garage.Tests/GarageConstructionTests.cs"
          ],
          "declaration": "public class GarageConstructionTests",
          "bases": []
        },
        {
          "id": "type:Garage.Tests/Garage.Tests.csproj:Garage.Tests.GarageJsonLoaderTests",
          "name": "GarageJsonLoaderTests",
          "kind": "class",
          "group": "Garage.Tests",
          "members": [
            "[Fact]\npublic void Load_CreatesGarageWithCustomSpotSizeAndAssignments()",
            "[Fact]\npublic void Load_RejectsDuplicateCustomSpotNumbers()",
            "[Fact]\npublic void Load_RejectsVehicleThatDoesNotFitItsAssignedSpot()",
            "private const string VehicleJson",
            "private static string CreateDirectory()",
            "private static string Write(string directory, string name, string content)"
          ],
          "files": [
            "Garage.Tests/GarageJsonLoaderTests.cs"
          ],
          "declaration": "public class GarageJsonLoaderTests",
          "bases": []
        },
        {
          "id": "type:Garage.Tests/Garage.Tests.csproj:Garage.Tests.GarageParkingTests",
          "name": "GarageParkingTests",
          "kind": "class",
          "group": "Garage.Tests",
          "members": [
            "[Fact]\npublic void Constructor_RejectsMissingSpotDimensions()",
            "[Fact]\npublic void ParkAtSpot_FailsWhenSpotIsOccupied()",
            "[Fact]\npublic void ParkAtSpot_RejectsNullVehicle()",
            "[Fact]\npublic void ParkAtSpot_RejectsVehicleThatDoesNotFitAndKeepsSpotFree()",
            "[Fact]\npublic void ParkAtSpot_UsesRequestedSpot()",
            "[Fact]\npublic void Park_AddsVehicleAndUpdatesSpaceCounts()",
            "[Fact]\npublic void Park_FailsWhenGarageIsFull()",
            "[Fact]\npublic void Park_RejectsDuplicateRegistrationIgnoringCase()",
            "[Fact]\npublic void Park_RejectsNullVehicle()",
            "[Fact]\npublic void Park_SkipsOpenSpotThatIsTooSmall()",
            "[Fact]\npublic void ParkingMenu_OnlyOffersVehiclesThatFitTheChosenSpot()",
            "[Fact]\npublic void Remove_MakesSizedSpotAvailableAgain()",
            "[Theory]\n[InlineData(0, 2, 2)]\n[InlineData(-1, 2, 2)]\n[InlineData(double.NaN, 2, 2)]\n[InlineData(2, double.PositiveInfinity, 2)]\n[InlineData(2, 2, double.NegativeInfinity)]\npublic void Dimensions_RejectsInvalidMeasurements(double lengthMeters, double widthMeters, double heightMeters)"
          ],
          "files": [
            "Garage.Tests/GarageParkingTests.cs"
          ],
          "declaration": "public class GarageParkingTests",
          "bases": []
        },
        {
          "id": "type:Garage.Tests/Garage.Tests.csproj:Garage.Tests.GarageRemovalTests",
          "name": "GarageRemovalTests",
          "kind": "class",
          "group": "Garage.Tests",
          "members": [
            "[Fact]\npublic void FindVehicleByRegistration_IgnoresCase()",
            "[Fact]\npublic void Remove_RemovesVehicleAndFreesSpace()",
            "[Fact]\npublic void Remove_ReturnsFailureForUnknownRegistration()"
          ],
          "files": [
            "Garage.Tests/GarageRemovalTests.cs"
          ],
          "declaration": "public class GarageRemovalTests",
          "bases": []
        },
        {
          "id": "type:Garage.Tests/Garage.Tests.csproj:Garage.Tests.GarageSearchTests",
          "name": "GarageSearchTests",
          "kind": "class",
          "group": "Garage.Tests",
          "members": [
            "[Fact]\npublic void Search_CombinesAircraftAndGeneralFilters()",
            "[Fact]\npublic void Search_CombinesCriteriaWithAndLogic()",
            "[Fact]\npublic void Search_FiltersOnVehicleSpecificProperties()",
            "[Fact]\npublic void Search_ReturnsEmptyCollectionWhenNothingMatches()",
            "[Fact]\npublic void VehiclesByType_GroupsAndCountsVehicles()"
          ],
          "files": [
            "Garage.Tests/GarageSearchTests.cs"
          ],
          "declaration": "public class GarageSearchTests",
          "bases": []
        },
        {
          "id": "type:Garage.Tests/Garage.Tests.csproj:Garage.Tests.GarageServiceTests",
          "name": "GarageServiceTests",
          "kind": "class",
          "group": "Garage.Tests",
          "members": [
            "[Fact]\npublic void AddGarage_RejectsDuplicateNameWithoutChangingCollection()",
            "[Fact]\npublic void Constructor_RejectsDuplicateInitialGarages()",
            "[Fact]\npublic void ImportGarage_FailedLoadDoesNotRegisterGarage()"
          ],
          "files": [
            "Garage.Tests/GarageServiceTests.cs"
          ],
          "declaration": "public class GarageServiceTests",
          "bases": []
        },
        {
          "id": "type:Garage.Tests/Garage.Tests.csproj:Garage.Tests.GarageServiceWorkflowTests",
          "name": "GarageServiceWorkflowTests",
          "kind": "class",
          "group": "Garage.Tests",
          "members": [
            "[Fact]\npublic void CatalogAndGarageCollections_CannotBeMutatedByCallers()",
            "[Fact]\npublic void Catalog_RejectsDuplicateRegistrationInInitialData()",
            "[Fact]\npublic void CreateAndPark_OccupiedSpotKeepsExistingVehicleAndCatalog()",
            "[Fact]\npublic void CreateAndPark_RegistersTheSameVehicleInCatalogAndGarage()",
            "[Fact]\npublic void CreateAndPark_RejectsGarageOutsideTheService()",
            "[Fact]\npublic void CreateAndPark_VehicleThatDoesNotFitDoesNotChangeEitherCollection()",
            "[Fact]\npublic void CreateVehicle_RejectsRegistrationAlreadyInAnotherGarage()",
            "[Fact]\npublic void FromJson_InvalidFileReturnsErrorWithoutChangingState()",
            "[Fact]\npublic void FromJson_MissingFileReturnsSpecificError()",
            "[Fact]\npublic void Park_RejectsVehicleOutsideTheCatalog()",
            "[Fact]\npublic void Park_VehicleMustBeRemovedBeforeParkingInAnotherGarage()",
            "[Fact]\npublic void ResultFactories_RejectInconsistentSuccessAndFailure()"
          ],
          "files": [
            "Garage.Tests/GarageServiceWorkflowTests.cs"
          ],
          "declaration": "public class GarageServiceWorkflowTests",
          "bases": []
        },
        {
          "id": "type:Garage.Tests/Garage.Tests.csproj:Garage.Tests.RegistrationValidationTests",
          "name": "RegistrationValidationTests",
          "kind": "class",
          "group": "Garage.Tests",
          "members": [
            "[Fact]\npublic void Airplane_UsesItsCountryPrefix()",
            "[Fact]\npublic void Boat_UsesBoatRulesInsteadOfRoadRules()",
            "[Fact]\npublic void Draft_RequiresCountryAndClearsItAfterUse()",
            "[Fact]\npublic void Factory_UsesTheExplicitCountry()",
            "[Theory]\n[InlineData(\u0022\u0022)]\n[InlineData(\u0022 \u0022)]\n[InlineData(\u0022---\u0022)]\n[InlineData(\u0022MATCH1\u0022)]\n[InlineData(\u0022ABC1234\u0022)]\npublic void RoadVehicle_RejectsInvalidRegistrations(string number)",
            "[Theory]\n[InlineData(\u0022ABC123\u0022)]\n[InlineData(\u0022ABC12D\u0022)]\n[InlineData(\u0022 abc-123 \u0022)]\npublic void RoadVehicle_NormalizesSupportedRegistrations(string number)",
            "[Theory]\n[InlineData(\u0022vehicles.json\u0022, 30)]\n[InlineData(\u0022created-vehicles.json\u0022, 12)]\npublic void SampleData_LoadsWithValidRegistrations(string fileName, int expectedCount)",
            "[Theory]\n[InlineData(CountryCode.Unspecified)]\n[InlineData((CountryCode)999)]\npublic void Vehicle_RejectsMissingOrUndefinedCountry(CountryCode countryCode)",
            "[Theory]\n[InlineData(true)]\n[InlineData(false)]\npublic void Initializer_ValidatesUsingBothPropertiesRegardlessOfOrder(bool countryFirst)",
            "private static Car CreateCar(string number, CountryCode countryCode, bool countryFirst)"
          ],
          "files": [
            "Garage.Tests/RegistrationValidationTests.cs"
          ],
          "declaration": "public class RegistrationValidationTests",
          "bases": []
        },
        {
          "id": "type:Garage.Tests/Garage.Tests.csproj:Garage.Tests.TerminalWorkspaceTests",
          "name": "TerminalWorkspaceTests",
          "kind": "class",
          "group": "Garage.Tests",
          "members": [
            "[Fact]\npublic void Dashboard_FiltersCatalogAndRetainsGarageLocations()",
            "[Fact]\npublic void EngineForms_MapEverySupportedEngineFactory()",
            "[Fact]\npublic void FactoryForm_MapsValidCarValuesThroughDomainFactory()",
            "[Fact]\npublic void FactoryForms_CoverAllVehicleAndEngineTypes()",
            "[Fact]\npublic void Fields_ParseOptionalEnumsAndFiniteMeasurements()",
            "[Fact]\npublic void VehicleForms_CreateEverySupportedVehicleType()",
            "[Fact]\npublic void Workspace_LayoutAndKeyboardTraversalReachTheVehicleTable()"
          ],
          "files": [
            "Garage.Tests/TerminalWorkspaceTests.cs"
          ],
          "declaration": "public class TerminalWorkspaceTests",
          "bases": []
        },
        {
          "id": "type:Garage.Tests/Garage.Tests.csproj:Garage.Tests.VehicleEngineTests",
          "name": "VehicleEngineTests",
          "kind": "class",
          "group": "Garage.Tests",
          "members": [
            "[Fact]\npublic void AddEngine_PreservesExistingEngineAndAddsNewEngine()",
            "[Fact]\npublic void AddEngine_RejectsEngineBeyondCapacity()",
            "[Fact]\npublic void PrintVehicle_ReflectsAddedAndRemovedEngines()",
            "[Fact]\npublic void RemoveEngine_RemovesOnlySelectedEngine()",
            "private static List\u003CVehicle\u003E CreateVehicles()",
            "private static string CaptureVehicle(Vehicle vehicle)"
          ],
          "files": [
            "Garage.Tests/VehicleEngineTests.cs"
          ],
          "declaration": "public class VehicleEngineTests",
          "bases": []
        },
        {
          "id": "type:Garage.Tests/Garage.Tests.csproj:Garage.Tests.VehicleJsonLoaderTests",
          "name": "VehicleJsonLoaderTests",
          "kind": "class",
          "group": "Garage.Tests",
          "members": [
            "[Fact]\npublic void LoadVehicles_RejectsNullJsonRoot()",
            "[Fact]\npublic void LoadVehicles_RejectsNullVehicle()"
          ],
          "files": [
            "Garage.Tests/VehicleJsonLoaderTests.cs"
          ],
          "declaration": "public class VehicleJsonLoaderTests",
          "bases": []
        },
        {
          "id": "type:Garage.Tests/Garage.Tests.csproj:Garage.Tests.VehicleJsonTests",
          "name": "VehicleJsonTests",
          "kind": "class",
          "group": "Garage.Tests",
          "members": [
            "[Fact]\npublic void LoadVehicle_CreatesCarAndEngineFromObject()",
            "[Theory]\n[InlineData(\u0022null\u0022)]\n[InlineData(\u0022[]\u0022)]\n[InlineData(\u0022{invalid}\u0022)]\n[InlineData(\u0022{\\\u0022type\\\u0022:\\\u0022Car\\\u0022}\u0022)]\npublic void LoadVehicle_RejectsInvalidDocument(string json)"
          ],
          "files": [
            "Garage.Tests/VehicleJsonTests.cs"
          ],
          "declaration": "public class VehicleJsonTests",
          "bases": []
        },
        {
          "id": "type:Garage.Tests/Garage.Tests.csproj:Garage.Tests.VehicleValidationTests",
          "name": "VehicleValidationTests",
          "kind": "class",
          "group": "Garage.Tests",
          "members": [
            "[Fact]\npublic void Airplane_RejectsDualControlsWithOnePilotSeat()",
            "[Fact]\npublic void Boat_RejectsMoreCabinSeatsThanPassengerCapacity()",
            "[Fact]\npublic void Bus_AllowsZeroDriverSeatsForAutonomousBus()",
            "[Fact]\npublic void Bus_RejectsZeroTotalPassengerCapacity()",
            "[Fact]\npublic void Truck_RejectsFewerThanTwoWheelsPerAxle()"
          ],
          "files": [
            "Garage.Tests/VehicleValidationTests.cs"
          ],
          "declaration": "public class VehicleValidationTests",
          "bases": []
        }
      ],
      "edges": []
    },
    "vehicle-classes": {
      "id": "vehicle-classes",
      "title": "Vehicle classes",
      "type": "class",
      "nodes": [
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.Electric.ElectricEngine",
          "name": "ElectricEngine",
          "kind": "class",
          "group": "Garage.Engines.Electric",
          "members": [
            "public override EngineSpecification SpecificationDetails { get; }",
            "public required ElectricEngineSpecification Specification {  get;  init; }"
          ],
          "files": [
            "Vehicle/Engines/Electric/ElectricEngine.cs"
          ],
          "declaration": "public abstract class ElectricEngine",
          "bases": [
            "Engine"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.Electric.ElectricMotor",
          "name": "ElectricMotor",
          "kind": "class",
          "group": "Garage.Engines.Electric",
          "members": [],
          "files": [
            "Vehicle/Engines/Electric/ElectricMotor.cs"
          ],
          "declaration": "public class ElectricMotor",
          "bases": [
            "ElectricEngine"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.Engine",
          "name": "Engine",
          "kind": "class",
          "group": "Garage.Engines",
          "members": [
            "public abstract EngineSpecification SpecificationDetails {  get; }",
            "public bool Equals(Engine? other)",
            "public override bool Equals(object? obj)",
            "public override int GetHashCode()",
            "public required string Model {  get;  init; }",
            "public required string SerialNumber {  get;  init; }",
            "public virtual FuelType? FuelType { get; }",
            "public virtual double? CylinderVolumeCc { get; }"
          ],
          "files": [
            "Vehicle/Engines/Engine.cs"
          ],
          "declaration": "public abstract class Engine",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.ExternalCombustion.ExternalCombustionEngine",
          "name": "ExternalCombustionEngine",
          "kind": "class",
          "group": "Garage.Engines.ExternalCombustion",
          "members": [
            "protected abstract ExternalCombustionEngineSpecification CombustionSpecification {  get; }",
            "public override FuelType? FuelType { get; }"
          ],
          "files": [
            "Vehicle/Engines/ExternalCombustion/ExternalCombustionEngine.cs"
          ],
          "declaration": "public abstract class ExternalCombustionEngine",
          "bases": [
            "Engine"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.ExternalCombustion.SteamEngine",
          "name": "SteamEngine",
          "kind": "class",
          "group": "Garage.Engines.ExternalCombustion",
          "members": [
            "protected override ExternalCombustionEngineSpecification CombustionSpecification { get; }",
            "public override EngineSpecification SpecificationDetails { get; }",
            "public required SteamEngineSpecification Specification {  get;  init; }"
          ],
          "files": [
            "Vehicle/Engines/ExternalCombustion/SteamEngine.cs"
          ],
          "declaration": "public class SteamEngine",
          "bases": [
            "ExternalCombustionEngine"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.FuelType",
          "name": "FuelType",
          "kind": "enum",
          "group": "Garage.Engines",
          "members": [
            "AviationGasoline",
            "Biofuel",
            "Coal",
            "Diesel",
            "Electricity",
            "Ethanol",
            "Gasoline",
            "Hydrogen",
            "JetFuel",
            "Kerosene",
            "LPG",
            "Wood"
          ],
          "files": [
            "Vehicle/Engines/FuelType.cs"
          ],
          "declaration": "public enum FuelType",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.InternalCombustionEngine",
          "name": "InternalCombustionEngine",
          "kind": "class",
          "group": "Garage.Engines.InternalCombustion",
          "members": [
            "protected abstract InternalCombustionEngineSpecification CombustionSpecification {  get; }",
            "public override FuelType? FuelType { get; }"
          ],
          "files": [
            "Vehicle/Engines/InternalCombustion/InternalCombustionEngine.cs"
          ],
          "declaration": "public abstract class InternalCombustionEngine",
          "bases": [
            "Engine"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Piston.FlatEngine",
          "name": "FlatEngine",
          "kind": "class",
          "group": "Garage.Engines.InternalCombustion.Piston",
          "members": [],
          "files": [
            "Vehicle/Engines/InternalCombustion/Piston/FlatEngine.cs"
          ],
          "declaration": "public class FlatEngine",
          "bases": [
            "PistonEngine"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Piston.InlineEngine",
          "name": "InlineEngine",
          "kind": "class",
          "group": "Garage.Engines.InternalCombustion.Piston",
          "members": [],
          "files": [
            "Vehicle/Engines/InternalCombustion/Piston/InlineEngine.cs"
          ],
          "declaration": "public class InlineEngine",
          "bases": [
            "PistonEngine"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Piston.PistonEngine",
          "name": "PistonEngine",
          "kind": "class",
          "group": "Garage.Engines.InternalCombustion.Piston",
          "members": [
            "protected override InternalCombustionEngineSpecification CombustionSpecification { get; }",
            "public override EngineSpecification SpecificationDetails { get; }",
            "public override double? CylinderVolumeCc { get; }",
            "public required PistonEngineSpecification Specification {  get;  init; }"
          ],
          "files": [
            "Vehicle/Engines/InternalCombustion/Piston/PistonEngine.cs"
          ],
          "declaration": "public abstract class PistonEngine",
          "bases": [
            "InternalCombustionEngine"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Piston.VEngine",
          "name": "VEngine",
          "kind": "class",
          "group": "Garage.Engines.InternalCombustion.Piston",
          "members": [],
          "files": [
            "Vehicle/Engines/InternalCombustion/Piston/VEngine.cs"
          ],
          "declaration": "public class VEngine",
          "bases": [
            "PistonEngine"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.RotaryEngine",
          "name": "RotaryEngine",
          "kind": "class",
          "group": "Garage.Engines.InternalCombustion",
          "members": [
            "protected override InternalCombustionEngineSpecification CombustionSpecification { get; }",
            "public override EngineSpecification SpecificationDetails { get; }",
            "public required RotaryEngineSpecification Specification {  get;  init; }"
          ],
          "files": [
            "Vehicle/Engines/InternalCombustion/RotaryEngine.cs"
          ],
          "declaration": "public class RotaryEngine",
          "bases": [
            "InternalCombustionEngine"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Turbine.TurbineEngine",
          "name": "TurbineEngine",
          "kind": "class",
          "group": "Garage.Engines.InternalCombustion.Turbine",
          "members": [
            "protected abstract TurbineEngineSpecification TurbineSpecification {  get; }",
            "protected override InternalCombustionEngineSpecification CombustionSpecification { get; }"
          ],
          "files": [
            "Vehicle/Engines/InternalCombustion/Turbine/TurbineEngine.cs"
          ],
          "declaration": "public abstract class TurbineEngine",
          "bases": [
            "InternalCombustionEngine"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Turbine.TurbofanEngine",
          "name": "TurbofanEngine",
          "kind": "class",
          "group": "Garage.Engines.InternalCombustion.Turbine",
          "members": [
            "protected override TurbineEngineSpecification TurbineSpecification { get; }",
            "public override EngineSpecification SpecificationDetails { get; }",
            "public required TurbofanEngineSpecification Specification {  get;  init; }"
          ],
          "files": [
            "Vehicle/Engines/InternalCombustion/Turbine/TurbofanEngine.cs"
          ],
          "declaration": "public class TurbofanEngine",
          "bases": [
            "TurbineEngine"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Turbine.TurbojetEngine",
          "name": "TurbojetEngine",
          "kind": "class",
          "group": "Garage.Engines.InternalCombustion.Turbine",
          "members": [
            "protected override TurbineEngineSpecification TurbineSpecification { get; }",
            "public override EngineSpecification SpecificationDetails { get; }",
            "public required TurbineEngineSpecification Specification {  get;  init; }"
          ],
          "files": [
            "Vehicle/Engines/InternalCombustion/Turbine/TurbojetEngine.cs"
          ],
          "declaration": "public class TurbojetEngine",
          "bases": [
            "TurbineEngine"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Turbine.TurbopropEngine",
          "name": "TurbopropEngine",
          "kind": "class",
          "group": "Garage.Engines.InternalCombustion.Turbine",
          "members": [
            "protected override TurbineEngineSpecification TurbineSpecification { get; }",
            "public override EngineSpecification SpecificationDetails { get; }",
            "public required TurbopropEngineSpecification Specification {  get;  init; }"
          ],
          "files": [
            "Vehicle/Engines/InternalCombustion/Turbine/TurbopropEngine.cs"
          ],
          "declaration": "public class TurbopropEngine",
          "bases": [
            "TurbineEngine"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Turbine.TurboshaftEngine",
          "name": "TurboshaftEngine",
          "kind": "class",
          "group": "Garage.Engines.InternalCombustion.Turbine",
          "members": [
            "protected override TurbineEngineSpecification TurbineSpecification { get; }",
            "public override EngineSpecification SpecificationDetails { get; }",
            "public required TurboshaftEngineSpecification Specification {  get;  init; }"
          ],
          "files": [
            "Vehicle/Engines/InternalCombustion/Turbine/TurboshaftEngine.cs"
          ],
          "declaration": "public class TurboshaftEngine",
          "bases": [
            "TurbineEngine"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.ElectricEngineSpecification",
          "name": "ElectricEngineSpecification",
          "kind": "class",
          "group": "Garage.Engines.Specifications",
          "members": [
            "public required double PowerKw {  get;  init; }",
            "public required double Voltage {  get;  init; }"
          ],
          "files": [
            "Vehicle/Engines/Specifications/ElectricEngineSpecification.cs"
          ],
          "declaration": "public class ElectricEngineSpecification",
          "bases": [
            "EngineSpecification"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.EngineSpecification",
          "name": "EngineSpecification",
          "kind": "class",
          "group": "Garage.Engines.Specifications",
          "members": [],
          "files": [
            "Vehicle/Engines/Specifications/EngineSpecification.cs"
          ],
          "declaration": "public abstract class EngineSpecification",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.ExternalCombustionEngineSpecification",
          "name": "ExternalCombustionEngineSpecification",
          "kind": "class",
          "group": "Garage.Engines.Specifications",
          "members": [
            "public required FuelType FuelType {  get;  init; }"
          ],
          "files": [
            "Vehicle/Engines/Specifications/ExternalCombustionEngineSpecification.cs"
          ],
          "declaration": "public abstract class ExternalCombustionEngineSpecification",
          "bases": [
            "EngineSpecification"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.InternalCombustionEngineSpecification",
          "name": "InternalCombustionEngineSpecification",
          "kind": "class",
          "group": "Garage.Engines.Specifications",
          "members": [
            "public required FuelType FuelType {  get;  init; }"
          ],
          "files": [
            "Vehicle/Engines/Specifications/InternalCombustionEngineSpecification.cs"
          ],
          "declaration": "public abstract class InternalCombustionEngineSpecification",
          "bases": [
            "EngineSpecification"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.PistonEngineSpecification",
          "name": "PistonEngineSpecification",
          "kind": "class",
          "group": "Garage.Engines.Specifications",
          "members": [
            "public const double MaximumCylinderVolumeCc",
            "public double? CylinderVolumeCc { get; }",
            "public required int CylinderCount {  get;  init; }",
            "public required int DisplacementCc {  get;  init; }",
            "public required int HorsePower {  get;  init; }"
          ],
          "files": [
            "Vehicle/Engines/Specifications/PistonEngineSpecification.cs"
          ],
          "declaration": "public class PistonEngineSpecification",
          "bases": [
            "InternalCombustionEngineSpecification"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.RotaryEngineSpecification",
          "name": "RotaryEngineSpecification",
          "kind": "class",
          "group": "Garage.Engines.Specifications",
          "members": [
            "public required int DisplacementCc {  get;  init; }",
            "public required int HorsePower {  get;  init; }",
            "public required int RotorCount {  get;  init; }"
          ],
          "files": [
            "Vehicle/Engines/Specifications/RotaryEngineSpecification.cs"
          ],
          "declaration": "public class RotaryEngineSpecification",
          "bases": [
            "InternalCombustionEngineSpecification"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.SteamEngineSpecification",
          "name": "SteamEngineSpecification",
          "kind": "class",
          "group": "Garage.Engines.Specifications",
          "members": [
            "public required double BoilerPressureBar {  get;  init; }",
            "public required int HorsePower {  get;  init; }"
          ],
          "files": [
            "Vehicle/Engines/Specifications/SteamEngineSpecification.cs"
          ],
          "declaration": "public class SteamEngineSpecification",
          "bases": [
            "ExternalCombustionEngineSpecification"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.TurbineEngineSpecification",
          "name": "TurbineEngineSpecification",
          "kind": "class",
          "group": "Garage.Engines.Specifications",
          "members": [
            "public required double ThrustKn {  get;  init; }"
          ],
          "files": [
            "Vehicle/Engines/Specifications/TurbineEngineSpecification.cs"
          ],
          "declaration": "public class TurbineEngineSpecification",
          "bases": [
            "InternalCombustionEngineSpecification"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.TurbofanEngineSpecification",
          "name": "TurbofanEngineSpecification",
          "kind": "class",
          "group": "Garage.Engines.Specifications",
          "members": [
            "public required double BypassRatio {  get;  init; }"
          ],
          "files": [
            "Vehicle/Engines/Specifications/TurbofanEngineSpecification.cs"
          ],
          "declaration": "public class TurbofanEngineSpecification",
          "bases": [
            "TurbineEngineSpecification"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.TurbopropEngineSpecification",
          "name": "TurbopropEngineSpecification",
          "kind": "class",
          "group": "Garage.Engines.Specifications",
          "members": [
            "public required int ShaftHorsePower {  get;  init; }"
          ],
          "files": [
            "Vehicle/Engines/Specifications/TurbopropEngineSpecification.cs"
          ],
          "declaration": "public class TurbopropEngineSpecification",
          "bases": [
            "TurbineEngineSpecification"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.TurboshaftEngineSpecification",
          "name": "TurboshaftEngineSpecification",
          "kind": "class",
          "group": "Garage.Engines.Specifications",
          "members": [
            "public required int ShaftHorsePower {  get;  init; }"
          ],
          "files": [
            "Vehicle/Engines/Specifications/TurboshaftEngineSpecification.cs"
          ],
          "declaration": "public class TurboshaftEngineSpecification",
          "bases": [
            "TurbineEngineSpecification"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Factories.AirplaneFactory",
          "name": "AirplaneFactory",
          "kind": "class",
          "group": "Garage.Factories",
          "members": [
            "public static Airplane CreateAirplane(string registrationNumber, CountryCode countryCode, string manufacturer, string model, int manufacturingYear, VehicleColor color, double weightKg, int numberOfWheels, double lengthMeters, double wingspanMeters, double heightMeters, string airframeSerialNumber, int passengerSeatCount, int crewSeatCount, int pilotSeatCount, bool hasDualControls, double maximumAltitudeMeters, List\u003CEngine\u003E engines)"
          ],
          "files": [
            "Vehicle/Factories/AirplaneFactory.cs"
          ],
          "declaration": "public static class AirplaneFactory",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Factories.BoatFactory",
          "name": "BoatFactory",
          "kind": "class",
          "group": "Garage.Factories",
          "members": [
            "public static Boat CreateBoat(string registrationNumber, CountryCode countryCode, string manufacturer, string model, int manufacturingYear, VehicleColor color, double weightKg, double lengthMeters, double widthMeters, double heightMeters, string hin, double draftMeters, BoatType boatType, int passengerCapacity, int driverSeats, bool hasCabin, int cabinPassengerSeatCount, int cabinCrewSeatCount, List\u003CEngine\u003E engines)"
          ],
          "files": [
            "Vehicle/Factories/BoatFactory.cs"
          ],
          "declaration": "public static class BoatFactory",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Factories.BusFactory",
          "name": "BusFactory",
          "kind": "class",
          "group": "Garage.Factories",
          "members": [
            "public static Bus CreateBus(string registrationNumber, CountryCode countryCode, string manufacturer, string model, int manufacturingYear, VehicleColor color, double weightKg, double lengthMeters, double widthMeters, double heightMeters, string vin, int numberOfDoors, int numberOfWheels, int passengerSeatCount, int standingPassengerCapacity, int driverSeatCount, List\u003CEngine\u003E engines)"
          ],
          "files": [
            "Vehicle/Factories/BusFactory.cs"
          ],
          "declaration": "public static class BusFactory",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Factories.CarFactory",
          "name": "CarFactory",
          "kind": "class",
          "group": "Garage.Factories",
          "members": [
            "public static Car CreateCar(string registrationNumber, CountryCode countryCode, string manufacturer, string model, int manufacturingYear, VehicleColor color, double weightKg, double length, double width, double height, string vin, BodyType bodyType, int numberOfDoors, int numberOfSeats, List\u003CEngine\u003E engines)"
          ],
          "files": [
            "Vehicle/Factories/CarFactory.cs"
          ],
          "declaration": "public static class CarFactory",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Factories.EngineFactory",
          "name": "EngineFactory",
          "kind": "class",
          "group": "Garage.Factories",
          "members": [
            "public static ElectricMotor CreateElectricMotor(string serialNumber, string model, double powerKw, double voltage)",
            "public static FlatEngine CreateFlatEngine(string serialNumber, string model, FuelType fuelType, int horsePower, int displacementCc, int cylinderCount)",
            "public static InlineEngine CreateInlineEngine(string serialNumber, string model, FuelType fuelType, int horsePower, int displacementCc, int cylinderCount)",
            "public static RotaryEngine CreateRotaryEngine(string serialNumber, string model, FuelType fuelType, int horsePower, int displacementCc, int rotorCount)",
            "public static SteamEngine CreateSteamEngine(string serialNumber, string model, FuelType fuelType, int horsePower, double boilerPressureBar)",
            "public static TurbofanEngine CreateTurbofanEngine(string serialNumber, string model, FuelType fuelType, double thrustKn, double bypassRatio)",
            "public static TurbojetEngine CreateTurbojetEngine(string serialNumber, string model, FuelType fuelType, double thrustKn)",
            "public static TurbopropEngine CreateTurbopropEngine(string serialNumber, string model, FuelType fuelType, double thrustKn, int shaftHorsePower)",
            "public static TurboshaftEngine CreateTurboshaftEngine(string serialNumber, string model, FuelType fuelType, double thrustKn, int shaftHorsePower)",
            "public static VEngine CreateVEngine(string serialNumber, string model, FuelType fuelType, int horsePower, int displacementCc, int cylinderCount)"
          ],
          "files": [
            "Vehicle/Factories/EngineFactory.cs"
          ],
          "declaration": "public static class EngineFactory",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Factories.MotorcycleFactory",
          "name": "MotorcycleFactory",
          "kind": "class",
          "group": "Garage.Factories",
          "members": [
            "public static Motorcycle CreateMotorcycle(string registrationNumber, CountryCode countryCode, string manufacturer, string model, int manufacturingYear, VehicleColor color, double weightKg, double lengthMeters, double widthMeters, double heightMeters, string vin, MotorcycleType motorcycleType, bool hasSidecar, int numberOfWheels, int passengerCapacity, int driverSeats, List\u003CEngine\u003E engines)"
          ],
          "files": [
            "Vehicle/Factories/MotorcycleFactory.cs"
          ],
          "declaration": "public static class MotorcycleFactory",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Factories.TruckFactory",
          "name": "TruckFactory",
          "kind": "class",
          "group": "Garage.Factories",
          "members": [
            "public static Truck CreateTruck(string registrationNumber, CountryCode countryCode, string manufacturer, string model, int manufacturingYear, VehicleColor color, double weightKg, double lengthMeters, double widthMeters, double heightMeters, string vin, int numberOfWheels, int numberOfAxles, double maximumLoadKg, List\u003CEngine\u003E engines)"
          ],
          "files": [
            "Vehicle/Factories/TruckFactory.cs"
          ],
          "declaration": "public static class TruckFactory",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Airplane",
          "name": "Airplane",
          "kind": "class",
          "group": "Garage.Vehicles",
          "members": [
            "protected override bool IsValidRegistration(string number, CountryCode countryCode)",
            "public int DriverSeats { get; }",
            "public int NumberOfSeats { get; }",
            "public int NumberOfWheels { get; }",
            "public int PassengerCapacity { get; }",
            "public override VehicleSpecification SpecificationDetails { get; }",
            "public required AirplaneSpecification Specification {  get;  init; }",
            "public required string AirframeSerialNumber {  get;  init; }"
          ],
          "files": [
            "Vehicle/Vehicles/Airplane.cs"
          ],
          "declaration": "public class Airplane",
          "bases": [
            "IHasSeats",
            "IHasWheels",
            "IPassengerCarrier",
            "Vehicle"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Boat",
          "name": "Boat",
          "kind": "class",
          "group": "Garage.Vehicles",
          "members": [
            "protected override bool IsValidRegistration(string number, CountryCode countryCode)",
            "protected override string NormalizeRegistrationNumber(string number)",
            "public bool HasCabin { get; }",
            "public int DriverSeats { get; }",
            "public int NumberOfSeats { get; }",
            "public int PassengerCapacity { get; }",
            "public override VehicleSpecification SpecificationDetails { get; }",
            "public required BoatSpecification Specification {  get;  init; }",
            "public required string Hin {  get;  init; }"
          ],
          "files": [
            "Vehicle/Vehicles/Boat.cs"
          ],
          "declaration": "public class Boat",
          "bases": [
            "IHasSeats",
            "IPassengerCarrier",
            "Vehicle"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Bus",
          "name": "Bus",
          "kind": "class",
          "group": "Garage.Vehicles",
          "members": [
            "public int DriverSeats { get; }",
            "public int NumberOfSeats { get; }",
            "public int NumberOfWheels { get; }",
            "public int PassengerCapacity { get; }",
            "public override VehicleSpecification SpecificationDetails { get; }",
            "public required BusSpecification Specification {  get;  init; }",
            "public required string Vin {  get;  init; }"
          ],
          "files": [
            "Vehicle/Vehicles/Bus.cs"
          ],
          "declaration": "public class Bus",
          "bases": [
            "IHasSeats",
            "IHasWheels",
            "IPassengerCarrier",
            "RoadVehicle"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Car",
          "name": "Car",
          "kind": "class",
          "group": "Garage.Vehicles",
          "members": [
            "public int DriverSeats { get; }",
            "public int NumberOfSeats { get; }",
            "public int NumberOfWheels { get; }",
            "public int PassengerCapacity { get; }",
            "public override VehicleSpecification SpecificationDetails { get; }",
            "public required CarSpecification Specification {  get;  init; }",
            "public required string Vin {  get;  init; }"
          ],
          "files": [
            "Vehicle/Vehicles/Car.cs"
          ],
          "declaration": "public class Car",
          "bases": [
            "IHasSeats",
            "IHasWheels",
            "IPassengerCarrier",
            "RoadVehicle"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Components.Cabin",
          "name": "Cabin",
          "kind": "class",
          "group": "Garage.Vehicles.Components",
          "members": [
            "public required int CrewSeatCount {  get;  init; }",
            "public required int PassengerSeatCount {  get;  init; }"
          ],
          "files": [
            "Vehicle/Vehicles/Components/Cabin.cs"
          ],
          "declaration": "public class Cabin",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Components.Cockpit",
          "name": "Cockpit",
          "kind": "class",
          "group": "Garage.Vehicles.Components",
          "members": [
            "public required bool HasDualControls {  get;  init; }",
            "public required int PilotSeats {  get;  init; }"
          ],
          "files": [
            "Vehicle/Vehicles/Components/Cockpit.cs"
          ],
          "declaration": "public class Cockpit",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Components.Dimensions",
          "name": "Dimensions",
          "kind": "record",
          "group": "Garage.Vehicles.Components",
          "members": [
            "private static double RequirePositiveFinite(double value, string parameterName)",
            "public Dimensions(double lengthMeters, double widthMeters, double heightMeters)",
            "public double HeightMeters {  get; }",
            "public double LengthMeters {  get; }",
            "public double WidthMeters {  get; }"
          ],
          "files": [
            "Vehicle/Vehicles/Components/Dimensions.cs"
          ],
          "declaration": "public sealed record Dimensions",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.CountryCode",
          "name": "CountryCode",
          "kind": "enum",
          "group": "Garage.Vehicles",
          "members": [
            "AUT",
            "BEL",
            "BGR",
            "CYP",
            "CZE",
            "DEU",
            "DNK",
            "ESP",
            "EST",
            "FIN",
            "FRA",
            "GRC",
            "HRV",
            "HUN",
            "IRL",
            "ITA",
            "LTU",
            "LUX",
            "LVA",
            "MLT",
            "NLD",
            "POL",
            "PRT",
            "ROU",
            "SVK",
            "SVN",
            "SWE",
            "Unspecified = 0"
          ],
          "files": [
            "Vehicle/Vehicles/CountryCode.cs"
          ],
          "declaration": "public enum CountryCode",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Interfaces.IHasSeats",
          "name": "IHasSeats",
          "kind": "interface",
          "group": "Garage.Vehicles.Interfaces",
          "members": [
            "int NumberOfSeats {  get; }"
          ],
          "files": [
            "Vehicle/Vehicles/Interfaces/IHasSeats.cs"
          ],
          "declaration": "public interface IHasSeats",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Interfaces.IHasWheels",
          "name": "IHasWheels",
          "kind": "interface",
          "group": "Garage.Vehicles.Interfaces",
          "members": [
            "int NumberOfWheels {  get; }"
          ],
          "files": [
            "Vehicle/Vehicles/Interfaces/IHasWheels.cs"
          ],
          "declaration": "public interface IHasWheels",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Interfaces.IManufacturer",
          "name": "IManufacturer",
          "kind": "interface",
          "group": "Garage.Vehicles.Interfaces",
          "members": [
            "int ManufacturingYear {  get; }",
            "string Manufacturer {  get; }",
            "string Model {  get; }"
          ],
          "files": [
            "Vehicle/Vehicles/Interfaces/IManufacturer.cs"
          ],
          "declaration": "public interface IManufacturer",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Interfaces.IPassengerCarrier",
          "name": "IPassengerCarrier",
          "kind": "interface",
          "group": "Garage.Vehicles.Interfaces",
          "members": [
            "int DriverSeats {  get; }",
            "int PassengerCapacity {  get; }"
          ],
          "files": [
            "Vehicle/Vehicles/Interfaces/IPassengerCarrier.cs"
          ],
          "declaration": "public interface IPassengerCarrier",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Motorcycle",
          "name": "Motorcycle",
          "kind": "class",
          "group": "Garage.Vehicles",
          "members": [
            "public int DriverSeats { get; }",
            "public int NumberOfSeats { get; }",
            "public int NumberOfWheels { get; }",
            "public int PassengerCapacity { get; }",
            "public override VehicleSpecification SpecificationDetails { get; }",
            "public required MotorcycleSpecification Specification {  get;  init; }",
            "public required string Vin {  get;  init; }"
          ],
          "files": [
            "Vehicle/Vehicles/Motorcycle.cs"
          ],
          "declaration": "public class Motorcycle",
          "bases": [
            "IHasSeats",
            "IHasWheels",
            "IPassengerCarrier",
            "RoadVehicle"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.RoadVehicle",
          "name": "RoadVehicle",
          "kind": "class",
          "group": "Garage.Vehicles",
          "members": [
            "protected override bool IsValidRegistration(string number, CountryCode countryCode)",
            "protected override string NormalizeRegistrationNumber(string number)"
          ],
          "files": [
            "Vehicle/Vehicles/RoadVehicle.cs"
          ],
          "declaration": "public abstract class RoadVehicle",
          "bases": [
            "Vehicle"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Specifications.AirplaneSpecification",
          "name": "AirplaneSpecification",
          "kind": "class",
          "group": "Garage.Vehicles.Specifications",
          "members": [
            "public AirplaneSpecification(Cabin cabin, Cockpit? cockpit)",
            "public Cabin Cabin {  get; }",
            "public Cockpit? Cockpit {  get; }",
            "public required double MaximumAltitudeMeters {  get;  init; }",
            "public required double WingspanMeters {  get;  init; }",
            "public required int NumberOfWheels {  get;  init; }"
          ],
          "files": [
            "Vehicle/Vehicles/Specifications/AirplaneSpecification.cs"
          ],
          "declaration": "public class AirplaneSpecification",
          "bases": [
            "VehicleSpecification"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Specifications.BoatSpecification",
          "name": "BoatSpecification",
          "kind": "class",
          "group": "Garage.Vehicles.Specifications",
          "members": [
            "public BoatSpecification(int passengerCapacity, int driverSeats, Cabin? cabin)",
            "public Cabin? Cabin {  get; }",
            "public int DriverSeats {  get; }",
            "public int PassengerCapacity {  get; }",
            "public required BoatType BoatType {  get;  init; }",
            "public required double DraftMeters {  get;  init; }"
          ],
          "files": [
            "Vehicle/Vehicles/Specifications/BoatSpecification.cs"
          ],
          "declaration": "public class BoatSpecification",
          "bases": [
            "VehicleSpecification"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Specifications.BusSpecification",
          "name": "BusSpecification",
          "kind": "class",
          "group": "Garage.Vehicles.Specifications",
          "members": [
            "public BusSpecification(int numberOfDoors, int numberOfWheels, int standingPassengerCapacity, Cabin cabin)",
            "public Cabin Cabin {  get; }",
            "public int NumberOfDoors {  get; }",
            "public int NumberOfWheels {  get; }",
            "public int StandingPassengerCapacity {  get; }"
          ],
          "files": [
            "Vehicle/Vehicles/Specifications/BusSpecification.cs"
          ],
          "declaration": "public class BusSpecification",
          "bases": [
            "VehicleSpecification"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Specifications.CarSpecification",
          "name": "CarSpecification",
          "kind": "class",
          "group": "Garage.Vehicles.Specifications",
          "members": [
            "public required BodyType BodyType {  get;  init; }",
            "public required Cabin Cabin {  get;  init; }",
            "public required int NumberOfDoors {  get;  init; }",
            "public required int NumberOfWheels {  get;  init; }"
          ],
          "files": [
            "Vehicle/Vehicles/Specifications/CarSpecification.cs"
          ],
          "declaration": "public class CarSpecification",
          "bases": [
            "VehicleSpecification"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Specifications.MotorcycleSpecification",
          "name": "MotorcycleSpecification",
          "kind": "class",
          "group": "Garage.Vehicles.Specifications",
          "members": [
            "public required MotorcycleType MotorcycleType {  get;  init; }",
            "public required bool HasSidecar {  get;  init; }",
            "public required int DriverSeats {  get;  init; }",
            "public required int NumberOfWheels {  get;  init; }",
            "public required int PassengerCapacity {  get;  init; }"
          ],
          "files": [
            "Vehicle/Vehicles/Specifications/MotorcycleSpecification.cs"
          ],
          "declaration": "public class MotorcycleSpecification",
          "bases": [
            "VehicleSpecification"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Specifications.TruckSpecification",
          "name": "TruckSpecification",
          "kind": "class",
          "group": "Garage.Vehicles.Specifications",
          "members": [
            "public TruckSpecification(int numberOfWheels, int numberOfAxles, double maximumLoadKg)",
            "public double MaximumLoadKg {  get; }",
            "public int NumberOfAxles {  get; }",
            "public int NumberOfWheels {  get; }"
          ],
          "files": [
            "Vehicle/Vehicles/Specifications/TruckSpecification.cs"
          ],
          "declaration": "public class TruckSpecification",
          "bases": [
            "VehicleSpecification"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Specifications.VehicleSpecification",
          "name": "VehicleSpecification",
          "kind": "class",
          "group": "Garage.Vehicles.Specifications",
          "members": [
            "private List\u003CEngine\u003E engines",
            "public Engine? FindEngine(string serialNumber)",
            "public List\u003CEngine\u003E Engines {  get;  init; }",
            "public bool RemoveEngine(Engine engine)",
            "public const double MaximumLengthMeters",
            "public const int MaximumNumberOfEngines",
            "public const int MaximumNumberOfSeats",
            "public const int MaximumNumberOfWheels",
            "public int FindEngineIndex(string serialNumber)",
            "public required Dimensions Dimensions {  get;  init; }",
            "public required double WeightKg {  get;  init; }",
            "public void AddEngine(Engine engine)"
          ],
          "files": [
            "Vehicle/Vehicles/Specifications/VehicleSpecification.cs"
          ],
          "declaration": "public abstract class VehicleSpecification",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Truck",
          "name": "Truck",
          "kind": "class",
          "group": "Garage.Vehicles",
          "members": [
            "public int NumberOfWheels { get; }",
            "public override VehicleSpecification SpecificationDetails { get; }",
            "public required TruckSpecification Specification {  get;  init; }",
            "public required string Vin {  get;  init; }"
          ],
          "files": [
            "Vehicle/Vehicles/Truck.cs"
          ],
          "declaration": "public class Truck",
          "bases": [
            "IHasWheels",
            "RoadVehicle"
          ]
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Types.BoatType",
          "name": "BoatType",
          "kind": "enum",
          "group": "Garage.Vehicles.Types",
          "members": [
            "CargoShip",
            "Ferry",
            "FishingBoat",
            "Motorboat",
            "Sailboat",
            "Yacht"
          ],
          "files": [
            "Vehicle/Vehicles/Types/BoatType.cs"
          ],
          "declaration": "public enum BoatType",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Types.BodyType",
          "name": "BodyType",
          "kind": "enum",
          "group": "Garage.Vehicles.Types",
          "members": [
            "Convertible",
            "Coupe",
            "Hatchback",
            "Pickup",
            "SUV",
            "Sedan",
            "Van"
          ],
          "files": [
            "Vehicle/Vehicles/Types/BodyType.cs"
          ],
          "declaration": "public enum BodyType",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Types.MotorcycleType",
          "name": "MotorcycleType",
          "kind": "enum",
          "group": "Garage.Vehicles.Types",
          "members": [
            "Cruiser",
            "OffRoad",
            "Scooter",
            "Sport",
            "Standard",
            "Touring"
          ],
          "files": [
            "Vehicle/Vehicles/Types/MotorcycleType.cs"
          ],
          "declaration": "public enum MotorcycleType",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Types.VehicleColor",
          "name": "VehicleColor",
          "kind": "enum",
          "group": "Garage.Vehicles.Types",
          "members": [
            "Black",
            "Blue",
            "Brown",
            "Gray",
            "Green",
            "Orange",
            "Pink",
            "Purple",
            "Red",
            "Silver",
            "White",
            "Yellow"
          ],
          "files": [
            "Vehicle/Vehicles/Types/VehicleColor.cs"
          ],
          "declaration": "public enum VehicleColor",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Validation",
          "name": "Validation",
          "kind": "class",
          "group": "Garage.Vehicles",
          "members": [
            "public static bool IsValidAircraftRegistration(string number, CountryCode countryCode)",
            "public static bool IsValidAircraftRegistration(string number, string countryCode)",
            "public static bool IsValidBoatRegistration(string number, CountryCode countryCode)",
            "public static bool IsValidBoatRegistration(string number, string countryCode)",
            "public static bool IsValidRoadRegistration(string number, CountryCode countryCode)",
            "public static bool IsValidRoadRegistration(string number, string countryCode)"
          ],
          "files": [
            "Vehicle/Vehicles/Validation.cs"
          ],
          "declaration": "public static class Validation",
          "bases": []
        },
        {
          "id": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Vehicle",
          "name": "Vehicle",
          "kind": "class",
          "group": "Garage.Vehicles",
          "members": [
            "private CountryCode _countryCode",
            "private string _registrationNumber",
            "private void ValidateRegistration(string number, CountryCode countryCode)",
            "protected abstract bool IsValidRegistration(string number, CountryCode countryCode)",
            "protected virtual string NormalizeRegistrationNumber(string number)",
            "public abstract VehicleSpecification SpecificationDetails {  get; }",
            "public required CountryCode CountryCode {  get;  init; }",
            "public required VehicleColor Color {  get;  set; }",
            "public required int ManufacturingYear {  get;  init; }",
            "public required string Manufacturer {  get;  init; }",
            "public required string Model {  get;  init; }",
            "public required string RegistrationNumber {  get;  init; }"
          ],
          "files": [
            "Vehicle/Vehicles/Vehicle.cs"
          ],
          "declaration": "public abstract class Vehicle",
          "bases": [
            "IManufacturer"
          ]
        }
      ],
      "edges": [
        {
          "id": "edge:022b3e1a14dc31724b7fee1cc9f79753bedc95e23dfe5b6bcfc6f60147ac32f4",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Specifications.TruckSpecification",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Specifications.VehicleSpecification",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:0477260ef392955ac7dd601a02e6dd06a7d4fd0dac9e3dffd97da5c9cdef79e2",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.RoadVehicle",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Vehicle",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:069ce9f2fb4fcdfaf515309465443692c170bd30489bf39f5631cd90f7c97250",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Motorcycle",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Interfaces.IHasSeats",
          "kind": "realization",
          "label": "implements"
        },
        {
          "id": "edge:0877dd1e17cff097cf7547940c56f223cacf3b1a4a1dcc9cbd8e8d84b73977f7",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Turbine.TurbopropEngine",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Turbine.TurbineEngine",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:1088a0db296c84c273f4a461320c1b2bccfea16f12bdc8a51145af4a479c718d",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.ExternalCombustion.ExternalCombustionEngine",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.Engine",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:12ac0273c5c415804a708a2244e66ac6a00750d8f9d967999cdbcba68f807431",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Boat",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Interfaces.IPassengerCarrier",
          "kind": "realization",
          "label": "implements"
        },
        {
          "id": "edge:12d0eced8c921e485769fa73167f3aa3e30aef247de48171046e5a1f07009864",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Truck",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Interfaces.IHasWheels",
          "kind": "realization",
          "label": "implements"
        },
        {
          "id": "edge:16346e6c00d77d2ebec58848a2abe0419288e4c1e477bd235235e20e3c58c59d",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Truck",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.RoadVehicle",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:17158fc98ca9b3f1dfdc631dd467d2fb17da504032182dca4c4678a5b4eece53",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Airplane",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Interfaces.IPassengerCarrier",
          "kind": "realization",
          "label": "implements"
        },
        {
          "id": "edge:18dc7103c326bf0b76966d527b7270a33a841c9fba44838cfb0a43b7a135b80a",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Motorcycle",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Interfaces.IPassengerCarrier",
          "kind": "realization",
          "label": "implements"
        },
        {
          "id": "edge:1a5d14a9977dd9244170a1f5fe4ad6e1f01913687f74515dee5a69656428676e",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Vehicle",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Interfaces.IManufacturer",
          "kind": "realization",
          "label": "implements"
        },
        {
          "id": "edge:1acbc3eef0e681d85d150625b1e7709ef9d14c623a238934f162ff11969a9a36",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Turbine.TurboshaftEngine",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Turbine.TurbineEngine",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:1cc79c9bb6e0bc9c167eebd6a579983c83486c10f9788fb029424caabfe3a2ca",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Turbine.TurbineEngine",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.InternalCombustionEngine",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:1ee0388e7577e07365865158b4ab01ff8bb290fb7b31b3a08a5af66618d6d8f2",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Specifications.BoatSpecification",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Specifications.VehicleSpecification",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:2669916ae3fbefea9f05dc006a7911e35e438c4ec98f56a00facd10595abb151",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Turbine.TurbojetEngine",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Turbine.TurbineEngine",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:2e119f17157302b7d38ace724a9342c9c97d28e7d878b4b758e790223f442a52",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Boat",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Vehicle",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:2e13822ab28b2fdaca5a12fc20d56c2b7cf5968e39245dc5e8c5c838f9f3b47b",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.TurbofanEngineSpecification",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.TurbineEngineSpecification",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:2e616dbe6662ff54ce352602e57f45ede7ccfdf02d14fcbe174c75849cc6716c",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Airplane",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Interfaces.IHasWheels",
          "kind": "realization",
          "label": "implements"
        },
        {
          "id": "edge:2e9d3f48e8360353834c0fd777c904dc42b99f3dc0634f32986e74efec319176",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.PistonEngineSpecification",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.InternalCombustionEngineSpecification",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:3897a3a9055ed34a11e74e53cfa977d3953c0bcd95a5829a35edd1eea2b5a28b",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.RotaryEngineSpecification",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.InternalCombustionEngineSpecification",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:473f1ad6d3e44706398610615f59cabdf8390a195fc23fb6d31d4707a83ce59d",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.TurboshaftEngineSpecification",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.TurbineEngineSpecification",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:5034d9db508e3f70ebf9c47b33094a4191d7ca273c84a0de1aaa06f7710a19fa",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Bus",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.RoadVehicle",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:5896b53b7c1f396cf39621af17d615ae192a9775477176012473e24902672d13",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Car",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Interfaces.IHasWheels",
          "kind": "realization",
          "label": "implements"
        },
        {
          "id": "edge:625dffec4f262475cd4247835908a4e142e47a5e1f5960d84ed9b8a9bb943f3d",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Car",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.RoadVehicle",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:649d9430564d1353f2b65075adb63c1be440422941461059a87902be41d15856",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Car",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Interfaces.IPassengerCarrier",
          "kind": "realization",
          "label": "implements"
        },
        {
          "id": "edge:6a6ed95e2a5a0b421f52e88810e09f793a4f3e989282e0c4bf4684dc613d89d3",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Motorcycle",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.RoadVehicle",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:707ba3407a8cbf04d0a9ace296da783430414e6d69e8ffcb77431aa330e66f6d",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Piston.VEngine",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Piston.PistonEngine",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:718e92c0044fbc73b204f18e4ce2975e6d79799a75d460f186de602942601a90",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.ExternalCombustionEngineSpecification",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.EngineSpecification",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:71a496c5fed039253666478bd64f9fd3e8be706aec184178988503b20b230cf4",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Bus",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Interfaces.IPassengerCarrier",
          "kind": "realization",
          "label": "implements"
        },
        {
          "id": "edge:7a731b74c76ff42485aa346ca57fcec8b526f93f00aef8edfff74ba96abe75e4",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.Electric.ElectricEngine",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.Engine",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:86587ce2920452fbfa2703d738e9c4f33dfb418eec72d677df160b7ae6c7062d",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Bus",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Interfaces.IHasSeats",
          "kind": "realization",
          "label": "implements"
        },
        {
          "id": "edge:8d9717a8e1448456bd650e8fb074b5303cd7ae983cd38b11c9f2bc0a8203459a",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.Electric.ElectricMotor",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.Electric.ElectricEngine",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:90d42b9cd6bf09c922672da05f47b82483c4d8b0f0c606d6efc0dd8070407dfa",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.TurbineEngineSpecification",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.InternalCombustionEngineSpecification",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:9738fb82ea7d1b59fa4c5dac348862cea4377856cd5f414f29450aa1cbb429f5",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Boat",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Interfaces.IHasSeats",
          "kind": "realization",
          "label": "implements"
        },
        {
          "id": "edge:97a4dd51d1c352518cc4ac30bf5bafc45591e8950a41dcaeab78829f682ca835",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Bus",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Interfaces.IHasWheels",
          "kind": "realization",
          "label": "implements"
        },
        {
          "id": "edge:9ad85e290352b4e86767151088993c7ba93721510a34274fb3e6c52abee40d4e",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Turbine.TurbofanEngine",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Turbine.TurbineEngine",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:a16e2b1f505e409c993a7785731b2113e5e04c21a364392ac37464cd3909aba0",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Specifications.BusSpecification",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Specifications.VehicleSpecification",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:a322b61d5d4f4a67648f1bd1097ec7e4bd816995871bdfd8803a0750ce5e8441",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.InternalCombustionEngineSpecification",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.EngineSpecification",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:a544605688dd58a03421f02bf0cc772415628ca52c047285a579dfd023013705",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Piston.InlineEngine",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Piston.PistonEngine",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:aaecb2910632eebda94ffced29524ab1f9e7b4404fd164e07434aa75de228af9",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.TurbopropEngineSpecification",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.TurbineEngineSpecification",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:b95e1f5be1ee422751f3e7f4bb4069c6d1aa5e35857d2d0b2a7f4c87ca2c5182",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Car",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Interfaces.IHasSeats",
          "kind": "realization",
          "label": "implements"
        },
        {
          "id": "edge:bccf8b07153405a1980537f000b5ba016086388d03579337179c02b70435e29e",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Piston.FlatEngine",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Piston.PistonEngine",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:beb4ebf56bf643dd9f32b042d3ef1712026f6fc7eac7efab428bb784a15a1d9d",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Airplane",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Vehicle",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:d02e5ddbba9d316c5fbd1de73a4b99f9ec88e77b6d4d4609a5e59f29070deadf",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Specifications.CarSpecification",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Specifications.VehicleSpecification",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:d8c42b076af7a519c4ddb42178739bac108cdd64196170eac80c30c65afe381b",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.ElectricEngineSpecification",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.EngineSpecification",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:d8cebce1ecb666a14cdb1e5e60c7ff9ebc91a6e1f7bc963fc2ec73e5b991d220",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.InternalCombustionEngine",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.Engine",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:dc1b6036594cc1f9084b00dfd745b5508fe4b275f58952b2327961e4dc32dd10",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.Piston.PistonEngine",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.InternalCombustionEngine",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:e81b9a2db6aeb6d77e863c4afbdd369e586ef374a0c0988a6da68050aa0529cc",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.SteamEngineSpecification",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.Specifications.ExternalCombustionEngineSpecification",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:e8a5dd51f60c900a71658a0703ba48ee0a84f5445f81386d0e0322e0c5d0c30d",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Airplane",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Interfaces.IHasSeats",
          "kind": "realization",
          "label": "implements"
        },
        {
          "id": "edge:e9ebe2cecc6b59daf539c500841e79330258294829eac5eaffb3e1e11f4a092e",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.ExternalCombustion.SteamEngine",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.ExternalCombustion.ExternalCombustionEngine",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:ed24eb5eb25c16f88667d4f5ae3a5eda7a83da4fd6f7a9c5d309d264b3013579",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Specifications.AirplaneSpecification",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Specifications.VehicleSpecification",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:f0cd4ebe2482b50ed4170edfacd06bd7af3cf96a464f1a0646be64735b87c08d",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Specifications.MotorcycleSpecification",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Specifications.VehicleSpecification",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:f397a0af64264fa8f7a37e2c0f2a4f7dac2fcd0d87677f0b0b44bdd29d50cb60",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.RotaryEngine",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Engines.InternalCombustion.InternalCombustionEngine",
          "kind": "inheritance",
          "label": "inherits"
        },
        {
          "id": "edge:f44e992b5cfad5a81746be269d24b6c2831d2170c4596d4c2cca6a81bb3bc1d5",
          "source": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Motorcycle",
          "target": "type:Vehicle/Vehicle.csproj:Garage.Vehicles.Interfaces.IHasWheels",
          "kind": "realization",
          "label": "implements"
        }
      ]
    }
  }
};
