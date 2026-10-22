using Garage.Results;
using Garage.Search;
using Garage.Vehicles;
using Garage.Vehicles.Interfaces;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;

namespace Garage.Parking;

public class Garage
{
    private readonly List<(int SpotNumber,Vehicle? Vehicle)> parkingSpots;
    public const int MaximumGarageCapacity = 100_000;

    public string GarageName { get; }

    public int Capacity { get; private  init; }

    public int OccupiedSpaces
    {
        get
        {

            return parkingSpots.Count(spot => spot.Vehicle is not null);
        }
    }

    public List<Vehicle> Vehicles
    {
        get
        {
            return parkingSpots
                .Select(spot => spot.Vehicle)
                .OfType<Vehicle>()
                .ToList();
        }
    }

    public int AvailableSpaces => Capacity - OccupiedSpaces;

    public List<(int SpotNumber, Vehicle? Vehicle)> ParkedVehicles
    {
        get
        {
            return parkingSpots.Where(spot => spot.Vehicle is not null).ToList();
        }
    }

    private bool RegistrationExists(
    string registrationNumber)
    {
        return parkingSpots.Any(spot => spot.Vehicle is not null && spot.Vehicle.RegistrationNumber.Equals(registrationNumber, StringComparison.OrdinalIgnoreCase));
    }

    public List<(string VehicleType, List<(int SpotNumber, Vehicle Vehicle)> Vehicles)> VehiclesByType
    {
        get
        {
            return parkingSpots
                .Where(spot => spot.Vehicle is not null)
                .GroupBy(spot => spot.Vehicle!.GetType().Name)
                .Select(group =>
                            (
                                VehicleType: group.Key,
                                Vehicles: group
                                    .Select
                                    (
                                        spot => 
                                            (
                                            SpotNumber: spot.SpotNumber,
                                            Vehicle: spot.Vehicle!
                                            )
                                    ).ToList()
                            )
                        ).ToList();

        }
    }

    public (int SpotIndex, Vehicle Vehicle)? FindVehicleByRegistration( string registrationNumber)
    {
        int index = parkingSpots.FindIndex(
                                    spot => spot.Vehicle is not null 
                                    && spot.Vehicle.RegistrationNumber
                                    .Equals(registrationNumber, StringComparison.OrdinalIgnoreCase));

        if (index != -1)
        {
            var spot = parkingSpots[index];
            return (index, parkingSpots[index].Vehicle!);
        }   else 
            return null;
    }

    public Garage(
        string garageName,
        int capacity)
        : this(
            garageName: garageName,
            capacity: capacity,
            initialVehicles: [])
    {
    }

    public Garage(
        string garageName,
        List<Vehicle> vehicles)
        : this(
            garageName: garageName,
            capacity: vehicles?.Count ??
                throw new ArgumentNullException(nameof(vehicles)),
            initialVehicles: vehicles)
    {
    }

    public Garage(
    string garageName,
    int capacity,
    List<Vehicle> initialVehicles)
    {
        if (string.IsNullOrWhiteSpace(garageName))
        {
            throw new ArgumentException(
                "Garage name must not be empty.",
                nameof(garageName));
        }

        if (capacity < 1 ||
            capacity > MaximumGarageCapacity)
        {
            throw new ArgumentOutOfRangeException(
                nameof(capacity),
                $"Capacity must be between 1 and " +
                $"{MaximumGarageCapacity}.");
        }

        List<Vehicle> startingVehicles =
            initialVehicles ?? [];

        if (startingVehicles.Count > capacity)
        {
            throw new ArgumentException(
                "Too many initial vehicles.",
                nameof(initialVehicles));
        }

        if(startingVehicles.Any(vehicle => vehicle is null))
            throw new ArgumentException(
                    "Inital Vehicles should not contain null vehicles",
                    nameof(initialVehicles));


        if (startingVehicles
            .OfType<Vehicle>()
            .GroupBy(
                vehicle => vehicle.RegistrationNumber,
                            StringComparer.OrdinalIgnoreCase)
            .Any(group => group.Count() > 1)
            )
        {
            throw new ArgumentException(
                "Initial vehicles contain duplicate registration numbers.",
                nameof(initialVehicles));
        }

        this.GarageName = garageName;
        this.Capacity = capacity;
        this.parkingSpots = new List<(int SpotNumber, Vehicle? Vehicle)>();

        for (int i = 0; i < capacity; i++)
        {
            parkingSpots.Add((SpotNumber: i + 1, Vehicle: null));
        }

        for (int i = 0; i < startingVehicles.Count; i++)
        {
            parkingSpots[i] = (i + 1, startingVehicles[i]);
        }
    }

    public GarageOperationResult Park(Vehicle vehicle)
    {
        ArgumentNullException.ThrowIfNull(vehicle);

        int availableSpotIndex = NextOpenSpace(this.parkingSpots);

        if (availableSpotIndex == -1)
        {
            return new GarageOperationResult(
                false,
                null,
                "The garage is full.");
        }

        return Park(vehicle, availableSpotIndex+1);
    }

    public GarageOperationResult Park(Vehicle vehicle, int spot)
    {
        ArgumentNullException.ThrowIfNull(vehicle);

        if (spot > Capacity|| spot < 1)
            return new GarageOperationResult
                (
                    false,
                    null,
                    $"I am sorry, but there doesnt exists {spot}"
                );

        if (parkingSpots[spot-1].Vehicle is not null)
            return new GarageOperationResult
                    (
                        false,
                        null,
                        $"I am sorry, The spot {spot} is occupied"
                    );

        if (RegistrationExists(vehicle.RegistrationNumber))
        {
            return new GarageOperationResult(
                false,
                null,
                $"A vehicle with registration number " +
                $"{vehicle.RegistrationNumber} is already parked.");
        }

        parkingSpots[spot - 1] = (SpotNumber: spot, Vehicle: vehicle);
        return new GarageOperationResult(
            true,
            spot-1,
            $"Vehcile {vehicle.RegistrationNumber} parked at spot {spot}"
            );
    }

    private static int NextOpenSpace(List<(int Spot,Vehicle? Vehicle)> parkingSpots)
    {
        return parkingSpots.FindIndex(spot => spot.Vehicle is null);
    }

    public GarageOperationResult Remove(string registrationNumber)
    {
        var match = FindVehicleByRegistration(
            registrationNumber);

        if (match is null)
        {
            return new GarageOperationResult(
                false,
                null,
                "We could not find your vehicle.");
        }

        int index = match.Value.SpotIndex;
        parkingSpots[index] = (parkingSpots[index].SpotNumber, null);

        return new GarageOperationResult(
            true,
            match.Value.SpotIndex,
            $"Vehicle {match.Value.Vehicle.RegistrationNumber} was removed " +
            $"from parking spot {match.Value.SpotIndex + 1}.");
    }

    public GarageOperationResult RemoveAtSpot(int spotNumber)
    {
        if (spotNumber < 1 || spotNumber > Capacity)
        {
            return new GarageOperationResult
            (
                false,
                null,
                $"Parking spot must be between 1 and {Capacity}."
            );
        }

        int spotIndex = spotNumber - 1;

        Vehicle? vehicle = parkingSpots[spotIndex].Vehicle;

        if(vehicle is null)
        {
            return new GarageOperationResult(
                false,
                null,
                 $"Parking spot {spotNumber} is already empty."
                );
        }

        return Remove(vehicle.RegistrationNumber);
    }


    // Arrays have a fixed size, so the first loop counts the matches.
    // This lets us create an array of the exact required size.
    // The second loop then fills that array with the matching vehicles.
    public List<Vehicle> Search(
    VehicleSearchCriteria criteria)
    {
        List<Vehicle> matches = [];

        int matchIndex = 0;

        for (int index = 0;
             index < parkingSpots.Count;
             index++)
        {
            if (parkingSpots[index].Vehicle is Vehicle vehicle &&
                MatchesCriteria(vehicle, criteria))
            {
                matches.Add(vehicle);
                matchIndex++;
            }
        }

        return matches;
    }

    private static bool MatchesCriteria(
    Vehicle vehicle,
    VehicleSearchCriteria criteria)
    {
        if (criteria.RegistrationNumber is not null &&
            !vehicle.RegistrationNumber.Equals(
                criteria.RegistrationNumber,
                StringComparison.OrdinalIgnoreCase))
        {
            return false;
        }

        if (criteria.Manufacturer is not null &&
            !vehicle.Manufacturer.Contains(
                criteria.Manufacturer,
                StringComparison.OrdinalIgnoreCase))
        {
            return false;
        }

        if (criteria.Model is not null &&
            !vehicle.Model.Contains(
                criteria.Model,
                StringComparison.OrdinalIgnoreCase))
        {
            return false;
        }

        if (criteria.ManufacturingYear is not null &&
            vehicle.ManufacturingYear !=
            criteria.ManufacturingYear)
        {
            return false;
        }

        if (criteria.Color is not null &&
            vehicle.Color != criteria.Color)
        {
            return false;
        }

        if (criteria.VehicleTypes.Count > 0)
        {
            bool matchesVehicleType = false;

            for (int index = 0;
                 index < criteria.VehicleTypes.Count;
                 index++)
            {
                if (criteria.VehicleTypes[index]
                    .IsInstanceOfType(vehicle))
                {
                    matchesVehicleType = true;
                    break;
                }
            }

            if (!matchesVehicleType)
            {
                return false;
            }
        }

        if (criteria.NumberOfWheels is not null)
        {
            if (vehicle is not IHasWheels vehicleWithWheels)
            {
                return false;
            }

            if (vehicleWithWheels.NumberOfWheels !=
                criteria.NumberOfWheels)
            {
                return false;
            }
        }

        var engines = vehicle.SpecificationDetails.Engines;

        if (criteria.NumberOfEngines is not null &&
            engines.Count != criteria.NumberOfEngines)
        {
            return false;
        }

        if (criteria.FuelType is not null)
        {
            bool hasMatchingFuelType = false;

            for (int index = 0; index < engines.Count; index++)
            {
                if (engines[index].FuelType == criteria.FuelType)
                {
                    hasMatchingFuelType = true;
                    break;
                }
            }

            if (!hasMatchingFuelType)
            {
                return false;
            }
        }

        if (criteria.CylinderVolumeCc is not null)
        {
            bool hasMatchingCylinderVolume = false;

            for (int index = 0; index < engines.Count; index++)
            {
                double? cylinderVolume =
                    engines[index].CylinderVolumeCc;

                if (cylinderVolume is not null &&
                    Math.Abs(
                        cylinderVolume.Value -
                        criteria.CylinderVolumeCc.Value) < 0.01)
                {
                    hasMatchingCylinderVolume = true;
                    break;
                }
            }

            if (!hasMatchingCylinderVolume)
            {
                return false;
            }
        }

        if (criteria.NumberOfSeats is not null)
        {
            if (vehicle is not IHasSeats vehicleWithSeats ||
                vehicleWithSeats.NumberOfSeats !=
                criteria.NumberOfSeats)
            {
                return false;
            }
        }

        if (criteria.LengthMeters is not null &&
            Math.Abs(
                vehicle.SpecificationDetails.Dimensions.LengthMeters -
                criteria.LengthMeters.Value) >= 0.01)
        {
            return false;
        }

        return true;
    }
}
