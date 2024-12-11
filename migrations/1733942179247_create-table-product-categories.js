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
    pgm.createTable('product_categories', {
        id: {
          type: 'varchar(50)',
          primaryKey: true,
        },
        product_id: {
          type: 'varchar(50)',
          notNull: true,
        },
        category_id: {
          type: 'varchar(50)',
          notNull: true,
        },
    });

    // Menambahkan constraint foreign key pada product_categories
    pgm.addConstraint(
        'product_categories',
        'fk_product_categories_product_id',
        'FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE'
    );

    pgm.addConstraint(
        'product_categories',
        'fk_product_categories_category_id',
        'FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE'
    );

    // Menambahkan constraint unique untuk mencegah duplikasi pasangan product_id dan category_id
    pgm.addConstraint(
        'product_categories',
        'unique_product_id_category_id',
        'UNIQUE(product_id, category_id)'
    );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    // Menghapus constraint unique
    pgm.dropConstraint('product_categories', 'unique_product_id_category_id');

    // Menghapus constraint foreign key
    pgm.dropConstraint('product_categories', 'fk_product_categories_product_id');
    pgm.dropConstraint('product_categories', 'fk_product_categories_category_id');

    // Menghapus tabel product_categories
    pgm.dropTable('product_categories');
};
