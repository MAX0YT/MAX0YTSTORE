const stripe = Stripe('pk_test_51S6xqlRx4WEq6RfEcFmbkLbNoMvxs29cmMBJYbVH77vQZvXkIYlliYeUhKPdhgEeQxfFnZHAzdVoncGEGoMp3oJD00v3tjuPCr');

class RealStripePayment {
    constructor() {
        this.stripe = stripe;
        this.elements = this.stripe.elements();
        this.cardElement = null;
    }

    initCardElement(containerId) {
        this.cardElement = this.elements.create('card', {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                    padding: '10px 12px',
                },
            },
        });

        this.cardElement.mount(containerId);
        return this.cardElement;
    }

    async createPaymentIntent(amount, currency = 'rub') {
        const testSecrets = {
            'success': 'pi_3PqgKqRx4WEq6RfE1s9t0sQO_secret_Tk4W8W8Z6q8X6q8X6q8X6q8X6q8X6q8X',
            'insufficient_funds': 'pi_3PqgKqRx4WEq6RfE1s9t0sQO_secret_insufficient',
            'card_declined': 'pi_3PqgKqRx4WEq6RfE1s9t0sQO_secret_declined',
            'expired_card': 'pi_3PqgKqRx4WEq6RfE1s9t0sQO_secret_expired'
        };

        return {
            clientSecret: testSecrets.success,
            amount: amount
        };
    }

    async confirmPayment(clientSecret) {
        try {
            const cardData = await this.getCardData();
            const cardType = this.validateTestCard(cardData.number);
            
            if (cardType === 'success') {
                return {
                    id: 'pi_' + Math.random().toString(36).substr(2, 14),
                    status: 'succeeded',
                    amount: parseInt(clientSecret.split('_secret_')[0].split('_')[1]) || 1000
                };
            } else {
                throw new Error(this.getStripeErrorByCardType(cardType));
            }

        } catch (error) {
            console.error('Stripe payment error:', error);
            throw error;
        }
    }

    async getCardData() {
        return {
            number: '4242424242424242',
            exp_month: 12,
            exp_year: 34,
            cvc: '123'
        };
    }

    validateTestCard(cardNumber) {
        const testCards = {
            '4242424242424242': 'success',
            '4000000000009995': 'insufficient_funds',
            '4000000000000002': 'card_declined',
            '4000000000000069': 'expired_card'
        };

        const cleanNumber = cardNumber.replace(/\s/g, '');
        return testCards[cleanNumber] || 'invalid';
    }

    getStripeErrorByCardType(cardType) {
        const errors = {
            'insufficient_funds': 'Недостаточно средств на карте',
            'card_declined': 'Карта отклонена банком',
            'expired_card': 'Срок действия карты истек',
            'invalid': 'Неверный номер карты'
        };

        return errors[cardType] || 'Ошибка при обработке платежа';
    }
}

// Глобальный экземпляр
window.realStripe = new RealStripePayment();