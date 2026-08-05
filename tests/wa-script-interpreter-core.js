"use strict";
class WAInterpreterError extends Error { constructor(message, meta={}) { super(message); this.name='WAInterpreterError'; this.meta=meta; } }
class WAInterpreter {
  constructor(adapter, options={}) {
    this.adapter=adapter||{};
    this.maxSteps=options.maxSteps||100000;
    this.steps=0;
    this.env=Object.create(null);
    this.trace=[];
  }
  atom(node){ if(node==null)return null; if(Array.isArray(node))return this.eval(node); if(node.t==='num'||node.t==='str')return node.v; if(node.t==='sym'){ if(['#nil','nil','Nil','False','false'].includes(node.v))return false; if(['True','true'].includes(node.v))return true; if(node.v.startsWith("'")&&node.v.length>1)return node.v.slice(1); if(Object.prototype.hasOwnProperty.call(this.env,node.v))return this.env[node.v]; return node.v; } return node; }
  truthy(v){ return !(v===false||v===null||v===undefined||v===0||v===''); }
  comparable(v){ if(v&&typeof v==='object'){for(const key of ['unid','UNID','id','sourceFile'])if(v[key]!=null)return String(v[key]);}return v; }
  equal(a,b){ if(a===b)return true; const ca=this.comparable(a),cb=this.comparable(b); return ca===cb||(ca!=null&&cb!=null&&String(ca)===String(cb)); }
  eval(node){
    if(++this.steps>this.maxSteps)throw new WAInterpreterError('step limit exceeded');
    if(!Array.isArray(node))return this.atom(node);
    if(!node.length)return null;
    const op=this.atom(node[0]); const args=node.slice(1);
    switch(op){
      case 'block': { let v=null; for(const a of args)v=this.eval(a); return v; }
      case 'if': {
        // WA scripts use a cond-style form: (if (condition action) (condition action) ...).
        // Execute the first matching branch and stop.
        for(const branch of args){
          if(Array.isArray(branch)&&branch.length===2){ if(this.truthy(this.eval(branch[0])))return this.eval(branch[1]); }
          else throw new WAInterpreterError('unsupported if branch',{branch});
        }
        return null;
      }
      case 'sett': case 'setq': { const name=args[0]?.v; if(!name)throw new WAInterpreterError(`${op} requires symbol`); let v; if(args[1]?.t==='sym'&&args[1].v==="'"&&Array.isArray(args[2])&&args[2].length===0)v=[]; else v=this.eval(args[1]); this.env[name]=v; return v; }
      case 'eq': return this.equal(this.eval(args[0]),this.eval(args[1]));
      case 'not': return !this.truthy(this.eval(args[0]));
      case 'and': { let v=true; for(const a of args){v=this.eval(a);if(!this.truthy(v))return false;}return v; }
      case 'or': { for(const a of args){const v=this.eval(a);if(this.truthy(v))return v;}return false; }
      case 'add': return args.reduce((n,a)=>n+Number(this.eval(a)||0),0);
      case 'subtract': { const vals=args.map(a=>Number(this.eval(a)||0)); return vals.length===1?-vals[0]:vals.slice(1).reduce((n,v)=>n-v,vals[0]||0); }
      case 'multiply': return args.reduce((n,a)=>n*Number(this.eval(a)||0),1);
      case 'divide': { const vals=args.map(a=>Number(this.eval(a)||0)); return vals.slice(1).reduce((n,v)=>{if(v===0)throw new WAInterpreterError('division by zero');return n/v;},vals[0]||0); }
      case 'greater': return Number(this.eval(args[0]))>Number(this.eval(args[1]));
      case 'greater-eq': return Number(this.eval(args[0]))>=Number(this.eval(args[1]));
      case 'lesser': return Number(this.eval(args[0]))<Number(this.eval(args[1]));
      case 'lesser-eq': return Number(this.eval(args[0]))<=Number(this.eval(args[1]));
      case 'enum': {
        if(args.length!==3||args[1]?.t!=='sym')throw new WAInterpreterError('unsupported enum shape',{args});
        const seq=this.eval(args[0]); if(!Array.isArray(seq))return null;
        const name=args[1].v; let v=null; for(const item of seq){this.env[name]=item;v=this.eval(args[2]);} return v;
      }
      case 'WAEnumPlaybook': case 'WAEnumAllPages': {
        // Original WA scripts pass an iterator variable plus a quoted callback body.
        // Handle that callback inside the interpreter so Page is bound for each item.
        const allPages=op==='WAEnumAllPages';
        const expected=allPages?3:4;
        if(args.length!==expected)throw new WAInterpreterError(`unsupported ${op} shape`,{args});
        const seq=allPages?this.adapter.WAEnumAllPages():this.adapter.WAEnumPlaybook(this.eval(args[0]));
        const name=(allPages?args[0]:args[1])?.v;
        const quote=(allPages?args[1]:args[2]);
        const body=(allPages?args[2]:args[3]);
        if(!Array.isArray(seq)||!name||quote?.t!=='sym'||quote.v!=="'")throw new WAInterpreterError(`unsupported ${op} iterator`,{args});
        let v=null; for(const item of seq){this.env[name]=item;v=this.eval(body);} return v;
      }
      case 'count': { const v=this.eval(args[0]); return Array.isArray(v)||typeof v==='string'?v.length:0; }
      case 'item': { const list=this.eval(args[0]); const index=Number(this.eval(args[1])||0); return Array.isArray(list)&&index>=1?list[index-1]:null; }
      case 'cat': return args.map(a=>String(this.eval(a)??'')).join('');
      case "'": return args.length?this.eval(args[0]):[];
      case 'cons': { const list=this.eval(args[0]); const value=this.eval(args[1]); return [...(Array.isArray(list)?list:[]),value]; }
      case 'loop': return this.evalLoop(args);
      default: return this.callEngine(op,args);
    }
  }
  evalLoop(args){
    // Two original loop forms are used by the card scripts:
    //   (loop CONDITION BODY)             -> while loop
    //   (loop VARIABLE SEQUENCE BODY...)  -> sequence iteration
    if(args.length===2){
      let v=null, iterations=0;
      while(this.truthy(this.eval(args[0]))){
        if(++iterations>this.maxSteps)throw new WAInterpreterError('loop iteration limit exceeded',{args});
        v=this.eval(args[1]);
      }
      return v;
    }
    if(args.length>=3&&args[0]?.t==='sym'){
      const name=args[0].v, seq=this.eval(args[1]); if(!Array.isArray(seq))return null;
      let v=null; for(const item of seq){this.env[name]=item; for(const body of args.slice(2))v=this.eval(body);} return v;
    }
    throw new WAInterpreterError('unsupported loop shape',{args});
  }
  callEngine(op,args){
    const fn=this.adapter[op]; if(typeof fn!=='function')throw new WAInterpreterError(`unsupported engine command: ${op}`,{op});
    const values=args.map(a=>this.eval(a)); const result=fn(...values);
    this.trace.push({op,args:values,result}); return result;
  }
  run(forms, initialEnv={}){ this.steps=0; this.trace=[]; this.env=Object.assign(Object.create(null),initialEnv); let result=null; for(const form of forms)result=this.eval(form); return {result,env:{...this.env},trace:this.trace,steps:this.steps}; }
}
if(typeof module!=='undefined')module.exports={WAInterpreter,WAInterpreterError};
