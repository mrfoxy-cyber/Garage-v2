(() => {
  'use strict';
  const data = globalThis.GARAGE_UML_DATA;
  const byId = id => document.getElementById(id);
  const viewport = byId('graph-viewport');
  const status = byId('layout-status');
  if (!data || !globalThis.ELK || !globalThis.GarageGraphLayout || !globalThis.GarageSemanticLayout) {
    status.textContent = 'The diagram data or layout library could not load. Regenerate the diagrams and refresh the page.';
    return;
  }
  const elk = new ELK();
  const diagrams = new Map(data.diagrams.map(d => [d.id, d]));
  const world = byId('graph-world');
  const staticWorld = byId('static-world');
  const staticImage = byId('static-diagram');
  const sourceView = byId('puml-source-view');
  const edgeLayer = byId('graph-edges');
  const groupLayer = byId('graph-groups');
  const nodeLayer = byId('graph-nodes');
  const namespaceSelect = byId('namespace-filter');
  const nodeSearch = byId('node-search');
  const camera = { x: 0, y: 0, zoom: 1 };
  let diagram = null;
  let graph = null;
  let scene = null;
  let expandedId = null;
  let focusId = null;
  let request = 0;
  let fitted = true;
  let drag = null;
  let resizeFrame = null;
  let priorSize = '';
  let presentation = 'interactive';
  let catalogueOpen = false;
  let interactiveLabel = '';
  let interactiveHint = '';
  const presentationCameras = new Map();
  const pointers = new Map();
  let pinch = null;
  const memberTouches = new Map();
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const interactive = () => !catalogueOpen && presentation === 'interactive' && !!graph;
  const cameraKey = () => `${diagram?.id}:${presentation}`;
  function saveCamera() { if (diagram && presentation !== 'source') presentationCameras.set(cameraKey(), { ...camera, fitted }); }
  function restoreCamera() {
    const saved = presentationCameras.get(cameraKey());
    if (!saved) return false;
    Object.assign(camera, { x:saved.x, y:saved.y, zoom:saved.zoom }); fitted = saved.fitted; applyCamera(); return true;
  }

  function element(tag, className, text) {
    const result = document.createElement(tag);
    if (className) result.className = className;
    if (text !== undefined) result.textContent = text;
    return result;
  }
  function svg(tag, attributes) {
    const result = document.createElementNS(SVG_NS, tag);
    for (const [key, value] of Object.entries(attributes || {})) result.setAttribute(key, value);
    return result;
  }
  function applyCamera(animate = false) {
    const target = interactive() ? world : staticWorld;
    world.classList.toggle('camera-animate', animate && interactive());
    staticWorld.classList.toggle('camera-animate', animate && presentation === 'plantuml');
    target.style.transform = `translate(${camera.x}px,${camera.y}px) scale(${camera.zoom})`;
    viewport.style.backgroundSize = `${Math.max(5, 20 * camera.zoom)}px ${Math.max(5, 20 * camera.zoom)}px`;
    viewport.style.backgroundPosition = `${camera.x}px ${camera.y}px`;
    byId('zoom-level').value = `${Math.round(camera.zoom * 100)}%`;
  }
  function dimensions() {
    return interactive() ? { width: scene?.width || 1, height: scene?.height || 1 } : { width: staticImage.naturalWidth || 1, height: staticImage.naturalHeight || 1 };
  }
  function fit(animate = false) {
    const size = dimensions();
    if (presentation === 'source' || !viewport.clientWidth || !size.width || (!interactive() && !staticImage.naturalWidth)) return;
    const padding = 42;
    camera.zoom = Math.min(1.15, Math.max(.04, Math.min((viewport.clientWidth - padding * 2) / size.width, (viewport.clientHeight - padding * 2) / size.height)));
    camera.x = (viewport.clientWidth - size.width * camera.zoom) / 2;
    camera.y = (viewport.clientHeight - size.height * camera.zoom) / 2;
    fitted = true;
    applyCamera(animate);
  }
  function zoomTo(value, point) {
    if (presentation === 'source') return;
    const next = Math.min(3, Math.max(.04, value));
    const anchor = point || { x: viewport.clientWidth / 2, y: viewport.clientHeight / 2 };
    camera.x = anchor.x - (anchor.x - camera.x) * next / camera.zoom;
    camera.y = anchor.y - (anchor.y - camera.y) * next / camera.zoom;
    camera.zoom = next;
    fitted = false;
    applyCamera();
  }
  function centerNode(id) {
    const node = scene?.nodes.find(n => n.id === id);
    if (!node) return;
    camera.zoom = Math.min(1.15, Math.max(.55, Math.min((viewport.clientWidth - 80) / node.width, (viewport.clientHeight - 70) / node.height)));
    camera.x = (viewport.clientWidth - node.width * camera.zoom) / 2 - node.x * camera.zoom;
    camera.y = (viewport.clientHeight - node.height * camera.zoom) / 2 - node.y * camera.zoom;
    fitted = false;
    applyCamera(true);
  }
  function filteredGraph() {
    if (graph.sequence || graph.timing || graph.nodes.some(n => n.parent)) return graph;
    let nodes = graph.nodes;
    const namespace = namespaceSelect.value;
    if (namespace) nodes = nodes.filter(n => n.group === namespace);
    if (focusId) {
      const neighbors = new Set([focusId]);
      for (const edge of graph.edges) if (edge.source === focusId || edge.target === focusId) { neighbors.add(edge.source); neighbors.add(edge.target); }
      nodes = nodes.filter(n => neighbors.has(n.id));
    }
    const ids = new Set(nodes.map(n => n.id));
    return { ...graph, nodes, edges: graph.edges.filter(e => ids.has(e.source) && ids.has(e.target)) };
  }
  function renderGroups(groups) {
    groupLayer.replaceChildren();
    for (const group of groups || []) {
      const box = element('div', `namespace-group${group.container ? ' container-group' : ''}${group.fragment ? ' fragment-group' : ''}${group.timing ? ' timing-group' : ''}`);
      Object.assign(box.style, { left: `${group.x}px`, top: `${group.y}px`, width: `${group.width}px`, height: `${group.height}px` });
      if (group.label) box.append(element('span', '', group.label));
      groupLayer.append(box);
    }
  }
  function renderEdges(edges) {
    edgeLayer.replaceChildren();
    edgeLayer.setAttribute('width', String(scene.width));
    edgeLayer.setAttribute('height', String(scene.height));
    const defs = svg('defs');
    const triangle = svg('marker', { id: 'uml-triangle', markerWidth: 12, markerHeight: 12, refX: 11, refY: 6, viewBox: '0 0 12 12', orient: 'auto', markerUnits: 'userSpaceOnUse' });
    triangle.append(svg('path', { d: 'M1 1L11 6L1 11Z', fill: '#fafbfc', stroke: '#91a3b6', 'stroke-width': 1.2 }));
    const arrow = svg('marker', { id: 'uml-arrow', markerWidth: 10, markerHeight: 10, refX: 9, refY: 5, viewBox: '0 0 10 10', orient: 'auto', markerUnits: 'userSpaceOnUse' });
    arrow.append(svg('path', { d: 'M1 1L9 5L1 9', fill: 'none', stroke: '#91a3b6', 'stroke-width': 1.2 }));
    const diamond = svg('marker', { id: 'uml-diamond', markerWidth: 15, markerHeight: 12, refX: 1, refY: 6, viewBox: '0 0 15 12', orient: 'auto', markerUnits: 'userSpaceOnUse' });
    diamond.append(svg('path', { d: 'M1 6L7 1L14 6L7 11Z', fill: '#657f91', stroke: '#657f91' }));
    const hollowDiamond = svg('marker', { id: 'uml-hollow-diamond', markerWidth: 15, markerHeight: 12, refX: 1, refY: 6, viewBox: '0 0 15 12', orient: 'auto', markerUnits: 'userSpaceOnUse' });
    hollowDiamond.append(svg('path', { d: 'M1 6L7 1L14 6L7 11Z', fill: '#fafbfc', stroke: '#657f91' }));
    defs.append(triangle, arrow, diamond, hollowDiamond); edgeLayer.append(defs);
    for (const life of scene.lifelines || []) edgeLayer.append(svg('line', { x1: life.x, x2: life.x, y1: life.y, y2: life.bottom, class: 'sequence-lifeline' }));
    for (const mark of scene.marks || []) {
      if (mark.kind === 'branch') edgeLayer.append(svg('line', { x1:mark.x-8,x2:mark.x+mark.width,y1:mark.y-18,y2:mark.y-18,class:'sequence-branch-line' }));
      if (mark.kind === 'axis') edgeLayer.append(svg('line', { x1: mark.x, y1: mark.y, x2: mark.toX, y2: mark.y, class: 'timing-axis' }));
      if (mark.kind === 'tick') edgeLayer.append(svg('line', { x1: mark.x, x2: mark.x, y1: mark.y - 8, y2: mark.y, class: 'timing-axis' }));
      const text = svg('text', { x: mark.x, y: mark.kind === 'axis' ? mark.y + 26 : mark.kind === 'tick' ? mark.y + 14 : mark.y, class: 'semantic-label ' + mark.kind, 'text-anchor': mark.kind === 'state-label' ? 'end' : mark.kind === 'tick' ? 'middle' : 'start' });
      text.textContent = mark.text; edgeLayer.append(text);
    }
    for (const edge of edges) {
      if (!edge.points?.length) continue;
      const active = edge.source === expandedId || edge.target === expandedId;
      const attributes = { d: edge.points.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' '), class: `graph-edge ${edge.kind}${active ? ' active' : expandedId && !graph.sequence && !graph.timing ? ' dimmed' : ''}` };
      if (['inheritance','realization'].includes(edge.kind)) attributes['marker-end'] = 'url(#uml-triangle)';
      else if (edge.kind === 'composition' || edge.kind === 'aggregation') attributes['marker-start'] = `url(#${edge.kind === 'composition' ? 'uml-diamond' : 'uml-hollow-diamond'})`;
      else if (edge.kind !== 'timing-trace') attributes['marker-end'] = 'url(#uml-arrow)';
      const path = svg('path', attributes);
      const title = svg('title'); title.textContent = edge.label; path.append(title); edgeLayer.append(path);
      if (edge.label && edge.labelPosition) {
        const words = edge.label.split(/\s+/); const lines = []; let current = '';
        for (const word of words) { if (current && current.length + word.length > 32) { lines.push(current); current = ''; } current += (current ? ' ' : '') + word; } if (current) lines.push(current);
        const label = svg('text', { x: edge.labelPosition.x, y: edge.labelPosition.y - (lines.length - 1) * 7, class: 'graph-edge-label', 'text-anchor': 'middle' });
        for (const [index,line] of lines.entries()) { const span = svg('tspan', { x: edge.labelPosition.x, dy: index ? 14 : 0 }); span.textContent = line; label.append(span); }
        edgeLayer.append(label);
      }
    }
  }
  function renderNodes(nodes, restoreFocusId) {
    nodeLayer.replaceChildren();
    for (const node of nodes) {
      const open = node.frameOpen !== undefined ? node.frameOpen : node.id === expandedId;
      const card = element('article', `graph-entity kind-${node.kind.replace(/\s+/g, '-')}${open ? ' expanded' : ''}${node.fragmentHeader ? ' fragment-header' : ''}${node.containerHeader ? ' container-header' : ''}${node.messageHeader ? ' message-header' : ''}${node.timingPoint ? ' timing-point' : ''}`);
      card.dataset.nodeId = node.id;
      Object.assign(card.style, { left: `${node.x}px`, top: `${node.y}px`, width: `${node.width}px`, height: `${node.height}px` });
      const header = element('button', 'entity-header'); header.type = 'button';
      header.setAttribute('aria-expanded', String(open));
      header.setAttribute('aria-label', ['initial','final','merge'].includes(node.kind) ? `${node.name} — ${node.kind}` : `${open ? 'Collapse' : 'Expand'} ${node.name}`);
      const badge = ({ interface:'I',enum:'E',component:'◇',package:'P',object:'O',participant:'P',device:'▣',artifact:'▤',folder:'▱',boundary:'▢',metaclass:'M',stereotype:'«»',state:'S',action:'□',interaction:'ref',message:'→',reply:'←',fragment:'alt',note:'N',signal:'~','timing-event':'t','use-case':'U' })[node.kind] || (node.kind.includes('struct') ? 'S' : 'C');
      const title = element('span', 'entity-heading');
      title.append(element('span', 'entity-name', node.name), element('span', 'entity-namespace', node.group || node.kind));
      let icon = element('span', 'entity-icon', badge);
      if (node.kind === 'actor') {
        icon = svg('svg', { viewBox:'0 0 40 64',class:'actor-symbol','aria-hidden':'true' });
        icon.append(svg('circle',{cx:20,cy:10,r:7,fill:'none',stroke:'currentColor','stroke-width':1.7}),svg('path',{d:'M20 17V39M5 25H35M20 39L7 60M20 39L33 60',stroke:'currentColor','stroke-width':1.7,fill:'none'}));
      }
      header.append(icon, title, element('span', 'entity-chevron', open ? '−' : '+'));
      header.addEventListener('click', () => toggleNode(node.id));
      card.append(header);
      if (open && !node.fragmentHeader) {
        const body = element('div', 'entity-body'); body.tabIndex = 0;
        body.setAttribute('aria-label', `${node.name} details`);
        if (node.declaration) body.append(element('pre', 'entity-declaration', node.declaration));
        for (const member of node.members) body.append(element('div', 'entity-member', member));
        if (!node.members.length) body.append(element('div', 'entity-member', graph.type === 'class' ? 'No declared members.' : 'Select another element to explore its details.'));
        if (node.bases.length) body.append(element('div', 'entity-base-note', `Base types / interfaces: ${node.bases.join(', ')}`));
        card.append(body);
        const footer = element('div', 'entity-footer');
        footer.append(element('span', '', `${node.members.length} ${graph.type === 'package' ? 'namespaces' : graph.type === 'class' ? 'declared members' : 'details'}`));
        if (node.storyId) {
          const storyLink = element('button', 'quiet-button', 'Story & diagrams →'); storyLink.type = 'button';
          storyLink.addEventListener('click', () => selectStory(node.storyId)); footer.append(storyLink);
        }
        if (node.reference) {
          const reference = element('button', 'quiet-button', 'Open sequence →'); reference.type = 'button';
          reference.addEventListener('click', () => openReference(node.reference)); footer.append(reference);
        }
        if (node.files[0]) {
          const source = element('a', '', 'View source ↗'); source.href = '../../' + node.files[0].split('/').map(encodeURIComponent).join('/'); source.target = '_blank'; source.rel = 'noopener'; footer.append(source);
        }
        card.append(footer);
      }
      nodeLayer.append(card);
      if (restoreFocusId === node.id) header.focus({ preventScroll: true });
    }
  }
  async function arrange(options = {}) {
    if (!interactive()) return;
    const ticket = ++request;
    const filtered = filteredGraph();
    byId('canvas-empty').hidden = filtered.nodes.length !== 0;
    byId('graph-count').textContent = `${filtered.nodes.length}${filtered.nodes.length !== graph.nodes.length ? ' / ' + graph.nodes.length : ''} ${graph.type === 'class' ? 'types' : ['component','package'].includes(graph.type) ? 'projects' : 'elements'} · ${filtered.edges.length} links`;
    byId('show-all').hidden = !focusId && !namespaceSelect.value;
    status.textContent = filtered.nodes.length ? 'Arranging diagram…' : '';
    const previous = options.anchor ? scene?.nodes.find(n => n.id === options.anchor) : null;
    const priorScreen = previous ? { x: camera.x + previous.x * camera.zoom, y: camera.y + previous.y * camera.zoom } : null;
    try {
      const next = await GarageSemanticLayout.layout(filtered, { elk, expandedId, width: viewport.clientWidth, direction: options.fit ? 'AUTO' : scene?.direction || 'AUTO', aspectRatio: Math.max(.6, viewport.clientWidth / Math.max(300, viewport.clientHeight)) });
      if (ticket !== request) return;
      scene = next;
      if (graph.sequence) byId('graph-count').textContent = `${scene.nodes.length} visible / ${graph.nodes.length} elements · ${scene.edges.length} messages`;
      world.style.width = `${scene.width}px`; world.style.height = `${scene.height}px`;
      renderGroups(scene.groups); renderEdges(scene.edges); renderNodes(scene.nodes, options.keyboardFocus);
      if (options.focus && expandedId) centerNode(expandedId);
      else if (options.fit) fit();
      else if (priorScreen) {
        const anchor = scene.nodes.find(n => n.id === options.anchor);
        if (anchor) { camera.x = priorScreen.x - anchor.x * camera.zoom; camera.y = priorScreen.y - anchor.y * camera.zoom; }
        applyCamera();
      } else applyCamera();
      status.textContent = '';
    } catch (error) {
      if (ticket !== request) return;
      console.error(error); status.textContent = `Could not arrange this view: ${error.message}`;
    }
  }
  async function toggleNode(id) {
    const selected = graph.nodes.find(n => n.id === id);
    if (['initial','final','merge'].includes(selected?.kind)) { centerNode(id); return; }
    let wasOpen = expandedId === id;
    if (graph.sequence && selected?.kind === 'fragment') {
      let ancestor = expandedId;
      const seen = new Set();
      while (ancestor && !seen.has(ancestor)) { if (ancestor === id) { wasOpen = true; break; } seen.add(ancestor); ancestor = graph.nodes.find(n => n.id === ancestor)?.parent; }
    }
    expandedId = wasOpen ? graph.sequence ? selected.parent : null : id;
    byId('collapse-all').disabled = !expandedId;
    await arrange({ anchor: id, focus: !wasOpen, keyboardFocus: id });
  }
  function searchNode() {
    const term = nodeSearch.value.trim().toLowerCase();
    if (!term || !graph) return null;
    return graph.nodes.find(n => `${n.group ? n.group + '.' : ''}${n.name}`.toLowerCase() === term) || graph.nodes.find(n => n.name.toLowerCase() === term) || graph.nodes.find(n => `${n.group}.${n.name}`.toLowerCase().includes(term));
  }
  async function focusSearch() {
    const node = searchNode();
    if (!node) { status.textContent = 'Choose an element name from the search suggestions.'; return; }
    namespaceSelect.value = ''; focusId = node.id; expandedId = node.id;
    byId('collapse-all').disabled = false;
    await arrange({ focus: true, keyboardFocus: node.id });
  }
  function updateSearchOptions() {
    const choices = byId('node-options'); choices.replaceChildren();
    for (const node of graph?.nodes || []) { const option = element('option'); option.value = node.group ? `${node.group}.${node.name}` : node.name; option.label = node.name; choices.append(option); }
  }
  function resetFilters() {
    namespaceSelect.value = ''; nodeSearch.value = ''; focusId = null; expandedId = null;
    byId('collapse-all').disabled = true;
    arrange({ fit: true });
  }
  async function setPresentation(mode, force = false) {
    if (!['interactive','plantuml','source'].includes(mode)) return;
    if (!force && mode === presentation) return;
    if (!force) saveCamera();
    presentation = mode;
    const selectedId = diagram.id;
    request++;
    const live = interactive();
    world.hidden = !live; staticWorld.hidden = mode !== 'plantuml'; sourceView.hidden = mode !== 'source';
    byId('graph-filters').hidden = !live; byId('collapse-all').hidden = !live;
    byId('graph-count').hidden = !live; byId('canvas-empty').hidden = true;
    document.querySelector('.zoom-controls').hidden = mode === 'source';
    viewport.style.touchAction = mode === 'source' ? 'auto' : 'none';
    byId('canvas-label').textContent = live ? interactiveLabel : mode === 'source' ? 'Shared PUML source' : 'PlantUML preview';
    byId('interaction-hint').textContent = live ? interactiveHint : mode === 'source' ? 'This is the same PUML used for the interactive view and the PlantUML preview.' : 'Same diagram definition · Drag to pan · Scroll to zoom';
    for (const [id,value] of [['view-interactive','interactive'],['view-plantuml','plantuml'],['view-puml','source']]) byId(id).setAttribute('aria-pressed', String(mode === value));
    status.textContent = '';
    if (mode === 'source') {
      byId('puml-source').textContent = diagram.puml || '';
      byId('puml-source-path').textContent = diagram.source;
      return;
    }
    if (live) {
      if (!scene) { await arrange({ fit:true }); if (presentation === mode && diagram.id === selectedId) restoreCamera(); }
      else if (!restoreCamera()) fit();
      return;
    }
    const renderedHash = globalThis.GARAGE_UML_PREVIEWS?.[diagram.id];
    if (!diagram.pumlHash || renderedHash !== diagram.pumlHash) {
      staticWorld.hidden = true;
      status.textContent = 'The PlantUML preview needs a refresh. Run the UML render command in the guide to update both views together.';
      return;
    }
    status.textContent = 'Loading PlantUML preview…';
    staticImage.alt = `${diagram.title} — PlantUML`;
    const source = `${diagram.svg}?source=${diagram.pumlHash.slice(0,12)}`;
    if (staticImage.getAttribute('src') !== source) staticImage.src = source;
    if (staticImage.complete && staticImage.naturalWidth) { status.textContent = ''; if (!restoreCamera()) fit(); }
  }
  async function selectView(id, updateHash = true) {
    saveCamera();
    catalogueOpen = false;
    selectedStory = null; byId('story-detail').hidden = true;
    byId('diagram-content').hidden = false;
    byId('use-case-catalogue').hidden = true;
    byId('open-use-cases').removeAttribute('aria-current');
    if (!diagrams.has(id)) id = 'garage-classes';
    diagram = diagrams.get(id); graph = data.views[id] || null;
    presentationCameras.delete(`${id}:interactive`);
    request++; expandedId = null; focusId = null; scene = null; nodeSearch.value = ''; namespaceSelect.replaceChildren();
    const all = element('option', '', 'All namespaces'); all.value = ''; namespaceSelect.append(all);
    namespaceSelect.value = '';
    for (const group of [...new Set((graph?.nodes || []).map(n => n.group).filter(Boolean))].sort()) { const option = element('option', '', group); option.value = group; namespaceSelect.append(option); }
    // Start large projects at a readable level; every type remains available through search or Show all.
    if (graph?.type === 'class' && graph.nodes.length > 12) {
      const groups = [...new Set(graph.nodes.map(n => n.group).filter(Boolean))];
      const preferred = ['.Models', '.Menus', '.Presentation', '.Vehicles'].map(suffix => groups.find(g => g.endsWith(suffix))).find(Boolean);
      namespaceSelect.value = preferred || groups.sort((a, b) => graph.nodes.filter(n => n.group === b).length - graph.nodes.filter(n => n.group === a).length)[0] || '';
    }
    if (['activity','interaction-overview'].includes(graph?.type) && graph.nodes.length > 14) focusId = graph.nodes.find(n => n.kind === 'decision')?.id || null;
    byId('namespace-field').hidden = !graph || graph.type !== 'class';
    byId('graph-filters').hidden = !graph;
    byId('collapse-all').hidden = !graph; byId('collapse-all').disabled = true;
    byId('graph-count').textContent = '';
    byId('canvas-empty').hidden = true;
    byId('show-all').hidden = true;
    byId('view-title').textContent = diagram.title;
    byId('view-kind').textContent = `${['sequence','communication','interaction-overview','timing'].includes(diagram.type) ? 'INTERACTION' : ['use-case','activity','state-machine'].includes(diagram.type) ? 'BEHAVIORAL' : 'STRUCTURAL'} / ${diagram.type.toUpperCase()}`;
    byId('view-description').textContent = diagram.origin === 'interaction' ? 'Generated from the same interaction as the sequence. Open an element for its messages, guards and sequence context.' : diagram.origin === 'stories' ? 'Generated from your user stories. Open an element to read its goal and linked sources.' : diagram.maintenance === 'generated' ? 'A live view of the code. Open a card to explore its details; use Show all for the complete project.' : diagram.type === 'timing' && diagram.status === 'template' ? 'An illustrative timeline linked to the parking story. Actual durations and deadlines need timing requirements or measured traces.' : diagram.status === 'template' ? 'An interactive modeling template. Its example values and flows are illustrative.' : 'An interactive view of the reviewed UML source. Open an element to explore its details.';
    byId('source-link').href = diagram.source; byId('export-link').href = diagram.svg;
    byId('canvas-label').textContent = ({class:'Classes & relationships',component:'Project dependencies',package:'Projects & namespaces',sequence:'Lifelines & interactions',activity:'Actions & decisions','state-machine':'States & transitions','use-case':'Actors & capabilities',deployment:'Runtime & deployment',object:'Object snapshot','composite-structure':'Parts & connectors',profile:'Modeling conventions',communication:'Objects & numbered messages','interaction-overview':'Interaction flow',timing:'State over time'})[diagram.type] || 'Interactive diagram';
    byId('maintenance-badge').textContent = diagram.status === 'template' ? 'Template' : diagram.origin === 'interaction' ? 'Generated from sequence' : diagram.origin === 'stories' ? 'Generated from stories' : diagram.maintenance === 'generated' ? 'Generated from code' : 'Reviewed diagram';
    byId('interaction-hint').textContent = graph?.sequence ? 'Open alt frames to reveal branches · Click messages for details · Scroll to zoom' : 'Click an element to expand · Drag background to pan · Scroll to zoom';
    interactiveLabel = byId('canvas-label').textContent;
    interactiveHint = byId('interaction-hint').textContent;
    byId('view-caption').textContent = ({class:'Solid hollow-triangle arrows show inheritance; dashed arrows show implementation. Namespace panels group independent clusters. External bases appear inside the expanded card.',component:'Arrows follow declared project references. Open a project to explore its details.',package:'Project boxes contain namespaces; arrows represent exact project references.',sequence:'Read messages from top to bottom. Dashed vertical lines are lifelines; dashed horizontal arrows are replies. Alternative frames start folded; opening a nested frame keeps its outer context.',activity:'Follow control arrows from the start to a final node. Diamonds represent decisions or merges; arrow labels preserve the source guards.','state-machine':'Transitions preserve their triggers, guards and actions. A self-loop returns to the same state. Open a state to read its notes.','use-case':'Actors sit outside the system boundary; ellipses represent user capabilities. Open a capability to read its notes.',deployment:'Nested frames preserve device and runtime containment. Artifacts and local files retain their deployment relationships.',object:'Instance names and attribute values describe a snapshot. A filled diamond marks the owning object.','composite-structure':'The frame groups the application parts; labeled connectors show their collaboration.',profile:'Metaclasses and stereotypes preserve the illustrative profile notation. This template is not an executable UML metamodel.',communication:'Connections group calls and replies between participants. Expand an object for all numbered messages and their guards; Open sequence restores the source context.','interaction-overview':'Interaction reference nodes are connected through decisions and merge points.',timing:'Horizontal position represents time; vertical levels represent states. Click a time point for details. Units remain illustrative.'})[diagram.type] || '';
    nodeSearch.closest('label').querySelector('.field-label').textContent = diagram.type === 'class' ? 'Find a class' : 'Find an element';
    nodeSearch.placeholder = diagram.type === 'class' ? 'Type a class name…' : 'Type an element name…';
    const notesPanel = byId('view-notes'); const notesBody = byId('view-notes-content'); notesBody.replaceChildren(); notesPanel.hidden = !graph?.notes?.length;
    for (const note of graph?.notes || []) notesBody.append(element('p', '', note));
    const legend = document.querySelector('.mini-legend');
    const legends = ({class:[['─▷','Inherits'],['╌▷','Implements']],component:[['→','References']],package:[['→','References']],sequence:[['→','Call'],['⇢','Reply'],['alt','Alternative paths']],activity:[['●','Start'],['◇','Decision / merge'],['◎','Final']],'interaction-overview':[['ref','Interaction'],['◇','Decision']],'state-machine':[['●','Initial'],['→','Transition']],'use-case':[['♙','Actor'],['⬭','Use case']],deployment:[['▣','Device / runtime'],['▤','Artifact'],['⇢','Dependency']],object:[['◆','Composition']],timing:[['└─','State change'],['|','Time point']]})[diagram.type] || [['→','Connection']];
    for (const old of [...legend.querySelectorAll('span')]) old.remove();
    for (const [glyph,label] of legends) { const entry = element('span'); entry.append(element('b','legend-glyph',glyph),document.createTextNode(label)); legend.insertBefore(entry,byId('legend-button')); }
    for (const button of document.querySelectorAll('[data-view-id]')) {
      if (button.dataset.viewId === id) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
    }
    const related = byId('related-views'); related.replaceChildren(element('span', '', 'RELATED'));
    for (const relatedId of diagram.related) { const target = diagrams.get(relatedId); if (!target) continue; const button = element('button', '', target.title); button.type = 'button'; button.addEventListener('click', () => selectView(relatedId)); related.append(button); }
    for (const storyId of diagram.storyIds || []) { const story = (data.stories || []).find(s => s.id === storyId); if (!story) continue; const button = element('button', '', 'Story: ' + story.title); button.type = 'button'; button.addEventListener('click', () => selectStory(storyId)); related.append(button); }
    updateSearchOptions();
    if (updateHash && location.hash.slice(1) !== id) history.replaceState(null, '', '#' + id);
    fitted = true;
    await setPresentation(presentation, true);
  }

  let selectedStory = null;
  function selectStory(id, updateHash = true) {
    const story = (data.stories || []).find(s => s.id === id);
    if (!story) return selectCatalogue(updateHash);
    saveCamera(); request++; catalogueOpen = true; selectedStory = id;
    byId('diagram-content').hidden = true; byId('use-case-catalogue').hidden = true;
    byId('open-use-cases').setAttribute('aria-current', 'page');
    for (const button of document.querySelectorAll('[data-view-id]')) button.removeAttribute('aria-current');
    const panel = byId('story-detail'); panel.hidden = false; panel.replaceChildren();
    const back = element('button', 'quiet-button', '← All use-case stories'); back.type = 'button'; back.addEventListener('click', () => selectCatalogue()); panel.append(back);
    panel.append(element('p', 'eyebrow', `${story.priority.toUpperCase()} STORY · ${story.id}`), element('h1', '', story.title), element('p', 'story-goal', story.goal), element('p', 'story-meta', `Actor: ${story.actor} · Requirements: ${story.requirements.join(', ') || 'None'}`));
    const source = element('a', '', 'Story Markdown ↗'); source.href = '../../' + story.source.split('/').map(encodeURIComponent).join('/'); source.target = '_blank'; source.rel = 'noopener'; panel.append(source);
    panel.append(element('h2', '', 'Diagrams for this story'));
    const diagramLinks = element('div', 'story-diagram-links');
    for (const id of story.diagrams) {
      const target = diagrams.get(id); if (!target) continue;
      const button = element('button', 'story-diagram-link'); button.type = 'button';
      button.append(element('strong', '', target.title), element('span', '', target.status === 'template' ? 'Illustrative template · linked to story' : target.type === 'class' ? 'Shared project structure' : target.origin === 'stories' ? 'Requirements · generated from story' : target.origin === 'interaction' ? 'Implementation · shared sequence data' : target.maintenance === 'generated' ? 'Implementation · generated from code' : 'Implementation · reviewed view'));
      button.addEventListener('click', () => selectView(id)); diagramLinks.append(button);
    }
    panel.append(diagramLinks, element('h2', '', 'Linked code'));
    panel.append(element('p', 'story-meta', 'These links identify related implementation. They do not certify complete behavior or test coverage.'));
    if (!story.implementations.length) panel.append(element('p', '', 'No code annotation linked yet.'));
    const codeList = element('ul', 'story-code-links');
    for (const implementation of story.implementations) {
      const item = element('li'); const link = element('a', '', implementation.member); link.href = '../../' + implementation.source.split('/').map(encodeURIComponent).join('/'); link.target = '_blank'; link.rel = 'noopener'; item.append(link); codeList.append(item);
    }
    panel.append(codeList);
    for (const interaction of Object.values(data.interactions || {}).filter(i => i.storyId === story.id)) {
      const paths = element('details', 'story-interaction-paths'); paths.append(element('summary', '', `Source interaction branches (${interaction.branches.length})`));
      paths.append(element('p', 'story-meta', 'Explore guarded source branches. Each link opens its enclosing sequence alternatives.'));
      const list = element('ul');
      for (const branch of interaction.branches) {
        const item = element('li'); const button = element('button', 'quiet-button', ['otherwise','else'].includes(branch.label) ? 'Otherwise: ' + branch.frameLabel : branch.label); button.type = 'button'; button.dataset.branchId = branch.id;
        button.title = [...branch.parentIds.map(id => interaction.branches.find(b => b.id === id)?.label || id), branch.label].join(' → ');
        button.addEventListener('click', () => openReference({diagramId:interaction.id,nodeId:branch.fragmentId})); item.append(button); list.append(item);
      }
      paths.append(list); panel.append(paths);
    }
    const steps = element('ol'); for (const step of story.flow) steps.append(element('li', '', step.text)); panel.append(element('h2', '', 'Flow'), steps);
    const alternatives = element('ul'); for (const alternative of story.alternatives) { const item = element('li'); item.append(element('strong', '', alternative.condition + ': '), document.createTextNode(alternative.response)); alternatives.append(item); } panel.append(element('h2', '', 'Alternatives'), alternatives);
    const done = element('ul'); for (const condition of story.done) done.append(element('li', '', condition)); panel.append(element('h2', '', 'Done when'), done);
    if (updateHash) history.replaceState(null, '', '#story/' + id);
  }
  function selectCatalogue(updateHash = true) {
    saveCamera(); request++; catalogueOpen = true;
    selectedStory = null; byId('story-detail').hidden = true;
    byId('diagram-content').hidden = true; byId('use-case-catalogue').hidden = false;
    byId('open-use-cases').setAttribute('aria-current', 'page');
    for (const button of document.querySelectorAll('[data-view-id]')) button.removeAttribute('aria-current');
    if (!byId('use-case-frame').getAttribute('src')) byId('use-case-frame').src = 'use-cases.generated.html';
    if (updateHash) history.replaceState(null, '', '#use-cases');
  }
  async function openReference(reference) {
    await selectView(reference.diagramId);
    if (catalogueOpen || diagram?.id !== reference.diagramId) return;
    await setPresentation('interactive');
    if (catalogueOpen || diagram?.id !== reference.diagramId) return;
    if (graph?.nodes.some(n => n.id === reference.nodeId)) await toggleNode(reference.nodeId);
  }
  byId('open-use-cases').addEventListener('click', () => selectCatalogue());
  for (const button of document.querySelectorAll('[data-view-id]')) button.addEventListener('click', () => selectView(button.dataset.viewId));
  byId('diagram-count').textContent = String(diagrams.size);
  byId('view-interactive').addEventListener('click', () => setPresentation('interactive'));
  byId('view-plantuml').addEventListener('click', () => setPresentation('plantuml'));
  byId('view-puml').addEventListener('click', () => setPresentation('source'));
  byId('diagram-search').addEventListener('input', event => {
    const term = event.target.value.trim().toLowerCase();
    for (const button of document.querySelectorAll('[data-view-id]')) button.hidden = !button.dataset.search.toLowerCase().includes(term);
    for (const group of document.querySelectorAll('.nav-group')) group.hidden = ![...group.querySelectorAll('[data-view-id]')].some(b => !b.hidden);
  });
  byId('zoom-in').addEventListener('click', () => zoomTo(camera.zoom * 1.25));
  byId('zoom-out').addEventListener('click', () => zoomTo(camera.zoom / 1.25));
  byId('actual-size').addEventListener('click', () => zoomTo(1));
  byId('fit-view').addEventListener('click', () => fit(true));
  byId('collapse-all').addEventListener('click', () => { expandedId = null; byId('collapse-all').disabled = true; arrange({ fit: true }); });
  byId('focus-node').addEventListener('click', focusSearch);
  nodeSearch.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); focusSearch(); } });
  namespaceSelect.addEventListener('change', () => { focusId = null; expandedId = null; byId('collapse-all').disabled = true; arrange({ fit: true }); });
  byId('show-all').addEventListener('click', resetFilters); byId('clear-filter').addEventListener('click', resetFilters);
  const dialog = byId('symbol-dialog');
  byId('help-button').addEventListener('click', () => dialog.showModal()); byId('legend-button').addEventListener('click', () => dialog.showModal());
  byId('close-help').addEventListener('click', () => dialog.close()); dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  byId('fullscreen').addEventListener('click', async () => {
    try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.querySelector('.diagram-workbench').requestFullscreen(); }
    catch { status.textContent = 'Fullscreen is unavailable here. The normal diagram canvas remains interactive.'; }
  });
  staticImage.addEventListener('load', () => { if (presentation === 'plantuml' && staticImage.getAttribute('src') === `${diagram.svg}?source=${diagram.pumlHash?.slice(0,12)}`) { status.textContent = ''; if (!restoreCamera()) fit(); } });
  staticImage.addEventListener('error', () => { if (presentation === 'plantuml') status.textContent = 'Preview unavailable. Run the render command in the maintenance guide to refresh both views.'; });
  viewport.addEventListener('wheel', event => {
    if (presentation === 'source') return;
    if (event.target.closest('.entity-body') && !event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    const rect = viewport.getBoundingClientRect();
    zoomTo(camera.zoom * Math.exp(-Math.max(-120, Math.min(120, event.deltaY)) * .0025), { x: event.clientX - rect.left, y: event.clientY - rect.top });
  }, { passive: false });
  viewport.addEventListener('pointerdown', event => {
    if (presentation === 'source') return;
    const memberBody = event.target.closest('.entity-body');
    if (memberBody && event.pointerType === 'touch') {
      event.preventDefault();
      memberTouches.set(event.pointerId, { body: memberBody, y: event.clientY, top: memberBody.scrollTop });
      viewport.setPointerCapture(event.pointerId);
      return;
    }
    if (event.target.closest('.graph-entity,button,a,input,select') || event.button > 0) return;
    event.preventDefault(); viewport.focus({ preventScroll: true });
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    viewport.setPointerCapture(event.pointerId);
    if (pointers.size === 2) { const [a,b] = [...pointers.values()]; pinch = { distance: Math.hypot(a.x-b.x,a.y-b.y), zoom: camera.zoom }; drag = null; }
    else drag = { x: event.clientX, y: event.clientY, cameraX: camera.x, cameraY: camera.y };
    viewport.classList.add('panning');
  });
  viewport.addEventListener('pointermove', event => {
    const memberTouch = memberTouches.get(event.pointerId);
    if (memberTouch) { memberTouch.body.scrollTop = memberTouch.top + memberTouch.y - event.clientY; return; }
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pinch && pointers.size === 2) {
      const [a,b] = [...pointers.values()]; const rect = viewport.getBoundingClientRect();
      zoomTo(pinch.zoom * Math.hypot(a.x-b.x,a.y-b.y) / Math.max(1,pinch.distance), { x:(a.x+b.x)/2-rect.left,y:(a.y+b.y)/2-rect.top });
    } else if (drag) { camera.x = drag.cameraX + event.clientX - drag.x; camera.y = drag.cameraY + event.clientY - drag.y; fitted = false; applyCamera(); }
  });
  for (const type of ['pointerup','pointercancel','lostpointercapture']) viewport.addEventListener(type, event => { memberTouches.delete(event.pointerId); pointers.delete(event.pointerId); pinch = null; drag = null; viewport.classList.remove('panning'); });
  viewport.addEventListener('keydown', event => {
    if (presentation === 'source') return;
    if (event.target !== viewport) return;
    if (event.key === '+' || event.key === '=') { event.preventDefault(); zoomTo(camera.zoom * 1.25); }
    else if (event.key === '-') { event.preventDefault(); zoomTo(camera.zoom / 1.25); }
    else if (event.key === '0' || event.key.toLowerCase() === 'f') { event.preventDefault(); fit(true); }
    else if (event.key.startsWith('Arrow')) { event.preventDefault(); const shifts = { ArrowLeft:[60,0],ArrowRight:[-60,0],ArrowUp:[0,60],ArrowDown:[0,-60] }; const [x,y]=shifts[event.key]; camera.x+=x;camera.y+=y;fitted=false;applyCamera(); }
  });
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(() => {
    const size = `${viewport.clientWidth}:${viewport.clientHeight}`;
    if (size === priorSize) return; priorSize = size;
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => { if (interactive()) arrange({ fit: fitted, anchor: fitted ? null : expandedId }); else if (presentation === 'plantuml' && fitted) fit(); });
  }).observe(viewport);
  window.addEventListener('hashchange', () => { const id=location.hash.slice(1);if(id.startsWith('story/'))selectStory(id.slice(6),false);else if(id==='use-cases')selectCatalogue(false);else if(diagrams.has(id)&&(catalogueOpen||selectedStory||id!==diagram?.id))selectView(id,false); });
  globalThis.GarageExplorer = { selectView, selectCatalogue, selectStory, openReference, setPresentation, fit, zoomTo, toggleNode, focusSearch, resetFilters, getState: () => ({ diagram:selectedStory?'story/'+selectedStory:catalogueOpen?'use-cases':diagram?.id,presentation,expandedId,focusId,camera:{...camera},scene,visibleGraph:graph?filteredGraph():null }) };
  if(location.hash.slice(1).startsWith('story/'))selectStory(location.hash.slice(7),false);else if(location.hash.slice(1)==='use-cases')selectCatalogue(false);else selectView(location.hash.slice(1) || 'garage-classes', false);
})();
