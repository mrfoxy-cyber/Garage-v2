using Terminal.Gui.Drawing;
using Terminal.Gui.ViewBase;
using Terminal.Gui.Views;
using Attribute = Terminal.Gui.Drawing.Attribute;

namespace Garage.Terminal.Presentation;

internal static class Theme
{
    public static readonly Scheme Surface = Create("#dce5f5", "#101827", "#245e85");
    public static readonly Scheme Panel = Create("#dce5f5", "#162235", "#245e85");
    public static readonly Scheme Accent = Create("#69e0d6", "#101827", "#164b60");
    public static readonly Scheme Muted = Create("#9aaec8", "#101827", "#164b60");
    public static readonly Scheme Danger = Create("#ffb4aa", "#101827", "#713b45");
    public static readonly Scheme Input = Create("#edf5ff", "#243850", "#164b60");

    private static Scheme Create(string text, string background, string selection) => new()
    {
        Normal = new Attribute(new Color(text), new Color(background)),
        Focus = new Attribute(new Color("#ffffff"), new Color(selection)),
        HotNormal = new Attribute(new Color("#69e0d6"), new Color(background)),
        HotFocus = new Attribute(new Color("#ffffff"), new Color(selection)),
        HotActive = new Attribute(new Color("#ffffff"), new Color(selection)),
        Active = new Attribute(new Color("#ffffff"), new Color(selection)),
        Highlight = new Attribute(new Color("#69e0d6"), new Color(selection)),
        Editable = new Attribute(new Color("#ffffff"), new Color(background)),
        ReadOnly = new Attribute(new Color(text), new Color(background)),
        Disabled = new Attribute(new Color("#71849c"), new Color(background))
    };

    public static T Apply<T>(T view, Scheme? scheme = null) where T : View
    {
        view.SetScheme(scheme ?? Surface);
        return view;
    }

    public static Button Button(string text, Action action)
    {
        Button button = Apply(new Button { Text = text, ShadowStyle = ShadowStyles.None });
        button.Accepted += (_, e) => { e.Handled = true; action(); };
        return button;
    }
}
