const tracks={dev:"Développement web & dispositifs interactifs",creanum:"Création numérique",stratux:"Stratégie de communication & design d’expérience"};
const questions=[
 {q:"Sur un projet web, tu préfères…",opts:[{t:"Coder une fonctionnalité (JS/PHP, API, BDD)",track:"dev"},{t:"Concevoir l’interface et des micro-interactions",track:"creanum"},{t:"Définir stratégie, cible, KPIs et planning",track:"stratux"}]},
 {q:"Ton outil préféré :",opts:[{t:"VS Code, Git, Postman",track:"dev"},{t:"Figma / After Effects",track:"creanum"},{t:"Notion, Analytics, Suite Meta",track:"stratux"}]},
 {q:"Où es-tu le plus à l’aise ?",opts:[{t:"Debug, logique/algos",track:"dev"},{t:"Maquettes, motion",track:"creanum"},{t:"Benchmark, personas, pitch",track:"stratux"}]},
 {q:"Stage idéal :",opts:[{t:"Agence/équipe de dev (front/back)",track:"dev"},{t:"Studio de design/UX",track:"creanum"},{t:"Agence digitale/produit (gestion/stratégie)",track:"stratux"}]},
 {q:"Petite tâche rapide qui te plaît :",opts:[{t:"Corriger un bug + requête SQL",track:"dev"},{t:"Créer une micro-interaction soignée",track:"creanum"},{t:"Planifier un calendrier éditorial",track:"stratux"}]},
 {q:"Quand tu apprends, tu ouvres d’abord :",opts:[{t:"MDN, docs, issues GitHub",track:"dev"},{t:"Design systems, Behance/Dribbble",track:"creanum"},{t:"Blogs marketing/produit",track:"stratux"}]},
 {q:"Livrable motivant :",opts:[{t:"API + front relié à une BDD",track:"dev"},{t:"Prototype haute fidélité animé",track:"creanum"},{t:"Dossier stratégie + KPIs",track:"stratux"}]},
 {q:"Dans une équipe, tu te vois :",opts:[{t:"Développeur·se (front/back)",track:"dev"},{t:"Designer UI/UX",track:"creanum"},{t:"Chef·fe de projet/PO junior",track:"stratux"}]}
];
const start=document.getElementById("start"),quiz=document.getElementById("quiz"),result=document.getElementById("result");
const startBtn=document.getElementById("startBtn"),nextBtn=document.getElementById("nextBtn"),restartBtn=document.getElementById("restartBtn");
const progress=document.getElementById("progress"),questionEl=document.getElementById("question"),options=document.getElementById("options");
const winner=document.getElementById("winner"),breakdown=document.getElementById("breakdown");
let idx=0,score={dev:0,creanum:0,stratux:0},choice=null;
startBtn.onclick=()=>{start.hidden=true;quiz.hidden=false;render()};
nextBtn.onclick=()=>{if(!choice)return;score[choice]++;idx++;choice=null;if(idx<questions.length){render()}else{show()}};
restartBtn.onclick=()=>{idx=0;score={dev:0,creanum:0,stratux:0};choice=null;result.hidden=true;quiz.hidden=false;render()};
function render(){const q=questions[idx];progress.textContent=`Question ${idx+1}/${questions.length}`;questionEl.textContent=q.q;options.innerHTML="";nextBtn.disabled=true;
 q.opts.forEach(o=>{const b=document.createElement("button");b.className="opt";b.textContent=o.t;
  b.onclick=()=>{choice=o.track;[...options.children].forEach(c=>c.classList.remove("sel"));b.classList.add("sel");nextBtn.disabled=false};
  options.appendChild(b)});}
function show(){quiz.hidden=true;result.hidden=false;const max=Math.max(...Object.values(score));
 const tops=Object.keys(score).filter(k=>score[k]===max);
 winner.textContent=tops.length===1?`Parcours recommandé : ${tracks[tops[0]]}`:`Deux parcours possibles : ${tops.map(t=>tracks[t]).join(" et ")}`;
 breakdown.innerHTML="";const total=Object.values(score).reduce((a,b)=>a+b,0)||1;
 ["dev","creanum","stratux"].forEach(k=>{const li=document.createElement("li");const pct=Math.round(100*score[k]/total);
  li.textContent=`${tracks[k]} : ${score[k]}/${total} (${pct}%)`;breakdown.appendChild(li)});
}