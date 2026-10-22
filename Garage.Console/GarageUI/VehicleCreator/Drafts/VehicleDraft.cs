using Garage.Engines;
using Garage.Vehicles.Types;

namespace Garage.ConsoleApp.GarageUI;

internal abstract class VehicleDraft
{
    public string? RegistrationNumber { get; set; }
    public string? Manufacturer { get; set; }
    public string? Model { get; set; }
    public int? ManufacturingYear { get; set; }
    public VehicleColor? Color { get; set; }
    public double? WeightKg { get; set; }
    public double? LengthMeters { get; set; }
    public double? WidthMeters { get; set; }
    public double? HeightMeters { get; set; }

    private List<Engine> engines = [];

    public List<Engine> Engines => [.. engines];

    public string RegistrationText =>
        RegistrationNumber ?? "Not set";

    public string ManufacturerText =>
        Manufacturer ?? "Not set";

    public string ModelText =>
        Model ?? "Not set";

    public string YearText =>
        ManufacturingYear?.ToString() ?? "Not set";

    public string ColorText =>
        Color?.ToString() ?? "Not set";

    public string WeightText =>
        WeightKg is null ? "Not set" : $"{WeightKg} kg";

    public string DimensionsText =>
        LengthMeters is null ||
        WidthMeters is null ||
        HeightMeters is null
            ? "Not set"
            : $"{LengthMeters} x {WidthMeters} x {HeightMeters} m";

    public string EnginesText => engines.Count == 0
        ? "No engine"
        : engines.Count == 1
            ? "1 engine"
            : $"{engines.Count} engines";

    public void AddEngines(List<Engine> newEngines)
    {
        engines.AddRange(newEngines);
    }

    public bool RemoveEngine(Engine engine)
    {
        bool success = engines.Remove(engine);

        return success;
    }

    public virtual List<string> GetMissingFields()
    {
        List<string> missing = [];

        if (string.IsNullOrWhiteSpace(RegistrationNumber))
            missing.Add("registration number");

        if (string.IsNullOrWhiteSpace(Manufacturer))
            missing.Add("manufacturer");

        if (string.IsNullOrWhiteSpace(Model))
            missing.Add("model");

        if (ManufacturingYear is null)
            missing.Add("manufacturing year");

        if (Color is null)
            missing.Add("color");

        if (WeightKg is null)
            missing.Add( "weight");

        if (LengthMeters is null ||
            WidthMeters is null ||
            HeightMeters is null)
        {
            missing.Add("dimensions");
        }

        return missing;
    }

    public virtual void Clear()
    {
        RegistrationNumber = null;
        Manufacturer = null;
        Model = null;
        ManufacturingYear = null;
        Color = null;
        WeightKg = null;
        LengthMeters = null;
        WidthMeters = null;
        HeightMeters = null;
        engines = [];
    }
}
