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

    async isProductInWishlist(userId, productId) {
      const query = {
        text: 'SELECT COUNT(*) FROM wishlists WHERE user_id = $1 AND product_id = $2',
        values: [userId, productId],
      };

      const result = await this._pool.query(query);
      
      if (result.rows.length) {
        throw new InvariantError('Produk telah terdapat di wishlist');
      }
    }

    async deleteWishlist(userId, productId) {
      const query = {
        text: 'DELETE FROM wishlists WHERE user_id = $1 AND product_id = $2 RETURNING id',
        values: [userId, productId],
      };

      const result = await this._pool.query(query)
      if (!result.rows.length) {
        throw new NotFoundError('Product gagal dihapus. Id tidak ditemukan');
      }
    }
}

module.exports = WishlistsService;