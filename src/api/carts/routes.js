const routes = (handler) => [
    {
        method: 'POST',
        path: '/cart',
        handler: handler.postCartHandler,
        options: {
            auth: 'ecommerce_jwt',
        },
    },
    {
        method: 'GET',
        path: '/cart',
        handler: handler.getCartHandler,
        options: {
            auth: 'ecommerce_jwt',
        },
    },
    {
        method: 'PUT',
        path: '/cart',
        handler: handler.updateItemQuantityInCartHandler,
        options: {
            auth: 'ecommerce_jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/cart',
        handler: handler.deleteCartHandler,
        options: {
            auth: 'ecommerce_jwt',
        },
    },
  ];
  
module.exports = routes;