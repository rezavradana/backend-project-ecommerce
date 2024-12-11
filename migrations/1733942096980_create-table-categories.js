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
    pgm.createTable('categories', {
        id: {
          type: 'varchar(50)',
          primaryKey: true,
        },
        name: {
          type: 'varchar(255)',
          notNull: true,
        },
        description: {
          type: 'text',
          notNull: false,
        },
        created_at: {
          type: 'text',
          notNull: true,
        },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('categories');
};
