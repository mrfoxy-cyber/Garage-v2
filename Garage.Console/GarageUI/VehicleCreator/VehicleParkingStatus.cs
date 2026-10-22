using Garage.Vehicles;
using VehicleGarage = Garage.Parking.Garage;

namespace Garage.ConsoleApp.GarageUI;

internal static class VehicleParkingStatus
{
 
       //Had a bug here previously
    public static bool IsParked(
        Vehicle vehicle,
        List<VehicleGarage> garages)
    {
        return garages.Any(garage =>
            garage.Vehicles.Any(parked =>
                ReferenceEquals(parked, vehicle)));
    }
}
