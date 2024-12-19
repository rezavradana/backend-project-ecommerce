const routes = (handler) => [
    {
        method: 'POST',
        path: '/orders',
        handler: handler.createOrderHandler,
        options: {
            auth: 'ecommerce_jwt',
        },
    },
    {
        method: 'POST',
        path: '/orders-items',
        handler: handler.createOrderItemsHandler,
        options: {
            auth: 'ecommerce_jwt',
        },
    },
    {
        method: 'GET',
        path: '/orders/{orderId}',
        handler: handler.getOrderHandler,
        options: {
            auth: 'ecommerce_jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/orders/{orderId}',
        handler: handler.deleteOrderHandler,
        options: {
            auth: 'ecommerce_jwt',
        },
    }
];
  
module.exports = routes;