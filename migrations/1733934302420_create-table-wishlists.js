/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('wishlists', {
        id: {
          type: 'varchar(50)',  // Tipe data auto increment
          primaryKey: true, // Menandakan kolom id sebagai primary key
        },
        user_id: {
          type: 'varchar(50)', // Tipe data integer untuk user_id
          notNull: true,   // Menyatakan bahwa kolom ini tidak boleh null
        },
        product_id: {
          type: 'varchar(50)', // Tipe data integer untuk product_id
          notNull: true,   // Menyatakan bahwa kolom ini tidak boleh null
        },
        created_at: {
          type: 'text',
          notNull: true,
        }
    });
    
      // Menambahkan foreign key untuk user_id yang mengacu pada tabel users
      pgm.addConstraint('wishlists', 'fk_wishlists_user_id', {
        foreignKeys: {
          columns: 'user_id',
          references: 'users(id)',  // Mengacu pada tabel users dengan kolom id
          onDelete: 'CASCADE', // Jika user dihapus, data wishlist terkait juga dihapus
        }
    });
    
      // Menambahkan foreign key untuk product_id yang mengacu pada tabel products
      pgm.addConstraint('wishlists', 'fk_wishlists_product_id', {
        foreignKeys: {
          columns: 'product_id',
          references: 'products(id)',  // Mengacu pada tabel products dengan kolom id
          onDelete: 'CASCADE', // Jika produk dihapus, data wishlist terkait juga dihapus
        }
    });

    pgm.addConstraint(
      'wishlists',
      'unique_user_id_product_id',
      'UNIQUE(user_id, product_id)'
    );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    // Menghapus constraint foreign key terlebih dahulu
    pgm.dropConstraint('wishlists', 'fk_wishlists_product_id');
    pgm.dropConstraint('wishlists', 'fk_wishlists_user_id');
    
    pgm.dropConstraint('wishlists', 'unique_user_id_product_id');

    // Menghapus tabel wishlists
    pgm.dropTable('wishlists');
};
