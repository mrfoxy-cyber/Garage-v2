using Garage.Vehicles;

namespace Garage.ConsoleApp.GarageUI;

internal sealed class CreatedVehicleStore
{
    private List<Vehicle> vehicles;

    public CreatedVehicleStore(List<Vehicle>? initialVehicles = null)
    {
        vehicles = initialVehicles is null
            ? []
            : [.. initialVehicles];
    }

    public Vehicle[] Vehicles => [.. vehicles];

    public void Add(Vehicle vehicle)
    {
        vehicles.Add(vehicle);
    }

    public bool Remove(Vehicle vehicle)
    {
        bool success = vehicles.Remove(vehicle);

        return success;
    }
}
