import { database, ref, get, child } from './firebase.js';

class GameStore{
    constructor() {
        this.games = {};
        this.init();
    }
    //Инициализация
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
    //Загрузка игр из базы данных
    async LoadGames() {
        try{
            const dbRef = ref(database);
            const gamesSnapshot = await get(child(dbRef, 'Games'));
            
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
    document.getElementById("item-"+count).src = game.images.main;
    document.getElementById("item-"+count).alt = game.title;
    document.getElementById("item-"+count).parentElement.href = `/HTML/Keys/Steam/Game.html?id=${gameId}`;
    
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
        const container = document.getElementById('gameContainer');
        if (!container) return;

        container.innerHTML = '';
        var count = 0;
        Object.entries(this.games).forEach(([gameId, game]) => {
            if (count < 8){
                const gameCard = this.createGameCard(gameId, game);
            container.appendChild(gameCard);
            count++;
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
                        alt="${game.title}"
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