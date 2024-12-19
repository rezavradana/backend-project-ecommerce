const PaymentHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'payments',
  version: '1.0.0',
  register: async (server, { service }) => {
    const paymentsHandler = new PaymentHandler(service);
    server.route(routes(paymentsHandler));
  },
};
