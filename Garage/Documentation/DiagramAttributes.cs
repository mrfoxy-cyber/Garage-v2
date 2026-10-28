namespace Garage.Documentation;

/// <summary>Links an operation or query to a story ID in UseCases/.</summary>
[AttributeUsage(AttributeTargets.Method | AttributeTargets.Property, AllowMultiple = true, Inherited = false)]
public sealed class UseCaseAttribute(string id) : Attribute
{
    public string Id { get; } = id;
}

/// <summary>Starts a source-based sequence view; depth limits method-body expansion.</summary>
[AttributeUsage(AttributeTargets.Method, Inherited = false)]
public sealed class SequenceViewAttribute(string id) : Attribute
{
    public string Id { get; } = id;
    public int MaxDepth { get; set; } = 3;
    public string[] ExpandNamespaces { get; set; } = [];
}
