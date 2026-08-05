const fs=require('fs'),vm=require('vm');
const {WAInterpreter}=require('./wa-script-interpreter-core.js');
vm.runInThisContext(fs.readFileSync('./wa-game-state-adapter.js','utf8'));
const asts=JSON.parse(fs.readFileSync('./data/original-card-script-asts.json','utf8'));
function run(sourceFile,{deck=[],hand=[],oppHand=[],allExtra=[]}={}){
  const player={name:'Player',hand,deck,discard:[],inPlay:[],connectedMoves:[],momentum:{Attitude:1,Knowledge:1,Strength:1,Strike:1,Technical:1,Agility:1}};
  const cpu={name:'CPU',hand:oppHand,deck:[],discard:[],inPlay:[],connectedMoves:[],momentum:{}};
  const page={name:sourceFile,sourceFile,id:sourceFile,unid:sourceFile,owner:player,cardClass:'Gameplan'};
  for(const p of [...deck,...hand])p.owner=player;
  for(const p of oppHand)p.owner=cpu;
  const all=[page,...deck,...hand,...oppHand,...allExtra];
  const catalog=new Map(); for(const p of all)for(const id of [p.id,p.unid,p.sourceFile])if(id!=null)catalog.set(String(id),p);
  const adapter=new WAGameStateAdapter({player,cpu,control:'player',round:5},{actor:player,target:cpu,thisPage:page,pageCatalog:catalog});
  new WAInterpreter(adapter.asFunctions()).run(asts[sourceFile]['Get_Page_List'],{'#this':page,'#superstar':player,'#initiator':player,'#target':cpu});
  return adapter.pageListEntries.map(x=>({id:String(x.page),mode:Number(x.mode)||0}));
}
const move=(id,extra={})=>({id,unid:id,name:id,cardClass:'Move',...extra});
const special=(id,extra={})=>({id,unid:id,name:id,cardClass:'Special',...extra});
const cases=[];
function check(name,actual,expected){const pass=JSON.stringify(actual)===JSON.stringify(expected);cases.push({name,actual,expected,pass});if(!pass)console.error(name,actual,expected)}
check('Set Up uses original all-move list',run('SetUp.gac',{deck:[move('m1'),special('s1')]}),[{id:'m1',mode:0}]);
check('High Spot uses cost six list',run('HighSpot.gac',{deck:[move('m5',{momentumCost:5}),move('m6',{momentumCost:6}),move('m9',{momentumCost:9})]}),[{id:'m6',mode:0},{id:'m9',mode:0}]);
check('Kip Up uses original all-move list',run('NipUp.gac',{deck:[move('m1'),special('s1')]}),[{id:'m1',mode:0}]);
check('Whatever It Takes uses original all-move list',run('WhateverItTakes.gac',{deck:[special('s1'),move('m1')]}),[{id:'m1',mode:0}]);
check('Hello uses original Special mode',run('Hello.gac',{deck:[special('s1'),move('m1')]}),[{id:'s1',mode:1}]);
check('Hello NWO uses original Special mode',run('HelloNWO.gac',{deck:[special('s1'),move('m1')]}),[{id:'s1',mode:1}]);
check('Break The Walls Down uses defensive list',run('BreakTheWallsDown.gac',{deck:[move('def',{moveType:'Defensive'}),move('atk',{moveType:'In Close'})]}),[{id:'def',mode:1}]);
check('Off The Top Of The Ladder uses high risk list',run('OffTheTopOfTheLadder.gac',{deck:[move('hi',{moveType:'High Risk'}),move('low',{moveType:'In Close'})]}),[{id:'hi',mode:0}]);
check('Ring Veteran excludes protected Specials',run('RingVeteranEX2.gac',{allExtra:[special('ok'),special('break',{name:'Break!'}),special('crowd',{name:'Crowd Support'}),special('oto',{name:'Once Too Often'}),special('tm',{modifiers:['Trademark']}),special('hide',{modifiers:['$Hide']}),move('mv')]}),[{id:'ok',mode:0}]);
const failed=cases.filter(x=>!x.pass);console.log(JSON.stringify({assertions:cases.length,passed:cases.length-failed.length,failed},null,2));if(failed.length)process.exit(1);
