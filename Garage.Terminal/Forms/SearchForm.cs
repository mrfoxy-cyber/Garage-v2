using Garage.Queries;
using Garage.Vehicles;
using Garage.Terminal.Presentation;

namespace Garage.Terminal.Forms;

internal static class SearchForm
{
    public static VehicleSearchCriteria? Show(Dialogs dialogs, VehicleSearchCriteria current)
    {
        var properties = typeof(VehicleSearchCriteria).GetProperties().Where(p => p.Name != nameof(current.VehicleTypes)).ToArray();
        FieldDefinition[] fields = properties.Select(property => new FieldDefinition(property.Name,
            FieldDefinition.FriendlyLabel(property.Name), property.PropertyType, false)).ToArray();
        var initial = properties.ToDictionary(property => property.Name, property => property.GetValue(current));
        Dictionary<string, object?>? values = dialogs.Form("Search vehicles / Optional filters", fields, "_Choose types", initial);
        if (values is null) return null;
        Type[] vehicleTypes = [typeof(Car), typeof(Motorcycle), typeof(Airplane), typeof(Bus), typeof(Boat), typeof(Truck)];
        IReadOnlyList<int>? selected = dialogs.ChooseMany("Vehicle types", FactoryDefinition.Vehicles.Select(f => f.Name).ToArray(),
            current.VehicleTypes.Select(type => Array.IndexOf(vehicleTypes, type)).Where(index => index >= 0));
        if (selected is null) return null;
        VehicleSearchCriteria result = new()
        {
            VehicleTypes = selected.Select(index => vehicleTypes[index]).ToArray()
        };
        foreach (var property in properties) property.SetValue(result, values[property.Name]);
        return result;
    }
}
