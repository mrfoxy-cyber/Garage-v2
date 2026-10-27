using System.Net;
using System.Text;

static class GraphGallery
{
    public static string Generate(Manifest manifest, string guide)
    {
        var html = new StringBuilder("""
            <!doctype html>
            <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width,initial-scale=1">
              <title>Garage — Architecture explorer</title>
              <link rel="stylesheet" href="viewer.css">
              <script defer src="vendor/elk.bundled.js"></script>
              <script defer src="graph-layout.js"></script>
              <script defer src="diagrams.generated.js"></script>
              <script defer src="viewer.js"></script>
            </head>
            <body>
              <header class="app-header">
                <a class="brand" href="#garage-components" aria-label="Garage architecture home"><span class="brand-icon" aria-hidden="true">G</span><span>GARAGE<span class="brand-sub">ARCHITECTURE EXPLORER</span></span></a>
                <div class="header-right"><span class="local-badge"><span></span>Local workspace</span><button id="help-button" class="quiet-button" type="button">Symbol guide <span aria-hidden="true">↗</span></button></div>
              </header>
              <div class="app-shell">
                <aside class="sidebar" aria-label="Diagram navigation">
                  <div class="sidebar-heading"><span>DIAGRAMS</span><span id="diagram-count" class="count-pill"></span></div>
                  <label class="nav-search"><span aria-hidden="true">⌕</span><input id="diagram-search" type="search" placeholder="Find a diagram…" aria-label="Find a diagram"></label>
                  <nav id="diagram-nav" aria-label="Choose a diagram">
            """);
        foreach (var group in manifest.Diagrams.GroupBy(d => d.Type is "sequence" or "communication" or "interaction-overview" or "timing" ? "Interaction" : d.Type is "use-case" or "activity" or "state-machine" ? "Behavioral" : "Structural"))
        {
            html.Append($"<section class=\"nav-group\"><h2>{H(group.Key)}</h2>");
            foreach (var d in group)
            {
                var name = d.Title.Replace("Template: ", "");
                html.Append($"<button type=\"button\" class=\"diagram-nav-item\" data-view-id=\"{H(d.Id)}\" data-search=\"{H(name + " " + d.Type)}\"><span class=\"nav-symbol\" aria-hidden=\"true\">{(d.Type == "class" ? "C" : "◇")}</span><span>{H(name)}</span>{(d.Status == "template" ? "<span class=\"template-dot\" title=\"Template\">T</span>" : "")}</button>");
            }
            html.Append("</section>");
        }
        html.Append("""
                  </nav>
                  <footer class="sidebar-footer"><span class="offline-dot"></span>Offline · code-linked diagrams<br><a href="README.md">Maintenance guide</a></footer>
                </aside>
                <main class="workspace" id="workspace">
                  <div class="workspace-title"><div><p id="view-kind" class="eyebrow">STRUCTURAL / COMPONENT</p><h1 id="view-title">Garage project components</h1><p id="view-description" class="view-description">Explore the application structure.</p></div><div class="view-links"><a id="source-link" href="structural/component/garage-components.puml">Source</a><a id="export-link" href="structural/component/garage-components.svg" target="_blank" rel="noopener">SVG export ↗</a></div></div>
                  <section class="diagram-workbench" aria-label="Interactive diagram">
                    <div class="workbench-topbar"><div class="workbench-name"><span class="canvas-dot"></span><strong id="canvas-label">Project dependencies</strong><span id="graph-count" class="graph-count"></span></div><div class="workbench-actions"><button id="collapse-all" type="button" class="quiet-button">Collapse all</button><button id="fullscreen" type="button" class="quiet-button" aria-label="Toggle fullscreen diagram">⛶ <span>Fullscreen</span></button></div></div>
                    <div class="graph-filters" id="graph-filters"><label><span class="field-label">Find a class</span><input id="node-search" type="search" placeholder="Type a class name…" autocomplete="off" aria-label="Find a class or project" list="node-options"><datalist id="node-options"></datalist></label><label id="namespace-field"><span class="field-label">Namespace</span><select id="namespace-filter" aria-label="Filter namespace"><option value="">All namespaces</option></select></label><button id="focus-node" type="button" class="secondary-button">Focus selection</button><button id="show-all" type="button" class="quiet-button" hidden>Show all</button></div>
                    <div id="graph-viewport" class="graph-viewport" tabindex="0" role="region" aria-label="Diagram canvas. Drag background to pan, scroll to zoom. Tab to a class and press Enter to expand.">
                      <div id="graph-world" class="graph-world"><svg id="graph-edges" class="graph-edges" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"></svg><div id="graph-groups"></div><div id="graph-nodes"></div></div>
                      <div id="static-world" class="static-world" hidden><img id="static-diagram" alt=""></div>
                      <div id="canvas-empty" class="canvas-empty" hidden>No matching classes.<button type="button" id="clear-filter">Clear filters</button></div>
                      <div id="layout-status" class="layout-status" role="status" aria-live="polite">Arranging diagram…</div>
                    </div>
                    <div class="canvas-bottom"><div class="canvas-hint"><span aria-hidden="true">↔</span><span id="interaction-hint">Click a card to expand · Drag background to pan · Scroll to zoom</span></div><div class="zoom-controls" role="group" aria-label="Diagram zoom"><button id="zoom-out" type="button" aria-label="Zoom out">−</button><output id="zoom-level" aria-label="Zoom level">100%</output><button id="zoom-in" type="button" aria-label="Zoom in">+</button><span class="control-divider"></span><button id="fit-view" type="button">Fit view</button><button id="actual-size" type="button" aria-label="Actual size">1:1</button></div></div>
                  </section>
                  <div class="diagram-caption"><p id="view-caption"></p><span id="maintenance-badge" class="maintenance-badge"></span></div>
                  <div class="mini-legend"><span><i class="legend-inheritance"></i>Inherits</span><span><i class="legend-realization"></i>Implements</span><span><i class="legend-reference"></i>References</span><button type="button" id="legend-button">All symbols →</button></div>
                  <div id="related-views" class="related-views"></div>
                  <noscript>This explorer requires JavaScript. Diagram source and SVG exports remain available in the structural, behavioral and interaction folders.</noscript>
                </main>
              </div>
              <dialog id="symbol-dialog" class="symbol-dialog"><div class="dialog-header"><h2>How to read UML</h2><button id="close-help" type="button" aria-label="Close symbol guide">×</button></div>
            """);
        html.Append(guide);
        html.Append("</dialog></body></html>\n");
        return html.ToString().Replace("\r\n", "\n");
    }

    static string H(string value) => WebUtility.HtmlEncode(value);
}
