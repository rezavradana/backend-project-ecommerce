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
    pgm.createTable('orders', {
        id: {
            type: 'varchar(50)',
            primaryKey: true
        },
        user_id: {
            type: 'varchar(50)',
            notNull: true
        },
        order_date: {
            type: 'text',
            notNull: true,
        },
        total_amount: {
            type: 'numeric(10, 2)', // Assuming you want 2 decimal places for currency
            notNull: true
        },
    });

    pgm.addConstraint('orders', 'fk_orders_user', {
        foreignKeys: {
            columns: 'user_id',
            references: 'users(id)',
            onDelete: 'CASCADE'
        }
    });

    pgm.createTable('order_items', {
        id: {
            type: 'varchar(50)',
            primaryKey: true
        },
        order_id: {
            type: 'varchar(50)',
            notNull: true
        },
        product_id: {
            type: 'varchar(50)',
            notNull: true
        },
        quantity: {
            type: 'integer',
            notNull: true,
            default: 1
        },
        price_per_item: {
            type: 'numeric(10, 2)', // Assuming you want 2 decimal places for price
            notNull: true
        },
        total_price: {
            type: 'numeric(10, 2)', // Calculated field, you might want to update this with triggers in Postgres
            notNull: true
        }
    });

    pgm.addConstraint('order_items', 'fk_order_items_order', {
        foreignKeys: {
            columns: 'order_id',
            references: 'orders(id)',
            onDelete: 'CASCADE'
        }
    });

    pgm.addConstraint('order_items', 'fk_order_items_product', {
        foreignKeys: {
            columns: 'product_id',
            references: 'products(id)',
            onDelete: 'CASCADE'
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropConstraint('order_items', 'fk_order_items_product');
    pgm.dropConstraint('order_items', 'fk_order_items_order');
    pgm.dropTable('order_items');

    pgm.dropConstraint('orders', 'fk_orders_user');
    pgm.dropTable('orders');
};
