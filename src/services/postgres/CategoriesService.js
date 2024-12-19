const { Pool } = require('pg');
const { nanoid } = require("nanoid");
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { user } = require('pg/lib/defaults');

class CategoriesService {
    constructor() {
        this._pool = new Pool();
    }
    
      // Menambahkan kategori baru
      async addCategory({ name, description }) {
        const id = `categories-${nanoid(16)}`;
        const createdAt = new Date().toISOString();
        const query = {
          text: 'INSERT INTO categories VALUES ($1, $2, $3, $4) RETURNING id',
          values: [id, name, description, createdAt]
        };
    
        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Kategori gagal ditambahkan');
        }
      
        return result.rows[0].id;
      }
    
      // Mendapatkan semua kategori
      async getCategories() {
        const query = {
          text: 'SELECT * FROM categories',
        };
    
        const result = await this._pool.query(query);
        return result.rows;
      }
    
      // Mendapatkan kategori berdasarkan ID
      async getCategoryById(id) {
        const query = {
          text: 'SELECT * FROM categories WHERE id = $1',
          values: [id],
        };
    
        const result = await this._pool.query(query);
    
        if (!result.rows.length) {
          throw new NotFoundError('Kategori tidak ditemukan');
        }
    
        return result.rows[0];
      }
    
      // Mengupdate kategori
      async updateCategoryById(id, { name, description }) {
        const query = {
          text: 'UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING id',
          values: [name, description, id],
        };
    
        const result = await this._pool.query(query);
    
        if (!result.rows.length) {
          throw new NotFoundError('Gagal memperbarui kategori. ID tidak ditemukan');
        }
    
        return result.rows[0].id;
      }
    
      // Menghapus kategori
      async deleteCategoryById(id) {
        const query = {
          text: 'DELETE FROM categories WHERE id = $1 RETURNING id',
          values: [id],
        };
    
        const result = await this._pool.query(query);
    
        if (!result.rows.length) {
          throw new NotFoundError('Gagal menghapus kategori. ID tidak ditemukan');
        }
    
        return result.rows[0].id;
      }
    
      // Menambahkan relasi produk dan kategori
      async addProductToCategory({ productId, categoryId }) {
        const id = `product-categories-${nanoid(16)}`;
        const query = {
          text: 'INSERT INTO product_categories VALUES ($1, $2, $3) RETURNING id',
          values: [id, productId, categoryId],
        };
    
        const result = await this._pool.query(query);
        if (!result.rows[0].id) {
            throw new InvariantError('Produk gagal ditambahkan ke kategori');
        }
      
        return result.rows[0].id;
      }
    
      // Mendapatkan semua produk berdasarkan kategori ID
      async getProductsByCategoryId(categoryId) {
        const query = {
          text: `
            SELECT p.id, p.name, p.stock, p.price, p.image_url, c.name AS category_name
            FROM products p
            JOIN product_categories pc ON p.id = pc.product_id
            JOIN categories c ON pc.category_id = c.id
            WHERE pc.category_id = $1;
          `,
          values: [categoryId],
        };
    
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Product dengan kategori tersebut gagal ditemukan.');
        }
        return result.rows;
      }
}

module.exports = CategoriesService;