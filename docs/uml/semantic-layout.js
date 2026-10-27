/* Type-specific UML geometry. Authored semantics come from PlantUML, not inferred code behavior. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.GarageSemanticLayout=api;})(typeof globalThis==='object'?globalThis:this,function(){
  'use strict';
  const core=()=>typeof GarageGraphLayout!=='undefined'?GarageGraphLayout:require('./graph-layout.js');
  function size(node,expandedId){return core().nodeSize(node,expandedId);}
  function visiblePath(view,id){const ids=new Set();const byId=new Map(view.nodes.map(n=>[n.id,n]));while(id&&byId.has(id)&&!ids.has(id)){ids.add(id);id=byId.get(id).parent;}return ids;}

  function sequence(view,options){
    const lookup=new Map(view.nodes.map(n=>[n.id,n]));
    const path=visiblePath(view,options.expandedId);
    const participants=view.sequence.participants.map(id=>lookup.get(id));
    const step=226,margin=42,width=Math.max(620,participants.length*step+margin*2);
    const columns=new Map(participants.map((n,i)=>[n.id,margin+i*step+100]));
    const nodes=[],edges=[],groups=[],lifelines=[],marks=[];
    const headerSize=p=>p.id===options.expandedId?Math.min(260,size(p,options.expandedId).height):p.kind==='actor'?126:86;
    const headerHeight=Math.max(...participants.map(headerSize));
    for(const p of participants){nodes.push({...p,x:columns.get(p.id)-100,y:28,width:200,height:headerSize(p)});}
    let y=headerHeight+66;
    function rows(items,depth=0){
      for(const item of items){
        const original=lookup.get(item.id);
        if(!original)throw Error('Unknown sequence element '+item.id);
        if(item.kind==='fragment'){
          const open=path.has(item.id);const x=18+depth*15;const w=width-x*2;
          const top=y;
          nodes.push({...original,x,y,width:w,height:42,fragmentHeader:true,frameOpen:open}); y+=54;
          if(open){
            for(const branch of item.branches){marks.push({kind:'branch',x:x+14,y:y+12,text:'['+branch.label+']',width:w-28});y+=36;rows(branch.items,depth+1);y+=12;}
          }
          groups.push({id:item.id,label:'',x:x-5,y:top-6,width:w+10,height:y-top+3,fragment:true});
          y+=22;
        }else if(item.kind==='note'){
          const h=item.id===options.expandedId?Math.min(260,size(original,options.expandedId).height):68;
          nodes.push({...original,x:margin+96,y,width:Math.min(600,width-margin*2-96),height:h,note:true});y+=h+20;
        }else{
          const from=columns.get(item.source),to=columns.get(item.target);
          if(from===undefined||to===undefined)throw Error('Unknown lifeline for '+item.id);
          const open=item.id===options.expandedId;
          const left=Math.max(32,Math.min(from,to));
          const available=Math.max(230,Math.abs(to-from)-24);
          const w=open?Math.min(410,width-80):Math.min(360,available);
          const x=Math.min(width-w-24,Math.max(24,(from+to-w)/2));
          const h=open?Math.min(210,size(original,options.expandedId).height):48;
          nodes.push({...original,x,y,width:w,height:h,messageHeader:!open});
          const arrowY=y+h+13;
          const points=from===to?[{x:from,y:arrowY},{x:from+46,y:arrowY},{x:from+46,y:arrowY+22},{x:from,y:arrowY+22}]:[{x:from,y:arrowY},{x:to,y:arrowY}];
          edges.push({id:item.id+':arrow',source:item.source,target:item.target,kind:item.reply?'reply':'message',label:item.label,points});
          y=arrowY+(from===to?46:30);
        }
      }
    }
    rows(view.sequence.items);
    for(const p of participants)lifelines.push({id:p.id,x:columns.get(p.id),y:28+headerSize(p),bottom:y+20});
    return{width,height:y+55,nodes,edges,groups,lifelines,marks,direction:'SEQUENCE'};
  }

  function timing(view,options){
    const lookup=new Map(view.nodes.map(n=>[n.id,n]));
    const all=view.timing.lanes.flatMap(l=>l.samples);
    const min=Math.min(...all.map(s=>s.time)),max=Math.max(...all.map(s=>s.time));
    const width=Math.max(850,Math.min(1250,options.width||1100)),left=280,right=width-80;
    const timeX=t=>left+(t-min)/Math.max(1,max-min)*(right-left);
    const nodes=[],edges=[],groups=[],marks=[];
    let top=50;
    for(const lane of view.timing.lanes){
      const states=[...new Set(lane.samples.map(s=>s.state))];
      const bandHeight=Math.max(220,states.length*58+60);
      const yFor=s=>top+62+states.indexOf(s)*58;
      const laneNode=lookup.get(lane.id);
      nodes.push({...laneNode,x:24,y:top+18,width:176,height:options.expandedId===lane.id?Math.min(220,size(laneNode,options.expandedId).height):76});
      for(const state of states)marks.push({kind:'state-label',x:left-18,y:yFor(state)+4,text:state});
      groups.push({id:lane.id,label:'',x:12,y:top-12,width:width-24,height:bandHeight,timing:true});
      const points=[];
      for(let i=0;i<lane.samples.length;i++){
        const sample=lane.samples[i],x=timeX(sample.time),y=yFor(sample.state);
        if(i)points.push({x,y:yFor(lane.samples[i-1].state)});
        points.push({x,y});
        const original=lookup.get(sample.id),open=sample.id===options.expandedId;
        nodes.push({...original,x:open?Math.min(width-315,x-30):x-8,y:open?top+bandHeight+48:y-8,width:open?290:16,height:open?180:16,timingPoint:true});
        if(open)edges.push({id:sample.id+':callout',source:sample.id,target:sample.id,kind:'dependency',label:'selected time point',points:[{x,y},{x,y:top+bandHeight+48}]});
        marks.push({kind:'tick',x,y:top+bandHeight-18,text:String(sample.time)});
      }
      edges.push({id:lane.id+':wave',source:lane.id,target:lane.id,kind:'timing-trace',label:lane.name,points});
      marks.push({kind:'axis',x:left,y:top+bandHeight-18,toX:right,text:'Time (illustrative units)'});
      top+=bandHeight+(lane.samples.some(s=>s.id===options.expandedId)?250:25);
    }
    return{width:width+(options.expandedId?200:0),height:top+55,nodes,edges,groups,marks,direction:'TIMING'};
  }

  async function compound(view,options){
    const childMap=new Map();for(const node of view.nodes){const parent=node.parent||'';if(!childMap.has(parent))childMap.set(parent,[]);childMap.get(parent).push(node);}
    const make=node=>{
      const children=childMap.get(node.id);
      if(!children?.length)return{id:node.id,...size(node,options.expandedId)};
      return{id:node.id,layoutOptions:{'elk.padding':`[top=${node.id===options.expandedId?210:58},left=24,bottom=24,right=24]`,'elk.algorithm':'layered','elk.direction':view.type==='use-case'?'DOWN':'RIGHT','elk.spacing.nodeNode':'26'},children:children.map(make)};
    };
    const result=await options.elk.layout({id:view.id,layoutOptions:{'elk.algorithm':'layered','elk.hierarchyHandling':'INCLUDE_CHILDREN','elk.direction':'RIGHT','elk.edgeRouting':'ORTHOGONAL','elk.layered.spacing.nodeNodeBetweenLayers':'65','elk.padding':'[top=28,left=28,bottom=28,right=28]'},children:(childMap.get('')||[]).map(make),edges:view.edges.map(e=>({id:e.id,sources:[e.source],targets:[e.target],...(e.label?{labels:[{text:e.label,width:Math.min(210,e.label.length*6),height:30}]}:{})}))});
    const lookup=new Map(view.nodes.map(n=>[n.id,n])),edgeLookup=new Map(view.edges.map(e=>[e.id,e]));
    const nodes=[],edges=[],groups=[];
    function walk(parent,ox=0,oy=0){
      for(const item of parent.children||[]){
        const original=lookup.get(item.id),x=ox+item.x,y=oy+item.y;
        if(item.children?.length){
          groups.push({id:item.id,label:'',x,y,width:item.width,height:item.height,container:true});
          nodes.push({...original,x:x+10,y:y+8,width:item.width-20,height:item.id===options.expandedId?180:36,containerHeader:true});
          walk(item,x,y);
        }else nodes.push({...original,x,y,width:item.width,height:item.height});
      }
      for(const edge of parent.edges||[]){
        const original=edgeLookup.get(edge.id);if(!original)continue;
        const points=[];for(const section of edge.sections||[])for(const p of[section.startPoint,...(section.bendPoints||[]),section.endPoint])points.push({x:ox+p.x,y:oy+p.y});
        const label=edge.labels?.[0];edges.push({...original,points,...(label?{labelPosition:{x:ox+label.x+label.width/2,y:oy+label.y+label.height/2}}:{})});
      }
    }
    walk(result);
    return{width:result.width,height:result.height,nodes,edges,groups,direction:'COMPOUND'};
  }

  async function layout(view,options){
    if(view.sequence)return sequence(view,options);
    if(view.timing)return timing(view,options);
    const ids=new Set(view.nodes.map(n=>n.id));
    if(view.nodes.some(n=>n.parent&&ids.has(n.parent)))return compound(view,options);
    return core().layout(view,{...options,edgeLabels:!['class','component','package'].includes(view.type)});
  }
  return{layout};
});
