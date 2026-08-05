const fs=require('fs'),vm=require('vm');
const {WAInterpreter}=require('../wa-script-interpreter-core.js');
vm.runInThisContext(fs.readFileSync('./wa-game-state-adapter.js','utf8'));
const asts=JSON.parse(fs.readFileSync('./data/original-card-script-asts.json','utf8'));
function page(id,cls='Move',extra={}){return {id,unid:id,name:id,cardClass:cls,...extra}}
function run(sourceFile,{ownHand=[],oppHand=[],oppDeck=[]}){
  const player={name:'Player',hand:ownHand,deck:[],discard:[],inPlay:[],connectedMoves:[],momentum:{Attitude:1,Knowledge:1,Strength:1,Strike:1,Technical:1,Agility:1}};
  const cpu={name:'CPU',hand:oppHand,deck:oppDeck,discard:[],inPlay:[],connectedMoves:[],momentum:{}};
  const self=page(sourceFile,'Move',{sourceFile,owner:player});player.hand.unshift(self);
  for(const p of player.hand)p.owner=player;for(const p of [...oppHand,...oppDeck])p.owner=cpu;
  const all=[...player.hand,...oppHand,...oppDeck],catalog=new Map();for(const p of all)for(const id of [p.id,p.unid,p.sourceFile])if(id!=null)catalog.set(String(id),p);
  const adapter=new WAGameStateAdapter({player,cpu,control:'player',round:5},{actor:player,target:cpu,thisPage:self,pageCatalog:catalog});
  new WAInterpreter(adapter.asFunctions()).run(asts[sourceFile]['Get_Page_List'],{'#this':self,'#superstar':player,'#initiator':player,'#target':cpu});
  return adapter.pageListEntries.map(x=>({id:String(x.page),mode:x.mode}));
}
const ownTargets=['LariatEX2.gac','Superkick.gac','ChopEX2.gac','SideBackBreakerEX2.gac','RunningClotheslineEX2.gac','RoundKickEX2.gac','KneeDropEX2.gac','LowBlowPunch.gac','NeckbreakerEX2.gac','BackSuplexEX2.gac','SamoanDropEX2.gac','MissileDropkickEX2.gac'];
const results=[];function check(name,ok,detail=''){results.push({name,pass:!!ok,detail});if(!ok)console.error(name,detail)}
for(const sf of ownTargets){const got=run(sf,{ownHand:[page('sacrifice'),page('other','Special')]});check(`${sf} selects every other own-hand page`,got.some(x=>x.id==='sacrifice')&&got.some(x=>x.id==='other')&&!got.some(x=>x.id===sf),JSON.stringify(got));}
let got=run('BackRake.gac',{oppHand:[page('special','Special'),page('move','Move')]});check('Back Rake selects only opponent Special',JSON.stringify(got)===JSON.stringify([{id:'special',mode:0}]),JSON.stringify(got));
for(const sf of ['DDTEX3.gac','HipTossEX3.gac','ArmDragTakedownEX3.gac']){got=run(sf,{oppDeck:[page('top1'),page('top2'),page('top3'),page('top4')]});check(`${sf} exposes exactly next three opponent pages`,JSON.stringify(got)===JSON.stringify([{id:'top1',mode:1},{id:'top2',mode:1},{id:'top3',mode:1}]),JSON.stringify(got));}
const app=fs.readFileSync('./app.js','utf8');
check('app stores original User_Data target',app.includes('page.waValues.User_Data=String('));
check('app defers card resolution for original target chooser',app.includes('prepareOriginalPreplayTarget(k,c,continuePlay)'));
check('test interface exposes target pool',app.includes('originalPreplayTargetPool,'));

function executeEvent(sourceFile,event,{ownHand=[],oppDeck=[],selected}){
  const player={name:'Player',hand:ownHand,deck:[],discard:[],inPlay:[],connectedMoves:[],momentum:{Attitude:1}};
  const cpu={name:'CPU',hand:[],deck:oppDeck,discard:[],inPlay:[],connectedMoves:[],momentum:{}};
  const self=page(sourceFile,'Move',{sourceFile,owner:player});player.hand.unshift(self);for(const p of player.hand)p.owner=player;for(const p of oppDeck)p.owner=cpu;
  Object.defineProperty(self,'waValues',{value:Object.assign(Object.create(null),{User_Data:String(selected)}),writable:true,configurable:true});
  const catalog=new Map();for(const p of [...player.hand,...oppDeck])for(const id of [p.id,p.unid,p.sourceFile])if(id!=null)catalog.set(String(id),p);
  const state={player,cpu,control:'player',round:5,position:'Standing'};
  const adapter=new WAGameStateAdapter(state,{actor:player,target:cpu,thisPage:self,pageCatalog:catalog});
  new WAInterpreter(adapter.asFunctions()).run(asts[sourceFile][event],{'#this':self,'#move':self,'#page':self,'#superstar':player,'#initiator':player,'#target':cpu});
  return {player,cpu,state};
}
let effect=executeEvent('LariatEX2.gac','Move_Connected',{ownHand:[page('keep'),page('ditch')],selected:'ditch'});
check('Lariat original selected hand page is ditched on connection',effect.player.discard.some(x=>x.id==='ditch')&&!effect.player.hand.some(x=>x.id==='ditch'));
effect=executeEvent('DDTEX3.gac','Move_Connected',{oppDeck:[page('top1'),page('top2'),page('top3'),page('top4')],selected:'top2'});
check('DDT original effect keeps selected top page and ditches the other two',effect.cpu.deck.some(x=>x.id==='top2')&&!effect.cpu.deck.some(x=>x.id==='top1')&&!effect.cpu.deck.some(x=>x.id==='top3'),JSON.stringify({deck:effect.cpu.deck.map(x=>x.id),discard:effect.cpu.discard.map(x=>x.id)}));
const failed=results.filter(x=>!x.pass);console.log(JSON.stringify({assertions:results.length,passed:results.length-failed.length,failed},null,2));if(failed.length)process.exit(1);
