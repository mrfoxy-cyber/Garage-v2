using Garage.Vehicles;
using Garage.Vehicles.Components;
namespace Garage.Parking;

internal sealed class ParkingSpot
{
    public int Number { get; init; }
    // Legacy garages have no size limit until spot dimensions are configured.
    public Dimensions? Dimensions { get; init; }
    public Vehicle? Vehicle { get; set; }
}
