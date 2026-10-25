using System.Reflection;
using System.Runtime.ExceptionServices;
using Garage.Engines;
using Garage.Factories;
using Garage.Vehicles;

namespace Garage.Terminal.Forms;

/// <summary>Adapts form values to the existing domain factories; validation stays in Vehicle.</summary>
internal sealed record FactoryDefinition(string Name, Type Factory, string MethodName)
{
    private MethodInfo Method => Factory.GetMethod(MethodName)!;

    public IReadOnlyList<FieldDefinition> Fields => Method.GetParameters()
        .Where(parameter => parameter.ParameterType != typeof(List<Engine>))
        .Select(parameter => new FieldDefinition(parameter.Name!, FieldDefinition.FriendlyLabel(parameter.Name!),
            parameter.ParameterType, Initial: Default(parameter.Name!, parameter.ParameterType))).ToArray();

    private static string Default(string name, Type type) => name switch
    {
        "countryCode" => "SWE",
        "manufacturingYear" => DateTime.Now.Year.ToString(),
        "cabinPassengerSeatCount" or "cabinCrewSeatCount" => "0",
        _ => type == typeof(bool) ? "No" : type.IsEnum ? Enum.GetNames(type).First(n => n != "Unspecified") : ""
    };

    public object Create(IReadOnlyDictionary<string, object?> values, List<Engine>? engines = null)
    {
        object?[] arguments = Method.GetParameters().Select(parameter =>
            parameter.ParameterType == typeof(List<Engine>) ? (object)(engines ?? []) : values[parameter.Name!]).ToArray();
        try { return Method.Invoke(null, arguments)!; }
        catch (TargetInvocationException exception) when (exception.InnerException is not null)
        {
            ExceptionDispatchInfo.Capture(exception.InnerException).Throw();
            throw;
        }
    }

    public static IReadOnlyList<FactoryDefinition> Vehicles { get; } =
    [
        new("Car", typeof(CarFactory), "CreateCar"),
        new("Motorcycle", typeof(MotorcycleFactory), "CreateMotorcycle"),
        new("Airplane", typeof(AirplaneFactory), "CreateAirplane"),
        new("Bus", typeof(BusFactory), "CreateBus"),
        new("Boat", typeof(BoatFactory), "CreateBoat"),
        new("Truck", typeof(TruckFactory), "CreateTruck")
    ];

    public static IReadOnlyList<FactoryDefinition> Engines { get; } = new[]
    {
        "Inline", "V", "Flat", "Rotary", "ElectricMotor", "Steam", "Turbojet", "Turbofan", "Turboprop", "Turboshaft"
    }.Select(name => new FactoryDefinition(FieldDefinition.Humanize(name), typeof(EngineFactory), $"Create{name}Engine"))
     .Select(definition => definition.MethodName == "CreateElectricMotorEngine"
         ? definition with { MethodName = "CreateElectricMotor" } : definition).ToArray();
}
