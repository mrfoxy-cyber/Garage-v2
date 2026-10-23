using Garage.ConsoleApp.ConsoleFramework;
using Garage.Parking;
using Garage.Vehicles;
using VehicleGarage = Garage.Parking.Garage;

namespace Garage.ConsoleApp.GarageUI;

internal sealed class GarageApplication
{
    private List<VehicleGarage> garages;
    private readonly CreatedVehicleStore createdVehicles;
    private readonly VehicleCreator vehicleCreator;

    public List<VehicleGarage> Garages =>
        [.. garages];

    public GarageApplication(
        List<VehicleGarage> initialGarages,
        List<Vehicle> initialCreatedVehicles)
    {
        garages = [.. initialGarages];
        createdVehicles = new CreatedVehicleStore(
            initialCreatedVehicles);
        vehicleCreator = new VehicleCreator(
            createdVehicles,
            GetGarages);
    }

    private void AddGarage(
        VehicleGarage garage)
    {
        garages = [.. garages, garage];
    }

    private List<VehicleGarage> GetGarages()
    {
        return [.. garages];
    }

    public void Run()
    {
        ConsoleMenu startMenu = new(
            title: "Garage system",
            options:
            [
                new MenuOption(
                    "Create and list vehicles",
                    vehicleCreator.ShowMenu),

                new MenuOption(
                    "Choose garage",
                    ChooseGarage),

                new MenuOption(
                    "Create garage",
                    CreateGarage)
            ],
            backOptionText: "Exit");

        startMenu.Show();
    }

    private void ChooseGarage()
    {
        if (garages.Count == 0)
        {
            Console.WriteLine("There are no garages yet.");
            ConsoleInput.Pause();
            return;
        }

        List<MenuOption> garageOptions = [];

        for(int i=0; i < garages.Count; i++)
        {
            VehicleGarage selectedGarage = garages[i];

            var menuOption= new MenuOption(
                () => $"{selectedGarage.GarageName} ({selectedGarage.OccupiedSpaces}/{selectedGarage.Capacity})",
                () => OpenGarage(selectedGarage)
                );

            garageOptions.Add(menuOption);
        }



        ConsoleMenu garageMenu = new(
            title: "Choose garage",
            options: garageOptions);

        garageMenu.Show();
    }

    private void CreateGarage()
    {
        string name = ConsoleInput.ReadRequiredString(
            "Garage name: ");

        bool nameAlreadyExists = false;

        for (int i = 0; i < garages.Count; i++)
        {
            if (garages[i].GarageName.Equals(
                name,
                StringComparison.OrdinalIgnoreCase))
            {
                nameAlreadyExists = true;
                break;
            }
        }

        if (nameAlreadyExists)
        {
            Console.WriteLine(
                "A garage with that name already exists.");
            ConsoleInput.Pause();
            return;
        }

        int capacity = ConsoleInput.ReadInt(
            "Number of parking spots: ",
            minimum: 1,
            maximum: VehicleGarage.MaximumGarageCapacity);

        VehicleGarage garage = new(
            garageName: name,
            capacity: capacity);

        AddGarage(garage);
        OpenGarage(garage);
    }

    private void OpenGarage(VehicleGarage garage)
    {
        GarageActions actions = new(
            garage,
            createdVehicles,
            GetGarages);

        ConsoleMenu vehicleMenu = new(
            title: garage.GarageName,
            options:
            [
                new MenuOption(
                    "Create and park vehicle",
                    () => vehicleCreator.ShowMenuForGarage(garage)),

                new MenuOption(
                    "Create and park vehicle at a specific spot",
                    () => vehicleCreator.ShowMenuForGarageAtSpot(garage)),

                new MenuOption(
                    "Park a created vehicle",
                    actions.ParkVehicle),

                new MenuOption(
                    "Park a created vehicle to a specific spot",
                    actions.ParkVehicleAtSpot),

                new MenuOption(
                    "List all parked vehicles",
                    actions.ListParkedVehicles),

                new MenuOption(
                    "List vehicle types",
                    actions.ListVehicleTypes),

                new MenuOption(
                    "Find vehicle by registration number",
                    actions.FindVehicleByRegistration),

                new MenuOption(
                    "Search vehicles",
                    actions.SearchVehicles),

                new MenuOption(
                    "Remove vehicle",
                    actions.RemoveVehicle)
            ],
            backOptionText: "Back");

        vehicleMenu.Show();
    }
}
