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
        method: 'GET',
        path: '/wishlist',
        handler: handler.getWishlistHandler,
        options: {
            auth: 'ecommerce_jwt',
        },
    },
    {
        method: 'GET',
        path: '/check-wishlist/{productId}',
        handler: handler.checkWishlistByIdHandler,
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