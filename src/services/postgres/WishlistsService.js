const { Pool } = require('pg');
const { nanoid } = require("nanoid");
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { user } = require('pg/lib/defaults');

class WishlistsService {
    constructor() {
      this._pool = new Pool();
    }

    async addWishlist(userId, productId) {
      const id = `wishlist-${nanoid(16)}`;
      const createdAt = new Date().toISOString();
      const query = {
        text: 'INSERT INTO wishlists VALUES($1, $2, $3, $4) RETURNING id',
        values: [id, userId, productId, createdAt]
      };

      const result = await this._pool.query(query);

      if (!result.rows[0].id) {
        throw new InvariantError('Wishlist gagal ditambahkan');
      }
  
      return result.rows[0].id;
    }

    async getWishlist(userId) {
      const query = {
        text: 'SELECT wishlists.id, products.id, products.name, products.price, products.image_url FROM wishlists JOIN products ON wishlists.product_id = products.id WHERE wishlists.user_id = $1',
        values: [userId],
      };

      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new NotFoundError('Gagal mendapatkan produk. ID tidak ditemukan');
      }

      return result.rows;
    } 

    async isProductInWishlist(userId, productId) {
      const query = {
        text: 'SELECT * FROM wishlists WHERE user_id = $1 AND product_id = $2',
        values: [userId, productId],
      };

      const result = await this._pool.query(query);
      
      if (!result.rows.length) {
        return false;
      }

      return true;
    }

    async deleteWishlist(userId, productId) {
      const query = {
        text: 'DELETE FROM wishlists WHERE user_id = $1 AND product_id = $2',
        values: [userId, productId],
      };

      const result = await this._pool.query(query);

      if (!result.rowCount) {
        throw new NotFoundError('Product gagal dihapus. Id tidak ditemukan');
      }
    }
}

module.exports = WishlistsService;