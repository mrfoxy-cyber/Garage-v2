using Garage.ConsoleApp.ConsoleFramework;
using Garage.Results;
using Garage.Search;
using Garage.Vehicles;
using VehicleGarage = Garage.Parking.Garage;

namespace Garage.ConsoleApp.GarageUI;

internal sealed class GarageActions
{
    private readonly VehicleGarage garage;
    private readonly CreatedVehicleStore createdVehicles;
    private readonly GarageProvider garageProvider;

    public GarageActions(
        VehicleGarage garage,
        CreatedVehicleStore createdVehicles,
        GarageProvider garageProvider)
    {
        this.garage = garage;
        this.createdVehicles = createdVehicles;
        this.garageProvider = garageProvider;
    }

    public void ParkVehicle()
    {
        if (garage.AvailableSpaces == 0)
        {
            Console.WriteLine("The garage is full.");
            ConsoleInput.Pause();
            return;
        }

        Vehicle? vehicle = SelectCreatedVehicle();

        if (vehicle is not null)
            Park(vehicle);
    }

    public void ParkVehicleAtSpot()
    {
        if (garage.AvailableSpaces == 0)
        {
            Console.WriteLine("The garage is full.");
            ConsoleInput.Pause();
            return;
        }

        ShowOpenSpots();

        int spot = ConsoleInput.ReadInt(
            "Choose parking spot: ",
            minimum: 1,
            maximum: garage.Capacity);

        if (garage.ParkedVehicles.Any(parked => parked.SpotNumber == spot))
        {
            Console.WriteLine($"Parking spot {spot} is occupied.");
            ConsoleInput.Pause();
            return;
        }

        Vehicle? vehicle = SelectCreatedVehicle(spot);

        if (vehicle is not null)
            Park(vehicle, spot);
    }

    public void ListParkedVehicles()
    {
        var parkedVehicles = garage.ParkedVehicles;

        if (parkedVehicles.Count == 0)
        {
            Console.WriteLine("The garage is empty.");
            ConsoleInput.Pause();
            return;
        }

        foreach (var parkedVehicle in parkedVehicles)
        {
            if (parkedVehicle.Vehicle is null)
            {
                continue;
            } 
            Console.WriteLine(
                $"Spot {parkedVehicle.SpotNumber}: " +
                $"{parkedVehicle.Vehicle.GetType().Name}, " +
                $"{parkedVehicle.Vehicle.RegistrationNumber}, " +
                $"{parkedVehicle.Vehicle.Manufacturer} " +
                $"{parkedVehicle.Vehicle.Model}");
        }

        ConsoleInput.Pause();
    }

    public void ListParkingSpots()
    {
        foreach (var spot in garage.SpotDetails)
        {
            string size = spot.Dimensions is null
                ? "no size limit"
                : $"{spot.Dimensions.LengthMeters} x " +
                  $"{spot.Dimensions.WidthMeters} x " +
                  $"{spot.Dimensions.HeightMeters} m";

            Console.WriteLine(
                $"Spot {spot.SpotNumber}: " +
                $"{(spot.IsOccupied ? "occupied" : "open")}, {size}");
        }

        ConsoleInput.Pause();
    }

    private void ShowOpenSpots()
    {
        Console.WriteLine("Open parking spots:");

        foreach (var spot in garage.SpotDetails.Where(spot => !spot.IsOccupied))
        {
            string size = spot.Dimensions is null
                ? "no size limit"
                : $"{spot.Dimensions.LengthMeters} x " +
                  $"{spot.Dimensions.WidthMeters} x " +
                  $"{spot.Dimensions.HeightMeters} m";

            Console.WriteLine($"{spot.SpotNumber}. {size}");
        }
    }

    public void ListVehicleTypes()
    {
        bool foundVehicle = false;

        foreach (var group in garage.VehiclesByType)
        {
            foundVehicle = true;
            Console.WriteLine(
                $"{group.VehicleType}: {group.Vehicles.Count}");
        }

        if (!foundVehicle)
        {
            Console.WriteLine("The garage is empty.");
        }

        ConsoleInput.Pause();
    }

    public void FindVehicleByRegistration()
    {
        string registrationNumber =
            ConsoleInput.ReadRequiredString(
                "Registration number: ");

        var match = garage
            .FindVehicleByRegistration(registrationNumber);

        if (match is null)
        {
            Console.WriteLine("No vehicle was found.");
        }
        else
        {
            VehicleActions.PrintVehicle(
                match.Value.SpotIndex + 1,
                match.Value.Vehicle);
        }

        ConsoleInput.Pause();
    }

    public void RemoveVehicle()
    {
        string registrationNumber =
            ConsoleInput.ReadRequiredString(
                "Registration number: ");

        GarageOperationResult result =
            garage.Remove(registrationNumber);

        Console.WriteLine(result.Message);
        ConsoleInput.Pause();
    }

    public void SearchVehicles()
    {
        SearchCriteriaCreator criteriaCreator = new();

        ConsoleMenu searchMenu = new(
            title: "Search vehicles",
            options:
            [
                new MenuOption(
                    () => $"Vehicle types: {criteriaCreator.VehicleTypesText}",
                    criteriaCreator.ChooseVehicleTypes),

                new MenuOption(
                    () => $"Color: {criteriaCreator.ColorText}",
                    criteriaCreator.ChooseColor),

                new MenuOption(
                    () => $"Number of wheels: {criteriaCreator.NumberOfWheelsText}",
                    criteriaCreator.ChooseNumberOfWheels),

                new MenuOption(
                    () => $"Number of engines: {criteriaCreator.NumberOfEnginesText}",
                    criteriaCreator.ChooseNumberOfEngines),

                new MenuOption(
                    () => $"Cylinder volume (cc): {criteriaCreator.CylinderVolumeText}",
                    criteriaCreator.ChooseCylinderVolume),

                new MenuOption(
                    () => $"Fuel type: {criteriaCreator.FuelTypeText}",
                    criteriaCreator.ChooseFuelType),

                new MenuOption(
                    () => $"Number of seats: {criteriaCreator.NumberOfSeatsText}",
                    criteriaCreator.ChooseNumberOfSeats),

                new MenuOption(
                    () => $"Length (m): {criteriaCreator.LengthText}",
                    criteriaCreator.ChooseLength),

                new MenuOption(
                    () => $"Registration number: {criteriaCreator.RegistrationNumberText}",
                    criteriaCreator.ChooseRegistrationNumber),

                new MenuOption(
                    () => $"Manufacturer: {criteriaCreator.ManufacturerText}",
                    criteriaCreator.ChooseManufacturer),

                new MenuOption(
                    () => $"Model: {criteriaCreator.ModelText}",
                    criteriaCreator.ChooseModel),

                new MenuOption(
                    () => $"Manufacturing year: {criteriaCreator.ManufacturingYearText}",
                    criteriaCreator.ChooseManufacturingYear),

                new MenuOption(
                    "Run search",
                    () => ShowSearchResults(criteriaCreator.Create())),

                new MenuOption(
                    "Clear all filters",
                    criteriaCreator.Clear)
            ]);

        searchMenu.Show();
    }

    private void ShowSearchResults(VehicleSearchCriteria criteria)
    {
        List<Vehicle> matches = garage.Search(criteria);

        Console.Clear();
        Console.WriteLine($"Found {matches.Count} vehicle(s).");
        Console.WriteLine();

        for (int index = 0; index < matches.Count; index++)
        {
            Vehicle vehicle = matches[index];
            var parkedVehicle = garage.FindVehicleByRegistration(
                vehicle.RegistrationNumber);

            if (parkedVehicle is not null)
            {
                VehicleActions.PrintVehicle(
                    parkedVehicle.Value.SpotIndex + 1,
                    vehicle);
            }
        }

        ConsoleInput.Pause();
    }

    private void Park(Vehicle vehicle)
    {
        GarageOperationResult result = garage.Park(vehicle);

        Console.WriteLine();
        Console.WriteLine(result.Message);
        ConsoleInput.Pause();
    }

    private void Park(Vehicle vehicle, int spot)
    {
        GarageOperationResult result = garage.Park(vehicle, spot);

        Console.WriteLine();
        Console.WriteLine(result.Message);
        ConsoleInput.Pause();
    }

    private Vehicle? SelectCreatedVehicle(int? spotNumber = null)
    {
        List<Vehicle> vehicles = GetParkableCreatedVehicles(spotNumber);

        if (vehicles.Count == 0)
        {
            Console.WriteLine(
                spotNumber is int requestedSpot
                    ? $"No available created vehicles fit in parking spot {requestedSpot}."
                    : "No available created vehicles fit in an open parking spot.");
            ConsoleInput.Pause();
            return null;
        }

        Console.WriteLine("Choose a created vehicle:");
        Console.WriteLine("0. Cancel");

        for (int index = 0; index < vehicles.Count; index++)
        {
            Vehicle vehicle = vehicles[index];
            Console.WriteLine(
                $"{index + 1}. {vehicle.GetType().Name}, " +
                $"{vehicle.Manufacturer} {vehicle.Model}, " +
                $"{vehicle.RegistrationNumber}");
        }

        int choice = ConsoleInput.ReadInt(
            "Choose: ", 0, vehicles.Count);

        return choice == 0
            ? null
            : vehicles[choice - 1];
    }

    internal List<Vehicle> GetParkableCreatedVehicles(int? spotNumber = null)
    {
        List<Vehicle> created = createdVehicles.Vehicles;
        List<global::Garage.Parking.Garage> garages = garageProvider();

        return created
            .Where(vehicle =>
                !VehicleParkingStatus.IsParked(vehicle, garages) &&
                (spotNumber is int requestedSpot
                    ? garage.AvailableSpotsFor(vehicle).Contains(requestedSpot)
                    : garage.AvailableSpotsFor(vehicle).Count > 0))
            .ToList();
    }

}
