using System.Collections.ObjectModel;
using System.Data;
using Garage.Services;
using Garage.Vehicles;
using Terminal.Gui.App;
using Terminal.Gui.Drawing;
using Terminal.Gui.Input;
using Terminal.Gui.ViewBase;
using Terminal.Gui.Views;
using VehicleGarage = Garage.Models.Garage;

namespace Garage.Terminal.Presentation;

internal sealed partial class GarageWorkspace : Window
{
    private readonly IApplication application;
    private readonly DashboardState state;
    private readonly Dialogs dialogs;
    private readonly Workflows workflows;
    private readonly WorkspaceButtons buttons;
    private readonly Label stats;
    private readonly Label details;
    private readonly Label status;
    private readonly FrameView tableFrame;
    private readonly TableView table;
    private readonly ListView navigation;
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
        buttons = new WorkspaceButtons(Execute);
        Title = "Garage Workspace";
        Width = Dim.Fill(); Height = Dim.Fill(); BorderStyle = LineStyle.None;
        Theme.Apply(this);

        Add(Theme.Apply(new Label { Text = "G / GARAGE", X = 2, Y = 1, Width = 20 }, Theme.Accent));
        stats = Theme.Apply(new Label { X = 23, Y = 2, Width = Dim.Fill(2), Height = 2 }, Theme.Muted);
        buttons.AddHeaderTo(this);
        Add(stats);

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
        buttons.AddSidebarTo(sidebar);
        Add(sidebar);

        View content = Theme.Apply(new View { X = 23, Y = 4, Width = Dim.Fill(1), Height = Dim.Fill(2), CanFocus = true });
        content.Add(Theme.Apply(new Label { Text = "Find", X = 0, Y = 0, Width = 5 }, Theme.Muted));
        query = Theme.Apply(new TextField { X = 6, Y = 0, Width = Dim.Fill(22), CanFocus = true }, Theme.Input);
        query.ValueChanged += (_, _) => { state.QuickFilter = query.Text; RefreshRows(); };
        content.Add(query);
        buttons.AddSearchTo(content);

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
        buttons.AddActionsTo(actions);
        content.Add(actions);
        Add(content);

        status = Theme.Apply(new Label { Text = "Ready. Select a row to see details.", X = 2, Y = Pos.AnchorEnd(1), Width = Dim.Fill(2) }, Theme.Accent);
        Add(status);
        focusOrder = buttons.FocusOrder(navigation, query, table);
        KeyDown += (_, key) =>
        {
            if (key == Key.Tab || key == Key.Tab.WithShift)
            { AdvanceWorkspaceFocus(key == Key.Tab.WithShift); key.Handled = true; }
            else if (key == Key.F1) { Execute(WorkspaceCommand.Help); key.Handled = true; }
            else if (key == Key.F2) { Execute(WorkspaceCommand.CreateVehicle); key.Handled = true; }
            else if (key == Key.F3) { Execute(WorkspaceCommand.Search); key.Handled = true; }
            else if (key == Key.F4) { Execute(WorkspaceCommand.CreateGarage); key.Handled = true; }
            else if (key == Key.F5) { Execute(WorkspaceCommand.Refresh); key.Handled = true; }
            else if (key == Key.Q.WithCtrl) { Execute(WorkspaceCommand.Quit); key.Handled = true; }
            else if (key == Key.Esc) { Execute(WorkspaceCommand.Quit); key.Handled = true; }
            else if (key == Key.F.WithCtrl) { Execute(WorkspaceCommand.FocusFind); key.Handled = true; }
        };
        RefreshRows();
    }

    // Buttons and keyboard shortcuts use the same actions.
    private void Execute(WorkspaceCommand command)
    {
        switch (command)
        {
            case WorkspaceCommand.ChooseGarage: Guard(ChooseGarage); break;
            case WorkspaceCommand.Quit: Quit(); break;
            case WorkspaceCommand.CreateGarage: Guard(() => GarageResult(workflows.CreateGarage())); break;
            case WorkspaceCommand.ImportGarage: Guard(() => GarageResult(workflows.ImportGarage())); break;
            case WorkspaceCommand.Help: Help(); break;
            case WorkspaceCommand.Search: Guard(Search); break;
            case WorkspaceCommand.CreateVehicle: Guard(() => CreateVehicle(false)); break;
            case WorkspaceCommand.ImportVehicle: Guard(ImportVehicle); break;
            case WorkspaceCommand.ParkVehicle: Guard(ParkVehicle); break;
            case WorkspaceCommand.RemoveVehicle: Guard(RemoveVehicle); break;
            case WorkspaceCommand.OpenDetails: Guard(OpenDetails); break;
            case WorkspaceCommand.ParkingActions: Guard(ParkingActions); break;
            case WorkspaceCommand.Refresh: RefreshRows(); break;
            case WorkspaceCommand.FocusFind: query.SetFocus(); break;
        }
    }

    // A single tab sequence spans all panels, rather than trapping focus in a nested group.
    internal void AdvanceWorkspaceFocus(bool backwards = false)
    {
        List<View> available = focusOrder.Where(view => view.CanFocus && view.Visible && view.Enabled).ToList();
        if (available.Count == 0) return;
        int index = MostFocused is View focused ? available.IndexOf(focused) : -1;
        int next = (index + (backwards ? -1 : 1) + available.Count) % available.Count;
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
            buttons.GaragePicker.Text = state.Garage is null ? "Choose a garage" : $"Garage: {state.Garage.GarageName}  ▾";
            stats.Text = $"{state.Service.Garages.Count} GARAGES   {state.Service.Catalog.Vehicles.Count} VEHICLES   " +
                $"{state.Service.Garages.Sum(g => g.OccupiedSpaces)} PARKED\n" +
                (state.Garage is null ? "Create your first garage to start parking." :
                    $"{state.Garage.AvailableSpaces} spots available in {state.Garage.GarageName}");
            DataTable data = new();
            if (state.Page == WorkspacePage.Overview)
            {
                displayedVehicles = [];
                AddColumns(data, ["Garage", "Parked", "Available", "Capacity", "Occupancy"]);
                displayedGarages = state.Service.Garages.Where(garage => garage.GarageName.Contains(
                    state.QuickFilter.Trim(), StringComparison.OrdinalIgnoreCase)).ToList();
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
                AddColumns(data, ["Registration", "Type", "Vehicle", "Year", "Location", "Spot"]);
                foreach (Vehicle vehicle in displayedVehicles)
                    data.Rows.Add(vehicle.RegistrationNumber, vehicle.GetType().Name, $"{vehicle.Manufacturer} {vehicle.Model}",
                        vehicle.ManufacturingYear, state.Location(vehicle)?.GarageName ?? "Available", state.Spot(vehicle)?.ToString() ?? "—");
                tableFrame.Title = $"{state.Page} / {displayedVehicles.Count} vehicle(s)";
            }
            table.Table = new DataTableSource(data);
            if (data.Rows.Count > 0) table.SetSelection(0, Math.Clamp(selected, 0, data.Rows.Count - 1), false);
            buttons.Park.Enabled = state.Garage is not null;
            buttons.Remove.Enabled = state.Page is not WorkspacePage.Overview;
            buttons.Spots.Enabled = state.Garage is not null;
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

    private static void AddColumns(DataTable table, List<string> names)
    {
        foreach (string name in names)
            table.Columns.Add(name);
    }
}
