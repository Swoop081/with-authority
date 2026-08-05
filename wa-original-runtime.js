"use strict";
(function(global){
  class WAOriginalRuntime {
    constructor(manifest={}){ this.manifest=manifest||{}; this.records=[]; this.maxRecords=2000; }
    metadata(page,event){ return this.manifest?.files?.[String(page?.sourceFile||'')]?.events?.[event]||null; }
    canDispatch(page,event,primary,{isPrimary=false}={}){
      const meta=this.metadata(page,event); if(!meta)return false;
      if(isPrimary||!primary)return true;
      if(event==='Can_Be_Played')return meta.scope==='global';
      return true;
    }
    snapshot(state){
      const side=s=>s?{
        hp:Number(s.hp)||0,maxHp:Number(s.maxHp)||0,hand:(s.hand||[]).length,deck:(s.deck||[]).length,
        discard:(s.discard||[]).length,inPlay:(s.inPlay||[]).length,location:s.location||'',onMat:!!s.onMat,
        stunned:Number(s.stunned)||0,inHold:!!s.inHold,pinned:!!s.pinned,warnings:Number(s.warnings)||0,
        momentum:{...(s.momentum||{})}
      }:null;
      return {round:Number(state?.round)||0,control:state?.control||'',ended:!!state?.ended,player:side(state?.player),cpu:side(state?.cpu)};
    }
    diff(before,after){
      const changed={}; const walk=(a,b,path='')=>{
        const keys=new Set([...Object.keys(a||{}),...Object.keys(b||{})]);
        for(const k of keys){const p=path?`${path}.${k}`:k,v1=a?.[k],v2=b?.[k];
          if(v1&&v2&&typeof v1==='object'&&typeof v2==='object'&&!Array.isArray(v1)&&!Array.isArray(v2))walk(v1,v2,p);
          else if(JSON.stringify(v1)!==JSON.stringify(v2))changed[p]={before:v1,after:v2};
        }
      }; walk(before,after); return changed;
    }
    record(entry){ this.records.push(entry); if(this.records.length>this.maxRecords)this.records.splice(0,this.records.length-this.maxRecords); return entry; }
    run({state,page,event,execute}){
      const before=this.snapshot(state),pageBefore={...(page?.waValues||{})}; let output,error=null;
      try{ output=execute(); }catch(e){error=e;}
      const after=this.snapshot(state),pageAfter={...(page?.waValues||{})},changes=this.diff(before,after),pageChanges=this.diff(pageBefore,pageAfter),meta=this.metadata(page,event);
      for(const [key,value] of Object.entries(pageChanges))changes[`pageValues.${key}`]=value;
      const changedDomains=[...new Set(Object.keys(changes).map(path=>{
        if(/\.(?:hand|deck|discard|inPlay)$/.test(path))return 'zones';
        if(/\.momentum(?:\.|$)/.test(path))return 'momentum';
        if(/\.(?:hp|maxHp)$/.test(path))return 'damage';
        if(/^pageValues\.(?:Damage_Bonus|Submission_Damage_Bonus)$/.test(path))return 'damage-bonus';
        if(/\.(?:location|onMat)$/.test(path))return 'location';
        if(/\.stunned$/.test(path))return 'stun';
        if(/\.inHold$/.test(path))return 'submission';
        if(/\.pinned$/.test(path))return 'pin';
        if(path==='control')return 'control';
        if(path==='ended')return 'ending';
        return path.split('.').pop()||'state';
      }))];
      const record=this.record({round:Number(state?.round)||0,event,sourceFile:page?.sourceFile||'',card:page?.name||'',scope:meta?.scope||'unknown',declaredDomains:meta?.domains||[],changedDomains,changes,error:error?String(error.message||error):null});
      if(error)throw error; return {output,record};
    }
  }
  global.WAOriginalRuntime=WAOriginalRuntime;
})(typeof window!=='undefined'?window:globalThis);
