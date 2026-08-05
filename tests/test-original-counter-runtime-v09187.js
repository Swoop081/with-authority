'use strict';
const fs=require('fs');
const assert=require('assert');
const app=fs.readFileSync('app.js','utf8');
const scripts=JSON.parse(fs.readFileSync('data/original-card-scripts.json','utf8'));
const handlers={};
for(const [file,row] of Object.entries(scripts))for(const event of Object.keys(row.scripts||row.events||row)){
  handlers[event]=(handlers[event]||0)+1;
}
assert.strictEqual(handlers.Can_Auto_Counter,12,'expected recovered Can_Auto_Counter handlers');
assert.strictEqual(handlers.Affect_Auto_Counter,13,'expected recovered Affect_Auto_Counter handlers');
assert.strictEqual(handlers.AI_AutoDitch,2,'expected recovered AI_AutoDitch handlers');
for(const marker of [
  "originalBooleanGate('Can_Auto_Counter'",
  "runOriginalCardEvent('Affect_Auto_Counter'",
  "runOriginalCardEvent('AI_AutoDitch'",
  'state.proposedMove=c',
  'certifyNoPartialCounterResolution',
  'originalAutoDitchScores',
  'getCounterCertification'
])assert(app.includes(marker),`missing runtime integration: ${marker}`);

function handValue(card){return card.sourceFile==='WillToWin.gac'?3:1}
function exact(cards,target){let found=null;function visit(i,total,p){if(total===target){found=p;return}if(found||total>target||i>=cards.length)return;visit(i+1,total,p);visit(i+1,total+handValue(cards[i]),p.concat(cards[i]));}visit(0,0,[]);return found;}
const hand=[{name:'Will to Win',sourceFile:'WillToWin.gac'},{name:'Dodge'},{name:'Duck'},{name:'Up and Over'},{name:'Momentum'}];
const plan=exact(hand,7);assert(plan&&plan.reduce((n,c)=>n+handValue(c),0)===7,'Autocounter payment must equal cost exactly');
console.log(JSON.stringify({pass:true,handlers:{Can_Auto_Counter:handlers.Can_Auto_Counter,Affect_Auto_Counter:handlers.Affect_Auto_Counter,AI_AutoDitch:handlers.AI_AutoDitch},exactPayment:7},null,2));
