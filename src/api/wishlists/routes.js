const routes = (handler) => [
    {
        method: 'POST',
        path: '/wishlist',
        handler: handler.postWishlistHandler,
        options: {
            auth: 'ecommerce_jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/wishlist',
        handler: handler.deleteWishlistHandler,
        options: {
            auth: 'ecommerce_jwt',
        },
    },
  ];
  
module.exports = routes;