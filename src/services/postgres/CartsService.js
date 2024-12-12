const { Pool } = require('pg');
const { nanoid } = require("nanoid");
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class CartsService {
    constructor() {
      this._pool = new Pool();
    }

    async addItemToCart(userId, { productId, quantity }) {
        const id = `cart-${nanoid(16)}`;
        const createdAt = new Date().toISOString();
        const query = {
            text: 'INSERT INTO carts VALUES($1, $2, $3, $4, $5) RETURNING id',
            values: [id, userId, productId, quantity, createdAt]
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
          throw new InvariantError('Wishlist gagal ditambahkan');
        }
    
        return result.rows[0].id;
    }

    async getCart(userId) {
        const query = {
          // query sql masih contoh
          text: `
            SELECT c.id, c.product_id, c.quantity, c.created_at, p.name AS product_name, p.price AS product_price
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = $1`,
          values: [userId],
        };
    
        const result = await this._pool.query(query);
        return result.rows;
    }

    async updateItemQuantity(userId, { productId, quantity }) {
        const query = {
          text: `
                UPDATE cart
                SET quantity = $3
                WHERE user_id = $1 AND product_id = $2
                RETURNING id`,
          values: [userId, productId, quantity],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Item gagal diperbarui. Id tidak ditemukan');
        }
    }

    async deleteItemInCart(userId) {
        const query = {
          text: `
                DELETE FROM cart
                WHERE user_id = $1 AND product_id = $2 RETURNING id`,
          values: [userId],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Keranjang gagal dihapus. Id tidak ditemukan');
        }
    }
}

module.exports = CartsService;