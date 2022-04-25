var pe=Object.defineProperty;var ge=(g,e,t)=>e in g?pe(g,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):g[e]=t;var u=(g,e,t)=>(ge(g,typeof e!="symbol"?e+"":e,t),t);import{d as K,o as x,c as b,u as i,R as fe,r as k,a as J,b as R,e as U,w as de,f as M,g as V,h as f,t as D,i as A,j as re,F as Y,k as G,l as H,m as he,n as O,p as _,D as me,q as ie,v as oe,s as Q,x as ce,y as C,z,A as we,B as ye,C as xe,E as Te,G as ve}from"./vendor.55905bae.js";const be=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}};be();const Ee=K({setup(g){return(e,t)=>(x(),b(i(fe)))}});class Le{constructor(){u(this,"src");u(this,"startTime");u(this,"endTime");u(this,"paused",!0)}setAudioTimes(e,t){return this.startTime=e,this.endTime=t,this}play(){return this.paused=!1,this}pause(){return this.paused=!0,this}getCurrentTime(){}}const De=k(new Le),N=()=>De,Ie=["src"],Ae={setup(g){const e=J(null),t=N();t.getCurrentTime=()=>e.value.currentTime;let n,s,r;const o=()=>{e.value.paused&&(e.value.play(),t.play(),a())},a=()=>{if(clearTimeout(r),s&&!e.value.paused){let m=s-e.value.currentTime;r=window.setTimeout(()=>{E(),p()},m*1e3)}},p=()=>{n&&(e.value.currentTime=n)},T=()=>{e.value.paused?o():E()},y=()=>{p(),a(),o()},E=()=>{e.value.paused||(e.value.pause(),t.pause(),a())},I=m=>{m.target instanceof HTMLInputElement||m.target instanceof HTMLTextAreaElement||(m.key==="p"?T():m.key==="r"&&y())};return R(()=>{document.addEventListener("keydown",I)}),U(()=>{document.removeEventListener("keydown",I)}),de(t,()=>{(n!==t.startTime||s!==t.endTime)&&(n=t.startTime,s=t.endTime,p(),a()),e.value.paused!==t.paused&&T()}),(m,d)=>(x(),M("audio",{controls:"",src:i(t).src,ref_key:"audio",ref:e},null,8,Ie))}},P=class{constructor(e,t){u(this,"word");u(this,"definition");u(this,"mastery");u(this,"sentenceId");this.word=e,this.sentenceId=t,this.definition="",this.mastery=0}updateMastery(e){return this.mastery|=e,this}hasMastery(e){return this.mastery&e}isDefined(){return this.mastery&P.MASTERY_LEVELS.DEFINED}setDefinition(e){this.definition=e,this.updateMastery(P.MASTERY_LEVELS.DEFINED)}getMasteryPercentage(){let e=0;for(let t=1;t<=P.MASTERY_LEVELS.LISTENING2;t<<=1)t&this.mastery&&(e+=1);return e/Object.keys(P.MASTERY_LEVELS).length}getNewCount(){return this.isDefined()?1:0}};let v=P;u(v,"MASTERY_LEVELS",{DEFINED:1<<0,VOCAB_IN_CONTEXT:1<<1,VOCAB_MATCHING:1<<2,CLOZE:1<<3,LISTENING1:1<<4,LISTENING2:1<<5}),u(v,"FULL_MASTERY",63);class w{}u(w,"READER","Reader"),u(w,"VOCAB_IN_CONTEXT","Vocabulary in Context"),u(w,"VOCAB_MATCHING","Vocabulary Matching"),u(w,"CLOZE","Cloze"),u(w,"LISTENING1","Listening 1"),u(w,"LISTENING2","Listening 2");const Se={class:"sidebar"},Ce={class:"sidebar-group"},Me=["value"],_e={class:"sidebar-group"},ke={class:"sidebar-group"},Ne=K({props:["runtimeData","statistics","masteryCounts"],emits:["updateLanguage","importDatabase","exportDatabase","openFiles","changeActivity"],setup(g,{emit:e}){const t=g;V(()=>console.log("Sidebar will update",t));const n=s=>{if(t.masteryCounts===void 0)return"";const r=t.masteryCounts[s];return r>0?`(${r})`:""};return(s,r)=>(x(),M("div",Se,[f("div",Ce,[f("h3",null,D(t.runtimeData.openTextFile),1),f("h4",null,D(t.runtimeData.openAudioFile),1),A(Ae),f("button",{onClick:r[0]||(r[0]=o=>s.$emit("openFiles"))},"Open Files"),f("input",{value:t.runtimeData.language,onChange:r[1]||(r[1]=o=>e("updateLanguage",o.target.value)),placeholder:"Language",type:"text"},null,40,Me)]),f("div",_e,[f("button",{onClick:r[2]||(r[2]=o=>e("changeActivity",i(w).READER))}," Reader "),f("button",{onClick:r[3]||(r[3]=o=>e("changeActivity",i(w).VOCAB_IN_CONTEXT))}," Vocabulary in Context "+D(n(i(v).MASTERY_LEVELS.VOCAB_IN_CONTEXT)),1),f("button",{onClick:r[4]||(r[4]=o=>e("changeActivity",i(w).VOCAB_MATCHING))}," Vocabulary Matching "+D(n(i(v).MASTERY_LEVELS.VOCAB_MATCHING)),1),f("button",{onClick:r[5]||(r[5]=o=>e("changeActivity",i(w).CLOZE))}," Cloze "+D(n(i(v).MASTERY_LEVELS.CLOZE)),1),f("button",{onClick:r[6]||(r[6]=o=>e("changeActivity",i(w).LISTENING1))}," Listening 1 "+D(n(i(v).MASTERY_LEVELS.LISTENING1)),1),f("button",{onClick:r[7]||(r[7]=o=>e("changeActivity",i(w).LISTENING2))}," Listening 2 "+D(n(i(v).MASTERY_LEVELS.LISTENING2)),1)]),f("div",ke,[f("button",{onClick:r[8]||(r[8]=o=>e("exportDatabase"))},"Export Database"),f("button",{onClick:r[9]||(r[9]=o=>e("importDatabase"))},"Import Database")])]))}}),We={id:"main"},$=K({props:["title","subtitle"],setup(g){return(e,t)=>(x(),M(Y,null,[f("div",We,[f("h2",null,D(g.title),1),f("h3",null,D(g.subtitle),1),re(e.$slots,"activity")]),re(e.$slots,"sidebar")],64))}});class L{static randomWordsByMastery(e,t){const n=Array.from(e.values()).filter(a=>a.definition!=="");if(n.length<t)return[];const s=n.map(a=>a.mastery);let r=Math.min(...s),o=[];for(;o.length<t;){const a=n.filter(p=>p.mastery===r);L.shuffle(a),o=o.concat(a.slice(0,t-o.length)),r+=1}return o}static cleanWord(e){const t=e.match(/\p{Letter}+/u);return t?t[0].toLowerCase():""}static shuffle(e){for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}}static randomItem(e){const t=Math.floor(Math.random()*e.length);return e[t]}static createHTML(e){const[t,...n]=e,s=document.createElement(t);for(const r in n){const o=n[r];if(Array.isArray(o))s.append(this.createHTML(o));else if(typeof o=="string"||typeof o=="number"||o instanceof Element)s.append(o);else if(typeof o=="object")for(const a in o)s[a]=o[a]}return s}static isEndChar(e){return e==="..."?!1:e.match(/[.?!]/)!==null}static nextEndPos(e,t){for(;;){const n=e.substring(t,t+1);if(e.substring(t,t+3)==="..."){t+=3;continue}if(n==="")return!1;if(this.isEndChar(n))break;t+=1}for(;;){const n=e.substring(t+1,t+2);if(!this.isEndChar(n))break;t+=1}for(;e.substring(t+1,t+2).match(/[\s“]/)!==null;)t+=1;return t}static createDraggableItem(e){const t=document.createElement(e.tag);return t.id=e.id,t.classList.add("matching-item"),t.innerText=e.text,t.draggable=!0,t.addEventListener("drop",n=>{n.preventDefault();const s=document.getElementById(n.dataTransfer.getData("text/plain")),r=n.target;if(r.draggable===!1)return;const o=r.innerHTML;r.innerHTML=s.innerHTML,s.innerHTML=o,r.classList.remove("drag-over"),e.onDrop&&e.onDrop(s,r,e)}),t.addEventListener("dragenter",n=>{n.preventDefault(),n.target.draggable!==!1&&n.target.classList.add("drag-over")}),t.addEventListener("dragover",n=>{n.preventDefault(),n.target.draggable!==!1&&n.target.classList.add("drag-over")}),t.addEventListener("dragleave",n=>{n.target.classList.remove("drag-over")}),t.addEventListener("dragstart",n=>{n.dataTransfer.setData("text/plain",n.target.id)}),t}static benchmark(e){const t=new Date().getTime();e();const n=new Date().getTime();console.log((n-t)/1e3)}static download(e,t){const n=document.createElement("a");n.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(t)),n.setAttribute("download",e),n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n)}static upload(){const e=document.createElement("input");return e.setAttribute("type","file"),e.setAttribute("multiple",""),e.style.display="none",document.body.appendChild(e),new Promise(t=>{e.addEventListener("change",()=>{t(e.files||new FileList),e.remove()}),e.click()})}static async uploadText(){return(await L.upload())[0]}static async openFiles(){const e=await L.upload(),t={};for(let n=0;n<e.length;n++){const s=e[n];s.type==="text/plain"&&(t.text=s),(s.type==="audio/mpeg"||s.type==="audio/x-m4a")&&(t.audio=s)}return t}}const j={props:["sentences","wordMap","selectedWordIndex","selectedSentenceIndex","highlighting","wordOptions"],emits:["selectWord"],setup(g,e){const t=n=>{if(g.wordMap===void 0)return"";let s=g.wordMap.get(n);if(!g.highlighting||!s.isDefined())return{backgroundColor:""};let r=(s.getMasteryPercentage()*120).toString(10);return{backgroundColor:"hsl("+r+",100%,75%)"}};return()=>{let n=0;if(g.sentences===void 0)return G("p");let s=g.sentences.map((r,o)=>{let p=r.getWordsAndSpaces().map(y=>{if(y.trim()==="")return y;let E=L.cleanWord(y);if(E==="")return y;let I=n;n+=1;let m=g.selectedWordIndex===I,d={selected:m},c=y;if(g.wordOptions){const h=g.wordOptions(y,E);h.bold&&(d.bold=!0),h.blank&&(c="__________")}let l={key:I,style:m?"":t(E),class:d,onClick(){e.emit("selectWord",I)}};return G("span",l,c)});const T={selected:g.selectedSentenceIndex===o};return G("span",{key:o,class:T},p)});return G("p",{className:g.highlighting?"highlight":""},s)}}},Pe={id:"props.id"},ae={props:["tag","text","focus","definition","language"],emits:["next","definitionUpdate"],setup(g,{emit:e}){const t=g,n=H(()=>t.tag?t.tag:"input"),s=J(null),r=J(t.definition),o=p=>{p.key==="Tab"&&(p.preventDefault(),p.target.blur(),e("next")),p.stopPropagation()},a=()=>{const p=t.text,T="https://translate.googleapis.com/translate_a/single?client=gtx&sl="+t.language+"&tl=en&dt=t&q="+encodeURI(p);fetch(T).then(y=>y.json()).then(y=>{r.value=y[0].map(([E])=>E).join(""),s.value.focus()})};return R(()=>{t.focus&&s.value.focus()}),(p,T)=>(x(),M("div",Pe,[f("span",null,D(t.text),1),(x(),b(he(i(n)),{ref_key:"definitionInput",ref:s,type:"text",placeholder:"Definition",value:r.value,onInput:T[0]||(T[0]=y=>r.value=y.target.value),onBlur:T[1]||(T[1]=y=>e("definitionUpdate",t.text,r.value)),onKeydown:o},null,8,["value"])),f("button",{onClick:a},"Google Translate")]))}};class Re{constructor(e){u(this,"wordIndex");u(this,"text");this.text=e,this.wordIndex=void 0}nextSentence(){if(this.wordIndex===void 0)return;const e=this.text().sentenceIndexByWordIndex,t=e[this.wordIndex];for(;;)if(this.wordIndex===this.text().words.length-1||(this.wordIndex+=1,e[this.wordIndex]!==t))return}nextWord(){this.wordIndex!==void 0&&this.wordIndex!==this.text().words.length-1&&(this.wordIndex+=1)}selectedWord(){return this.wordIndex===void 0?{}:this.text().words[this.wordIndex]}selectedSentence(){if(this.wordIndex===void 0)return{};const e=this.text().sentenceIndexByWordIndex[this.wordIndex],t=this.text().sentences[e].clean;return this.text().sentenceMap.get(t)}setIndex(e){this.wordIndex=e}getIndex(){return this.wordIndex}}const Oe={class:"sidebar right"},$e={class:"sidebar-group"},Fe={class:"sidebar-group"},Be={class:"sidebar-group"},Ve={props:["languageText","runtimeData"],emits:["changePageBy"],setup(g,{emit:e}){const t=g,n=N(),s=k({selectedWordCursor:new Re(()=>t.languageText),highlighting:!1,page:t.runtimeData.currentPage,marker:void 0}),r=H(()=>s.selectedWordCursor.selectedWord()),o=H(()=>s.selectedWordCursor.selectedSentence()),a=(...m)=>t.languageText.updateWordDefinition(...m),p=(...m)=>t.languageText.updateSentenceDefinition(...m),T=()=>{const m=t.languageText.sentences,d=t.languageText.sentenceMap;if(m.length===0)return;const c=m[0].clean,l=m[m.length-1].clean,h=d.get(c).startTime,S=d.get(l).endTime;n.setAudioTimes(h,S),n.pause()},y=()=>{t.runtimeData.currentPage!==s.page&&(s.selectedWordCursor.setIndex(void 0),s.page=t.runtimeData.currentPage)},E=()=>{s.marker===void 0?(n.play(),s.marker=0):s.marker+=1;let m=t.languageText.sentences;if(s.marker>0){let l=m[s.marker-1],h=t.languageText.sentenceMap.get(l.clean);t.languageText.updateSentenceTimes(h,null,n.getCurrentTime())}if(s.marker===m.length){n.pause(),s.marker=void 0;return}let d=m[s.marker],c=t.languageText.sentenceMap.get(d.clean);t.languageText.updateSentenceTimes(c,n.getCurrentTime(),null)},I=m=>{m.target instanceof HTMLInputElement||m.target instanceof HTMLTextAreaElement||m.key==="m"&&E()};return R(()=>{document.addEventListener("keydown",I)}),U(()=>{document.removeEventListener("keydown",I)}),V(()=>{y(),T()}),O(()=>{T()}),(m,d)=>(x(),b($,{title:"Reader",subtitle:"Page "+(t.runtimeData.currentPage+1)},{activity:_(()=>[(x(),b(j,{sentences:t.languageText.sentences,"word-map":t.languageText.wordMap,key:t.runtimeData.currentPage,"selected-word-index":i(s).selectedWordCursor.getIndex(),"selected-sentence-index":i(s).marker,highlighting:i(s).highlighting,onSelectWord:d[0]||(d[0]=c=>i(s).selectedWordCursor.setIndex(c))},null,8,["sentences","word-map","selected-word-index","selected-sentence-index","highlighting"]))]),sidebar:_(()=>[f("div",Oe,[f("div",$e,[(x(),b(ae,{id:"word-definition",key:i(r).word,text:i(r).word,focus:i(s).selectedWordCursor.getIndex()!==void 0,definition:i(r).definition,language:t.runtimeData.language,onDefinitionUpdate:a,onNext:d[1]||(d[1]=c=>i(s).selectedWordCursor.nextWord())},null,8,["text","focus","definition","language"])),(x(),b(ae,{tag:"textarea",id:"sentence-definition",key:i(o).sentence,text:i(o).sentence,definition:i(o).definition,language:t.runtimeData.language,onDefinitionUpdate:p,onNext:d[2]||(d[2]=c=>i(s).selectedWordCursor.nextSentence())},null,8,["text","definition","language"]))]),f("div",Fe,[f("button",{onClick:d[3]||(d[3]=c=>e("changePageBy",-1))},"Previous Page"),f("button",{onClick:d[4]||(d[4]=c=>e("changePageBy",1))},"Next Page")]),f("div",Be,[f("button",{onClick:d[5]||(d[5]=c=>i(s).highlighting=!i(s).highlighting)}," Toggle Highlighting ")])])]),_:1},8,["subtitle"]))}};class B{constructor(){u(this,"currentPage");u(this,"xpToday");u(this,"xpLast");u(this,"xpDate");u(this,"openAudioFile");u(this,"openTextFile");u(this,"wordsLearnedToday");u(this,"language");this.xpToday=0,this.xpLast=0,this.xpDate=new Date().toLocaleDateString(),this.currentPage=0,this.wordsLearnedToday=0,this.language="es"}static fromObject(e){const t=new B;return Object.assign(t,e),t}updateForNewDay(){this.isNewDay()&&(this.xpLast=this.xpToday,this.xpToday=0,this.xpDate=new Date().toLocaleDateString(),this.wordsLearnedToday=0)}isNewDay(){return this.xpDate!==new Date().toLocaleDateString()}openNewTextFile(e){this.openTextFile=e,this.currentPage=0}openNewAudioFile(e){this.openAudioFile=e}}class le{constructor(e,t=""){u(this,"id");u(this,"sentence");u(this,"definition");u(this,"mastery");u(this,"startTime");u(this,"endTime");this.sentence=e,this.definition=t,this.mastery=0}getRawWords(){return this.sentence.split(/\s+/).filter(e=>e!=="")}updateTimes(e,t){Number.isNaN(e)||(this.startTime=e),Number.isNaN(t)||(this.endTime=t)}}class Ge{constructor(){u(this,"db");this.db=new me("LanguageDB"),this.db.version(2).stores({words:"word, mastery",sentences:"++id, sentence",other:"key"}),this.db.words.mapToClass(v),this.db.sentences.mapToClass(le)}getWord(e){return this.db.words.get(e)}getSentence(e){return this.db.sentences.where("sentence").equals(e).first()}getSentenceById(e){return this.db.sentences.get(e)}getNumberOfWords(){return this.db.words.count()}putWords(e){return this.db.words.bulkPut(e)}putSentence(e){return console.log("Updating sentence",e),this.db.sentences.put(e)}async import(e){return await this.db.words.clear(),await this.db.sentences.clear(),await this.db.other.delete("runtimeData"),console.log("importing words"),await this.putWords(e.words),console.log("done importing words"),console.log("importing sentences"),await this.db.sentences.bulkPut(e.sentences),console.log("done importing sentences"),await this.db.other.put({key:"runtimeData",value:e.runtimeData}),console.log("done import"),"done"}async export(){const e=await this.db.words.toArray(),t=await this.db.sentences.toArray();return{runtimeData:await this.getRuntimeData(),sentences:t,words:e}}getRuntimeData(){return this.db.other.get("runtimeData").then(e=>e===void 0?new B:B.fromObject(e.value))}putRuntimeData(e){console.log("Saving runtime data",e),this.db.other.put({key:"runtimeData",value:e})}getTextFile(){return this.db.other.get("textFile").then(e=>e===void 0?void 0:e.value)}putTextFile(e){this.db.other.put({key:"textFile",value:e})}getAudioFile(){return this.db.other.get("audioFile").then(e=>e===void 0?void 0:e.value)}putAudioFile(e){this.db.other.put({key:"audioFile",value:e})}async getSentencesForWords(e){const t=await this.db.sentences.bulkGet(e.map(n=>n.sentenceId));return new Map(t.map(n=>[n.id,n]))}async getPracticeByType(e){const n=(await this.db.words.where("mastery").notEqual(v.FULL_MASTERY).toArray()).filter(s=>s.isDefined()&&!s.hasMastery(e));return L.shuffle(n),n}async getMasteryCounts(){const e=await this.db.words.where("mastery").notEqual(v.FULL_MASTERY).toArray(),t={},n=Object.values(v.MASTERY_LEVELS);return n.forEach(s=>{t[s]=0}),e.forEach(s=>{n.forEach(r=>{s.isDefined()&&!s.hasMastery(r)&&(t[r]+=1)})}),t}async getAllWords(){return await this.db.words.toArray()}async getDefinedSentences(){return(await this.db.sentences.toArray()).filter(e=>e.definition!=="")}}const He=new Ge,ee=()=>He,te={props:["sentence"],setup(g){const e=g,t=N(),n=ee(),s=k({startTime:e.sentence.startTime,endTime:e.sentence.endTime});de(e,()=>{s.startTime=e.sentence.startTime,s.endTime=e.sentence.endTime});const r=a=>{if(a!=="")return Number.parseFloat(a)},o=()=>{let a=r(s.startTime),p=r(s.endTime);e.sentence.updateTimes(a,p),t.setAudioTimes(a,p),n.putSentence(Q(e.sentence))};return(a,p)=>(x(),M(Y,null,[ie(f("input",{ref:"definitionInput",type:"number",placeholder:"Start Time","onUpdate:modelValue":p[0]||(p[0]=T=>i(s).startTime=T),onBlur:o},null,544),[[oe,i(s).startTime]]),ie(f("input",{ref:"definitionInput",type:"number",placeholder:"End Time","onUpdate:modelValue":p[1]||(p[1]=T=>i(s).endTime=T),onBlur:o},null,544),[[oe,i(s).endTime]])],64))}},Ue=["onClick"],X={props:["pool","solution"],emits:["correctAnswer"],setup(g,{emit:e}){const t=g;let n;const s=o=>{o===t.solution&&e("correctAnswer")},r=H(()=>{const o=[t.solution];for(let a=0;a<20;a+=1){let p=L.randomItem(t.pool);if(o.indexOf(p)===-1&&o.push(p),o.length===4)break}return L.shuffle(o),o});return R(()=>{n=o=>{if(!(o.target instanceof HTMLInputElement||o.target instanceof HTMLTextAreaElement)&&["1","2","3","4"].indexOf(o.key)!==-1){o.preventDefault();let p=Number.parseInt(o.key)-1;s(r.value[p])}},document.addEventListener("keydown",n)}),U(()=>{document.removeEventListener("keydown",n)}),(o,a)=>(x(),M("div",null,[(x(!0),M(Y,null,ce(i(r),(p,T)=>(x(),M("button",{key:"index",class:"multiple-choice",onClick:y=>s(p)},D(`${T+1}. ${p}`),9,Ue))),128))]))}};class ue{constructor(e,t,n=void 0){u(this,"raw");u(this,"clean");u(this,"sentenceId");this.raw=e,this.clean=t,this.sentenceId=n}getWords(){return this.clean.split(/\s+/).map(L.cleanWord).filter(e=>e!=="")}getWordsAndSpaces(){return this.raw.split(/(\s+)/)}}class Z{constructor(e,t,n){u(this,"masteryLevel");u(this,"practiceWords");u(this,"wordIndex");u(this,"sentences");u(this,"wordPool");u(this,"sentencePool");u(this,"db");u(this,"done");this.masteryLevel=e,this.db=t,this.practiceWords=[],this.wordIndex=0,this.sentences=new Map,this.wordPool=[],this.sentencePool=[],this.done=n}word(){return this.practiceWords[this.wordIndex]}sentence(){const e=this.word();if(e!==void 0)return this.sentences.get(e.sentenceId)}rawSentences(){const e=this.sentence();return e===void 0?[]:[new ue(e.sentence,e.sentence,e.id)]}correctAnswer(){const e=this.word();e.updateMastery(this.masteryLevel),this.db.putWords([Q(e)]),this.wordIndex+=1,this.wordIndex===this.practiceWords.length&&this.done()}async load(){const e=await this.db.getPracticeByType(this.masteryLevel),t=await this.db.getSentencesForWords(e),n=await this.db.getAllWords(),s=(await this.db.getDefinedSentences()).map(r=>r.definition);this.practiceWords=e,this.sentences=t,this.wordPool=n,this.sentencePool=s}}const Ye={class:"sidebar right"},je={class:"sidebar-group"},Xe={props:["db"],emits:["done"],setup(g,{emit:e}){const t=g,n=N(),s=k(new Z(v.MASTERY_LEVELS.VOCAB_IN_CONTEXT,t.db,()=>e("done"))),r=(a,p)=>p===s.word().word?{bold:!0}:{},o=()=>s.wordPool.filter(a=>a.isDefined()).map(a=>a.definition);return O(()=>{s.load()}),V(()=>{const a=s.sentence();n.setAudioTimes(a.startTime,a.endTime),n.play()}),(a,p)=>i(s).word()?(x(),b($,{key:0,title:i(w).VOCAB_IN_CONTEXT},{activity:_(()=>[A(j,{sentences:i(s).rawSentences(),"word-options":r},null,8,["sentences"]),A(X,{pool:o(),solution:i(s).word().definition,onCorrectAnswer:p[0]||(p[0]=()=>i(s).correctAnswer())},null,8,["pool","solution"])]),sidebar:_(()=>[f("div",Ye,[f("div",je,[A(te,{sentence:i(s).sentence()},null,8,["sentence"])])])]),_:1},8,["title"])):C("",!0)}},Ze={emits:["done"],setup(g,{emit:e}){const t=ee(),n=k({practiceWords:[],practiceIndex:0,words:[],grid:[]});O(async()=>{n.practiceWords=await t.getPracticeByType(v.MASTERY_LEVELS.VOCAB_MATCHING),E()}),R(()=>{document.addEventListener("keydown",m)}),U(()=>{document.removeEventListener("keydown",m)});const s=(d,c)=>n.grid[c][d],r=(d,c,l)=>{n.grid[c][d]=l},o=(d,c)=>{const l=s(d,c);return{"matching-item":!0,selected:l===void 0?!1:l.selected}},a=(d,c)=>{const l=s(d,c);return l===void 0?"":n.words[l.wordIndex].definition},p=d=>{for(let c=0;c<n.words.length;c++)for(let l=0;l<n.words.length;l++){const h=s(l,c);if(h&&d(h))return[l,c]}},T=()=>{const[d,c]=p(F=>F.selected),l=s(d,c),h=(l.shuffledIndex+1)%n.words.length,[S,W]=p(F=>F.shuffledIndex===h),se=s(S,W);l.selected=!1,se.selected=!0},y=(d,c)=>{const[l,h]=p(q=>q.selected),S=l+d,W=h+c;if(!(1<=S&&S<=2&&0<=W&&W<=n.words.length-1))return;const F=s(S,W);r(S,W,s(l,h)),r(l,h,F),I()&&(n.words.forEach(q=>q.updateMastery(v.MASTERY_LEVELS.VOCAB_MATCHING)),t.putWords(n.words.map(Q)),E())},E=()=>{n.words=n.practiceWords.slice(n.practiceIndex,n.practiceIndex+8),n.words.length===0&&e("done");const d=n.words.map((c,l)=>l);L.shuffle(d),n.grid=d.map((c,l)=>[void 0,void 0,{wordIndex:c,shuffledIndex:l,selected:l===0}]),n.practiceIndex+=n.words.length},I=()=>{for(let d=0;d<n.words.length;d++){const c=s(1,d);if(c===void 0||c.wordIndex!==d)return!1}return!0},m=d=>{d.key==="Tab"&&(d.preventDefault(),T()),d.key==="ArrowDown"&&(d.preventDefault(),y(0,1)),d.key==="ArrowLeft"&&(d.preventDefault(),y(-1,0)),d.key==="ArrowUp"&&(d.preventDefault(),y(0,-1)),d.key==="ArrowRight"&&(d.preventDefault(),y(1,0)),d.stopPropagation()};return(d,c)=>i(n).practiceWords.length>0?(x(),b($,{key:0,title:i(w).VOCAB_IN_CONTEXT},{activity:_(()=>[f("table",null,[(x(!0),M(Y,null,ce(i(n).words,(l,h)=>(x(),M("tr",null,[f("td",{class:z(o(0,h))},D(l.word),3),f("td",{class:z(o(1,h))},D(a(1,h)),3),f("td",{class:z(o(2,h))},D(a(2,h)),3)]))),256))])]),_:1},8,["title"])):C("",!0)}},qe={props:["db"],emits:["done"],setup(g,{emit:e}){const t=g,n=k(new Z(v.MASTERY_LEVELS.CLOZE,t.db,()=>e("done"))),s=(o,a)=>a===n.word().word?{blank:!0}:{},r=()=>n.wordPool.map(o=>o.word);return O(()=>{n.load()}),(o,a)=>i(n).word()?(x(),b($,{key:0,title:i(w).CLOZE},{activity:_(()=>[A(j,{sentences:i(n).rawSentences(),"word-options":s},null,8,["sentences"]),A(X,{pool:r(),solution:i(n).word().word,onCorrectAnswer:a[0]||(a[0]=()=>i(n).correctAnswer())},null,8,["pool","solution"])]),_:1},8,["title"])):C("",!0)}},ze={class:"sidebar right"},Je={class:"sidebar-group"},Ke={props:["db"],emits:["done"],setup(g,{emit:e}){const t=g,n=N(),s=k(new Z(v.MASTERY_LEVELS.LISTENING1,t.db,()=>e("done"))),r=(a,p)=>p===s.word().word?{blank:!0}:{},o=()=>s.wordPool.map(a=>a.word);return O(()=>{s.load()}),V(()=>{const a=s.sentence();n.setAudioTimes(a.startTime,a.endTime),n.play()}),(a,p)=>i(s).word()?(x(),b($,{key:0,title:i(w).LISTENING1},{activity:_(()=>[A(j,{sentences:i(s).rawSentences(),"word-options":r},null,8,["sentences"]),A(X,{pool:o(),solution:i(s).word().word,onCorrectAnswer:p[0]||(p[0]=()=>i(s).correctAnswer())},null,8,["pool","solution"])]),sidebar:_(()=>[f("div",ze,[f("div",Je,[A(te,{sentence:i(s).sentence()},null,8,["sentence"])])])]),_:1},8,["title"])):C("",!0)}},Qe={class:"sidebar right"},et={class:"sidebar-group"},tt={props:["db"],emits:["done"],setup(g,{emit:e}){const t=g,n=N(),s=k(new Z(v.MASTERY_LEVELS.LISTENING2,t.db,()=>e("done")));return O(()=>{s.load()}),V(()=>{const r=s.sentence();n.setAudioTimes(r.startTime,r.endTime),n.play()}),(r,o)=>i(s).sentence()?(x(),b($,{key:0,title:i(w).LISTENING2},{activity:_(()=>[A(X,{pool:i(s).sentencePool,solution:i(s).sentence().definition,onCorrectAnswer:o[0]||(o[0]=()=>i(s).correctAnswer())},null,8,["pool","solution"])]),sidebar:_(()=>[f("div",Qe,[f("div",et,[A(te,{sentence:i(s).sentence()},null,8,["sentence"])])])]),_:1},8,["title"])):C("",!0)}};class nt{constructor(e,t,n,s,r){u(this,"filename");u(this,"totalWordsTranslated");u(this,"db");u(this,"pages");u(this,"text");u(this,"sentences");u(this,"sentenceMap");u(this,"sentenceIndexByWordIndex");u(this,"words");u(this,"wordMap");u(this,"promise");u(this,"onNewWordLearned");this.db=e,this.filename=t,this.totalWordsTranslated=0,this.pages=this.extractPages(n),this.onNewWordLearned=r,this.sentences=[],this.sentenceMap=new Map,this.words=[],this.wordMap=new Map,this.sentenceIndexByWordIndex=[],this.promise=new Promise(o=>o()),this.setPage(s)}async load(){await this.loadSentences(),await this.loadWords(),await this.loadTotalWordsTranslated()}onUpdateDefinition(e){}setPage(e){return e<0||e>=this.pages.length?!1:(this.text=this.pages[e],!0)}extractPages(e){const n=[];let s=0,r=0,o=0,a=0;for(;a++,a!==1e3;){if(o=e.indexOf(`
`,r+1),o===-1){n.push(e.substring(s));break}if(o-s>1e3){const p=Math.abs(r-s-1e3),T=Math.abs(o-s-1e3),y=p<T?r:o;n.push(e.substring(s,y)),s=y}r=o}return n}async loadWords(){this.wordMap=new Map,this.words=[],this.sentenceIndexByWordIndex=[];let e=0;for(const t of this.sentences){const n=t.getWords();for(const s of n){let r=this.wordMap.get(s);r===void 0&&(r=await this.db.getWord(s)),r===void 0&&(r=new v(s,t.sentenceId)),r.sentenceId===void 0&&(r.sentenceId=t.sentenceId),this.words.push(r),this.wordMap.set(s,r),this.sentenceIndexByWordIndex.push(e)}await this.db.putWords([...this.wordMap.values()]),e+=1}}async loadTotalWordsTranslated(){this.totalWordsTranslated=await this.db.getNumberOfWords()}updateWordDefinition(e,t){const n=this.wordMap.get(e);n!==void 0&&n.definition!==t&&(n.isDefined()||(this.totalWordsTranslated+=1,this.onNewWordLearned()),n.setDefinition(t),console.log("Updating definition... for "+e+" to "+t),this.db.putWords([n]),this.onUpdateDefinition(e))}updateSentenceDefinition(e,t){const n=this.sentenceMap.get(e);n!==void 0&&n.definition!==t&&(n.definition=t,console.log("Updating definition... for "+e+" to "+t),this.db.putSentence(n))}updateMastery(e){e=e.map(t=>this.words.get(t).nextMastery()),this.db.putWords(e)}updateStats(){let e=0,t=0;this.wordMap.forEach(r=>{e+=r.mastery,t+=r.getNewCount()});const n=0,s=e/(this.wordMap.size*5);return{newWords:t,totalWordsTranslated:this.totalWordsTranslated,percentTranslated:n,percentWordsMastered:s}}async loadSentences(){let e=0;for(this.sentences=[],this.sentenceMap=new Map,this.text===void 0&&(this.text="");;){const t=L.nextEndPos(this.text,e),n=this.text.substring(e,t===!1?void 0:t+1);if(n==="")break;const s=n.trim();if(this.sentences.push(new ue(n,s)),t===!1)break;e=t+1}for(const t of this.sentences){if(this.sentenceMap.has(t.clean))continue;let n=await this.db.getSentence(t.clean);n===void 0&&(n=new le(t.clean),n.id=await this.db.putSentence(n)),this.sentenceMap.set(t.clean,n),t.sentenceId=n.id}}updateSentenceTimes(e,t,n){t!==null&&(e.startTime=t),n!==null&&(e.endTime=n),this.db.putSentence(e)}updateSentence(e){this.sentenceMap.set(e.sentence,e),this.db.putSentence(e)}getWordMap(e){const t=new Map;return e.forEach(n=>{t.set(n,this.words.get(n))}),t}getWordStrArray(){return Array.from(this.words).map(e=>e[1].word)}getSentenceDefinitionArray(){return Array.from(this.sentenceMap).map(e=>e[1].definition)}getDefinitionArray(){return Array.from(this.words).map(e=>e[1].definition)}leastMasteredWord(e){const t=this.getWordMap(e.getWords());return L.randomWordsByMastery(t,1)[0]}leastMastery(){let e=v.MAX_MASTERY;return Array.from(this.words).forEach(([t,n])=>{n.definition!==""&&n.mastery<e&&(e=n.mastery)}),e}}const st={setup(g){const e=ee(),t=we(void 0),n=N();let s=new B;const r=k({runtimeData:s,masteryCounts:{},activity:w.READER}),o=async()=>{if(s=await e.getRuntimeData(),r.runtimeData=s,r.runtimeData.updateForNewDay(),r.masteryCounts=await e.getMasteryCounts(),console.log(r.runtimeData),r.runtimeData.openTextFile){const c=await e.getTextFile();t.value=await a(c),d()}if(r.runtimeData.openAudioFile){let c=await e.getAudioFile();n.src=URL.createObjectURL(c)}},a=async c=>{let l=new nt(e,r.runtimeData.openTextFile,c,r.runtimeData.currentPage,p);return await l.load(),l},p=()=>{r.runtimeData.wordsLearnedToday+=1,r.runtimeData.xpToday+=1,e.putRuntimeData(s)},T=async()=>{const c=await L.openFiles(),l=c.text,h=c.audio;if(l){const S=await l.text();r.runtimeData.openNewTextFile(l.name),t.value=await a(S),e.putTextFile(S),d()}h&&(r.runtimeData.openNewAudioFile(h.name),n.src=URL.createObjectURL(h),e.putAudioFile(h)),e.putRuntimeData(s)},y=async c=>{let l=r.runtimeData.currentPage+c;!t.value.setPage(l)||(await t.value.load(),r.runtimeData.currentPage=l,e.putRuntimeData(s))},E=c=>{r.runtimeData.language=c,e.putRuntimeData(s)},I=async()=>{const l=await(await L.uploadText()).text();await e.import(JSON.parse(l)),await o()},m=async()=>{let c=await e.export();L.download("language-db.json",JSON.stringify(c))},d=()=>{let c=t.value.updateStats();c.wordsLearnedToday=r.runtimeData.wordsLearnedToday,c.xpToday=r.runtimeData.xpToday,c.xpLast=r.runtimeData.xpLast,r.statistics=c};return R(o),(c,l)=>(x(),M("div",null,[A(Ne,{"runtime-data":i(r).runtimeData,statistics:i(r).statistics,"mastery-counts":i(r).masteryCounts,onOpenFiles:T,onUpdateLanguage:E,onImportDatabase:I,onExportDatabase:m,onChangeActivity:l[0]||(l[0]=h=>i(r).activity=h)},null,8,["runtime-data","statistics","mastery-counts"]),i(r).activity===i(w).READER&&i(t)?(x(),b(Ve,{key:0,"runtime-data":i(r).runtimeData,"language-text":i(t),onChangePageBy:y},null,8,["runtime-data","language-text"])):C("",!0),i(r).activity===i(w).VOCAB_IN_CONTEXT?(x(),b(Xe,{key:1,db:i(e),onDone:l[1]||(l[1]=h=>i(r).activity=i(w).READER)},null,8,["db"])):C("",!0),i(r).activity===i(w).VOCAB_MATCHING?(x(),b(Ze,{key:2,onDone:l[2]||(l[2]=h=>i(r).activity=i(w).READER)})):C("",!0),i(r).activity===i(w).CLOZE?(x(),b(qe,{key:3,db:i(e),onDone:l[3]||(l[3]=h=>i(r).activity=i(w).READER)},null,8,["db"])):C("",!0),i(r).activity===i(w).LISTENING1?(x(),b(Ke,{key:4,db:i(e),onDone:l[4]||(l[4]=h=>i(r).activity=i(w).READER)},null,8,["db"])):C("",!0),i(r).activity===i(w).LISTENING2?(x(),b(tt,{key:5,db:i(e),onDone:l[5]||(l[5]=h=>i(r).activity=i(w).READER)},null,8,["db"])):C("",!0)]))}},rt=ye({history:xe("/language-reader-vue/"),routes:[{path:"/",name:"main",component:st}]}),ne=Te(Ee);ne.use(ve());ne.use(rt);ne.mount("#app");