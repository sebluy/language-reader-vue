var be=Object.defineProperty;var Ee=(l,e,t)=>e in l?be(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t;var d=(l,e,t)=>(Ee(l,typeof e!="symbol"?e+"":e,t),t);import{d as ae,o as y,c as b,u as r,R as Le,r as k,a as z,b as H,e as K,w as re,f as A,D as Se,C as ne,g as _e,h as F,i as Ae,j as p,t as D,k as I,l as j,m as C,n as pe,F as X,p as Z,q as J,s as Ie,v as N,x as oe,y as fe,z as he,A as de,B as se,E as Me,G as Ce,H as ke,I as We,J as Ne,K as Pe}from"./vendor.58a30b24.js";const Re=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerpolicy&&(a.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?a.credentials="include":i.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}};Re();const $e=ae({setup(l){return(e,t)=>(y(),b(r(Le)))}});class Oe{constructor(){d(this,"src");d(this,"startTime");d(this,"endTime");d(this,"paused",!0)}setAudioTimes(e,t){return this.startTime=e,this.endTime=t,this}play(){return this.paused=!1,this}pause(){return this.paused=!0,this}getCurrentTime(){}}const Fe=k(new Oe),B=()=>Fe,Be=["src"],Ve={setup(l){const e=z(null),t=B();t.getCurrentTime=()=>e.value.currentTime;let n,i,a;const s=()=>{e.value.paused&&(e.value.play(),t.play(),c())},c=()=>{if(clearTimeout(a),i&&!e.value.paused){let E=i-e.value.currentTime;a=window.setTimeout(()=>{_(),u()},E*1e3)}},u=()=>{n&&(e.value.currentTime=n)},m=()=>{e.value.paused?s():_()},w=()=>{u(),c(),s()},_=()=>{e.value.paused||(e.value.pause(),t.pause(),c())},S=E=>{E.target instanceof HTMLInputElement||E.target instanceof HTMLTextAreaElement||(E.key==="p"?m():E.key==="r"&&w())};return H(()=>{document.addEventListener("keydown",S)}),K(()=>{document.removeEventListener("keydown",S)}),re(t,()=>{(n!==t.startTime||i!==t.endTime)&&(n=t.startTime,i=t.endTime,u(),c()),e.value.paused!==t.paused&&m()}),(E,W)=>(y(),A("audio",{controls:"",src:r(t).src,ref_key:"audio",ref:e},null,8,Be))}};class Te{constructor(e,t=""){d(this,"id");d(this,"sentence");d(this,"definition");d(this,"mastery");d(this,"startTime");d(this,"endTime");this.sentence=e,this.definition=t,this.mastery=0}getRawWords(){return this.sentence.split(/\s+/).filter(e=>e!=="")}updateTimes(e,t){Number.isNaN(e)||(this.startTime=e),Number.isNaN(t)||(this.endTime=t)}}const O=class{constructor(e,t){d(this,"word");d(this,"definition");d(this,"mastery");d(this,"sentenceId");this.word=e,this.sentenceId=t,this.definition="",this.mastery=0}updateMastery(e){return this.mastery|=e,this}hasMastery(e){return this.mastery&e}isDefined(){return this.mastery&O.MASTERY_LEVELS.DEFINED}isMastered(){return this.mastery===O.FULL_MASTERY}setDefinition(e){this.definition=e,this.updateMastery(O.MASTERY_LEVELS.DEFINED)}getMasteryPercentage(){let e=0;for(let t=1;t<=O.MASTERY_LEVELS.LISTENING2;t<<=1)t&this.mastery&&(e+=1);return e/O.MASTERY_LEVEL_COUNT}getNewCount(){return this.isDefined()?1:0}};let v=O;d(v,"MASTERY_LEVELS",{DEFINED:1<<0,VOCAB_IN_CONTEXT:1<<1,VOCAB_MATCHING:1<<2,CLOZE:1<<3,LISTENING1:1<<4,LISTENING2:1<<5}),d(v,"MASTERY_LEVEL_COUNT",6),d(v,"FULL_MASTERY",63);class L{static randomWordsByMastery(e,t){const n=Array.from(e.values()).filter(c=>c.definition!=="");if(n.length<t)return[];const i=n.map(c=>c.mastery);let a=Math.min(...i),s=[];for(;s.length<t;){const c=n.filter(u=>u.mastery===a);L.shuffle(c),s=s.concat(c.slice(0,t-s.length)),a+=1}return s}static cleanWord(e){const t=e.match(/\p{Letter}+/u);return t?t[0].toLowerCase():""}static shuffle(e){for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}}static randomItem(e){const t=Math.floor(Math.random()*e.length);return e[t]}static createHTML(e){const[t,...n]=e,i=document.createElement(t);for(const a in n){const s=n[a];if(Array.isArray(s))i.append(this.createHTML(s));else if(typeof s=="string"||typeof s=="number"||s instanceof Element)i.append(s);else if(typeof s=="object")for(const c in s)i[c]=s[c]}return i}static isEndChar(e){return e==="..."?!1:e.match(/[.?!]/)!==null}static nextEndPos(e,t){for(;;){const n=e.substring(t,t+1);if(e.substring(t,t+3)==="..."){t+=3;continue}if(n==="")return!1;if(this.isEndChar(n))break;t+=1}for(;;){const n=e.substring(t+1,t+2);if(!this.isEndChar(n))break;t+=1}for(;e.substring(t+1,t+2).match(/[\s“]/)!==null;)t+=1;return t}static createDraggableItem(e){const t=document.createElement(e.tag);return t.id=e.id,t.classList.add("matching-item"),t.innerText=e.text,t.draggable=!0,t.addEventListener("drop",n=>{n.preventDefault();const i=document.getElementById(n.dataTransfer.getData("text/plain")),a=n.target;if(a.draggable===!1)return;const s=a.innerHTML;a.innerHTML=i.innerHTML,i.innerHTML=s,a.classList.remove("drag-over"),e.onDrop&&e.onDrop(i,a,e)}),t.addEventListener("dragenter",n=>{n.preventDefault(),n.target.draggable!==!1&&n.target.classList.add("drag-over")}),t.addEventListener("dragover",n=>{n.preventDefault(),n.target.draggable!==!1&&n.target.classList.add("drag-over")}),t.addEventListener("dragleave",n=>{n.target.classList.remove("drag-over")}),t.addEventListener("dragstart",n=>{n.dataTransfer.setData("text/plain",n.target.id)}),t}static benchmark(e){const t=new Date().getTime();e();const n=new Date().getTime();console.log((n-t)/1e3)}static download(e,t){const n=document.createElement("a");n.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(t)),n.setAttribute("download",e),n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n)}static upload(){const e=document.createElement("input");return e.setAttribute("type","file"),e.setAttribute("multiple",""),e.style.display="none",document.body.appendChild(e),new Promise(t=>{e.addEventListener("change",()=>{t(e.files||new FileList),e.remove()}),e.click()})}static async uploadText(){return(await L.upload())[0]}static async openFiles(){const e=await L.upload(),t={};for(let n=0;n<e.length;n++){const i=e[n];i.type==="text/plain"&&(t.text=i),(i.type==="audio/mpeg"||i.type==="audio/x-m4a")&&(t.audio=i)}return t}}class G{constructor(){d(this,"currentPage");d(this,"openAudioFile");d(this,"openTextFile");d(this,"date");d(this,"definedToday");d(this,"learnedToday");d(this,"masteredToday");d(this,"language");this.date=new Date().toLocaleDateString(),this.currentPage=0,this.definedToday=[],this.learnedToday=0,this.masteredToday=0,this.language="es"}static fromObject(e){const t=new G;return Object.assign(t,e),t}load(e){Object.assign(this,e)}updateForNewDay(){this.date=new Date().toLocaleDateString()}isNewDay(){return this.date!==new Date().toLocaleDateString()}openNewTextFile(e){this.openTextFile=e,this.currentPage=0}openNewAudioFile(e){this.openAudioFile=e}}const He=new G,ce=()=>He;class me{constructor(e,t,n,i){d(this,"date");d(this,"defined");d(this,"learned");d(this,"mastered");this.date=e,this.defined=t,this.learned=n,this.mastered=i}}class Ue{constructor(){d(this,"db");this.db=new Se("LanguageDB"),this.db.version(3).stores({words:"word, mastery",sentences:"++id, sentence",history:"date",other:"key"}),this.db.words.mapToClass(v),this.db.sentences.mapToClass(Te),this.db.history.mapToClass(me)}getWord(e){return this.db.words.get(e)}getSentence(e){return this.db.sentences.where("sentence").equals(e).first()}getSentenceById(e){return this.db.sentences.get(e)}putWords(e){return this.db.words.bulkPut(e)}putSentence(e){return console.log("Updating sentence",e),this.db.sentences.put(e)}async import(e){return await this.db.words.clear(),await this.db.sentences.clear(),await this.db.history.clear(),await this.db.other.delete("runtimeData"),console.log("importing words"),await this.putWords(e.words),console.log("done importing words"),console.log("importing sentences"),await this.db.sentences.bulkPut(e.sentences),console.log("done importing sentences"),await this.db.history.bulkPut(e.history),await this.db.other.put({key:"runtimeData",value:e.runtimeData}),console.log("done import"),"done"}async export(){const e=await this.db.words.toArray(),t=await this.db.sentences.toArray(),n=await this.getRuntimeData(),i=await this.getHistory();return{runtimeData:n,sentences:t,words:e,history:i}}getRuntimeData(){return this.db.other.get("runtimeData").then(e=>e===void 0?new G:G.fromObject(e.value))}putRuntimeData(e){console.log("Saving runtime data",e),this.db.other.put({key:"runtimeData",value:e})}getTextFile(){return this.db.other.get("textFile").then(e=>e===void 0?void 0:e.value)}putTextFile(e){this.db.other.put({key:"textFile",value:e})}getAudioFile(){return this.db.other.get("audioFile").then(e=>e===void 0?void 0:e.value)}putAudioFile(e){this.db.other.put({key:"audioFile",value:e})}async getSentencesForWords(e){const t=await this.db.sentences.bulkGet(e.map(n=>n.sentenceId));return new Map(t.map(n=>[n.id,n]))}async getPracticeByType(e){const n=(await this.db.words.where("mastery").notEqual(v.FULL_MASTERY).toArray()).filter(i=>i.isDefined()&&!i.hasMastery(e));return L.shuffle(n),n}async getMasteryCounts(){const e=await this.db.words.where("mastery").notEqual(v.FULL_MASTERY).toArray(),t={},n=Object.values(v.MASTERY_LEVELS);return n.forEach(i=>{t[i]=0}),e.forEach(i=>{n.forEach(a=>{i.isDefined()&&!i.hasMastery(a)&&(t[a]+=1)})}),t}async getAllWords(){return await this.db.words.toArray()}async getDefinedSentences(){return(await this.db.sentences.toArray()).filter(e=>e.definition!=="")}async getHistory(){return(await this.db.history.toArray()).sort((e,t)=>{const n=new Date(e.date),i=new Date(t.date);return n.getTime()-i.getTime()})}async putHistoryDay(e){return this.db.history.put(e)}async getStatistics(e=void 0){const t=await xe.getAllWords();e===void 0&&(e=new Date().toLocaleDateString());const n=new me(e,0,0,0);return t.forEach(i=>{i.isDefined()&&(n.defined+=1),i.isMastered()&&(n.mastered+=1),n.learned+=i.getMasteryPercentage()}),n}async getLastStatistics(){return this.db.history.toCollection().last()}}const xe=new Ue,U=()=>xe,Ye={key:0,id:"stats-modal"},Ge=p("td",null,"Words Defined",-1),je=p("td",null,"Defined Today",-1),Xe=p("td",null,"Maximum Daily Defined",-1),qe={emits:["hide"],setup(l,{emit:e}){ne.register(..._e);const t=z(null),n=U(),i=k({history:[],definedByDay:[],defined:0,definedToday:0,maxDefined:0,loading:!0,cumulative:!0});F(async()=>{const s=await n.getStatistics();i.history=await n.getHistory();const c=i.history[i.history.length-1];i.history.push(s),i.defined=s.defined,c===void 0?i.definedToday=s.defined:i.definedToday=s.defined-c.defined;for(let u=1;u<i.history.length;u++){const m=i.history[u-1],w=i.history[u];i.definedByDay.push({date:w.date,defined:w.defined-m.defined})}i.maxDefined=Math.max(...i.definedByDay.map(u=>u.defined)),i.loading=!1}),Ae(()=>{if(!t.value)return;const s=ne.getChart(t.value);s&&s.destroy();let c,u;i.cumulative?(c=i.history.map(m=>new Date(m.date)),u=i.history.map(m=>m.defined)):(c=i.definedByDay.map(m=>new Date(m.date)),u=i.definedByDay.map(m=>m.defined)),new ne(t.value,{type:"line",data:{labels:c,datasets:[{label:"Defined",data:u}]},options:{scales:{y:{beginAtZero:!0},x:{type:"time"}}}})});const a=()=>{i.cumulative=!i.cumulative};return(s,c)=>r(i).loading?I("",!0):(y(),A("div",Ye,[p("div",null,[p("table",null,[p("tbody",null,[p("tr",null,[Ge,p("td",null,D(r(i).defined),1)]),p("tr",null,[je,p("td",null,D(r(i).definedToday),1)]),p("tr",null,[Xe,p("td",null,D(r(i).maxDefined),1)])])])]),p("div",null,[p("canvas",{ref_key:"chart",ref:t,width:"400",height:"200"},null,512)]),p("button",{onClick:a},D(r(i).cumulative?"Per Day":"Cumulative"),1),p("button",{onClick:c[0]||(c[0]=u=>e("hide"))},"Hide")]))}},Ze={class:"sidebar"},ze={class:"sidebar-group"},Je=["value"],Ke={class:"sidebar-group"},Qe={class:"sidebar-group"},et=ae({props:["runtimeData"],emits:["updateLanguage","importDatabase","exportDatabase","openFiles","changeActivity","exportDefinedToday"],setup(l,{emit:e}){const t=l,n=k({isShowingStatistics:!1});return j(()=>console.log("Sidebar will update",t)),(i,a)=>(y(),A("div",Ze,[p("div",ze,[p("h3",null,D(t.runtimeData.openTextFile),1),p("h4",null,D(t.runtimeData.openAudioFile),1),C(Ve),p("button",{onClick:a[0]||(a[0]=s=>i.$emit("openFiles"))},"Open Files"),p("input",{value:t.runtimeData.language,onChange:a[1]||(a[1]=s=>e("updateLanguage",s.target.value)),placeholder:"Language",type:"text"},null,40,Je)]),p("div",Ke,[p("button",{onClick:a[2]||(a[2]=s=>r(n).isShowingStatistics=!0)},"Show Statistics"),r(n).isShowingStatistics?(y(),b(qe,{key:0,onHide:a[3]||(a[3]=s=>r(n).isShowingStatistics=!1)})):I("",!0)]),p("div",Qe,[p("button",{onClick:a[4]||(a[4]=s=>e("exportDatabase"))},"Export Database"),p("button",{onClick:a[5]||(a[5]=s=>e("importDatabase"))},"Import Database"),p("button",{onClick:a[6]||(a[6]=s=>e("exportDefinedToday"))}," Export Defined Today ("+D(t.runtimeData.definedToday.length)+") ",1)])]))}}),tt={id:"main"},Y=ae({props:["title","subtitle"],setup(l){return(e,t)=>(y(),A(X,null,[p("div",tt,[p("h2",null,D(l.title),1),p("h3",null,D(l.subtitle),1),pe(e.$slots,"activity")]),pe(e.$slots,"sidebar")],64))}}),Q={props:["sentences","wordMap","selectedWordIndex","selectedSentenceIndex","highlighting","wordOptions"],emits:["selectWord"],setup(l,e){const t=n=>{if(l.wordMap===void 0)return"";let i=l.wordMap.get(n);return!l.highlighting||!i.isDefined()?{backgroundColor:""}:{backgroundColor:"hsl(120,100%,75%)"}};return()=>{let n=0;if(l.sentences===void 0)return Z("p");let i=l.sentences.map((a,s)=>{let u=a.getWordsAndSpaces().map(w=>{if(w.trim()==="")return w;let _=L.cleanWord(w);if(_==="")return w;let S=n;n+=1;let E=l.selectedWordIndex===S,W={selected:E},P=w;if(l.wordOptions){const f=l.wordOptions(w,_);f.bold&&(W.bold=!0),f.blank&&(P="__________")}let h={key:S,style:E?"":t(_),class:W,onClick(){e.emit("selectWord",S)}};return Z("span",h,P)});const m={selected:l.selectedSentenceIndex===s};return Z("span",{key:s,class:m},u)});return Z("p",{className:l.highlighting?"highlight":""},i)}}},nt={id:"props.id"},ye={props:["tag","text","focus","definition","language"],emits:["next","definitionUpdate"],setup(l,{emit:e}){const t=l,n=J(()=>t.tag?t.tag:"input"),i=z(null),a=z(t.definition),s=u=>{u.key==="Tab"&&(u.preventDefault(),u.target.blur(),e("next")),u.stopPropagation()},c=()=>{const u=t.text,m="https://translate.googleapis.com/translate_a/single?client=gtx&sl="+t.language+"&tl=en&dt=t&q="+encodeURI(u);fetch(m).then(w=>w.json()).then(w=>{a.value=w[0].map(([_])=>_).join(""),i.value.focus()})};return H(()=>{t.focus&&i.value.focus()}),(u,m)=>(y(),A("div",nt,[p("span",null,D(t.text),1),(y(),b(Ie(r(n)),{ref_key:"definitionInput",ref:i,type:"text",placeholder:"Definition",value:a.value,onInput:m[0]||(m[0]=w=>a.value=w.target.value),onBlur:m[1]||(m[1]=w=>e("definitionUpdate",t.text,a.value)),onKeydown:s},null,8,["value"])),p("button",{onClick:c},"Google Translate")]))}};class st{constructor(e){d(this,"wordIndex");d(this,"text");this.text=e,this.wordIndex=void 0}nextSentence(){if(this.wordIndex===void 0)return;const e=this.text().sentenceIndexByWordIndex,t=e[this.wordIndex];for(;;)if(this.wordIndex===this.text().words.length-1||(this.wordIndex+=1,e[this.wordIndex]!==t))return}nextWord(){this.wordIndex!==void 0&&this.wordIndex!==this.text().words.length-1&&(this.wordIndex+=1)}selectedWord(){return this.wordIndex===void 0?{}:this.text().words[this.wordIndex]}selectedSentence(){if(this.wordIndex===void 0)return{};const e=this.text().sentenceIndexByWordIndex[this.wordIndex],t=this.text().sentences[e].clean;return this.text().sentenceMap.get(t)}setIndex(e){this.wordIndex=e}getIndex(){return this.wordIndex}}class it{constructor(e,t){d(this,"index");d(this,"minimumLength");d(this,"maximumResults");this.minimumLength=e,this.maximumResults=t,this.index=new Map}addWord(e){this.substrings(e).forEach(n=>{const i=this.index.get(n);i===void 0?this.index.set(n,[e]):i.push(e)})}lookup(e){const t=this.substrings(e),n=[];for(const i of t){const a=this.index.get(i);if(a!==void 0){for(const s of a)if(n.includes(s)||n.push(s),n.length===this.maximumResults)return n}}return n}substrings(e){const t=[];for(let n=e.length;n>=this.minimumLength;n-=1)for(let i=0;i<=e.length-n;i+=1)t.push(e.substring(i,i+n));return t}}const at={class:"footer"},rt={class:"sidebar right"},ot={class:"sidebar-group"},dt={class:"matching-words"},ct={class:"sidebar-group"},lt={class:"sidebar-group"},ut={props:["languageText","runtimeData"],emits:["setPage"],setup(l,{emit:e}){const t=l,n=U(),i=B(),a=()=>{const o=t.languageText.getDefinitionArray(),g=o.filter(R=>R!=="").length,T=o.length,M=T-g,$=g/T;return{defined:g,total:T,notDefined:M,percentage:$}},s=k({selectedWordCursor:new st(()=>t.languageText),highlighting:!1,page:t.runtimeData.currentPage,marker:void 0,pageStats:a(),similarWords:[]}),c=new it(4,5);L.benchmark(async()=>{(await n.getAllWords()).filter(g=>g.isDefined()).forEach(g=>{c.addWord(g.word)})});const u=J(()=>s.selectedWordCursor.selectedWord()),m=J(()=>s.selectedWordCursor.selectedSentence());re(u,async o=>{s.similarWords=await Promise.all(c.lookup(o.word).map(g=>n.getWord(g)))});const w=(...o)=>{t.languageText.updateWordDefinition(...o),s.pageStats=a()},_=(...o)=>t.languageText.updateSentenceDefinition(...o),S=o=>{e("setPage",t.runtimeData.currentPage+o)},E=o=>{e("setPage",Number(o.target.value)-1)},W=()=>{const o=t.languageText.sentences,g=t.languageText.sentenceMap;if(o.length===0)return;const T=o[0].clean,M=o[o.length-1].clean,$=g.get(T).startTime,R=g.get(M).endTime;i.setAudioTimes($,R),i.pause()},P=()=>{t.runtimeData.currentPage!==s.page&&(s.selectedWordCursor.setIndex(void 0),s.page=t.runtimeData.currentPage)},h=()=>{s.marker===void 0?(i.play(),s.marker=0):s.marker+=1;let o=t.languageText.sentences;if(s.marker>0){let M=o[s.marker-1],$=t.languageText.sentenceMap.get(M.clean);t.languageText.updateSentenceTimes($,null,i.getCurrentTime())}if(s.marker===o.length){i.pause(),s.marker=void 0;return}let g=o[s.marker],T=t.languageText.sentenceMap.get(g.clean);t.languageText.updateSentenceTimes(T,i.getCurrentTime(),null)},f=o=>{o.target instanceof HTMLInputElement||o.target instanceof HTMLTextAreaElement||o.key==="m"&&h()};return H(()=>{document.addEventListener("keydown",f)}),K(()=>{document.removeEventListener("keydown",f)}),j(()=>{P(),W(),s.pageStats=a()}),F(()=>{W()}),(o,g)=>(y(),b(Y,{title:"Reader",subtitle:`Page ${t.runtimeData.currentPage+1} of  ${l.languageText.pages.length}`},{activity:N(()=>[(y(),b(Q,{sentences:t.languageText.sentences,"word-map":t.languageText.wordMap,key:t.runtimeData.currentPage,"selected-word-index":r(s).selectedWordCursor.getIndex(),"selected-sentence-index":r(s).marker,highlighting:r(s).highlighting,onSelectWord:g[0]||(g[0]=T=>r(s).selectedWordCursor.setIndex(T))},null,8,["sentences","word-map","selected-word-index","selected-sentence-index","highlighting"])),p("p",at,[p("strong",null,D(r(s).pageStats.defined)+" of "+D(r(s).pageStats.total)+", "+D(r(s).pageStats.notDefined)+" remaining, "+D((r(s).pageStats.percentage*100).toFixed(2)+"%"),1)])]),sidebar:N(()=>[p("div",rt,[p("div",ot,[p("div",dt,[p("ul",null,[(y(!0),A(X,null,oe(r(s).similarWords,T=>(y(),A("li",{key:T.word},D(`${T.word} - ${T.definition}`),1))),128))])]),(y(),b(ye,{id:"word-definition",key:r(u).word,text:r(u).word,focus:r(s).selectedWordCursor.getIndex()!==void 0,definition:r(u).definition,language:t.runtimeData.language,onDefinitionUpdate:w,onNext:g[1]||(g[1]=T=>r(s).selectedWordCursor.nextWord())},null,8,["text","focus","definition","language"])),(y(),b(ye,{tag:"textarea",id:"sentence-definition",key:r(m).sentence,text:r(m).sentence,definition:r(m).definition,language:t.runtimeData.language,onDefinitionUpdate:_,onNext:g[2]||(g[2]=T=>r(s).selectedWordCursor.nextSentence())},null,8,["text","definition","language"]))]),p("div",ct,[p("button",{onClick:g[3]||(g[3]=T=>S(-1))},"Previous Page"),p("button",{onClick:g[4]||(g[4]=T=>S(1))},"Next Page"),p("input",{placeholder:"Page",onInput:E},null,32)]),p("div",lt,[p("button",{onClick:g[5]||(g[5]=T=>r(s).highlighting=!r(s).highlighting)}," Toggle Highlighting ")])])]),_:1},8,["subtitle"]))}},le={props:["sentence"],setup(l){const e=l,t=B(),n=U(),i=k({startTime:e.sentence.startTime,endTime:e.sentence.endTime});re(e,()=>{i.startTime=e.sentence.startTime,i.endTime=e.sentence.endTime});const a=c=>{if(c!=="")return Number.parseFloat(c)},s=()=>{let c=a(i.startTime),u=a(i.endTime);e.sentence.updateTimes(c,u),t.setAudioTimes(c,u),n.putSentence(de(e.sentence))};return(c,u)=>(y(),A(X,null,[fe(p("input",{ref:"definitionInput",type:"number",placeholder:"Start Time","onUpdate:modelValue":u[0]||(u[0]=m=>r(i).startTime=m),onBlur:s},null,544),[[he,r(i).startTime]]),fe(p("input",{ref:"definitionInput",type:"number",placeholder:"End Time","onUpdate:modelValue":u[1]||(u[1]=m=>r(i).endTime=m),onBlur:s},null,544),[[he,r(i).endTime]])],64))}},gt=["onClick"],ee={props:["pool","solution"],emits:["correctAnswer"],setup(l,{emit:e}){const t=l;let n;const i=s=>{s===t.solution&&e("correctAnswer")},a=J(()=>{const s=[t.solution];for(let c=0;c<20;c+=1){let u=L.randomItem(t.pool);if(s.indexOf(u)===-1&&s.push(u),s.length===4)break}return L.shuffle(s),s});return H(()=>{n=s=>{if(!(s.target instanceof HTMLInputElement||s.target instanceof HTMLTextAreaElement)&&["1","2","3","4"].indexOf(s.key)!==-1){s.preventDefault();let u=Number.parseInt(s.key)-1;i(a.value[u])}},document.addEventListener("keydown",n)}),K(()=>{document.removeEventListener("keydown",n)}),(s,c)=>(y(),A("div",null,[(y(!0),A(X,null,oe(r(a),(u,m)=>(y(),A("button",{key:"index",class:"multiple-choice",onClick:w=>i(u)},D(`${m+1}. ${u}`),9,gt))),128))]))}};class x{}d(x,"READER","Reader"),d(x,"VOCAB_IN_CONTEXT","Vocabulary in Context"),d(x,"VOCAB_MATCHING","Vocabulary Matching"),d(x,"CLOZE","Cloze"),d(x,"LISTENING1","Listening 1"),d(x,"LISTENING2","Listening 2");class ve{constructor(e,t,n=void 0){d(this,"raw");d(this,"clean");d(this,"sentenceId");this.raw=e,this.clean=t,this.sentenceId=n}getWords(){return this.clean.split(/\s+/).map(L.cleanWord).filter(e=>e!=="")}getWordsAndSpaces(){return this.raw.split(/(\s+)/)}}class pt{constructor(){d(this,"counts")}setCounts(e){this.counts=e}incrementAll(){Object.values(v.MASTERY_LEVELS).forEach(t=>{t!==v.MASTERY_LEVELS.DEFINED&&(this.counts[t]+=1)})}decrement(e){this.counts[e]-=1}getCount(e){return this.counts&&this.counts[e]}}const ft=k(new pt),ue=()=>ft,ht=ue(),V=U(),ie=ce();class te{constructor(e,t){d(this,"masteryLevel");d(this,"practiceWords");d(this,"wordIndex");d(this,"sentences");d(this,"wordPool");d(this,"sentencePool");d(this,"done");this.masteryLevel=e,this.practiceWords=[],this.wordIndex=0,this.sentences=new Map,this.wordPool=[],this.sentencePool=[],this.done=t}word(){return this.practiceWords[this.wordIndex]}sentence(){const e=this.word();if(e!==void 0)return this.sentences.get(e.sentenceId)}rawSentences(){const e=this.sentence();return e===void 0?[]:[new ve(e.sentence,e.sentence,e.id)]}correctAnswer(){const e=this.word();e.updateMastery(this.masteryLevel),V.putWords([de(e)]),ie.learnedToday+=1/v.MASTERY_LEVEL_COUNT,ie.masteredToday+=e.isMastered()?1:0,V.putRuntimeData(ie),ht.decrement(this.masteryLevel),this.wordIndex+=1,this.wordIndex===this.practiceWords.length&&this.done()}async load(){const e=await V.getPracticeByType(this.masteryLevel),t=await V.getSentencesForWords(e),n=await V.getAllWords(),i=(await V.getDefinedSentences()).map(a=>a.definition);this.practiceWords=e,this.sentences=t,this.wordPool=n,this.sentencePool=i}}const mt={class:"sidebar right"},yt={class:"sidebar-group"},wt={emits:["done"],setup(l,{emit:e}){const t=B(),n=k(new te(v.MASTERY_LEVELS.VOCAB_IN_CONTEXT,()=>e("done"))),i=(s,c)=>c===n.word().word?{bold:!0}:{},a=()=>n.wordPool.filter(s=>s.isDefined()).map(s=>s.definition);return F(()=>{n.load()}),j(()=>{const s=n.sentence();t.setAudioTimes(s.startTime,s.endTime),t.play()}),(s,c)=>r(n).word()?(y(),b(Y,{key:0,title:r(x).VOCAB_IN_CONTEXT},{activity:N(()=>[C(Q,{sentences:r(n).rawSentences(),"word-options":i},null,8,["sentences"]),C(ee,{pool:a(),solution:r(n).word().definition,onCorrectAnswer:c[0]||(c[0]=()=>r(n).correctAnswer())},null,8,["pool","solution"])]),sidebar:N(()=>[p("div",mt,[p("div",yt,[C(le,{sentence:r(n).sentence()},null,8,["sentence"])])])]),_:1},8,["title"])):I("",!0)}},Tt={emits:["done"],setup(l,{emit:e}){const t=U(),n=ce(),i=ue(),a=k({practiceWords:[],practiceIndex:0,words:[],grid:[]});F(async()=>{a.practiceWords=await t.getPracticeByType(v.MASTERY_LEVELS.VOCAB_MATCHING),E()}),H(()=>{document.addEventListener("keydown",P)}),K(()=>{document.removeEventListener("keydown",P)});const s=(h,f)=>a.grid[f][h],c=(h,f,o)=>{a.grid[f][h]=o},u=(h,f)=>{const o=s(h,f);return{"matching-item":!0,selected:o===void 0?!1:o.selected}},m=(h,f)=>{const o=s(h,f);return o===void 0?"":a.words[o.wordIndex].definition},w=h=>{for(let f=0;f<a.words.length;f++)for(let o=0;o<a.words.length;o++){const g=s(o,f);if(g&&h(g))return[o,f]}},_=()=>{const[h,f]=w(R=>R.selected),o=s(h,f),g=(o.shuffledIndex+1)%a.words.length,[T,M]=w(R=>R.shuffledIndex===g),$=s(T,M);o.selected=!1,$.selected=!0},S=(h,f)=>{const[o,g]=w(q=>q.selected),T=o+h,M=g+f;if(!(1<=T&&T<=2&&0<=M&&M<=a.words.length-1))return;const R=s(T,M);c(T,M,s(o,g)),c(o,g,R),W()&&(a.words.forEach(q=>{q.updateMastery(v.MASTERY_LEVELS.VOCAB_MATCHING),n.learnedToday+=1/v.MASTERY_LEVEL_COUNT,n.masteredToday+=q.isMastered()?1:0,i.decrement(v.MASTERY_LEVELS.VOCAB_MATCHING)}),t.putWords(a.words.map(de)),t.putRuntimeData(n),E())},E=()=>{a.words=a.practiceWords.slice(a.practiceIndex,a.practiceIndex+8),a.words.length===0&&e("done");const h=a.words.map((f,o)=>o);L.shuffle(h),a.grid=h.map((f,o)=>[void 0,void 0,{wordIndex:f,shuffledIndex:o,selected:o===0}]),a.practiceIndex+=a.words.length},W=()=>{for(let h=0;h<a.words.length;h++){const f=s(1,h);if(f===void 0||f.wordIndex!==h)return!1}return!0},P=h=>{h.key==="Tab"&&(h.preventDefault(),_()),h.key==="ArrowDown"&&(h.preventDefault(),S(0,1)),h.key==="ArrowLeft"&&(h.preventDefault(),S(-1,0)),h.key==="ArrowUp"&&(h.preventDefault(),S(0,-1)),h.key==="ArrowRight"&&(h.preventDefault(),S(1,0)),h.stopPropagation()};return(h,f)=>r(a).practiceWords.length>0?(y(),b(Y,{key:0,title:r(x).VOCAB_IN_CONTEXT},{activity:N(()=>[p("table",null,[(y(!0),A(X,null,oe(r(a).words,(o,g)=>(y(),A("tr",null,[p("td",{class:se(u(0,g))},D(o.word),3),p("td",{class:se(u(1,g))},D(m(1,g)),3),p("td",{class:se(u(2,g))},D(m(2,g)),3)]))),256))])]),_:1},8,["title"])):I("",!0)}},xt={emits:["done"],setup(l,{emit:e}){const t=k(new te(v.MASTERY_LEVELS.CLOZE,()=>e("done"))),n=(a,s)=>s===t.word().word?{blank:!0}:{},i=()=>t.wordPool.map(a=>a.word);return F(()=>{t.load()}),(a,s)=>r(t).word()?(y(),b(Y,{key:0,title:r(x).CLOZE},{activity:N(()=>[C(Q,{sentences:r(t).rawSentences(),"word-options":n},null,8,["sentences"]),C(ee,{pool:i(),solution:r(t).word().word,onCorrectAnswer:s[0]||(s[0]=()=>r(t).correctAnswer())},null,8,["pool","solution"])]),_:1},8,["title"])):I("",!0)}},vt={class:"sidebar right"},Dt={class:"sidebar-group"},bt={emits:["done"],setup(l,{emit:e}){const t=B(),n=k(new te(v.MASTERY_LEVELS.LISTENING1,()=>e("done"))),i=(s,c)=>c===n.word().word?{blank:!0}:{},a=()=>n.wordPool.map(s=>s.word);return F(()=>{n.load()}),j(()=>{const s=n.sentence();t.setAudioTimes(s.startTime,s.endTime),t.play()}),(s,c)=>r(n).word()?(y(),b(Y,{key:0,title:r(x).LISTENING1},{activity:N(()=>[C(Q,{sentences:r(n).rawSentences(),"word-options":i},null,8,["sentences"]),C(ee,{pool:a(),solution:r(n).word().word,onCorrectAnswer:c[0]||(c[0]=()=>r(n).correctAnswer())},null,8,["pool","solution"])]),sidebar:N(()=>[p("div",vt,[p("div",Dt,[C(le,{sentence:r(n).sentence()},null,8,["sentence"])])])]),_:1},8,["title"])):I("",!0)}},Et={class:"sidebar right"},Lt={class:"sidebar-group"},St={emits:["done"],setup(l,{emit:e}){const t=B(),n=k(new te(v.MASTERY_LEVELS.LISTENING2,()=>e("done")));return F(()=>{n.load()}),j(()=>{const i=n.sentence();t.setAudioTimes(i.startTime,i.endTime),t.play()}),(i,a)=>r(n).sentence()?(y(),b(Y,{key:0,title:r(x).LISTENING2},{activity:N(()=>[C(ee,{pool:r(n).sentencePool,solution:r(n).sentence().definition,onCorrectAnswer:a[0]||(a[0]=()=>r(n).correctAnswer())},null,8,["pool","solution"])]),sidebar:N(()=>[p("div",Et,[p("div",Lt,[C(le,{sentence:r(n).sentence()},null,8,["sentence"])])])]),_:1},8,["title"])):I("",!0)}};class _t{constructor(e,t,n,i,a){d(this,"filename");d(this,"totalWordsTranslated");d(this,"db");d(this,"pages");d(this,"text");d(this,"sentences");d(this,"sentenceMap");d(this,"sentenceIndexByWordIndex");d(this,"words");d(this,"wordMap");d(this,"promise");d(this,"onNewWordLearned");this.db=e,this.filename=t,this.totalWordsTranslated=0,this.pages=this.extractPages(n),this.onNewWordLearned=a,this.sentences=[],this.sentenceMap=new Map,this.words=[],this.wordMap=new Map,this.sentenceIndexByWordIndex=[],this.promise=new Promise(s=>s()),this.setPage(i)}async load(){await this.loadSentences(),await this.loadWords()}onUpdateDefinition(e){}setPage(e){return e<0||e>=this.pages.length?!1:(this.text=this.pages[e],!0)}extractPages(e){const n=[];let i=0,a=0,s=0,c=0;for(;c++,c!==1e3;){if(s=e.indexOf(`
`,a+1),s===-1){n.push(e.substring(i));break}if(s-i>1e3){const u=Math.abs(a-i-1e3),m=Math.abs(s-i-1e3),w=u<m?a:s;n.push(e.substring(i,w)),i=w}a=s}return n}async loadWords(){this.wordMap=new Map,this.words=[],this.sentenceIndexByWordIndex=[];let e=0;for(const t of this.sentences){const n=t.getWords();for(const i of n){let a=this.wordMap.get(i);a===void 0&&(a=await this.db.getWord(i)),a===void 0&&(a=new v(i,t.sentenceId)),a.sentenceId===void 0&&(a.sentenceId=t.sentenceId),this.words.push(a),this.wordMap.set(i,a),this.sentenceIndexByWordIndex.push(e)}await this.db.putWords([...this.wordMap.values()]),e+=1}}updateWordDefinition(e,t){const n=this.wordMap.get(e);if(n===void 0||n.definition===t)return;const i=!n.isDefined();n.setDefinition(t),i&&(this.totalWordsTranslated+=1,this.onNewWordLearned(n)),console.log("Updating definition... for "+e+" to "+t),this.db.putWords([n]),this.onUpdateDefinition(e)}updateSentenceDefinition(e,t){const n=this.sentenceMap.get(e);n!==void 0&&n.definition!==t&&(n.definition=t,console.log("Updating definition... for "+e+" to "+t),this.db.putSentence(n))}updateMastery(e){e=e.map(t=>this.words.get(t).nextMastery()),this.db.putWords(e)}async loadSentences(){let e=0;for(this.sentences=[],this.sentenceMap=new Map,this.text===void 0&&(this.text="");;){const t=L.nextEndPos(this.text,e),n=this.text.substring(e,t===!1?void 0:t+1);if(n==="")break;const i=n.trim();if(this.sentences.push(new ve(n,i)),t===!1)break;e=t+1}for(const t of this.sentences){if(this.sentenceMap.has(t.clean))continue;let n=await this.db.getSentence(t.clean);n===void 0&&(n=new Te(t.clean),n.id=await this.db.putSentence(n)),this.sentenceMap.set(t.clean,n),t.sentenceId=n.id}}updateSentenceTimes(e,t,n){t!==null&&(e.startTime=t),n!==null&&(e.endTime=n),this.db.putSentence(e)}updateSentence(e){this.sentenceMap.set(e.sentence,e),this.db.putSentence(e)}getWordMap(e){const t=new Map;return e.forEach(n=>{t.set(n,this.words.get(n))}),t}getWordStrArray(){return Array.from(this.words).map(e=>e[1].word)}getSentenceDefinitionArray(){return Array.from(this.sentenceMap).map(e=>e[1].definition)}getDefinitionArray(){return this.words.map(e=>e.definition)}leastMasteredWord(e){const t=this.getWordMap(e.getWords());return L.randomWordsByMastery(t,1)[0]}leastMastery(){let e=v.MAX_MASTERY;return Array.from(this.words).forEach(([t,n])=>{n.definition!==""&&n.mastery<e&&(e=n.mastery)}),e}}const At=l=>{Me.addEventListener("statechange",()=>{console.log("Checking for new day"),l(),De(l.bind(globalThis))})};let we;const De=l=>{const e=new Date,n=new Date(e.getFullYear(),e.getMonth(),e.getDate()+1).getTime()-e.getTime();clearTimeout(we),we=setTimeout(()=>{l(),De(l)},n)},It={setup(l){const e=U(),t=Ce(void 0),n=B(),i=ue(),a=ce(),s=k({runtimeData:a,activity:x.READER}),c=async()=>{if(At(h),s.runtimeData.load(await e.getRuntimeData()),await h(),i.setCounts(await e.getMasteryCounts()),console.log(s.runtimeData),s.runtimeData.openTextFile){const f=await e.getTextFile();t.value=await u(f)}if(s.runtimeData.openAudioFile){let f=await e.getAudioFile();f&&(n.src=URL.createObjectURL(f))}},u=async f=>{let o=new _t(e,s.runtimeData.openTextFile,f,s.runtimeData.currentPage,m);return await o.load(),o},m=f=>{a.definedToday.push(f),a.learnedToday+=1/v.MASTERY_LEVEL_COUNT,i.incrementAll(),e.putRuntimeData(a)},w=async()=>{const f=await L.openFiles(),o=f.text,g=f.audio;if(o){const T=await o.text();s.runtimeData.openNewTextFile(o.name),t.value=await u(T),e.putTextFile(T)}g&&(s.runtimeData.openNewAudioFile(g.name),n.src=URL.createObjectURL(g),e.putAudioFile(g)),e.putRuntimeData(a)},_=async f=>{!t.value.setPage(f)||(await t.value.load(),s.runtimeData.currentPage=f,e.putRuntimeData(a))},S=f=>{s.runtimeData.language=f,e.putRuntimeData(a)},E=async()=>{const o=await(await L.uploadText()).text();await e.import(JSON.parse(o)),await c()},W=async()=>{let f=await e.export();L.download("language-db.json",JSON.stringify(f))},P=async()=>{const f=a.definedToday.map(o=>`"${o.word}","${o.definition}"`).join(`
`);L.download("defined-today.csv",f)},h=async()=>{if(s.runtimeData.isNewDay()){console.log("Updating for new day "+new Date);const f=await e.getStatistics(a.date);await e.putHistoryDay(f),s.runtimeData.updateForNewDay()}};return H(c),(f,o)=>(y(),A("div",null,[C(et,{"runtime-data":r(s).runtimeData,onOpenFiles:w,onUpdateLanguage:S,onImportDatabase:E,onExportDatabase:W,onExportDefinedToday:P,onChangeActivity:o[0]||(o[0]=g=>r(s).activity=g)},null,8,["runtime-data"]),r(s).activity===r(x).READER&&r(t)?(y(),b(ut,{key:0,"runtime-data":r(s).runtimeData,"language-text":r(t),onSetPage:_},null,8,["runtime-data","language-text"])):I("",!0),r(s).activity===r(x).VOCAB_IN_CONTEXT?(y(),b(wt,{key:1,onDone:o[1]||(o[1]=g=>r(s).activity=r(x).READER)})):I("",!0),r(s).activity===r(x).VOCAB_MATCHING?(y(),b(Tt,{key:2,onDone:o[2]||(o[2]=g=>r(s).activity=r(x).READER)})):I("",!0),r(s).activity===r(x).CLOZE?(y(),b(xt,{key:3,onDone:o[3]||(o[3]=g=>r(s).activity=r(x).READER)})):I("",!0),r(s).activity===r(x).LISTENING1?(y(),b(bt,{key:4,onDone:o[4]||(o[4]=g=>r(s).activity=r(x).READER)})):I("",!0),r(s).activity===r(x).LISTENING2?(y(),b(St,{key:5,onDone:o[5]||(o[5]=g=>r(s).activity=r(x).READER)})):I("",!0)]))}},Mt=ke({history:We("/language-reader-vue/"),routes:[{path:"/",name:"main",component:It}]}),ge=Ne($e);ge.use(Pe());ge.use(Mt);ge.mount("#app");
