const { Pool } = require("pg");
const midtransClient = require('midtrans-client');

class PaymentsService {
    constructor() {
        this._pool = new Pool();
        this.snap = new midtransClient.Snap({
            isProduction: false, // Set to true for production
            serverKey: process.env.SERVER_KEY,
            clientKey: process.env.CLIENT_KEY
        });
    }

    async createPayment({ orderId, amount, itemsArray, customer }) {
        const midtransResponse = await this.createMidtransPayment({ orderId, amount, itemsArray, customer });
        return midtransResponse;
    }

    async createMidtransPayment({ orderId, amount, itemsArray, customer }) {
        let parameter = {
            "transaction_details": {
                "order_id": orderId,
                "gross_amount": amount
            },
            "credit_card": {
                "secure": true
            },
            "item_details": itemsArray,
            "customer_details": {
                "first_name": customer.username,            
                "email": customer.email,
            }
        };

        try {
            const chargeResponse = await this.snap.createTransaction(parameter);
            return chargeResponse;
        } catch (error) {
            console.error('Midtrans API error:', error);
            throw new Error('Failed to create transaction with Midtrans');
        }
    }
}

module.exports = PaymentsService;
