const CategoriesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'categories',
  version: '1.0.0',
  register: async (server, { service }) => {
    const categoriesHandler = new CategoriesHandler(service);
    server.route(routes(categoriesHandler));
  },
};
