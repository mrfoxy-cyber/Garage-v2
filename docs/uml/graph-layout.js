/* ELK computes connected relationships; shelf packing keeps independent types readable. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.GarageGraphLayout = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';

  const GAP = 28;
  const GROUP_PADDING = 20;
  const GROUP_HEADER = 40;
  const compare = (a, b) => a < b ? -1 : a > b ? 1 : 0;

  function nodeSize(node, expandedId) {
    if (node.kind === 'initial' || node.kind === 'final') return { width: 38, height: 38 };
    if (node.kind === 'merge') return { width: 28, height: 28 };
    if (node.id !== expandedId && node.kind === 'decision') return { width: 208, height: 116 };
    if (node.id !== expandedId && node.kind === 'actor') return { width: 112, height: 126 };
    if (node.id !== expandedId && node.kind === 'use-case') return { width: 244, height: 86 };
    if (node.id !== expandedId && ['action','interaction','state'].includes(node.kind)) return { width: 252, height: Math.max(76, 36 + Math.ceil(node.name.length / 28) * 17) };
    if (node.id !== expandedId) return { width: 248, height: 86 };
    const lines = (node.members || []).reduce((count, member) => count + Math.max(1, Math.ceil(String(member).length / 49)), 0);
    return { width: 400, height: Math.min(480, Math.max(180, 132 + lines * 22)) };
  }

  function validate(view) {
    if (!view || !Array.isArray(view.nodes) || !Array.isArray(view.edges)) throw new Error('A diagram needs nodes and edges arrays.');
    const ids = new Set();
    for (const node of view.nodes) {
      if (typeof node.id !== 'string' || !node.id || ids.has(node.id)) throw new Error(`Invalid or duplicate graph node: ${node.id}`);
      ids.add(node.id);
    }
    const edgeIds = new Set();
    for (const edge of view.edges) {
      if (typeof edge.id !== 'string' || !edge.id || edgeIds.has(edge.id)) throw new Error(`Invalid or duplicate graph edge: ${edge.id}`);
      edgeIds.add(edge.id);
      if (!ids.has(edge.source) || !ids.has(edge.target)) throw new Error(`Unresolved graph edge: ${edge.id}`);
    }
  }

  function components(view) {
    const byId = new Map(view.nodes.map(node => [node.id, node]));
    const adjacent = new Map(view.nodes.map(node => [node.id, []]));
    for (const edge of view.edges) {
      adjacent.get(edge.source).push(edge.target);
      adjacent.get(edge.target).push(edge.source);
    }
    const visited = new Set();
    const result = [];
    for (const start of [...byId.keys()].sort(compare)) {
      if (visited.has(start)) continue;
      const pending = [start];
      const ids = new Set();
      visited.add(start);
      while (pending.length) {
        const id = pending.pop();
        ids.add(id);
        for (const neighbor of adjacent.get(id)) if (!visited.has(neighbor)) {
          visited.add(neighbor);
          pending.push(neighbor);
        }
      }
      result.push({
        id: start,
        nodes: [...ids].sort(compare).map(id => byId.get(id)),
        edges: view.edges.filter(edge => ids.has(edge.source)).sort((a, b) => compare(a.id, b.id))
      });
    }
    return result;
  }

  function finite(value) { return typeof value === 'number' && Number.isFinite(value); }

  function shift(scene, x, y) {
    return {
      ...scene,
      nodes: scene.nodes.map(node => ({ ...node, x: node.x + x, y: node.y + y })),
      edges: scene.edges.map(edge => ({
        ...edge,
        points: edge.points.map(point => ({ x: point.x + x, y: point.y + y })),
        ...(edge.labelPosition ? { labelPosition: { x: edge.labelPosition.x + x, y: edge.labelPosition.y + y } } : {})
      })),
      groups: scene.groups.map(group => ({ ...group, x: group.x + x, y: group.y + y }))
    };
  }

  function targetWidth(rectangles, viewportWidth, aspect) {
    const largest = Math.max(...rectangles.map(rect => rect.width));
    const area = rectangles.reduce((sum, rect) => sum + (rect.width + GAP) * (rect.height + GAP), 0);
    // World coordinates may exceed viewport pixels. Capping this at viewport width
    // made large namespace panels stack into an unnecessarily tall scroll strip.
    return Math.max(largest, Math.sqrt(area * aspect));
  }

  function shelf(sorted, limit) {
    const placements = [];
    let x = 0, y = 0, rowHeight = 0, width = 0;
    for (const rectangle of sorted) {
      if (x > 0 && x + rectangle.width > limit) {
        x = 0;
        y += rowHeight + GAP;
        rowHeight = 0;
      }
      placements.push({ rectangle, x, y });
      width = Math.max(width, x + rectangle.width);
      x += rectangle.width + GAP;
      rowHeight = Math.max(rowHeight, rectangle.height);
    }
    return { width, height: y + rowHeight, placements };
  }

  function fitCost(scene, aspect) {
    return Math.max(scene.width / aspect, scene.height);
  }

  function pack(rectangles, viewportWidth, aspect) {
    if (!rectangles.length) return { width: 0, height: 0, placements: [] };
    const sorted = [...rectangles].sort((a, b) => b.height - a.height || b.width - a.width || compare(a.id, b.id));
    const ideal = targetWidth(rectangles, viewportWidth, aspect);
    const largest = Math.max(...rectangles.map(rectangle => rectangle.width));
    const candidates = new Set([largest, Math.max(largest, viewportWidth)]);
    for (const factor of [0.6, 0.8, 1, 1.15, 1.35, 1.6, 2]) candidates.add(Math.max(largest, ideal * factor));
    // Include exact row-width thresholds so e.g. three small classes can choose
    // a balanced 2+1 row layout instead of an accidental vertical stack.
    let rowWidth = 0;
    for (const rectangle of sorted) {
      rowWidth += rectangle.width + (rowWidth > 0 ? GAP : 0);
      candidates.add(Math.max(largest, rowWidth));
    }
    let best = null;
    for (const width of [...candidates].sort((a, b) => a - b)) {
      const candidate = shelf(sorted, width);
      if (!best || fitCost(candidate, aspect) < fitCost(best, aspect) - 0.01 ||
          (Math.abs(fitCost(candidate, aspect) - fitCost(best, aspect)) < 0.01 && candidate.width * candidate.height < best.width * best.height)) best = candidate;
    }
    return best;
  }

  async function layoutComponent(component, elk, options) {
    const dimensions = new Map(component.nodes.map(node => [node.id, nodeSize(node, options.expandedId)]));
    if (component.nodes.length === 1 && component.edges.length === 0) {
      const original = component.nodes[0];
      const size = dimensions.get(original.id);
      return { id: component.id, ...size, nodes: [{ ...original, ...size, x: 0, y: 0 }], edges: [], groups: [] };
    }
    if (!elk || typeof elk.layout !== 'function') throw new Error('An ELK layout engine is required for connected diagrams.');
    const graph = {
      id: `component:${component.id}`,
      layoutOptions: {
        'elk.algorithm': 'layered',
        'elk.direction': options.direction,
        'elk.edgeRouting': 'ORTHOGONAL',
        'elk.spacing.nodeNode': '30',
        'elk.layered.spacing.nodeNodeBetweenLayers': '76',
        'elk.spacing.edgeNode': '20',
        'elk.padding': '[top=16,left=16,bottom=16,right=16]',
        'elk.layered.considerModelOrder.strategy': 'NODES_AND_EDGES',
        'elk.randomSeed': '1'
      },
      children: component.nodes.map(node => ({ id: node.id, ...dimensions.get(node.id) })),
      edges: component.edges.map(edge => ({
        id: edge.id,
        sources: [edge.source],
        targets: [edge.target],
        ...(options.edgeLabels && edge.label ? { labels: [{ id: `${edge.id}:label`, text: edge.label, width: Math.min(220, edge.label.length * 6.5 + 8), height: Math.max(16, Math.ceil(edge.label.length / 32) * 14) }] } : {})
      }))
    };
    const laidOut = await elk.layout(graph);
    if (!finite(laidOut.width) || !finite(laidOut.height)) throw new Error(`ELK returned invalid bounds for ${component.id}.`);
    const positioned = new Map((laidOut.children || []).map(node => [node.id, node]));
    const routed = new Map((laidOut.edges || []).map(edge => [edge.id, edge]));
    const nodes = component.nodes.map(original => {
      const position = positioned.get(original.id);
      if (!position || !finite(position.x) || !finite(position.y)) throw new Error(`ELK did not position ${original.id}.`);
      return { ...original, ...dimensions.get(original.id), x: position.x, y: position.y };
    });
    const edges = component.edges.map(original => {
      const route = routed.get(original.id);
      const sections = route?.sections || [];
      const points = [];
      for (const section of sections) {
        for (const point of [section.startPoint, ...(section.bendPoints || []), section.endPoint]) {
          if (!point || !finite(point.x) || !finite(point.y)) throw new Error(`Invalid route for ${original.id}.`);
          const previous = points[points.length - 1];
          if (!previous || previous.x !== point.x || previous.y !== point.y) points.push({ x: point.x, y: point.y });
        }
      }
      if (points.length < 2) throw new Error(`ELK did not route ${original.id}.`);
      const label = route.labels?.[0];
      return {
        ...original,
        points,
        ...(label && finite(label.x) && finite(label.y) ? { labelPosition: { x: label.x + label.width / 2, y: label.y + label.height / 2 } } : {})
      };
    });
    return { id: component.id, width: laidOut.width, height: laidOut.height, nodes, edges, groups: [] };
  }

  async function layoutInDirection(view, options, viewportWidth, aspect, direction) {
    const settings = { expandedId: options.expandedId, direction, edgeLabels: options.edgeLabels === true };
    const scenes = [];
    // Sequential requests avoid oversubscribing ELK's local worker with many small components.
    for (const component of components(view)) scenes.push(await layoutComponent(component, options.elk, settings));

    const namespaceBuckets = new Map();
    const ungrouped = [];
    for (const scene of scenes) {
      const names = [...new Set(scene.nodes.map(node => node.group || ''))];
      if (names.length !== 1 || names[0] === '') { ungrouped.push(scene); continue; }
      if (!namespaceBuckets.has(names[0])) namespaceBuckets.set(names[0], []);
      namespaceBuckets.get(names[0]).push(scene);
    }
    let best = null;
    // A namespace panel's individually best shape is not always best inside the
    // complete diagram. Try a few panel aspect ratios, then judge the whole view.
    for (const panelFactor of [0.65, 1, 1.4, 1.9]) {
      const units = [...ungrouped];
      for (const [namespace, content] of [...namespaceBuckets].sort(([a], [b]) => compare(a, b))) {
        const packed = pack(content, Math.max(320, viewportWidth - 2 * GROUP_PADDING), aspect * panelFactor);
        const width = packed.width + 2 * GROUP_PADDING;
        const height = packed.height + GROUP_HEADER + GROUP_PADDING;
        const translated = packed.placements.map(({ rectangle, x, y }) => shift(rectangle, x + GROUP_PADDING, y + GROUP_HEADER));
        units.push({
          id: `namespace:${namespace}`, width, height,
          nodes: translated.flatMap(scene => scene.nodes),
          edges: translated.flatMap(scene => scene.edges),
          groups: [{ id: `namespace:${namespace}`, label: namespace, x: 0, y: 0, width, height }]
        });
      }
      const packed = pack(units, viewportWidth, aspect);
      const placed = packed.placements.map(({ rectangle, x, y }) => shift(rectangle, x + GAP, y + GAP));
      const candidate = {
        width: packed.width + 2 * GAP,
        height: packed.height + 2 * GAP,
        direction,
        nodes: placed.flatMap(scene => scene.nodes).sort((a, b) => compare(a.id, b.id)),
        edges: placed.flatMap(scene => scene.edges).sort((a, b) => compare(a.id, b.id)),
        groups: placed.flatMap(scene => scene.groups).sort((a, b) => compare(a.id, b.id))
      };
      if (!best || fitCost(candidate, aspect) < fitCost(best, aspect)) best = candidate;
    }
    return best;
  }

  async function layout(view, options = {}) {
    validate(view);
    if (!view.nodes.length) return { width: 0, height: 0, nodes: [], edges: [], groups: [] };
    const viewportWidth = finite(options.width) ? Math.max(320, options.width) : 1000;
    const aspect = finite(options.aspectRatio) ? Math.max(0.65, Math.min(2, options.aspectRatio)) : Math.max(0.9, Math.min(1.8, viewportWidth / 660));
    if (options.direction === 'RIGHT' || options.direction === 'DOWN') return layoutInDirection(view, options, viewportWidth, aspect, options.direction);
    const right = await layoutInDirection(view, options, viewportWidth, aspect, 'RIGHT');
    // Isolated types have no directed ranks, so rotating does not change layout.
    if (!view.edges.length) return right;
    const down = await layoutInDirection(view, options, viewportWidth, aspect, 'DOWN');
    return fitCost(down, aspect) < fitCost(right, aspect) ? down : right;
  }

  return { layout, nodeSize };
});
