using Garage.Engines;

namespace Garage.ConsoleApp.GarageUI;

internal sealed class EngineDraft
{
    public EngineKind? Kind { get; set; }
    public string? SerialNumber { get; set; }
    public string? Model { get; set; }
    public FuelType? FuelType { get; set; }
    public int? HorsePower { get; set; }
    public int? DisplacementCc { get; set; }
    public int? CylinderCount { get; set; }
    public int? RotorCount { get; set; }
    public double? PowerKw { get; set; }
    public double? Voltage { get; set; }
    public double? BoilerPressureBar { get; set; }
    public double? ThrustKn { get; set; }
    public double? BypassRatio { get; set; }
    public int? ShaftHorsePower { get; set; }

    public string SerialNumberText => SerialNumber ?? "Not set";
    public string ModelText => Model ?? "Not set";
    public string FuelTypeText => FuelType?.ToString() ?? "Not set";
    public string HorsePowerText => HorsePower?.ToString() ?? "Not set";
    public string DisplacementText => DisplacementCc?.ToString() ?? "Not set";
    public string CylinderCountText => CylinderCount?.ToString() ?? "Not set";
    public string RotorCountText => RotorCount?.ToString() ?? "Not set";
    public string PowerText => PowerKw?.ToString() ?? "Not set";
    public string VoltageText => Voltage?.ToString() ?? "Not set";
    public string BoilerPressureText => BoilerPressureBar?.ToString() ?? "Not set";
    public string ThrustText => ThrustKn?.ToString() ?? "Not set";
    public string BypassRatioText => BypassRatio?.ToString() ?? "Not set";
    public string ShaftHorsePowerText => ShaftHorsePower?.ToString() ?? "Not set";

    public List<string> GetMissingFields()
    {
        List<string> missing = [];

        if (Kind is null)
            missing.Add( "engine type");

        if (string.IsNullOrWhiteSpace(SerialNumber))
            missing.Add("serial number");

        if (string.IsNullOrWhiteSpace(Model))
            missing.Add("model");

        switch (Kind)
        {
            case EngineKind.Inline:
            case EngineKind.VEngine:
            case EngineKind.Flat:
                RequireFuel(ref missing);
                RequireHorsePower(ref missing);
                RequireDisplacement(ref missing);
                if (CylinderCount is null)
                    AddMissingField(ref missing, "cylinder count");
                break;

            case EngineKind.Rotary:
                RequireFuel(ref missing);
                RequireHorsePower(ref missing);
                RequireDisplacement(ref missing);
                if (RotorCount is null)
                    AddMissingField(ref missing, "rotor count");
                break;

            case EngineKind.ElectricMotor:
                if (PowerKw is null)
                    AddMissingField(ref missing, "power");
                if (Voltage is null)
                    AddMissingField(ref missing, "voltage");
                break;

            case EngineKind.Steam:
                RequireFuel(ref missing);
                RequireHorsePower(ref missing);
                if (BoilerPressureBar is null)
                    AddMissingField(ref missing, "boiler pressure");
                break;

            case EngineKind.Turbojet:
                RequireTurbineFields(ref missing);
                break;

            case EngineKind.Turbofan:
                RequireTurbineFields(ref missing);
                if (BypassRatio is null)
                    AddMissingField(ref missing, "bypass ratio");
                break;

            case EngineKind.Turboprop:
            case EngineKind.Turboshaft:
                RequireTurbineFields(ref missing);
                if (ShaftHorsePower is null)
                    AddMissingField(ref missing, "shaft horsepower");
                break;
        }

        return missing;
    }

    public void Clear()
    {
        Kind = null;
        SerialNumber = null;
        Model = null;
        FuelType = null;
        HorsePower = null;
        DisplacementCc = null;
        CylinderCount = null;
        RotorCount = null;
        PowerKw = null;
        Voltage = null;
        BoilerPressureBar = null;
        ThrustKn = null;
        BypassRatio = null;
        ShaftHorsePower = null;
    }

    private void RequireFuel(ref List<string> missing)
    {
        if (FuelType is null)
            missing.Add("fuel type");
    }

    private void RequireHorsePower(ref List<string> missing)
    {
        if (HorsePower is null)
            missing.Add( "horsepower");
    }

    private void RequireDisplacement(ref List<string> missing)
    {
        if (DisplacementCc is null)
            missing.Add("displacement");
    }

    private void RequireTurbineFields(ref List<string> missing)
    {
        RequireFuel(ref missing);
        if (ThrustKn is null)
            missing.Add( "thrust");
    }

    private static void AddMissingField(
        ref List<string> missing,
        string fieldName)
    {
        missing.Add(fieldName);
    }
}
