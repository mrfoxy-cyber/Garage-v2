namespace Garage.Documentation;

/// <summary>Names a user goal implemented by an operation or query.</summary>
[AttributeUsage(AttributeTargets.Method | AttributeTargets.Property, AllowMultiple = true, Inherited = false)]
public sealed class UseCaseAttribute(string id, string title) : Attribute
{
    public string Id { get; } = id;
    public string Title { get; } = title;
    public string Actor { get; set; } = "Garage operator";
}

/// <summary>Starts a source-based sequence view; depth limits method-body expansion.</summary>
[AttributeUsage(AttributeTargets.Method, Inherited = false)]
public sealed class SequenceViewAttribute(string id) : Attribute
{
    public string Id { get; } = id;
    public int MaxDepth { get; set; } = 3;
    public string[] ExpandNamespaces { get; set; } = [];
}
