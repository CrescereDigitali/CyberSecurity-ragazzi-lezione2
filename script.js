const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
$$(".tab").forEach(b=>b.onclick=()=>{$$(".tab").forEach(x=>x.classList.remove("active"));$$(".game").forEach(x=>x.classList.remove("active"));b.classList.add("active");$("#"+b.dataset.go).classList.add("active")});

function fireworks(){
 const c=$("#fx"),ctx=c.getContext("2d"); c.width=innerWidth;c.height=innerHeight;
 const cols=["#2c8fd0","#315bc7","#7a55d9","#ffcf4b","#ff617c","#2ac28a"];let p=[];
 for(let z=0;z<7;z++){let ox=innerWidth*(.12+Math.random()*.76),oy=innerHeight*(.12+Math.random()*.45);for(let i=0;i<45;i++){let a=Math.random()*6.283,s=2+Math.random()*7;p.push({x:ox,y:oy,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:70+Math.random()*25,c:cols[Math.floor(Math.random()*cols.length)]})}}
 function f(){ctx.clearRect(0,0,c.width,c.height);p.forEach(q=>{q.x+=q.vx;q.y+=q.vy;q.vy+=.075;q.life--;ctx.globalAlpha=Math.max(0,q.life/90);ctx.fillStyle=q.c;ctx.beginPath();ctx.arc(q.x,q.y,2.5,0,6.283);ctx.fill()});ctx.globalAlpha=1;p=p.filter(q=>q.life>0);if(p.length)requestAnimationFrame(f)}f()
}

$("#check1").onclick=()=>{let s=$$("#g1 select");if(s.some(x=>!x.value)){r1("Completa tutti e quattro i profili.",false);return}let n=s.filter(x=>x.value===x.dataset.a).length;if(n===4){r1("4/4 corrette! Hai riconosciuto tutte le password prevedibili.",true);fireworks()}else r1(`${n}/4 corrette. Controlla quali informazioni sono pubbliche e riprova.`,false)};
$("#reset1").onclick=()=>{$$("#g1 select").forEach(x=>x.value="");$("#r1").textContent="";$("#r1").className="result"};
function r1(t,ok){$("#r1").textContent=t;$("#r1").className="result "+(ok?"ok":"bad")}

const people=[
{name:"Giulia",handle:"@giu.volley8",face:"G",posts:[
["img/giu-volley.png"],
["img/giu-cookie.png"],
["img/giu-parigi.png"],
["img/giu-tramonto.png"]
],choices:["Cookie-Parigi-Volley-8","Labrador-Torre-Palla-8","Faro-Cactus-Tamburo-Nebbia-43"],answer:2,why:"Questa passphrase non usa nessuna informazione ricavabile dai post. Le altre sfruttano pallavolo/8, Cookie/Labrador e Parigi."},
{name:"Samuele",handle:"@SamGame",face:"S",posts:[
["img/sam-gaming.png"],
["img/sam-inter.png"],
["img/sam-thor.png"],
["img/sam-cinema.png"]
],choices:["Creeper-Inter-Thor-3","Gatto-Calcio-Blocchi-3","Ombrello-Marte-Limone-Treno-61"],answer:2,why:"Questa passphrase è scollegata dai post. Le altre riutilizzano informazioni pubbliche sul gaming, calcio/Inter, Thor/gatto e il numero 3."}
];
let cur=0,solved=new Set();
function render(){
 let p=people[cur];$("#count").textContent=`Profilo ${cur+1} di ${people.length}`;
 $("#person").innerHTML=`<div class="person-head"><div class="face">${p.face}</div><div><h3>${p.name}</h3><p>${p.handle}</p></div></div>
 <div class="posts">${p.posts.map((x,i)=>`<article class="post ig-post"><img src="${x[0]}" alt="Post Instagram ${i+1} di ${p.handle}"></article>`).join("")}</div>
 <div class="question"><h3>Quale passphrase non può essere ricavata dagli indizi nei post?</h3><div class="choices">${p.choices.map((x,i)=>`<button class="choice" data-i="${i}">${String.fromCharCode(65+i)} · ${x}</button>`).join("")}</div><p class="explain" id="why"></p></div>`;
 $$(".choice").forEach(b=>b.onclick=()=>{let i=+b.dataset.i;$$(".choice").forEach(x=>x.classList.remove("good","wrong"));if(i===p.answer){b.classList.add("good");$("#why").innerHTML="<b>Giusto!</b> "+p.why;solved.add(cur);$("#r2").textContent=`Profili risolti: ${solved.size}/${people.length}`;$("#r2").className="result ok";fireworks()}else{b.classList.add("wrong");$("#why").innerHTML="<b>Non ancora.</b> Questa passphrase contiene elementi collegabili ai post. Riprova.";$("#r2").textContent="Osserva di nuovo i quattro post.";$("#r2").className="result bad"}});
}
$("#prev").onclick=()=>{cur=(cur-1+people.length)%people.length;render()};$("#next").onclick=()=>{cur=(cur+1)%people.length;render()};render();