import{initializeApp as Q}from"https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";import{getDatabase as T,ref as B,get as F,child as J}from"https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";import{getAuth as V,createUserWithEmailAndPassword as $,signInWithEmailAndPassword as z,signOut as O,onAuthStateChanged as R,updateProfile as U}from"https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";var X={apiKey:"AIzaSyCUltMwgKS1GOH5sL46f5l0Z9oi6qI2aTI",authDomain:"max0ytst.firebaseapp.com",databaseURL:"https://max0ytst-default-rtdb.firebaseio.com",projectId:"max0ytst",storageBucket:"max0ytst.firebasestorage.app",messagingSenderId:"896428844125",appId:"1:896428844125:web:7a7bed5bfe578785ff59b4",measurementId:"G-G0RDKQBW80"},K=Q(X),L=T(K),G=V(K);class M{constructor(){this.games={},this.init()}async init(){try{await this.LoadGames(),this.renderCarousel(),this.renderGames()}catch(q){console.error("Ошибка инициализации:",q)}}async LoadGames(){try{let q=B(L),k=await F(J(q,"Games"));if(k.exists())this.games=k.val(),console.log("Все игры загружены");else console.log("Данные не найдены")}catch(q){console.error("Ошибка при загрузке игр: ",q)}}renderCarousel(){var q=0;Object.entries(this.games).forEach(([k,x])=>{if(q<5)this.createCarouselItem(k,x,q),q++})}createCarouselItem(q,k,x){document.getElementById("item-"+x).src=k.images.main,document.getElementById("item-"+x).alt=k.title,document.getElementById("item-"+x).parentElement.href=`/HTML/Keys/Steam/Game.html?id=${q}`,this.updateCarouselInfo(x,k)}updateCarouselInfo(q,k){let x=document.getElementById("item-"+q).parentElement;if(!x)return;let y=document.createElement("div");y.className="absolute bottom-5 left-5 rounded-lg bg-black bg-opacity-80 text-white p-4",y.innerHTML=`
        <span class="text-xl font-bold mb-2">${k.title}</span>
        <div class="flex items-center gap-3">
            ${k.isDiscount?`
                <span class="bg-yell text-viol text-lg font-bold px-1 rounded">
                    -${k.discount}%
                </span>
                <div class="flex flex-col">
                    <span class="text-sm line-through text-gray-300">${k.price} руб.</span>
                    <span class="text-xl font-bold text-yell">${k.price*(1-k.discount/100)} руб.</span>
                </div>
            `:`
                <span class="text-xl font-bold text-yell">${k.price} руб.</span>
            `}
        </div>
    `,x.appendChild(y)}renderGames(){let q=document.getElementById("gameContainer");if(!q)return;q.innerHTML="";var k=0;Object.entries(this.games).forEach(([x,y])=>{if(k<8){let N=this.createGameCard(x,y);q.appendChild(N),k++}})}createGameCard(q,k){let x=document.createElement("div");x.className="game-card bg-gree rounded-lg p-2";var y="";if(k.isDiscount)y=`
                <div class="bg-yell rounded-lg m-1 text-viol font-bold">
                    ${k.discount}%
                </div>
                <span class="text-lg font-bold text-viol">${k.price*(1-k.discount/100)} ₽</span>
                <span class="text-sm font-semibold text-dgee ml-1 line-through">${k.price} ₽</span>
            `;else y=`
                <span class="text-lg font-bold text-viol">${k.price} ₽</span>
                <span class="text-sm font-semibold text-dgee ml-1">${k.price} ₽</span>
            `;return x.innerHTML=`
        <a href="/HTML/Keys/Steam/Game.html?id=${q}">
            <div class="flex flex-col items-center w-50 text-center">
                <div class="w-50 h-60 overflow-hidden rounded-lg mb-2 bg-gray-100 flex items-center justify-center">
                    <img 
                        src="${k.images.main}" 
                        class="w-full h-full object-cover"
                        alt="Купить ${k.title}. Ключ ${k.title}"
                    >
                </div>
                <div class="h-20 flex flex-col justify-center">
                    <span class="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">${k.title}</span>
                    <div class="flex items-center mx-auto">
                        `+y+`
                    </div>
                </div>
            </div>
        </a>
        `,x}}document.addEventListener("DOMContentLoaded",()=>{window.gameStore=new M});
