'use strict';
const fs=require('fs');
const assert=require('assert');
const app=fs.readFileSync('app.js','utf8');
const scripts=JSON.parse(fs.readFileSync('data/original-card-scripts.json','utf8'));
const handlers={};
for(const row of Object.values(scripts))for(const event of Object.keys(row.scripts||row.events||row))handlers[event]=(handlers[event]||0)+1;
assert.strictEqual(handlers.Begin_Refresh,110,'expected recovered Begin_Refresh handlers');
assert.strictEqual(handlers.End_Refresh,6,'expected recovered End_Refresh handlers');
assert.strictEqual(handlers.Out_Of_Play,22,'expected recovered Out_Of_Play handlers');
for(const marker of [
  'participants.push({page:p,owner:owner||k})',
  "runOriginalCardEvent(event,owner,page",
  "'#event_owner':side(owner)",
  "dispatchOriginalEvent('Begin_Refresh',k)",
  "dispatchOriginalEvent('End_Refresh',k)",
  "dispatchOriginalEvent('Out_Of_Play',k,e.card||e"
])assert(app.includes(marker),`missing persistent lifecycle integration: ${marker}`);
// Regression: two identical source pages may exist for opposite owners and must not dedupe each other.
function collect(k,event,primary,state,hasScript){
  const seen=new Set(),participants=[];
  const other=x=>x==='player'?'cpu':'player';
  const add=(p,owner)=>{if(!p||!hasScript(p,event))return;const key=`${owner||''}:${String(p.sourceFile||p.id||p.name)}`;if(seen.has(key))return;seen.add(key);participants.push({page:p,owner:owner||k})};
  add(primary,k);
  for(const who of [k,other(k)])for(const entry of state[who].inPlay)add(entry.card||entry,who);
  return participants;
}
const shared={name:'Shared Persistent',sourceFile:'Shared.gac',scripts:{Begin_Refresh:'(WADrawPage #this)'}};
const participants=collect('player','Begin_Refresh',null,{player:{inPlay:[shared]},cpu:{inPlay:[shared]}},(p,e)=>!!p.scripts?.[e]);
assert.deepStrictEqual(participants.map(x=>x.owner),['player','cpu'],'persistent scripts must execute for their actual owner');
console.log(JSON.stringify({pass:true,handlers:{Begin_Refresh:handlers.Begin_Refresh,End_Refresh:handlers.End_Refresh,Out_Of_Play:handlers.Out_Of_Play},owners:participants.map(x=>x.owner)},null,2));
