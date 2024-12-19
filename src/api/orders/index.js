const OrderHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'orders',
  version: '1.0.0',
  register: async (server, { service }) => {
    const ordersHandler = new OrderHandler(service);
    server.route(routes(ordersHandler));
  },
};
