const CartHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'carts',
  version: '1.0.0',
  register: async (server, { service }) => {
    const cartHandler = new CartHandler(service);
    server.route(routes(cartHandler));
  },
};
