import { database, ref, get} from './firebase.js';

class gamePage{
    constructor(){
        document.getElementById("BuyButton").onclick = () => {
        this.showPaymentModal();
    }
        this.gameData = null;
        this.currentEmail = null;
        this.init();
    }
    async init(){
        const urlParams = new URLSearchParams(window.location.search);
        const gameId = urlParams.get('id');
        if (!gameId) {
            console.log('Игра не найдена');
            return;
        }

        await this.loadGameData(gameId);
        this.renderGame();
    }
    async loadGameData(gameId) {
        try {
            const gameRef = ref(database, `Games/${gameId}`);
            const snapshot = await get(gameRef);
            if (snapshot.exists()) {
                this.gameData = snapshot.val();
                console.log('Данные игры загружены:', this.gameData);
            } else {
                console.log("Игра не найдена");
            }
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    }
    renderGame() {
        if (!this.gameData) return;

        this.updateGameInfo();
        this.updateMeta();
        this.updatePriceInfo();
        this.updateScreenshots();
        this.updateBreadcrumbs();
    }
    updateGameInfo() {
        document.getElementById('mainImg').src = this.gameData.images.main;
        document.getElementById('mainImg').alt = `Купить ${this.gameData.title}`;

        document.getElementById('secondImg').src = this.gameData.images.main;
        document.getElementById('secondImg').alt = `Купить ${this.gameData.title}`;
        
        document.getElementById('mainTitle').textContent = this.gameData.title;
        document.getElementById('secondTitle').textContent = this.gameData.title;

        document.getElementById('description').textContent = this.gameData.description;
    }
    updateMeta(){
        
        const head = document.getElementById("head");

        const metaDisc = document.createElement('meta');
        metaDisc.name="description";
        metaDisc.content = `Купить ${this.gameData.title}. Купить ключ ${this.gameData.title}. Купить ключ игры ${this.gameData.title}. ${this.gameData.title} на пк.`;

        const title = document.createElement('title');
        title.textContent = `Купить ключ ${this.gameData.title}`;

        const metaOGTitle = document.createElement('meta');
        metaOGTitle.property = "og:title";
        metaOGTitle.content = `Купить ключ ${this.gameData.title} по выгодной цене!`;

        const metaOGImage = document.createElement('meta');
        metaOGImage.property = "og:image";
        metaOGImage.content = this.gameData.images.main;

        head.appendChild(metaDisc);
        head.appendChild(title);
        head.appendChild(metaOGTitle);
        head.appendChild(metaOGImage);
    }
    updatePriceInfo() {
        document.getElementById('price').textContent = this.gameData.price + "₽";
        if (this.gameData.isDiscount) {
            document.getElementById('discount').textContent = this.gameData.discount + "%";
            document.getElementById('minusPrice').textContent ="-"+ (this.gameData.price * this.gameData.discount/100) + "₽";
            document.getElementById('finalPrice').textContent = this.gameData.price * (1-this.gameData.discount/100) + "₽";
        } else {
            document.getElementById('discountDiv').remove();
            document.getElementById('finalPrice').textContent = this.gameData.price + "₽";
        }
    }
    updateScreenshots() {
        let i = 1;
        while (i <= 6){
            switch (i){
                case 1: document.getElementById('scr1').src = this.gameData.images.screenshots.s1;
                    document.getElementById('scr1').alt = `Скриншот 1 ${this.gameData.title}.`;
                    break;
                case 2: document.getElementById('scr2').src = this.gameData.images.screenshots.s2;
                    document.getElementById('scr2').alt = `Скриншот 2 ${this.gameData.title}.`;
                    break;
                case 3: document.getElementById('scr3').src = this.gameData.images.screenshots.s3;
                    document.getElementById('scr3').alt = `Скриншот 3 ${this.gameData.title}.`;
                    break;
                case 4: document.getElementById('scr4').src = this.gameData.images.screenshots.s4;
                    document.getElementById('scr4').alt = `Скриншот 4 ${this.gameData.title}.`;
                    break;
                case 5: document.getElementById('scr5').src = this.gameData.images.screenshots.s5;
                    document.getElementById('scr5').alt = `Скриншот 5 ${this.gameData.title}.`;
                    break;
                case 6: document.getElementById('scr6').src = this.gameData.images.screenshots.s6;
                    document.getElementById('scr6').alt = `Скриншот 6 ${this.gameData.title}.`;
                    break;

            }
            i++;
        }
    }
    updateBreadcrumbs() {
        document.getElementById('breadCrumb').textContent = this.gameData.title;
    }
    



    showPaymentModal() {
        this.currentEmail = document.getElementById('email').value.trim();
        const modal = document.getElementById('payment-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');

        document.getElementById('payment-product-name').textContent = this.gameData.title;
        document.getElementById('payment-amount').textContent = 
            ((1 - this.gameData.discount/100) * this.gameData.price) + '₽';
        if (!window.realStripe.cardElement)
        {
            alert(1)
            window.realStripe.initCardElement('#card-element');
        }
        document.getElementById('confirm-payment').onclick = () => {
            this.processStripePayment(this.currentEmail);
        };

        document.getElementById('cancel-payment').onclick = () => {
            this.hidePaymentModal();
        };
    }

    hidePaymentModal() {
    const modal = document.getElementById('payment-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
    
    const errorDiv = document.getElementById('card-errors');
    if (errorDiv) {
        errorDiv.classList.add('hidden');
        errorDiv.textContent = '';
    }
    
    this.currentEmail = null;
    }

    async processStripePayment(email) {
    const errorDiv = document.getElementById('card-errors');
    errorDiv.classList.add('hidden');

    const amount = (1 - this.gameData.discount/100) * this.gameData.price;

    const confirmBtn = document.getElementById('confirm-payment');
    const originalText = confirmBtn.textContent;
    confirmBtn.textContent = 'Обработка...';
    confirmBtn.disabled = true;

    try {
        const paymentIntent = await window.realStripe.createPaymentIntent(amount * 100);
        
        const testClientSecret = 'pi_3PqgKqRx4WEq6RfE1s9t0sQO_secret_Tk4W8W8Z6q8X6q8X6q8X6q8X6q8X6q8X';
        
        const result = await window.realStripe.confirmPayment(testClientSecret);

        if (result.status === 'succeeded') {
            this.handleSuccessfulPayment(email, result);
        } else {
            throw new Error('Платеж не прошел. Статус: ' + result.status);
        }

    } catch (error) {
        console.error('Stripe error:', error);
        errorDiv.textContent = this.getFriendlyError(error);
        errorDiv.classList.remove('hidden');
    } finally {
        confirmBtn.textContent = originalText;
        confirmBtn.disabled = false;
    }
}

getFriendlyError(error) {
    // Простые сообщения об ошибках
    if (error.message.includes('Недостаточно средств')) return 'Недостаточно средств на карте';
    if (error.message.includes('отклонена')) return 'Карта отклонена банком';
    if (error.message.includes('Срок действия')) return 'Срок действия карты истек';
    
    return error.message || 'Ошибка при обработке платежа';
}

    handleSuccessfulPayment(email, paymentResult) {
        this.hidePaymentModal();
        
        const gameKey = this.generateGameKey();
        
        alert(`✅ Платеж через Stripe успешен!\nТранзакция: ${paymentResult.id}\nКлюч отправлен на: ${email}`);
        
        console.log('Stripe Payment Success:', {
            transactionId: paymentResult.id,
            amount: paymentResult.amount / 100,
            email: email,
            game: this.gameData.title,
            key: gameKey
        });
    }

    generateGameKey() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let key = '';
        for (let i = 0; i < 20; i++) {
            if (i > 0 && i % 5 === 0) key += '-';
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return key;
    }
    
}
document.addEventListener('DOMContentLoaded', () => {
    new gamePage();
});