const { Pool } = require('pg');
const { nanoid } = require("nanoid");
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class OrdersService {
    constructor() {
      this._pool = new Pool();
    }

    async createOrder(userId, totalAmount) {        
        const orderId = `order-${nanoid(16)}`;
        const createdAt = new Date().toISOString();

        const query = {
            text: 'INSERT INTO orders VALUES($1, $2, $3, $4) RETURNING id',
            values: [orderId, userId, createdAt, totalAmount]
        };

        const result = await this._pool.query(query);

        
        if (!result.rows[0].id) {
            throw new InvariantError('Order gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getOrderByUserId(userId) {
        const query = {
            text: 'SELECT * FROM orders WHERE user_id = $1',
            values: [userId]
        };
        const result = await this._pool.query(query);
        
        if (!result.rows.length) {
            throw new NotFoundError('Pesanan tidak ditemukan');
        }
        return result.rows;
    }

    async deleteOrder(orderId) {
        const query = {
            text: 'DELETE orders WHERE id = $1',
            values: [orderId]
        };
        const result = await this._pool.query(query);
        if (!result.rowCount) {
            throw new NotFoundError('Pesanan gagal dibatalkan. Id tidak ditemukan');
        }
    }

    async createOrderItems({ orderId, productId, quantity, pricePerItem, totalPrice }) {        
        const orderItemId = `order-item-${nanoid(16)}`;

        const query = {
            text: 'INSERT INTO order_items (id, order_id, product_id, quantity, price_per_item, total_price) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
            values: [orderItemId, orderId, productId, quantity, pricePerItem, totalPrice]
        };

        const result = await this._pool.query(query);

        
        if (!result.rows[0].id) {
            throw new InvariantError('Order item gagal ditambahkan');
        }

        return result.rows[0].id;
    }
}

module.exports = OrdersService;