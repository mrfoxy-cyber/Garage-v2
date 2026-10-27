globalThis.GARAGE_UML_DATA = {
  "version": 4,
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
      "svg": "structural/class/garage-classes.svg",
      "puml": "@startuml\n\u0027 diagram-id: garage-classes\n\u0027 Generated. Run the UML generate command; do not edit by hand.\nhide empty members\nskinparam classAttributeIconSize 0\ntitle Garage classes\npackage \u0022Garage.Diagnostics\u0022 as e_dbf42b10f0c8e363433c {\nclass \u0022ErrorLogger\u0022 as e_da6e02197dc94806bac4 {\n  private const int LabelWidth\n  private static string LogField(string label, object? value)\n  public static bool TryLog(Exception exception, string? operation = null, object? relatedObject = null)\n}\n}\npackage \u0022Garage.Documentation\u0022 as e_58bc520a9f4d579b96d9 {\nclass \u0022SequenceViewAttribute\u0022 as e_921fac54fe9e9970ce7f {\n  primary constructor SequenceViewAttribute(string id)\n  public int MaxDepth \u0026#123;  get;  set; \u0026#125;\n  public string Id \u0026#123;  get; \u0026#125;\n  public string[] ExpandNamespaces \u0026#123;  get;  set; \u0026#125;\n}\nclass \u0022UseCaseAttribute\u0022 as e_70ee0bedbf2ab27c1a4a {\n  primary constructor UseCaseAttribute(string id, string title)\n  public string Actor \u0026#123;  get;  set; \u0026#125;\n  public string Id \u0026#123;  get; \u0026#125;\n  public string Title \u0026#123;  get; \u0026#125;\n}\n}\npackage \u0022Garage.Models\u0022 as e_b9ddcf58f7305c147c98 {\nclass \u0022Garage\u0022 as e_7dfee8d41ffeed65ee04 {\n  [UseCase(\\\u0022remove\\\u0022, \\\u0022Remove parked vehicle\\\u0022)] public GarageOperationResult Remove(string registrationNumber)\n  [UseCase(\\\u0022search\\\u0022, \\\u0022Search parked vehicles\\\u0022)] public IReadOnlyList\u003CVehicle\u003E Search(VehicleSearchCriteria criteria)\n  private Garage(string garageName, int capacity, List\u003CVehicle\u003E initialVehicles, IReadOnlyList\u003CDimensions\u003E? spotDimensions)\n  private bool RegistrationExists(string registrationNumber)\n  private readonly List\u003CParkingSpot\u003E parkingSpots\n  private static ParkingResult DuplicateRegistration(Vehicle vehicle)\n  public Garage(string garageName, IReadOnlyList\u003CDimensions\u003E spotDimensions, List\u003CVehicle\u003E? initialVehicles = null)\n  public Garage(string garageName, List\u003CVehicle\u003E vehicles)\n  public Garage(string garageName, int capacity)\n  public Garage(string garageName, int capacity, List\u003CVehicle\u003E initialVehicles)\n  public GarageOperationResult RemoveAtSpot(int spotNumber)\n  public IReadOnlyList\u003CParkedVehicleInfo\u003E ParkedVehicles \u0026#123; get; \u0026#125;\n  public IReadOnlyList\u003CParkingSpotInfo\u003E SpotDetails \u0026#123; get; \u0026#125;\n  public IReadOnlyList\u003CVehicle\u003E Vehicles \u0026#123; get; \u0026#125;\n  public IReadOnlyList\u003CVehicleTypeGroup\u003E VehiclesByType \u0026#123; get; \u0026#125;\n  public IReadOnlyList\u003Cint\u003E AvailableSpotsFor(Vehicle vehicle)\n  public ParkedVehicleInfo? FindVehicleByRegistration(string registrationNumber)\n  public ParkingResult Park(Vehicle vehicle)\n  public ParkingResult Park(Vehicle vehicle, int spot)\n  public const int MaximumGarageCapacity\n  public int AvailableSpaces \u0026#123; get; \u0026#125;\n  public int Capacity \u0026#123;  get; \u0026#125;\n  public int OccupiedSpaces \u0026#123; get; \u0026#125;\n  public string GarageName \u0026#123;  get; \u0026#125;\n}\nclass \u0022ParkingSpot\u0022 as e_811191dd1ddf83d5085a {\n  public Dimensions? Dimensions \u0026#123;  get; \u0026#125;\n  public ParkingSpot(int number, Dimensions? dimensions)\n  public Vehicle? Vehicle \u0026#123;  get; private set; \u0026#125;\n  public bool Fits(Vehicle vehicle)\n  public int Number \u0026#123;  get; \u0026#125;\n  public void Clear()\n  public void Park(Vehicle vehicle)\n}\nclass \u0022VehicleCatalog\u0022 as e_8007237a91b460f18c21 {\n  internal void Add(Vehicle vehicle)\n  private readonly List\u003CVehicle\u003E vehicles\n  public IReadOnlyList\u003CVehicle\u003E Vehicles \u0026#123; get; \u0026#125;\n  public VehicleCatalog(List\u003CVehicle\u003E? initialVehicles = null)\n  public bool ContainsRegistration(string registrationNumber)\n}\n}\npackage \u0022Garage.Persistence.Json\u0022 as e_476c3ab7c0020fdf9044 {\nclass \u0022GarageJsonLoader\u0022 as e_903b8aec249a8f7a706d {\n  private static Dimensions ToDimensions(SpotSizeSpecification size, string location)\n  private static GaragePlacementSpecification ReadPlacementSpecification(string path)\n  private static GarageSpecification ReadGarageSpecification(string path)\n  private static string ReadJson(string path)\n  private static void ApplyPlacements(VehicleGarage garage, string placementPath)\n  public static VehicleGarage Load(string configurationPath, string? placementPath = null)\n}\nclass \u0022JsonSettings\u0022 as e_4ee1080be52a7f58e2dc {\n  private static JsonSerializerOptions Create()\n  public static JsonSerializerOptions Options \u0026#123;  get; \u0026#125;\n}\nclass \u0022VehicleJsonLoader\u0022 as e_4562483796623659cd4a {\n  public static List\u003CVehicle\u003E LoadVehicles(string? filePath = null)\n  public static Vehicle LoadVehicle(string filePath)\n}\nclass \u0022VehicleJsonMapper\u0022 as e_7166fdfe73ef51bfec0f {\n  private static Airplane CreateAirplane(VehicleJsonContract seed)\n  private static Boat CreateBoat(VehicleJsonContract seed)\n  private static BoatType Require(BoatType? value, VehicleJsonContract seed, string propertyName)\n  private static BodyType Require(BodyType? value, VehicleJsonContract seed, string propertyName)\n  private static Bus CreateBus(VehicleJsonContract seed)\n  private static Car CreateCar(VehicleJsonContract seed)\n  private static Engine CreateEngine(EngineJsonContract seed)\n  private static FuelType Require(FuelType? value, EngineJsonContract seed, string propertyName)\n  private static InvalidDataException MissingProperty(VehicleJsonContract seed, string propertyName)\n  private static List\u003CEngine\u003E CreateEngines(VehicleJsonContract vehicle)\n  private static Motorcycle CreateMotorcycle(VehicleJsonContract seed)\n  private static MotorcycleType Require(MotorcycleType? value, VehicleJsonContract seed, string propertyName)\n  private static Truck CreateTruck(VehicleJsonContract seed)\n  private static bool Require(bool? value, VehicleJsonContract seed, string propertyName)\n  private static double Require(double? value, EngineJsonContract seed, string propertyName)\n  private static double Require(double? value, VehicleJsonContract seed, string propertyName)\n  private static int Require(int? value, EngineJsonContract seed, string propertyName)\n  private static int Require(int? value, VehicleJsonContract seed, string propertyName)\n  private static string Require(string? value, EngineJsonContract seed, string propertyName)\n  private static string Require(string? value, VehicleJsonContract seed, string propertyName)\n  public static Vehicle Create(VehicleJsonContract seed)\n}\ne_903b8aec249a8f7a706d -[hidden]down-\u003E e_7166fdfe73ef51bfec0f\n}\npackage \u0022Garage.Persistence.Json.Contracts\u0022 as e_8204406925242146cdfc {\nclass \u0022EngineJsonContract\u0022 as e_ed20c6e09ee59dfe8f2b {\n  public FuelType? FuelType \u0026#123;  get;  init; \u0026#125;\n  public double? BoilerPressureBar \u0026#123;  get;  init; \u0026#125;\n  public double? BypassRatio \u0026#123;  get;  init; \u0026#125;\n  public double? PowerKw \u0026#123;  get;  init; \u0026#125;\n  public double? ThrustKn \u0026#123;  get;  init; \u0026#125;\n  public double? Voltage \u0026#123;  get;  init; \u0026#125;\n  public int? CylinderCount \u0026#123;  get;  init; \u0026#125;\n  public int? DisplacementCc \u0026#123;  get;  init; \u0026#125;\n  public int? HorsePower \u0026#123;  get;  init; \u0026#125;\n  public int? RotorCount \u0026#123;  get;  init; \u0026#125;\n  public int? ShaftHorsePower \u0026#123;  get;  init; \u0026#125;\n  public required string Model \u0026#123;  get;  init; \u0026#125;\n  public required string SerialNumber \u0026#123;  get;  init; \u0026#125;\n  public required string Type \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022VehicleJsonContract\u0022 as e_4dcd30dc05bd52c59667 {\n  public BoatType? BoatType \u0026#123;  get;  init; \u0026#125;\n  public BodyType? BodyType \u0026#123;  get;  init; \u0026#125;\n  public List\u003CEngineJsonContract\u003E Engines \u0026#123;  get;  init; \u0026#125;\n  public MotorcycleType? MotorcycleType \u0026#123;  get;  init; \u0026#125;\n  public bool? HasCabin \u0026#123;  get;  init; \u0026#125;\n  public bool? HasDualControls \u0026#123;  get;  init; \u0026#125;\n  public bool? HasSidecar \u0026#123;  get;  init; \u0026#125;\n  public double? DraftMeters \u0026#123;  get;  init; \u0026#125;\n  public double? MaximumAltitudeMeters \u0026#123;  get;  init; \u0026#125;\n  public double? MaximumLoadKg \u0026#123;  get;  init; \u0026#125;\n  public double? WingspanMeters \u0026#123;  get;  init; \u0026#125;\n  public int? CabinCrewSeatCount \u0026#123;  get;  init; \u0026#125;\n  public int? CabinPassengerSeatCount \u0026#123;  get;  init; \u0026#125;\n  public int? CrewSeatCount \u0026#123;  get;  init; \u0026#125;\n  public int? DriverSeatCount \u0026#123;  get;  init; \u0026#125;\n  public int? DriverSeats \u0026#123;  get;  init; \u0026#125;\n  public int? NumberOfAxles \u0026#123;  get;  init; \u0026#125;\n  public int? NumberOfDoors \u0026#123;  get;  init; \u0026#125;\n  public int? NumberOfSeats \u0026#123;  get;  init; \u0026#125;\n  public int? NumberOfWheels \u0026#123;  get;  init; \u0026#125;\n  public int? PassengerCapacity \u0026#123;  get;  init; \u0026#125;\n  public int? PassengerSeatCount \u0026#123;  get;  init; \u0026#125;\n  public int? PilotSeatCount \u0026#123;  get;  init; \u0026#125;\n  public int? StandingPassengerCapacity \u0026#123;  get;  init; \u0026#125;\n  public required CountryCode CountryCode \u0026#123;  get;  init; \u0026#125;\n  public required VehicleColor Color \u0026#123;  get;  init; \u0026#125;\n  public required double HeightMeters \u0026#123;  get;  init; \u0026#125;\n  public required double LengthMeters \u0026#123;  get;  init; \u0026#125;\n  public required double WeightKg \u0026#123;  get;  init; \u0026#125;\n  public required double WidthMeters \u0026#123;  get;  init; \u0026#125;\n  public required int ManufacturingYear \u0026#123;  get;  init; \u0026#125;\n  public required string Manufacturer \u0026#123;  get;  init; \u0026#125;\n  public required string Model \u0026#123;  get;  init; \u0026#125;\n  public required string RegistrationNumber \u0026#123;  get;  init; \u0026#125;\n  public required string Type \u0026#123;  get;  init; \u0026#125;\n  public string? AirframeSerialNumber \u0026#123;  get;  init; \u0026#125;\n  public string? Hin \u0026#123;  get;  init; \u0026#125;\n  public string? Vin \u0026#123;  get;  init; \u0026#125;\n}\n}\npackage \u0022Garage.Queries\u0022 as e_2fd8126a30ec979b387a {\nclass \u0022ParkedVehicleInfo\u0022 as e_a63aa2e3b7d62db15b04 {\n  primary constructor ParkedVehicleInfo(int SpotNumber, Vehicle Vehicle)\n}\nclass \u0022ParkingSpotInfo\u0022 as e_7ebc156d8765fc753f71 {\n  primary constructor ParkingSpotInfo(int SpotNumber, Dimensions? Dimensions, bool IsOccupied)\n}\nclass \u0022VehicleSearch\u0022 as e_786fb28f30ca0563d04e {\n  private static bool MatchesMeasurement(double actual, double expected)\n  public static bool Matches(Vehicle vehicle, VehicleSearchCriteria criteria)\n}\nclass \u0022VehicleSearchCriteria\u0022 as e_c0c4dd04000b12cbf930 {\n  public BoatType? BoatType \u0026#123;  get;  init; \u0026#125;\n  public BodyType? BodyType \u0026#123;  get;  init; \u0026#125;\n  public Garage.Engines.FuelType? FuelType \u0026#123;  get;  init; \u0026#125;\n  public IReadOnlyList\u003CType\u003E VehicleTypes \u0026#123;  get;  init; \u0026#125;\n  public MotorcycleType? MotorcycleType \u0026#123;  get;  init; \u0026#125;\n  public VehicleColor? Color \u0026#123;  get;  init; \u0026#125;\n  public bool? HasSidecar \u0026#123;  get;  init; \u0026#125;\n  public double? CylinderVolumeCc \u0026#123;  get;  init; \u0026#125;\n  public double? DraftMeters \u0026#123;  get;  init; \u0026#125;\n  public double? LengthMeters \u0026#123;  get;  init; \u0026#125;\n  public double? MaximumAltitudeMeters \u0026#123;  get;  init; \u0026#125;\n  public double? MaximumLoadKg \u0026#123;  get;  init; \u0026#125;\n  public double? WingspanMeters \u0026#123;  get;  init; \u0026#125;\n  public int? ManufacturingYear \u0026#123;  get;  init; \u0026#125;\n  public int? NumberOfAxles \u0026#123;  get;  init; \u0026#125;\n  public int? NumberOfEngines \u0026#123;  get;  init; \u0026#125;\n  public int? NumberOfSeats \u0026#123;  get;  init; \u0026#125;\n  public int? NumberOfWheels \u0026#123;  get;  init; \u0026#125;\n  public int? StandingPassengerCapacity \u0026#123;  get;  init; \u0026#125;\n  public string? Manufacturer \u0026#123;  get;  init; \u0026#125;\n  public string? Model \u0026#123;  get;  init; \u0026#125;\n  public string? RegistrationNumber \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022VehicleTypeGroup\u0022 as e_35e800f198b950258c82 {\n  primary constructor VehicleTypeGroup(string VehicleType, IReadOnlyList\u003CParkedVehicleInfo\u003E Vehicles)\n}\ne_a63aa2e3b7d62db15b04 -[hidden]down-\u003E e_c0c4dd04000b12cbf930\ne_7ebc156d8765fc753f71 -[hidden]down-\u003E e_35e800f198b950258c82\n}\npackage \u0022Garage.Results\u0022 as e_42481b28c8686aad515e {\nclass \u0022GarageCreationResult\u0022 as e_7a8fe0cab2cc81d3135a {\n  private GarageCreationResult(VehicleGarage? garage, string message, OperationError error)\n  public OperationError Error \u0026#123;  get; \u0026#125;\n  public VehicleGarage? Garage \u0026#123;  get; \u0026#125;\n  public bool Success \u0026#123; get; \u0026#125;\n  public static GarageCreationResult Completed(VehicleGarage garage)\n  public static GarageCreationResult Failed(string message, OperationError error = OperationError.ValidationFailed)\n  public string Message \u0026#123;  get; \u0026#125;\n}\nclass \u0022GarageOperationResult\u0022 as e_a7bb27afefc092f6c63e {\n  private GarageOperationResult(int? spotNumber, string message, OperationError error)\n  public OperationError Error \u0026#123;  get; \u0026#125;\n  public bool Success \u0026#123; get; \u0026#125;\n  public int? SpotNumber \u0026#123;  get; \u0026#125;\n  public static GarageOperationResult Completed(int spotNumber, string message)\n  public static GarageOperationResult Failed(string message, OperationError error)\n  public string Message \u0026#123;  get; \u0026#125;\n}\nenum \u0022OperationError\u0022 as e_68ff88246a3b0f165654 {\n  Cancelled\n  DuplicateGarageName\n  DuplicateRegistration\n  FileAccessDenied\n  FileNotFound\n  FileReadFailed\n  GarageFull\n  InvalidJson\n  None\n  SpotEmpty\n  SpotOccupied\n  SpotOutOfRange\n  UnsupportedOperation\n  ValidationFailed\n  VehicleAlreadyParked\n  VehicleDoesNotFit\n  VehicleNotFound\n}\nclass \u0022ParkingResult\u0022 as e_3f3a1c4fa9997c8247b6 {\n  private ParkingResult(int? spotNumber, string message, OperationError error)\n  public OperationError Error \u0026#123;  get; \u0026#125;\n  public bool Success \u0026#123; get; \u0026#125;\n  public int? SpotNumber \u0026#123;  get; \u0026#125;\n  public static ParkingResult Completed(int spotNumber, string message)\n  public static ParkingResult Failed(string message, OperationError error)\n  public string Message \u0026#123;  get; \u0026#125;\n}\nclass \u0022VehicleCreationResult\u0022 as e_8bad896b706bf4731d84 {\n  private VehicleCreationResult(Vehicle? vehicle, string message, OperationError error, ParkingResult? parking = null)\n  public OperationError Error \u0026#123;  get; \u0026#125;\n  public ParkingResult? Parking \u0026#123;  get; \u0026#125;\n  public Vehicle? Vehicle \u0026#123;  get; \u0026#125;\n  public bool Cancelled \u0026#123; get; \u0026#125;\n  public bool Success \u0026#123; get; \u0026#125;\n  public static VehicleCreationResult Cancel()\n  public static VehicleCreationResult Completed(Vehicle vehicle, ParkingResult? parking = null, string? message = null)\n  public static VehicleCreationResult Failed(string message, OperationError error = OperationError.ValidationFailed)\n  public string Message \u0026#123;  get; \u0026#125;\n}\ne_7a8fe0cab2cc81d3135a -[hidden]down-\u003E e_3f3a1c4fa9997c8247b6\ne_a7bb27afefc092f6c63e -[hidden]down-\u003E e_8bad896b706bf4731d84\n}\npackage \u0022Garage.Services\u0022 as e_9fc3ece9d1004ca21814 {\nclass \u0022ExpectedFailure\u0022 as e_fd3daa564fa221428833 {\n  public static OperationError Code(Exception exception)\n  public static bool IsExpected(Exception exception)\n}\nclass \u0022GarageService\u0022 as e_6dd2ac09b188a18419a6 {\n  [UseCase(\\\u0022create-garage\\\u0022, \\\u0022Create or import garage\\\u0022)] public GarageCreationResult CreateGarage(string name, int capacity)\n  [UseCase(\\\u0022create-garage\\\u0022, \\\u0022Create or import garage\\\u0022)] public GarageCreationResult CreateGarageFromJson(string configurationPath, string? placementPath = null)\n  [UseCase(\\\u0022park-vehicle\\\u0022, \\\u0022Park vehicle\\\u0022)] [SequenceView(\\\u0022parking-sequence\\\u0022, MaxDepth = 3, ExpandNamespaces = new[] \u0026#123; \\\u0022Garage.Services\\\u0022, \\\u0022Garage.Models\\\u0022 \u0026#125;)] public ParkingResult Park(Vehicle vehicle, VehicleGarage garage, int? spotNumber = null)\n  private GarageCreationResult CreateAndRegister(Func\u003CVehicleGarage\u003E factory)\n  private GarageCreationResult RegisterGarage(VehicleGarage garage)\n  private ParkingResult ParkNewVehicle(Vehicle vehicle, VehicleGarage garage, int? spotNumber)\n  private readonly List\u003CVehicleGarage\u003E garages\n  public GarageCreationResult CreateGarage(string name, IReadOnlyList\u003CDimensions\u003E sizes)\n  public GarageService(List\u003CVehicleGarage\u003E initialGarages, List\u003CVehicle\u003E initialVehicles)\n  public IReadOnlyList\u003CVehicle\u003E GetParkableVehicles(VehicleGarage garage, int? spotNumber = null)\n  public IReadOnlyList\u003CVehicleGarage\u003E Garages \u0026#123; get; \u0026#125;\n  public VehicleCatalog Catalog \u0026#123;  get; \u0026#125;\n  public VehicleCreationService VehicleCreation \u0026#123;  get; \u0026#125;\n  public bool ContainsGarage(string name)\n  public bool IsParked(Vehicle vehicle)\n}\nclass \u0022VehicleCreationService\u0022 as e_30eac2cea220d48d859f {\n  [UseCase(\\\u0022create-vehicle\\\u0022, \\\u0022Create or import vehicle\\\u0022)] public VehicleCreationResult Create(Func\u003CVehicle\u003E factory, VehicleGarage? targetGarage = null, int? spotNumber = null)\n  [UseCase(\\\u0022create-vehicle\\\u0022, \\\u0022Create or import vehicle\\\u0022)] public VehicleCreationResult FromJson(string path, VehicleGarage? targetGarage = null, int? spotNumber = null)\n  internal VehicleCreationService(VehicleCatalog catalog, Func\u003CVehicle, VehicleGarage, int?, ParkingResult\u003E park)\n  private readonly Func\u003CVehicle, VehicleGarage, int?, ParkingResult\u003E park\n  private readonly VehicleCatalog catalog\n}\n}\npackage \u0022Garage.Specifications\u0022 as e_c9f6e67955b27c88b5f3 {\nclass \u0022GaragePlacementSpecification\u0022 as e_4e294155336cf7b2de83 {\n  public IReadOnlyList\u003CSpotAssignment\u003E? Assignments \u0026#123;  get;  init; \u0026#125;\n  public string? GarageName \u0026#123;  get;  init; \u0026#125;\n  public string? VehiclesFile \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022GarageSpecification\u0022 as e_78586a18a36e889092ac {\n  public IReadOnlyList\u003CSpotSpecification\u003E? Spots \u0026#123;  get;  init; \u0026#125;\n  public SpotSizeSpecification? DefaultSpotSize \u0026#123;  get;  init; \u0026#125;\n  public int Capacity \u0026#123;  get;  init; \u0026#125;\n  public string? GarageName \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022SpotAssignment\u0022 as e_1aea9a100b328e430774 {\n  public int SpotNumber \u0026#123;  get;  init; \u0026#125;\n  public string? RegistrationNumber \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022SpotSizeSpecification\u0022 as e_62a255ce3df8795d721f {\n  public double HeightMeters \u0026#123;  get;  init; \u0026#125;\n  public double LengthMeters \u0026#123;  get;  init; \u0026#125;\n  public double WidthMeters \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022SpotSpecification\u0022 as e_bf4e409810d4cca546f1 {\n  public SpotSizeSpecification? Size \u0026#123;  get;  init; \u0026#125;\n  public int SpotNumber \u0026#123;  get;  init; \u0026#125;\n}\ne_4e294155336cf7b2de83 -[hidden]down-\u003E e_62a255ce3df8795d721f\ne_78586a18a36e889092ac -[hidden]down-\u003E e_bf4e409810d4cca546f1\n}\ne_dbf42b10f0c8e363433c -[hidden]down-\u003E e_58bc520a9f4d579b96d9\ne_58bc520a9f4d579b96d9 -[hidden]down-\u003E e_b9ddcf58f7305c147c98\ne_b9ddcf58f7305c147c98 -[hidden]down-\u003E e_476c3ab7c0020fdf9044\ne_476c3ab7c0020fdf9044 -[hidden]down-\u003E e_8204406925242146cdfc\ne_8204406925242146cdfc -[hidden]down-\u003E e_2fd8126a30ec979b387a\ne_2fd8126a30ec979b387a -[hidden]down-\u003E e_42481b28c8686aad515e\ne_42481b28c8686aad515e -[hidden]down-\u003E e_9fc3ece9d1004ca21814\ne_9fc3ece9d1004ca21814 -[hidden]down-\u003E e_c9f6e67955b27c88b5f3\nlegend bottom\n  \u003Cb\u003EHow to read this class diagram\u003C/b\u003E\n  Child --|\u003E Parent : solid line \u002B hollow triangle = inherits from\n  Class ..|\u003E Interface : dashed line \u002B hollow triangle = implements\n  The triangle points to the parent class or interface.\n  C = class; A = abstract class; I = interface; E = enum; S = struct.\n  Boxes group members; folder-shaped boxes group namespaces.\n  public / \u002B = accessible publicly; private / - = within the class\n  protected / # = class and derived classes; internal = same assembly\n  Type Name = field/property; Name(...) = method or constructor.\n  --- Related diagrams ---\n  [[../component/garage-components.puml Garage project components]]\n  [[../package/garage-packages.puml Garage projects and namespaces]]\nendlegend\n@enduml\n",
      "pumlHash": "f806f654b2899dbfe2c47ee23b47d917ae51d2e3dbbc8ed661ad55cc763af066"
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
      "svg": "structural/class/vehicle-classes.svg",
      "puml": "@startuml\n\u0027 diagram-id: vehicle-classes\n\u0027 Generated. Run the UML generate command; do not edit by hand.\nhide empty members\nskinparam classAttributeIconSize 0\ntitle Vehicle classes\npackage \u0022Garage.Engines\u0022 as e_d25b35cc5e9cbf957375 {\nabstract class \u0022Engine\u0022 as e_ae79f14028ac38341ec2 {\n  public abstract EngineSpecification SpecificationDetails \u0026#123;  get; \u0026#125;\n  public bool Equals(Engine? other)\n  public override bool Equals(object? obj)\n  public override int GetHashCode()\n  public required string Model \u0026#123;  get;  init; \u0026#125;\n  public required string SerialNumber \u0026#123;  get;  init; \u0026#125;\n  public virtual FuelType? FuelType \u0026#123; get; \u0026#125;\n  public virtual double? CylinderVolumeCc \u0026#123; get; \u0026#125;\n}\nenum \u0022FuelType\u0022 as e_e57f68dac3de5e01515e {\n  AviationGasoline\n  Biofuel\n  Coal\n  Diesel\n  Electricity\n  Ethanol\n  Gasoline\n  Hydrogen\n  JetFuel\n  Kerosene\n  LPG\n  Wood\n}\n}\npackage \u0022Garage.Engines.Electric\u0022 as e_4fb15c92477ef3d25afd {\nabstract class \u0022ElectricEngine\u0022 as e_e2bfb432fcb5dc617e4a {\n  public override EngineSpecification SpecificationDetails \u0026#123; get; \u0026#125;\n  public required ElectricEngineSpecification Specification \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022ElectricMotor\u0022 as e_1cd2a85a51fcdcddbbba {\n}\n}\npackage \u0022Garage.Engines.ExternalCombustion\u0022 as e_ffc24e302ec4a41892fb {\nabstract class \u0022ExternalCombustionEngine\u0022 as e_991da71dd6e56149634c {\n  protected abstract ExternalCombustionEngineSpecification CombustionSpecification \u0026#123;  get; \u0026#125;\n  public override FuelType? FuelType \u0026#123; get; \u0026#125;\n}\nclass \u0022SteamEngine\u0022 as e_8b0c519c6865a53d4708 {\n  protected override ExternalCombustionEngineSpecification CombustionSpecification \u0026#123; get; \u0026#125;\n  public override EngineSpecification SpecificationDetails \u0026#123; get; \u0026#125;\n  public required SteamEngineSpecification Specification \u0026#123;  get;  init; \u0026#125;\n}\n}\npackage \u0022Garage.Engines.InternalCombustion\u0022 as e_925b26288a3167c917a5 {\nabstract class \u0022InternalCombustionEngine\u0022 as e_2c1fcb11be9df520808b {\n  protected abstract InternalCombustionEngineSpecification CombustionSpecification \u0026#123;  get; \u0026#125;\n  public override FuelType? FuelType \u0026#123; get; \u0026#125;\n}\nclass \u0022RotaryEngine\u0022 as e_b1c0e497c00b9b143fb7 {\n  protected override InternalCombustionEngineSpecification CombustionSpecification \u0026#123; get; \u0026#125;\n  public override EngineSpecification SpecificationDetails \u0026#123; get; \u0026#125;\n  public required RotaryEngineSpecification Specification \u0026#123;  get;  init; \u0026#125;\n}\n}\npackage \u0022Garage.Engines.InternalCombustion.Piston\u0022 as e_817e8ec22c96df6329fd {\nclass \u0022FlatEngine\u0022 as e_2b692529df7fd0dee460 {\n}\nclass \u0022InlineEngine\u0022 as e_3465f28790c681aa4afd {\n}\nabstract class \u0022PistonEngine\u0022 as e_0d01c86c193d7267889e {\n  protected override InternalCombustionEngineSpecification CombustionSpecification \u0026#123; get; \u0026#125;\n  public override EngineSpecification SpecificationDetails \u0026#123; get; \u0026#125;\n  public override double? CylinderVolumeCc \u0026#123; get; \u0026#125;\n  public required PistonEngineSpecification Specification \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022VEngine\u0022 as e_12495ccd87dd4ff66765 {\n}\ne_2b692529df7fd0dee460 -[hidden]down-\u003E e_12495ccd87dd4ff66765\n}\npackage \u0022Garage.Engines.InternalCombustion.Turbine\u0022 as e_e1d0347b640935145973 {\nabstract class \u0022TurbineEngine\u0022 as e_a7217f414ac87c733352 {\n  protected abstract TurbineEngineSpecification TurbineSpecification \u0026#123;  get; \u0026#125;\n  protected override InternalCombustionEngineSpecification CombustionSpecification \u0026#123; get; \u0026#125;\n}\nclass \u0022TurbofanEngine\u0022 as e_84b7c157e26ee0d2b8b9 {\n  protected override TurbineEngineSpecification TurbineSpecification \u0026#123; get; \u0026#125;\n  public override EngineSpecification SpecificationDetails \u0026#123; get; \u0026#125;\n  public required TurbofanEngineSpecification Specification \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022TurbojetEngine\u0022 as e_2fed3a099c36d18e506b {\n  protected override TurbineEngineSpecification TurbineSpecification \u0026#123; get; \u0026#125;\n  public override EngineSpecification SpecificationDetails \u0026#123; get; \u0026#125;\n  public required TurbineEngineSpecification Specification \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022TurbopropEngine\u0022 as e_e60172641e602fc44c6d {\n  protected override TurbineEngineSpecification TurbineSpecification \u0026#123; get; \u0026#125;\n  public override EngineSpecification SpecificationDetails \u0026#123; get; \u0026#125;\n  public required TurbopropEngineSpecification Specification \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022TurboshaftEngine\u0022 as e_5577f74ad1f062a49b93 {\n  protected override TurbineEngineSpecification TurbineSpecification \u0026#123; get; \u0026#125;\n  public override EngineSpecification SpecificationDetails \u0026#123; get; \u0026#125;\n  public required TurboshaftEngineSpecification Specification \u0026#123;  get;  init; \u0026#125;\n}\ne_a7217f414ac87c733352 -[hidden]down-\u003E e_e60172641e602fc44c6d\ne_84b7c157e26ee0d2b8b9 -[hidden]down-\u003E e_5577f74ad1f062a49b93\n}\npackage \u0022Garage.Engines.Specifications\u0022 as e_096a61039dfdbf71d93c {\nclass \u0022ElectricEngineSpecification\u0022 as e_b332c28c8fc6332f04ac {\n  public required double PowerKw \u0026#123;  get;  init; \u0026#125;\n  public required double Voltage \u0026#123;  get;  init; \u0026#125;\n}\nabstract class \u0022EngineSpecification\u0022 as e_ed6d36f0b54c5731b9f7 {\n}\nabstract class \u0022ExternalCombustionEngineSpecification\u0022 as e_70fcbd8b2f8c14d33128 {\n  public required FuelType FuelType \u0026#123;  get;  init; \u0026#125;\n}\nabstract class \u0022InternalCombustionEngineSpecification\u0022 as e_1106589992520cf7cde2 {\n  public required FuelType FuelType \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022PistonEngineSpecification\u0022 as e_79f82df70d4b4b6c05a8 {\n  public const double MaximumCylinderVolumeCc\n  public double? CylinderVolumeCc \u0026#123; get; \u0026#125;\n  public required int CylinderCount \u0026#123;  get;  init; \u0026#125;\n  public required int DisplacementCc \u0026#123;  get;  init; \u0026#125;\n  public required int HorsePower \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022RotaryEngineSpecification\u0022 as e_edcd3119332684aca799 {\n  public required int DisplacementCc \u0026#123;  get;  init; \u0026#125;\n  public required int HorsePower \u0026#123;  get;  init; \u0026#125;\n  public required int RotorCount \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022SteamEngineSpecification\u0022 as e_ce97cf9635118f1e941a {\n  public required double BoilerPressureBar \u0026#123;  get;  init; \u0026#125;\n  public required int HorsePower \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022TurbineEngineSpecification\u0022 as e_52775f84595874f0a8a1 {\n  public required double ThrustKn \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022TurbofanEngineSpecification\u0022 as e_f7bee5bce899d5ed7f80 {\n  public required double BypassRatio \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022TurbopropEngineSpecification\u0022 as e_946c9257d3797b3dffde {\n  public required int ShaftHorsePower \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022TurboshaftEngineSpecification\u0022 as e_57e192654551bae89d6d {\n  public required int ShaftHorsePower \u0026#123;  get;  init; \u0026#125;\n}\ne_b332c28c8fc6332f04ac -[hidden]down-\u003E e_1106589992520cf7cde2\ne_ed6d36f0b54c5731b9f7 -[hidden]down-\u003E e_79f82df70d4b4b6c05a8\ne_70fcbd8b2f8c14d33128 -[hidden]down-\u003E e_edcd3119332684aca799\ne_1106589992520cf7cde2 -[hidden]down-\u003E e_ce97cf9635118f1e941a\ne_79f82df70d4b4b6c05a8 -[hidden]down-\u003E e_52775f84595874f0a8a1\ne_edcd3119332684aca799 -[hidden]down-\u003E e_f7bee5bce899d5ed7f80\ne_ce97cf9635118f1e941a -[hidden]down-\u003E e_946c9257d3797b3dffde\ne_52775f84595874f0a8a1 -[hidden]down-\u003E e_57e192654551bae89d6d\n}\npackage \u0022Garage.Factories\u0022 as e_6714d1b223fd6cf1cb95 {\nclass \u0022AirplaneFactory\u0022 as e_4d5bdc8ef7f02f4ee42b {\n  public static Airplane CreateAirplane(string registrationNumber, CountryCode countryCode, string manufacturer, string model, int manufacturingYear, VehicleColor color, double weightKg, int numberOfWheels, double lengthMeters, double wingspanMeters, double heightMeters, string airframeSerialNumber, int passengerSeatCount, int crewSeatCount, int pilotSeatCount, bool hasDualControls, double maximumAltitudeMeters, List\u003CEngine\u003E engines)\n}\nclass \u0022BoatFactory\u0022 as e_3b4168af4d9f254e4fea {\n  public static Boat CreateBoat(string registrationNumber, CountryCode countryCode, string manufacturer, string model, int manufacturingYear, VehicleColor color, double weightKg, double lengthMeters, double widthMeters, double heightMeters, string hin, double draftMeters, BoatType boatType, int passengerCapacity, int driverSeats, bool hasCabin, int cabinPassengerSeatCount, int cabinCrewSeatCount, List\u003CEngine\u003E engines)\n}\nclass \u0022BusFactory\u0022 as e_183ac3637c0b736646bd {\n  public static Bus CreateBus(string registrationNumber, CountryCode countryCode, string manufacturer, string model, int manufacturingYear, VehicleColor color, double weightKg, double lengthMeters, double widthMeters, double heightMeters, string vin, int numberOfDoors, int numberOfWheels, int passengerSeatCount, int standingPassengerCapacity, int driverSeatCount, List\u003CEngine\u003E engines)\n}\nclass \u0022CarFactory\u0022 as e_edf19b92fe50f78077f1 {\n  public static Car CreateCar(string registrationNumber, CountryCode countryCode, string manufacturer, string model, int manufacturingYear, VehicleColor color, double weightKg, double length, double width, double height, string vin, BodyType bodyType, int numberOfDoors, int numberOfSeats, List\u003CEngine\u003E engines)\n}\nclass \u0022EngineFactory\u0022 as e_ba79c8ef67c9d99b21cf {\n  public static ElectricMotor CreateElectricMotor(string serialNumber, string model, double powerKw, double voltage)\n  public static FlatEngine CreateFlatEngine(string serialNumber, string model, FuelType fuelType, int horsePower, int displacementCc, int cylinderCount)\n  public static InlineEngine CreateInlineEngine(string serialNumber, string model, FuelType fuelType, int horsePower, int displacementCc, int cylinderCount)\n  public static RotaryEngine CreateRotaryEngine(string serialNumber, string model, FuelType fuelType, int horsePower, int displacementCc, int rotorCount)\n  public static SteamEngine CreateSteamEngine(string serialNumber, string model, FuelType fuelType, int horsePower, double boilerPressureBar)\n  public static TurbofanEngine CreateTurbofanEngine(string serialNumber, string model, FuelType fuelType, double thrustKn, double bypassRatio)\n  public static TurbojetEngine CreateTurbojetEngine(string serialNumber, string model, FuelType fuelType, double thrustKn)\n  public static TurbopropEngine CreateTurbopropEngine(string serialNumber, string model, FuelType fuelType, double thrustKn, int shaftHorsePower)\n  public static TurboshaftEngine CreateTurboshaftEngine(string serialNumber, string model, FuelType fuelType, double thrustKn, int shaftHorsePower)\n  public static VEngine CreateVEngine(string serialNumber, string model, FuelType fuelType, int horsePower, int displacementCc, int cylinderCount)\n}\nclass \u0022MotorcycleFactory\u0022 as e_5e787d7cde3854bfc03e {\n  public static Motorcycle CreateMotorcycle(string registrationNumber, CountryCode countryCode, string manufacturer, string model, int manufacturingYear, VehicleColor color, double weightKg, double lengthMeters, double widthMeters, double heightMeters, string vin, MotorcycleType motorcycleType, bool hasSidecar, int numberOfWheels, int passengerCapacity, int driverSeats, List\u003CEngine\u003E engines)\n}\nclass \u0022TruckFactory\u0022 as e_e28964516950258a9ab7 {\n  public static Truck CreateTruck(string registrationNumber, CountryCode countryCode, string manufacturer, string model, int manufacturingYear, VehicleColor color, double weightKg, double lengthMeters, double widthMeters, double heightMeters, string vin, int numberOfWheels, int numberOfAxles, double maximumLoadKg, List\u003CEngine\u003E engines)\n}\ne_4d5bdc8ef7f02f4ee42b -[hidden]down-\u003E e_edf19b92fe50f78077f1\ne_3b4168af4d9f254e4fea -[hidden]down-\u003E e_ba79c8ef67c9d99b21cf\ne_183ac3637c0b736646bd -[hidden]down-\u003E e_5e787d7cde3854bfc03e\ne_edf19b92fe50f78077f1 -[hidden]down-\u003E e_e28964516950258a9ab7\n}\npackage \u0022Garage.Vehicles\u0022 as e_7a01edd2efb5f776436d {\nclass \u0022Airplane\u0022 as e_6e1c6ae4aa34cb104638 {\n  protected override bool IsValidRegistration(string number, CountryCode countryCode)\n  public int DriverSeats \u0026#123; get; \u0026#125;\n  public int NumberOfSeats \u0026#123; get; \u0026#125;\n  public int NumberOfWheels \u0026#123; get; \u0026#125;\n  public int PassengerCapacity \u0026#123; get; \u0026#125;\n  public override VehicleSpecification SpecificationDetails \u0026#123; get; \u0026#125;\n  public required AirplaneSpecification Specification \u0026#123;  get;  init; \u0026#125;\n  public required string AirframeSerialNumber \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022Boat\u0022 as e_a60f2ba8c3cb1a130852 {\n  protected override bool IsValidRegistration(string number, CountryCode countryCode)\n  protected override string NormalizeRegistrationNumber(string number)\n  public bool HasCabin \u0026#123; get; \u0026#125;\n  public int DriverSeats \u0026#123; get; \u0026#125;\n  public int NumberOfSeats \u0026#123; get; \u0026#125;\n  public int PassengerCapacity \u0026#123; get; \u0026#125;\n  public override VehicleSpecification SpecificationDetails \u0026#123; get; \u0026#125;\n  public required BoatSpecification Specification \u0026#123;  get;  init; \u0026#125;\n  public required string Hin \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022Bus\u0022 as e_f698e2b8112a02be9f1c {\n  public int DriverSeats \u0026#123; get; \u0026#125;\n  public int NumberOfSeats \u0026#123; get; \u0026#125;\n  public int NumberOfWheels \u0026#123; get; \u0026#125;\n  public int PassengerCapacity \u0026#123; get; \u0026#125;\n  public override VehicleSpecification SpecificationDetails \u0026#123; get; \u0026#125;\n  public required BusSpecification Specification \u0026#123;  get;  init; \u0026#125;\n  public required string Vin \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022Car\u0022 as e_5f959af5bcd52f63d62d {\n  public int DriverSeats \u0026#123; get; \u0026#125;\n  public int NumberOfSeats \u0026#123; get; \u0026#125;\n  public int NumberOfWheels \u0026#123; get; \u0026#125;\n  public int PassengerCapacity \u0026#123; get; \u0026#125;\n  public override VehicleSpecification SpecificationDetails \u0026#123; get; \u0026#125;\n  public required CarSpecification Specification \u0026#123;  get;  init; \u0026#125;\n  public required string Vin \u0026#123;  get;  init; \u0026#125;\n}\nenum \u0022CountryCode\u0022 as e_8f3a8cf604495529ae18 {\n  AUT\n  BEL\n  BGR\n  CYP\n  CZE\n  DEU\n  DNK\n  ESP\n  EST\n  FIN\n  FRA\n  GRC\n  HRV\n  HUN\n  IRL\n  ITA\n  LTU\n  LUX\n  LVA\n  MLT\n  NLD\n  POL\n  PRT\n  ROU\n  SVK\n  SVN\n  SWE\n  Unspecified = 0\n}\nclass \u0022Motorcycle\u0022 as e_9e77deeb038d305e1c3b {\n  public int DriverSeats \u0026#123; get; \u0026#125;\n  public int NumberOfSeats \u0026#123; get; \u0026#125;\n  public int NumberOfWheels \u0026#123; get; \u0026#125;\n  public int PassengerCapacity \u0026#123; get; \u0026#125;\n  public override VehicleSpecification SpecificationDetails \u0026#123; get; \u0026#125;\n  public required MotorcycleSpecification Specification \u0026#123;  get;  init; \u0026#125;\n  public required string Vin \u0026#123;  get;  init; \u0026#125;\n}\nabstract class \u0022RoadVehicle\u0022 as e_c00a88d44cf9b2461058 {\n  protected override bool IsValidRegistration(string number, CountryCode countryCode)\n  protected override string NormalizeRegistrationNumber(string number)\n}\nclass \u0022Truck\u0022 as e_265f6af68f126139ab3c {\n  public int NumberOfWheels \u0026#123; get; \u0026#125;\n  public override VehicleSpecification SpecificationDetails \u0026#123; get; \u0026#125;\n  public required TruckSpecification Specification \u0026#123;  get;  init; \u0026#125;\n  public required string Vin \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022Validation\u0022 as e_015be3bf1fadcb1002f2 {\n  public static bool IsValidAircraftRegistration(string number, CountryCode countryCode)\n  public static bool IsValidAircraftRegistration(string number, string countryCode)\n  public static bool IsValidBoatRegistration(string number, CountryCode countryCode)\n  public static bool IsValidBoatRegistration(string number, string countryCode)\n  public static bool IsValidRoadRegistration(string number, CountryCode countryCode)\n  public static bool IsValidRoadRegistration(string number, string countryCode)\n}\nabstract class \u0022Vehicle\u0022 as e_64fc59041a92c53abae8 {\n  private CountryCode _countryCode\n  private string _registrationNumber\n  private void ValidateRegistration(string number, CountryCode countryCode)\n  protected abstract bool IsValidRegistration(string number, CountryCode countryCode)\n  protected virtual string NormalizeRegistrationNumber(string number)\n  public abstract VehicleSpecification SpecificationDetails \u0026#123;  get; \u0026#125;\n  public required CountryCode CountryCode \u0026#123;  get;  init; \u0026#125;\n  public required VehicleColor Color \u0026#123;  get;  set; \u0026#125;\n  public required int ManufacturingYear \u0026#123;  get;  init; \u0026#125;\n  public required string Manufacturer \u0026#123;  get;  init; \u0026#125;\n  public required string Model \u0026#123;  get;  init; \u0026#125;\n  public required string RegistrationNumber \u0026#123;  get;  init; \u0026#125;\n}\ne_6e1c6ae4aa34cb104638 -[hidden]down-\u003E e_5f959af5bcd52f63d62d\ne_a60f2ba8c3cb1a130852 -[hidden]down-\u003E e_8f3a8cf604495529ae18\ne_f698e2b8112a02be9f1c -[hidden]down-\u003E e_9e77deeb038d305e1c3b\ne_5f959af5bcd52f63d62d -[hidden]down-\u003E e_c00a88d44cf9b2461058\ne_8f3a8cf604495529ae18 -[hidden]down-\u003E e_265f6af68f126139ab3c\ne_9e77deeb038d305e1c3b -[hidden]down-\u003E e_015be3bf1fadcb1002f2\ne_c00a88d44cf9b2461058 -[hidden]down-\u003E e_64fc59041a92c53abae8\n}\npackage \u0022Garage.Vehicles.Components\u0022 as e_ec8af7eb5f1134aedadb {\nclass \u0022Cabin\u0022 as e_a4f64df3ab9b69db8eae {\n  public required int CrewSeatCount \u0026#123;  get;  init; \u0026#125;\n  public required int PassengerSeatCount \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022Cockpit\u0022 as e_13513ce3fde29fdb95b2 {\n  public required bool HasDualControls \u0026#123;  get;  init; \u0026#125;\n  public required int PilotSeats \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022Dimensions\u0022 as e_b285304969a490df6686 {\n  private static double RequirePositiveFinite(double value, string parameterName)\n  public Dimensions(double lengthMeters, double widthMeters, double heightMeters)\n  public double HeightMeters \u0026#123;  get; \u0026#125;\n  public double LengthMeters \u0026#123;  get; \u0026#125;\n  public double WidthMeters \u0026#123;  get; \u0026#125;\n}\n}\npackage \u0022Garage.Vehicles.Interfaces\u0022 as e_1c123c19fb8748529e58 {\ninterface \u0022IHasSeats\u0022 as e_22c96d3aa988db44e416 {\n  int NumberOfSeats \u0026#123;  get; \u0026#125;\n}\ninterface \u0022IHasWheels\u0022 as e_5107e5f96563651d2d33 {\n  int NumberOfWheels \u0026#123;  get; \u0026#125;\n}\ninterface \u0022IManufacturer\u0022 as e_133714b905fc57118d3d {\n  int ManufacturingYear \u0026#123;  get; \u0026#125;\n  string Manufacturer \u0026#123;  get; \u0026#125;\n  string Model \u0026#123;  get; \u0026#125;\n}\ninterface \u0022IPassengerCarrier\u0022 as e_b00eca92cd243ead1474 {\n  int DriverSeats \u0026#123;  get; \u0026#125;\n  int PassengerCapacity \u0026#123;  get; \u0026#125;\n}\ne_22c96d3aa988db44e416 -[hidden]down-\u003E e_b00eca92cd243ead1474\n}\npackage \u0022Garage.Vehicles.Specifications\u0022 as e_c0638d087a5b4938a1d1 {\nclass \u0022AirplaneSpecification\u0022 as e_fbe3ba53db3a6de40189 {\n  public AirplaneSpecification(Cabin cabin, Cockpit? cockpit)\n  public Cabin Cabin \u0026#123;  get; \u0026#125;\n  public Cockpit? Cockpit \u0026#123;  get; \u0026#125;\n  public required double MaximumAltitudeMeters \u0026#123;  get;  init; \u0026#125;\n  public required double WingspanMeters \u0026#123;  get;  init; \u0026#125;\n  public required int NumberOfWheels \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022BoatSpecification\u0022 as e_5494664b0e8fd2e923cb {\n  public BoatSpecification(int passengerCapacity, int driverSeats, Cabin? cabin)\n  public Cabin? Cabin \u0026#123;  get; \u0026#125;\n  public int DriverSeats \u0026#123;  get; \u0026#125;\n  public int PassengerCapacity \u0026#123;  get; \u0026#125;\n  public required BoatType BoatType \u0026#123;  get;  init; \u0026#125;\n  public required double DraftMeters \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022BusSpecification\u0022 as e_d94e67b74f45d9631bff {\n  public BusSpecification(int numberOfDoors, int numberOfWheels, int standingPassengerCapacity, Cabin cabin)\n  public Cabin Cabin \u0026#123;  get; \u0026#125;\n  public int NumberOfDoors \u0026#123;  get; \u0026#125;\n  public int NumberOfWheels \u0026#123;  get; \u0026#125;\n  public int StandingPassengerCapacity \u0026#123;  get; \u0026#125;\n}\nclass \u0022CarSpecification\u0022 as e_6a369f27d243afc60e27 {\n  public required BodyType BodyType \u0026#123;  get;  init; \u0026#125;\n  public required Cabin Cabin \u0026#123;  get;  init; \u0026#125;\n  public required int NumberOfDoors \u0026#123;  get;  init; \u0026#125;\n  public required int NumberOfWheels \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022MotorcycleSpecification\u0022 as e_bfb34f245ebe3d2308d7 {\n  public required MotorcycleType MotorcycleType \u0026#123;  get;  init; \u0026#125;\n  public required bool HasSidecar \u0026#123;  get;  init; \u0026#125;\n  public required int DriverSeats \u0026#123;  get;  init; \u0026#125;\n  public required int NumberOfWheels \u0026#123;  get;  init; \u0026#125;\n  public required int PassengerCapacity \u0026#123;  get;  init; \u0026#125;\n}\nclass \u0022TruckSpecification\u0022 as e_018c1136635e0dcf3674 {\n  public TruckSpecification(int numberOfWheels, int numberOfAxles, double maximumLoadKg)\n  public double MaximumLoadKg \u0026#123;  get; \u0026#125;\n  public int NumberOfAxles \u0026#123;  get; \u0026#125;\n  public int NumberOfWheels \u0026#123;  get; \u0026#125;\n}\nabstract class \u0022VehicleSpecification\u0022 as e_f3998b237239dfd595c1 {\n  private List\u003CEngine\u003E engines\n  public Engine? FindEngine(string serialNumber)\n  public List\u003CEngine\u003E Engines \u0026#123;  get;  init; \u0026#125;\n  public bool RemoveEngine(Engine engine)\n  public const double MaximumLengthMeters\n  public const int MaximumNumberOfEngines\n  public const int MaximumNumberOfSeats\n  public const int MaximumNumberOfWheels\n  public int FindEngineIndex(string serialNumber)\n  public required Dimensions Dimensions \u0026#123;  get;  init; \u0026#125;\n  public required double WeightKg \u0026#123;  get;  init; \u0026#125;\n  public void AddEngine(Engine engine)\n}\ne_fbe3ba53db3a6de40189 -[hidden]down-\u003E e_6a369f27d243afc60e27\ne_5494664b0e8fd2e923cb -[hidden]down-\u003E e_bfb34f245ebe3d2308d7\ne_d94e67b74f45d9631bff -[hidden]down-\u003E e_018c1136635e0dcf3674\ne_6a369f27d243afc60e27 -[hidden]down-\u003E e_f3998b237239dfd595c1\n}\npackage \u0022Garage.Vehicles.Types\u0022 as e_eebf32dba0ee7e64863b {\nenum \u0022BoatType\u0022 as e_eff6b39cac3d97925d6c {\n  CargoShip\n  Ferry\n  FishingBoat\n  Motorboat\n  Sailboat\n  Yacht\n}\nenum \u0022BodyType\u0022 as e_16f48e923e1dc3b4cdbe {\n  Convertible\n  Coupe\n  Hatchback\n  Pickup\n  SUV\n  Sedan\n  Van\n}\nenum \u0022MotorcycleType\u0022 as e_f8625f19fea770129ee7 {\n  Cruiser\n  OffRoad\n  Scooter\n  Sport\n  Standard\n  Touring\n}\nenum \u0022VehicleColor\u0022 as e_f3b2621f6499e69c84e1 {\n  Black\n  Blue\n  Brown\n  Gray\n  Green\n  Orange\n  Pink\n  Purple\n  Red\n  Silver\n  White\n  Yellow\n}\ne_eff6b39cac3d97925d6c -[hidden]down-\u003E e_f3b2621f6499e69c84e1\n}\ne_d25b35cc5e9cbf957375 -[hidden]down-\u003E e_4fb15c92477ef3d25afd\ne_4fb15c92477ef3d25afd -[hidden]down-\u003E e_ffc24e302ec4a41892fb\ne_ffc24e302ec4a41892fb -[hidden]down-\u003E e_925b26288a3167c917a5\ne_925b26288a3167c917a5 -[hidden]down-\u003E e_817e8ec22c96df6329fd\ne_817e8ec22c96df6329fd -[hidden]down-\u003E e_e1d0347b640935145973\ne_e1d0347b640935145973 -[hidden]down-\u003E e_096a61039dfdbf71d93c\ne_096a61039dfdbf71d93c -[hidden]down-\u003E e_6714d1b223fd6cf1cb95\ne_6714d1b223fd6cf1cb95 -[hidden]down-\u003E e_7a01edd2efb5f776436d\ne_7a01edd2efb5f776436d -[hidden]down-\u003E e_ec8af7eb5f1134aedadb\ne_ec8af7eb5f1134aedadb -[hidden]down-\u003E e_1c123c19fb8748529e58\ne_1c123c19fb8748529e58 -[hidden]down-\u003E e_c0638d087a5b4938a1d1\ne_c0638d087a5b4938a1d1 -[hidden]down-\u003E e_eebf32dba0ee7e64863b\ne_ae79f14028ac38341ec2 \u003C|-- e_e2bfb432fcb5dc617e4a\ne_e2bfb432fcb5dc617e4a \u003C|-- e_1cd2a85a51fcdcddbbba\ne_ae79f14028ac38341ec2 \u003C|-- e_991da71dd6e56149634c\ne_991da71dd6e56149634c \u003C|-- e_8b0c519c6865a53d4708\ne_ae79f14028ac38341ec2 \u003C|-- e_2c1fcb11be9df520808b\ne_0d01c86c193d7267889e \u003C|-- e_2b692529df7fd0dee460\ne_0d01c86c193d7267889e \u003C|-- e_3465f28790c681aa4afd\ne_2c1fcb11be9df520808b \u003C|-- e_0d01c86c193d7267889e\ne_0d01c86c193d7267889e \u003C|-- e_12495ccd87dd4ff66765\ne_2c1fcb11be9df520808b \u003C|-- e_b1c0e497c00b9b143fb7\ne_2c1fcb11be9df520808b \u003C|-- e_a7217f414ac87c733352\ne_a7217f414ac87c733352 \u003C|-- e_84b7c157e26ee0d2b8b9\ne_a7217f414ac87c733352 \u003C|-- e_2fed3a099c36d18e506b\ne_a7217f414ac87c733352 \u003C|-- e_e60172641e602fc44c6d\ne_a7217f414ac87c733352 \u003C|-- e_5577f74ad1f062a49b93\ne_ed6d36f0b54c5731b9f7 \u003C|-- e_b332c28c8fc6332f04ac\ne_ed6d36f0b54c5731b9f7 \u003C|-- e_70fcbd8b2f8c14d33128\ne_ed6d36f0b54c5731b9f7 \u003C|-- e_1106589992520cf7cde2\ne_1106589992520cf7cde2 \u003C|-- e_79f82df70d4b4b6c05a8\ne_1106589992520cf7cde2 \u003C|-- e_edcd3119332684aca799\ne_70fcbd8b2f8c14d33128 \u003C|-- e_ce97cf9635118f1e941a\ne_1106589992520cf7cde2 \u003C|-- e_52775f84595874f0a8a1\ne_52775f84595874f0a8a1 \u003C|-- e_f7bee5bce899d5ed7f80\ne_52775f84595874f0a8a1 \u003C|-- e_946c9257d3797b3dffde\ne_52775f84595874f0a8a1 \u003C|-- e_57e192654551bae89d6d\ne_22c96d3aa988db44e416 \u003C|.. e_6e1c6ae4aa34cb104638\ne_5107e5f96563651d2d33 \u003C|.. e_6e1c6ae4aa34cb104638\ne_b00eca92cd243ead1474 \u003C|.. e_6e1c6ae4aa34cb104638\ne_64fc59041a92c53abae8 \u003C|-- e_6e1c6ae4aa34cb104638\ne_22c96d3aa988db44e416 \u003C|.. e_a60f2ba8c3cb1a130852\ne_b00eca92cd243ead1474 \u003C|.. e_a60f2ba8c3cb1a130852\ne_64fc59041a92c53abae8 \u003C|-- e_a60f2ba8c3cb1a130852\ne_22c96d3aa988db44e416 \u003C|.. e_f698e2b8112a02be9f1c\ne_5107e5f96563651d2d33 \u003C|.. e_f698e2b8112a02be9f1c\ne_b00eca92cd243ead1474 \u003C|.. e_f698e2b8112a02be9f1c\ne_c00a88d44cf9b2461058 \u003C|-- e_f698e2b8112a02be9f1c\ne_22c96d3aa988db44e416 \u003C|.. e_5f959af5bcd52f63d62d\ne_5107e5f96563651d2d33 \u003C|.. e_5f959af5bcd52f63d62d\ne_b00eca92cd243ead1474 \u003C|.. e_5f959af5bcd52f63d62d\ne_c00a88d44cf9b2461058 \u003C|-- e_5f959af5bcd52f63d62d\ne_22c96d3aa988db44e416 \u003C|.. e_9e77deeb038d305e1c3b\ne_5107e5f96563651d2d33 \u003C|.. e_9e77deeb038d305e1c3b\ne_b00eca92cd243ead1474 \u003C|.. e_9e77deeb038d305e1c3b\ne_c00a88d44cf9b2461058 \u003C|-- e_9e77deeb038d305e1c3b\ne_64fc59041a92c53abae8 \u003C|-- e_c00a88d44cf9b2461058\ne_f3998b237239dfd595c1 \u003C|-- e_fbe3ba53db3a6de40189\ne_f3998b237239dfd595c1 \u003C|-- e_5494664b0e8fd2e923cb\ne_f3998b237239dfd595c1 \u003C|-- e_d94e67b74f45d9631bff\ne_f3998b237239dfd595c1 \u003C|-- e_6a369f27d243afc60e27\ne_f3998b237239dfd595c1 \u003C|-- e_bfb34f245ebe3d2308d7\ne_f3998b237239dfd595c1 \u003C|-- e_018c1136635e0dcf3674\ne_5107e5f96563651d2d33 \u003C|.. e_265f6af68f126139ab3c\ne_c00a88d44cf9b2461058 \u003C|-- e_265f6af68f126139ab3c\ne_133714b905fc57118d3d \u003C|.. e_64fc59041a92c53abae8\nlegend bottom\n  \u003Cb\u003EHow to read this class diagram\u003C/b\u003E\n  Child --|\u003E Parent : solid line \u002B hollow triangle = inherits from\n  Class ..|\u003E Interface : dashed line \u002B hollow triangle = implements\n  The triangle points to the parent class or interface.\n  C = class; A = abstract class; I = interface; E = enum; S = struct.\n  Boxes group members; folder-shaped boxes group namespaces.\n  public / \u002B = accessible publicly; private / - = within the class\n  protected / # = class and derived classes; internal = same assembly\n  Type Name = field/property; Name(...) = method or constructor.\n  --- Related diagrams ---\n  [[../component/garage-components.puml Garage project components]]\n  [[../package/garage-packages.puml Garage projects and namespaces]]\nendlegend\n@enduml\n",
      "pumlHash": "87e57b4707f0ce9a40de79a923d865c1f35da8778430490a2d7a003e46fa2d31"
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
      "svg": "structural/class/garage-console-classes.svg",
      "puml": "@startuml\n\u0027 diagram-id: garage-console-classes\n\u0027 Generated. Run the UML generate command; do not edit by hand.\nhide empty members\nskinparam classAttributeIconSize 0\ntitle Garage.Console classes\npackage \u0022Garage.ConsoleApp.Display\u0022 as e_59b1556f96699cd705e9 {\nclass \u0022ConsoleScreen\u0022 as e_07cf79b641d13dc76b0c {\n  public static void Clear()\n}\nclass \u0022EngineDisplay\u0022 as e_298e502601fbe6c55deb {\n  public static void PrintEngine(Engine engine)\n}\nclass \u0022VehicleDisplay\u0022 as e_bdcbe980f2e5d618842a {\n  public static void PrintVehicle(int spotNumber, Vehicle vehicle)\n}\n}\npackage \u0022Garage.ConsoleApp.Drafts\u0022 as e_086e18aa53ffee783a28 {\nclass \u0022AirplaneDraft\u0022 as e_864f060c4ab7fa5dd82e {\n  public bool? HasDualControls \u0026#123;  get;  set; \u0026#125;\n  public double? MaximumAltitudeMeters \u0026#123;  get;  set; \u0026#125;\n  public double? WingspanMeters \u0026#123;  get;  set; \u0026#125;\n  public int? CrewSeats \u0026#123;  get;  set; \u0026#125;\n  public int? NumberOfWheels \u0026#123;  get;  set; \u0026#125;\n  public int? PassengerSeats \u0026#123;  get;  set; \u0026#125;\n  public int? PilotSeats \u0026#123;  get;  set; \u0026#125;\n  public override List\u003Cstring\u003E GetMissingFields()\n  public override void Clear()\n  public string? AirframeSerialNumber \u0026#123;  get;  set; \u0026#125;\n}\nclass \u0022BoatDraft\u0022 as e_99aff731f56013415ac3 {\n  public BoatType? BoatType \u0026#123;  get;  set; \u0026#125;\n  public bool? HasCabin \u0026#123;  get;  set; \u0026#125;\n  public double? DraftMeters \u0026#123;  get;  set; \u0026#125;\n  public int? CabinCrewSeats \u0026#123;  get;  set; \u0026#125;\n  public int? CabinPassengerSeats \u0026#123;  get;  set; \u0026#125;\n  public int? DriverSeats \u0026#123;  get;  set; \u0026#125;\n  public int? PassengerCapacity \u0026#123;  get;  set; \u0026#125;\n  public override List\u003Cstring\u003E GetMissingFields()\n  public override void Clear()\n  public string? Hin \u0026#123;  get;  set; \u0026#125;\n}\nclass \u0022BusDraft\u0022 as e_ba1d98237eb4558f147d {\n  public int? DriverSeats \u0026#123;  get;  set; \u0026#125;\n  public int? NumberOfDoors \u0026#123;  get;  set; \u0026#125;\n  public int? NumberOfWheels \u0026#123;  get;  set; \u0026#125;\n  public int? PassengerSeats \u0026#123;  get;  set; \u0026#125;\n  public int? StandingPassengerCapacity \u0026#123;  get;  set; \u0026#125;\n  public override List\u003Cstring\u003E GetMissingFields()\n  public override void Clear()\n  public string? Vin \u0026#123;  get;  set; \u0026#125;\n}\nclass \u0022CarDraft\u0022 as e_ada39b33d0c8484f9ea1 {\n  public BodyType? BodyType \u0026#123;  get;  set; \u0026#125;\n  public int? NumberOfDoors \u0026#123;  get;  set; \u0026#125;\n  public int? NumberOfSeats \u0026#123;  get;  set; \u0026#125;\n  public override List\u003Cstring\u003E GetMissingFields()\n  public override void Clear()\n  public string BodyTypeText \u0026#123; get; \u0026#125;\n  public string DoorsText \u0026#123; get; \u0026#125;\n  public string SeatsText \u0026#123; get; \u0026#125;\n  public string VinText \u0026#123; get; \u0026#125;\n  public string? Vin \u0026#123;  get;  set; \u0026#125;\n}\nclass \u0022EngineCreatorResult\u0022 as e_a47a1ae21140c79fc270 {\n  primary constructor EngineCreatorResult(bool Success, bool Cancelled, List\u003CEngine\u003E Engines, string Message)\n  public static EngineCreatorResult Cancel()\n  public static EngineCreatorResult Completed(List\u003CEngine\u003E engines)\n  public static EngineCreatorResult Failed(string message)\n}\nclass \u0022EngineDraft\u0022 as e_749995555dad532f7222 {\n  private static void AddMissingField(List\u003Cstring\u003E missing, string fieldName)\n  private void RequireDisplacement(List\u003Cstring\u003E missing)\n  private void RequireFuel(List\u003Cstring\u003E missing)\n  private void RequireHorsePower(List\u003Cstring\u003E missing)\n  private void RequireTurbineFields(List\u003Cstring\u003E missing)\n  public EngineKind? Kind \u0026#123;  get;  set; \u0026#125;\n  public FuelType? FuelType \u0026#123;  get;  set; \u0026#125;\n  public List\u003Cstring\u003E GetMissingFields()\n  public double? BoilerPressureBar \u0026#123;  get;  set; \u0026#125;\n  public double? BypassRatio \u0026#123;  get;  set; \u0026#125;\n  public double? PowerKw \u0026#123;  get;  set; \u0026#125;\n  public double? ThrustKn \u0026#123;  get;  set; \u0026#125;\n  public double? Voltage \u0026#123;  get;  set; \u0026#125;\n  public int? CylinderCount \u0026#123;  get;  set; \u0026#125;\n  public int? DisplacementCc \u0026#123;  get;  set; \u0026#125;\n  public int? HorsePower \u0026#123;  get;  set; \u0026#125;\n  public int? RotorCount \u0026#123;  get;  set; \u0026#125;\n  public int? ShaftHorsePower \u0026#123;  get;  set; \u0026#125;\n  public string BoilerPressureText \u0026#123; get; \u0026#125;\n  public string BypassRatioText \u0026#123; get; \u0026#125;\n  public string CylinderCountText \u0026#123; get; \u0026#125;\n  public string DisplacementText \u0026#123; get; \u0026#125;\n  public string FuelTypeText \u0026#123; get; \u0026#125;\n  public string HorsePowerText \u0026#123; get; \u0026#125;\n  public string ModelText \u0026#123; get; \u0026#125;\n  public string PowerText \u0026#123; get; \u0026#125;\n  public string RotorCountText \u0026#123; get; \u0026#125;\n  public string SerialNumberText \u0026#123; get; \u0026#125;\n  public string ShaftHorsePowerText \u0026#123; get; \u0026#125;\n  public string ThrustText \u0026#123; get; \u0026#125;\n  public string VoltageText \u0026#123; get; \u0026#125;\n  public string? Model \u0026#123;  get;  set; \u0026#125;\n  public string? SerialNumber \u0026#123;  get;  set; \u0026#125;\n  public void Clear()\n}\nenum \u0022EngineKind\u0022 as e_2f28041c9d228153b3bc {\n  ElectricMotor\n  Flat\n  Inline\n  Rotary\n  Steam\n  Turbofan\n  Turbojet\n  Turboprop\n  Turboshaft\n  VEngine\n}\nclass \u0022MotorcycleDraft\u0022 as e_a82c3665fb512b06b70d {\n  public MotorcycleType? MotorcycleType \u0026#123;  get;  set; \u0026#125;\n  public bool? HasSidecar \u0026#123;  get;  set; \u0026#125;\n  public int? DriverSeats \u0026#123;  get;  set; \u0026#125;\n  public int? NumberOfWheels \u0026#123;  get;  set; \u0026#125;\n  public int? PassengerCapacity \u0026#123;  get;  set; \u0026#125;\n  public override List\u003Cstring\u003E GetMissingFields()\n  public override void Clear()\n  public string? Vin \u0026#123;  get;  set; \u0026#125;\n}\nclass \u0022TruckDraft\u0022 as e_1a1c7793acc5882d6d18 {\n  public double? MaximumLoadKg \u0026#123;  get;  set; \u0026#125;\n  public int? NumberOfAxles \u0026#123;  get;  set; \u0026#125;\n  public int? NumberOfWheels \u0026#123;  get;  set; \u0026#125;\n  public override List\u003Cstring\u003E GetMissingFields()\n  public override void Clear()\n  public string? Vin \u0026#123;  get;  set; \u0026#125;\n}\nabstract class \u0022VehicleDraft\u0022 as e_0e613a1cb16635d59608 {\n  private List\u003CEngine\u003E engines\n  public CountryCode? CountryCode \u0026#123;  get;  set; \u0026#125;\n  public List\u003CEngine\u003E Engines \u0026#123; get; \u0026#125;\n  public VehicleColor? Color \u0026#123;  get;  set; \u0026#125;\n  public bool RemoveEngine(Engine engine)\n  public double? HeightMeters \u0026#123;  get;  set; \u0026#125;\n  public double? LengthMeters \u0026#123;  get;  set; \u0026#125;\n  public double? WeightKg \u0026#123;  get;  set; \u0026#125;\n  public double? WidthMeters \u0026#123;  get;  set; \u0026#125;\n  public int? ManufacturingYear \u0026#123;  get;  set; \u0026#125;\n  public string ColorText \u0026#123; get; \u0026#125;\n  public string DimensionsText \u0026#123; get; \u0026#125;\n  public string EnginesText \u0026#123; get; \u0026#125;\n  public string ManufacturerText \u0026#123; get; \u0026#125;\n  public string ModelText \u0026#123; get; \u0026#125;\n  public string RegistrationText \u0026#123; get; \u0026#125;\n  public string WeightText \u0026#123; get; \u0026#125;\n  public string YearText \u0026#123; get; \u0026#125;\n  public string? Manufacturer \u0026#123;  get;  set; \u0026#125;\n  public string? Model \u0026#123;  get;  set; \u0026#125;\n  public string? RegistrationNumber \u0026#123;  get;  set; \u0026#125;\n  public virtual List\u003Cstring\u003E GetMissingFields()\n  public virtual void Clear()\n  public void AddEngines(List\u003CEngine\u003E newEngines)\n}\ne_864f060c4ab7fa5dd82e -[hidden]down-\u003E e_ada39b33d0c8484f9ea1\ne_99aff731f56013415ac3 -[hidden]down-\u003E e_a47a1ae21140c79fc270\ne_ba1d98237eb4558f147d -[hidden]down-\u003E e_749995555dad532f7222\ne_ada39b33d0c8484f9ea1 -[hidden]down-\u003E e_2f28041c9d228153b3bc\ne_a47a1ae21140c79fc270 -[hidden]down-\u003E e_a82c3665fb512b06b70d\ne_749995555dad532f7222 -[hidden]down-\u003E e_1a1c7793acc5882d6d18\ne_2f28041c9d228153b3bc -[hidden]down-\u003E e_0e613a1cb16635d59608\n}\npackage \u0022Garage.ConsoleApp.Mapping\u0022 as e_472d4347054781c1284e {\nclass \u0022EngineDraftMapper\u0022 as e_bb63af8411799b4db7a5 {\n  public EngineCreatorResult CreateEngine(EngineDraft draft)\n}\nclass \u0022VehicleDraftMapper\u0022 as e_b1cd5a7a50defcb1217e {\n  public Airplane CreateAirplane(AirplaneDraft draft)\n  public Boat CreateBoat(BoatDraft draft)\n  public Bus CreateBus(BusDraft draft)\n  public Car CreateCar(CarDraft draft)\n  public Motorcycle CreateMotorcycle(MotorcycleDraft draft)\n  public Truck CreateTruck(TruckDraft draft)\n}\n}\npackage \u0022Garage.ConsoleApp.Menus\u0022 as e_e5e0b215ae1e59df7146 {\nclass \u0022ConsoleMenu\u0022 as e_4d91ba0dd97c69bd6593 {\n  private readonly List\u003CMenuOption\u003E options\n  private void Display()\n  public ConsoleMenu(string title, List\u003CMenuOption\u003E options, string backOptionText = \\\u0022Back\\\u0022)\n  public string BackOptionText \u0026#123;  get; \u0026#125;\n  public string Title \u0026#123;  get; \u0026#125;\n  public void Show()\n}\nclass \u0022EngineCreator\u0022 as e_935d2cd052ef64b5ab41 {\n  private List\u003CMenuOption\u003E CreateOptions(EngineCreatedHandler handleCreatedEngine)\n  private readonly EngineDraft draft\n  private readonly EngineDraftMapper engineActions\n  private void AddDisplacementOption(ref List\u003CMenuOption\u003E options)\n  private void AddFuelOption(ref List\u003CMenuOption\u003E options)\n  private void AddHorsePowerOption(ref List\u003CMenuOption\u003E options)\n  private void AddTurbineOptions(ref List\u003CMenuOption\u003E options)\n  private void ChooseBoilerPressure()\n  private void ChooseBypassRatio()\n  private void ChooseCylinderCount()\n  private void ChooseDisplacement()\n  private void ChooseFuelType()\n  private void ChooseHorsePower()\n  private void ChooseModel()\n  private void ChoosePower()\n  private void ChooseRotorCount()\n  private void ChooseSerialNumber()\n  private void ChooseShaftHorsePower()\n  private void ChooseThrust()\n  private void ChooseVoltage()\n  private void ClearFields()\n  private void CreateEngine(EngineCreatedHandler handleCreatedEngine)\n  public void ShowCreateEngineMenu(EngineCreatedHandler handleCreatedEngine)\n}\nclass \u0022GarageActions\u0022 as e_843a620e0241f7d51d56 {\n  private Vehicle? SelectVehicle(int? spotNumber = null)\n  private readonly GarageService service\n  private readonly VehicleGarage garage\n  private static void ShowVehicleSpecificFilters(SearchCriteriaCreator criteriaCreator)\n  private void Park(Vehicle vehicle)\n  private void Park(Vehicle vehicle, int spot)\n  private void ShowOpenSpots()\n  private void ShowSearchResults(VehicleSearchCriteria criteria)\n  public GarageActions(VehicleGarage garage, GarageService service)\n  public void FindVehicleByRegistration()\n  public void ListParkedVehicles()\n  public void ListParkingSpots()\n  public void ListVehicleTypes()\n  public void ParkVehicle()\n  public void ParkVehicleAtSpot()\n  public void RemoveVehicle()\n  public void SearchVehicles()\n}\nclass \u0022GarageApplication\u0022 as e_c17527f25cd385304828 {\n  private readonly GarageService service\n  private readonly VehicleCreator vehicleCreator\n  private static Dimensions ReadSpotDimensions()\n  private void ChooseGarage()\n  private void CreateGarage()\n  private void CreateGarage(bool useSpotDimensions)\n  private void CreateGarageFromJson()\n  private void CreateGarageWithSizedSpots()\n  private void OpenGarage(VehicleGarage garage)\n  public GarageApplication(GarageService service)\n  public void Run()\n}\nclass \u0022MenuOption\u0022 as e_ddef3b3219073f491098 {\n  private readonly Action action\n  private readonly MenuTextProvider textProvider\n  public MenuOption(MenuTextProvider textProvider, Action action)\n  public MenuOption(string text, Action action)\n  public MenuOption(string text, ConsoleMenu submenu)\n  public override string ToString()\n  public string Text \u0026#123; get; \u0026#125;\n  public void Execute()\n}\nclass \u0022VehicleCreator\u0022 as e_243c9cea10eedfdba2fe {\n  private VehicleGarage? targetGarage\n  private int? targetSpotNumber\n  private readonly AirplaneDraft airplaneDraft\n  private readonly BoatDraft boatDraft\n  private readonly BusDraft busDraft\n  private readonly CarDraft carDraft\n  private readonly EngineCreator engineCreator\n  private readonly GarageService service\n  private readonly MotorcycleDraft motorcycleDraft\n  private readonly TruckDraft truckDraft\n  private readonly VehicleDraftMapper vehicleActions\n  private static List\u003CMenuOption\u003E CreateCommonOptions(VehicleDraft draft, string middleDimensionName)\n  private static MenuOption BoolOption(string label, BoolValueGetter getter, BoolValueSetter setter)\n  private static MenuOption DoubleOption(string label, string unit, DoubleValueGetter getter, DoubleValueSetter setter, double minimum, double maximum)\n  private static MenuOption IntOption(string label, IntValueGetter getter, IntValueSetter setter, int minimum, int maximum)\n  private static MenuOption TextOption(string label, TextValueGetter getter, TextValueSetter setter)\n  private static double ReadMeasurement(string prompt)\n  private static string ValueText(object? value, string? unit = null)\n  private static void ListDraftEngines(VehicleDraft draft)\n  private static void RemoveDraftEngine(VehicleDraft draft)\n  private void AddEngine(VehicleDraft draft)\n  private void CreateVehicle(VehicleDraft draft, VehicleFactory factory)\n  private void CreateVehicleFromJson()\n  private void ListVehicles()\n  private void ShowAirplaneMenu()\n  private void ShowBoatMenu()\n  private void ShowBusMenu()\n  private void ShowCarMenu()\n  private void ShowDraftMenu(string title, VehicleDraft draft, List\u003CMenuOption\u003E typeOptions, Action createVehicle, string middleDimensionName = \\\u0022Width\\\u0022)\n  private void ShowMenuCore(VehicleGarage? garage, int? spotNumber)\n  private void ShowMotorcycleMenu()\n  private void ShowTruckMenu()\n  public VehicleCreator(GarageService service)\n  public void ShowMenu()\n  public void ShowMenuForGarage(VehicleGarage garage)\n  public void ShowMenuForGarageAtSpot(VehicleGarage garage)\n}\ne_4d91ba0dd97c69bd6593 -[hidden]down-\u003E e_c17527f25cd385304828\ne_935d2cd052ef64b5ab41 -[hidden]down-\u003E e_ddef3b3219073f491098\ne_843a620e0241f7d51d56 -[hidden]down-\u003E e_243c9cea10eedfdba2fe\n}\npackage \u0022Garage.ConsoleApp.Prompts\u0022 as e_48a075bf0e95828cc9b8 {\nclass \u0022ConsoleInput\u0022 as e_84cce6e30aadda581c97 {\n  public static Enum ReadEnum(Type enumType, string prompt)\n  public static Enum? ReadEnumOrCancel(Type enumType, string prompt, string cancelOptionText = \\\u0022Cancel\\\u0022)\n  public static Enum? ReadOptionalEnum(Type enumType, string prompt)\n  public static bool ReadBoolean(string prompt)\n  public static double ReadDouble(string prompt, double minimum, double maximum)\n  public static double? ReadOptionalDouble(string prompt, double minimum, double maximum)\n  public static int ReadInt(string prompt, int minimum, int maximum)\n  public static int? ReadOptionalInt(string prompt, int minimum, int maximum)\n  public static string ReadRequiredString(string prompt)\n  public static string? ReadOptionalString(string prompt)\n  public static void Pause()\n}\nclass \u0022SearchCriteriaCreator\u0022 as e_c0ae39a64486662aad26 {\n  private BoatType? boatType\n  private BodyType? bodyType\n  private FuelType? fuelType\n  private List\u003CType\u003E CreateSelectedVehicleTypes()\n  private MotorcycleType? motorcycleType\n  private VehicleColor? color\n  private bool? hasSidecar\n  private double? cylinderVolumeCc\n  private double? draftMeters\n  private double? lengthMeters\n  private double? maximumAltitudeMeters\n  private double? maximumLoadKg\n  private double? wingspanMeters\n  private int? manufacturingYear\n  private int? numberOfAxles\n  private int? numberOfEngines\n  private int? numberOfSeats\n  private int? numberOfWheels\n  private int? standingPassengerCapacity\n  private readonly List\u003CType\u003E availableVehicleTypes\n  private readonly List\u003Cbool\u003E selectedVehicleTypes\n  private string? manufacturer\n  private string? model\n  private string? registrationNumber\n  public VehicleSearchCriteria Create()\n  public string BoatTypeText \u0026#123; get; \u0026#125;\n  public string BodyTypeText \u0026#123; get; \u0026#125;\n  public string ColorText \u0026#123; get; \u0026#125;\n  public string CylinderVolumeText \u0026#123; get; \u0026#125;\n  public string DraftText \u0026#123; get; \u0026#125;\n  public string FuelTypeText \u0026#123; get; \u0026#125;\n  public string HasSidecarText \u0026#123; get; \u0026#125;\n  public string LengthText \u0026#123; get; \u0026#125;\n  public string ManufacturerText \u0026#123; get; \u0026#125;\n  public string ManufacturingYearText \u0026#123; get; \u0026#125;\n  public string MaximumAltitudeText \u0026#123; get; \u0026#125;\n  public string MaximumLoadText \u0026#123; get; \u0026#125;\n  public string ModelText \u0026#123; get; \u0026#125;\n  public string MotorcycleTypeText \u0026#123; get; \u0026#125;\n  public string NumberOfAxlesText \u0026#123; get; \u0026#125;\n  public string NumberOfEnginesText \u0026#123; get; \u0026#125;\n  public string NumberOfSeatsText \u0026#123; get; \u0026#125;\n  public string NumberOfWheelsText \u0026#123; get; \u0026#125;\n  public string RegistrationNumberText \u0026#123; get; \u0026#125;\n  public string StandingPassengerCapacityText \u0026#123; get; \u0026#125;\n  public string VehicleTypesText \u0026#123;  get; \u0026#125;\n  public string WingspanText \u0026#123; get; \u0026#125;\n  public void ChooseBoatType()\n  public void ChooseBodyType()\n  public void ChooseColor()\n  public void ChooseCylinderVolume()\n  public void ChooseDraft()\n  public void ChooseFuelType()\n  public void ChooseHasSidecar()\n  public void ChooseLength()\n  public void ChooseManufacturer()\n  public void ChooseManufacturingYear()\n  public void ChooseMaximumAltitude()\n  public void ChooseMaximumLoad()\n  public void ChooseModel()\n  public void ChooseMotorcycleType()\n  public void ChooseNumberOfAxles()\n  public void ChooseNumberOfEngines()\n  public void ChooseNumberOfSeats()\n  public void ChooseNumberOfWheels()\n  public void ChooseRegistrationNumber()\n  public void ChooseStandingPassengerCapacity()\n  public void ChooseVehicleTypes()\n  public void ChooseWingspan()\n  public void Clear()\n}\n}\ne_59b1556f96699cd705e9 -[hidden]down-\u003E e_086e18aa53ffee783a28\ne_086e18aa53ffee783a28 -[hidden]down-\u003E e_472d4347054781c1284e\ne_472d4347054781c1284e -[hidden]down-\u003E e_e5e0b215ae1e59df7146\ne_e5e0b215ae1e59df7146 -[hidden]down-\u003E e_48a075bf0e95828cc9b8\ne_0e613a1cb16635d59608 \u003C|-- e_864f060c4ab7fa5dd82e\ne_0e613a1cb16635d59608 \u003C|-- e_99aff731f56013415ac3\ne_0e613a1cb16635d59608 \u003C|-- e_ba1d98237eb4558f147d\ne_0e613a1cb16635d59608 \u003C|-- e_ada39b33d0c8484f9ea1\ne_0e613a1cb16635d59608 \u003C|-- e_a82c3665fb512b06b70d\ne_0e613a1cb16635d59608 \u003C|-- e_1a1c7793acc5882d6d18\nlegend bottom\n  \u003Cb\u003EHow to read this class diagram\u003C/b\u003E\n  Child --|\u003E Parent : solid line \u002B hollow triangle = inherits from\n  Class ..|\u003E Interface : dashed line \u002B hollow triangle = implements\n  The triangle points to the parent class or interface.\n  C = class; A = abstract class; I = interface; E = enum; S = struct.\n  Boxes group members; folder-shaped boxes group namespaces.\n  public / \u002B = accessible publicly; private / - = within the class\n  protected / # = class and derived classes; internal = same assembly\n  Type Name = field/property; Name(...) = method or constructor.\n  --- Related diagrams ---\n  [[../component/garage-components.puml Garage project components]]\n  [[../package/garage-packages.puml Garage projects and namespaces]]\nendlegend\n@enduml\n",
      "pumlHash": "0d54d98e83b1348e97bce0cf5fb1918c7506e27937f0689690ea41fdb328bf18"
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
      "svg": "structural/class/garage-terminal-classes.svg",
      "puml": "@startuml\n\u0027 diagram-id: garage-terminal-classes\n\u0027 Generated. Run the UML generate command; do not edit by hand.\nhide empty members\nskinparam classAttributeIconSize 0\ntitle Garage.Terminal classes\npackage \u0022Garage.Terminal.Forms\u0022 as e_8c95e3638b28daa95f26 {\nclass \u0022FactoryDefinition\u0022 as e_f4bb18770de95a491874 {\n  private FactoryDefinition(string name, string methodName)\n  private readonly string methodName\n  private static FieldDefinition Field(string name, Type type)\n  private static List\u003CFieldDefinition\u003E BuildFields(string methodName)\n  private static string Default(string name, Type type)\n  public List\u003CFieldDefinition\u003E Fields \u0026#123;  get; \u0026#125;\n  public object Create(Dictionary\u003Cstring, object?\u003E values, List\u003CEngine\u003E? engines = null)\n  public static List\u003CFactoryDefinition\u003E Engines \u0026#123;  get; \u0026#125;\n  public static List\u003CFactoryDefinition\u003E Vehicles \u0026#123;  get; \u0026#125;\n  public string Name \u0026#123;  get; \u0026#125;\n}\nclass \u0022FieldDefinition\u0022 as e_8b84717b913f7ea1a392 {\n  primary constructor FieldDefinition(string Name, string Label, Type Type, bool Required = true, string Initial = \\\u0022\\\u0022)\n  public object? Parse(string text)\n  public static string FriendlyLabel(string name)\n  public static string Humanize(string name)\n}\nclass \u0022SearchForm\u0022 as e_9bd1a70266eae6524d8e {\n  public static VehicleSearchCriteria? Show(Dialogs dialogs, VehicleSearchCriteria current)\n}\n}\npackage \u0022Garage.Terminal.Presentation\u0022 as e_70d9678ffcb314c3c560 {\nclass \u0022DashboardState\u0022 as e_4df767f98e735fe95b15 {\n  primary constructor DashboardState(GarageService service)\n  public GarageService Service \u0026#123;  get; \u0026#125;\n  public IReadOnlyList\u003CVehicle\u003E VisibleVehicles()\n  public VehicleGarage? Garage \u0026#123;  get;  set; \u0026#125;\n  public VehicleGarage? Location(Vehicle vehicle)\n  public VehicleSearchCriteria Criteria \u0026#123;  get;  set; \u0026#125;\n  public WorkspacePage Page \u0026#123;  get;  set; \u0026#125;\n  public int? Spot(Vehicle vehicle)\n  public string QuickFilter \u0026#123;  get;  set; \u0026#125;\n}\nclass \u0022Dialogs\u0022 as e_8837e80d9ea0086e4401 {\n  primary constructor Dialogs(IApplication app)\n  public Dictionary\u003Cstring, object?\u003E? Form(string title, IReadOnlyList\u003CFieldDefinition\u003E fields, string finish = \\\u0022_Continue\\\u0022, IReadOnlyDictionary\u003Cstring, object?\u003E? initial = null)\n  public IReadOnlyList\u003Cint\u003E? ChooseMany(string title, IReadOnlyList\u003Cstring\u003E choices, List\u003Cint\u003E? selected = null)\n  public Window Modal(string title, int height = 22)\n  public bool Confirm(string title, string message, string accept = \\\u0022_Continue\\\u0022)\n  public int? Choose(string title, IReadOnlyList\u003Cstring\u003E choices, int selected = 0)\n  public string? JsonFile(string title)\n  public void Message(string title, string message)\n}\nclass \u0022GarageWorkspace\u0022 as e_63ea1484b1756ebba669 {\n  internal void AdvanceWorkspaceFocus(bool backwards = false)\n  private IReadOnlyList\u003CVehicle\u003E displayedVehicles\n  private IReadOnlyList\u003CVehicleGarage\u003E displayedGarages\n  private Vehicle? SelectedVehicle \u0026#123; get; \u0026#125;\n  private bool refreshing\n  private int? ChooseSpot(Vehicle? vehicle)\n  private readonly DashboardState state\n  private readonly Dialogs dialogs\n  private readonly GarageWorkspaceLayout layout\n  private readonly IApplication application\n  private readonly IReadOnlyList\u003CView\u003E focusOrder\n  private readonly Workflows workflows\n  private readonly WorkspaceButtons buttons\n  private static void AddColumns(DataTable data, List\u003Cstring\u003E names)\n  private void ChooseGarage()\n  private void ConnectEvents()\n  private void CreateVehicle(bool parkImmediately)\n  private void Execute(WorkspaceCommand command)\n  private void GarageResult(GarageCreationResult? result)\n  private void Guard(Action action)\n  private void Help()\n  private void ImportVehicle()\n  private void OpenDetails()\n  private void ParkVehicle()\n  private void ParkingActions()\n  private void Quit()\n  private void RefreshRows()\n  private void RemoveVehicle()\n  private void RevealVehicle(Vehicle vehicle)\n  private void Search()\n  private void SetStatus(string message)\n  private void ShowParkingSpots(VehicleGarage garage)\n  private void ShowVehicleTypeCounts(VehicleGarage garage)\n  private void UpdateDetails()\n  public GarageWorkspace(IApplication application, GarageService service)\n}\nclass \u0022GarageWorkspaceLayout\u0022 as e_b1626b8acbbb27220002 {\n  public FrameView DetailFrame \u0026#123;  get; \u0026#125;\n  public FrameView TableFrame \u0026#123;  get; \u0026#125;\n  public GarageWorkspaceLayout(Window workspace, WorkspaceButtons buttons)\n  public Label Details \u0026#123;  get; \u0026#125;\n  public Label Stats \u0026#123;  get; \u0026#125;\n  public Label Status \u0026#123;  get; \u0026#125;\n  public ListView Navigation \u0026#123;  get; \u0026#125;\n  public TableView Table \u0026#123;  get; \u0026#125;\n  public TextField Query \u0026#123;  get; \u0026#125;\n  public void ArrangeForHeight(int height)\n}\nclass \u0022Theme\u0022 as e_ad55187c4e6326e7f254 {\n  private static Scheme Create(string text, string background, string selection)\n  private static void ApplyScheme(View view, Scheme? scheme)\n  public static Button Apply(Button view, Scheme? scheme = null)\n  public static Button Button(string text, Action action)\n  public static FrameView Apply(FrameView view, Scheme? scheme = null)\n  public static Label Apply(Label view, Scheme? scheme = null)\n  public static ListView Apply(ListView view, Scheme? scheme = null)\n  public static OpenDialog Apply(OpenDialog view, Scheme? scheme = null)\n  public static TableView Apply(TableView view, Scheme? scheme = null)\n  public static TextField Apply(TextField view, Scheme? scheme = null)\n  public static View Apply(View view, Scheme? scheme = null)\n  public static Window Apply(Window view, Scheme? scheme = null)\n  public static readonly Scheme Accent\n  public static readonly Scheme Danger\n  public static readonly Scheme Input\n  public static readonly Scheme Muted\n  public static readonly Scheme Panel\n  public static readonly Scheme Surface\n}\nclass \u0022VehicleDetails\u0022 as e_2c610ddeb077913dbee3 {\n  private static string Properties(object value, List\u003Cstring\u003E? excluded = null)\n  public static string Engines(List\u003CEngine\u003E engines)\n  public static string Full(Vehicle vehicle)\n  public static string Summary(Vehicle vehicle)\n}\nclass \u0022Workflows\u0022 as e_27b934ba4d208135b791 {\n  primary constructor Workflows(Dialogs dialogs, GarageService service)\n  private Dimensions? ReadDimensions(string title)\n  private Engine? CreateEngine()\n  public GarageCreationResult? CreateGarage()\n  public GarageCreationResult? ImportGarage()\n  public VehicleCreationResult? CreateVehicle(VehicleGarage? garage = null, int? spotNumber = null)\n}\nclass \u0022WorkspaceButtons\u0022 as e_d9caf31e8ba77e8d47d5 {\n  public Button CreateGarage \u0026#123;  get; \u0026#125;\n  public Button CreateVehicle \u0026#123;  get; \u0026#125;\n  public Button Details \u0026#123;  get; \u0026#125;\n  public Button Filters \u0026#123;  get; \u0026#125;\n  public Button GaragePicker \u0026#123;  get; \u0026#125;\n  public Button Help \u0026#123;  get; \u0026#125;\n  public Button ImportGarage \u0026#123;  get; \u0026#125;\n  public Button ImportVehicle \u0026#123;  get; \u0026#125;\n  public Button Park \u0026#123;  get; \u0026#125;\n  public Button Quit \u0026#123;  get; \u0026#125;\n  public Button Remove \u0026#123;  get; \u0026#125;\n  public Button Spots \u0026#123;  get; \u0026#125;\n  public IReadOnlyList\u003CView\u003E FocusOrder(ListView navigation, TextField query, TableView table)\n  public WorkspaceButtons(Action\u003CWorkspaceCommand\u003E execute)\n  public void AddActionsTo(View actions)\n  public void AddHeaderTo(View header)\n  public void AddSearchTo(View content)\n  public void AddSidebarTo(View sidebar)\n}\nenum \u0022WorkspaceCommand\u0022 as e_35eddb34a1e331aa28f3 {\n  ChooseGarage\n  CreateGarage\n  CreateVehicle\n  FocusFind\n  Help\n  ImportGarage\n  ImportVehicle\n  OpenDetails\n  ParkVehicle\n  ParkingActions\n  Quit\n  Refresh\n  RemoveVehicle\n  Search\n}\nenum \u0022WorkspacePage\u0022 as e_5ac9d75313c00c571a75 {\n  Overview\n  Parking\n  Search\n  Vehicles\n}\ne_4df767f98e735fe95b15 -[hidden]down-\u003E e_b1626b8acbbb27220002\ne_8837e80d9ea0086e4401 -[hidden]down-\u003E e_ad55187c4e6326e7f254\ne_63ea1484b1756ebba669 -[hidden]down-\u003E e_2c610ddeb077913dbee3\ne_b1626b8acbbb27220002 -[hidden]down-\u003E e_27b934ba4d208135b791\ne_ad55187c4e6326e7f254 -[hidden]down-\u003E e_d9caf31e8ba77e8d47d5\ne_2c610ddeb077913dbee3 -[hidden]down-\u003E e_35eddb34a1e331aa28f3\ne_27b934ba4d208135b791 -[hidden]down-\u003E e_5ac9d75313c00c571a75\n}\ne_8c95e3638b28daa95f26 -[hidden]down-\u003E e_70d9678ffcb314c3c560\nlegend bottom\n  \u003Cb\u003EHow to read this class diagram\u003C/b\u003E\n  Child --|\u003E Parent : solid line \u002B hollow triangle = inherits from\n  Class ..|\u003E Interface : dashed line \u002B hollow triangle = implements\n  The triangle points to the parent class or interface.\n  C = class; A = abstract class; I = interface; E = enum; S = struct.\n  Boxes group members; folder-shaped boxes group namespaces.\n  public / \u002B = accessible publicly; private / - = within the class\n  protected / # = class and derived classes; internal = same assembly\n  Type Name = field/property; Name(...) = method or constructor.\n  --- Related diagrams ---\n  [[../component/garage-components.puml Garage project components]]\n  [[../package/garage-packages.puml Garage projects and namespaces]]\nendlegend\n@enduml\n",
      "pumlHash": "f3c3eb872a95103b85ee6a090b86a355b23719a02b1a604a92f51e5c005a7201"
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
      "svg": "structural/class/garage-tests-classes.svg",
      "puml": "@startuml\n\u0027 diagram-id: garage-tests-classes\n\u0027 Generated. Run the UML generate command; do not edit by hand.\nhide empty members\nskinparam classAttributeIconSize 0\ntitle Garage.Tests classes\npackage \u0022Garage.Tests\u0022 as e_c6d222290b958a69f4fc {\nclass \u0022ConsoleOutputCollection\u0022 as e_e0d9a07c0cb376b75c76 {\n}\nclass \u0022CreationResultTests\u0022 as e_09b11f5e5768ac6dbe89 {\n  [Fact] public void CreateGarage_DuplicateAndInvalidCapacityReturnFailure()\n  [Fact] public void CreateGarage_ReturnsRegisteredGarage()\n  [Fact] public void CreateVehicle_ReturnsCreatedVehicleOrValidationFailure()\n  [Fact] public void Park_ReturnsParkingResultWithDisplaySpotNumber()\n}\nclass \u0022GarageConstructionTests\u0022 as e_4635a4048dcd5b79e794 {\n  [Fact] public void Constructor_ParksInitialVehicles()\n  [Fact] public void Constructor_RejectsDuplicateRegistrationsIgnoringCase()\n  [Fact] public void Constructor_RejectsNullVehicleInInitialArray()\n  [Fact] public void Constructor_SetsCapacity()\n}\nclass \u0022GarageJsonLoaderTests\u0022 as e_ed41b0f7b38a8a6c261c {\n  [Fact] public void Load_CreatesGarageWithCustomSpotSizeAndAssignments()\n  [Fact] public void Load_RejectsDuplicateCustomSpotNumbers()\n  [Fact] public void Load_RejectsVehicleThatDoesNotFitItsAssignedSpot()\n  private const string VehicleJson\n  private static string CreateDirectory()\n  private static string Write(string directory, string name, string content)\n}\nclass \u0022GarageParkingTests\u0022 as e_e8bf0c7380d36cd94bb7 {\n  [Fact] public void Constructor_RejectsMissingSpotDimensions()\n  [Fact] public void ParkAtSpot_FailsWhenSpotIsOccupied()\n  [Fact] public void ParkAtSpot_RejectsNullVehicle()\n  [Fact] public void ParkAtSpot_RejectsVehicleThatDoesNotFitAndKeepsSpotFree()\n  [Fact] public void ParkAtSpot_UsesRequestedSpot()\n  [Fact] public void Park_AddsVehicleAndUpdatesSpaceCounts()\n  [Fact] public void Park_FailsWhenGarageIsFull()\n  [Fact] public void Park_RejectsDuplicateRegistrationIgnoringCase()\n  [Fact] public void Park_RejectsNullVehicle()\n  [Fact] public void Park_SkipsOpenSpotThatIsTooSmall()\n  [Fact] public void ParkingMenu_OnlyOffersVehiclesThatFitTheChosenSpot()\n  [Fact] public void Remove_MakesSizedSpotAvailableAgain()\n  [Theory] [InlineData(0, 2, 2)] [InlineData(-1, 2, 2)] [InlineData(double.NaN, 2, 2)] [InlineData(2, double.PositiveInfinity, 2)] [InlineData(2, 2, double.NegativeInfinity)] public void Dimensions_RejectsInvalidMeasurements(double lengthMeters, double widthMeters, double heightMeters)\n}\nclass \u0022GarageRemovalTests\u0022 as e_ad74eb1aad8d12911fbc {\n  [Fact] public void FindVehicleByRegistration_IgnoresCase()\n  [Fact] public void Remove_RemovesVehicleAndFreesSpace()\n  [Fact] public void Remove_ReturnsFailureForUnknownRegistration()\n}\nclass \u0022GarageSearchTests\u0022 as e_ae1ae414f68a417632a9 {\n  [Fact] public void Search_CombinesAircraftAndGeneralFilters()\n  [Fact] public void Search_CombinesCriteriaWithAndLogic()\n  [Fact] public void Search_FiltersOnVehicleSpecificProperties()\n  [Fact] public void Search_ReturnsEmptyCollectionWhenNothingMatches()\n  [Fact] public void VehiclesByType_GroupsAndCountsVehicles()\n}\nclass \u0022GarageServiceTests\u0022 as e_e302f831203183bedd05 {\n  [Fact] public void AddGarage_RejectsDuplicateNameWithoutChangingCollection()\n  [Fact] public void Constructor_RejectsDuplicateInitialGarages()\n  [Fact] public void ImportGarage_FailedLoadDoesNotRegisterGarage()\n}\nclass \u0022GarageServiceWorkflowTests\u0022 as e_7d704edb220eb773ff35 {\n  [Fact] public void CatalogAndGarageCollections_CannotBeMutatedByCallers()\n  [Fact] public void Catalog_RejectsDuplicateRegistrationInInitialData()\n  [Fact] public void CreateAndPark_OccupiedSpotKeepsExistingVehicleAndCatalog()\n  [Fact] public void CreateAndPark_RegistersTheSameVehicleInCatalogAndGarage()\n  [Fact] public void CreateAndPark_RejectsGarageOutsideTheService()\n  [Fact] public void CreateAndPark_VehicleThatDoesNotFitDoesNotChangeEitherCollection()\n  [Fact] public void CreateVehicle_RejectsRegistrationAlreadyInAnotherGarage()\n  [Fact] public void FromJson_InvalidFileReturnsErrorWithoutChangingState()\n  [Fact] public void FromJson_MissingFileReturnsSpecificError()\n  [Fact] public void Park_RejectsVehicleOutsideTheCatalog()\n  [Fact] public void Park_VehicleMustBeRemovedBeforeParkingInAnotherGarage()\n  [Fact] public void ResultFactories_RejectInconsistentSuccessAndFailure()\n}\nclass \u0022RegistrationValidationTests\u0022 as e_013d62cc3d4938063035 {\n  [Fact] public void Airplane_UsesItsCountryPrefix()\n  [Fact] public void Boat_UsesBoatRulesInsteadOfRoadRules()\n  [Fact] public void Draft_RequiresCountryAndClearsItAfterUse()\n  [Fact] public void Factory_UsesTheExplicitCountry()\n  [Theory] [InlineData(\\\u0022\\\u0022)] [InlineData(\\\u0022 \\\u0022)] [InlineData(\\\u0022---\\\u0022)] [InlineData(\\\u0022MATCH1\\\u0022)] [InlineData(\\\u0022ABC1234\\\u0022)] public void RoadVehicle_RejectsInvalidRegistrations(string number)\n  [Theory] [InlineData(\\\u0022ABC123\\\u0022)] [InlineData(\\\u0022ABC12D\\\u0022)] [InlineData(\\\u0022 abc-123 \\\u0022)] public void RoadVehicle_NormalizesSupportedRegistrations(string number)\n  [Theory] [InlineData(\\\u0022vehicles.json\\\u0022, 30)] [InlineData(\\\u0022created-vehicles.json\\\u0022, 12)] public void SampleData_LoadsWithValidRegistrations(string fileName, int expectedCount)\n  [Theory] [InlineData(CountryCode.Unspecified)] [InlineData((CountryCode)999)] public void Vehicle_RejectsMissingOrUndefinedCountry(CountryCode countryCode)\n  [Theory] [InlineData(true)] [InlineData(false)] public void Initializer_ValidatesUsingBothPropertiesRegardlessOfOrder(bool countryFirst)\n  private static Car CreateCar(string number, CountryCode countryCode, bool countryFirst)\n}\nclass \u0022TerminalWorkspaceTests\u0022 as e_7a284b855abcc173bd5e {\n  [Fact] public void Dashboard_FiltersCatalogAndRetainsGarageLocations()\n  [Fact] public void EngineForms_MapEverySupportedEngineFactory()\n  [Fact] public void FactoryForm_MapsValidCarValuesThroughDomainFactory()\n  [Fact] public void FactoryForms_CoverAllVehicleAndEngineTypes()\n  [Fact] public void Fields_ParseOptionalEnumsAndFiniteMeasurements()\n  [Fact] public void VehicleForms_CreateEverySupportedVehicleType()\n  [Fact] public void Workspace_LayoutAndKeyboardTraversalReachTheVehicleTable()\n}\nclass \u0022VehicleEngineTests\u0022 as e_22af7dcc0b6b9b0ae884 {\n  [Fact] public void AddEngine_PreservesExistingEngineAndAddsNewEngine()\n  [Fact] public void AddEngine_RejectsEngineBeyondCapacity()\n  [Fact] public void PrintVehicle_ReflectsAddedAndRemovedEngines()\n  [Fact] public void RemoveEngine_RemovesOnlySelectedEngine()\n  private static List\u003CVehicle\u003E CreateVehicles()\n  private static string CaptureVehicle(Vehicle vehicle)\n}\nclass \u0022VehicleJsonLoaderTests\u0022 as e_a5047bde016988483b34 {\n  [Fact] public void LoadVehicles_RejectsNullJsonRoot()\n  [Fact] public void LoadVehicles_RejectsNullVehicle()\n}\nclass \u0022VehicleJsonTests\u0022 as e_5e5a9c52cbc3151cccc9 {\n  [Fact] public void LoadVehicle_CreatesCarAndEngineFromObject()\n  [Theory] [InlineData(\\\u0022null\\\u0022)] [InlineData(\\\u0022[]\\\u0022)] [InlineData(\\\u0022\u0026#123;invalid\u0026#125;\\\u0022)] [InlineData(\\\u0022\u0026#123;\\\\\\\u0022type\\\\\\\u0022:\\\\\\\u0022Car\\\\\\\u0022\u0026#125;\\\u0022)] public void LoadVehicle_RejectsInvalidDocument(string json)\n}\nclass \u0022VehicleValidationTests\u0022 as e_6f5adbe00f276c7971db {\n  [Fact] public void Airplane_RejectsDualControlsWithOnePilotSeat()\n  [Fact] public void Boat_RejectsMoreCabinSeatsThanPassengerCapacity()\n  [Fact] public void Bus_AllowsZeroDriverSeatsForAutonomousBus()\n  [Fact] public void Bus_RejectsZeroTotalPassengerCapacity()\n  [Fact] public void Truck_RejectsFewerThanTwoWheelsPerAxle()\n}\ne_e0d9a07c0cb376b75c76 -[hidden]down-\u003E e_ed41b0f7b38a8a6c261c\ne_09b11f5e5768ac6dbe89 -[hidden]down-\u003E e_e8bf0c7380d36cd94bb7\ne_4635a4048dcd5b79e794 -[hidden]down-\u003E e_ad74eb1aad8d12911fbc\ne_ed41b0f7b38a8a6c261c -[hidden]down-\u003E e_ae1ae414f68a417632a9\ne_e8bf0c7380d36cd94bb7 -[hidden]down-\u003E e_e302f831203183bedd05\ne_ad74eb1aad8d12911fbc -[hidden]down-\u003E e_7d704edb220eb773ff35\ne_ae1ae414f68a417632a9 -[hidden]down-\u003E e_013d62cc3d4938063035\ne_e302f831203183bedd05 -[hidden]down-\u003E e_7a284b855abcc173bd5e\ne_7d704edb220eb773ff35 -[hidden]down-\u003E e_22af7dcc0b6b9b0ae884\ne_013d62cc3d4938063035 -[hidden]down-\u003E e_a5047bde016988483b34\ne_7a284b855abcc173bd5e -[hidden]down-\u003E e_5e5a9c52cbc3151cccc9\ne_22af7dcc0b6b9b0ae884 -[hidden]down-\u003E e_6f5adbe00f276c7971db\n}\npackage \u0022Garage.Tests.Fixtures\u0022 as e_4fd4f2cee5741b4a98b4 {\nclass \u0022EngineFixtures\u0022 as e_e1d2eb7a6478a677145a {\n  public static FlatEngine CreateFlatEngine(string serialNumber = \\\u0022FLAT123\\\u0022, string model = \\\u0022Aircraft flat 4\\\u0022, FuelType fuelType = FuelType.AviationGasoline, int horsePower = 180, int displacementCc = 5_900, int cylinderCount = 4)\n  public static InlineEngine CreateEngine(string serialNumber = \\\u0022ENG123\\\u0022, string model = \\\u0022Inline 4\\\u0022, FuelType fuelType = FuelType.Gasoline, int horsePower = 150, int displacementCc = 2_000, int cylinderCount = 4)\n}\nclass \u0022VehicleFixtures\u0022 as e_c1a9f6cbd56987559128 {\n  public static Airplane CreateAirplane(int pilotSeats = 2, bool hasDualControls = true, Engine? engine = null, string registrationNumber = \\\u0022SE-ABC\\\u0022, CountryCode countryCode = CountryCode.SWE)\n  public static Boat CreateBoat(int passengerCapacity = 8, int cabinPassengerSeats = 4, Engine? engine = null, string registrationNumber = \\\u0022SFB-2345\\\u0022, CountryCode countryCode = CountryCode.SWE)\n  public static Bus CreateBus(int passengerSeats = 30, int standingCapacity = 20, int driverSeats = 1, Engine? engine = null)\n  public static Car CreateCar(string registrationNumber = \\\u0022ABC123\\\u0022, VehicleColor color = VehicleColor.Black, string manufacturer = \\\u0022Volvo\\\u0022, int manufacturingYear = 2020, Engine? engine = null, CountryCode countryCode = CountryCode.SWE)\n  public static Motorcycle CreateMotorcycle(string registrationNumber = \\\u0022MCY123\\\u0022, VehicleColor color = VehicleColor.Red, int numberOfWheels = 2, Engine? engine = null)\n  public static Truck CreateTruck(int numberOfWheels = 6, int numberOfAxles = 3, double maximumLoadKg = 25_000, Engine? engine = null)\n}\n}\ne_c6d222290b958a69f4fc -[hidden]down-\u003E e_4fd4f2cee5741b4a98b4\nlegend bottom\n  \u003Cb\u003EHow to read this class diagram\u003C/b\u003E\n  Child --|\u003E Parent : solid line \u002B hollow triangle = inherits from\n  Class ..|\u003E Interface : dashed line \u002B hollow triangle = implements\n  The triangle points to the parent class or interface.\n  C = class; A = abstract class; I = interface; E = enum; S = struct.\n  Boxes group members; folder-shaped boxes group namespaces.\n  public / \u002B = accessible publicly; private / - = within the class\n  protected / # = class and derived classes; internal = same assembly\n  Type Name = field/property; Name(...) = method or constructor.\n  --- Related diagrams ---\n  [[../component/garage-components.puml Garage project components]]\n  [[../package/garage-packages.puml Garage projects and namespaces]]\nendlegend\n@enduml\n",
      "pumlHash": "793dfebdfb597449f3d7e36d66eb1bc2f90453287ce0375570bb378f3885d9e6"
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
      "svg": "structural/component/garage-components.svg",
      "puml": "@startuml\n\u0027 diagram-id: garage-components\n\u0027 Generated. Run the UML generate command; do not edit by hand.\nhide empty members\nskinparam classAttributeIconSize 0\ntitle Garage project components\ncomponent \u0022Garage.Console\u0022 as e_4e8a158f886433b7cb91\ncomponent \u0022Garage.Terminal\u0022 as e_3bdc5d7ed9efbc4af169\ncomponent \u0022Garage.Tests\u0022 as e_5a229a8a577b83de6207\ncomponent \u0022Garage\u0022 as e_fc55a3295fd213831954\ncomponent \u0022Vehicle\u0022 as e_6baf9469d9bef8128882\ne_4e8a158f886433b7cb91 --\u003E e_fc55a3295fd213831954 : references\ne_3bdc5d7ed9efbc4af169 --\u003E e_fc55a3295fd213831954 : references\ne_5a229a8a577b83de6207 --\u003E e_4e8a158f886433b7cb91 : references\ne_5a229a8a577b83de6207 --\u003E e_3bdc5d7ed9efbc4af169 : references\ne_5a229a8a577b83de6207 --\u003E e_fc55a3295fd213831954 : references\ne_5a229a8a577b83de6207 --\u003E e_6baf9469d9bef8128882 : references\ne_fc55a3295fd213831954 --\u003E e_6baf9469d9bef8128882 : references\nlegend bottom\n  Solid arrow: source project references the target project.\n  [[../package/garage-packages.puml Garage projects and namespaces]]\n  [[../class/garage-classes.puml Garage classes]]\n  [[../class/vehicle-classes.puml Vehicle classes]]\n  [[../class/garage-console-classes.puml Garage.Console classes]]\n  [[../class/garage-terminal-classes.puml Garage.Terminal classes]]\n  [[../class/garage-tests-classes.puml Garage.Tests classes]]\n  [[../../interaction/sequence/parking-sequence.puml Park an existing catalog vehicle]]\n  [[../deployment/local-deployment.puml Local Garage runtime]]\nendlegend\n@enduml\n",
      "pumlHash": "fbe8505899ea8bb8f76634995568bc4c64336e25f42145b7f7fb01c3144d74e7"
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
      "svg": "structural/package/garage-packages.svg",
      "puml": "@startuml\n\u0027 diagram-id: garage-packages\n\u0027 Generated. Run the UML generate command; do not edit by hand.\nhide empty members\nskinparam classAttributeIconSize 0\ntitle Garage projects and namespaces\npackage \u0022Garage.Console\u0022 as e_4e8a158f886433b7cb91 {\n  package \u0022Garage.ConsoleApp.Display\u0022 as e_9de32f7d100bfe0b432e { }\n  package \u0022Garage.ConsoleApp.Drafts\u0022 as e_c5b0fbf80f998c68cbcb { }\n  package \u0022Garage.ConsoleApp.Mapping\u0022 as e_3a9eaa677578cbe9c1df { }\n  package \u0022Garage.ConsoleApp.Menus\u0022 as e_f8d009d2fb96f407d004 { }\n  package \u0022Garage.ConsoleApp.Prompts\u0022 as e_12eb5d1aacf60ee95820 { }\n}\npackage \u0022Garage.Terminal\u0022 as e_3bdc5d7ed9efbc4af169 {\n  package \u0022Garage.Terminal.Forms\u0022 as e_e3884fdc3829d04d5bac { }\n  package \u0022Garage.Terminal.Presentation\u0022 as e_d4b69e557dadeb3325cb { }\n}\npackage \u0022Garage.Tests\u0022 as e_5a229a8a577b83de6207 {\n  package \u0022Garage.Tests\u0022 as e_0f1c02c4850cf2ad3811 { }\n  package \u0022Garage.Tests.Fixtures\u0022 as e_acd7f5ae0bd5fccf9e3d { }\n}\npackage \u0022Garage\u0022 as e_fc55a3295fd213831954 {\n  package \u0022Garage.Diagnostics\u0022 as e_ea481c78b81b80db5988 { }\n  package \u0022Garage.Documentation\u0022 as e_f5de614a19fdf3030dcd { }\n  package \u0022Garage.Models\u0022 as e_08834dd45de931ba1fcd { }\n  package \u0022Garage.Persistence.Json\u0022 as e_ca4317fe7e4fd39a8899 { }\n  package \u0022Garage.Persistence.Json.Contracts\u0022 as e_cce5127976a13666c25f { }\n  package \u0022Garage.Queries\u0022 as e_a6914bca9de7d0b6e7bc { }\n  package \u0022Garage.Results\u0022 as e_322b54eab66535aad2fe { }\n  package \u0022Garage.Services\u0022 as e_be652e04f07616dca31e { }\n  package \u0022Garage.Specifications\u0022 as e_d524e7959b08d00fcb27 { }\n}\npackage \u0022Vehicle\u0022 as e_6baf9469d9bef8128882 {\n  package \u0022Garage.Engines\u0022 as e_a8e8068c91680140002c { }\n  package \u0022Garage.Engines.Electric\u0022 as e_7e26a2547468f137cb37 { }\n  package \u0022Garage.Engines.ExternalCombustion\u0022 as e_8b7222bb985f2bd80d71 { }\n  package \u0022Garage.Engines.InternalCombustion\u0022 as e_8b2e1d55a3a9a7f07311 { }\n  package \u0022Garage.Engines.InternalCombustion.Piston\u0022 as e_bdff4f545c2ea10c1470 { }\n  package \u0022Garage.Engines.InternalCombustion.Turbine\u0022 as e_384c808b250ee0d3bb5d { }\n  package \u0022Garage.Engines.Specifications\u0022 as e_c98e764eca4aa9062ce1 { }\n  package \u0022Garage.Factories\u0022 as e_400f8bef6cf297e681d8 { }\n  package \u0022Garage.Vehicles\u0022 as e_b61b696f382917360ed0 { }\n  package \u0022Garage.Vehicles.Components\u0022 as e_f034617c6a613de7c0da { }\n  package \u0022Garage.Vehicles.Interfaces\u0022 as e_798d21f2272a791ef52a { }\n  package \u0022Garage.Vehicles.Specifications\u0022 as e_30b3f2e833734e4b75a9 { }\n  package \u0022Garage.Vehicles.Types\u0022 as e_9a13834fdf212e37fd93 { }\n}\ne_4e8a158f886433b7cb91 ..\u003E e_fc55a3295fd213831954 : references\ne_3bdc5d7ed9efbc4af169 ..\u003E e_fc55a3295fd213831954 : references\ne_5a229a8a577b83de6207 ..\u003E e_4e8a158f886433b7cb91 : references\ne_5a229a8a577b83de6207 ..\u003E e_3bdc5d7ed9efbc4af169 : references\ne_5a229a8a577b83de6207 ..\u003E e_fc55a3295fd213831954 : references\ne_5a229a8a577b83de6207 ..\u003E e_6baf9469d9bef8128882 : references\ne_fc55a3295fd213831954 ..\u003E e_6baf9469d9bef8128882 : references\nlegend bottom\n  Folder boxes: projects/namespaces; dashed arrows: project references.\n  [[../component/garage-components.puml Garage project components]]\nendlegend\n@enduml\n",
      "pumlHash": "6114f18b120d813b6466075fa98f982e099b6667f4ec578d803eb2247b8429de"
    },
    {
      "id": "parking-sequence",
      "type": "sequence",
      "title": "Park an existing catalog vehicle",
      "maintenance": "generated",
      "status": "active",
      "related": [
        "garage-components",
        "garage-classes",
        "parking-activity",
        "parking-spot-state"
      ],
      "source": "interaction/sequence/parking-sequence.puml",
      "svg": "interaction/sequence/parking-sequence.svg",
      "puml": "@startuml\n\u0027 diagram-id: parking-sequence\n\u0027 Generated from code annotations and source. Run generate; do not edit by hand.\ntitle Park an existing catalog vehicle\nactor \u0022Garage operator\u0022 as Actor\nparticipant \u0022Garage.Services.GarageService\u0022 as p_753cfee6aae6\nparticipant \u0022Garage.Results.ParkingResult\u0022 as p_426dd07c2e3a\nparticipant \u0022Garage.Models.Garage\u0022 as p_50a211325908\nparticipant \u0022Garage.Models.ParkingSpot\u0022 as p_b323161f1e5c\nnote over p_753cfee6aae6\nStatic source view; MaxDepth=3. Lifelines group calls by declared type, not runtime instance.\nAlternatives are possible source paths, not a recorded execution. Guards may be infeasible together.\nProperty getters and implicit/external exceptions are not expanded. Framework calls and callbacks are boundaries.\nCaller continuation assumes the callee returns normally. Async scheduling is not modeled.\nExpand bodies in: Garage.Models, Garage.Services. Other calls remain visible as boundaries.\nend note\nActor -\u003E p_753cfee6aae6 : Park(vehicle, garage, spotNumber)\nnote over p_753cfee6aae6\nExternal/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)\nend note\nnote over p_753cfee6aae6\nExternal/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(garage)\nend note\nnote over p_753cfee6aae6\nExternal/delegate call boundary (not expanded): Catalog.Vehicles.Contains(vehicle)\nend note\nalt !Catalog.Vehicles.Contains(vehicle)\np_753cfee6aae6 -\u003E p_426dd07c2e3a : Failed(\u0026quot;Choose a vehicle from this application\u0027s catalog.\u0026quot;, OperationError.VehicleNotFound)\nnote over p_426dd07c2e3a\nScope boundary: method body not expanded.\nend note\np_426dd07c2e3a --\u003E p_753cfee6aae6 : Garage.Results.ParkingResult (if call returns)\np_753cfee6aae6 --\u003E Actor : ParkingResult.Failed(\u0026quot;Choose a vehicle from this application\u0027s catalog.\u0026quot;, OperationError.VehicleNotFound)\nelse otherwise\np_753cfee6aae6 -\u003E p_753cfee6aae6 : ParkNewVehicle(vehicle, garage, spotNumber)\nnote over p_753cfee6aae6\nExternal/delegate call boundary (not expanded): garages.Contains(garage)\nend note\nalt !garages.Contains(garage)\np_753cfee6aae6 -\u003E p_426dd07c2e3a : Failed(\u0026quot;Choose a garage registered with this application.\u0026quot;, OperationError.ValidationFailed)\nnote over p_426dd07c2e3a\nScope boundary: method body not expanded.\nend note\np_426dd07c2e3a --\u003E p_753cfee6aae6 : Garage.Results.ParkingResult (if call returns)\np_753cfee6aae6 --\u003E p_753cfee6aae6 : ParkingResult.Failed(\u0026quot;Choose a garage registered with this application.\u0026quot;, OperationError.ValidationFailed)\nelse otherwise\np_753cfee6aae6 -\u003E p_753cfee6aae6 : IsParked(vehicle)\nnote over p_753cfee6aae6\nCallback boundary (not executed by this analysis): garage =\u0026gt; garage.Vehicles.Any(parked =\u0026gt; string.Equals(parked.RegistrationNumber, vehicle.RegistrationNumber, StringComparison.OrdinalIgnoreCase))\nend note\nnote over p_753cfee6aae6\nExternal/delegate call boundary (not expanded): garages.Any(garage =\u0026gt; garage.Vehicles.Any(parked =\u0026gt; string.Equals(parked.RegistrationNumber, vehicle.RegistrationNumber, StringComparison.OrdinalIgnoreCase)))\nend note\np_753cfee6aae6 --\u003E p_753cfee6aae6 : garages.Any(garage =\u0026gt; garage.Vehicles.Any(parked =\u0026gt; string.Equals(parked.RegistrationNumber, vehicle.RegistrationNumber, StringComparison.OrdinalIgnoreCase)))\nalt IsParked(vehicle)\np_753cfee6aae6 -\u003E p_426dd07c2e3a : Failed($\u0026quot;Vehicle {vehicle.RegistrationNumber} is already parked in a garage.\u0026quot;, OperationError.VehicleAlreadyParked)\nnote over p_426dd07c2e3a\nScope boundary: method body not expanded.\nend note\np_426dd07c2e3a --\u003E p_753cfee6aae6 : Garage.Results.ParkingResult (if call returns)\np_753cfee6aae6 --\u003E p_753cfee6aae6 : ParkingResult.Failed($\u0026quot;Vehicle {vehicle.RegistrationNumber} is already parked in a garage.\u0026quot;, OperationError.VehicleAlreadyParked)\nelse otherwise\nalt spotNumber is int spot\np_753cfee6aae6 -\u003E p_50a211325908 : Park(vehicle, spot)\nnote over p_50a211325908\nExternal/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)\nend note\nalt spot \u0026lt; 1 || spot \u0026gt; Capacity\np_50a211325908 -\u003E p_426dd07c2e3a : Failed($\u0026quot;Parking spot must be between 1 and {Capacity}.\u0026quot;, OperationError.SpotOutOfRange)\nnote over p_426dd07c2e3a\nScope boundary: method body not expanded.\nend note\np_426dd07c2e3a --\u003E p_50a211325908 : Garage.Results.ParkingResult (if call returns)\np_50a211325908 --\u003E p_753cfee6aae6 : ParkingResult.Failed($\u0026quot;Parking spot must be between 1 and {Capacity}.\u0026quot;, OperationError.SpotOutOfRange)\nelse otherwise\nalt parkingSpot.Vehicle is not null\np_50a211325908 -\u003E p_426dd07c2e3a : Failed($\u0026quot;Parking spot {spot} is occupied.\u0026quot;, OperationError.SpotOccupied)\nnote over p_426dd07c2e3a\nScope boundary: method body not expanded.\nend note\np_426dd07c2e3a --\u003E p_50a211325908 : Garage.Results.ParkingResult (if call returns)\np_50a211325908 --\u003E p_753cfee6aae6 : ParkingResult.Failed($\u0026quot;Parking spot {spot} is occupied.\u0026quot;, OperationError.SpotOccupied)\nelse otherwise\np_50a211325908 -\u003E p_b323161f1e5c : Fits(vehicle)\nnote over p_b323161f1e5c\nExternal/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)\nend note\nalt Dimensions is null\np_b323161f1e5c --\u003E p_50a211325908 : true\nelse otherwise\np_b323161f1e5c --\u003E p_50a211325908 : size.LengthMeters \u0026lt;= Dimensions.LengthMeters \u0026amp;\u0026amp; size.WidthMeters \u0026lt;= Dimensions.WidthMeters \u0026amp;\u0026amp; size.HeightMeters \u0026lt;= Dimensions.HeightMeters\nend\nalt !parkingSpot.Fits(vehicle)\np_50a211325908 -\u003E p_426dd07c2e3a : Failed($\u0026quot;Vehicle {vehicle.RegistrationNumber} does not fit in parking spot {spot}.\u0026quot;, OperationError.VehicleDoesNotFit)\nnote over p_426dd07c2e3a\nScope boundary: method body not expanded.\nend note\np_426dd07c2e3a --\u003E p_50a211325908 : Garage.Results.ParkingResult (if call returns)\np_50a211325908 --\u003E p_753cfee6aae6 : ParkingResult.Failed($\u0026quot;Vehicle {vehicle.RegistrationNumber} does not fit in parking spot {spot}.\u0026quot;, OperationError.VehicleDoesNotFit)\nelse otherwise\np_50a211325908 -\u003E p_50a211325908 : RegistrationExists(vehicle.RegistrationNumber)\nnote over p_50a211325908\nCallback boundary (not executed by this analysis): spot =\u0026gt; string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase)\nend note\nnote over p_50a211325908\nExternal/delegate call boundary (not expanded): parkingSpots.Any(spot =\u0026gt; string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase))\nend note\np_50a211325908 --\u003E p_50a211325908 : parkingSpots.Any(spot =\u0026gt; string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase))\nalt RegistrationExists(vehicle.RegistrationNumber)\np_50a211325908 -\u003E p_50a211325908 : DuplicateRegistration(vehicle)\np_50a211325908 -\u003E p_426dd07c2e3a : Failed($\u0026quot;A vehicle with registration number {vehicle.RegistrationNumber} is already parked.\u0026quot;, OperationError.DuplicateRegistration)\nnote over p_426dd07c2e3a\nScope boundary: method body not expanded.\nend note\np_426dd07c2e3a --\u003E p_50a211325908 : Garage.Results.ParkingResult (if call returns)\np_50a211325908 --\u003E p_50a211325908 : ParkingResult.Failed($\u0026quot;A vehicle with registration number {vehicle.RegistrationNumber} is already parked.\u0026quot;, OperationError.DuplicateRegistration)\np_50a211325908 --\u003E p_753cfee6aae6 : DuplicateRegistration(vehicle)\nelse otherwise\np_50a211325908 -\u003E p_b323161f1e5c : Park(vehicle)\nnote over p_b323161f1e5c\nExternal/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)\nend note\nalt Vehicle is not null is false\np_b323161f1e5c -\u003E p_b323161f1e5c : Fits(vehicle)\nnote over p_b323161f1e5c\nDepth boundary: method body not expanded.\nend note\np_b323161f1e5c --\u003E p_b323161f1e5c : bool (if call returns)\nelse short-circuit\nend\nalt Vehicle is not null || !Fits(vehicle)\nnote over p_b323161f1e5c\nConstructor/initializer boundary (not expanded): new InvalidOperationException(\u0026quot;The spot must be empty and large enough for the vehicle.\u0026quot;)\nend note\nnote over p_b323161f1e5c\nThrows: new InvalidOperationException(\u0026quot;The spot must be empty and large enough for the vehicle.\u0026quot;); this path terminates here.\nend note\nelse otherwise\np_b323161f1e5c --\u003E p_50a211325908 : complete\nend\np_50a211325908 -\u003E p_426dd07c2e3a : Completed(spot, $\u0026quot;Vehicle {vehicle.RegistrationNumber} parked at spot {spot}.\u0026quot;)\nnote over p_426dd07c2e3a\nScope boundary: method body not expanded.\nend note\np_426dd07c2e3a --\u003E p_50a211325908 : Garage.Results.ParkingResult (if call returns)\np_50a211325908 --\u003E p_753cfee6aae6 : ParkingResult.Completed(spot, $\u0026quot;Vehicle {vehicle.RegistrationNumber} parked at spot {spot}.\u0026quot;)\nend\nend\nend\nend\np_753cfee6aae6 --\u003E p_753cfee6aae6 : garage.Park(vehicle, spot)\nelse otherwise\np_753cfee6aae6 -\u003E p_50a211325908 : Park(vehicle)\nnote over p_50a211325908\nExternal/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)\nend note\np_50a211325908 -\u003E p_50a211325908 : RegistrationExists(vehicle.RegistrationNumber)\nnote over p_50a211325908\nCallback boundary (not executed by this analysis): spot =\u0026gt; string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase)\nend note\nnote over p_50a211325908\nExternal/delegate call boundary (not expanded): parkingSpots.Any(spot =\u0026gt; string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase))\nend note\np_50a211325908 --\u003E p_50a211325908 : parkingSpots.Any(spot =\u0026gt; string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase))\nalt RegistrationExists(vehicle.RegistrationNumber)\np_50a211325908 -\u003E p_50a211325908 : DuplicateRegistration(vehicle)\np_50a211325908 -\u003E p_426dd07c2e3a : Failed($\u0026quot;A vehicle with registration number {vehicle.RegistrationNumber} is already parked.\u0026quot;, OperationError.DuplicateRegistration)\nnote over p_426dd07c2e3a\nScope boundary: method body not expanded.\nend note\np_426dd07c2e3a --\u003E p_50a211325908 : Garage.Results.ParkingResult (if call returns)\np_50a211325908 --\u003E p_50a211325908 : ParkingResult.Failed($\u0026quot;A vehicle with registration number {vehicle.RegistrationNumber} is already parked.\u0026quot;, OperationError.DuplicateRegistration)\np_50a211325908 --\u003E p_753cfee6aae6 : DuplicateRegistration(vehicle)\nelse otherwise\nnote over p_50a211325908\nCallback boundary (not executed by this analysis): spot =\u0026gt; spot.Vehicle is null \u0026amp;\u0026amp; spot.Fits(vehicle)\nend note\nnote over p_50a211325908\nExternal/delegate call boundary (not expanded): parkingSpots.FirstOrDefault(spot =\u0026gt; spot.Vehicle is null \u0026amp;\u0026amp; spot.Fits(vehicle))\nend note\nalt availableSpot is null\nalt AvailableSpaces == 0\np_50a211325908 -\u003E p_426dd07c2e3a : Failed(\u0026quot;The garage is full.\u0026quot;, OperationError.GarageFull)\nnote over p_426dd07c2e3a\nScope boundary: method body not expanded.\nend note\np_426dd07c2e3a --\u003E p_50a211325908 : Garage.Results.ParkingResult (if call returns)\np_50a211325908 --\u003E p_753cfee6aae6 : ParkingResult.Failed(\u0026quot;The garage is full.\u0026quot;, OperationError.GarageFull)\nelse otherwise\np_50a211325908 -\u003E p_426dd07c2e3a : Failed(\u0026quot;No available parking spot is large enough for this vehicle.\u0026quot;, OperationError.VehicleDoesNotFit)\nnote over p_426dd07c2e3a\nScope boundary: method body not expanded.\nend note\np_426dd07c2e3a --\u003E p_50a211325908 : Garage.Results.ParkingResult (if call returns)\np_50a211325908 --\u003E p_753cfee6aae6 : ParkingResult.Failed(\u0026quot;No available parking spot is large enough for this vehicle.\u0026quot;, OperationError.VehicleDoesNotFit)\nend\nelse otherwise\np_50a211325908 -\u003E p_50a211325908 : Park(vehicle, availableSpot.Number)\nnote over p_50a211325908\nExternal/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)\nend note\nalt spot \u0026lt; 1 || spot \u0026gt; Capacity\np_50a211325908 -\u003E p_426dd07c2e3a : Failed($\u0026quot;Parking spot must be between 1 and {Capacity}.\u0026quot;, OperationError.SpotOutOfRange)\nnote over p_426dd07c2e3a\nScope boundary: method body not expanded.\nend note\np_426dd07c2e3a --\u003E p_50a211325908 : Garage.Results.ParkingResult (if call returns)\np_50a211325908 --\u003E p_50a211325908 : ParkingResult.Failed($\u0026quot;Parking spot must be between 1 and {Capacity}.\u0026quot;, OperationError.SpotOutOfRange)\nelse otherwise\nalt parkingSpot.Vehicle is not null\np_50a211325908 -\u003E p_426dd07c2e3a : Failed($\u0026quot;Parking spot {spot} is occupied.\u0026quot;, OperationError.SpotOccupied)\nnote over p_426dd07c2e3a\nScope boundary: method body not expanded.\nend note\np_426dd07c2e3a --\u003E p_50a211325908 : Garage.Results.ParkingResult (if call returns)\np_50a211325908 --\u003E p_50a211325908 : ParkingResult.Failed($\u0026quot;Parking spot {spot} is occupied.\u0026quot;, OperationError.SpotOccupied)\nelse otherwise\np_50a211325908 -\u003E p_b323161f1e5c : Fits(vehicle)\nnote over p_b323161f1e5c\nDepth boundary: method body not expanded.\nend note\np_b323161f1e5c --\u003E p_50a211325908 : bool (if call returns)\nalt !parkingSpot.Fits(vehicle)\np_50a211325908 -\u003E p_426dd07c2e3a : Failed($\u0026quot;Vehicle {vehicle.RegistrationNumber} does not fit in parking spot {spot}.\u0026quot;, OperationError.VehicleDoesNotFit)\nnote over p_426dd07c2e3a\nScope boundary: method body not expanded.\nend note\np_426dd07c2e3a --\u003E p_50a211325908 : Garage.Results.ParkingResult (if call returns)\np_50a211325908 --\u003E p_50a211325908 : ParkingResult.Failed($\u0026quot;Vehicle {vehicle.RegistrationNumber} does not fit in parking spot {spot}.\u0026quot;, OperationError.VehicleDoesNotFit)\nelse otherwise\np_50a211325908 -\u003E p_50a211325908 : RegistrationExists(vehicle.RegistrationNumber)\nnote over p_50a211325908\nDepth boundary: method body not expanded.\nend note\np_50a211325908 --\u003E p_50a211325908 : bool (if call returns)\nalt RegistrationExists(vehicle.RegistrationNumber)\np_50a211325908 -\u003E p_50a211325908 : DuplicateRegistration(vehicle)\nnote over p_50a211325908\nDepth boundary: method body not expanded.\nend note\np_50a211325908 --\u003E p_50a211325908 : Garage.Results.ParkingResult (if call returns)\np_50a211325908 --\u003E p_50a211325908 : DuplicateRegistration(vehicle)\nelse otherwise\np_50a211325908 -\u003E p_b323161f1e5c : Park(vehicle)\nnote over p_b323161f1e5c\nDepth boundary: method body not expanded.\nend note\np_b323161f1e5c --\u003E p_50a211325908 : complete (if call returns)\np_50a211325908 -\u003E p_426dd07c2e3a : Completed(spot, $\u0026quot;Vehicle {vehicle.RegistrationNumber} parked at spot {spot}.\u0026quot;)\nnote over p_426dd07c2e3a\nScope boundary: method body not expanded.\nend note\np_426dd07c2e3a --\u003E p_50a211325908 : Garage.Results.ParkingResult (if call returns)\np_50a211325908 --\u003E p_50a211325908 : ParkingResult.Completed(spot, $\u0026quot;Vehicle {vehicle.RegistrationNumber} parked at spot {spot}.\u0026quot;)\nend\nend\nend\nend\np_50a211325908 --\u003E p_753cfee6aae6 : Park(vehicle, availableSpot.Number)\nend\nend\np_753cfee6aae6 --\u003E p_753cfee6aae6 : garage.Park(vehicle)\nend\nend\nend\np_753cfee6aae6 --\u003E Actor : ParkNewVehicle(vehicle, garage, spotNumber)\nend\nlegend bottom\n  [[../../structural/component/garage-components.puml Garage project components]]\n  [[../../structural/class/garage-classes.puml Garage classes]]\n  [[../../behavioral/activity/parking-activity.puml Parking validation and assignment]]\n  [[../../behavioral/state-machine/parking-spot-state.puml Parking spot occupancy]]\nendlegend\n@enduml\n",
      "pumlHash": "4e5a7affd28ff873053070a4e3c908dad4214e7f29d36a4b74c3924a7c0adfd3"
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
      "svg": "behavioral/activity/parking-activity.svg",
      "puml": "@startuml\n\u0027 diagram-id: parking-activity\n\u0027 entities: operation:park\ntitle Parking validation and assignment\nstart\n:Receive non-null vehicle, garage, optional spot number;\nif (Vehicle belongs to catalog?) then (yes)\nelse (no)\n  :Return VehicleNotFound;\n  stop\nendif\nif (Garage registered?) then (yes)\nelse (no)\n  :Return ValidationFailed;\n  stop\nendif\nif (Registration already parked in any garage?) then (yes)\n  :Return VehicleAlreadyParked;\n  stop\nendif\nif (Spot number supplied?) then (yes)\n  :Use supplied spot number;\nelse (no)\n  :Find first empty spot that fits vehicle;\n  if (Suitable spot found?) then (yes)\n    :Use matching spot number;\n  else (no)\n    :Return GarageFull or VehicleDoesNotFit;\n    stop\n  endif\nendif\n:Validate spot range, occupancy,\\ndimensions and duplicate registration;\nif (Validation successful?) then (yes)\n  :ParkingSpot.Park(vehicle);\n  :Return ParkingResult.Completed;\nelse (no)\n  :Return ParkingResult.Failed with error code;\nendif\nstop\nlegend bottom\n  Scope: GarageService.Park with non-null inputs; guards are summarized.\n  [[../../interaction/sequence/parking-sequence.puml Parking sequence]]\n  [[../state-machine/parking-spot-state.puml Spot state]]\nendlegend\n@enduml\n",
      "pumlHash": "f7e69eba0bb51a4f7d2a4c7afb6b081b70a010c8e08991981b1e0dc67f82d235"
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
      "svg": "behavioral/state-machine/parking-spot-state.svg",
      "puml": "@startuml\n\u0027 diagram-id: parking-spot-state\n\u0027 entities: model:parking-spot\ntitle Parking spot occupancy\n[*] --\u003E Empty : Construct valid numbered spot\nEmpty --\u003E Occupied : Park(vehicle) [non-null and Fits(vehicle)] / assign Vehicle\nOccupied --\u003E Empty : Clear() / Vehicle = null\nEmpty --\u003E Empty : Clear() / Vehicle remains null\nnote right of Empty\n  A null argument or a vehicle that does not fit\n  causes Park to throw; occupancy is unchanged.\nend note\nnote right of Occupied\n  Park throws if the spot is already occupied.\n  Garage.Remove calls Clear on a matched spot.\n  No separate persisted lifecycle exists.\nend note\nlegend bottom\n  [[../../interaction/sequence/parking-sequence.puml Parking sequence]]\n  [[../activity/parking-activity.puml Parking activity]]\nendlegend\n@enduml\n",
      "pumlHash": "213fd0d7df92fd8b4e51a57fe05dee22a31ef3ad17108342a00079524ae17022"
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
      "svg": "structural/deployment/local-deployment.svg",
      "puml": "@startuml\n\u0027 diagram-id: local-deployment\n\u0027 entities: system:garage, component:console, component:terminal\ntitle Local Garage runtime\nnode \u0022User workstation\u0022 as Workstation {\n  node \u0022.NET 10 process (choose an interface)\u0022 as Runtime {\n    artifact \u0022Garage.Console executable\u0022 as Console\n    artifact \u0022Garage.Terminal executable\u0022 as Terminal\n    artifact \u0022Garage library\u0022 as Domain\n    artifact \u0022Vehicle library\u0022 as Vehicles\n    Console --\u003E Domain\n    Terminal --\u003E Domain\n    Domain --\u003E Vehicles\n  }\n  folder \u0022Local JSON files\u0022 as Json\n  folder \u0022Local diagnostic logs\u0022 as Logs\n  Domain ..\u003E Json : load layouts and vehicles\n  Domain ..\u003E Logs : diagnostic logging\n}\nnote bottom of Runtime\n  Each interface runs as its own process.\n  Garage and vehicle state live in memory for that session.\n  JSON imports do not persist interactive changes.\nend note\nlegend bottom\n  [[../component/garage-components.puml Components]]\n  [[../../behavioral/use-case/garage-use-cases.puml Use cases]]\nendlegend\n@enduml\n",
      "pumlHash": "23246d9178fe465855f230466781ee2e914765197cebc22d13405383551fe596"
    },
    {
      "id": "garage-use-cases",
      "type": "use-case",
      "title": "Garage user capabilities",
      "maintenance": "generated",
      "status": "active",
      "related": [
        "garage-components",
        "parking-sequence"
      ],
      "source": "behavioral/use-case/garage-use-cases.puml",
      "svg": "behavioral/use-case/garage-use-cases.svg",
      "puml": "@startuml\n\u0027 diagram-id: garage-use-cases\n\u0027 Generated from code annotations and source. Run generate; do not edit by hand.\ntitle Garage user capabilities\nleft to right direction\nactor \u0022Garage operator\u0022 as a_7348bf17d801\nrectangle \u0022Garage application\u0022 {\n  usecase \u0022Create or import garage\u0022 as u_create_garage\n  usecase \u0022Create or import vehicle\u0022 as u_create_vehicle\n  usecase \u0022Inspect parking spaces\u0022 as u_inspect\n  usecase \u0022List garages and vehicles\u0022 as u_list\n  usecase \u0022Park vehicle\u0022 as u_park_vehicle\n  usecase \u0022Remove parked vehicle\u0022 as u_remove\n  usecase \u0022Search parked vehicles\u0022 as u_search\n}\na_7348bf17d801 --\u003E u_create_garage\na_7348bf17d801 --\u003E u_create_vehicle\na_7348bf17d801 --\u003E u_inspect\na_7348bf17d801 --\u003E u_list\na_7348bf17d801 --\u003E u_park_vehicle\na_7348bf17d801 --\u003E u_remove\na_7348bf17d801 --\u003E u_search\nlegend bottom\n  [[../../structural/component/garage-components.puml Garage project components]]\n  [[../../interaction/sequence/parking-sequence.puml Park an existing catalog vehicle]]\nendlegend\n@enduml\n",
      "pumlHash": "80c631901e5c4b4e07e98e719ea5b848e939fea8c27389408d7afa042800103e"
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
      "svg": "structural/object/garage-object.svg",
      "puml": "@startuml\n\u0027 diagram-id: garage-object\n\u0027 entities: system:garage\ntitle TEMPLATE: illustrative object snapshot\nobject \u0022garage : Garage\u0022 as Garage {\n  GarageName = \u0022Example Garage\u0022\n  Capacity = 2\n}\nobject \u0022spot1 : ParkingSpot\u0022 as Spot {\n  Number = 1\n  Vehicle = null\n}\nGarage *-- Spot : parkingSpots\nnote bottom\n  Template only. Replace with a verified snapshot from a test or scenario.\n  [[../class/garage-classes.puml Garage classes]]\nend note\n@enduml\n",
      "pumlHash": "6a3385fc163f3ed8fe13da7ab7d35eea2a24c403c795bce61a06dded2bcba7f8"
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
      "svg": "structural/composite-structure/garage-composite.svg",
      "puml": "@startuml\n\u0027 diagram-id: garage-composite\n\u0027 entities: system:garage\ntitle TEMPLATE: internal collaboration\nrectangle \u0022Garage application (composite)\u0022 {\n  rectangle \u0022ui : interface\u0022 as UI\n  rectangle \u0022service : GarageService\u0022 as Service\n  rectangle \u0022catalog : VehicleCatalog\u0022 as Catalog\n  UI --\u003E Service : operations\n  Service --\u003E Catalog : vehicles\n}\nnote bottom\n  Template only. Define the intended parts, ports and connectors before promotion.\n  [[../component/garage-components.puml Components]]\nend note\n@enduml\n",
      "pumlHash": "25e1f76d9aa7ab3ad325cffa02eb6a750b970d5231e17d22a6e9257611abab11"
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
      "svg": "structural/profile/garage-profile.svg",
      "puml": "@startuml\n\u0027 diagram-id: garage-profile\n\u0027 entities: system:garage\ntitle TEMPLATE: optional modeling profile\npackage \u0022Garage profile (proposed)\u0022 \u003C\u003Cprofile\u003E\u003E {\n  class \u0022Class\u0022 as UMLClass \u003C\u003Cmetaclass\u003E\u003E\n  class \u0022DomainEntity\u0022 as DomainEntity \u003C\u003Cstereotype\u003E\u003E {\n    sourceId : String\n  }\n  DomainEntity --|\u003E UMLClass : extends (illustrative)\n}\nnote bottom\n  Template only; no custom UML profile is applied to generated diagrams.\n  PlantUML uses class notation here; this is not an executable UML metamodel.\n  [[../component/garage-components.puml Components]]\nend note\n@enduml\n",
      "pumlHash": "92eecafae9635c8e6d9be368af5934924aa63458941ffd1d9b5b420feb85ae33"
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
      "svg": "interaction/communication/parking-communication.svg",
      "puml": "@startuml\n\u0027 diagram-id: parking-communication\n\u0027 entities: system:garage\ntitle TEMPLATE: parking communication\nobject \u0022ui : Interface\u0022 as UI\nobject \u0022service : GarageService\u0022 as Service\nobject \u0022garage : Garage\u0022 as Garage\nUI --\u003E Service : 1: Park(vehicle, garage, spot?)\nService --\u003E Garage : 1.1: Park(vehicle, spot?)\nnote bottom\n  Template only. Verify guards and numbered messages against a chosen scenario.\n  Communication is expressed using objects and numbered links.\n  [[../sequence/parking-sequence.puml Reviewed parking sequence]]\nend note\n@enduml\n",
      "pumlHash": "ffdce1d37bb37c6b1f8cc66b93f56877a1fe35ce45d09875276c4301d5ba3270"
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
      "svg": "interaction/interaction-overview/parking-interaction-overview.svg",
      "puml": "@startuml\n\u0027 diagram-id: parking-interaction-overview\n\u0027 entities: system:garage\ntitle TEMPLATE: interaction overview\nstart\n:ref - Select garage and vehicle;\n:ref - Parking sequence;\nif (Parking successful?) then (yes)\n  :ref - Refresh occupancy;\nelse (no)\n  :ref - Display failure;\nendif\nstop\nlegend bottom\n  Template only. Select and verify the constituent interactions before promotion.\n  Interaction references use PlantUML activity notation.\n  [[../sequence/parking-sequence.puml Reviewed parking sequence]]\nendlegend\n@enduml\n",
      "pumlHash": "55dcbc666f990cb4643651aca91046c648602c3eeea21f91dc1fcdd8b2fa614f"
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
      "svg": "interaction/timing/parking-timing.svg",
      "puml": "@startuml\n\u0027 diagram-id: parking-timing\n\u0027 entities: system:garage\ntitle TEMPLATE: illustrative parking timeline\nrobust \u0022Spot occupancy\u0022 as Spot\n@0\nSpot is Empty\n@10\nSpot is Occupied\n@20\nSpot is Empty\nlegend bottom\n  Template only. Times are illustrative units, not measured durations or SLAs.\n  Replace with evidence from a test or trace before promotion.\n  [[../../behavioral/state-machine/parking-spot-state.puml Reviewed spot state]]\nendlegend\n@enduml\n",
      "pumlHash": "80c5cbdb4b45031b3073f0bcca4d4873f2490fd8612cc371731985108c227c4f"
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
          "bases": [],
          "parent": null
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Documentation.SequenceViewAttribute",
          "name": "SequenceViewAttribute",
          "kind": "class",
          "group": "Garage.Documentation",
          "members": [
            "primary constructor SequenceViewAttribute(string id)",
            "public int MaxDepth {  get;  set; }",
            "public string Id {  get; }",
            "public string[] ExpandNamespaces {  get;  set; }"
          ],
          "files": [
            "Garage/Documentation/DiagramAttributes.cs"
          ],
          "declaration": "public sealed class SequenceViewAttribute(string id)",
          "bases": [
            "Attribute"
          ],
          "parent": null
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Documentation.UseCaseAttribute",
          "name": "UseCaseAttribute",
          "kind": "class",
          "group": "Garage.Documentation",
          "members": [
            "primary constructor UseCaseAttribute(string id, string title)",
            "public string Actor {  get;  set; }",
            "public string Id {  get; }",
            "public string Title {  get; }"
          ],
          "files": [
            "Garage/Documentation/DiagramAttributes.cs"
          ],
          "declaration": "public sealed class UseCaseAttribute(string id, string title)",
          "bases": [
            "Attribute"
          ],
          "parent": null
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Models.Garage",
          "name": "Garage",
          "kind": "class",
          "group": "Garage.Models",
          "members": [
            "[UseCase(\u0022remove\u0022, \u0022Remove parked vehicle\u0022)]\npublic GarageOperationResult Remove(string registrationNumber)",
            "[UseCase(\u0022search\u0022, \u0022Search parked vehicles\u0022)]\npublic IReadOnlyList\u003CVehicle\u003E Search(VehicleSearchCriteria criteria)",
            "private Garage(string garageName, int capacity, List\u003CVehicle\u003E initialVehicles, IReadOnlyList\u003CDimensions\u003E? spotDimensions)",
            "private bool RegistrationExists(string registrationNumber)",
            "private readonly List\u003CParkingSpot\u003E parkingSpots",
            "private static ParkingResult DuplicateRegistration(Vehicle vehicle)",
            "public Garage(string garageName, IReadOnlyList\u003CDimensions\u003E spotDimensions, List\u003CVehicle\u003E? initialVehicles = null)",
            "public Garage(string garageName, List\u003CVehicle\u003E vehicles)",
            "public Garage(string garageName, int capacity)",
            "public Garage(string garageName, int capacity, List\u003CVehicle\u003E initialVehicles)",
            "public GarageOperationResult RemoveAtSpot(int spotNumber)",
            "public IReadOnlyList\u003CParkedVehicleInfo\u003E ParkedVehicles { get; }",
            "public IReadOnlyList\u003CParkingSpotInfo\u003E SpotDetails { get; }",
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Services.GarageService",
          "name": "GarageService",
          "kind": "class",
          "group": "Garage.Services",
          "members": [
            "[UseCase(\u0022create-garage\u0022, \u0022Create or import garage\u0022)]\npublic GarageCreationResult CreateGarage(string name, int capacity)",
            "[UseCase(\u0022create-garage\u0022, \u0022Create or import garage\u0022)]\npublic GarageCreationResult CreateGarageFromJson(string configurationPath, string? placementPath = null)",
            "[UseCase(\u0022park-vehicle\u0022, \u0022Park vehicle\u0022)]\n[SequenceView(\u0022parking-sequence\u0022, MaxDepth = 3, ExpandNamespaces = new[] { \u0022Garage.Services\u0022, \u0022Garage.Models\u0022 })]\npublic ParkingResult Park(Vehicle vehicle, VehicleGarage garage, int? spotNumber = null)",
            "private GarageCreationResult CreateAndRegister(Func\u003CVehicleGarage\u003E factory)",
            "private GarageCreationResult RegisterGarage(VehicleGarage garage)",
            "private ParkingResult ParkNewVehicle(Vehicle vehicle, VehicleGarage garage, int? spotNumber)",
            "private readonly List\u003CVehicleGarage\u003E garages",
            "public GarageCreationResult CreateGarage(string name, IReadOnlyList\u003CDimensions\u003E sizes)",
            "public GarageService(List\u003CVehicleGarage\u003E initialGarages, List\u003CVehicle\u003E initialVehicles)",
            "public IReadOnlyList\u003CVehicle\u003E GetParkableVehicles(VehicleGarage garage, int? spotNumber = null)",
            "public IReadOnlyList\u003CVehicleGarage\u003E Garages { get; }",
            "public VehicleCatalog Catalog {  get; }",
            "public VehicleCreationService VehicleCreation {  get; }",
            "public bool ContainsGarage(string name)",
            "public bool IsParked(Vehicle vehicle)"
          ],
          "files": [
            "Garage/Services/GarageService.cs"
          ],
          "declaration": "public sealed class GarageService",
          "bases": [],
          "parent": null
        },
        {
          "id": "type:Garage/Garage.csproj:Garage.Services.VehicleCreationService",
          "name": "VehicleCreationService",
          "kind": "class",
          "group": "Garage.Services",
          "members": [
            "[UseCase(\u0022create-vehicle\u0022, \u0022Create or import vehicle\u0022)]\npublic VehicleCreationResult Create(Func\u003CVehicle\u003E factory, VehicleGarage? targetGarage = null, int? spotNumber = null)",
            "[UseCase(\u0022create-vehicle\u0022, \u0022Create or import vehicle\u0022)]\npublic VehicleCreationResult FromJson(string path, VehicleGarage? targetGarage = null, int? spotNumber = null)",
            "internal VehicleCreationService(VehicleCatalog catalog, Func\u003CVehicle, VehicleGarage, int?, ParkingResult\u003E park)",
            "private readonly Func\u003CVehicle, VehicleGarage, int?, ParkingResult\u003E park",
            "private readonly VehicleCatalog catalog"
          ],
          "files": [
            "Garage/Services/VehicleCreationService.cs"
          ],
          "declaration": "public sealed class VehicleCreationService",
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
        }
      ],
      "edges": [],
      "sequence": null,
      "timing": null,
      "notes": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
      ],
      "sequence": null,
      "timing": null,
      "notes": null
    },
    "garage-composite": {
      "id": "garage-composite",
      "title": "Template: composite-structure",
      "type": "composite-structure",
      "nodes": [
        {
          "id": "garage-composite:container-1",
          "name": "Garage application (composite)",
          "kind": "boundary",
          "group": "",
          "members": [
            "Contains: ui : interface",
            "Contains: service : GarageService",
            "Contains: catalog : VehicleCatalog"
          ],
          "files": [
            "docs/uml/structural/composite-structure/garage-composite.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "garage-composite:UI",
          "name": "ui : interface",
          "kind": "boundary",
          "group": "Garage application (composite)",
          "members": [],
          "files": [
            "docs/uml/structural/composite-structure/garage-composite.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "garage-composite:container-1"
        },
        {
          "id": "garage-composite:Service",
          "name": "service : GarageService",
          "kind": "boundary",
          "group": "Garage application (composite)",
          "members": [],
          "files": [
            "docs/uml/structural/composite-structure/garage-composite.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "garage-composite:container-1"
        },
        {
          "id": "garage-composite:Catalog",
          "name": "catalog : VehicleCatalog",
          "kind": "boundary",
          "group": "Garage application (composite)",
          "members": [],
          "files": [
            "docs/uml/structural/composite-structure/garage-composite.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "garage-composite:container-1"
        }
      ],
      "edges": [
        {
          "id": "garage-composite:edge-2",
          "source": "garage-composite:UI",
          "target": "garage-composite:Service",
          "kind": "connection",
          "label": "operations"
        },
        {
          "id": "garage-composite:edge-3",
          "source": "garage-composite:Service",
          "target": "garage-composite:Catalog",
          "kind": "connection",
          "label": "vehicles"
        }
      ],
      "sequence": null,
      "timing": null,
      "notes": [
        "Template only. Define the intended parts, ports and connectors before promotion. [[../component/garage-components.puml Components]]"
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
      ],
      "sequence": null,
      "timing": null,
      "notes": null
    },
    "garage-object": {
      "id": "garage-object",
      "title": "Template: object",
      "type": "object",
      "nodes": [
        {
          "id": "garage-object:Garage",
          "name": "garage : Garage",
          "kind": "object",
          "group": "",
          "members": [
            "GarageName = \u0022Example Garage\u0022",
            "Capacity = 2"
          ],
          "files": [
            "docs/uml/structural/object/garage-object.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "garage-object:Spot",
          "name": "spot1 : ParkingSpot",
          "kind": "object",
          "group": "",
          "members": [
            "Number = 1",
            "Vehicle = null"
          ],
          "files": [
            "docs/uml/structural/object/garage-object.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        }
      ],
      "edges": [
        {
          "id": "garage-object:edge-1",
          "source": "garage-object:Garage",
          "target": "garage-object:Spot",
          "kind": "composition",
          "label": "parkingSpots"
        }
      ],
      "sequence": null,
      "timing": null,
      "notes": [
        "Template only. Replace with a verified snapshot from a test or scenario. [[../class/garage-classes.puml Garage classes]]"
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
        },
        {
          "id": "project:Garage/Garage.csproj",
          "name": "Garage",
          "kind": "package",
          "group": "",
          "members": [
            "Garage.Diagnostics",
            "Garage.Documentation",
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
      ],
      "sequence": null,
      "timing": null,
      "notes": null
    },
    "garage-profile": {
      "id": "garage-profile",
      "title": "Template: profile",
      "type": "profile",
      "nodes": [
        {
          "id": "garage-profile:container-1",
          "name": "Garage profile (proposed)",
          "kind": "package",
          "group": "",
          "members": [
            "Contains: Class",
            "Contains: DomainEntity"
          ],
          "files": [
            "docs/uml/structural/profile/garage-profile.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "garage-profile:UMLClass",
          "name": "Class",
          "kind": "metaclass",
          "group": "Garage profile (proposed)",
          "members": [],
          "files": [
            "docs/uml/structural/profile/garage-profile.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "garage-profile:container-1"
        },
        {
          "id": "garage-profile:DomainEntity",
          "name": "DomainEntity",
          "kind": "stereotype",
          "group": "Garage profile (proposed)",
          "members": [
            "sourceId : String"
          ],
          "files": [
            "docs/uml/structural/profile/garage-profile.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "garage-profile:container-1"
        }
      ],
      "edges": [
        {
          "id": "garage-profile:edge-2",
          "source": "garage-profile:DomainEntity",
          "target": "garage-profile:UMLClass",
          "kind": "inheritance",
          "label": "extends (illustrative)"
        }
      ],
      "sequence": null,
      "timing": null,
      "notes": [
        "Template only; no custom UML profile is applied to generated diagrams. PlantUML uses class notation here; this is not an executable UML metamodel. [[../component/garage-components.puml Components]]"
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          ],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
        }
      ],
      "edges": [],
      "sequence": null,
      "timing": null,
      "notes": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
        }
      ],
      "edges": [],
      "sequence": null,
      "timing": null,
      "notes": null
    },
    "garage-use-cases": {
      "id": "garage-use-cases",
      "title": "Garage user capabilities",
      "type": "use-case",
      "nodes": [
        {
          "id": "garage-use-cases:a_7348bf17d801",
          "name": "Garage operator",
          "kind": "actor",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/use-case/garage-use-cases.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "garage-use-cases:container-1",
          "name": "Garage application",
          "kind": "boundary",
          "group": "",
          "members": [
            "Contains: Create or import garage",
            "Contains: Create or import vehicle",
            "Contains: Inspect parking spaces",
            "Contains: List garages and vehicles",
            "Contains: Park vehicle",
            "Contains: Remove parked vehicle",
            "Contains: Search parked vehicles"
          ],
          "files": [
            "docs/uml/behavioral/use-case/garage-use-cases.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "garage-use-cases:u_create_garage",
          "name": "Create or import garage",
          "kind": "use-case",
          "group": "Garage application",
          "members": [],
          "files": [
            "Garage/Services/GarageService.cs"
          ],
          "declaration": "",
          "bases": [],
          "parent": "garage-use-cases:container-1"
        },
        {
          "id": "garage-use-cases:u_create_vehicle",
          "name": "Create or import vehicle",
          "kind": "use-case",
          "group": "Garage application",
          "members": [],
          "files": [
            "Garage/Services/VehicleCreationService.cs"
          ],
          "declaration": "",
          "bases": [],
          "parent": "garage-use-cases:container-1"
        },
        {
          "id": "garage-use-cases:u_inspect",
          "name": "Inspect parking spaces",
          "kind": "use-case",
          "group": "Garage application",
          "members": [],
          "files": [
            "Garage/Models/Garage.cs"
          ],
          "declaration": "",
          "bases": [],
          "parent": "garage-use-cases:container-1"
        },
        {
          "id": "garage-use-cases:u_list",
          "name": "List garages and vehicles",
          "kind": "use-case",
          "group": "Garage application",
          "members": [],
          "files": [
            "Garage/Services/GarageService.cs"
          ],
          "declaration": "",
          "bases": [],
          "parent": "garage-use-cases:container-1"
        },
        {
          "id": "garage-use-cases:u_park_vehicle",
          "name": "Park vehicle",
          "kind": "use-case",
          "group": "Garage application",
          "members": [],
          "files": [
            "Garage/Services/GarageService.cs"
          ],
          "declaration": "",
          "bases": [],
          "parent": "garage-use-cases:container-1"
        },
        {
          "id": "garage-use-cases:u_remove",
          "name": "Remove parked vehicle",
          "kind": "use-case",
          "group": "Garage application",
          "members": [],
          "files": [
            "Garage/Models/Garage.cs"
          ],
          "declaration": "",
          "bases": [],
          "parent": "garage-use-cases:container-1"
        },
        {
          "id": "garage-use-cases:u_search",
          "name": "Search parked vehicles",
          "kind": "use-case",
          "group": "Garage application",
          "members": [],
          "files": [
            "Garage/Models/Garage.cs"
          ],
          "declaration": "",
          "bases": [],
          "parent": "garage-use-cases:container-1"
        }
      ],
      "edges": [
        {
          "id": "garage-use-cases:edge-2",
          "source": "garage-use-cases:a_7348bf17d801",
          "target": "garage-use-cases:u_create_garage",
          "kind": "association",
          "label": ""
        },
        {
          "id": "garage-use-cases:edge-3",
          "source": "garage-use-cases:a_7348bf17d801",
          "target": "garage-use-cases:u_create_vehicle",
          "kind": "association",
          "label": ""
        },
        {
          "id": "garage-use-cases:edge-4",
          "source": "garage-use-cases:a_7348bf17d801",
          "target": "garage-use-cases:u_inspect",
          "kind": "association",
          "label": ""
        },
        {
          "id": "garage-use-cases:edge-5",
          "source": "garage-use-cases:a_7348bf17d801",
          "target": "garage-use-cases:u_list",
          "kind": "association",
          "label": ""
        },
        {
          "id": "garage-use-cases:edge-6",
          "source": "garage-use-cases:a_7348bf17d801",
          "target": "garage-use-cases:u_park_vehicle",
          "kind": "association",
          "label": ""
        },
        {
          "id": "garage-use-cases:edge-7",
          "source": "garage-use-cases:a_7348bf17d801",
          "target": "garage-use-cases:u_remove",
          "kind": "association",
          "label": ""
        },
        {
          "id": "garage-use-cases:edge-8",
          "source": "garage-use-cases:a_7348bf17d801",
          "target": "garage-use-cases:u_search",
          "kind": "association",
          "label": ""
        }
      ],
      "sequence": null,
      "timing": null,
      "notes": []
    },
    "local-deployment": {
      "id": "local-deployment",
      "title": "Local Garage runtime",
      "type": "deployment",
      "nodes": [
        {
          "id": "local-deployment:Workstation",
          "name": "User workstation",
          "kind": "device",
          "group": "",
          "members": [
            "Contains: .NET 10 process (choose an interface)",
            "Contains: Local JSON files",
            "Contains: Local diagnostic logs"
          ],
          "files": [
            "docs/uml/structural/deployment/local-deployment.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "local-deployment:Runtime",
          "name": ".NET 10 process (choose an interface)",
          "kind": "device",
          "group": "User workstation",
          "members": [
            "Each interface runs as its own process. Garage and vehicle state live in memory for that session. JSON imports do not persist interactive changes.",
            "Contains: Garage.Console executable",
            "Contains: Garage.Terminal executable",
            "Contains: Garage library",
            "Contains: Vehicle library"
          ],
          "files": [
            "docs/uml/structural/deployment/local-deployment.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "local-deployment:Workstation"
        },
        {
          "id": "local-deployment:Console",
          "name": "Garage.Console executable",
          "kind": "artifact",
          "group": ".NET 10 process (choose an interface)",
          "members": [],
          "files": [
            "docs/uml/structural/deployment/local-deployment.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "local-deployment:Runtime"
        },
        {
          "id": "local-deployment:Terminal",
          "name": "Garage.Terminal executable",
          "kind": "artifact",
          "group": ".NET 10 process (choose an interface)",
          "members": [],
          "files": [
            "docs/uml/structural/deployment/local-deployment.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "local-deployment:Runtime"
        },
        {
          "id": "local-deployment:Domain",
          "name": "Garage library",
          "kind": "artifact",
          "group": ".NET 10 process (choose an interface)",
          "members": [],
          "files": [
            "docs/uml/structural/deployment/local-deployment.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "local-deployment:Runtime"
        },
        {
          "id": "local-deployment:Vehicles",
          "name": "Vehicle library",
          "kind": "artifact",
          "group": ".NET 10 process (choose an interface)",
          "members": [],
          "files": [
            "docs/uml/structural/deployment/local-deployment.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "local-deployment:Runtime"
        },
        {
          "id": "local-deployment:Json",
          "name": "Local JSON files",
          "kind": "folder",
          "group": "User workstation",
          "members": [],
          "files": [
            "docs/uml/structural/deployment/local-deployment.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "local-deployment:Workstation"
        },
        {
          "id": "local-deployment:Logs",
          "name": "Local diagnostic logs",
          "kind": "folder",
          "group": "User workstation",
          "members": [],
          "files": [
            "docs/uml/structural/deployment/local-deployment.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "local-deployment:Workstation"
        }
      ],
      "edges": [
        {
          "id": "local-deployment:edge-1",
          "source": "local-deployment:Console",
          "target": "local-deployment:Domain",
          "kind": "connection",
          "label": ""
        },
        {
          "id": "local-deployment:edge-2",
          "source": "local-deployment:Terminal",
          "target": "local-deployment:Domain",
          "kind": "connection",
          "label": ""
        },
        {
          "id": "local-deployment:edge-3",
          "source": "local-deployment:Domain",
          "target": "local-deployment:Vehicles",
          "kind": "connection",
          "label": ""
        },
        {
          "id": "local-deployment:edge-4",
          "source": "local-deployment:Domain",
          "target": "local-deployment:Json",
          "kind": "dependency",
          "label": "load layouts and vehicles"
        },
        {
          "id": "local-deployment:edge-5",
          "source": "local-deployment:Domain",
          "target": "local-deployment:Logs",
          "kind": "dependency",
          "label": "diagnostic logging"
        }
      ],
      "sequence": null,
      "timing": null,
      "notes": [
        "Each interface runs as its own process. Garage and vehicle state live in memory for that session. JSON imports do not persist interactive changes."
      ]
    },
    "parking-activity": {
      "id": "parking-activity",
      "title": "Parking validation and assignment",
      "type": "activity",
      "nodes": [
        {
          "id": "parking-activity:element-1",
          "name": "Start",
          "kind": "initial",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-2",
          "name": "Receive non-null vehicle, garage, optional spot number",
          "kind": "action",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-4",
          "name": "Vehicle belongs to catalog?",
          "kind": "decision",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-6",
          "name": "Return VehicleNotFound",
          "kind": "action",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-8",
          "name": "End",
          "kind": "final",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-10",
          "name": "Garage registered?",
          "kind": "decision",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-12",
          "name": "Return ValidationFailed",
          "kind": "action",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-14",
          "name": "End",
          "kind": "final",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-16",
          "name": "Registration already parked in any garage?",
          "kind": "decision",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-18",
          "name": "Return VehicleAlreadyParked",
          "kind": "action",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-20",
          "name": "End",
          "kind": "final",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-22",
          "name": "Spot number supplied?",
          "kind": "decision",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-24",
          "name": "Use supplied spot number",
          "kind": "action",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-26",
          "name": "Find first empty spot that fits vehicle",
          "kind": "action",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-28",
          "name": "Suitable spot found?",
          "kind": "decision",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-30",
          "name": "Use matching spot number",
          "kind": "action",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-32",
          "name": "Return GarageFull or VehicleDoesNotFit",
          "kind": "action",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-34",
          "name": "End",
          "kind": "final",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-36",
          "name": "Merge",
          "kind": "merge",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-39",
          "name": "Validate spot range, occupancy, dimensions and duplicate registration",
          "kind": "action",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-41",
          "name": "Validation successful?",
          "kind": "decision",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-43",
          "name": "ParkingSpot.Park(vehicle)",
          "kind": "action",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-45",
          "name": "Return ParkingResult.Completed",
          "kind": "action",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-47",
          "name": "Return ParkingResult.Failed with error code",
          "kind": "action",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-49",
          "name": "Merge",
          "kind": "merge",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-activity:element-52",
          "name": "End",
          "kind": "final",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/activity/parking-activity.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        }
      ],
      "edges": [
        {
          "id": "parking-activity:edge-3",
          "source": "parking-activity:element-1",
          "target": "parking-activity:element-2",
          "kind": "flow",
          "label": ""
        },
        {
          "id": "parking-activity:edge-5",
          "source": "parking-activity:element-2",
          "target": "parking-activity:element-4",
          "kind": "flow",
          "label": ""
        },
        {
          "id": "parking-activity:edge-7",
          "source": "parking-activity:element-4",
          "target": "parking-activity:element-6",
          "kind": "flow",
          "label": "no"
        },
        {
          "id": "parking-activity:edge-9",
          "source": "parking-activity:element-6",
          "target": "parking-activity:element-8",
          "kind": "flow",
          "label": ""
        },
        {
          "id": "parking-activity:edge-11",
          "source": "parking-activity:element-4",
          "target": "parking-activity:element-10",
          "kind": "flow",
          "label": "yes"
        },
        {
          "id": "parking-activity:edge-13",
          "source": "parking-activity:element-10",
          "target": "parking-activity:element-12",
          "kind": "flow",
          "label": "no"
        },
        {
          "id": "parking-activity:edge-15",
          "source": "parking-activity:element-12",
          "target": "parking-activity:element-14",
          "kind": "flow",
          "label": ""
        },
        {
          "id": "parking-activity:edge-17",
          "source": "parking-activity:element-10",
          "target": "parking-activity:element-16",
          "kind": "flow",
          "label": "yes"
        },
        {
          "id": "parking-activity:edge-19",
          "source": "parking-activity:element-16",
          "target": "parking-activity:element-18",
          "kind": "flow",
          "label": "yes"
        },
        {
          "id": "parking-activity:edge-21",
          "source": "parking-activity:element-18",
          "target": "parking-activity:element-20",
          "kind": "flow",
          "label": ""
        },
        {
          "id": "parking-activity:edge-23",
          "source": "parking-activity:element-16",
          "target": "parking-activity:element-22",
          "kind": "flow",
          "label": "no"
        },
        {
          "id": "parking-activity:edge-25",
          "source": "parking-activity:element-22",
          "target": "parking-activity:element-24",
          "kind": "flow",
          "label": "yes"
        },
        {
          "id": "parking-activity:edge-27",
          "source": "parking-activity:element-22",
          "target": "parking-activity:element-26",
          "kind": "flow",
          "label": "no"
        },
        {
          "id": "parking-activity:edge-29",
          "source": "parking-activity:element-26",
          "target": "parking-activity:element-28",
          "kind": "flow",
          "label": ""
        },
        {
          "id": "parking-activity:edge-31",
          "source": "parking-activity:element-28",
          "target": "parking-activity:element-30",
          "kind": "flow",
          "label": "yes"
        },
        {
          "id": "parking-activity:edge-33",
          "source": "parking-activity:element-28",
          "target": "parking-activity:element-32",
          "kind": "flow",
          "label": "no"
        },
        {
          "id": "parking-activity:edge-35",
          "source": "parking-activity:element-32",
          "target": "parking-activity:element-34",
          "kind": "flow",
          "label": ""
        },
        {
          "id": "parking-activity:edge-37",
          "source": "parking-activity:element-24",
          "target": "parking-activity:element-36",
          "kind": "flow",
          "label": ""
        },
        {
          "id": "parking-activity:edge-38",
          "source": "parking-activity:element-30",
          "target": "parking-activity:element-36",
          "kind": "flow",
          "label": ""
        },
        {
          "id": "parking-activity:edge-40",
          "source": "parking-activity:element-36",
          "target": "parking-activity:element-39",
          "kind": "flow",
          "label": ""
        },
        {
          "id": "parking-activity:edge-42",
          "source": "parking-activity:element-39",
          "target": "parking-activity:element-41",
          "kind": "flow",
          "label": ""
        },
        {
          "id": "parking-activity:edge-44",
          "source": "parking-activity:element-41",
          "target": "parking-activity:element-43",
          "kind": "flow",
          "label": "yes"
        },
        {
          "id": "parking-activity:edge-46",
          "source": "parking-activity:element-43",
          "target": "parking-activity:element-45",
          "kind": "flow",
          "label": ""
        },
        {
          "id": "parking-activity:edge-48",
          "source": "parking-activity:element-41",
          "target": "parking-activity:element-47",
          "kind": "flow",
          "label": "no"
        },
        {
          "id": "parking-activity:edge-50",
          "source": "parking-activity:element-45",
          "target": "parking-activity:element-49",
          "kind": "flow",
          "label": ""
        },
        {
          "id": "parking-activity:edge-51",
          "source": "parking-activity:element-47",
          "target": "parking-activity:element-49",
          "kind": "flow",
          "label": ""
        },
        {
          "id": "parking-activity:edge-53",
          "source": "parking-activity:element-49",
          "target": "parking-activity:element-52",
          "kind": "flow",
          "label": ""
        }
      ],
      "sequence": null,
      "timing": null,
      "notes": []
    },
    "parking-communication": {
      "id": "parking-communication",
      "title": "Template: communication",
      "type": "communication",
      "nodes": [
        {
          "id": "parking-communication:UI",
          "name": "ui : Interface",
          "kind": "object",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/interaction/communication/parking-communication.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-communication:Service",
          "name": "service : GarageService",
          "kind": "object",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/interaction/communication/parking-communication.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-communication:Garage",
          "name": "garage : Garage",
          "kind": "object",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/interaction/communication/parking-communication.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        }
      ],
      "edges": [
        {
          "id": "parking-communication:edge-1",
          "source": "parking-communication:UI",
          "target": "parking-communication:Service",
          "kind": "message",
          "label": "1: Park(vehicle, garage, spot?)"
        },
        {
          "id": "parking-communication:edge-2",
          "source": "parking-communication:Service",
          "target": "parking-communication:Garage",
          "kind": "message",
          "label": "1.1: Park(vehicle, spot?)"
        }
      ],
      "sequence": null,
      "timing": null,
      "notes": [
        "Template only. Verify guards and numbered messages against a chosen scenario. Communication is expressed using objects and numbered links. [[../sequence/parking-sequence.puml Reviewed parking sequence]]"
      ]
    },
    "parking-interaction-overview": {
      "id": "parking-interaction-overview",
      "title": "Template: interaction-overview",
      "type": "interaction-overview",
      "nodes": [
        {
          "id": "parking-interaction-overview:element-1",
          "name": "Start",
          "kind": "initial",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/interaction/interaction-overview/parking-interaction-overview.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-interaction-overview:element-2",
          "name": "ref - Select garage and vehicle",
          "kind": "interaction",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/interaction/interaction-overview/parking-interaction-overview.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-interaction-overview:element-4",
          "name": "ref - Parking sequence",
          "kind": "interaction",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/interaction/interaction-overview/parking-interaction-overview.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-interaction-overview:element-6",
          "name": "Parking successful?",
          "kind": "decision",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/interaction/interaction-overview/parking-interaction-overview.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-interaction-overview:element-8",
          "name": "ref - Refresh occupancy",
          "kind": "interaction",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/interaction/interaction-overview/parking-interaction-overview.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-interaction-overview:element-10",
          "name": "ref - Display failure",
          "kind": "interaction",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/interaction/interaction-overview/parking-interaction-overview.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-interaction-overview:element-12",
          "name": "Merge",
          "kind": "merge",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/interaction/interaction-overview/parking-interaction-overview.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-interaction-overview:element-15",
          "name": "End",
          "kind": "final",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/interaction/interaction-overview/parking-interaction-overview.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        }
      ],
      "edges": [
        {
          "id": "parking-interaction-overview:edge-3",
          "source": "parking-interaction-overview:element-1",
          "target": "parking-interaction-overview:element-2",
          "kind": "flow",
          "label": ""
        },
        {
          "id": "parking-interaction-overview:edge-5",
          "source": "parking-interaction-overview:element-2",
          "target": "parking-interaction-overview:element-4",
          "kind": "flow",
          "label": ""
        },
        {
          "id": "parking-interaction-overview:edge-7",
          "source": "parking-interaction-overview:element-4",
          "target": "parking-interaction-overview:element-6",
          "kind": "flow",
          "label": ""
        },
        {
          "id": "parking-interaction-overview:edge-9",
          "source": "parking-interaction-overview:element-6",
          "target": "parking-interaction-overview:element-8",
          "kind": "flow",
          "label": "yes"
        },
        {
          "id": "parking-interaction-overview:edge-11",
          "source": "parking-interaction-overview:element-6",
          "target": "parking-interaction-overview:element-10",
          "kind": "flow",
          "label": "no"
        },
        {
          "id": "parking-interaction-overview:edge-13",
          "source": "parking-interaction-overview:element-8",
          "target": "parking-interaction-overview:element-12",
          "kind": "flow",
          "label": ""
        },
        {
          "id": "parking-interaction-overview:edge-14",
          "source": "parking-interaction-overview:element-10",
          "target": "parking-interaction-overview:element-12",
          "kind": "flow",
          "label": ""
        },
        {
          "id": "parking-interaction-overview:edge-16",
          "source": "parking-interaction-overview:element-12",
          "target": "parking-interaction-overview:element-15",
          "kind": "flow",
          "label": ""
        }
      ],
      "sequence": null,
      "timing": null,
      "notes": []
    },
    "parking-sequence": {
      "id": "parking-sequence",
      "title": "Park an existing catalog vehicle",
      "type": "sequence",
      "nodes": [
        {
          "id": "parking-sequence:Actor",
          "name": "Garage operator",
          "kind": "actor",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-sequence:p_753cfee6aae6",
          "name": "Garage.Services.GarageService",
          "kind": "participant",
          "group": "",
          "members": [],
          "files": [
            "Garage/Services/GarageService.cs"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-sequence:p_426dd07c2e3a",
          "name": "Garage.Results.ParkingResult",
          "kind": "participant",
          "group": "",
          "members": [],
          "files": [
            "Garage/Results/ParkingResult.cs"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-sequence:p_50a211325908",
          "name": "Garage.Models.Garage",
          "kind": "participant",
          "group": "",
          "members": [],
          "files": [
            "Garage/Models/Garage.cs"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-sequence:p_b323161f1e5c",
          "name": "Garage.Models.ParkingSpot",
          "kind": "participant",
          "group": "",
          "members": [],
          "files": [
            "Garage/Models/ParkingSpot.cs"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-sequence:element-1",
          "name": "Static source view; MaxDepth=3. Lifelines group calls by declared type, not runtime instance. Alternatives are possible source paths, not a recorded execution. Guards may be infeasible together. Property getters and implicit/external exceptions are not expanded. Framework calls and callbacks are boundaries. Caller continuation assumes the callee returns normally. Async scheduling is not modeled. Expand bodies in: Garage.Models, Garage.Services. Other calls remain visible as boundaries.",
          "kind": "note",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-sequence:element-2",
          "name": "Park(vehicle, garage, spotNumber)",
          "kind": "message",
          "group": "",
          "members": [
            "From Garage operator to Garage.Services.GarageService",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-sequence:element-4",
          "name": "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)",
          "kind": "note",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-sequence:element-5",
          "name": "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(garage)",
          "kind": "note",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-sequence:element-6",
          "name": "External/delegate call boundary (not expanded): Catalog.Vehicles.Contains(vehicle)",
          "kind": "note",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-sequence:element-7",
          "name": "alt \u00B7 2 paths",
          "kind": "fragment",
          "group": "",
          "members": [
            "!Catalog.Vehicles.Contains(vehicle)",
            "otherwise"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-sequence:element-8",
          "name": "Failed(\u0022Choose a vehicle from this application\u0027s catalog.\u0022, OperationError.VehicleNotFound)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Services.GarageService to Garage.Results.ParkingResult",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-7"
        },
        {
          "id": "parking-sequence:element-10",
          "name": "Scope boundary: method body not expanded.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-7"
        },
        {
          "id": "parking-sequence:element-11",
          "name": "Garage.Results.ParkingResult (if call returns)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Results.ParkingResult to Garage.Services.GarageService",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-7"
        },
        {
          "id": "parking-sequence:element-13",
          "name": "ParkingResult.Failed(\u0022Choose a vehicle from this application\u0027s catalog.\u0022, OperationError.VehicleNotFound)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Services.GarageService to Garage operator",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-7"
        },
        {
          "id": "parking-sequence:element-15",
          "name": "ParkNewVehicle(vehicle, garage, spotNumber)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Services.GarageService to Garage.Services.GarageService",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-7"
        },
        {
          "id": "parking-sequence:element-17",
          "name": "External/delegate call boundary (not expanded): garages.Contains(garage)",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-7"
        },
        {
          "id": "parking-sequence:element-18",
          "name": "alt \u00B7 2 paths",
          "kind": "fragment",
          "group": "Alternative paths",
          "members": [
            "!garages.Contains(garage)",
            "otherwise"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-7"
        },
        {
          "id": "parking-sequence:element-19",
          "name": "Failed(\u0022Choose a garage registered with this application.\u0022, OperationError.ValidationFailed)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Services.GarageService to Garage.Results.ParkingResult",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-18"
        },
        {
          "id": "parking-sequence:element-21",
          "name": "Scope boundary: method body not expanded.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-18"
        },
        {
          "id": "parking-sequence:element-22",
          "name": "Garage.Results.ParkingResult (if call returns)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Results.ParkingResult to Garage.Services.GarageService",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-18"
        },
        {
          "id": "parking-sequence:element-24",
          "name": "ParkingResult.Failed(\u0022Choose a garage registered with this application.\u0022, OperationError.ValidationFailed)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Services.GarageService to Garage.Services.GarageService",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-18"
        },
        {
          "id": "parking-sequence:element-26",
          "name": "IsParked(vehicle)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Services.GarageService to Garage.Services.GarageService",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-18"
        },
        {
          "id": "parking-sequence:element-28",
          "name": "Callback boundary (not executed by this analysis): garage =\u003E garage.Vehicles.Any(parked =\u003E string.Equals(parked.RegistrationNumber, vehicle.RegistrationNumber, StringComparison.OrdinalIgnoreCase))",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-18"
        },
        {
          "id": "parking-sequence:element-29",
          "name": "External/delegate call boundary (not expanded): garages.Any(garage =\u003E garage.Vehicles.Any(parked =\u003E string.Equals(parked.RegistrationNumber, vehicle.RegistrationNumber, StringComparison.OrdinalIgnoreCase)))",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-18"
        },
        {
          "id": "parking-sequence:element-30",
          "name": "garages.Any(garage =\u003E garage.Vehicles.Any(parked =\u003E string.Equals(parked.RegistrationNumber, vehicle.RegistrationNumber, StringComparison.OrdinalIgnoreCase)))",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Services.GarageService to Garage.Services.GarageService",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-18"
        },
        {
          "id": "parking-sequence:element-32",
          "name": "alt \u00B7 2 paths",
          "kind": "fragment",
          "group": "Alternative paths",
          "members": [
            "IsParked(vehicle)",
            "otherwise"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-18"
        },
        {
          "id": "parking-sequence:element-33",
          "name": "Failed($\u0022Vehicle {vehicle.RegistrationNumber} is already parked in a garage.\u0022, OperationError.VehicleAlreadyParked)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Services.GarageService to Garage.Results.ParkingResult",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-32"
        },
        {
          "id": "parking-sequence:element-35",
          "name": "Scope boundary: method body not expanded.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-32"
        },
        {
          "id": "parking-sequence:element-36",
          "name": "Garage.Results.ParkingResult (if call returns)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Results.ParkingResult to Garage.Services.GarageService",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-32"
        },
        {
          "id": "parking-sequence:element-38",
          "name": "ParkingResult.Failed($\u0022Vehicle {vehicle.RegistrationNumber} is already parked in a garage.\u0022, OperationError.VehicleAlreadyParked)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Services.GarageService to Garage.Services.GarageService",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-32"
        },
        {
          "id": "parking-sequence:element-40",
          "name": "alt \u00B7 2 paths",
          "kind": "fragment",
          "group": "Alternative paths",
          "members": [
            "spotNumber is int spot",
            "otherwise"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-32"
        },
        {
          "id": "parking-sequence:element-41",
          "name": "Park(vehicle, spot)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Services.GarageService to Garage.Models.Garage",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-40"
        },
        {
          "id": "parking-sequence:element-43",
          "name": "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-40"
        },
        {
          "id": "parking-sequence:element-44",
          "name": "alt \u00B7 2 paths",
          "kind": "fragment",
          "group": "Alternative paths",
          "members": [
            "spot \u003C 1 || spot \u003E Capacity",
            "otherwise"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-40"
        },
        {
          "id": "parking-sequence:element-45",
          "name": "Failed($\u0022Parking spot must be between 1 and {Capacity}.\u0022, OperationError.SpotOutOfRange)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Results.ParkingResult",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-44"
        },
        {
          "id": "parking-sequence:element-47",
          "name": "Scope boundary: method body not expanded.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-44"
        },
        {
          "id": "parking-sequence:element-48",
          "name": "Garage.Results.ParkingResult (if call returns)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Results.ParkingResult to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-44"
        },
        {
          "id": "parking-sequence:element-50",
          "name": "ParkingResult.Failed($\u0022Parking spot must be between 1 and {Capacity}.\u0022, OperationError.SpotOutOfRange)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Services.GarageService",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-44"
        },
        {
          "id": "parking-sequence:element-52",
          "name": "alt \u00B7 2 paths",
          "kind": "fragment",
          "group": "Alternative paths",
          "members": [
            "parkingSpot.Vehicle is not null",
            "otherwise"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-44"
        },
        {
          "id": "parking-sequence:element-53",
          "name": "Failed($\u0022Parking spot {spot} is occupied.\u0022, OperationError.SpotOccupied)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Results.ParkingResult",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-52"
        },
        {
          "id": "parking-sequence:element-55",
          "name": "Scope boundary: method body not expanded.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-52"
        },
        {
          "id": "parking-sequence:element-56",
          "name": "Garage.Results.ParkingResult (if call returns)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Results.ParkingResult to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-52"
        },
        {
          "id": "parking-sequence:element-58",
          "name": "ParkingResult.Failed($\u0022Parking spot {spot} is occupied.\u0022, OperationError.SpotOccupied)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Services.GarageService",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-52"
        },
        {
          "id": "parking-sequence:element-60",
          "name": "Fits(vehicle)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.ParkingSpot",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-52"
        },
        {
          "id": "parking-sequence:element-62",
          "name": "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-52"
        },
        {
          "id": "parking-sequence:element-63",
          "name": "alt \u00B7 2 paths",
          "kind": "fragment",
          "group": "Alternative paths",
          "members": [
            "Dimensions is null",
            "otherwise"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-52"
        },
        {
          "id": "parking-sequence:element-64",
          "name": "true",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.ParkingSpot to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-63"
        },
        {
          "id": "parking-sequence:element-66",
          "name": "size.LengthMeters \u003C= Dimensions.LengthMeters \u0026\u0026 size.WidthMeters \u003C= Dimensions.WidthMeters \u0026\u0026 size.HeightMeters \u003C= Dimensions.HeightMeters",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.ParkingSpot to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-63"
        },
        {
          "id": "parking-sequence:element-68",
          "name": "alt \u00B7 2 paths",
          "kind": "fragment",
          "group": "Alternative paths",
          "members": [
            "!parkingSpot.Fits(vehicle)",
            "otherwise"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-52"
        },
        {
          "id": "parking-sequence:element-69",
          "name": "Failed($\u0022Vehicle {vehicle.RegistrationNumber} does not fit in parking spot {spot}.\u0022, OperationError.VehicleDoesNotFit)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Results.ParkingResult",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-68"
        },
        {
          "id": "parking-sequence:element-71",
          "name": "Scope boundary: method body not expanded.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-68"
        },
        {
          "id": "parking-sequence:element-72",
          "name": "Garage.Results.ParkingResult (if call returns)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Results.ParkingResult to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-68"
        },
        {
          "id": "parking-sequence:element-74",
          "name": "ParkingResult.Failed($\u0022Vehicle {vehicle.RegistrationNumber} does not fit in parking spot {spot}.\u0022, OperationError.VehicleDoesNotFit)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Services.GarageService",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-68"
        },
        {
          "id": "parking-sequence:element-76",
          "name": "RegistrationExists(vehicle.RegistrationNumber)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.Garage",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-68"
        },
        {
          "id": "parking-sequence:element-78",
          "name": "Callback boundary (not executed by this analysis): spot =\u003E string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase)",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-68"
        },
        {
          "id": "parking-sequence:element-79",
          "name": "External/delegate call boundary (not expanded): parkingSpots.Any(spot =\u003E string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase))",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-68"
        },
        {
          "id": "parking-sequence:element-80",
          "name": "parkingSpots.Any(spot =\u003E string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase))",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-68"
        },
        {
          "id": "parking-sequence:element-82",
          "name": "alt \u00B7 2 paths",
          "kind": "fragment",
          "group": "Alternative paths",
          "members": [
            "RegistrationExists(vehicle.RegistrationNumber)",
            "otherwise"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-68"
        },
        {
          "id": "parking-sequence:element-83",
          "name": "DuplicateRegistration(vehicle)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.Garage",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-82"
        },
        {
          "id": "parking-sequence:element-85",
          "name": "Failed($\u0022A vehicle with registration number {vehicle.RegistrationNumber} is already parked.\u0022, OperationError.DuplicateRegistration)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Results.ParkingResult",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-82"
        },
        {
          "id": "parking-sequence:element-87",
          "name": "Scope boundary: method body not expanded.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-82"
        },
        {
          "id": "parking-sequence:element-88",
          "name": "Garage.Results.ParkingResult (if call returns)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Results.ParkingResult to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-82"
        },
        {
          "id": "parking-sequence:element-90",
          "name": "ParkingResult.Failed($\u0022A vehicle with registration number {vehicle.RegistrationNumber} is already parked.\u0022, OperationError.DuplicateRegistration)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-82"
        },
        {
          "id": "parking-sequence:element-92",
          "name": "DuplicateRegistration(vehicle)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Services.GarageService",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-82"
        },
        {
          "id": "parking-sequence:element-94",
          "name": "Park(vehicle)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.ParkingSpot",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-82"
        },
        {
          "id": "parking-sequence:element-96",
          "name": "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-82"
        },
        {
          "id": "parking-sequence:element-97",
          "name": "alt \u00B7 2 paths",
          "kind": "fragment",
          "group": "Alternative paths",
          "members": [
            "Vehicle is not null is false",
            "short-circuit"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-82"
        },
        {
          "id": "parking-sequence:element-98",
          "name": "Fits(vehicle)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.ParkingSpot to Garage.Models.ParkingSpot",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-97"
        },
        {
          "id": "parking-sequence:element-100",
          "name": "Depth boundary: method body not expanded.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-97"
        },
        {
          "id": "parking-sequence:element-101",
          "name": "bool (if call returns)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.ParkingSpot to Garage.Models.ParkingSpot",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-97"
        },
        {
          "id": "parking-sequence:element-103",
          "name": "alt \u00B7 2 paths",
          "kind": "fragment",
          "group": "Alternative paths",
          "members": [
            "Vehicle is not null || !Fits(vehicle)",
            "otherwise"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-82"
        },
        {
          "id": "parking-sequence:element-104",
          "name": "Constructor/initializer boundary (not expanded): new InvalidOperationException(\u0022The spot must be empty and large enough for the vehicle.\u0022)",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-103"
        },
        {
          "id": "parking-sequence:element-105",
          "name": "Throws: new InvalidOperationException(\u0022The spot must be empty and large enough for the vehicle.\u0022); this path terminates here.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-103"
        },
        {
          "id": "parking-sequence:element-106",
          "name": "complete",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.ParkingSpot to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-103"
        },
        {
          "id": "parking-sequence:element-108",
          "name": "Completed(spot, $\u0022Vehicle {vehicle.RegistrationNumber} parked at spot {spot}.\u0022)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Results.ParkingResult",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-82"
        },
        {
          "id": "parking-sequence:element-110",
          "name": "Scope boundary: method body not expanded.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-82"
        },
        {
          "id": "parking-sequence:element-111",
          "name": "Garage.Results.ParkingResult (if call returns)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Results.ParkingResult to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-82"
        },
        {
          "id": "parking-sequence:element-113",
          "name": "ParkingResult.Completed(spot, $\u0022Vehicle {vehicle.RegistrationNumber} parked at spot {spot}.\u0022)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Services.GarageService",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-82"
        },
        {
          "id": "parking-sequence:element-115",
          "name": "garage.Park(vehicle, spot)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Services.GarageService to Garage.Services.GarageService",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-40"
        },
        {
          "id": "parking-sequence:element-117",
          "name": "Park(vehicle)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Services.GarageService to Garage.Models.Garage",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-40"
        },
        {
          "id": "parking-sequence:element-119",
          "name": "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-40"
        },
        {
          "id": "parking-sequence:element-120",
          "name": "RegistrationExists(vehicle.RegistrationNumber)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.Garage",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-40"
        },
        {
          "id": "parking-sequence:element-122",
          "name": "Callback boundary (not executed by this analysis): spot =\u003E string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase)",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-40"
        },
        {
          "id": "parking-sequence:element-123",
          "name": "External/delegate call boundary (not expanded): parkingSpots.Any(spot =\u003E string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase))",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-40"
        },
        {
          "id": "parking-sequence:element-124",
          "name": "parkingSpots.Any(spot =\u003E string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase))",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-40"
        },
        {
          "id": "parking-sequence:element-126",
          "name": "alt \u00B7 2 paths",
          "kind": "fragment",
          "group": "Alternative paths",
          "members": [
            "RegistrationExists(vehicle.RegistrationNumber)",
            "otherwise"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-40"
        },
        {
          "id": "parking-sequence:element-127",
          "name": "DuplicateRegistration(vehicle)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.Garage",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-126"
        },
        {
          "id": "parking-sequence:element-129",
          "name": "Failed($\u0022A vehicle with registration number {vehicle.RegistrationNumber} is already parked.\u0022, OperationError.DuplicateRegistration)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Results.ParkingResult",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-126"
        },
        {
          "id": "parking-sequence:element-131",
          "name": "Scope boundary: method body not expanded.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-126"
        },
        {
          "id": "parking-sequence:element-132",
          "name": "Garage.Results.ParkingResult (if call returns)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Results.ParkingResult to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-126"
        },
        {
          "id": "parking-sequence:element-134",
          "name": "ParkingResult.Failed($\u0022A vehicle with registration number {vehicle.RegistrationNumber} is already parked.\u0022, OperationError.DuplicateRegistration)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-126"
        },
        {
          "id": "parking-sequence:element-136",
          "name": "DuplicateRegistration(vehicle)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Services.GarageService",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-126"
        },
        {
          "id": "parking-sequence:element-138",
          "name": "Callback boundary (not executed by this analysis): spot =\u003E spot.Vehicle is null \u0026\u0026 spot.Fits(vehicle)",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-126"
        },
        {
          "id": "parking-sequence:element-139",
          "name": "External/delegate call boundary (not expanded): parkingSpots.FirstOrDefault(spot =\u003E spot.Vehicle is null \u0026\u0026 spot.Fits(vehicle))",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-126"
        },
        {
          "id": "parking-sequence:element-140",
          "name": "alt \u00B7 2 paths",
          "kind": "fragment",
          "group": "Alternative paths",
          "members": [
            "availableSpot is null",
            "otherwise"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-126"
        },
        {
          "id": "parking-sequence:element-141",
          "name": "alt \u00B7 2 paths",
          "kind": "fragment",
          "group": "Alternative paths",
          "members": [
            "AvailableSpaces == 0",
            "otherwise"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-140"
        },
        {
          "id": "parking-sequence:element-142",
          "name": "Failed(\u0022The garage is full.\u0022, OperationError.GarageFull)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Results.ParkingResult",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-141"
        },
        {
          "id": "parking-sequence:element-144",
          "name": "Scope boundary: method body not expanded.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-141"
        },
        {
          "id": "parking-sequence:element-145",
          "name": "Garage.Results.ParkingResult (if call returns)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Results.ParkingResult to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-141"
        },
        {
          "id": "parking-sequence:element-147",
          "name": "ParkingResult.Failed(\u0022The garage is full.\u0022, OperationError.GarageFull)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Services.GarageService",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-141"
        },
        {
          "id": "parking-sequence:element-149",
          "name": "Failed(\u0022No available parking spot is large enough for this vehicle.\u0022, OperationError.VehicleDoesNotFit)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Results.ParkingResult",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-141"
        },
        {
          "id": "parking-sequence:element-151",
          "name": "Scope boundary: method body not expanded.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-141"
        },
        {
          "id": "parking-sequence:element-152",
          "name": "Garage.Results.ParkingResult (if call returns)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Results.ParkingResult to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-141"
        },
        {
          "id": "parking-sequence:element-154",
          "name": "ParkingResult.Failed(\u0022No available parking spot is large enough for this vehicle.\u0022, OperationError.VehicleDoesNotFit)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Services.GarageService",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-141"
        },
        {
          "id": "parking-sequence:element-156",
          "name": "Park(vehicle, availableSpot.Number)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.Garage",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-140"
        },
        {
          "id": "parking-sequence:element-158",
          "name": "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-140"
        },
        {
          "id": "parking-sequence:element-159",
          "name": "alt \u00B7 2 paths",
          "kind": "fragment",
          "group": "Alternative paths",
          "members": [
            "spot \u003C 1 || spot \u003E Capacity",
            "otherwise"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-140"
        },
        {
          "id": "parking-sequence:element-160",
          "name": "Failed($\u0022Parking spot must be between 1 and {Capacity}.\u0022, OperationError.SpotOutOfRange)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Results.ParkingResult",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-159"
        },
        {
          "id": "parking-sequence:element-162",
          "name": "Scope boundary: method body not expanded.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-159"
        },
        {
          "id": "parking-sequence:element-163",
          "name": "Garage.Results.ParkingResult (if call returns)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Results.ParkingResult to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-159"
        },
        {
          "id": "parking-sequence:element-165",
          "name": "ParkingResult.Failed($\u0022Parking spot must be between 1 and {Capacity}.\u0022, OperationError.SpotOutOfRange)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-159"
        },
        {
          "id": "parking-sequence:element-167",
          "name": "alt \u00B7 2 paths",
          "kind": "fragment",
          "group": "Alternative paths",
          "members": [
            "parkingSpot.Vehicle is not null",
            "otherwise"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-159"
        },
        {
          "id": "parking-sequence:element-168",
          "name": "Failed($\u0022Parking spot {spot} is occupied.\u0022, OperationError.SpotOccupied)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Results.ParkingResult",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-167"
        },
        {
          "id": "parking-sequence:element-170",
          "name": "Scope boundary: method body not expanded.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-167"
        },
        {
          "id": "parking-sequence:element-171",
          "name": "Garage.Results.ParkingResult (if call returns)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Results.ParkingResult to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-167"
        },
        {
          "id": "parking-sequence:element-173",
          "name": "ParkingResult.Failed($\u0022Parking spot {spot} is occupied.\u0022, OperationError.SpotOccupied)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-167"
        },
        {
          "id": "parking-sequence:element-175",
          "name": "Fits(vehicle)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.ParkingSpot",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-167"
        },
        {
          "id": "parking-sequence:element-177",
          "name": "Depth boundary: method body not expanded.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-167"
        },
        {
          "id": "parking-sequence:element-178",
          "name": "bool (if call returns)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.ParkingSpot to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-167"
        },
        {
          "id": "parking-sequence:element-180",
          "name": "alt \u00B7 2 paths",
          "kind": "fragment",
          "group": "Alternative paths",
          "members": [
            "!parkingSpot.Fits(vehicle)",
            "otherwise"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-167"
        },
        {
          "id": "parking-sequence:element-181",
          "name": "Failed($\u0022Vehicle {vehicle.RegistrationNumber} does not fit in parking spot {spot}.\u0022, OperationError.VehicleDoesNotFit)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Results.ParkingResult",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-180"
        },
        {
          "id": "parking-sequence:element-183",
          "name": "Scope boundary: method body not expanded.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-180"
        },
        {
          "id": "parking-sequence:element-184",
          "name": "Garage.Results.ParkingResult (if call returns)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Results.ParkingResult to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-180"
        },
        {
          "id": "parking-sequence:element-186",
          "name": "ParkingResult.Failed($\u0022Vehicle {vehicle.RegistrationNumber} does not fit in parking spot {spot}.\u0022, OperationError.VehicleDoesNotFit)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-180"
        },
        {
          "id": "parking-sequence:element-188",
          "name": "RegistrationExists(vehicle.RegistrationNumber)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.Garage",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-180"
        },
        {
          "id": "parking-sequence:element-190",
          "name": "Depth boundary: method body not expanded.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-180"
        },
        {
          "id": "parking-sequence:element-191",
          "name": "bool (if call returns)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-180"
        },
        {
          "id": "parking-sequence:element-193",
          "name": "alt \u00B7 2 paths",
          "kind": "fragment",
          "group": "Alternative paths",
          "members": [
            "RegistrationExists(vehicle.RegistrationNumber)",
            "otherwise"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-180"
        },
        {
          "id": "parking-sequence:element-194",
          "name": "DuplicateRegistration(vehicle)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.Garage",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-193"
        },
        {
          "id": "parking-sequence:element-196",
          "name": "Depth boundary: method body not expanded.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-193"
        },
        {
          "id": "parking-sequence:element-197",
          "name": "Garage.Results.ParkingResult (if call returns)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-193"
        },
        {
          "id": "parking-sequence:element-199",
          "name": "DuplicateRegistration(vehicle)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-193"
        },
        {
          "id": "parking-sequence:element-201",
          "name": "Park(vehicle)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.ParkingSpot",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-193"
        },
        {
          "id": "parking-sequence:element-203",
          "name": "Depth boundary: method body not expanded.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-193"
        },
        {
          "id": "parking-sequence:element-204",
          "name": "complete (if call returns)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.ParkingSpot to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-193"
        },
        {
          "id": "parking-sequence:element-206",
          "name": "Completed(spot, $\u0022Vehicle {vehicle.RegistrationNumber} parked at spot {spot}.\u0022)",
          "kind": "message",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Results.ParkingResult",
            "Synchronous message / call"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-193"
        },
        {
          "id": "parking-sequence:element-208",
          "name": "Scope boundary: method body not expanded.",
          "kind": "note",
          "group": "Alternative paths",
          "members": [],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-193"
        },
        {
          "id": "parking-sequence:element-209",
          "name": "Garage.Results.ParkingResult (if call returns)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Results.ParkingResult to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-193"
        },
        {
          "id": "parking-sequence:element-211",
          "name": "ParkingResult.Completed(spot, $\u0022Vehicle {vehicle.RegistrationNumber} parked at spot {spot}.\u0022)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Models.Garage",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-193"
        },
        {
          "id": "parking-sequence:element-213",
          "name": "Park(vehicle, availableSpot.Number)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Models.Garage to Garage.Services.GarageService",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-140"
        },
        {
          "id": "parking-sequence:element-215",
          "name": "garage.Park(vehicle)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Services.GarageService to Garage.Services.GarageService",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-40"
        },
        {
          "id": "parking-sequence:element-217",
          "name": "ParkNewVehicle(vehicle, garage, spotNumber)",
          "kind": "reply",
          "group": "Alternative paths",
          "members": [
            "From Garage.Services.GarageService to Garage operator",
            "Reply / returned result"
          ],
          "files": [
            "docs/uml/interaction/sequence/parking-sequence.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-sequence:element-7"
        }
      ],
      "edges": [
        {
          "id": "parking-sequence:edge-3",
          "source": "parking-sequence:Actor",
          "target": "parking-sequence:p_753cfee6aae6",
          "kind": "message",
          "label": "Park(vehicle, garage, spotNumber)"
        },
        {
          "id": "parking-sequence:edge-9",
          "source": "parking-sequence:p_753cfee6aae6",
          "target": "parking-sequence:p_426dd07c2e3a",
          "kind": "message",
          "label": "Failed(\u0022Choose a vehicle from this application\u0027s catalog.\u0022, OperationError.VehicleNotFound)"
        },
        {
          "id": "parking-sequence:edge-12",
          "source": "parking-sequence:p_426dd07c2e3a",
          "target": "parking-sequence:p_753cfee6aae6",
          "kind": "reply",
          "label": "Garage.Results.ParkingResult (if call returns)"
        },
        {
          "id": "parking-sequence:edge-14",
          "source": "parking-sequence:p_753cfee6aae6",
          "target": "parking-sequence:Actor",
          "kind": "reply",
          "label": "ParkingResult.Failed(\u0022Choose a vehicle from this application\u0027s catalog.\u0022, OperationError.VehicleNotFound)"
        },
        {
          "id": "parking-sequence:edge-16",
          "source": "parking-sequence:p_753cfee6aae6",
          "target": "parking-sequence:p_753cfee6aae6",
          "kind": "message",
          "label": "ParkNewVehicle(vehicle, garage, spotNumber)"
        },
        {
          "id": "parking-sequence:edge-20",
          "source": "parking-sequence:p_753cfee6aae6",
          "target": "parking-sequence:p_426dd07c2e3a",
          "kind": "message",
          "label": "Failed(\u0022Choose a garage registered with this application.\u0022, OperationError.ValidationFailed)"
        },
        {
          "id": "parking-sequence:edge-23",
          "source": "parking-sequence:p_426dd07c2e3a",
          "target": "parking-sequence:p_753cfee6aae6",
          "kind": "reply",
          "label": "Garage.Results.ParkingResult (if call returns)"
        },
        {
          "id": "parking-sequence:edge-25",
          "source": "parking-sequence:p_753cfee6aae6",
          "target": "parking-sequence:p_753cfee6aae6",
          "kind": "reply",
          "label": "ParkingResult.Failed(\u0022Choose a garage registered with this application.\u0022, OperationError.ValidationFailed)"
        },
        {
          "id": "parking-sequence:edge-27",
          "source": "parking-sequence:p_753cfee6aae6",
          "target": "parking-sequence:p_753cfee6aae6",
          "kind": "message",
          "label": "IsParked(vehicle)"
        },
        {
          "id": "parking-sequence:edge-31",
          "source": "parking-sequence:p_753cfee6aae6",
          "target": "parking-sequence:p_753cfee6aae6",
          "kind": "reply",
          "label": "garages.Any(garage =\u003E garage.Vehicles.Any(parked =\u003E string.Equals(parked.RegistrationNumber, vehicle.RegistrationNumber, StringComparison.OrdinalIgnoreCase)))"
        },
        {
          "id": "parking-sequence:edge-34",
          "source": "parking-sequence:p_753cfee6aae6",
          "target": "parking-sequence:p_426dd07c2e3a",
          "kind": "message",
          "label": "Failed($\u0022Vehicle {vehicle.RegistrationNumber} is already parked in a garage.\u0022, OperationError.VehicleAlreadyParked)"
        },
        {
          "id": "parking-sequence:edge-37",
          "source": "parking-sequence:p_426dd07c2e3a",
          "target": "parking-sequence:p_753cfee6aae6",
          "kind": "reply",
          "label": "Garage.Results.ParkingResult (if call returns)"
        },
        {
          "id": "parking-sequence:edge-39",
          "source": "parking-sequence:p_753cfee6aae6",
          "target": "parking-sequence:p_753cfee6aae6",
          "kind": "reply",
          "label": "ParkingResult.Failed($\u0022Vehicle {vehicle.RegistrationNumber} is already parked in a garage.\u0022, OperationError.VehicleAlreadyParked)"
        },
        {
          "id": "parking-sequence:edge-42",
          "source": "parking-sequence:p_753cfee6aae6",
          "target": "parking-sequence:p_50a211325908",
          "kind": "message",
          "label": "Park(vehicle, spot)"
        },
        {
          "id": "parking-sequence:edge-46",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_426dd07c2e3a",
          "kind": "message",
          "label": "Failed($\u0022Parking spot must be between 1 and {Capacity}.\u0022, OperationError.SpotOutOfRange)"
        },
        {
          "id": "parking-sequence:edge-49",
          "source": "parking-sequence:p_426dd07c2e3a",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "Garage.Results.ParkingResult (if call returns)"
        },
        {
          "id": "parking-sequence:edge-51",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_753cfee6aae6",
          "kind": "reply",
          "label": "ParkingResult.Failed($\u0022Parking spot must be between 1 and {Capacity}.\u0022, OperationError.SpotOutOfRange)"
        },
        {
          "id": "parking-sequence:edge-54",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_426dd07c2e3a",
          "kind": "message",
          "label": "Failed($\u0022Parking spot {spot} is occupied.\u0022, OperationError.SpotOccupied)"
        },
        {
          "id": "parking-sequence:edge-57",
          "source": "parking-sequence:p_426dd07c2e3a",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "Garage.Results.ParkingResult (if call returns)"
        },
        {
          "id": "parking-sequence:edge-59",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_753cfee6aae6",
          "kind": "reply",
          "label": "ParkingResult.Failed($\u0022Parking spot {spot} is occupied.\u0022, OperationError.SpotOccupied)"
        },
        {
          "id": "parking-sequence:edge-61",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_b323161f1e5c",
          "kind": "message",
          "label": "Fits(vehicle)"
        },
        {
          "id": "parking-sequence:edge-65",
          "source": "parking-sequence:p_b323161f1e5c",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "true"
        },
        {
          "id": "parking-sequence:edge-67",
          "source": "parking-sequence:p_b323161f1e5c",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "size.LengthMeters \u003C= Dimensions.LengthMeters \u0026\u0026 size.WidthMeters \u003C= Dimensions.WidthMeters \u0026\u0026 size.HeightMeters \u003C= Dimensions.HeightMeters"
        },
        {
          "id": "parking-sequence:edge-70",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_426dd07c2e3a",
          "kind": "message",
          "label": "Failed($\u0022Vehicle {vehicle.RegistrationNumber} does not fit in parking spot {spot}.\u0022, OperationError.VehicleDoesNotFit)"
        },
        {
          "id": "parking-sequence:edge-73",
          "source": "parking-sequence:p_426dd07c2e3a",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "Garage.Results.ParkingResult (if call returns)"
        },
        {
          "id": "parking-sequence:edge-75",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_753cfee6aae6",
          "kind": "reply",
          "label": "ParkingResult.Failed($\u0022Vehicle {vehicle.RegistrationNumber} does not fit in parking spot {spot}.\u0022, OperationError.VehicleDoesNotFit)"
        },
        {
          "id": "parking-sequence:edge-77",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_50a211325908",
          "kind": "message",
          "label": "RegistrationExists(vehicle.RegistrationNumber)"
        },
        {
          "id": "parking-sequence:edge-81",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "parkingSpots.Any(spot =\u003E string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase))"
        },
        {
          "id": "parking-sequence:edge-84",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_50a211325908",
          "kind": "message",
          "label": "DuplicateRegistration(vehicle)"
        },
        {
          "id": "parking-sequence:edge-86",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_426dd07c2e3a",
          "kind": "message",
          "label": "Failed($\u0022A vehicle with registration number {vehicle.RegistrationNumber} is already parked.\u0022, OperationError.DuplicateRegistration)"
        },
        {
          "id": "parking-sequence:edge-89",
          "source": "parking-sequence:p_426dd07c2e3a",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "Garage.Results.ParkingResult (if call returns)"
        },
        {
          "id": "parking-sequence:edge-91",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "ParkingResult.Failed($\u0022A vehicle with registration number {vehicle.RegistrationNumber} is already parked.\u0022, OperationError.DuplicateRegistration)"
        },
        {
          "id": "parking-sequence:edge-93",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_753cfee6aae6",
          "kind": "reply",
          "label": "DuplicateRegistration(vehicle)"
        },
        {
          "id": "parking-sequence:edge-95",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_b323161f1e5c",
          "kind": "message",
          "label": "Park(vehicle)"
        },
        {
          "id": "parking-sequence:edge-99",
          "source": "parking-sequence:p_b323161f1e5c",
          "target": "parking-sequence:p_b323161f1e5c",
          "kind": "message",
          "label": "Fits(vehicle)"
        },
        {
          "id": "parking-sequence:edge-102",
          "source": "parking-sequence:p_b323161f1e5c",
          "target": "parking-sequence:p_b323161f1e5c",
          "kind": "reply",
          "label": "bool (if call returns)"
        },
        {
          "id": "parking-sequence:edge-107",
          "source": "parking-sequence:p_b323161f1e5c",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "complete"
        },
        {
          "id": "parking-sequence:edge-109",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_426dd07c2e3a",
          "kind": "message",
          "label": "Completed(spot, $\u0022Vehicle {vehicle.RegistrationNumber} parked at spot {spot}.\u0022)"
        },
        {
          "id": "parking-sequence:edge-112",
          "source": "parking-sequence:p_426dd07c2e3a",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "Garage.Results.ParkingResult (if call returns)"
        },
        {
          "id": "parking-sequence:edge-114",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_753cfee6aae6",
          "kind": "reply",
          "label": "ParkingResult.Completed(spot, $\u0022Vehicle {vehicle.RegistrationNumber} parked at spot {spot}.\u0022)"
        },
        {
          "id": "parking-sequence:edge-116",
          "source": "parking-sequence:p_753cfee6aae6",
          "target": "parking-sequence:p_753cfee6aae6",
          "kind": "reply",
          "label": "garage.Park(vehicle, spot)"
        },
        {
          "id": "parking-sequence:edge-118",
          "source": "parking-sequence:p_753cfee6aae6",
          "target": "parking-sequence:p_50a211325908",
          "kind": "message",
          "label": "Park(vehicle)"
        },
        {
          "id": "parking-sequence:edge-121",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_50a211325908",
          "kind": "message",
          "label": "RegistrationExists(vehicle.RegistrationNumber)"
        },
        {
          "id": "parking-sequence:edge-125",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "parkingSpots.Any(spot =\u003E string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase))"
        },
        {
          "id": "parking-sequence:edge-128",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_50a211325908",
          "kind": "message",
          "label": "DuplicateRegistration(vehicle)"
        },
        {
          "id": "parking-sequence:edge-130",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_426dd07c2e3a",
          "kind": "message",
          "label": "Failed($\u0022A vehicle with registration number {vehicle.RegistrationNumber} is already parked.\u0022, OperationError.DuplicateRegistration)"
        },
        {
          "id": "parking-sequence:edge-133",
          "source": "parking-sequence:p_426dd07c2e3a",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "Garage.Results.ParkingResult (if call returns)"
        },
        {
          "id": "parking-sequence:edge-135",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "ParkingResult.Failed($\u0022A vehicle with registration number {vehicle.RegistrationNumber} is already parked.\u0022, OperationError.DuplicateRegistration)"
        },
        {
          "id": "parking-sequence:edge-137",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_753cfee6aae6",
          "kind": "reply",
          "label": "DuplicateRegistration(vehicle)"
        },
        {
          "id": "parking-sequence:edge-143",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_426dd07c2e3a",
          "kind": "message",
          "label": "Failed(\u0022The garage is full.\u0022, OperationError.GarageFull)"
        },
        {
          "id": "parking-sequence:edge-146",
          "source": "parking-sequence:p_426dd07c2e3a",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "Garage.Results.ParkingResult (if call returns)"
        },
        {
          "id": "parking-sequence:edge-148",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_753cfee6aae6",
          "kind": "reply",
          "label": "ParkingResult.Failed(\u0022The garage is full.\u0022, OperationError.GarageFull)"
        },
        {
          "id": "parking-sequence:edge-150",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_426dd07c2e3a",
          "kind": "message",
          "label": "Failed(\u0022No available parking spot is large enough for this vehicle.\u0022, OperationError.VehicleDoesNotFit)"
        },
        {
          "id": "parking-sequence:edge-153",
          "source": "parking-sequence:p_426dd07c2e3a",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "Garage.Results.ParkingResult (if call returns)"
        },
        {
          "id": "parking-sequence:edge-155",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_753cfee6aae6",
          "kind": "reply",
          "label": "ParkingResult.Failed(\u0022No available parking spot is large enough for this vehicle.\u0022, OperationError.VehicleDoesNotFit)"
        },
        {
          "id": "parking-sequence:edge-157",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_50a211325908",
          "kind": "message",
          "label": "Park(vehicle, availableSpot.Number)"
        },
        {
          "id": "parking-sequence:edge-161",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_426dd07c2e3a",
          "kind": "message",
          "label": "Failed($\u0022Parking spot must be between 1 and {Capacity}.\u0022, OperationError.SpotOutOfRange)"
        },
        {
          "id": "parking-sequence:edge-164",
          "source": "parking-sequence:p_426dd07c2e3a",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "Garage.Results.ParkingResult (if call returns)"
        },
        {
          "id": "parking-sequence:edge-166",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "ParkingResult.Failed($\u0022Parking spot must be between 1 and {Capacity}.\u0022, OperationError.SpotOutOfRange)"
        },
        {
          "id": "parking-sequence:edge-169",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_426dd07c2e3a",
          "kind": "message",
          "label": "Failed($\u0022Parking spot {spot} is occupied.\u0022, OperationError.SpotOccupied)"
        },
        {
          "id": "parking-sequence:edge-172",
          "source": "parking-sequence:p_426dd07c2e3a",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "Garage.Results.ParkingResult (if call returns)"
        },
        {
          "id": "parking-sequence:edge-174",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "ParkingResult.Failed($\u0022Parking spot {spot} is occupied.\u0022, OperationError.SpotOccupied)"
        },
        {
          "id": "parking-sequence:edge-176",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_b323161f1e5c",
          "kind": "message",
          "label": "Fits(vehicle)"
        },
        {
          "id": "parking-sequence:edge-179",
          "source": "parking-sequence:p_b323161f1e5c",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "bool (if call returns)"
        },
        {
          "id": "parking-sequence:edge-182",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_426dd07c2e3a",
          "kind": "message",
          "label": "Failed($\u0022Vehicle {vehicle.RegistrationNumber} does not fit in parking spot {spot}.\u0022, OperationError.VehicleDoesNotFit)"
        },
        {
          "id": "parking-sequence:edge-185",
          "source": "parking-sequence:p_426dd07c2e3a",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "Garage.Results.ParkingResult (if call returns)"
        },
        {
          "id": "parking-sequence:edge-187",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "ParkingResult.Failed($\u0022Vehicle {vehicle.RegistrationNumber} does not fit in parking spot {spot}.\u0022, OperationError.VehicleDoesNotFit)"
        },
        {
          "id": "parking-sequence:edge-189",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_50a211325908",
          "kind": "message",
          "label": "RegistrationExists(vehicle.RegistrationNumber)"
        },
        {
          "id": "parking-sequence:edge-192",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "bool (if call returns)"
        },
        {
          "id": "parking-sequence:edge-195",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_50a211325908",
          "kind": "message",
          "label": "DuplicateRegistration(vehicle)"
        },
        {
          "id": "parking-sequence:edge-198",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "Garage.Results.ParkingResult (if call returns)"
        },
        {
          "id": "parking-sequence:edge-200",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "DuplicateRegistration(vehicle)"
        },
        {
          "id": "parking-sequence:edge-202",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_b323161f1e5c",
          "kind": "message",
          "label": "Park(vehicle)"
        },
        {
          "id": "parking-sequence:edge-205",
          "source": "parking-sequence:p_b323161f1e5c",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "complete (if call returns)"
        },
        {
          "id": "parking-sequence:edge-207",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_426dd07c2e3a",
          "kind": "message",
          "label": "Completed(spot, $\u0022Vehicle {vehicle.RegistrationNumber} parked at spot {spot}.\u0022)"
        },
        {
          "id": "parking-sequence:edge-210",
          "source": "parking-sequence:p_426dd07c2e3a",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "Garage.Results.ParkingResult (if call returns)"
        },
        {
          "id": "parking-sequence:edge-212",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_50a211325908",
          "kind": "reply",
          "label": "ParkingResult.Completed(spot, $\u0022Vehicle {vehicle.RegistrationNumber} parked at spot {spot}.\u0022)"
        },
        {
          "id": "parking-sequence:edge-214",
          "source": "parking-sequence:p_50a211325908",
          "target": "parking-sequence:p_753cfee6aae6",
          "kind": "reply",
          "label": "Park(vehicle, availableSpot.Number)"
        },
        {
          "id": "parking-sequence:edge-216",
          "source": "parking-sequence:p_753cfee6aae6",
          "target": "parking-sequence:p_753cfee6aae6",
          "kind": "reply",
          "label": "garage.Park(vehicle)"
        },
        {
          "id": "parking-sequence:edge-218",
          "source": "parking-sequence:p_753cfee6aae6",
          "target": "parking-sequence:Actor",
          "kind": "reply",
          "label": "ParkNewVehicle(vehicle, garage, spotNumber)"
        }
      ],
      "sequence": {
        "participants": [
          "parking-sequence:Actor",
          "parking-sequence:p_753cfee6aae6",
          "parking-sequence:p_426dd07c2e3a",
          "parking-sequence:p_50a211325908",
          "parking-sequence:p_b323161f1e5c"
        ],
        "items": [
          {
            "id": "parking-sequence:element-1",
            "kind": "note",
            "label": "Static source view; MaxDepth=3. Lifelines group calls by declared type, not runtime instance. Alternatives are possible source paths, not a recorded execution. Guards may be infeasible together. Property getters and implicit/external exceptions are not expanded. Framework calls and callbacks are boundaries. Caller continuation assumes the callee returns normally. Async scheduling is not modeled. Expand bodies in: Garage.Models, Garage.Services. Other calls remain visible as boundaries.",
            "source": null,
            "target": null,
            "reply": false,
            "branches": []
          },
          {
            "id": "parking-sequence:element-2",
            "kind": "message",
            "label": "Park(vehicle, garage, spotNumber)",
            "source": "parking-sequence:Actor",
            "target": "parking-sequence:p_753cfee6aae6",
            "reply": false,
            "branches": []
          },
          {
            "id": "parking-sequence:element-4",
            "kind": "note",
            "label": "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)",
            "source": null,
            "target": null,
            "reply": false,
            "branches": []
          },
          {
            "id": "parking-sequence:element-5",
            "kind": "note",
            "label": "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(garage)",
            "source": null,
            "target": null,
            "reply": false,
            "branches": []
          },
          {
            "id": "parking-sequence:element-6",
            "kind": "note",
            "label": "External/delegate call boundary (not expanded): Catalog.Vehicles.Contains(vehicle)",
            "source": null,
            "target": null,
            "reply": false,
            "branches": []
          },
          {
            "id": "parking-sequence:element-7",
            "kind": "fragment",
            "label": "Alternative paths",
            "source": null,
            "target": null,
            "reply": false,
            "branches": [
              {
                "label": "!Catalog.Vehicles.Contains(vehicle)",
                "items": [
                  {
                    "id": "parking-sequence:element-8",
                    "kind": "message",
                    "label": "Failed(\u0022Choose a vehicle from this application\u0027s catalog.\u0022, OperationError.VehicleNotFound)",
                    "source": "parking-sequence:p_753cfee6aae6",
                    "target": "parking-sequence:p_426dd07c2e3a",
                    "reply": false,
                    "branches": []
                  },
                  {
                    "id": "parking-sequence:element-10",
                    "kind": "note",
                    "label": "Scope boundary: method body not expanded.",
                    "source": null,
                    "target": null,
                    "reply": false,
                    "branches": []
                  },
                  {
                    "id": "parking-sequence:element-11",
                    "kind": "reply",
                    "label": "Garage.Results.ParkingResult (if call returns)",
                    "source": "parking-sequence:p_426dd07c2e3a",
                    "target": "parking-sequence:p_753cfee6aae6",
                    "reply": true,
                    "branches": []
                  },
                  {
                    "id": "parking-sequence:element-13",
                    "kind": "reply",
                    "label": "ParkingResult.Failed(\u0022Choose a vehicle from this application\u0027s catalog.\u0022, OperationError.VehicleNotFound)",
                    "source": "parking-sequence:p_753cfee6aae6",
                    "target": "parking-sequence:Actor",
                    "reply": true,
                    "branches": []
                  }
                ]
              },
              {
                "label": "otherwise",
                "items": [
                  {
                    "id": "parking-sequence:element-15",
                    "kind": "message",
                    "label": "ParkNewVehicle(vehicle, garage, spotNumber)",
                    "source": "parking-sequence:p_753cfee6aae6",
                    "target": "parking-sequence:p_753cfee6aae6",
                    "reply": false,
                    "branches": []
                  },
                  {
                    "id": "parking-sequence:element-17",
                    "kind": "note",
                    "label": "External/delegate call boundary (not expanded): garages.Contains(garage)",
                    "source": null,
                    "target": null,
                    "reply": false,
                    "branches": []
                  },
                  {
                    "id": "parking-sequence:element-18",
                    "kind": "fragment",
                    "label": "Alternative paths",
                    "source": null,
                    "target": null,
                    "reply": false,
                    "branches": [
                      {
                        "label": "!garages.Contains(garage)",
                        "items": [
                          {
                            "id": "parking-sequence:element-19",
                            "kind": "message",
                            "label": "Failed(\u0022Choose a garage registered with this application.\u0022, OperationError.ValidationFailed)",
                            "source": "parking-sequence:p_753cfee6aae6",
                            "target": "parking-sequence:p_426dd07c2e3a",
                            "reply": false,
                            "branches": []
                          },
                          {
                            "id": "parking-sequence:element-21",
                            "kind": "note",
                            "label": "Scope boundary: method body not expanded.",
                            "source": null,
                            "target": null,
                            "reply": false,
                            "branches": []
                          },
                          {
                            "id": "parking-sequence:element-22",
                            "kind": "reply",
                            "label": "Garage.Results.ParkingResult (if call returns)",
                            "source": "parking-sequence:p_426dd07c2e3a",
                            "target": "parking-sequence:p_753cfee6aae6",
                            "reply": true,
                            "branches": []
                          },
                          {
                            "id": "parking-sequence:element-24",
                            "kind": "reply",
                            "label": "ParkingResult.Failed(\u0022Choose a garage registered with this application.\u0022, OperationError.ValidationFailed)",
                            "source": "parking-sequence:p_753cfee6aae6",
                            "target": "parking-sequence:p_753cfee6aae6",
                            "reply": true,
                            "branches": []
                          }
                        ]
                      },
                      {
                        "label": "otherwise",
                        "items": [
                          {
                            "id": "parking-sequence:element-26",
                            "kind": "message",
                            "label": "IsParked(vehicle)",
                            "source": "parking-sequence:p_753cfee6aae6",
                            "target": "parking-sequence:p_753cfee6aae6",
                            "reply": false,
                            "branches": []
                          },
                          {
                            "id": "parking-sequence:element-28",
                            "kind": "note",
                            "label": "Callback boundary (not executed by this analysis): garage =\u003E garage.Vehicles.Any(parked =\u003E string.Equals(parked.RegistrationNumber, vehicle.RegistrationNumber, StringComparison.OrdinalIgnoreCase))",
                            "source": null,
                            "target": null,
                            "reply": false,
                            "branches": []
                          },
                          {
                            "id": "parking-sequence:element-29",
                            "kind": "note",
                            "label": "External/delegate call boundary (not expanded): garages.Any(garage =\u003E garage.Vehicles.Any(parked =\u003E string.Equals(parked.RegistrationNumber, vehicle.RegistrationNumber, StringComparison.OrdinalIgnoreCase)))",
                            "source": null,
                            "target": null,
                            "reply": false,
                            "branches": []
                          },
                          {
                            "id": "parking-sequence:element-30",
                            "kind": "reply",
                            "label": "garages.Any(garage =\u003E garage.Vehicles.Any(parked =\u003E string.Equals(parked.RegistrationNumber, vehicle.RegistrationNumber, StringComparison.OrdinalIgnoreCase)))",
                            "source": "parking-sequence:p_753cfee6aae6",
                            "target": "parking-sequence:p_753cfee6aae6",
                            "reply": true,
                            "branches": []
                          },
                          {
                            "id": "parking-sequence:element-32",
                            "kind": "fragment",
                            "label": "Alternative paths",
                            "source": null,
                            "target": null,
                            "reply": false,
                            "branches": [
                              {
                                "label": "IsParked(vehicle)",
                                "items": [
                                  {
                                    "id": "parking-sequence:element-33",
                                    "kind": "message",
                                    "label": "Failed($\u0022Vehicle {vehicle.RegistrationNumber} is already parked in a garage.\u0022, OperationError.VehicleAlreadyParked)",
                                    "source": "parking-sequence:p_753cfee6aae6",
                                    "target": "parking-sequence:p_426dd07c2e3a",
                                    "reply": false,
                                    "branches": []
                                  },
                                  {
                                    "id": "parking-sequence:element-35",
                                    "kind": "note",
                                    "label": "Scope boundary: method body not expanded.",
                                    "source": null,
                                    "target": null,
                                    "reply": false,
                                    "branches": []
                                  },
                                  {
                                    "id": "parking-sequence:element-36",
                                    "kind": "reply",
                                    "label": "Garage.Results.ParkingResult (if call returns)",
                                    "source": "parking-sequence:p_426dd07c2e3a",
                                    "target": "parking-sequence:p_753cfee6aae6",
                                    "reply": true,
                                    "branches": []
                                  },
                                  {
                                    "id": "parking-sequence:element-38",
                                    "kind": "reply",
                                    "label": "ParkingResult.Failed($\u0022Vehicle {vehicle.RegistrationNumber} is already parked in a garage.\u0022, OperationError.VehicleAlreadyParked)",
                                    "source": "parking-sequence:p_753cfee6aae6",
                                    "target": "parking-sequence:p_753cfee6aae6",
                                    "reply": true,
                                    "branches": []
                                  }
                                ]
                              },
                              {
                                "label": "otherwise",
                                "items": [
                                  {
                                    "id": "parking-sequence:element-40",
                                    "kind": "fragment",
                                    "label": "Alternative paths",
                                    "source": null,
                                    "target": null,
                                    "reply": false,
                                    "branches": [
                                      {
                                        "label": "spotNumber is int spot",
                                        "items": [
                                          {
                                            "id": "parking-sequence:element-41",
                                            "kind": "message",
                                            "label": "Park(vehicle, spot)",
                                            "source": "parking-sequence:p_753cfee6aae6",
                                            "target": "parking-sequence:p_50a211325908",
                                            "reply": false,
                                            "branches": []
                                          },
                                          {
                                            "id": "parking-sequence:element-43",
                                            "kind": "note",
                                            "label": "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)",
                                            "source": null,
                                            "target": null,
                                            "reply": false,
                                            "branches": []
                                          },
                                          {
                                            "id": "parking-sequence:element-44",
                                            "kind": "fragment",
                                            "label": "Alternative paths",
                                            "source": null,
                                            "target": null,
                                            "reply": false,
                                            "branches": [
                                              {
                                                "label": "spot \u003C 1 || spot \u003E Capacity",
                                                "items": [
                                                  {
                                                    "id": "parking-sequence:element-45",
                                                    "kind": "message",
                                                    "label": "Failed($\u0022Parking spot must be between 1 and {Capacity}.\u0022, OperationError.SpotOutOfRange)",
                                                    "source": "parking-sequence:p_50a211325908",
                                                    "target": "parking-sequence:p_426dd07c2e3a",
                                                    "reply": false,
                                                    "branches": []
                                                  },
                                                  {
                                                    "id": "parking-sequence:element-47",
                                                    "kind": "note",
                                                    "label": "Scope boundary: method body not expanded.",
                                                    "source": null,
                                                    "target": null,
                                                    "reply": false,
                                                    "branches": []
                                                  },
                                                  {
                                                    "id": "parking-sequence:element-48",
                                                    "kind": "reply",
                                                    "label": "Garage.Results.ParkingResult (if call returns)",
                                                    "source": "parking-sequence:p_426dd07c2e3a",
                                                    "target": "parking-sequence:p_50a211325908",
                                                    "reply": true,
                                                    "branches": []
                                                  },
                                                  {
                                                    "id": "parking-sequence:element-50",
                                                    "kind": "reply",
                                                    "label": "ParkingResult.Failed($\u0022Parking spot must be between 1 and {Capacity}.\u0022, OperationError.SpotOutOfRange)",
                                                    "source": "parking-sequence:p_50a211325908",
                                                    "target": "parking-sequence:p_753cfee6aae6",
                                                    "reply": true,
                                                    "branches": []
                                                  }
                                                ]
                                              },
                                              {
                                                "label": "otherwise",
                                                "items": [
                                                  {
                                                    "id": "parking-sequence:element-52",
                                                    "kind": "fragment",
                                                    "label": "Alternative paths",
                                                    "source": null,
                                                    "target": null,
                                                    "reply": false,
                                                    "branches": [
                                                      {
                                                        "label": "parkingSpot.Vehicle is not null",
                                                        "items": [
                                                          {
                                                            "id": "parking-sequence:element-53",
                                                            "kind": "message",
                                                            "label": "Failed($\u0022Parking spot {spot} is occupied.\u0022, OperationError.SpotOccupied)",
                                                            "source": "parking-sequence:p_50a211325908",
                                                            "target": "parking-sequence:p_426dd07c2e3a",
                                                            "reply": false,
                                                            "branches": []
                                                          },
                                                          {
                                                            "id": "parking-sequence:element-55",
                                                            "kind": "note",
                                                            "label": "Scope boundary: method body not expanded.",
                                                            "source": null,
                                                            "target": null,
                                                            "reply": false,
                                                            "branches": []
                                                          },
                                                          {
                                                            "id": "parking-sequence:element-56",
                                                            "kind": "reply",
                                                            "label": "Garage.Results.ParkingResult (if call returns)",
                                                            "source": "parking-sequence:p_426dd07c2e3a",
                                                            "target": "parking-sequence:p_50a211325908",
                                                            "reply": true,
                                                            "branches": []
                                                          },
                                                          {
                                                            "id": "parking-sequence:element-58",
                                                            "kind": "reply",
                                                            "label": "ParkingResult.Failed($\u0022Parking spot {spot} is occupied.\u0022, OperationError.SpotOccupied)",
                                                            "source": "parking-sequence:p_50a211325908",
                                                            "target": "parking-sequence:p_753cfee6aae6",
                                                            "reply": true,
                                                            "branches": []
                                                          }
                                                        ]
                                                      },
                                                      {
                                                        "label": "otherwise",
                                                        "items": [
                                                          {
                                                            "id": "parking-sequence:element-60",
                                                            "kind": "message",
                                                            "label": "Fits(vehicle)",
                                                            "source": "parking-sequence:p_50a211325908",
                                                            "target": "parking-sequence:p_b323161f1e5c",
                                                            "reply": false,
                                                            "branches": []
                                                          },
                                                          {
                                                            "id": "parking-sequence:element-62",
                                                            "kind": "note",
                                                            "label": "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)",
                                                            "source": null,
                                                            "target": null,
                                                            "reply": false,
                                                            "branches": []
                                                          },
                                                          {
                                                            "id": "parking-sequence:element-63",
                                                            "kind": "fragment",
                                                            "label": "Alternative paths",
                                                            "source": null,
                                                            "target": null,
                                                            "reply": false,
                                                            "branches": [
                                                              {
                                                                "label": "Dimensions is null",
                                                                "items": [
                                                                  {
                                                                    "id": "parking-sequence:element-64",
                                                                    "kind": "reply",
                                                                    "label": "true",
                                                                    "source": "parking-sequence:p_b323161f1e5c",
                                                                    "target": "parking-sequence:p_50a211325908",
                                                                    "reply": true,
                                                                    "branches": []
                                                                  }
                                                                ]
                                                              },
                                                              {
                                                                "label": "otherwise",
                                                                "items": [
                                                                  {
                                                                    "id": "parking-sequence:element-66",
                                                                    "kind": "reply",
                                                                    "label": "size.LengthMeters \u003C= Dimensions.LengthMeters \u0026\u0026 size.WidthMeters \u003C= Dimensions.WidthMeters \u0026\u0026 size.HeightMeters \u003C= Dimensions.HeightMeters",
                                                                    "source": "parking-sequence:p_b323161f1e5c",
                                                                    "target": "parking-sequence:p_50a211325908",
                                                                    "reply": true,
                                                                    "branches": []
                                                                  }
                                                                ]
                                                              }
                                                            ]
                                                          },
                                                          {
                                                            "id": "parking-sequence:element-68",
                                                            "kind": "fragment",
                                                            "label": "Alternative paths",
                                                            "source": null,
                                                            "target": null,
                                                            "reply": false,
                                                            "branches": [
                                                              {
                                                                "label": "!parkingSpot.Fits(vehicle)",
                                                                "items": [
                                                                  {
                                                                    "id": "parking-sequence:element-69",
                                                                    "kind": "message",
                                                                    "label": "Failed($\u0022Vehicle {vehicle.RegistrationNumber} does not fit in parking spot {spot}.\u0022, OperationError.VehicleDoesNotFit)",
                                                                    "source": "parking-sequence:p_50a211325908",
                                                                    "target": "parking-sequence:p_426dd07c2e3a",
                                                                    "reply": false,
                                                                    "branches": []
                                                                  },
                                                                  {
                                                                    "id": "parking-sequence:element-71",
                                                                    "kind": "note",
                                                                    "label": "Scope boundary: method body not expanded.",
                                                                    "source": null,
                                                                    "target": null,
                                                                    "reply": false,
                                                                    "branches": []
                                                                  },
                                                                  {
                                                                    "id": "parking-sequence:element-72",
                                                                    "kind": "reply",
                                                                    "label": "Garage.Results.ParkingResult (if call returns)",
                                                                    "source": "parking-sequence:p_426dd07c2e3a",
                                                                    "target": "parking-sequence:p_50a211325908",
                                                                    "reply": true,
                                                                    "branches": []
                                                                  },
                                                                  {
                                                                    "id": "parking-sequence:element-74",
                                                                    "kind": "reply",
                                                                    "label": "ParkingResult.Failed($\u0022Vehicle {vehicle.RegistrationNumber} does not fit in parking spot {spot}.\u0022, OperationError.VehicleDoesNotFit)",
                                                                    "source": "parking-sequence:p_50a211325908",
                                                                    "target": "parking-sequence:p_753cfee6aae6",
                                                                    "reply": true,
                                                                    "branches": []
                                                                  }
                                                                ]
                                                              },
                                                              {
                                                                "label": "otherwise",
                                                                "items": [
                                                                  {
                                                                    "id": "parking-sequence:element-76",
                                                                    "kind": "message",
                                                                    "label": "RegistrationExists(vehicle.RegistrationNumber)",
                                                                    "source": "parking-sequence:p_50a211325908",
                                                                    "target": "parking-sequence:p_50a211325908",
                                                                    "reply": false,
                                                                    "branches": []
                                                                  },
                                                                  {
                                                                    "id": "parking-sequence:element-78",
                                                                    "kind": "note",
                                                                    "label": "Callback boundary (not executed by this analysis): spot =\u003E string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase)",
                                                                    "source": null,
                                                                    "target": null,
                                                                    "reply": false,
                                                                    "branches": []
                                                                  },
                                                                  {
                                                                    "id": "parking-sequence:element-79",
                                                                    "kind": "note",
                                                                    "label": "External/delegate call boundary (not expanded): parkingSpots.Any(spot =\u003E string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase))",
                                                                    "source": null,
                                                                    "target": null,
                                                                    "reply": false,
                                                                    "branches": []
                                                                  },
                                                                  {
                                                                    "id": "parking-sequence:element-80",
                                                                    "kind": "reply",
                                                                    "label": "parkingSpots.Any(spot =\u003E string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase))",
                                                                    "source": "parking-sequence:p_50a211325908",
                                                                    "target": "parking-sequence:p_50a211325908",
                                                                    "reply": true,
                                                                    "branches": []
                                                                  },
                                                                  {
                                                                    "id": "parking-sequence:element-82",
                                                                    "kind": "fragment",
                                                                    "label": "Alternative paths",
                                                                    "source": null,
                                                                    "target": null,
                                                                    "reply": false,
                                                                    "branches": [
                                                                      {
                                                                        "label": "RegistrationExists(vehicle.RegistrationNumber)",
                                                                        "items": [
                                                                          {
                                                                            "id": "parking-sequence:element-83",
                                                                            "kind": "message",
                                                                            "label": "DuplicateRegistration(vehicle)",
                                                                            "source": "parking-sequence:p_50a211325908",
                                                                            "target": "parking-sequence:p_50a211325908",
                                                                            "reply": false,
                                                                            "branches": []
                                                                          },
                                                                          {
                                                                            "id": "parking-sequence:element-85",
                                                                            "kind": "message",
                                                                            "label": "Failed($\u0022A vehicle with registration number {vehicle.RegistrationNumber} is already parked.\u0022, OperationError.DuplicateRegistration)",
                                                                            "source": "parking-sequence:p_50a211325908",
                                                                            "target": "parking-sequence:p_426dd07c2e3a",
                                                                            "reply": false,
                                                                            "branches": []
                                                                          },
                                                                          {
                                                                            "id": "parking-sequence:element-87",
                                                                            "kind": "note",
                                                                            "label": "Scope boundary: method body not expanded.",
                                                                            "source": null,
                                                                            "target": null,
                                                                            "reply": false,
                                                                            "branches": []
                                                                          },
                                                                          {
                                                                            "id": "parking-sequence:element-88",
                                                                            "kind": "reply",
                                                                            "label": "Garage.Results.ParkingResult (if call returns)",
                                                                            "source": "parking-sequence:p_426dd07c2e3a",
                                                                            "target": "parking-sequence:p_50a211325908",
                                                                            "reply": true,
                                                                            "branches": []
                                                                          },
                                                                          {
                                                                            "id": "parking-sequence:element-90",
                                                                            "kind": "reply",
                                                                            "label": "ParkingResult.Failed($\u0022A vehicle with registration number {vehicle.RegistrationNumber} is already parked.\u0022, OperationError.DuplicateRegistration)",
                                                                            "source": "parking-sequence:p_50a211325908",
                                                                            "target": "parking-sequence:p_50a211325908",
                                                                            "reply": true,
                                                                            "branches": []
                                                                          },
                                                                          {
                                                                            "id": "parking-sequence:element-92",
                                                                            "kind": "reply",
                                                                            "label": "DuplicateRegistration(vehicle)",
                                                                            "source": "parking-sequence:p_50a211325908",
                                                                            "target": "parking-sequence:p_753cfee6aae6",
                                                                            "reply": true,
                                                                            "branches": []
                                                                          }
                                                                        ]
                                                                      },
                                                                      {
                                                                        "label": "otherwise",
                                                                        "items": [
                                                                          {
                                                                            "id": "parking-sequence:element-94",
                                                                            "kind": "message",
                                                                            "label": "Park(vehicle)",
                                                                            "source": "parking-sequence:p_50a211325908",
                                                                            "target": "parking-sequence:p_b323161f1e5c",
                                                                            "reply": false,
                                                                            "branches": []
                                                                          },
                                                                          {
                                                                            "id": "parking-sequence:element-96",
                                                                            "kind": "note",
                                                                            "label": "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)",
                                                                            "source": null,
                                                                            "target": null,
                                                                            "reply": false,
                                                                            "branches": []
                                                                          },
                                                                          {
                                                                            "id": "parking-sequence:element-97",
                                                                            "kind": "fragment",
                                                                            "label": "Alternative paths",
                                                                            "source": null,
                                                                            "target": null,
                                                                            "reply": false,
                                                                            "branches": [
                                                                              {
                                                                                "label": "Vehicle is not null is false",
                                                                                "items": [
                                                                                  {
                                                                                    "id": "parking-sequence:element-98",
                                                                                    "kind": "message",
                                                                                    "label": "Fits(vehicle)",
                                                                                    "source": "parking-sequence:p_b323161f1e5c",
                                                                                    "target": "parking-sequence:p_b323161f1e5c",
                                                                                    "reply": false,
                                                                                    "branches": []
                                                                                  },
                                                                                  {
                                                                                    "id": "parking-sequence:element-100",
                                                                                    "kind": "note",
                                                                                    "label": "Depth boundary: method body not expanded.",
                                                                                    "source": null,
                                                                                    "target": null,
                                                                                    "reply": false,
                                                                                    "branches": []
                                                                                  },
                                                                                  {
                                                                                    "id": "parking-sequence:element-101",
                                                                                    "kind": "reply",
                                                                                    "label": "bool (if call returns)",
                                                                                    "source": "parking-sequence:p_b323161f1e5c",
                                                                                    "target": "parking-sequence:p_b323161f1e5c",
                                                                                    "reply": true,
                                                                                    "branches": []
                                                                                  }
                                                                                ]
                                                                              },
                                                                              {
                                                                                "label": "short-circuit",
                                                                                "items": []
                                                                              }
                                                                            ]
                                                                          },
                                                                          {
                                                                            "id": "parking-sequence:element-103",
                                                                            "kind": "fragment",
                                                                            "label": "Alternative paths",
                                                                            "source": null,
                                                                            "target": null,
                                                                            "reply": false,
                                                                            "branches": [
                                                                              {
                                                                                "label": "Vehicle is not null || !Fits(vehicle)",
                                                                                "items": [
                                                                                  {
                                                                                    "id": "parking-sequence:element-104",
                                                                                    "kind": "note",
                                                                                    "label": "Constructor/initializer boundary (not expanded): new InvalidOperationException(\u0022The spot must be empty and large enough for the vehicle.\u0022)",
                                                                                    "source": null,
                                                                                    "target": null,
                                                                                    "reply": false,
                                                                                    "branches": []
                                                                                  },
                                                                                  {
                                                                                    "id": "parking-sequence:element-105",
                                                                                    "kind": "note",
                                                                                    "label": "Throws: new InvalidOperationException(\u0022The spot must be empty and large enough for the vehicle.\u0022); this path terminates here.",
                                                                                    "source": null,
                                                                                    "target": null,
                                                                                    "reply": false,
                                                                                    "branches": []
                                                                                  }
                                                                                ]
                                                                              },
                                                                              {
                                                                                "label": "otherwise",
                                                                                "items": [
                                                                                  {
                                                                                    "id": "parking-sequence:element-106",
                                                                                    "kind": "reply",
                                                                                    "label": "complete",
                                                                                    "source": "parking-sequence:p_b323161f1e5c",
                                                                                    "target": "parking-sequence:p_50a211325908",
                                                                                    "reply": true,
                                                                                    "branches": []
                                                                                  }
                                                                                ]
                                                                              }
                                                                            ]
                                                                          },
                                                                          {
                                                                            "id": "parking-sequence:element-108",
                                                                            "kind": "message",
                                                                            "label": "Completed(spot, $\u0022Vehicle {vehicle.RegistrationNumber} parked at spot {spot}.\u0022)",
                                                                            "source": "parking-sequence:p_50a211325908",
                                                                            "target": "parking-sequence:p_426dd07c2e3a",
                                                                            "reply": false,
                                                                            "branches": []
                                                                          },
                                                                          {
                                                                            "id": "parking-sequence:element-110",
                                                                            "kind": "note",
                                                                            "label": "Scope boundary: method body not expanded.",
                                                                            "source": null,
                                                                            "target": null,
                                                                            "reply": false,
                                                                            "branches": []
                                                                          },
                                                                          {
                                                                            "id": "parking-sequence:element-111",
                                                                            "kind": "reply",
                                                                            "label": "Garage.Results.ParkingResult (if call returns)",
                                                                            "source": "parking-sequence:p_426dd07c2e3a",
                                                                            "target": "parking-sequence:p_50a211325908",
                                                                            "reply": true,
                                                                            "branches": []
                                                                          },
                                                                          {
                                                                            "id": "parking-sequence:element-113",
                                                                            "kind": "reply",
                                                                            "label": "ParkingResult.Completed(spot, $\u0022Vehicle {vehicle.RegistrationNumber} parked at spot {spot}.\u0022)",
                                                                            "source": "parking-sequence:p_50a211325908",
                                                                            "target": "parking-sequence:p_753cfee6aae6",
                                                                            "reply": true,
                                                                            "branches": []
                                                                          }
                                                                        ]
                                                                      }
                                                                    ]
                                                                  }
                                                                ]
                                                              }
                                                            ]
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                ]
                                              }
                                            ]
                                          },
                                          {
                                            "id": "parking-sequence:element-115",
                                            "kind": "reply",
                                            "label": "garage.Park(vehicle, spot)",
                                            "source": "parking-sequence:p_753cfee6aae6",
                                            "target": "parking-sequence:p_753cfee6aae6",
                                            "reply": true,
                                            "branches": []
                                          }
                                        ]
                                      },
                                      {
                                        "label": "otherwise",
                                        "items": [
                                          {
                                            "id": "parking-sequence:element-117",
                                            "kind": "message",
                                            "label": "Park(vehicle)",
                                            "source": "parking-sequence:p_753cfee6aae6",
                                            "target": "parking-sequence:p_50a211325908",
                                            "reply": false,
                                            "branches": []
                                          },
                                          {
                                            "id": "parking-sequence:element-119",
                                            "kind": "note",
                                            "label": "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)",
                                            "source": null,
                                            "target": null,
                                            "reply": false,
                                            "branches": []
                                          },
                                          {
                                            "id": "parking-sequence:element-120",
                                            "kind": "message",
                                            "label": "RegistrationExists(vehicle.RegistrationNumber)",
                                            "source": "parking-sequence:p_50a211325908",
                                            "target": "parking-sequence:p_50a211325908",
                                            "reply": false,
                                            "branches": []
                                          },
                                          {
                                            "id": "parking-sequence:element-122",
                                            "kind": "note",
                                            "label": "Callback boundary (not executed by this analysis): spot =\u003E string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase)",
                                            "source": null,
                                            "target": null,
                                            "reply": false,
                                            "branches": []
                                          },
                                          {
                                            "id": "parking-sequence:element-123",
                                            "kind": "note",
                                            "label": "External/delegate call boundary (not expanded): parkingSpots.Any(spot =\u003E string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase))",
                                            "source": null,
                                            "target": null,
                                            "reply": false,
                                            "branches": []
                                          },
                                          {
                                            "id": "parking-sequence:element-124",
                                            "kind": "reply",
                                            "label": "parkingSpots.Any(spot =\u003E string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase))",
                                            "source": "parking-sequence:p_50a211325908",
                                            "target": "parking-sequence:p_50a211325908",
                                            "reply": true,
                                            "branches": []
                                          },
                                          {
                                            "id": "parking-sequence:element-126",
                                            "kind": "fragment",
                                            "label": "Alternative paths",
                                            "source": null,
                                            "target": null,
                                            "reply": false,
                                            "branches": [
                                              {
                                                "label": "RegistrationExists(vehicle.RegistrationNumber)",
                                                "items": [
                                                  {
                                                    "id": "parking-sequence:element-127",
                                                    "kind": "message",
                                                    "label": "DuplicateRegistration(vehicle)",
                                                    "source": "parking-sequence:p_50a211325908",
                                                    "target": "parking-sequence:p_50a211325908",
                                                    "reply": false,
                                                    "branches": []
                                                  },
                                                  {
                                                    "id": "parking-sequence:element-129",
                                                    "kind": "message",
                                                    "label": "Failed($\u0022A vehicle with registration number {vehicle.RegistrationNumber} is already parked.\u0022, OperationError.DuplicateRegistration)",
                                                    "source": "parking-sequence:p_50a211325908",
                                                    "target": "parking-sequence:p_426dd07c2e3a",
                                                    "reply": false,
                                                    "branches": []
                                                  },
                                                  {
                                                    "id": "parking-sequence:element-131",
                                                    "kind": "note",
                                                    "label": "Scope boundary: method body not expanded.",
                                                    "source": null,
                                                    "target": null,
                                                    "reply": false,
                                                    "branches": []
                                                  },
                                                  {
                                                    "id": "parking-sequence:element-132",
                                                    "kind": "reply",
                                                    "label": "Garage.Results.ParkingResult (if call returns)",
                                                    "source": "parking-sequence:p_426dd07c2e3a",
                                                    "target": "parking-sequence:p_50a211325908",
                                                    "reply": true,
                                                    "branches": []
                                                  },
                                                  {
                                                    "id": "parking-sequence:element-134",
                                                    "kind": "reply",
                                                    "label": "ParkingResult.Failed($\u0022A vehicle with registration number {vehicle.RegistrationNumber} is already parked.\u0022, OperationError.DuplicateRegistration)",
                                                    "source": "parking-sequence:p_50a211325908",
                                                    "target": "parking-sequence:p_50a211325908",
                                                    "reply": true,
                                                    "branches": []
                                                  },
                                                  {
                                                    "id": "parking-sequence:element-136",
                                                    "kind": "reply",
                                                    "label": "DuplicateRegistration(vehicle)",
                                                    "source": "parking-sequence:p_50a211325908",
                                                    "target": "parking-sequence:p_753cfee6aae6",
                                                    "reply": true,
                                                    "branches": []
                                                  }
                                                ]
                                              },
                                              {
                                                "label": "otherwise",
                                                "items": [
                                                  {
                                                    "id": "parking-sequence:element-138",
                                                    "kind": "note",
                                                    "label": "Callback boundary (not executed by this analysis): spot =\u003E spot.Vehicle is null \u0026\u0026 spot.Fits(vehicle)",
                                                    "source": null,
                                                    "target": null,
                                                    "reply": false,
                                                    "branches": []
                                                  },
                                                  {
                                                    "id": "parking-sequence:element-139",
                                                    "kind": "note",
                                                    "label": "External/delegate call boundary (not expanded): parkingSpots.FirstOrDefault(spot =\u003E spot.Vehicle is null \u0026\u0026 spot.Fits(vehicle))",
                                                    "source": null,
                                                    "target": null,
                                                    "reply": false,
                                                    "branches": []
                                                  },
                                                  {
                                                    "id": "parking-sequence:element-140",
                                                    "kind": "fragment",
                                                    "label": "Alternative paths",
                                                    "source": null,
                                                    "target": null,
                                                    "reply": false,
                                                    "branches": [
                                                      {
                                                        "label": "availableSpot is null",
                                                        "items": [
                                                          {
                                                            "id": "parking-sequence:element-141",
                                                            "kind": "fragment",
                                                            "label": "Alternative paths",
                                                            "source": null,
                                                            "target": null,
                                                            "reply": false,
                                                            "branches": [
                                                              {
                                                                "label": "AvailableSpaces == 0",
                                                                "items": [
                                                                  {
                                                                    "id": "parking-sequence:element-142",
                                                                    "kind": "message",
                                                                    "label": "Failed(\u0022The garage is full.\u0022, OperationError.GarageFull)",
                                                                    "source": "parking-sequence:p_50a211325908",
                                                                    "target": "parking-sequence:p_426dd07c2e3a",
                                                                    "reply": false,
                                                                    "branches": []
                                                                  },
                                                                  {
                                                                    "id": "parking-sequence:element-144",
                                                                    "kind": "note",
                                                                    "label": "Scope boundary: method body not expanded.",
                                                                    "source": null,
                                                                    "target": null,
                                                                    "reply": false,
                                                                    "branches": []
                                                                  },
                                                                  {
                                                                    "id": "parking-sequence:element-145",
                                                                    "kind": "reply",
                                                                    "label": "Garage.Results.ParkingResult (if call returns)",
                                                                    "source": "parking-sequence:p_426dd07c2e3a",
                                                                    "target": "parking-sequence:p_50a211325908",
                                                                    "reply": true,
                                                                    "branches": []
                                                                  },
                                                                  {
                                                                    "id": "parking-sequence:element-147",
                                                                    "kind": "reply",
                                                                    "label": "ParkingResult.Failed(\u0022The garage is full.\u0022, OperationError.GarageFull)",
                                                                    "source": "parking-sequence:p_50a211325908",
                                                                    "target": "parking-sequence:p_753cfee6aae6",
                                                                    "reply": true,
                                                                    "branches": []
                                                                  }
                                                                ]
                                                              },
                                                              {
                                                                "label": "otherwise",
                                                                "items": [
                                                                  {
                                                                    "id": "parking-sequence:element-149",
                                                                    "kind": "message",
                                                                    "label": "Failed(\u0022No available parking spot is large enough for this vehicle.\u0022, OperationError.VehicleDoesNotFit)",
                                                                    "source": "parking-sequence:p_50a211325908",
                                                                    "target": "parking-sequence:p_426dd07c2e3a",
                                                                    "reply": false,
                                                                    "branches": []
                                                                  },
                                                                  {
                                                                    "id": "parking-sequence:element-151",
                                                                    "kind": "note",
                                                                    "label": "Scope boundary: method body not expanded.",
                                                                    "source": null,
                                                                    "target": null,
                                                                    "reply": false,
                                                                    "branches": []
                                                                  },
                                                                  {
                                                                    "id": "parking-sequence:element-152",
                                                                    "kind": "reply",
                                                                    "label": "Garage.Results.ParkingResult (if call returns)",
                                                                    "source": "parking-sequence:p_426dd07c2e3a",
                                                                    "target": "parking-sequence:p_50a211325908",
                                                                    "reply": true,
                                                                    "branches": []
                                                                  },
                                                                  {
                                                                    "id": "parking-sequence:element-154",
                                                                    "kind": "reply",
                                                                    "label": "ParkingResult.Failed(\u0022No available parking spot is large enough for this vehicle.\u0022, OperationError.VehicleDoesNotFit)",
                                                                    "source": "parking-sequence:p_50a211325908",
                                                                    "target": "parking-sequence:p_753cfee6aae6",
                                                                    "reply": true,
                                                                    "branches": []
                                                                  }
                                                                ]
                                                              }
                                                            ]
                                                          }
                                                        ]
                                                      },
                                                      {
                                                        "label": "otherwise",
                                                        "items": [
                                                          {
                                                            "id": "parking-sequence:element-156",
                                                            "kind": "message",
                                                            "label": "Park(vehicle, availableSpot.Number)",
                                                            "source": "parking-sequence:p_50a211325908",
                                                            "target": "parking-sequence:p_50a211325908",
                                                            "reply": false,
                                                            "branches": []
                                                          },
                                                          {
                                                            "id": "parking-sequence:element-158",
                                                            "kind": "note",
                                                            "label": "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)",
                                                            "source": null,
                                                            "target": null,
                                                            "reply": false,
                                                            "branches": []
                                                          },
                                                          {
                                                            "id": "parking-sequence:element-159",
                                                            "kind": "fragment",
                                                            "label": "Alternative paths",
                                                            "source": null,
                                                            "target": null,
                                                            "reply": false,
                                                            "branches": [
                                                              {
                                                                "label": "spot \u003C 1 || spot \u003E Capacity",
                                                                "items": [
                                                                  {
                                                                    "id": "parking-sequence:element-160",
                                                                    "kind": "message",
                                                                    "label": "Failed($\u0022Parking spot must be between 1 and {Capacity}.\u0022, OperationError.SpotOutOfRange)",
                                                                    "source": "parking-sequence:p_50a211325908",
                                                                    "target": "parking-sequence:p_426dd07c2e3a",
                                                                    "reply": false,
                                                                    "branches": []
                                                                  },
                                                                  {
                                                                    "id": "parking-sequence:element-162",
                                                                    "kind": "note",
                                                                    "label": "Scope boundary: method body not expanded.",
                                                                    "source": null,
                                                                    "target": null,
                                                                    "reply": false,
                                                                    "branches": []
                                                                  },
                                                                  {
                                                                    "id": "parking-sequence:element-163",
                                                                    "kind": "reply",
                                                                    "label": "Garage.Results.ParkingResult (if call returns)",
                                                                    "source": "parking-sequence:p_426dd07c2e3a",
                                                                    "target": "parking-sequence:p_50a211325908",
                                                                    "reply": true,
                                                                    "branches": []
                                                                  },
                                                                  {
                                                                    "id": "parking-sequence:element-165",
                                                                    "kind": "reply",
                                                                    "label": "ParkingResult.Failed($\u0022Parking spot must be between 1 and {Capacity}.\u0022, OperationError.SpotOutOfRange)",
                                                                    "source": "parking-sequence:p_50a211325908",
                                                                    "target": "parking-sequence:p_50a211325908",
                                                                    "reply": true,
                                                                    "branches": []
                                                                  }
                                                                ]
                                                              },
                                                              {
                                                                "label": "otherwise",
                                                                "items": [
                                                                  {
                                                                    "id": "parking-sequence:element-167",
                                                                    "kind": "fragment",
                                                                    "label": "Alternative paths",
                                                                    "source": null,
                                                                    "target": null,
                                                                    "reply": false,
                                                                    "branches": [
                                                                      {
                                                                        "label": "parkingSpot.Vehicle is not null",
                                                                        "items": [
                                                                          {
                                                                            "id": "parking-sequence:element-168",
                                                                            "kind": "message",
                                                                            "label": "Failed($\u0022Parking spot {spot} is occupied.\u0022, OperationError.SpotOccupied)",
                                                                            "source": "parking-sequence:p_50a211325908",
                                                                            "target": "parking-sequence:p_426dd07c2e3a",
                                                                            "reply": false,
                                                                            "branches": []
                                                                          },
                                                                          {
                                                                            "id": "parking-sequence:element-170",
                                                                            "kind": "note",
                                                                            "label": "Scope boundary: method body not expanded.",
                                                                            "source": null,
                                                                            "target": null,
                                                                            "reply": false,
                                                                            "branches": []
                                                                          },
                                                                          {
                                                                            "id": "parking-sequence:element-171",
                                                                            "kind": "reply",
                                                                            "label": "Garage.Results.ParkingResult (if call returns)",
                                                                            "source": "parking-sequence:p_426dd07c2e3a",
                                                                            "target": "parking-sequence:p_50a211325908",
                                                                            "reply": true,
                                                                            "branches": []
                                                                          },
                                                                          {
                                                                            "id": "parking-sequence:element-173",
                                                                            "kind": "reply",
                                                                            "label": "ParkingResult.Failed($\u0022Parking spot {spot} is occupied.\u0022, OperationError.SpotOccupied)",
                                                                            "source": "parking-sequence:p_50a211325908",
                                                                            "target": "parking-sequence:p_50a211325908",
                                                                            "reply": true,
                                                                            "branches": []
                                                                          }
                                                                        ]
                                                                      },
                                                                      {
                                                                        "label": "otherwise",
                                                                        "items": [
                                                                          {
                                                                            "id": "parking-sequence:element-175",
                                                                            "kind": "message",
                                                                            "label": "Fits(vehicle)",
                                                                            "source": "parking-sequence:p_50a211325908",
                                                                            "target": "parking-sequence:p_b323161f1e5c",
                                                                            "reply": false,
                                                                            "branches": []
                                                                          },
                                                                          {
                                                                            "id": "parking-sequence:element-177",
                                                                            "kind": "note",
                                                                            "label": "Depth boundary: method body not expanded.",
                                                                            "source": null,
                                                                            "target": null,
                                                                            "reply": false,
                                                                            "branches": []
                                                                          },
                                                                          {
                                                                            "id": "parking-sequence:element-178",
                                                                            "kind": "reply",
                                                                            "label": "bool (if call returns)",
                                                                            "source": "parking-sequence:p_b323161f1e5c",
                                                                            "target": "parking-sequence:p_50a211325908",
                                                                            "reply": true,
                                                                            "branches": []
                                                                          },
                                                                          {
                                                                            "id": "parking-sequence:element-180",
                                                                            "kind": "fragment",
                                                                            "label": "Alternative paths",
                                                                            "source": null,
                                                                            "target": null,
                                                                            "reply": false,
                                                                            "branches": [
                                                                              {
                                                                                "label": "!parkingSpot.Fits(vehicle)",
                                                                                "items": [
                                                                                  {
                                                                                    "id": "parking-sequence:element-181",
                                                                                    "kind": "message",
                                                                                    "label": "Failed($\u0022Vehicle {vehicle.RegistrationNumber} does not fit in parking spot {spot}.\u0022, OperationError.VehicleDoesNotFit)",
                                                                                    "source": "parking-sequence:p_50a211325908",
                                                                                    "target": "parking-sequence:p_426dd07c2e3a",
                                                                                    "reply": false,
                                                                                    "branches": []
                                                                                  },
                                                                                  {
                                                                                    "id": "parking-sequence:element-183",
                                                                                    "kind": "note",
                                                                                    "label": "Scope boundary: method body not expanded.",
                                                                                    "source": null,
                                                                                    "target": null,
                                                                                    "reply": false,
                                                                                    "branches": []
                                                                                  },
                                                                                  {
                                                                                    "id": "parking-sequence:element-184",
                                                                                    "kind": "reply",
                                                                                    "label": "Garage.Results.ParkingResult (if call returns)",
                                                                                    "source": "parking-sequence:p_426dd07c2e3a",
                                                                                    "target": "parking-sequence:p_50a211325908",
                                                                                    "reply": true,
                                                                                    "branches": []
                                                                                  },
                                                                                  {
                                                                                    "id": "parking-sequence:element-186",
                                                                                    "kind": "reply",
                                                                                    "label": "ParkingResult.Failed($\u0022Vehicle {vehicle.RegistrationNumber} does not fit in parking spot {spot}.\u0022, OperationError.VehicleDoesNotFit)",
                                                                                    "source": "parking-sequence:p_50a211325908",
                                                                                    "target": "parking-sequence:p_50a211325908",
                                                                                    "reply": true,
                                                                                    "branches": []
                                                                                  }
                                                                                ]
                                                                              },
                                                                              {
                                                                                "label": "otherwise",
                                                                                "items": [
                                                                                  {
                                                                                    "id": "parking-sequence:element-188",
                                                                                    "kind": "message",
                                                                                    "label": "RegistrationExists(vehicle.RegistrationNumber)",
                                                                                    "source": "parking-sequence:p_50a211325908",
                                                                                    "target": "parking-sequence:p_50a211325908",
                                                                                    "reply": false,
                                                                                    "branches": []
                                                                                  },
                                                                                  {
                                                                                    "id": "parking-sequence:element-190",
                                                                                    "kind": "note",
                                                                                    "label": "Depth boundary: method body not expanded.",
                                                                                    "source": null,
                                                                                    "target": null,
                                                                                    "reply": false,
                                                                                    "branches": []
                                                                                  },
                                                                                  {
                                                                                    "id": "parking-sequence:element-191",
                                                                                    "kind": "reply",
                                                                                    "label": "bool (if call returns)",
                                                                                    "source": "parking-sequence:p_50a211325908",
                                                                                    "target": "parking-sequence:p_50a211325908",
                                                                                    "reply": true,
                                                                                    "branches": []
                                                                                  },
                                                                                  {
                                                                                    "id": "parking-sequence:element-193",
                                                                                    "kind": "fragment",
                                                                                    "label": "Alternative paths",
                                                                                    "source": null,
                                                                                    "target": null,
                                                                                    "reply": false,
                                                                                    "branches": [
                                                                                      {
                                                                                        "label": "RegistrationExists(vehicle.RegistrationNumber)",
                                                                                        "items": [
                                                                                          {
                                                                                            "id": "parking-sequence:element-194",
                                                                                            "kind": "message",
                                                                                            "label": "DuplicateRegistration(vehicle)",
                                                                                            "source": "parking-sequence:p_50a211325908",
                                                                                            "target": "parking-sequence:p_50a211325908",
                                                                                            "reply": false,
                                                                                            "branches": []
                                                                                          },
                                                                                          {
                                                                                            "id": "parking-sequence:element-196",
                                                                                            "kind": "note",
                                                                                            "label": "Depth boundary: method body not expanded.",
                                                                                            "source": null,
                                                                                            "target": null,
                                                                                            "reply": false,
                                                                                            "branches": []
                                                                                          },
                                                                                          {
                                                                                            "id": "parking-sequence:element-197",
                                                                                            "kind": "reply",
                                                                                            "label": "Garage.Results.ParkingResult (if call returns)",
                                                                                            "source": "parking-sequence:p_50a211325908",
                                                                                            "target": "parking-sequence:p_50a211325908",
                                                                                            "reply": true,
                                                                                            "branches": []
                                                                                          },
                                                                                          {
                                                                                            "id": "parking-sequence:element-199",
                                                                                            "kind": "reply",
                                                                                            "label": "DuplicateRegistration(vehicle)",
                                                                                            "source": "parking-sequence:p_50a211325908",
                                                                                            "target": "parking-sequence:p_50a211325908",
                                                                                            "reply": true,
                                                                                            "branches": []
                                                                                          }
                                                                                        ]
                                                                                      },
                                                                                      {
                                                                                        "label": "otherwise",
                                                                                        "items": [
                                                                                          {
                                                                                            "id": "parking-sequence:element-201",
                                                                                            "kind": "message",
                                                                                            "label": "Park(vehicle)",
                                                                                            "source": "parking-sequence:p_50a211325908",
                                                                                            "target": "parking-sequence:p_b323161f1e5c",
                                                                                            "reply": false,
                                                                                            "branches": []
                                                                                          },
                                                                                          {
                                                                                            "id": "parking-sequence:element-203",
                                                                                            "kind": "note",
                                                                                            "label": "Depth boundary: method body not expanded.",
                                                                                            "source": null,
                                                                                            "target": null,
                                                                                            "reply": false,
                                                                                            "branches": []
                                                                                          },
                                                                                          {
                                                                                            "id": "parking-sequence:element-204",
                                                                                            "kind": "reply",
                                                                                            "label": "complete (if call returns)",
                                                                                            "source": "parking-sequence:p_b323161f1e5c",
                                                                                            "target": "parking-sequence:p_50a211325908",
                                                                                            "reply": true,
                                                                                            "branches": []
                                                                                          },
                                                                                          {
                                                                                            "id": "parking-sequence:element-206",
                                                                                            "kind": "message",
                                                                                            "label": "Completed(spot, $\u0022Vehicle {vehicle.RegistrationNumber} parked at spot {spot}.\u0022)",
                                                                                            "source": "parking-sequence:p_50a211325908",
                                                                                            "target": "parking-sequence:p_426dd07c2e3a",
                                                                                            "reply": false,
                                                                                            "branches": []
                                                                                          },
                                                                                          {
                                                                                            "id": "parking-sequence:element-208",
                                                                                            "kind": "note",
                                                                                            "label": "Scope boundary: method body not expanded.",
                                                                                            "source": null,
                                                                                            "target": null,
                                                                                            "reply": false,
                                                                                            "branches": []
                                                                                          },
                                                                                          {
                                                                                            "id": "parking-sequence:element-209",
                                                                                            "kind": "reply",
                                                                                            "label": "Garage.Results.ParkingResult (if call returns)",
                                                                                            "source": "parking-sequence:p_426dd07c2e3a",
                                                                                            "target": "parking-sequence:p_50a211325908",
                                                                                            "reply": true,
                                                                                            "branches": []
                                                                                          },
                                                                                          {
                                                                                            "id": "parking-sequence:element-211",
                                                                                            "kind": "reply",
                                                                                            "label": "ParkingResult.Completed(spot, $\u0022Vehicle {vehicle.RegistrationNumber} parked at spot {spot}.\u0022)",
                                                                                            "source": "parking-sequence:p_50a211325908",
                                                                                            "target": "parking-sequence:p_50a211325908",
                                                                                            "reply": true,
                                                                                            "branches": []
                                                                                          }
                                                                                        ]
                                                                                      }
                                                                                    ]
                                                                                  }
                                                                                ]
                                                                              }
                                                                            ]
                                                                          }
                                                                        ]
                                                                      }
                                                                    ]
                                                                  }
                                                                ]
                                                              }
                                                            ]
                                                          },
                                                          {
                                                            "id": "parking-sequence:element-213",
                                                            "kind": "reply",
                                                            "label": "Park(vehicle, availableSpot.Number)",
                                                            "source": "parking-sequence:p_50a211325908",
                                                            "target": "parking-sequence:p_753cfee6aae6",
                                                            "reply": true,
                                                            "branches": []
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                ]
                                              }
                                            ]
                                          },
                                          {
                                            "id": "parking-sequence:element-215",
                                            "kind": "reply",
                                            "label": "garage.Park(vehicle)",
                                            "source": "parking-sequence:p_753cfee6aae6",
                                            "target": "parking-sequence:p_753cfee6aae6",
                                            "reply": true,
                                            "branches": []
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": "parking-sequence:element-217",
                    "kind": "reply",
                    "label": "ParkNewVehicle(vehicle, garage, spotNumber)",
                    "source": "parking-sequence:p_753cfee6aae6",
                    "target": "parking-sequence:Actor",
                    "reply": true,
                    "branches": []
                  }
                ]
              }
            ]
          }
        ]
      },
      "timing": null,
      "notes": [
        "Static source view; MaxDepth=3. Lifelines group calls by declared type, not runtime instance. Alternatives are possible source paths, not a recorded execution. Guards may be infeasible together. Property getters and implicit/external exceptions are not expanded. Framework calls and callbacks are boundaries. Caller continuation assumes the callee returns normally. Async scheduling is not modeled. Expand bodies in: Garage.Models, Garage.Services. Other calls remain visible as boundaries.",
        "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)",
        "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(garage)",
        "External/delegate call boundary (not expanded): Catalog.Vehicles.Contains(vehicle)",
        "Scope boundary: method body not expanded.",
        "External/delegate call boundary (not expanded): garages.Contains(garage)",
        "Scope boundary: method body not expanded.",
        "Callback boundary (not executed by this analysis): garage =\u003E garage.Vehicles.Any(parked =\u003E string.Equals(parked.RegistrationNumber, vehicle.RegistrationNumber, StringComparison.OrdinalIgnoreCase))",
        "External/delegate call boundary (not expanded): garages.Any(garage =\u003E garage.Vehicles.Any(parked =\u003E string.Equals(parked.RegistrationNumber, vehicle.RegistrationNumber, StringComparison.OrdinalIgnoreCase)))",
        "Scope boundary: method body not expanded.",
        "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)",
        "Scope boundary: method body not expanded.",
        "Scope boundary: method body not expanded.",
        "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)",
        "Scope boundary: method body not expanded.",
        "Callback boundary (not executed by this analysis): spot =\u003E string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase)",
        "External/delegate call boundary (not expanded): parkingSpots.Any(spot =\u003E string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase))",
        "Scope boundary: method body not expanded.",
        "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)",
        "Depth boundary: method body not expanded.",
        "Constructor/initializer boundary (not expanded): new InvalidOperationException(\u0022The spot must be empty and large enough for the vehicle.\u0022)",
        "Throws: new InvalidOperationException(\u0022The spot must be empty and large enough for the vehicle.\u0022); this path terminates here.",
        "Scope boundary: method body not expanded.",
        "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)",
        "Callback boundary (not executed by this analysis): spot =\u003E string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase)",
        "External/delegate call boundary (not expanded): parkingSpots.Any(spot =\u003E string.Equals(spot.Vehicle?.RegistrationNumber, registrationNumber, StringComparison.OrdinalIgnoreCase))",
        "Scope boundary: method body not expanded.",
        "Callback boundary (not executed by this analysis): spot =\u003E spot.Vehicle is null \u0026\u0026 spot.Fits(vehicle)",
        "External/delegate call boundary (not expanded): parkingSpots.FirstOrDefault(spot =\u003E spot.Vehicle is null \u0026\u0026 spot.Fits(vehicle))",
        "Scope boundary: method body not expanded.",
        "Scope boundary: method body not expanded.",
        "External/delegate call boundary (not expanded): ArgumentNullException.ThrowIfNull(vehicle)",
        "Scope boundary: method body not expanded.",
        "Scope boundary: method body not expanded.",
        "Depth boundary: method body not expanded.",
        "Scope boundary: method body not expanded.",
        "Depth boundary: method body not expanded.",
        "Depth boundary: method body not expanded.",
        "Depth boundary: method body not expanded.",
        "Scope boundary: method body not expanded."
      ]
    },
    "parking-spot-state": {
      "id": "parking-spot-state",
      "title": "Parking spot occupancy",
      "type": "state-machine",
      "nodes": [
        {
          "id": "parking-spot-state:initial",
          "name": "Start",
          "kind": "initial",
          "group": "",
          "members": [],
          "files": [
            "docs/uml/behavioral/state-machine/parking-spot-state.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-spot-state:Empty",
          "name": "Empty",
          "kind": "state",
          "group": "",
          "members": [
            "A null argument or a vehicle that does not fit causes Park to throw; occupancy is unchanged."
          ],
          "files": [
            "docs/uml/behavioral/state-machine/parking-spot-state.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-spot-state:Occupied",
          "name": "Occupied",
          "kind": "state",
          "group": "",
          "members": [
            "Park throws if the spot is already occupied. Garage.Remove calls Clear on a matched spot. No separate persisted lifecycle exists."
          ],
          "files": [
            "docs/uml/behavioral/state-machine/parking-spot-state.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        }
      ],
      "edges": [
        {
          "id": "parking-spot-state:edge-1",
          "source": "parking-spot-state:initial",
          "target": "parking-spot-state:Empty",
          "kind": "transition",
          "label": "Construct valid numbered spot"
        },
        {
          "id": "parking-spot-state:edge-2",
          "source": "parking-spot-state:Empty",
          "target": "parking-spot-state:Occupied",
          "kind": "transition",
          "label": "Park(vehicle) [non-null and Fits(vehicle)] / assign Vehicle"
        },
        {
          "id": "parking-spot-state:edge-3",
          "source": "parking-spot-state:Occupied",
          "target": "parking-spot-state:Empty",
          "kind": "transition",
          "label": "Clear() / Vehicle = null"
        },
        {
          "id": "parking-spot-state:edge-4",
          "source": "parking-spot-state:Empty",
          "target": "parking-spot-state:Empty",
          "kind": "transition",
          "label": "Clear() / Vehicle remains null"
        }
      ],
      "sequence": null,
      "timing": null,
      "notes": [
        "A null argument or a vehicle that does not fit causes Park to throw; occupancy is unchanged.",
        "Park throws if the spot is already occupied. Garage.Remove calls Clear on a matched spot. No separate persisted lifecycle exists."
      ]
    },
    "parking-timing": {
      "id": "parking-timing",
      "title": "Template: timing",
      "type": "timing",
      "nodes": [
        {
          "id": "parking-timing:Spot",
          "name": "Spot occupancy",
          "kind": "signal",
          "group": "",
          "members": [
            "0: Empty",
            "10: Occupied",
            "20: Empty"
          ],
          "files": [
            "docs/uml/interaction/timing/parking-timing.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": null
        },
        {
          "id": "parking-timing:element-1",
          "name": "Empty @ t=0",
          "kind": "timing-event",
          "group": "Spot occupancy",
          "members": [
            "State: Empty",
            "Time: 0",
            "Illustrative units; no measured duration is implied."
          ],
          "files": [
            "docs/uml/interaction/timing/parking-timing.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-timing:Spot"
        },
        {
          "id": "parking-timing:element-2",
          "name": "Occupied @ t=10",
          "kind": "timing-event",
          "group": "Spot occupancy",
          "members": [
            "State: Occupied",
            "Time: 10",
            "Illustrative units; no measured duration is implied."
          ],
          "files": [
            "docs/uml/interaction/timing/parking-timing.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-timing:Spot"
        },
        {
          "id": "parking-timing:element-3",
          "name": "Empty @ t=20",
          "kind": "timing-event",
          "group": "Spot occupancy",
          "members": [
            "State: Empty",
            "Time: 20",
            "Illustrative units; no measured duration is implied."
          ],
          "files": [
            "docs/uml/interaction/timing/parking-timing.puml"
          ],
          "declaration": "",
          "bases": [],
          "parent": "parking-timing:Spot"
        }
      ],
      "edges": [],
      "sequence": null,
      "timing": {
        "lanes": [
          {
            "id": "parking-timing:Spot",
            "name": "Spot occupancy",
            "samples": [
              {
                "id": "parking-timing:element-1",
                "time": 0,
                "state": "Empty"
              },
              {
                "id": "parking-timing:element-2",
                "time": 10,
                "state": "Occupied"
              },
              {
                "id": "parking-timing:element-3",
                "time": 20,
                "state": "Empty"
              }
            ]
          }
        ]
      },
      "notes": []
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          "bases": [],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          "bases": [],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          "bases": [],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          ],
          "parent": null
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
          "bases": [],
          "parent": null
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
          ],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          "bases": [],
          "parent": null
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
          ],
          "parent": null
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
      ],
      "sequence": null,
      "timing": null,
      "notes": null
    }
  }
};
