// Uses the real bundled ELK engine; no DOM or application build is needed.
const assert = require('node:assert/strict');
const ELK = require('../../docs/uml/vendor/elk.bundled.js');
const { layout } = require('../../docs/uml/graph-layout.js');

const node = (id, group = '', members = []) => ({ id, name: id, kind: 'class', group, members, files: [], declaration: `class ${id}`, bases: [] });
const edge = (id, source, target, kind = 'inheritance') => ({ id, source, target, kind, label: kind });
const elk = new ELK();
let count = 0;
function pass(name) { console.log(`PASS: ${name}`); count++; }
function validGeometry(scene, original) {
  assert.equal(scene.nodes.length, original.nodes.length);
  assert.equal(scene.edges.length, original.edges.length);
  const byId = new Map(scene.nodes.map(n => [n.id, n]));
  for (const n of scene.nodes) {
    for (const value of [n.x, n.y, n.width, n.height]) assert(Number.isFinite(value));
    assert(n.x >= 0 && n.y >= 0 && n.width > 0 && n.height > 0);
    assert(n.x + n.width <= scene.width + 0.01 && n.y + n.height <= scene.height + 0.01);
  }
  for (let i = 0; i < scene.nodes.length; i++) for (let j = i + 1; j < scene.nodes.length; j++) {
    const a = scene.nodes[i], b = scene.nodes[j];
    assert(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y, `Overlapping nodes ${a.id}, ${b.id}`);
  }
  for (const e of scene.edges) {
    assert(byId.has(e.source) && byId.has(e.target));
    assert(e.points.length >= 2);
    for (const p of e.points) assert(Number.isFinite(p.x) && Number.isFinite(p.y));
    const source = byId.get(e.source), target = byId.get(e.target);
    const within = (p, n) => p.x >= n.x - 0.1 && p.x <= n.x + n.width + 0.1 && p.y >= n.y - 0.1 && p.y <= n.y + n.height + 0.1;
    assert(within(e.points[0], source), `Route must begin at source ${e.id}`);
    assert(within(e.points.at(-1), target), `Route must end at target ${e.id}`);
  }
}

(async function () {
  assert.deepEqual(await layout({ nodes: [], edges: [] }), { width: 0, height: 0, nodes: [], edges: [], groups: [] });
  pass('empty filtered diagrams return valid empty scenes');
  const isolated = { nodes: Array.from({ length: 24 }, (_, i) => node(`n${String(i).padStart(2, '0')}`, 'Garage.Models')), edges: [] };
  const isolatedScene = await layout(isolated, { width: 1100 });
  validGeometry(isolatedScene, isolated);
  assert(isolatedScene.width < 1600 && isolatedScene.height < 1500, 'Independent classes should pack into rows rather than a single strip.');
  assert.equal(isolatedScene.groups.length, 1);
  assert.equal(isolatedScene.groups[0].label, 'Garage.Models');
  pass('independent classes pack into a bounded namespace panel without needing ELK');

  const connected = { nodes: [node('Car', 'Garage.Vehicles'), node('Vehicle', 'Garage.Vehicles'), node('Bus', 'Garage.Vehicles')], edges: [edge('car-base', 'Car', 'Vehicle'), edge('bus-base', 'Bus', 'Vehicle')] };
  const connectedScene = await layout(connected, { elk, width: 1100, direction: 'RIGHT' });
  validGeometry(connectedScene, connected);
  pass('inheritance arrows are routed from each child to its parent');

  const longMembers = Array.from({ length: 40 }, (_, i) => `public SomeLongResultType Process${i}(string parameter)`);
  const expandable = { ...connected, nodes: connected.nodes.map(n => n.id === 'Car' ? { ...n, members: longMembers } : n) };
  const expandedScene = await layout(expandable, { elk, expandedId: 'Car', width: 1100 });
  validGeometry(expandedScene, expandable);
  const expanded = expandedScene.nodes.find(n => n.id === 'Car');
  assert.equal(expanded.width, 400);
  assert.equal(expanded.height, 480);
  assert.equal(expandedScene.nodes.find(n => n.id === 'Bus').width, 248);
  pass('one expanded class gets bounded member space and neighboring nodes reflow');

  const mixed = { nodes: [node('Consumer', 'App.UI'), node('Service', 'App.Domain'), node('Test', 'App.Tests'), node('Helper', 'App.Tests')], edges: [edge('uses', 'Consumer', 'Service', 'reference')] };
  const mixedScene = await layout(mixed, { elk, width: 900, direction: 'DOWN' });
  validGeometry(mixedScene, mixed);
  assert.deepEqual(mixedScene.groups.map(g => g.label), ['App.Tests']);
  pass('cross-namespace relationships remain connected without false namespace containment');

  const parallel = { nodes: [node('A'), node('B')], edges: [edge('one', 'A', 'B'), edge('two', 'A', 'B', 'realization')] };
  validGeometry(await layout(parallel, { elk }), parallel);
  pass('parallel semantic relationships retain distinct routed edges');

  const shuffled = { nodes: [...connected.nodes].reverse(), edges: [...connected.edges].reverse() };
  assert.deepEqual(await layout(shuffled, { elk, width: 1100, direction: 'RIGHT' }), connectedScene);
  pass('layout is deterministic when model enumeration order changes');

  await assert.rejects(() => layout({ nodes: [node('A')], edges: [edge('bad', 'A', 'Missing')] }, { elk }), /Unresolved graph edge/);
  await assert.rejects(() => layout({ nodes: [node('A'), node('A')], edges: [] }, { elk }), /duplicate graph node/);
  pass('missing endpoints and duplicate nodes fail explicitly');

  const sparse = { nodes: Array.from({ length: 80 }, (_, i) => node(`sparse-${String(i).padStart(2, '0')}`, `Namespace.${Math.floor(i / 10)}`)), edges: [] };
  const sparseScene = await layout(sparse, { width: 1100, aspectRatio: 1100 / 600 });
  validGeometry(sparseScene, sparse);
  assert(sparseScene.width / sparseScene.height > 1 && sparseScene.width / sparseScene.height < 3, 'Large all-types views should form a balanced scene, not a viewport-width-capped strip.');
  pass('many namespace panels pack to the viewport aspect without a hard world-width cap');

  require('../../docs/uml/diagrams.generated.js');
  const realViews = Object.values(globalThis.GARAGE_UML_DATA.views).filter(view => ['class','component','package'].includes(view.type));
  assert(realViews.some(view => view.nodes.length > 28), 'Real-data coverage must include the large Vehicle graph.');
  for (const view of realViews) {
    const scene = await layout(view, { elk, width: 1100, aspectRatio: 1100 / 600, direction: 'AUTO' });
    validGeometry(scene, view);
    assert(['RIGHT', 'DOWN'].includes(scene.direction));
  }
  pass('all generated Garage views retain valid geometry and routed endpoints');

  const realClass = realViews.find(view => view.type === 'class' && view.nodes.length > 28);
  const namespace = realClass.nodes.find(n => n.group).group;
  const scopeNodes = realClass.nodes.filter(n => n.group === namespace);
  const scopeIds = new Set(scopeNodes.map(n => n.id));
  const scope = { ...realClass, nodes: scopeNodes, edges: realClass.edges.filter(e => scopeIds.has(e.source) && scopeIds.has(e.target)) };
  const scopeScene = await layout(scope, { elk, width: 1100, aspectRatio: 1100 / 600, direction: 'AUTO' });
  const scopeExpanded = await layout(scope, { elk, width: 1100, aspectRatio: 1100 / 600, direction: scopeScene.direction, expandedId: scope.nodes[0].id });
  validGeometry(scopeExpanded, scope);
  assert.equal(scopeExpanded.direction, scopeScene.direction);
  assert.equal(scopeExpanded.nodes.find(n => n.id === scope.nodes[0].id).width, 400);
  pass('a real namespace scope keeps its chosen orientation when one class expands');

  console.log(`${count} graph layout checks passed.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
