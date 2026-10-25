using System.Collections.ObjectModel;
using System.Data;
using Garage.Diagnostics;
using Garage.Results;
using Garage.Services;
using Garage.Terminal.Forms;
using Garage.Vehicles;
using Terminal.Gui.App;
using Terminal.Gui.Drawing;
using Terminal.Gui.Input;
using Terminal.Gui.ViewBase;
using Terminal.Gui.Views;
using VehicleGarage = Garage.Models.Garage;

namespace Garage.Terminal.Presentation;

internal sealed class GarageWorkspace : Window
{
    private readonly IApplication application;
    private readonly DashboardState state;
    private readonly Dialogs dialogs;
    private readonly Workflows workflows;
    private readonly Label stats;
    private readonly Label details;
    private readonly Label status;
    private readonly FrameView tableFrame;
    private readonly TableView table;
    private readonly ListView navigation;
    private readonly Button garagePicker;
    private readonly Button park;
    private readonly Button remove;
    private readonly Button filters;
    private readonly Button spots;
    private readonly TextField query;
    private IReadOnlyList<Vehicle> displayedVehicles = [];
    private IReadOnlyList<VehicleGarage> displayedGarages = [];
    private bool refreshing;
    private IReadOnlyList<View> focusOrder = [];

    public GarageWorkspace(IApplication application, GarageService service)
    {
        this.application = application;
        state = new DashboardState(service);
        dialogs = new Dialogs(application);
        workflows = new Workflows(dialogs, service);
        Title = "Garage Workspace";
        Width = Dim.Fill(); Height = Dim.Fill(); BorderStyle = LineStyle.None;
        Theme.Apply(this);

        Add(Theme.Apply(new Label { Text = "G / GARAGE", X = 2, Y = 1, Width = 20 }, Theme.Accent));
        garagePicker = Theme.Button("Choose garage", () => Guard(ChooseGarage));
        garagePicker.X = 23; garagePicker.Y = 0; garagePicker.Width = Dim.Fill(12);
        Button quit = Theme.Button("_Quit", Quit);
        quit.X = Pos.AnchorEnd(10); quit.Y = 0;
        stats = Theme.Apply(new Label { X = 23, Y = 2, Width = Dim.Fill(2), Height = 2 }, Theme.Muted);
        Add(garagePicker, quit, stats);

        FrameView sidebar = Theme.Apply(new FrameView
        {
            X = 1, Y = 4, Width = 21, Height = Dim.Fill(2), Title = "Workspace", BorderStyle = LineStyle.Rounded, CanFocus = true
        });
        navigation = Theme.Apply(new ListView { X = 1, Y = 1, Width = Dim.Fill(1), Height = 6, CanFocus = true });
        navigation.SetSource(new ObservableCollection<string>(["Overview", "Vehicle catalog", "Parking", "Search garage"]));
        navigation.SelectedItem = 0;
        navigation.RowRender += (_, row) => row.RowAttribute = row.Row == navigation.SelectedItem ? Theme.Surface.Focus : Theme.Surface.Normal;
        navigation.ValueChanged += (_, _) =>
        {
            state.Page = (WorkspacePage)(navigation.SelectedItem ?? 0);
            RefreshRows();
        };
        sidebar.Add(navigation, Theme.Apply(new Label
        {
            Text = "YOUR GARAGES", X = 1, Y = 8, Width = Dim.Fill(1), Height = 1
        }, Theme.Muted));
        Button createGarage = Theme.Button("+ _Garage", () => Guard(() => GarageResult(workflows.CreateGarage())));
        createGarage.X = 1; createGarage.Y = Pos.AnchorEnd(7); createGarage.Width = Dim.Fill(1);
        Button importGarage = Theme.Button("_Import garage", () => Guard(() => GarageResult(workflows.ImportGarage())));
        importGarage.X = 1; importGarage.Y = Pos.AnchorEnd(4); importGarage.Width = Dim.Fill(1);
        Button help = Theme.Button("_Help / F1", Help);
        help.X = 1; help.Y = Pos.AnchorEnd(2); help.Width = Dim.Fill(1);
        sidebar.Add(createGarage, importGarage, help);
        Add(sidebar);

        View content = Theme.Apply(new View { X = 23, Y = 4, Width = Dim.Fill(1), Height = Dim.Fill(2), CanFocus = true });
        content.Add(Theme.Apply(new Label { Text = "Find", X = 0, Y = 0, Width = 5 }, Theme.Muted));
        query = Theme.Apply(new TextField { X = 6, Y = 0, Width = Dim.Fill(22), CanFocus = true }, Theme.Input);
        query.ValueChanged += (_, _) => { state.QuickFilter = query.Text; RefreshRows(); };
        filters = Theme.Button("_Filters / F3", () => Guard(Search));
        filters.X = Pos.AnchorEnd(20); filters.Y = 0;
        content.Add(query, filters);

        tableFrame = Theme.Apply(new FrameView
        {
            X = 0, Y = 2, Width = Dim.Fill(), Height = Dim.Fill(11),
            Title = "Overview", BorderStyle = LineStyle.Rounded, CanFocus = true
        });
        table = Theme.Apply(new TableView
        {
            X = 0, Y = 0, Width = Dim.Fill(), Height = Dim.Fill(),
            FullRowSelect = true, MultiSelect = false, MaxCellWidth = 28, CanFocus = true,
            Style = new TableStyle
            {
                ShowHorizontalHeaderOverline = false, ShowHorizontalHeaderUnderline = true,
                ShowVerticalCellLines = false, ShowVerticalHeaderLines = false, ExpandLastColumn = true
            }
        });
        table.ValueChanged += (_, _) => { if (!refreshing) UpdateDetails(); };
        table.Accepted += (_, e) => { e.Handled = true; Guard(OpenDetails); };
        tableFrame.Add(table);
        content.Add(tableFrame);

        FrameView detailFrame = Theme.Apply(new FrameView
        {
            X = 0, Y = Pos.AnchorEnd(10), Width = Dim.Fill(), Height = 5,
            Title = "At a glance", BorderStyle = LineStyle.Rounded
        });
        details = Theme.Apply(new Label { X = 1, Y = 0, Width = Dim.Fill(1), Height = Dim.Fill() }, Theme.Muted);
        detailFrame.Add(details);
        content.Add(detailFrame);
        void ArrangeForHeight(int height)
        {
            bool compact = height > 0 && height < 30;
            if (detailFrame.Visible == compact)
            {
                detailFrame.Visible = !compact;
                tableFrame.Height = Dim.Fill(compact ? 5 : 11);
            }
        }
        ViewportChanged += (_, _) => ArrangeForHeight(Viewport.Height);
        ArrangeForHeight(application.Screen.Height);

        View actions = Theme.Apply(new View { X = 0, Y = Pos.AnchorEnd(4), Width = Dim.Fill(), Height = 4, CanFocus = true });
        Button create = Theme.Button("+ _Vehicle / F2", () => Guard(() => CreateVehicle(false)));
        create.X = 0; create.Y = 0;
        Button import = Theme.Button("_Import vehicle", () => Guard(ImportVehicle));
        import.X = Pos.Right(create) + 1; import.Y = 0;
        park = Theme.Button("_Park", () => Guard(ParkVehicle));
        park.X = Pos.Right(import) + 1; park.Y = 0;
        remove = Theme.Button("_Remove", () => Guard(RemoveVehicle));
        remove.X = 0; remove.Y = 2;
        Button inspect = Theme.Button("_Details", () => Guard(OpenDetails));
        inspect.X = Pos.Right(remove) + 1; inspect.Y = 2;
        spots = Theme.Button("_Spots / create & park", () => Guard(ParkingActions));
        spots.X = Pos.Right(inspect) + 1; spots.Y = 2;
        actions.Add(create, import, park, remove, inspect, spots);
        content.Add(actions);
        Add(content);

        status = Theme.Apply(new Label { Text = "Ready. Select a row to see details.", X = 2, Y = Pos.AnchorEnd(1), Width = Dim.Fill(2) }, Theme.Accent);
        Add(status);
        focusOrder = [garagePicker, quit, navigation, createGarage, importGarage, help,
            query, filters, table, create, import, park, remove, inspect, spots];
        KeyDown += (_, key) =>
        {
            if (key == Key.Tab || key == Key.Tab.WithShift)
            { AdvanceWorkspaceFocus(key == Key.Tab.WithShift); key.Handled = true; }
            else if (key == Key.F1) { Help(); key.Handled = true; }
            else if (key == Key.F2) { Guard(() => CreateVehicle(false)); key.Handled = true; }
            else if (key == Key.F3) { Guard(Search); key.Handled = true; }
            else if (key == Key.F4) { Guard(() => GarageResult(workflows.CreateGarage())); key.Handled = true; }
            else if (key == Key.F5) { RefreshRows(); key.Handled = true; }
            else if (key == Key.Q.WithCtrl) { Quit(); key.Handled = true; }
            else if (key == Key.Esc) { Quit(); key.Handled = true; }
            else if (key == Key.F.WithCtrl) { query.SetFocus(); key.Handled = true; }
        };
        RefreshRows();
    }

    // A single tab sequence spans all panels, rather than trapping focus in a nested group.
    internal void AdvanceWorkspaceFocus(bool backwards = false)
    {
        View[] available = focusOrder.Where(view => view.CanFocus && view.Visible && view.Enabled).ToArray();
        if (available.Length == 0) return;
        int index = Array.IndexOf(available, MostFocused);
        int next = (index + (backwards ? -1 : 1) + available.Length) % available.Length;
        available[next].SetFocus();
    }

    private Vehicle? SelectedVehicle => table.Value?.SelectedCell.Y is int row && row >= 0 && row < displayedVehicles.Count
        ? displayedVehicles[row] : null;

    private void RefreshRows()
    {
        if (refreshing) return;
        refreshing = true;
        try
        {
            int selected = table.Value?.SelectedCell.Y ?? 0;
            garagePicker.Text = state.Garage is null ? "Choose a garage" : $"Garage: {state.Garage.GarageName}  ▾";
            stats.Text = $"{state.Service.Garages.Count} GARAGES   {state.Service.Catalog.Vehicles.Count} VEHICLES   " +
                $"{state.Service.Garages.Sum(g => g.OccupiedSpaces)} PARKED\n" +
                (state.Garage is null ? "Create your first garage to start parking." :
                    $"{state.Garage.AvailableSpaces} spots available in {state.Garage.GarageName}");
            DataTable data = new();
            if (state.Page == WorkspacePage.Overview)
            {
                displayedVehicles = [];
                foreach (string column in new[] { "Garage", "Parked", "Available", "Capacity", "Occupancy" }) data.Columns.Add(column);
                displayedGarages = state.Service.Garages.Where(garage => garage.GarageName.Contains(
                    state.QuickFilter.Trim(), StringComparison.OrdinalIgnoreCase)).ToArray();
                foreach (VehicleGarage garage in displayedGarages)
                {
                    int filled = (int)Math.Round(12d * garage.OccupiedSpaces / garage.Capacity);
                    data.Rows.Add(garage.GarageName, garage.OccupiedSpaces, garage.AvailableSpaces, garage.Capacity,
                        new string('█', filled) + new string('░', 12 - filled));
                }
                tableFrame.Title = "Garage overview / Enter to open";
            }
            else
            {
                displayedVehicles = state.VisibleVehicles();
                foreach (string column in new[] { "Registration", "Type", "Vehicle", "Year", "Location", "Spot" }) data.Columns.Add(column);
                foreach (Vehicle vehicle in displayedVehicles)
                    data.Rows.Add(vehicle.RegistrationNumber, vehicle.GetType().Name, $"{vehicle.Manufacturer} {vehicle.Model}",
                        vehicle.ManufacturingYear, state.Location(vehicle)?.GarageName ?? "Available", state.Spot(vehicle)?.ToString() ?? "—");
                tableFrame.Title = $"{state.Page} / {displayedVehicles.Count} vehicle(s)";
            }
            table.Table = new DataTableSource(data);
            if (data.Rows.Count > 0) table.SetSelection(0, Math.Clamp(selected, 0, data.Rows.Count - 1), false);
            park.Enabled = state.Garage is not null;
            remove.Enabled = state.Page is not WorkspacePage.Overview;
            spots.Enabled = state.Garage is not null;
            UpdateDetails();
        }
        finally { refreshing = false; }
    }

    private void UpdateDetails()
    {
        if (state.Page == WorkspacePage.Overview)
            details.Text = "Your garages, capacity, and availability in one place.\nEnter opens a garage. F4 creates a new layout.\nTab moves focus. All changes stay in this session.";
        else if (SelectedVehicle is Vehicle vehicle) details.Text = VehicleDetails.Summary(vehicle);
        else details.Text = "No vehicles match this view.\nClear the Find field or adjust your filters.\nF2 creates a vehicle; Import vehicle opens a JSON file.";
    }

    private void ChooseGarage()
    {
        int? selected = dialogs.Choose("Choose a garage", state.Service.Garages
            .Select(g => $"{g.GarageName} / {g.OccupiedSpaces} parked / {g.AvailableSpaces} available").ToArray());
        if (selected is int index) { state.Garage = state.Service.Garages[index]; RefreshRows(); }
    }

    private void OpenDetails()
    {
        if (state.Page == WorkspacePage.Overview)
        {
            int row = table.Value?.SelectedCell.Y ?? -1;
            if (row >= 0 && row < displayedGarages.Count)
            { state.Garage = displayedGarages[row]; navigation.SelectedItem = 2; state.Page = WorkspacePage.Parking; query.Text = ""; RefreshRows(); }
        }
        else if (SelectedVehicle is Vehicle vehicle) dialogs.Message("Vehicle details", VehicleDetails.Full(vehicle));
    }

    private void CreateVehicle(bool parkImmediately)
    {
        if (parkImmediately && state.Garage is null) { ChooseGarage(); if (state.Garage is null) return; }
        int? spot = parkImmediately ? ChooseSpot(null) : null;
        if (parkImmediately && spot is null) return;
        VehicleCreationResult? result = workflows.CreateVehicle(parkImmediately ? state.Garage : null, spot == 0 ? null : spot);
        if (result is not null)
        {
            SetStatus(result.Message);
            if (!result.Success) dialogs.Message("Vehicle creation", result.Message);
            else RevealVehicle(result.Vehicle!);
        }
        RefreshRows();
    }

    private void ImportVehicle()
    {
        string? path = dialogs.JsonFile("Open vehicle JSON / One vehicle object");
        if (path is null) return;
        int? mode = dialogs.Choose("Import vehicle", ["Add to vehicle catalog", "Create and park in the selected garage", "Cancel"]);
        if (mode is null or 2) return;
        if (mode == 1 && state.Garage is null) { ChooseGarage(); if (state.Garage is null) return; }
        int? spot = mode == 1 ? ChooseSpot(null) : null;
        if (mode == 1 && spot is null) return;
        VehicleCreationResult result = state.Service.VehicleCreation.FromJson(path, mode == 1 ? state.Garage : null, spot == 0 ? null : spot);
        SetStatus(result.Message);
        if (!result.Success) dialogs.Message("Could not import vehicle", result.Message);
        else RevealVehicle(result.Vehicle!);
        RefreshRows();
    }

    private int? ChooseSpot(Vehicle? vehicle)
    {
        if (state.Garage is null) return null;
        var spotDetails = state.Garage.SpotDetails;
        int[] available = vehicle is null
            ? spotDetails.Where(s => !s.IsOccupied).Select(s => s.SpotNumber).ToArray()
            : state.Garage.AvailableSpotsFor(vehicle).ToArray();
        if (available.Length == 0) { dialogs.Message("No available spots", "No open spot can accept this vehicle. Choose another garage."); return null; }
        string[] choices = ["First available suitable spot", .. available.Select(number =>
        {
            var spot = spotDetails[number - 1];
            return $"Spot {number} / " + (spot.Dimensions is null ? "No size limit" :
                $"{spot.Dimensions.LengthMeters} x {spot.Dimensions.WidthMeters} x {spot.Dimensions.HeightMeters} m");
        })];
        int? selected = dialogs.Choose("Choose parking spot", choices);
        return selected is null ? null : selected == 0 ? 0 : available[selected.Value - 1];
    }

    private void ParkVehicle()
    {
        if (state.Garage is null) return;
        Vehicle? vehicle = SelectedVehicle;
        if (vehicle is null)
        {
            IReadOnlyList<Vehicle> available = state.Service.GetParkableVehicles(state.Garage);
            int? pick = dialogs.Choose("Choose a vehicle to park", available.Select(v => $"{v.RegistrationNumber} / {v.Manufacturer} {v.Model}").ToArray());
            if (pick is null) return;
            vehicle = available[pick.Value];
        }
        if (state.Service.IsParked(vehicle)) { dialogs.Message("Already parked", "Remove this vehicle from its current garage before parking it elsewhere."); return; }
        int? spot = ChooseSpot(vehicle);
        if (spot is null) return;
        ParkingResult result = state.Service.Park(vehicle, state.Garage, spot == 0 ? null : spot);
        SetStatus(result.Message);
        if (!result.Success) dialogs.Message("Parking", result.Message);
        RefreshRows();
    }

    private void RemoveVehicle()
    {
        if (SelectedVehicle is not Vehicle vehicle) return;
        VehicleGarage? garage = state.Location(vehicle);
        if (garage is null) { dialogs.Message("Vehicle is available", "This vehicle is already outside the garages."); return; }
        if (!dialogs.Confirm("Remove from garage", $"Remove {vehicle.RegistrationNumber} from {garage.GarageName}?\nThe vehicle stays in your catalog.", "_Remove")) return;
        SetStatus(garage.Remove(vehicle.RegistrationNumber).Message);
        RefreshRows();
    }

    private void ParkingActions()
    {
        int? action = dialogs.Choose("Parking tools", ["View spot availability and sizes", "Create a vehicle and park it", "Show vehicle type counts"]);
        if (action == 1) CreateVehicle(true);
        else if (action == 0 && state.Garage is not null)
            dialogs.Message($"{state.Garage.GarageName} / Parking spots", string.Join("\n", state.Garage.SpotDetails.Select(spot =>
                $"Spot {spot.SpotNumber,-5} {(spot.IsOccupied ? "Occupied" : "Available"),-11} " +
                (spot.Dimensions is null ? "No size limit" : $"{spot.Dimensions.LengthMeters} x {spot.Dimensions.WidthMeters} x {spot.Dimensions.HeightMeters} m"))));
        else if (action == 2 && state.Garage is not null)
            dialogs.Message("Vehicle type counts", string.Join("\n", state.Garage.VehiclesByType.Select(group => $"{group.VehicleType}: {group.Vehicles.Count}")) is { Length: > 0 } summary ? summary : "No parked vehicles yet.");
    }

    private void Search()
    {
        if (state.Garage is null) { ChooseGarage(); if (state.Garage is null) return; }
        int? action = dialogs.Choose("Search the selected garage", ["Set search filters", "Clear all filters and show all vehicles"]);
        if (action is null) return;
        var criteria = action == 1 ? new Garage.Queries.VehicleSearchCriteria() : SearchForm.Show(dialogs, state.Criteria);
        if (criteria is null) return;
        state.Criteria = criteria; state.Page = WorkspacePage.Search; navigation.SelectedItem = 3;
        RefreshRows(); SetStatus("Search updated. Use Find to narrow the results further.");
    }

    private void GarageResult(GarageCreationResult? result)
    {
        if (result is null) return;
        SetStatus(result.Message);
        if (result.Success)
        {
            state.Garage = result.Garage;
            state.Page = WorkspacePage.Parking;
            navigation.SelectedItem = 2;
            query.Text = "";
        }
        else dialogs.Message("Could not create garage", result.Message);
        RefreshRows();
    }

    private void RevealVehicle(Vehicle vehicle)
    {
        state.Page = WorkspacePage.Vehicles;
        state.QuickFilter = "";
        query.Text = "";
        navigation.SelectedItem = 1;
        RefreshRows();
        int row = displayedVehicles.ToList().FindIndex(item => ReferenceEquals(item, vehicle));
        if (row >= 0) table.SetSelection(0, row, false);
        table.SetFocus();
    }

    private void SetStatus(string message) => status.Text = message;
    private void Help() => dialogs.Message("Welcome to Garage Workspace",
        "NAVIGATION\nTab / Shift+Tab: move between controls across panels\nArrow keys: select rows and sidebar pages\nEnter: open a choice or inspect a row\nEsc: close the current dialog\n\nSHORTCUTS\nF1 Help  /  F2 New vehicle  /  F3 Search\nF4 New garage  /  F5 Refresh\nCtrl+F Find  /  Ctrl+Q Quit\n\nWORKING WITH FILES\nImport buttons open a file browser filtered to JSON.\nVehicle files contain one vehicle object; garage imports use a layout and optional placements.\n\nYour work stays in this session. Imported files are never changed.");

    private void Quit()
    {
        if (dialogs.Confirm("Close Garage Workspace", "Changes exist only in this session.\nClose the application?", "_Quit")) application.RequestStop(this);
    }

    private void Guard(Action action)
    {
        try { action(); }
        catch (Exception exception)
        {
            ErrorLogger.TryLog(exception, "Terminal workspace action");
            dialogs.Message("Unable to finish", "That action could not be completed.\n" + exception.Message);
        }
    }
}
