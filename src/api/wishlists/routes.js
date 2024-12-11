const routes = (handler) => [
    {
        method: 'POST',
        path: '/wishlist',
        handler: handler.postWishlistHandler,
    },
    {
        method: 'DELETE',
        path: '/wishlist',
        handler: handler.deleteWishlistHandler,
    },
  ];
  
module.exports = routes;