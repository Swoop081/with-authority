'use strict';
const fs=require('fs'),vm=require('vm');
const {WAInterpreter}=require('./wa-script-interpreter-core.js');
const {WAGameStateAdapter}=require('./wa-game-state-adapter.js');
const asts=JSON.parse(fs.readFileSync('./data/original-card-script-asts.json','utf8'));
const cards=JSON.parse(fs.readFileSync('./data/demo-cards.json','utf8'));
const bySource=new Map(cards.map(c=>[c.sourceFile,c]));
function page(i,owner){return {id:`p${i}`,unid:`u${i}`,baseUNID:`b${i}`,name:`Page ${i}`,sourceFile:`Page${i}.gac`,cardClass:i%3===0?'Special':i%3===1?'Move':'Momentum',type:i%3===1?'Grapple':'Special',damage:3,cost:0,attitudeCost:0,owner,modifiers:[]};}
function side(name){const s={name,hp:70,maxHp:70,momentum:{Agility:3,Knowledge:3,Strength:3,Strike:3,Technical:3,Attitude:5},zoneDamage:{Head:0,Body:0,Arm:0,Leg:0},hand:[],deck:[],discard:[],inPlay:[],connectedMoves:[],warnings:0,stun:0,pins:0,autocounters:0,counters:0,location:'InTheRing'};for(let i=0;i<12;i++)s.hand.push(page(i,s));for(let i=12;i<50;i++)s.deck.push(page(i,s));return s;}
function fixture(card){const player=side('Player'),cpu=side('CPU');return {player,cpu,control:'player',round:6,turnLimit:50,position:'Standing',hold:null,pinPending:null,lastDamageApplied:3,lastConnectedMove:card,lastMove:card,proposedMove:card,pagesThisTurn:[card],ended:false};}
let total=0,passed=0;const failures=[];const commandCounts={};
for(const [source,events] of Object.entries(asts))for(const [event,forms] of Object.entries(events)){
 total++;const card={...(bySource.get(source)||{name:source,sourceFile:source,id:source,unid:source,cardClass:'Special'}),owner:null};const state=fixture(card);card.owner=state.player;
 const logs=[];const adapter=new WAGameStateAdapter(state,{actor:state.player,target:state.cpu,thisPage:card,rng:()=>0.37,log:x=>logs.push(String(x)),pageCatalog:new Map([[String(card.unid||card.id),card]])});
 const engine=adapter.asFunctions();
 try{
  const r=new WAInterpreter(engine,{maxSteps:300000}).run(forms,{'#superstar':state.player,'#target':state.cpu,'#initiator':state.player,'#opponent':state.cpu,'#this':card,'#move':card,'#page':card,'#counter':card});
  for(const t of r.trace)commandCounts[t.op]=(commandCounts[t.op]||0)+1;
  const sides=[state.player,state.cpu];
  const bad=sides.find(s=>!Number.isFinite(Number(s.hp))||s.hp<0||!Array.isArray(s.hand)||!Array.isArray(s.deck)||!Array.isArray(s.discard));
  if(bad)throw new Error('state invariant failed');
  passed++;
 }catch(e){failures.push({source,event,error:e.message});}
}
const report={totalEvents:total,passed,failed:failures.length,coveragePercent:Number((passed*100/total).toFixed(2)),distinctCommandsExecuted:Object.keys(commandCounts).length,commandCounts,failures};
fs.writeFileSync('LIVE-INTERPRETER-COVERAGE.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({total,passed,failed:failures.length,distinctCommands:Object.keys(commandCounts).length}));
if(failures.length)process.exit(1);
