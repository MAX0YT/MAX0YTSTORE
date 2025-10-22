import { database, ref, get, child } from './firebase.js';

class GameStore{
    constructor() {
        this.games = {};
        this.init();
    }
    async init(){
        try{
            await this.LoadGames();
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

    renderGames(){
        const container = document.getElementById('gameContainer');
        if (!container) return;

        container.innerHTML = '';

        this.getGamesSortedByName().forEach(([gameId, game]) => {
            const gameCard = this.createGameCard(gameId, game);
            container.appendChild(gameCard);
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
    getGamesSortedByName() {
        return Object.entries(this.games).sort(([, gameA], [, gameB]) => {
            const compareResult = gameA.title.localeCompare(gameB.title);
            return compareResult;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.gameStore = new GameStore();
});