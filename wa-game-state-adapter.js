"use strict";

class WAStateAdapterError extends Error {
  constructor(message, meta={}) { super(message); this.name='WAStateAdapterError'; this.meta=meta; }
}

class WAGameStateAdapter {
  constructor(state, options={}) {
    this.state=state||{};
    this.options=options;
    this.rng=options.rng||Math.random;
    this.log=options.log||(()=>{});
    this.hooks=options.hooks||{};
    this.pageCatalog=options.pageCatalog||new Map();
    this.actor=options.actor||null;
    this.target=options.target||null;
    this.thisPage=options.thisPage||null;
    this.locations=options.locations||new Map([
      ["$InTheRing","InTheRing"],["$Ringside","Ringside"],["$EntranceRamp","EntranceRamp"],
      ["$Backstage","Backstage"],["$OnTheMat","OnTheMat"],["$Standing","Standing"]
    ]);
    this.pageLists=[];
    this.stringValues=new Map();
    this.done=false;
  }

  asFunctions() {
    const out={};
    for(const name of WAGameStateAdapter.commandNames()) out[name]=this[name].bind(this);
    return out;
  }

  static commandNames(){ return [
    'WAApplyingSubmissionHold','WABelongsTo','WACanCoverCost','WACanPlayPage','WAConnectedWasFinisher','WAFindLocation',
    'WAGetActiveSuperstar','WAGetAllSuperstars','WAGetBaseUNID','WAGetConnectedMoves','WAGetDamageApplied','WAGetHand',
    'WAGetHandCount','WAGetHitPoints','WAGetInHold','WAGetInPlay','WAGetLastConnectedMove','WAGetLocation','WAGetMaxHitPoints',
    'WAGetNAme','WAGetName','WAGetNameByUNID','WAGetOnMat','WAGetOpponent','WAGetOwner','WAGetPinAttempts',
    'WAGetPlaybook','WAGetPlayedBy','WAGetPlayedOn','WAGetPlayers','WAGetProposedMove','WAGetSubmissionDamage',
    'WAGetSuperstars','WAGetTotalMomentum','WAGetTurn','WAGetTurnLimit','WAGetTurnPlayedOn','WAGetUNID','WAGetValue',
    'WAHasControl','WAHasModifier','WAHasValue','WAInHand','WAInPlay','WAInSubmissionHold','WAIsConnectedDamageSpecial',
    'WAIsDamageSpecial','WAIsHuman','WAIsMomentum','WAIsMove','WAIsOfType','WAIsPinned','WAIsSpecial','WAIsStunned',
    'WAIsSubmissionHold','WAPagesInPlay','WAPagesThisTurn','WAPlayedFanFavorite','WAPlayedRulebreaker','WATurnsAtLocation',
    'WAUNIDInPlay','OppFinishers','WAAddToPageList','WAAddValue','WAAutoCounter','WAAutocounter','WABreakHold','WABreakPin',
    'WAChangeControl','WACreatePage','WACreatePageByUNID','WADamage','WADitchFromPlaybook','WADitchPage','WADone','WADrawPage',
    'WADrawPageByUNID','WAEnumAllPages','WAEnumPlaybook','WAForceMove','WAForcePage','WAGameMap','WAHeal','WAMessage',
    'WAMessageFromPage','WAMove','WAMovePageFromHandToPlaybook','WAOutOfPlay','WAPinSuperstar','WAPlaySound','WAPutIntoHand',
    'WAPutPageInPlaybook','WARandom','WARemoveValue','WARunIn','WARunOut','WASetOnMat','WASetPlayedSpecial','WASetTurnLimit',
    'WASetValue','WAStealPage','WAStopSound','WAStringAddValue','WAStringGetValue','WAStun','WASubstring','WATurnsSinceLastControl',
    'WAWarn','WAWin'
  ]; }

  sides(){ return [this.state.player,this.state.cpu].filter(Boolean); }
  isSide(v){ return !!v && this.sides().includes(v); }
  side(v){
    if(this.isSide(v)) return v;
    if(v==='#superstar') return this.actor||this.state.player;
    if(v==='#target') return this.target||this.state.cpu;
    if(v==='#this') return this.thisPage;
    if(v==='player') return this.state.player;
    if(v==='cpu') return this.state.cpu;
    if(v&&v.owner) return this.side(v.owner);
    return v||null;
  }
  opponent(v){ const s=this.side(v); return s===this.state.player?this.state.cpu:s===this.state.cpu?this.state.player:null; }
  cards(side, zone){ const s=this.side(side); if(!s)return []; const key=zone==='playbook'?'deck':zone; return Array.isArray(s[key])?s[key]:[]; }
  allCards(){
    const out=[];
    for(const s of this.sides()) for(const z of ['hand','deck','discard','inPlay','connectedMoves']) for(const c of this.cards(s,z)) if(c&&!out.includes(c))out.push(c);
    return out;
  }
  values(obj){ if(!obj||typeof obj!=='object')return null; if(!obj.waValues)Object.defineProperty(obj,'waValues',{value:Object.create(null),writable:true,configurable:true,enumerable:false}); return obj.waValues; }
  val(obj,key,def=0){ const v=this.values(obj); return v&&Object.prototype.hasOwnProperty.call(v,key)?v[key]:def; }
  setVal(obj,key,value){ const v=this.values(obj); if(!v)return value; v[key]=value; return value; }
  pageByUNID(unid){
    const id=String(unid??'');
    for(const c of this.allCards()) if(String(this.WAGetUNID(c))===id||String(this.WAGetBaseUNID(c))===id)return c;
    if(this.pageCatalog instanceof Map)return this.pageCatalog.get(id)||null;
    return this.pageCatalog[id]||null;
  }
  resolvePage(page){ if(page&&typeof page==='object')return page; const key=String(page??''); const direct=this.pageByUNID(key); if(direct)return direct; const vals=this.pageCatalog instanceof Map?[...this.pageCatalog.values()]:Object.values(this.pageCatalog||{}); return vals.find(p=>String(p?.sourceFile||'')===key||String(p?.name||'')===key)||{id:key,unid:key,sourceFile:key,name:key}; }
  clonePage(page,owner=null){ if(!page)return null; const c={...page,instance:`wa-${Date.now()}-${Math.random().toString(36).slice(2)}`}; if(owner)c.owner=owner; return c; }
  removeFromAll(page){
    let removed=false;
    for(const s of this.sides()) for(const z of ['hand','deck','discard','inPlay','connectedMoves']){ const a=this.cards(s,z); let i; while((i=a.indexOf(page))>=0){a.splice(i,1);removed=true;} }
    return removed;
  }
  ownerOf(page){
    if(!page)return null;
    if(page.owner)return this.side(page.owner);
    for(const s of this.sides()) for(const z of ['hand','deck','discard','inPlay','connectedMoves']) if(this.cards(s,z).includes(page))return s;
    return null;
  }
  isType(page,type){
    const t=String(type??'').replace(/^\$/,'').toLowerCase(); const cls=String(page?.cardClass||page?.type||'').toLowerCase();
    const method=String(page?.method||'').toLowerCase(); const sub=String(page?.subtype||'').toLowerCase();
    return cls===t||method===t||sub===t||String(page?.name||'').toLowerCase()===t;
  }
  emit(name,payload){ if(typeof this.hooks[name]==='function')return this.hooks[name](payload,this.state,this); return undefined; }

  WAGetActiveSuperstar(){ return this.side(this.state.control)||this.state.player; }
  WAGetAllSuperstars(){ return this.sides(); }
  WAGetSuperstars(){ return this.sides(); }
  WAGetPlayers(){ return this.sides(); }
  WAGetOpponent(v){ return this.opponent(v); }
  WAGetOwner(page){ return this.ownerOf(page); }
  WABelongsTo(page,who){ return this.ownerOf(page)===this.side(who); }
  WAGetPlayedBy(page){ return page?.playedBy?this.side(page.playedBy):this.ownerOf(page); }
  WAGetPlayedOn(page){ return page?.playedOn?this.side(page.playedOn):null; }
  WAGetActivePage(){ return this.state.pile?.card||null; }
  WAGetHand(who){ return [...this.cards(who,'hand')]; }
  WAGetHandCount(who){ return this.cards(who,'hand').length; }
  WAGetPlaybook(who){ return [...this.cards(who,'playbook')]; }
  WAGetInPlay(who){ return [...this.cards(who,'inPlay')]; }
  WAPagesInPlay(){ return this.sides().flatMap(s=>this.cards(s,'inPlay')); }
  WAPagesThisTurn(who){ return [...(this.side(who)?.pagesThisTurn||[])]; }
  WAGetConnectedMoves(who){ return [...this.cards(who,'connectedMoves')]; }
  WAGetLastConnectedMove(who){ const a=this.cards(who,'connectedMoves'); return a[a.length-1]||null; }
  WAGetProposedMove(){ return this.state.proposedMove||this.state.pendingMove||null; }
  WAGetUNID(page){ return page?.unid??page?.UNID??page?.id??page?.sourceFile??''; }
  WAGetBaseUNID(page){ return page?.baseUNID??page?.baseUnid??page?.originalUNID??page?.originalUnid??this.WAGetUNID(page); }
  WAGetName(page){ return page?.name??''; }
  WAGetNAme(page){ return this.WAGetName(page); }
  WAGetNameByUNID(unid){ return this.pageByUNID(unid)?.name||''; }
  WAGetValue(obj,key){ return this.val(obj,key,0); }
  WAHasValue(obj,key){ const v=this.values(obj); return !!v&&Object.prototype.hasOwnProperty.call(v,key); }
  WAGetHitPoints(who){ return Number(this.side(who)?.hp||0); }
  WAGetMaxHitPoints(who){ return Number(this.side(who)?.maxHp||0); }
  WAGetTotalMomentum(who){ const m=this.side(who)?.momentum||{}; return Object.values(m).reduce((n,v)=>n+(Number(v)||0),0); }
  WAGetPinAttempts(who){ return Number(this.side(who)?.pins||0); }
  WAGetTurn(){ return Number(this.state.round||this.state.turn||1); }
  WAGetTurnLimit(){ return Number(this.state.turnLimit||50); }
  WAGetTurnPlayedOn(page){ return Number(page?.turnPlayedOn||0); }
  WAGetLocation(who){ return this.side(who)?.location||this.state.location||'$InTheRing'; }
  WAFindLocation(name){ return this.locations.get(String(name))||String(name); }
  WATurnsAtLocation(who){ return Number(this.side(who)?.turnsAtLocation||0); }
  WATurnsSinceLastControl(who){ const s=this.side(who); return Math.max(0,this.WAGetTurn()-Number(s?.lastControlTurn||this.WAGetTurn())); }
  WAGetOnMat(who){ const s=this.side(who); if(s?.onMat!=null)return !!s.onMat; return this.state.position==='Grounded'||this.state.position==='Prone'||this.state.position==='OnTheMat'; }
  WAGetInHold(who){ const s=this.side(who); return this.state.hold&&this.side(this.state.hold.defender)===s?this.state.hold:null; }
  WAGetSubmissionDamage(who,zone){ const s=this.side(who); if(!s)return 0; if(zone)return Number(this.state.hold?.submissionByZone?.[String(zone)]||0); return Object.values(this.state.hold?.submissionByZone||{}).reduce((n,v)=>n+(Number(v)||0),0); }
  WAGetDamageApplied(page){ return Number(page?.damageApplied??this.state.lastDamageApplied??0); }
  WAHasControl(who){ return this.side(who)===this.side(this.state.control); }
  WAIsHuman(who){ return this.side(who)===this.state.player; }
  WAIsPinned(who){ return !!this.side(who)?.pinned; }
  WAIsStunned(who){ return Number(this.side(who)?.stun||0)>0; }
  WAInSubmissionHold(who){ return !!this.WAGetInHold(who); }
  WAApplyingSubmissionHold(who){ return !!this.state.hold&&this.side(this.state.hold.attacker)===this.side(who); }
  WAIsSubmissionHold(page){ return !!page&&(page.submission||/submission/i.test(String(page.cardClass||page.subtype||page.description||''))); }
  WAIsMove(page){ return !!page&&(/move/i.test(String(page.cardClass||''))||['Strike','Grapple','Aerial','Submission'].includes(page.type)); }
  WAIsMomentum(page){ return !!page&&/momentum/i.test(String(page.cardClass||page.type||'')); }
  WAIsSpecial(page){ return !!page&&/special/i.test(String(page.cardClass||page.type||'')); }
  WAIsDamageSpecial(page){ return this.WAIsSpecial(page)&&Number(page?.damage||0)>0; }
  WAIsConnectedDamageSpecial(page){ return this.WAIsDamageSpecial(page)&&!!page?.connected; }
  WAIsOfType(page,type){ return this.isType(page,type); }
  WAInHand(page,who){ return who?this.cards(who,'hand').includes(page):this.sides().some(s=>this.cards(s,'hand').includes(page)); }
  WAInPlay(page){ return this.sides().some(s=>this.cards(s,'inPlay').includes(page)); }
  WAUNIDInPlay(unid){ return this.WAPagesInPlay().some(p=>String(this.WAGetUNID(p))===String(unid)); }
  WAHasModifier(page,name){ const mods=page?.modifiers||page?.modifier||[]; return Array.isArray(mods)?mods.includes(name):String(mods).includes(String(name)); }
  WAPlayedFanFavorite(who){ return !!this.side(who)?.playedFanFavorite; }
  WAPlayedRulebreaker(who){ return !!this.side(who)?.playedRulebreaker; }
  WAConnectedWasFinisher(who){ return !!this.WAGetLastConnectedMove(who)?.finisher; }
  WACanCoverCost(who,page){ const s=this.side(who); if(!s||!page)return false; const cost=Number(page.attitudeCost??page.cost??0); return Number(s.momentum?.Attitude||0)>=cost; }
  WACanPlayPage(who,page){ const hook=this.emit('canPlayPage',{who:this.side(who),page}); if(hook!==undefined)return !!hook; return !!page&&this.WACanCoverCost(who,page); }
  OppFinishers(who){ return this.cards(this.opponent(who),'hand').filter(p=>p.finisher); }

  WASetValue(obj,key,value){ return this.setVal(obj,key,value); }
  WAAddValue(obj,key,value=1){ return this.setVal(obj,key,Number(this.val(obj,key,0))+Number(value||0)); }
  WARemoveValue(obj,key){ const v=this.values(obj); if(v)delete v[key]; return true; }
  WAStringGetValue(obj,key){ const local=this.values(obj); if(local&&Object.prototype.hasOwnProperty.call(local,key))return String(local[key]); return String(this.stringValues.get(`${this.WAGetUNID(obj)}:${key}`)||''); }
  WAStringAddValue(obj,key,value){ const next=this.WAStringGetValue(obj,key)+String(value??''); this.setVal(obj,key,next); this.stringValues.set(`${this.WAGetUNID(obj)}:${key}`,next); return next; }
  WASubstring(text,start,length){ const s=String(text??''); const i=Math.max(0,Number(start||1)-1); return length==null?s.slice(i):s.slice(i,i+Math.max(0,Number(length)||0)); }
  WARandom(min,max){ const lo=Number(min??1),hi=Number(max??lo); if(hi<lo)return this.WARandom(hi,lo); return lo+Math.floor(this.rng()*(hi-lo+1)); }
  WASetTurnLimit(n){ this.state.turnLimit=Math.max(1,Number(n)||1); return this.state.turnLimit; }
  WASetOnMat(who,value=true){ const s=this.side(who); if(s)s.onMat=!!value; if(s===this.opponent(this.state.control))this.state.position=value?'Grounded':'Standing'; return !!value; }
  WAStun(who,a,b){ const s=this.side(who); const n=Number(b??a??0); if(s)s.stun=Math.max(Number(s.stun||0),n); return n; }
  WAWarn(who,n=1){ const s=this.side(who); if(!s)return 0; s.warnings=Number(s.warnings||0)+Math.max(0,Number(n)||0); this.emit('warning',{who:s,amount:n}); return s.warnings; }
  WADamage(who,amount,zone='Body'){ const s=this.side(who); if(!s)return 0; let n=Number(amount); if(!Number.isFinite(n)){ const map={Strk:1,Strike:1,Body:1,Head:1,Arm:1,Leg:1}; n=map[String(amount)]||0; zone=String(amount) in map?String(amount):zone; } n=Math.max(0,n); s.hp=Math.max(0,Number(s.hp||0)-n); if(s.zoneDamage)s.zoneDamage[zone]=(Number(s.zoneDamage[zone]||0)+n); this.state.lastDamageApplied=n; this.emit('damage',{who:s,amount:n,zone}); return n; }
  WAHeal(who,n){ const s=this.side(who); if(!s)return 0; const before=Number(s.hp||0); s.hp=Math.min(Number(s.maxHp||before),before+Math.max(0,Number(n)||0)); return s.hp-before; }
  WADrawPage(who,n=1){ const s=this.side(who); if(!s)return []; const drawn=[]; for(let i=0;i<Math.max(0,Number(n)||0)&&s.deck.length;i++){const p=s.deck.shift();s.hand.push(p);drawn.push(p);} return drawn.length===1?drawn[0]:drawn; }
  WADrawPageByUNID(who,unid){ const s=this.side(who); if(!s)return null; const i=s.deck.findIndex(p=>String(this.WAGetUNID(p))===String(unid)||String(this.WAGetBaseUNID(p))===String(unid)); if(i<0)return null; const [p]=s.deck.splice(i,1);s.hand.push(p);return p; }
  WADitchFromPlaybook(who){ const s=this.side(who); if(!s||!s.deck.length)return null; const p=s.deck.shift();s.discard.push(p);return p; }
  WADitchPage(who,indexOrPage){ const s=this.side(who); if(!s)return null; let i=typeof indexOrPage==='number'?Number(indexOrPage):s.hand.indexOf(indexOrPage); if(typeof indexOrPage==='number'&&i>=1)i--; if(i<0||i>=s.hand.length)return null; const [p]=s.hand.splice(i,1);s.discard.push(p);return p; }
  WAMovePageFromHandToPlaybook(who,page){ const s=this.side(who); if(!s)return false; const i=s.hand.indexOf(page); if(i<0)return false; s.hand.splice(i,1);s.deck.push(page);return true; }
  WAPutPageInPlaybook(who,page){ const s=this.side(who); page=this.resolvePage(page); if(!s||!page)return false; this.removeFromAll(page);s.deck.push(page);page.owner=s;return true; }
  WAPutIntoHand(who,page){ const s=this.side(who); page=this.resolvePage(page); if(!s||!page)return false; this.removeFromAll(page);s.hand.push(page);page.owner=s;return true; }
  WAOutOfPlay(page){ if(!page)return false; this.removeFromAll(page);page.outOfPlay=true;return true; }
  WACreatePageByUNID(who,unid){ const src=this.pageByUNID(unid)||{id:unid,unid,name:this.WAGetNameByUNID(unid)||String(unid)}; return this.clonePage(src,this.side(who)); }
  WACreatePage(who,name){ const src=[...this.pageCatalog.values?.()||[]].find(p=>p.name===name)||{name,id:name}; return this.clonePage(src,this.side(who)); }
  WAAddToPageList(list,page){ const target=Array.isArray(list)?list:(this.pageLists[Number(list)||0]||(this.pageLists[Number(list)||0]=[])); target.push(page);return target; }
  WAEnumAllPages(){ return this.allCards(); }
  WAEnumPlaybook(who){ return this.WAGetPlaybook(who); }
  WAGameMap(){ return this.state.gameMap||[...this.locations.values()]; }
  WAMove(who,location){ const s=this.side(who); if(s){s.location=location;s.turnsAtLocation=0;} return location; }
  WAChangeControl(who){ const s=this.side(who); if(!s)return false; this.state.control=s===this.state.player?'player':'cpu';s.lastControlTurn=this.WAGetTurn();return true; }
  WAForcePage(a,b,c){ return this.emit('forcePage',{args:[a,b,c]})??null; }
  WAForceMove(a,b,c){ return this.emit('forceMove',{args:[a,b,c]})??null; }
  WAPinSuperstar(attacker,target,modifier=0){ this.state.pinPending={attacker:this.side(attacker),target:this.side(target),modifier:Number(modifier)||0}; return this.emit('pin',this.state.pinPending)??true; }
  WABreakPin(who){ const s=this.side(who); if(this.state.pinPending&&(!s||this.state.pinPending.target===s)){this.state.pinPending=null;if(s)s.pinned=false;return true;} return false; }
  WABreakHold(who){ const s=this.side(who); if(this.state.hold&&(!s||this.side(this.state.hold.defender)===s)){this.state.hold=null;return true;} return false; }
  WAAutoCounter(who){ return this.WAAutocounter(who); }
  WAAutocounter(who){ const s=this.side(who); if(s)s.autocounters=Number(s.autocounters||0)+1; return this.emit('autocounter',{who:s})??true; }
  WASetPlayedSpecial(who,value=true){ const s=this.side(who); if(s)s.specialPlayedThisTurn=!!value;return !!value; }
  WAMessage(text){ this.log(String(text??'')); return text; }
  WAMessageFromPage(page){ const text=String(page?.description||page?.name||'');this.log(text);return text; }
  WAPlaySound(name){ return this.emit('playSound',{name})??true; }
  WAStopSound(name){ return this.emit('stopSound',{name})??true; }
  WARunIn(who,page){ return this.emit('runIn',{who:this.side(who),page})??true; }
  WARunOut(who,page){ return this.emit('runOut',{who:this.side(who),page})??true; }
  WAStealPage(thief,victim,page){ const t=this.side(thief),v=this.side(victim); if(!t||!v)return false; const p=page||v.hand[0]; const i=v.hand.indexOf(p); if(i<0)return false;v.hand.splice(i,1);t.hand.push(p);p.owner=t;return p; }
  WADone(){ this.done=true; return true; }
  WAWin(who,reason=''){ const s=this.side(who);this.state.ended=true;this.state.winner=s;this.state.winReason=reason;return true; }
}

if(typeof module!=='undefined')module.exports={WAGameStateAdapter,WAStateAdapterError};
