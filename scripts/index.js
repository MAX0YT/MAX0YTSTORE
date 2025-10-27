import{initializeApp as D}from"https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";import{getDatabase as E,ref as G,get as H,child as I}from"https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";import{getAuth as O,createUserWithEmailAndPassword as Y,signInWithEmailAndPassword as Z,signOut as _,onAuthStateChanged as $,updateProfile as g}from"https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";var P={apiKey:"AIzaSyCUltMwgKS1GOH5sL46f5l0Z9oi6qI2aTI",authDomain:"max0ytst.firebaseapp.com",databaseURL:"https://max0ytst-default-rtdb.firebaseio.com",projectId:"max0ytst",storageBucket:"max0ytst.firebasestorage.app",messagingSenderId:"896428844125",appId:"1:896428844125:web:7a7bed5bfe578785ff59b4",measurementId:"G-G0RDKQBW80"},z=D(P),R=E(z),m=O(z);class A{constructor(){this.games={},this.init()}async init(){try{await this.LoadGames(),this.renderCarousel(),this.renderGames()}catch(l){console.error("Ошибка инициализации:",l)}}async LoadGames(){try{let l=G(R),d=await H(I(l,"Games"));if(d.exists())this.games=d.val(),console.log("Все игры загружены");else console.log("Данные не найдены")}catch(l){console.error("Ошибка при загрузке игр: ",l)}}renderCarousel(){var l=0;Object.entries(this.games).forEach(([d,n])=>{if(l<5)this.createCarouselItem(d,n,l),l++})}createCarouselItem(l,d,n){document.getElementById("item-"+n).src=d.images.main,document.getElementById("item-"+n).alt=d.title,document.getElementById("item-"+n).parentElement.href=`/HTML/Keys/Steam/Game.html?id=${l}`,this.updateCarouselInfo(n,d)}updateCarouselInfo(l,d){let n=document.getElementById("item-"+l).parentElement;if(!n)return;let v=document.createElement("div");v.className="absolute bottom-5 left-5 rounded-lg bg-black bg-opacity-80 text-white p-4",v.innerHTML=`
        <span class="text-xl font-bold mb-2">${d.title}</span>
        <div class="flex items-center gap-3">
            ${d.isDiscount?`
                <span class="bg-yell text-viol text-lg font-bold px-1 rounded">
                    -${d.discount}%
                </span>
                <div class="flex flex-col">
                    <span class="text-sm line-through text-gray-300">${d.price} руб.</span>
                    <span class="text-xl font-bold text-yell">${d.price*(1-d.discount/100)} руб.</span>
                </div>
            `:`
                <span class="text-xl font-bold text-yell">${d.price} руб.</span>
            `}
        </div>
    `,n.appendChild(v)}renderGames(){let l=document.getElementById("gameContainer");if(!l)return;l.innerHTML="";var d=0;Object.entries(this.games).forEach(([n,v])=>{if(d<8){let C=this.createGameCard(n,v);l.appendChild(C),d++}})}createGameCard(l,d){let n=document.createElement("div");n.className="game-card bg-gree rounded-lg p-2";var v="";if(d.isDiscount)v=`
                <div class="bg-yell rounded-lg m-1 text-viol font-bold">
                    ${d.discount}%
                </div>
                <span class="text-lg font-bold text-viol">${d.price*(1-d.discount/100)} ₽</span>
                <span class="text-sm font-semibold text-dgee ml-1 line-through">${d.price} ₽</span>
            `;else v=`
                <span class="text-lg font-bold text-viol">${d.price} ₽</span>
                <span class="text-sm font-semibold text-dgee ml-1">${d.price} ₽</span>
            `;return n.innerHTML=`
        <a href="/HTML/Keys/Steam/Game.html?id=${l}">
            <div class="flex flex-col items-center w-50 text-center">
                <div class="w-50 h-60 overflow-hidden rounded-lg mb-2 bg-gray-100 flex items-center justify-center">
                    <img loading=«lazy»
                        src="${d.images.main}" 
                        class="w-full h-full object-cover"
                        alt="Купить ${d.title}. Ключ ${d.title}"
                    >
                </div>
                <div class="h-20 flex flex-col justify-center">
                    <span class="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">${d.title}</span>
                    <div class="flex items-center mx-auto">
                        `+v+`
                    </div>
                </div>
            </div>
        </a>
        `,n}}document.addEventListener("DOMContentLoaded",()=>{window.gameStore=new A});
