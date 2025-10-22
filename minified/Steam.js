import{initializeApp as d}from"https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";import{getDatabase as m,ref as l,get as n,child as r}from"https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";import{getAuth as x,createUserWithEmailAndPassword as h,signInWithEmailAndPassword as y,signOut as g,onAuthStateChanged as b,updateProfile as G}from"https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";var f={apiKey:"AIzaSyCUltMwgKS1GOH5sL46f5l0Z9oi6qI2aTI",authDomain:"max0ytst.firebaseapp.com",databaseURL:"https://max0ytst-default-rtdb.firebaseio.com",projectId:"max0ytst",storageBucket:"max0ytst.firebasestorage.app",messagingSenderId:"896428844125",appId:"1:896428844125:web:7a7bed5bfe578785ff59b4",measurementId:"G-G0RDKQBW80"},c=d(f),a=m(c),$=x(c);class i{constructor(){this.games={},this.init()}async init(){try{await this.LoadGames(),this.renderGames()}catch(t){console.error("Ошибка инициализации:",t)}}async LoadGames(){try{let t=l(a),e=await n(r(t,"Games"));if(e.exists())this.games=e.val(),console.log("Все игры загружены");else console.log("Данные не найдены")}catch(t){console.error("Ошибка при загрузке игр: ",t)}}renderGames(){let t=document.getElementById("gameContainer");if(!t)return;t.innerHTML="",this.getGamesSortedByName().forEach(([e,s])=>{let o=this.createGameCard(e,s);t.appendChild(o)})}createGameCard(t,e){let s=document.createElement("div");s.className="game-card bg-gree rounded-lg p-2";var o="";if(e.isDiscount)o=`
                <div class="bg-yell rounded-lg m-1 text-viol font-bold">
                    ${e.discount}%
                </div>
                <span class="text-lg font-bold text-viol">${e.price*(1-e.discount/100)} ₽</span>
                <span class="text-sm font-semibold text-dgee ml-1 line-through">${e.price} ₽</span>
            `;else o=`
                <span class="text-lg font-bold text-viol">${e.price} ₽</span>
                <span class="text-sm font-semibold text-dgee ml-1">${e.price} ₽</span>
            `;return s.innerHTML=`
        <a href="/HTML/Keys/Steam/Game.html?id=${t}">
            <div class="flex flex-col items-center w-50 text-center">
                <div class="w-50 h-60 overflow-hidden rounded-lg mb-2 bg-gray-100 flex items-center justify-center">
                    <img 
                        src="${e.images.main}" 
                        class="w-full h-full object-cover"
                        alt="Купить ${e.title}. Ключ ${e.title}"
                    >
                </div>
                <div class="h-20 flex flex-col justify-center">
                    <span class="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">${e.title}</span>
                    <div class="flex items-center mx-auto">
                        `+o+`
                    </div>
                </div>
            </div>
        </a>
        `,s}getGamesSortedByName(){return Object.entries(this.games).sort(([,t],[,e])=>{return t.title.localeCompare(e.title)})}}document.addEventListener("DOMContentLoaded",()=>{window.gameStore=new i});
