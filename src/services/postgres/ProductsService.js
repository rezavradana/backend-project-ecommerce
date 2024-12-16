const { Pool } = require('pg');
const { nanoid } = require("nanoid");
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class ProductsService {
    constructor() {
      this._pool = new Pool();
    }

    async addProduct({ name, description, price, stock, imageUrl }) {
        const id = `product-${nanoid(16)}`;
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        const query = {
            text: 'INSERT INTO products VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
            values: [id, name, description, price, stock, imageUrl, createdAt, updatedAt]
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
          throw new InvariantError('Product gagal ditambahkan');
        }
    
        return result.rows[0].id;
    }

    async getProducts() {
        const query = {
            text: 'SELECT * from products',
        }

        const result = await this._pool.query(query);
        return result.rows;
    }

    async getProductById(id) {
        const query = {
            text: 'SELECT * from products WHERE id = $1',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Product tidak ditemukan');
        }

        return result.rows[0];
    }

    async editProductById(id, { name, description, price, stock, imageUrl }) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, image_url = $5, updated_at = $6 WHERE id = $7 RETURNING id',
            values: [name, description, price, stock, imageUrl, updatedAt, id]
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui product. Id tidak ditemukan');
        }
    }

    async deleteProductById(id) {
        const query = {
            text: 'DELETE FROM products WHERE id = $1',
            values: [id],
        };
      
        const result = await this._pool.query(query);
    
        if (!result.rowCount) {
            throw new NotFoundError('Product gagal dihapus. Id tidak ditemukan');
        }
    }
}

module.exports = ProductsService;