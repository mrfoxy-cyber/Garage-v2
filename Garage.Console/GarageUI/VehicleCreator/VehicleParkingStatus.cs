using Garage.Vehicles;
using VehicleGarage = Garage.Parking.Garage;

namespace Garage.ConsoleApp.GarageUI;

internal static class VehicleParkingStatus
{
    public static bool IsParked(
        Vehicle vehicle,
        List<VehicleGarage> garages)
    {
        for (int index = 0; index < garages.Count; index++)
        {
            if (garages[index].FindVehicleByRegistration(
                vehicle.RegistrationNumber) is not null)
            {
                return true;
            }
        }

        return false;
    }
}
