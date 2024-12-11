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
    // Membuat tabel cart
    pgm.createTable('cart', {
        id: {
            type: 'varchar(50)',
            primaryKey: true,
        },
        user_id: {
            type: 'varchar(50)',
            notNull: true,
        },
        product_id: {
            type: 'varchar(50)',
            notNull: true,
        },
        quantity: {
            type: 'integer',
            notNull: true,
        },
        created_at: {
            type: 'text',
            notNull: true,
        },
    });

    // Menambahkan constraint FK untuk user_id
    pgm.addConstraint(
        'cart',
        'fk_cart_user_id',
        'FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE'
    );

    // Menambahkan constraint FK untuk product_id
    pgm.addConstraint(
        'cart',
        'fk_cart_product_id',
        'FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE'
    );

    // Menambahkan constraint UNIQUE untuk mencegah duplikasi item
    pgm.addConstraint(
        'cart',
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
    // Menghapus constraint
    pgm.dropConstraint('cart', 'unique_user_id_product_id');
    pgm.dropConstraint('cart', 'fk_cart_user_id');
    pgm.dropConstraint('cart', 'fk_cart_product_id');

    // Menghapus tabel
    pgm.dropTable('cart');
};
