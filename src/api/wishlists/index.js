const WishlistHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'wishlists',
  version: '1.0.0',
  register: async (server, { service }) => {
    const wishlistsHandler = new WishlistHandler(service);
    server.route(routes(wishlistsHandler));
  },
};
