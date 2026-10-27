(() => {
  'use strict';
  const data = globalThis.GARAGE_UML_DATA;
  const byId = id => document.getElementById(id);
  const viewport = byId('graph-viewport');
  const status = byId('layout-status');
  if (!data || !globalThis.ELK || !globalThis.GarageGraphLayout) {
    status.textContent = 'The diagram data or layout library could not load. Regenerate the diagrams and refresh the page.';
    return;
  }
  const elk = new ELK();
  const diagrams = new Map(data.diagrams.map(d => [d.id, d]));
  const world = byId('graph-world');
  const staticWorld = byId('static-world');
  const staticImage = byId('static-diagram');
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
  const pointers = new Map();
  let pinch = null;
  const memberTouches = new Map();
  const SVG_NS = 'http://www.w3.org/2000/svg';

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
    const target = graph ? world : staticWorld;
    world.classList.toggle('camera-animate', animate && !!graph);
    staticWorld.classList.toggle('camera-animate', animate && !graph);
    target.style.transform = `translate(${camera.x}px,${camera.y}px) scale(${camera.zoom})`;
    viewport.style.backgroundSize = `${Math.max(5, 20 * camera.zoom)}px ${Math.max(5, 20 * camera.zoom)}px`;
    viewport.style.backgroundPosition = `${camera.x}px ${camera.y}px`;
    byId('zoom-level').value = `${Math.round(camera.zoom * 100)}%`;
  }
  function dimensions() {
    return graph ? { width: scene?.width || 1, height: scene?.height || 1 } : { width: staticImage.naturalWidth || 1, height: staticImage.naturalHeight || 1 };
  }
  function fit(animate = false) {
    const size = dimensions();
    if (!viewport.clientWidth || !size.width || (!graph && !staticImage.naturalWidth)) return;
    const padding = 42;
    camera.zoom = Math.min(1.15, Math.max(.04, Math.min((viewport.clientWidth - padding * 2) / size.width, (viewport.clientHeight - padding * 2) / size.height)));
    camera.x = (viewport.clientWidth - size.width * camera.zoom) / 2;
    camera.y = (viewport.clientHeight - size.height * camera.zoom) / 2;
    fitted = true;
    applyCamera(animate);
  }
  function zoomTo(value, point) {
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
      const box = element('div', 'namespace-group');
      Object.assign(box.style, { left: `${group.x}px`, top: `${group.y}px`, width: `${group.width}px`, height: `${group.height}px` });
      box.append(element('span', '', group.label || '(global namespace)'));
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
    defs.append(triangle, arrow); edgeLayer.append(defs);
    for (const edge of edges) {
      if (!edge.points?.length) continue;
      const active = edge.source === expandedId || edge.target === expandedId;
      const path = svg('path', { d: edge.points.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' '), class: `graph-edge ${edge.kind}${active ? ' active' : expandedId ? ' dimmed' : ''}`, 'marker-end': `url(#${edge.kind === 'reference' ? 'uml-arrow' : 'uml-triangle'})` });
      const title = svg('title'); title.textContent = edge.label; path.append(title); edgeLayer.append(path);
      if (edge.kind === 'reference' && edge.labelPosition) {
        const label = svg('text', { x: edge.labelPosition.x, y: edge.labelPosition.y, class: 'graph-edge-label', 'text-anchor': 'middle' });
        label.textContent = 'references'; edgeLayer.append(label);
      }
    }
  }
  function renderNodes(nodes, restoreFocusId) {
    nodeLayer.replaceChildren();
    for (const node of nodes) {
      const open = node.id === expandedId;
      const card = element('article', `graph-entity kind-${node.kind.replace(/\s+/g, '-')}${open ? ' expanded' : ''}`);
      card.dataset.nodeId = node.id;
      Object.assign(card.style, { left: `${node.x}px`, top: `${node.y}px`, width: `${node.width}px`, height: `${node.height}px` });
      const header = element('button', 'entity-header'); header.type = 'button';
      header.setAttribute('aria-expanded', String(open));
      header.setAttribute('aria-label', `${open ? 'Collapse' : 'Expand'} ${node.name}`);
      const badge = node.kind === 'interface' ? 'I' : node.kind === 'enum' ? 'E' : node.kind.includes('struct') ? 'S' : node.kind === 'component' ? '◇' : node.kind === 'package' ? 'P' : 'C';
      const title = element('span', 'entity-heading');
      title.append(element('span', 'entity-name', node.name), element('span', 'entity-namespace', node.group || node.kind));
      header.append(element('span', 'entity-icon', badge), title, element('span', 'entity-chevron', open ? '−' : '+'));
      header.addEventListener('click', () => toggleNode(node.id));
      card.append(header);
      if (open) {
        const body = element('div', 'entity-body'); body.tabIndex = 0;
        body.setAttribute('aria-label', `${node.name} members`);
        if (node.declaration) body.append(element('pre', 'entity-declaration', node.declaration));
        for (const member of node.members) body.append(element('div', 'entity-member', member));
        if (!node.members.length) body.append(element('div', 'entity-member', 'No declared members.'));
        if (node.bases.length) body.append(element('div', 'entity-base-note', `Base types / interfaces: ${node.bases.join(', ')}`));
        card.append(body);
        const footer = element('div', 'entity-footer');
        footer.append(element('span', '', `${node.members.length} ${graph.type === 'package' ? 'namespaces' : 'declared members'}`));
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
    if (!graph) return;
    const ticket = ++request;
    const filtered = filteredGraph();
    byId('canvas-empty').hidden = filtered.nodes.length !== 0;
    byId('graph-count').textContent = `${filtered.nodes.length}${filtered.nodes.length !== graph.nodes.length ? ' / ' + graph.nodes.length : ''} ${graph.type === 'class' ? 'types' : 'projects'} · ${filtered.edges.length} links`;
    byId('show-all').hidden = !focusId && !namespaceSelect.value;
    status.textContent = filtered.nodes.length ? 'Arranging diagram…' : '';
    const previous = options.anchor ? scene?.nodes.find(n => n.id === options.anchor) : null;
    const priorScreen = previous ? { x: camera.x + previous.x * camera.zoom, y: camera.y + previous.y * camera.zoom } : null;
    try {
      const next = await GarageGraphLayout.layout(filtered, { elk, expandedId, width: viewport.clientWidth, direction: options.fit ? 'AUTO' : scene?.direction || 'AUTO', aspectRatio: Math.max(.6, viewport.clientWidth / Math.max(300, viewport.clientHeight)) });
      if (ticket !== request) return;
      scene = next;
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
    const wasOpen = expandedId === id;
    expandedId = wasOpen ? null : id;
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
    if (!node) { status.textContent = 'Choose a class or project name from the search suggestions.'; return; }
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
  async function selectView(id, updateHash = true) {
    if (!diagrams.has(id)) id = 'garage-classes';
    diagram = diagrams.get(id); graph = data.views[id] || null;
    request++; expandedId = null; focusId = null; scene = null; nodeSearch.value = ''; namespaceSelect.replaceChildren();
    const all = element('option', '', 'All namespaces'); all.value = ''; namespaceSelect.append(all);
    for (const group of [...new Set((graph?.nodes || []).map(n => n.group).filter(Boolean))].sort()) { const option = element('option', '', group); option.value = group; namespaceSelect.append(option); }
    // Start large projects at a readable level; every type remains available through search or Show all.
    if (graph?.type === 'class' && graph.nodes.length > 12) {
      const groups = [...new Set(graph.nodes.map(n => n.group).filter(Boolean))];
      const preferred = ['.Models', '.Menus', '.Presentation', '.Vehicles'].map(suffix => groups.find(g => g.endsWith(suffix))).find(Boolean);
      namespaceSelect.value = preferred || groups.sort((a, b) => graph.nodes.filter(n => n.group === b).length - graph.nodes.filter(n => n.group === a).length)[0] || '';
    }
    byId('namespace-field').hidden = !graph || graph.type !== 'class';
    byId('graph-filters').hidden = !graph;
    byId('collapse-all').hidden = !graph; byId('collapse-all').disabled = true;
    byId('graph-count').textContent = '';
    byId('canvas-empty').hidden = true;
    byId('show-all').hidden = true;
    byId('view-title').textContent = diagram.title;
    byId('view-kind').textContent = `${['sequence','communication','interaction-overview','timing'].includes(diagram.type) ? 'INTERACTION' : ['use-case','activity','state-machine'].includes(diagram.type) ? 'BEHAVIORAL' : 'STRUCTURAL'} / ${diagram.type.toUpperCase()}`;
    byId('view-description').textContent = graph ? 'A live view of the code. Open a card to explore its details; use Show all for the complete project.' : 'A reviewed workflow or modeling template, with pan and zoom.';
    byId('source-link').href = diagram.source; byId('export-link').href = diagram.svg;
    byId('canvas-label').textContent = graph ? graph.type === 'class' ? 'Classes & relationships' : graph.type === 'component' ? 'Project dependencies' : 'Projects & namespaces' : 'Diagram preview';
    byId('maintenance-badge').textContent = diagram.status === 'template' ? 'Template' : graph ? 'Generated from code' : 'Reviewed diagram';
    byId('interaction-hint').textContent = graph ? 'Click a card to expand · Drag background to pan · Scroll to zoom' : 'Drag to pan · Scroll to zoom · Fit view to reset';
    byId('view-caption').textContent = graph ? graph.type === 'class' ? 'Solid hollow-triangle arrows show inheritance; dashed hollow-triangle arrows show interface implementation. Namespace panels group independent clusters; cross-namespace connections keep their namespace badges. External or unresolved bases appear inside the expanded card.' : 'Arrows follow declared project references. Open a project to see its metadata or namespaces.' : diagram.status === 'template' ? 'Illustrative template. Its values and flows are a starting point for a reviewed diagram.' : 'This authored view is tracked against source changes. Source and SVG exports remain available.';
    for (const button of document.querySelectorAll('[data-view-id]')) {
      if (button.dataset.viewId === id) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
    }
    const related = byId('related-views'); related.replaceChildren(element('span', '', 'RELATED'));
    for (const relatedId of diagram.related) { const target = diagrams.get(relatedId); if (!target) continue; const button = element('button', '', target.title); button.type = 'button'; button.addEventListener('click', () => selectView(relatedId)); related.append(button); }
    world.hidden = !graph; staticWorld.hidden = !!graph;
    updateSearchOptions();
    if (updateHash && location.hash.slice(1) !== id) history.replaceState(null, '', '#' + id);
    fitted = true;
    if (graph) await arrange({ fit: true });
    else {
      nodeLayer.replaceChildren(); groupLayer.replaceChildren(); edgeLayer.replaceChildren(); status.textContent = 'Loading diagram…';
      staticImage.alt = diagram.title; staticImage.src = diagram.svg;
      if (staticImage.complete && staticImage.naturalWidth) { status.textContent = ''; fit(); }
    }
  }

  for (const button of document.querySelectorAll('[data-view-id]')) button.addEventListener('click', () => selectView(button.dataset.viewId));
  byId('diagram-count').textContent = String(diagrams.size);
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
  staticImage.addEventListener('load', () => { if (!graph) { status.textContent = ''; fit(); } });
  staticImage.addEventListener('error', () => { if (!graph) status.textContent = 'Preview unavailable. Run the render command in the maintenance guide to create the SVG.'; });
  viewport.addEventListener('wheel', event => {
    if (event.target.closest('.entity-body') && !event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    const rect = viewport.getBoundingClientRect();
    zoomTo(camera.zoom * Math.exp(-Math.max(-120, Math.min(120, event.deltaY)) * .0025), { x: event.clientX - rect.left, y: event.clientY - rect.top });
  }, { passive: false });
  viewport.addEventListener('pointerdown', event => {
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
    resizeFrame = requestAnimationFrame(() => { if (graph) arrange({ fit: fitted, anchor: fitted ? null : expandedId }); else if (fitted) fit(); });
  }).observe(viewport);
  window.addEventListener('hashchange', () => { const id=location.hash.slice(1);if(diagrams.has(id)&&id!==diagram?.id)selectView(id,false); });
  globalThis.GarageExplorer = { selectView, fit, zoomTo, toggleNode, focusSearch, resetFilters, getState: () => ({ diagram:diagram?.id,expandedId,focusId,camera:{...camera},scene,visibleGraph:graph?filteredGraph():null }) };
  selectView(location.hash.slice(1) || 'garage-classes', false);
})();
