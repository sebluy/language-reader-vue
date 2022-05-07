var he=Object.defineProperty;var me=(f,e,t)=>e in f?he(f,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):f[e]=t;var c=(f,e,t)=>(me(f,typeof e!="symbol"?e+"":e,t),t);import{d as ee,o as w,c as E,u as i,R as we,r as M,a as Q,b as $,e as j,w as ce,f as I,D as ye,g as N,h as u,t as b,i as A,j as G,k as _,l as ie,F as X,m as Y,n as U,p as Te,q as k,s as ae,v as de,x as te,y as ue,z as K,A as xe,B as ve,C as be,E as Ee,G as Le}from"./vendor.89c2f80a.js";const De=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}};De();const Se=ee({setup(f){return(e,t)=>(w(),E(i(we)))}});class Ae{constructor(){c(this,"src");c(this,"startTime");c(this,"endTime");c(this,"paused",!0)}setAudioTimes(e,t){return this.startTime=e,this.endTime=t,this}play(){return this.paused=!1,this}pause(){return this.paused=!0,this}getCurrentTime(){}}const Ie=M(new Ae),W=()=>Ie,_e=["src"],Me={setup(f){const e=Q(null),t=W();t.getCurrentTime=()=>e.value.currentTime;let n,s,o;const r=()=>{e.value.paused&&(e.value.play(),t.play(),a())},a=()=>{if(clearTimeout(o),s&&!e.value.paused){let m=s-e.value.currentTime;o=window.setTimeout(()=>{L(),p()},m*1e3)}},p=()=>{n&&(e.value.currentTime=n)},x=()=>{e.value.paused?r():L()},T=()=>{p(),a(),r()},L=()=>{e.value.paused||(e.value.pause(),t.pause(),a())},S=m=>{m.target instanceof HTMLInputElement||m.target instanceof HTMLTextAreaElement||(m.key==="p"?x():m.key==="r"&&T())};return $(()=>{document.addEventListener("keydown",S)}),j(()=>{document.removeEventListener("keydown",S)}),ce(t,()=>{(n!==t.startTime||s!==t.endTime)&&(n=t.startTime,s=t.endTime,p(),a()),e.value.paused!==t.paused&&x()}),(m,d)=>(w(),I("audio",{controls:"",src:i(t).src,ref_key:"audio",ref:e},null,8,_e))}};class pe{constructor(e,t=""){c(this,"id");c(this,"sentence");c(this,"definition");c(this,"mastery");c(this,"startTime");c(this,"endTime");this.sentence=e,this.definition=t,this.mastery=0}getRawWords(){return this.sentence.split(/\s+/).filter(e=>e!=="")}updateTimes(e,t){Number.isNaN(e)||(this.startTime=e),Number.isNaN(t)||(this.endTime=t)}}const R=class{constructor(e,t){c(this,"word");c(this,"definition");c(this,"mastery");c(this,"sentenceId");this.word=e,this.sentenceId=t,this.definition="",this.mastery=0}updateMastery(e){return this.mastery|=e,this}hasMastery(e){return this.mastery&e}isDefined(){return this.mastery&R.MASTERY_LEVELS.DEFINED}setDefinition(e){this.definition=e,this.updateMastery(R.MASTERY_LEVELS.DEFINED)}getMasteryPercentage(){let e=0;for(let t=1;t<=R.MASTERY_LEVELS.LISTENING2;t<<=1)t&this.mastery&&(e+=1);return e/Object.keys(R.MASTERY_LEVELS).length}getNewCount(){return this.isDefined()?1:0}};let v=R;c(v,"MASTERY_LEVELS",{DEFINED:1<<0,VOCAB_IN_CONTEXT:1<<1,VOCAB_MATCHING:1<<2,CLOZE:1<<3,LISTENING1:1<<4,LISTENING2:1<<5}),c(v,"FULL_MASTERY",63);class D{static randomWordsByMastery(e,t){const n=Array.from(e.values()).filter(a=>a.definition!=="");if(n.length<t)return[];const s=n.map(a=>a.mastery);let o=Math.min(...s),r=[];for(;r.length<t;){const a=n.filter(p=>p.mastery===o);D.shuffle(a),r=r.concat(a.slice(0,t-r.length)),o+=1}return r}static cleanWord(e){const t=e.match(/\p{Letter}+/u);return t?t[0].toLowerCase():""}static shuffle(e){for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}}static randomItem(e){const t=Math.floor(Math.random()*e.length);return e[t]}static createHTML(e){const[t,...n]=e,s=document.createElement(t);for(const o in n){const r=n[o];if(Array.isArray(r))s.append(this.createHTML(r));else if(typeof r=="string"||typeof r=="number"||r instanceof Element)s.append(r);else if(typeof r=="object")for(const a in r)s[a]=r[a]}return s}static isEndChar(e){return e==="..."?!1:e.match(/[.?!]/)!==null}static nextEndPos(e,t){for(;;){const n=e.substring(t,t+1);if(e.substring(t,t+3)==="..."){t+=3;continue}if(n==="")return!1;if(this.isEndChar(n))break;t+=1}for(;;){const n=e.substring(t+1,t+2);if(!this.isEndChar(n))break;t+=1}for(;e.substring(t+1,t+2).match(/[\s“]/)!==null;)t+=1;return t}static createDraggableItem(e){const t=document.createElement(e.tag);return t.id=e.id,t.classList.add("matching-item"),t.innerText=e.text,t.draggable=!0,t.addEventListener("drop",n=>{n.preventDefault();const s=document.getElementById(n.dataTransfer.getData("text/plain")),o=n.target;if(o.draggable===!1)return;const r=o.innerHTML;o.innerHTML=s.innerHTML,s.innerHTML=r,o.classList.remove("drag-over"),e.onDrop&&e.onDrop(s,o,e)}),t.addEventListener("dragenter",n=>{n.preventDefault(),n.target.draggable!==!1&&n.target.classList.add("drag-over")}),t.addEventListener("dragover",n=>{n.preventDefault(),n.target.draggable!==!1&&n.target.classList.add("drag-over")}),t.addEventListener("dragleave",n=>{n.target.classList.remove("drag-over")}),t.addEventListener("dragstart",n=>{n.dataTransfer.setData("text/plain",n.target.id)}),t}static benchmark(e){const t=new Date().getTime();e();const n=new Date().getTime();console.log((n-t)/1e3)}static download(e,t){const n=document.createElement("a");n.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(t)),n.setAttribute("download",e),n.style.display="none",document.body.appendChild(n),n.click(),document.body.removeChild(n)}static upload(){const e=document.createElement("input");return e.setAttribute("type","file"),e.setAttribute("multiple",""),e.style.display="none",document.body.appendChild(e),new Promise(t=>{e.addEventListener("change",()=>{t(e.files||new FileList),e.remove()}),e.click()})}static async uploadText(){return(await D.upload())[0]}static async openFiles(){const e=await D.upload(),t={};for(let n=0;n<e.length;n++){const s=e[n];s.type==="text/plain"&&(t.text=s),(s.type==="audio/mpeg"||s.type==="audio/x-m4a")&&(t.audio=s)}return t}}class V{constructor(){c(this,"currentPage");c(this,"xpToday");c(this,"xpLast");c(this,"xpDate");c(this,"openAudioFile");c(this,"openTextFile");c(this,"wordsLearnedToday");c(this,"language");this.xpToday=0,this.xpLast=0,this.xpDate=new Date().toLocaleDateString(),this.currentPage=0,this.wordsLearnedToday=0,this.language="es"}static fromObject(e){const t=new V;return Object.assign(t,e),t}load(e){Object.assign(this,e)}updateForNewDay(){this.isNewDay()&&(this.xpLast=this.xpToday,this.xpToday=0,this.xpDate=new Date().toLocaleDateString(),this.wordsLearnedToday=0)}isNewDay(){return this.xpDate!==new Date().toLocaleDateString()}openNewTextFile(e){this.openTextFile=e,this.currentPage=0}openNewAudioFile(e){this.openAudioFile=e}}const Ce=new V,ge=()=>Ce;class ke{constructor(){c(this,"db");this.db=new ye("LanguageDB"),this.db.version(2).stores({words:"word, mastery",sentences:"++id, sentence",other:"key"}),this.db.words.mapToClass(v),this.db.sentences.mapToClass(pe)}getWord(e){return this.db.words.get(e)}getSentence(e){return this.db.sentences.where("sentence").equals(e).first()}getSentenceById(e){return this.db.sentences.get(e)}async getNumberOfWordsTranslated(){return(await this.getAllWords()).filter(e=>e.isDefined()).length}putWords(e){return this.db.words.bulkPut(e)}putSentence(e){return console.log("Updating sentence",e),this.db.sentences.put(e)}async import(e){return await this.db.words.clear(),await this.db.sentences.clear(),await this.db.other.delete("runtimeData"),console.log("importing words"),await this.putWords(e.words),console.log("done importing words"),console.log("importing sentences"),await this.db.sentences.bulkPut(e.sentences),console.log("done importing sentences"),await this.db.other.put({key:"runtimeData",value:e.runtimeData}),console.log("done import"),"done"}async export(){const e=await this.db.words.toArray(),t=await this.db.sentences.toArray();return{runtimeData:await this.getRuntimeData(),sentences:t,words:e}}getRuntimeData(){return this.db.other.get("runtimeData").then(e=>e===void 0?new V:V.fromObject(e.value))}putRuntimeData(e){console.log("Saving runtime data",e),this.db.other.put({key:"runtimeData",value:e})}getTextFile(){return this.db.other.get("textFile").then(e=>e===void 0?void 0:e.value)}putTextFile(e){this.db.other.put({key:"textFile",value:e})}getAudioFile(){return this.db.other.get("audioFile").then(e=>e===void 0?void 0:e.value)}putAudioFile(e){this.db.other.put({key:"audioFile",value:e})}async getSentencesForWords(e){const t=await this.db.sentences.bulkGet(e.map(n=>n.sentenceId));return new Map(t.map(n=>[n.id,n]))}async getPracticeByType(e){const n=(await this.db.words.where("mastery").notEqual(v.FULL_MASTERY).toArray()).filter(s=>s.isDefined()&&!s.hasMastery(e));return D.shuffle(n),n}async getMasteryCounts(){const e=await this.db.words.where("mastery").notEqual(v.FULL_MASTERY).toArray(),t={},n=Object.values(v.MASTERY_LEVELS);return n.forEach(s=>{t[s]=0}),e.forEach(s=>{n.forEach(o=>{s.isDefined()&&!s.hasMastery(o)&&(t[o]+=1)})}),t}async getAllWords(){return await this.db.words.toArray()}async getDefinedSentences(){return(await this.db.sentences.toArray()).filter(e=>e.definition!=="")}}const Ne=new ke,H=()=>Ne,We={key:0,id:"stats-modal"},Pe=u("td",null,"Total Words Translated",-1),Re=u("td",null,"Words Learned Today",-1),$e=u("td",null,"Today's XP",-1),Oe=u("td",null,"Last XP",-1),Fe={emits:["hide"],setup(f,{emit:e}){const t=H(),n=ge(),s=M({totalWordsTranslated:0,wordsLearnedToday:0,xpToday:0,xpLast:0,loading:!0});return N(async()=>{s.totalWordsTranslated=await t.getNumberOfWordsTranslated(),s.wordsLearnedToday=n.wordsLearnedToday,s.xpToday=n.xpToday,s.xpLast=n.xpLast,s.loading=!1}),(o,r)=>i(s).loading?A("",!0):(w(),I("div",We,[u("table",null,[u("tbody",null,[u("tr",null,[Pe,u("td",null,b(i(s).totalWordsTranslated),1)]),u("tr",null,[Re,u("td",null,b(i(s).wordsLearnedToday),1)]),u("tr",null,[$e,u("td",null,b(i(s).xpToday),1)]),u("tr",null,[Oe,u("td",null,b(i(s).xpLast),1)])])]),u("button",{onClick:r[0]||(r[0]=a=>e("hide"))},"Hide")]))}};class y{}c(y,"READER","Reader"),c(y,"VOCAB_IN_CONTEXT","Vocabulary in Context"),c(y,"VOCAB_MATCHING","Vocabulary Matching"),c(y,"CLOZE","Cloze"),c(y,"LISTENING1","Listening 1"),c(y,"LISTENING2","Listening 2");class Be{constructor(){c(this,"counts")}setCounts(e){this.counts=e}incrementAll(){Object.values(v.MASTERY_LEVELS).forEach(t=>{t!==v.MASTERY_LEVELS.DEFINED&&(this.counts[t]+=1)})}decrement(e){this.counts[e]-=1}getCount(e){return this.counts&&this.counts[e]}}const Ve=M(new Be),ne=()=>Ve,Ge={class:"sidebar"},He={class:"sidebar-group"},Ye=["value"],Ue={class:"sidebar-group"},je={class:"sidebar-group"},Xe={class:"sidebar-group"},Ze=ee({props:["runtimeData"],emits:["updateLanguage","importDatabase","exportDatabase","openFiles","changeActivity"],setup(f,{emit:e}){const t=f,n=ne(),s=M({isShowingStatistics:!1});G(()=>console.log("Sidebar will update",t));const o=r=>{const a=n.getCount(r);return a>0?`(${a})`:""};return(r,a)=>(w(),I("div",Ge,[u("div",He,[u("h3",null,b(t.runtimeData.openTextFile),1),u("h4",null,b(t.runtimeData.openAudioFile),1),_(Me),u("button",{onClick:a[0]||(a[0]=p=>r.$emit("openFiles"))},"Open Files"),u("input",{value:t.runtimeData.language,onChange:a[1]||(a[1]=p=>e("updateLanguage",p.target.value)),placeholder:"Language",type:"text"},null,40,Ye)]),u("div",Ue,[u("button",{onClick:a[2]||(a[2]=p=>e("changeActivity",i(y).READER))},"Reader"),u("button",{onClick:a[3]||(a[3]=p=>e("changeActivity",i(y).VOCAB_IN_CONTEXT))}," Vocabulary in Context "+b(o(i(v).MASTERY_LEVELS.VOCAB_IN_CONTEXT)),1),u("button",{onClick:a[4]||(a[4]=p=>e("changeActivity",i(y).VOCAB_MATCHING))}," Vocabulary Matching "+b(o(i(v).MASTERY_LEVELS.VOCAB_MATCHING)),1),u("button",{onClick:a[5]||(a[5]=p=>e("changeActivity",i(y).CLOZE))}," Cloze "+b(o(i(v).MASTERY_LEVELS.CLOZE)),1),u("button",{onClick:a[6]||(a[6]=p=>e("changeActivity",i(y).LISTENING1))}," Listening 1 "+b(o(i(v).MASTERY_LEVELS.LISTENING1)),1),u("button",{onClick:a[7]||(a[7]=p=>e("changeActivity",i(y).LISTENING2))}," Listening 2 "+b(o(i(v).MASTERY_LEVELS.LISTENING2)),1)]),u("div",je,[u("button",{onClick:a[8]||(a[8]=p=>i(s).isShowingStatistics=!0)},"Show Statistics"),i(s).isShowingStatistics?(w(),E(Fe,{key:0,onHide:a[9]||(a[9]=p=>i(s).isShowingStatistics=!1)})):A("",!0)]),u("div",Xe,[u("button",{onClick:a[10]||(a[10]=p=>e("exportDatabase"))},"Export Database"),u("button",{onClick:a[11]||(a[11]=p=>e("importDatabase"))},"Import Database")])]))}}),qe={id:"main"},O=ee({props:["title","subtitle"],setup(f){return(e,t)=>(w(),I(X,null,[u("div",qe,[u("h2",null,b(f.title),1),u("h3",null,b(f.subtitle),1),ie(e.$slots,"activity")]),ie(e.$slots,"sidebar")],64))}}),Z={props:["sentences","wordMap","selectedWordIndex","selectedSentenceIndex","highlighting","wordOptions"],emits:["selectWord"],setup(f,e){const t=n=>{if(f.wordMap===void 0)return"";let s=f.wordMap.get(n);if(!f.highlighting||!s.isDefined())return{backgroundColor:""};let o=(s.getMasteryPercentage()*120).toString(10);return{backgroundColor:"hsl("+o+",100%,75%)"}};return()=>{let n=0;if(f.sentences===void 0)return Y("p");let s=f.sentences.map((o,r)=>{let p=o.getWordsAndSpaces().map(T=>{if(T.trim()==="")return T;let L=D.cleanWord(T);if(L==="")return T;let S=n;n+=1;let m=f.selectedWordIndex===S,d={selected:m},g=T;if(f.wordOptions){const h=f.wordOptions(T,L);h.bold&&(d.bold=!0),h.blank&&(g="__________")}let l={key:S,style:m?"":t(L),class:d,onClick(){e.emit("selectWord",S)}};return Y("span",l,g)});const x={selected:f.selectedSentenceIndex===r};return Y("span",{key:r,class:x},p)});return Y("p",{className:f.highlighting?"highlight":""},s)}}},ze={id:"props.id"},le={props:["tag","text","focus","definition","language"],emits:["next","definitionUpdate"],setup(f,{emit:e}){const t=f,n=U(()=>t.tag?t.tag:"input"),s=Q(null),o=Q(t.definition),r=p=>{p.key==="Tab"&&(p.preventDefault(),p.target.blur(),e("next")),p.stopPropagation()},a=()=>{const p=t.text,x="https://translate.googleapis.com/translate_a/single?client=gtx&sl="+t.language+"&tl=en&dt=t&q="+encodeURI(p);fetch(x).then(T=>T.json()).then(T=>{o.value=T[0].map(([L])=>L).join(""),s.value.focus()})};return $(()=>{t.focus&&s.value.focus()}),(p,x)=>(w(),I("div",ze,[u("span",null,b(t.text),1),(w(),E(Te(i(n)),{ref_key:"definitionInput",ref:s,type:"text",placeholder:"Definition",value:o.value,onInput:x[0]||(x[0]=T=>o.value=T.target.value),onBlur:x[1]||(x[1]=T=>e("definitionUpdate",t.text,o.value)),onKeydown:r},null,8,["value"])),u("button",{onClick:a},"Google Translate")]))}};class Je{constructor(e){c(this,"wordIndex");c(this,"text");this.text=e,this.wordIndex=void 0}nextSentence(){if(this.wordIndex===void 0)return;const e=this.text().sentenceIndexByWordIndex,t=e[this.wordIndex];for(;;)if(this.wordIndex===this.text().words.length-1||(this.wordIndex+=1,e[this.wordIndex]!==t))return}nextWord(){this.wordIndex!==void 0&&this.wordIndex!==this.text().words.length-1&&(this.wordIndex+=1)}selectedWord(){return this.wordIndex===void 0?{}:this.text().words[this.wordIndex]}selectedSentence(){if(this.wordIndex===void 0)return{};const e=this.text().sentenceIndexByWordIndex[this.wordIndex],t=this.text().sentences[e].clean;return this.text().sentenceMap.get(t)}setIndex(e){this.wordIndex=e}getIndex(){return this.wordIndex}}const Ke={class:"sidebar right"},Qe={class:"sidebar-group"},et={class:"sidebar-group"},tt={class:"sidebar-group"},nt={props:["languageText","runtimeData"],emits:["changePageBy"],setup(f,{emit:e}){const t=f,n=W(),s=M({selectedWordCursor:new Je(()=>t.languageText),highlighting:!1,page:t.runtimeData.currentPage,marker:void 0}),o=U(()=>s.selectedWordCursor.selectedWord()),r=U(()=>s.selectedWordCursor.selectedSentence()),a=(...m)=>t.languageText.updateWordDefinition(...m),p=(...m)=>t.languageText.updateSentenceDefinition(...m),x=()=>{const m=t.languageText.sentences,d=t.languageText.sentenceMap;if(m.length===0)return;const g=m[0].clean,l=m[m.length-1].clean,h=d.get(g).startTime,C=d.get(l).endTime;n.setAudioTimes(h,C),n.pause()},T=()=>{t.runtimeData.currentPage!==s.page&&(s.selectedWordCursor.setIndex(void 0),s.page=t.runtimeData.currentPage)},L=()=>{s.marker===void 0?(n.play(),s.marker=0):s.marker+=1;let m=t.languageText.sentences;if(s.marker>0){let l=m[s.marker-1],h=t.languageText.sentenceMap.get(l.clean);t.languageText.updateSentenceTimes(h,null,n.getCurrentTime())}if(s.marker===m.length){n.pause(),s.marker=void 0;return}let d=m[s.marker],g=t.languageText.sentenceMap.get(d.clean);t.languageText.updateSentenceTimes(g,n.getCurrentTime(),null)},S=m=>{m.target instanceof HTMLInputElement||m.target instanceof HTMLTextAreaElement||m.key==="m"&&L()};return $(()=>{document.addEventListener("keydown",S)}),j(()=>{document.removeEventListener("keydown",S)}),G(()=>{T(),x()}),N(()=>{x()}),(m,d)=>(w(),E(O,{title:"Reader",subtitle:"Page "+(t.runtimeData.currentPage+1)},{activity:k(()=>[(w(),E(Z,{sentences:t.languageText.sentences,"word-map":t.languageText.wordMap,key:t.runtimeData.currentPage,"selected-word-index":i(s).selectedWordCursor.getIndex(),"selected-sentence-index":i(s).marker,highlighting:i(s).highlighting,onSelectWord:d[0]||(d[0]=g=>i(s).selectedWordCursor.setIndex(g))},null,8,["sentences","word-map","selected-word-index","selected-sentence-index","highlighting"]))]),sidebar:k(()=>[u("div",Ke,[u("div",Qe,[(w(),E(le,{id:"word-definition",key:i(o).word,text:i(o).word,focus:i(s).selectedWordCursor.getIndex()!==void 0,definition:i(o).definition,language:t.runtimeData.language,onDefinitionUpdate:a,onNext:d[1]||(d[1]=g=>i(s).selectedWordCursor.nextWord())},null,8,["text","focus","definition","language"])),(w(),E(le,{tag:"textarea",id:"sentence-definition",key:i(r).sentence,text:i(r).sentence,definition:i(r).definition,language:t.runtimeData.language,onDefinitionUpdate:p,onNext:d[2]||(d[2]=g=>i(s).selectedWordCursor.nextSentence())},null,8,["text","definition","language"]))]),u("div",et,[u("button",{onClick:d[3]||(d[3]=g=>e("changePageBy",-1))},"Previous Page"),u("button",{onClick:d[4]||(d[4]=g=>e("changePageBy",1))},"Next Page")]),u("div",tt,[u("button",{onClick:d[5]||(d[5]=g=>i(s).highlighting=!i(s).highlighting)}," Toggle Highlighting ")])])]),_:1},8,["subtitle"]))}},se={props:["sentence"],setup(f){const e=f,t=W(),n=H(),s=M({startTime:e.sentence.startTime,endTime:e.sentence.endTime});ce(e,()=>{s.startTime=e.sentence.startTime,s.endTime=e.sentence.endTime});const o=a=>{if(a!=="")return Number.parseFloat(a)},r=()=>{let a=o(s.startTime),p=o(s.endTime);e.sentence.updateTimes(a,p),t.setAudioTimes(a,p),n.putSentence(te(e.sentence))};return(a,p)=>(w(),I(X,null,[ae(u("input",{ref:"definitionInput",type:"number",placeholder:"Start Time","onUpdate:modelValue":p[0]||(p[0]=x=>i(s).startTime=x),onBlur:r},null,544),[[de,i(s).startTime]]),ae(u("input",{ref:"definitionInput",type:"number",placeholder:"End Time","onUpdate:modelValue":p[1]||(p[1]=x=>i(s).endTime=x),onBlur:r},null,544),[[de,i(s).endTime]])],64))}},st=["onClick"],q={props:["pool","solution"],emits:["correctAnswer"],setup(f,{emit:e}){const t=f;let n;const s=r=>{r===t.solution&&e("correctAnswer")},o=U(()=>{const r=[t.solution];for(let a=0;a<20;a+=1){let p=D.randomItem(t.pool);if(r.indexOf(p)===-1&&r.push(p),r.length===4)break}return D.shuffle(r),r});return $(()=>{n=r=>{if(!(r.target instanceof HTMLInputElement||r.target instanceof HTMLTextAreaElement)&&["1","2","3","4"].indexOf(r.key)!==-1){r.preventDefault();let p=Number.parseInt(r.key)-1;s(o.value[p])}},document.addEventListener("keydown",n)}),j(()=>{document.removeEventListener("keydown",n)}),(r,a)=>(w(),I("div",null,[(w(!0),I(X,null,ue(i(o),(p,x)=>(w(),I("button",{key:"index",class:"multiple-choice",onClick:T=>s(p)},b(`${x+1}. ${p}`),9,st))),128))]))}};class fe{constructor(e,t,n=void 0){c(this,"raw");c(this,"clean");c(this,"sentenceId");this.raw=e,this.clean=t,this.sentenceId=n}getWords(){return this.clean.split(/\s+/).map(D.cleanWord).filter(e=>e!=="")}getWordsAndSpaces(){return this.raw.split(/(\s+)/)}}const rt=ne(),B=H();class z{constructor(e,t){c(this,"masteryLevel");c(this,"practiceWords");c(this,"wordIndex");c(this,"sentences");c(this,"wordPool");c(this,"sentencePool");c(this,"done");this.masteryLevel=e,this.practiceWords=[],this.wordIndex=0,this.sentences=new Map,this.wordPool=[],this.sentencePool=[],this.done=t}word(){return this.practiceWords[this.wordIndex]}sentence(){const e=this.word();if(e!==void 0)return this.sentences.get(e.sentenceId)}rawSentences(){const e=this.sentence();return e===void 0?[]:[new fe(e.sentence,e.sentence,e.id)]}correctAnswer(){const e=this.word();e.updateMastery(this.masteryLevel),B.putWords([te(e)]),rt.decrement(this.masteryLevel),this.wordIndex+=1,this.wordIndex===this.practiceWords.length&&this.done()}async load(){const e=await B.getPracticeByType(this.masteryLevel),t=await B.getSentencesForWords(e),n=await B.getAllWords(),s=(await B.getDefinedSentences()).map(o=>o.definition);this.practiceWords=e,this.sentences=t,this.wordPool=n,this.sentencePool=s}}const ot={class:"sidebar right"},it={class:"sidebar-group"},at={emits:["done"],setup(f,{emit:e}){const t=W(),n=M(new z(v.MASTERY_LEVELS.VOCAB_IN_CONTEXT,()=>e("done"))),s=(r,a)=>a===n.word().word?{bold:!0}:{},o=()=>n.wordPool.filter(r=>r.isDefined()).map(r=>r.definition);return N(()=>{n.load()}),G(()=>{const r=n.sentence();t.setAudioTimes(r.startTime,r.endTime),t.play()}),(r,a)=>i(n).word()?(w(),E(O,{key:0,title:i(y).VOCAB_IN_CONTEXT},{activity:k(()=>[_(Z,{sentences:i(n).rawSentences(),"word-options":s},null,8,["sentences"]),_(q,{pool:o(),solution:i(n).word().definition,onCorrectAnswer:a[0]||(a[0]=()=>i(n).correctAnswer())},null,8,["pool","solution"])]),sidebar:k(()=>[u("div",ot,[u("div",it,[_(se,{sentence:i(n).sentence()},null,8,["sentence"])])])]),_:1},8,["title"])):A("",!0)}},dt={emits:["done"],setup(f,{emit:e}){const t=H(),n=M({practiceWords:[],practiceIndex:0,words:[],grid:[]});N(async()=>{n.practiceWords=await t.getPracticeByType(v.MASTERY_LEVELS.VOCAB_MATCHING),L()}),$(()=>{document.addEventListener("keydown",m)}),j(()=>{document.removeEventListener("keydown",m)});const s=(d,g)=>n.grid[g][d],o=(d,g,l)=>{n.grid[g][d]=l},r=(d,g)=>{const l=s(d,g);return{"matching-item":!0,selected:l===void 0?!1:l.selected}},a=(d,g)=>{const l=s(d,g);return l===void 0?"":n.words[l.wordIndex].definition},p=d=>{for(let g=0;g<n.words.length;g++)for(let l=0;l<n.words.length;l++){const h=s(l,g);if(h&&d(h))return[l,g]}},x=()=>{const[d,g]=p(F=>F.selected),l=s(d,g),h=(l.shuffledIndex+1)%n.words.length,[C,P]=p(F=>F.shuffledIndex===h),oe=s(C,P);l.selected=!1,oe.selected=!0},T=(d,g)=>{const[l,h]=p(J=>J.selected),C=l+d,P=h+g;if(!(1<=C&&C<=2&&0<=P&&P<=n.words.length-1))return;const F=s(C,P);o(C,P,s(l,h)),o(l,h,F),S()&&(n.words.forEach(J=>J.updateMastery(v.MASTERY_LEVELS.VOCAB_MATCHING)),t.putWords(n.words.map(te)),L())},L=()=>{n.words=n.practiceWords.slice(n.practiceIndex,n.practiceIndex+8),n.words.length===0&&e("done");const d=n.words.map((g,l)=>l);D.shuffle(d),n.grid=d.map((g,l)=>[void 0,void 0,{wordIndex:g,shuffledIndex:l,selected:l===0}]),n.practiceIndex+=n.words.length},S=()=>{for(let d=0;d<n.words.length;d++){const g=s(1,d);if(g===void 0||g.wordIndex!==d)return!1}return!0},m=d=>{d.key==="Tab"&&(d.preventDefault(),x()),d.key==="ArrowDown"&&(d.preventDefault(),T(0,1)),d.key==="ArrowLeft"&&(d.preventDefault(),T(-1,0)),d.key==="ArrowUp"&&(d.preventDefault(),T(0,-1)),d.key==="ArrowRight"&&(d.preventDefault(),T(1,0)),d.stopPropagation()};return(d,g)=>i(n).practiceWords.length>0?(w(),E(O,{key:0,title:i(y).VOCAB_IN_CONTEXT},{activity:k(()=>[u("table",null,[(w(!0),I(X,null,ue(i(n).words,(l,h)=>(w(),I("tr",null,[u("td",{class:K(r(0,h))},b(l.word),3),u("td",{class:K(r(1,h))},b(a(1,h)),3),u("td",{class:K(r(2,h))},b(a(2,h)),3)]))),256))])]),_:1},8,["title"])):A("",!0)}},lt={emits:["done"],setup(f,{emit:e}){const t=M(new z(v.MASTERY_LEVELS.CLOZE,()=>e("done"))),n=(o,r)=>r===t.word().word?{blank:!0}:{},s=()=>t.wordPool.map(o=>o.word);return N(()=>{t.load()}),(o,r)=>i(t).word()?(w(),E(O,{key:0,title:i(y).CLOZE},{activity:k(()=>[_(Z,{sentences:i(t).rawSentences(),"word-options":n},null,8,["sentences"]),_(q,{pool:s(),solution:i(t).word().word,onCorrectAnswer:r[0]||(r[0]=()=>i(t).correctAnswer())},null,8,["pool","solution"])]),_:1},8,["title"])):A("",!0)}},ct={class:"sidebar right"},ut={class:"sidebar-group"},pt={emits:["done"],setup(f,{emit:e}){const t=W(),n=M(new z(v.MASTERY_LEVELS.LISTENING1,()=>e("done"))),s=(r,a)=>a===n.word().word?{blank:!0}:{},o=()=>n.wordPool.map(r=>r.word);return N(()=>{n.load()}),G(()=>{const r=n.sentence();t.setAudioTimes(r.startTime,r.endTime),t.play()}),(r,a)=>i(n).word()?(w(),E(O,{key:0,title:i(y).LISTENING1},{activity:k(()=>[_(Z,{sentences:i(n).rawSentences(),"word-options":s},null,8,["sentences"]),_(q,{pool:o(),solution:i(n).word().word,onCorrectAnswer:a[0]||(a[0]=()=>i(n).correctAnswer())},null,8,["pool","solution"])]),sidebar:k(()=>[u("div",ct,[u("div",ut,[_(se,{sentence:i(n).sentence()},null,8,["sentence"])])])]),_:1},8,["title"])):A("",!0)}},gt={class:"sidebar right"},ft={class:"sidebar-group"},ht={emits:["done"],setup(f,{emit:e}){const t=W(),n=M(new z(v.MASTERY_LEVELS.LISTENING2,()=>e("done")));return N(()=>{n.load()}),G(()=>{const s=n.sentence();t.setAudioTimes(s.startTime,s.endTime),t.play()}),(s,o)=>i(n).sentence()?(w(),E(O,{key:0,title:i(y).LISTENING2},{activity:k(()=>[_(q,{pool:i(n).sentencePool,solution:i(n).sentence().definition,onCorrectAnswer:o[0]||(o[0]=()=>i(n).correctAnswer())},null,8,["pool","solution"])]),sidebar:k(()=>[u("div",gt,[u("div",ft,[_(se,{sentence:i(n).sentence()},null,8,["sentence"])])])]),_:1},8,["title"])):A("",!0)}};class mt{constructor(e,t,n,s,o){c(this,"filename");c(this,"totalWordsTranslated");c(this,"db");c(this,"pages");c(this,"text");c(this,"sentences");c(this,"sentenceMap");c(this,"sentenceIndexByWordIndex");c(this,"words");c(this,"wordMap");c(this,"promise");c(this,"onNewWordLearned");this.db=e,this.filename=t,this.totalWordsTranslated=0,this.pages=this.extractPages(n),this.onNewWordLearned=o,this.sentences=[],this.sentenceMap=new Map,this.words=[],this.wordMap=new Map,this.sentenceIndexByWordIndex=[],this.promise=new Promise(r=>r()),this.setPage(s)}async load(){await this.loadSentences(),await this.loadWords()}onUpdateDefinition(e){}setPage(e){return e<0||e>=this.pages.length?!1:(this.text=this.pages[e],!0)}extractPages(e){const n=[];let s=0,o=0,r=0,a=0;for(;a++,a!==1e3;){if(r=e.indexOf(`
`,o+1),r===-1){n.push(e.substring(s));break}if(r-s>1e3){const p=Math.abs(o-s-1e3),x=Math.abs(r-s-1e3),T=p<x?o:r;n.push(e.substring(s,T)),s=T}o=r}return n}async loadWords(){this.wordMap=new Map,this.words=[],this.sentenceIndexByWordIndex=[];let e=0;for(const t of this.sentences){const n=t.getWords();for(const s of n){let o=this.wordMap.get(s);o===void 0&&(o=await this.db.getWord(s)),o===void 0&&(o=new v(s,t.sentenceId)),o.sentenceId===void 0&&(o.sentenceId=t.sentenceId),this.words.push(o),this.wordMap.set(s,o),this.sentenceIndexByWordIndex.push(e)}await this.db.putWords([...this.wordMap.values()]),e+=1}}updateWordDefinition(e,t){const n=this.wordMap.get(e);n!==void 0&&n.definition!==t&&(n.isDefined()||(this.totalWordsTranslated+=1,this.onNewWordLearned()),n.setDefinition(t),console.log("Updating definition... for "+e+" to "+t),this.db.putWords([n]),this.onUpdateDefinition(e))}updateSentenceDefinition(e,t){const n=this.sentenceMap.get(e);n!==void 0&&n.definition!==t&&(n.definition=t,console.log("Updating definition... for "+e+" to "+t),this.db.putSentence(n))}updateMastery(e){e=e.map(t=>this.words.get(t).nextMastery()),this.db.putWords(e)}updateStats(){let e=0,t=0;this.wordMap.forEach(o=>{e+=o.mastery,t+=o.getNewCount()});const n=0,s=e/(this.wordMap.size*5);return{newWords:t,totalWordsTranslated:this.totalWordsTranslated,percentTranslated:n,percentWordsMastered:s}}async loadSentences(){let e=0;for(this.sentences=[],this.sentenceMap=new Map,this.text===void 0&&(this.text="");;){const t=D.nextEndPos(this.text,e),n=this.text.substring(e,t===!1?void 0:t+1);if(n==="")break;const s=n.trim();if(this.sentences.push(new fe(n,s)),t===!1)break;e=t+1}for(const t of this.sentences){if(this.sentenceMap.has(t.clean))continue;let n=await this.db.getSentence(t.clean);n===void 0&&(n=new pe(t.clean),n.id=await this.db.putSentence(n)),this.sentenceMap.set(t.clean,n),t.sentenceId=n.id}}updateSentenceTimes(e,t,n){t!==null&&(e.startTime=t),n!==null&&(e.endTime=n),this.db.putSentence(e)}updateSentence(e){this.sentenceMap.set(e.sentence,e),this.db.putSentence(e)}getWordMap(e){const t=new Map;return e.forEach(n=>{t.set(n,this.words.get(n))}),t}getWordStrArray(){return Array.from(this.words).map(e=>e[1].word)}getSentenceDefinitionArray(){return Array.from(this.sentenceMap).map(e=>e[1].definition)}getDefinitionArray(){return Array.from(this.words).map(e=>e[1].definition)}leastMasteredWord(e){const t=this.getWordMap(e.getWords());return D.randomWordsByMastery(t,1)[0]}leastMastery(){let e=v.MAX_MASTERY;return Array.from(this.words).forEach(([t,n])=>{n.definition!==""&&n.mastery<e&&(e=n.mastery)}),e}}const wt={setup(f){const e=H(),t=xe(void 0),n=W(),s=ne(),o=ge(),r=M({runtimeData:o,activity:y.READER}),a=async()=>{if(o.load(await e.getRuntimeData()),r.runtimeData=o,r.runtimeData.updateForNewDay(),s.setCounts(await e.getMasteryCounts()),console.log(r.runtimeData),r.runtimeData.openTextFile){const g=await e.getTextFile();t.value=await p(g),updateStats()}if(r.runtimeData.openAudioFile){let g=await e.getAudioFile();n.src=URL.createObjectURL(g)}},p=async g=>{let l=new mt(e,r.runtimeData.openTextFile,g,r.runtimeData.currentPage,x);return await l.load(),l},x=()=>{r.runtimeData.wordsLearnedToday+=1,r.runtimeData.xpToday+=1,s.incrementAll(),e.putRuntimeData(o)},T=async()=>{const g=await D.openFiles(),l=g.text,h=g.audio;if(l){const C=await l.text();r.runtimeData.openNewTextFile(l.name),t.value=await p(C),e.putTextFile(C),updateStats()}h&&(r.runtimeData.openNewAudioFile(h.name),n.src=URL.createObjectURL(h),e.putAudioFile(h)),e.putRuntimeData(o)},L=async g=>{let l=r.runtimeData.currentPage+g;!t.value.setPage(l)||(await t.value.load(),r.runtimeData.currentPage=l,e.putRuntimeData(o))},S=g=>{r.runtimeData.language=g,e.putRuntimeData(o)},m=async()=>{const l=await(await D.uploadText()).text();await e.import(JSON.parse(l)),await a()},d=async()=>{let g=await e.export();D.download("language-db.json",JSON.stringify(g))};return $(a),(g,l)=>(w(),I("div",null,[_(Ze,{"runtime-data":i(r).runtimeData,onOpenFiles:T,onUpdateLanguage:S,onImportDatabase:m,onExportDatabase:d,onChangeActivity:l[0]||(l[0]=h=>i(r).activity=h)},null,8,["runtime-data"]),i(r).activity===i(y).READER&&i(t)?(w(),E(nt,{key:0,"runtime-data":i(r).runtimeData,"language-text":i(t),onChangePageBy:L},null,8,["runtime-data","language-text"])):A("",!0),i(r).activity===i(y).VOCAB_IN_CONTEXT?(w(),E(at,{key:1,onDone:l[1]||(l[1]=h=>i(r).activity=i(y).READER)})):A("",!0),i(r).activity===i(y).VOCAB_MATCHING?(w(),E(dt,{key:2,onDone:l[2]||(l[2]=h=>i(r).activity=i(y).READER)})):A("",!0),i(r).activity===i(y).CLOZE?(w(),E(lt,{key:3,onDone:l[3]||(l[3]=h=>i(r).activity=i(y).READER)})):A("",!0),i(r).activity===i(y).LISTENING1?(w(),E(pt,{key:4,onDone:l[4]||(l[4]=h=>i(r).activity=i(y).READER)})):A("",!0),i(r).activity===i(y).LISTENING2?(w(),E(ht,{key:5,onDone:l[5]||(l[5]=h=>i(r).activity=i(y).READER)})):A("",!0)]))}},yt=ve({history:be("/language-reader-vue/"),routes:[{path:"/",name:"main",component:wt}]}),re=Ee(Se);re.use(Le());re.use(yt);re.mount("#app");
