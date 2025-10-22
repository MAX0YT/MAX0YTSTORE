import { database, ref, get, child } from './firebase.js';

class GameStore{
    constructor() {
        this.games = {};
        this.init();
    }
    async init(){
        try{
            await this.LoadGames();
            this.renderCarousel();
            this.renderGames();
        }
        catch (error){
            console.error('Ошибка инициализации:', error);
        }
    }

    async LoadGames() {
        try{
            const dbRef = ref(database);
            const gamesSnapshot = await get(child(dbRef, 'Games'))
            
            if (gamesSnapshot.exists()){
                this.games = gamesSnapshot.val();
                console.log("Все игры загружены");

            }
            else{
                console.log("Данные не найдены");
            }
        }
        catch (error){
            console.error("Ошибка при загрузке игр: ", error);
        }
    }
renderCarousel(){
        var count = 0;
        Object.entries(this.games).forEach(([gameId, game]) => {
            if (count < 5){
                this.createCarouselItem(gameId, game, count);
                count++;
            }
        });
    }
    createCarouselItem(gameId, game, count){
    // Обновляем изображение и ссылку
    document.getElementById("item-"+count).src = game.images.main;
    document.getElementById("item-"+count).alt = game.title;
    document.getElementById("item-"+count).parentElement.href = `/HTML/Keys/Steam/Game.html?id=${gameId}`;
    
    // Добавляем блок с информацией о цене и скидке
    this.updateCarouselInfo(count, game);
}

updateCarouselInfo(count, game) {
    const slideElement = document.getElementById("item-"+count).parentElement;
    if (!slideElement) return;
    
    const infoDiv = document.createElement('div');
    infoDiv.className = 'absolute bottom-5 left-5 rounded-lg bg-black bg-opacity-80 text-white p-4';
    infoDiv.innerHTML = `
        <span class="text-xl font-bold mb-2">${game.title}</span>
        <div class="flex items-center gap-3">
            ${game.isDiscount ? `
                <span class="bg-yell text-viol text-lg font-bold px-1 rounded">
                    -${game.discount}%
                </span>
                <div class="flex flex-col">
                    <span class="text-sm line-through text-gray-300">${game.price} руб.</span>
                    <span class="text-xl font-bold text-yell">${game.price*(1-game.discount/100)} руб.</span>
                </div>
            ` : `
                <span class="text-xl font-bold text-yell">${game.price} руб.</span>
            `}
        </div>
    `;
    
    slideElement.appendChild(infoDiv);
    }
    renderGames(){
        const container1 = document.getElementById('gameContainerPop');
        if (!container1) return;

        container1.innerHTML = '';
        var count1 = 0;
        Object.entries(this.games).forEach(([gameId, game]) => {
            if (count1 < 8){
                const gameCard = this.createGameCard(gameId, game);
            container1.appendChild(gameCard);
            count1++;
            }

        });
        const container2 = document.getElementById('gameContainerRas');
        if (!container2) return;

        container2.innerHTML = '';
        var count2 = 0;
        Object.entries(this.games).forEach(([gameId, game]) => {
            if (count2 < 8){
                const gameCard = this.createGameCard(gameId, game);
            container2.appendChild(gameCard);
            count2++;
            }

        });
        const container3 = document.getElementById('gameContainerPre');
        if (!container3) return;

        container3.innerHTML = '';
        var count3 = 0;
        Object.entries(this.games).forEach(([gameId, game]) => {
            if (count3 < 8){
                const gameCard = this.createGameCard(gameId, game);
            container3.appendChild(gameCard);
            count3++;
            }

        });
    }

    createGameCard(gameId, game){
        const card = document.createElement('div');
        card.className = 'game-card bg-gree rounded-lg p-2';
        var discountHtml = ``;
        if (game.isDiscount){
            discountHtml = `
                <div class="bg-yell rounded-lg m-1 text-viol font-bold">
                    ${game.discount}%
                </div>
                <span class="text-lg font-bold text-viol">${game.price*(1-game.discount/100)} ₽</span>
                <span class="text-sm font-semibold text-dgee ml-1 line-through">${game.price} ₽</span>
            `
        }
        else{
            discountHtml = `
                <span class="text-lg font-bold text-viol">${game.price} ₽</span>
                <span class="text-sm font-semibold text-dgee ml-1">${game.price} ₽</span>
            `
        }
        card.innerHTML = `
        <a href="/HTML/Keys/Steam/Game.html?id=${gameId}">
            <div class="flex flex-col items-center w-50 text-center">
                <div class="w-50 h-60 overflow-hidden rounded-lg mb-2 bg-gray-100 flex items-center justify-center">
                    <img 
                        src="${game.images.main}" 
                        class="w-full h-full object-cover"
                        alt="Купить ${game.title}. Ключ ${game.title}"
                    >
                </div>
                <div class="h-20 flex flex-col justify-center">
                    <span class="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">${game.title}</span>
                    <div class="flex items-center mx-auto">
                        `+discountHtml+`
                    </div>
                </div>
            </div>
        </a>
        `
        return card;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.gameStore = new GameStore();
});