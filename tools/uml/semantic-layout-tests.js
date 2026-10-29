const assert = require('node:assert/strict');
const ELK = require('../../docs/uml/vendor/elk.bundled.js');
const semantic = require('../../docs/uml/semantic-layout.js');
require('../../docs/uml/diagrams.generated.js');
const data = globalThis.GARAGE_UML_DATA;
const elk = new ELK();
const options = { elk, width:1100, direction:'AUTO', aspectRatio:1100/600 };
let count = 0;
function pass(label) { count++; console.log('PASS: ' + label); }
function geometry(scene) {
  assert(Number.isFinite(scene.width) && scene.width > 0 && Number.isFinite(scene.height) && scene.height > 0);
  for (const node of scene.nodes) for (const property of ['x','y','width','height']) assert(Number.isFinite(node[property]), node.id + ' ' + property);
  for (const edge of scene.edges) { assert(edge.points.length >= 2, edge.id); for (const point of edge.points) assert(Number.isFinite(point.x) && Number.isFinite(point.y)); }
  for (let i=0;i<scene.nodes.length;i++) for(let j=i+1;j<scene.nodes.length;j++) {
    const a=scene.nodes[i],b=scene.nodes[j];
    assert(!(a.x < b.x+b.width-.1 && a.x+a.width>b.x+.1 && a.y<b.y+b.height-.1 && a.y+a.height>b.y+.1), 'Overlapping interactive elements: '+a.name+' / '+b.name);
  }
}
function inside(node,frame) { return node.x>=frame.x && node.y>=frame.y && node.x+node.width<=frame.x+frame.width+.1 && node.y+node.height<=frame.y+frame.height+.1; }

(async()=>{
  assert.equal(Object.keys(data.views).length,data.diagrams.length);
  for (const diagram of data.diagrams) assert(data.views[diagram.id]);
  pass('every diagram, including the four remaining templates, has a live model');
  for (const diagram of data.diagrams) { const scene=await semantic.layout(data.views[diagram.id],options); geometry(scene); }
  pass(`all ${data.diagrams.length} diagram views render finite non-overlapping interactive geometry`);

  const sequence=data.views['parking-sequence'];
  const folded=await semantic.layout(sequence,options);
  assert.equal(folded.lifelines.length,sequence.sequence.participants.length);
  assert(folded.nodes.length<sequence.nodes.length && folded.height<800);
  pass('sequence starts with readable lifelines and folded alternative frames');
  const outer=sequence.sequence.items.find(item=>item.kind==='fragment');
  const open=await semantic.layout(sequence,{...options,expandedId:outer.id}); geometry(open);
  assert(open.edges.length>folded.edges.length && open.marks.filter(m=>m.kind==='branch').length===outer.branches.length);
  pass('opening a sequence alternative reveals its guarded branches and messages');
  const nested=outer.branches.flatMap(branch=>branch.items).find(item=>item.kind==='fragment');
  const nestedOpen=await semantic.layout(sequence,{...options,expandedId:nested.id});geometry(nestedOpen);
  assert(nestedOpen.groups.some(group=>group.id===outer.id)&&nestedOpen.groups.some(group=>group.id===nested.id));
  assert(nestedOpen.nodes.some(node=>node.id===nested.branches[0].items[0].id));
  pass('nested sequence expansion retains its enclosing alternative context');

  const deployment=data.views['local-deployment']; const deployScene=await semantic.layout(deployment,options);
  const runtime=deployment.nodes.find(n=>n.name.startsWith('.NET'));
  const runtimeFrame=deployScene.groups.find(g=>g.id===runtime.id);
  const workstationFrame=deployScene.groups.find(g=>g.id===runtime.parent);
  assert(inside(runtimeFrame,workstationFrame));
  for (const child of deployment.nodes.filter(n=>n.parent===runtime.id)) assert(inside(deployScene.nodes.find(n=>n.id===child.id),runtimeFrame));
  pass('deployment preserves workstation, runtime and artifact containment');
  const expandedRuntime=await semantic.layout(deployment,{...options,expandedId:runtime.id});geometry(expandedRuntime);
  assert(expandedRuntime.nodes.find(n=>n.id===runtime.id).height>deployScene.nodes.find(n=>n.id===runtime.id).height);
  pass('deployment container details expand without covering child artifacts');

  const useCases=data.views['garage-use-cases'];const useScene=await semantic.layout(useCases,options);
  const actor=useScene.nodes.find(n=>n.kind==='actor');const boundary=useScene.groups[0];
  assert(!inside(actor,boundary));for(const node of useScene.nodes.filter(n=>n.kind==='use-case'))assert(inside(node,boundary));
  pass('use-case actors remain outside the system boundary');
  const activity=data.views['parking-activity'];const activityScene=await semantic.layout(activity,options);
  assert(activityScene.nodes.some(n=>n.kind==='decision')&&activityScene.nodes.some(n=>n.kind==='merge'));
  assert(activityScene.edges.filter(e=>e.label).every(e=>e.labelPosition));
  pass('activity decisions, merges and source guard labels are retained');
  const states=data.views['parking-spot-state'];const stateScene=await semantic.layout(states,options);
  assert(stateScene.edges.some(e=>e.source===e.target&&e.points.length>2));
  pass('state self-transitions receive a routed loop');

  const interaction=data.interactions['parking-sequence'];
  const communication=data.views['parking-communication'];
  assert.equal(communication.nodes.length,sequence.sequence.participants.length);
  assert.deepEqual(communication.edges.flatMap(e=>e.messageIds).sort(),interaction.messages.map(m=>m.id).sort());
  assert(communication.nodes.every(n=>n.storyId===interaction.storyId&&n.reference.diagramId===interaction.id));
  const service=communication.nodes.find(n=>n.name==='Garage.Services.GarageService');
  const expandedCommunication=await semantic.layout(communication,{...options,expandedId:service.id});geometry(expandedCommunication);
  assert(expandedCommunication.nodes.find(n=>n.id===service.id).height>150);
  pass('communication keeps all shared messages and expands their guarded details without overlap');
  const overview=data.views['parking-interaction-overview'];
  const reference=overview.nodes.find(n=>n.kind==='interaction');
  assert(overview.nodes.filter(n=>['interaction','decision'].includes(n.kind)).every(n=>n.reference&&sequence.nodes.some(s=>s.id===n.reference.nodeId)));
  const expandedOverview=await semantic.layout(overview,{...options,expandedId:reference.id});geometry(expandedOverview);
  assert(overview.interactionId===interaction.id&&overview.nodes.filter(n=>n.kind==='interaction').length>4);
  pass('generated overview references actual sequence elements and expands source segments without overlap');

  const timing=data.views['parking-timing'];const timeScene=await semantic.layout(timing,options);geometry(timeScene);
  const [first,second,third]=timing.timing.lanes[0].samples;
  const a=timeScene.nodes.find(n=>n.id===first.id),b=timeScene.nodes.find(n=>n.id===second.id),c=timeScene.nodes.find(n=>n.id===third.id);
  assert(a.x<b.x&&b.x<c.x&&a.y===c.y&&a.y!==b.y);
  pass('timing uses time horizontally and state levels vertically');
  const sampleOpen=await semantic.layout(timing,{...options,expandedId:second.id});geometry(sampleOpen);
  assert(sampleOpen.nodes.find(n=>n.id===second.id).height>100&&sampleOpen.edges.some(e=>e.kind==='timing-trace'));
  pass('time-point details open while the signal trace remains visible');
  assert.equal(data.diagrams.find(d=>d.id==='parking-timing').status,'template');
  assert.deepEqual(data.diagrams.find(d=>d.id==='parking-timing').storyIds,['park-vehicle']);
  assert(timing.notes.some(note=>note.includes('no deadline')));
  pass('timing is story-linked and explicitly illustrative while duration requirements are absent');
  console.log(count+' authored diagram layout checks passed.');
})().catch(error=>{console.error(error);process.exitCode=1});
