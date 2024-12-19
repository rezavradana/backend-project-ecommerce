const routes = (handler) => [
    {
        method: 'POST',
        path: '/payments',
        handler: handler.processPayment,
    },
    {
        method: 'GET',
        path: '/payments/{orderId}',
        handler: handler.getPaymentStatus
    }
];
  
module.exports = routes;