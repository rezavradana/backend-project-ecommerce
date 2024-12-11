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
    pgm.createTable('products', {
        id: {
          type: 'varchar(50)',
          primaryKey: true
        },
        name: {
          type: 'varchar(255)', // Maximum 255 characters
          notNull: true
        },
        description: {
          type: 'text', // Allows longer text
          notNull: true
        },
        price: {
          type: 'numeric(10,2)', // Up to 10 digits with 2 decimal places
          notNull: true
        },
        stock: {
          type: 'integer', // Integer for stock quantity
          notNull: true,
          default: 0 // Default stock value
        },
        image_url: {
          type: 'varchar(255)', // Maximum 255 characters for URL
          notNull: true
        },
        created_at: {
          type: 'text',
          notNull: true,
        },
        updated_at: {
          type: 'text',
          notNull: true,
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('products'); // Drops the table if rollback is needed
};
