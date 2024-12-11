const routes = (handler) => [
    {
        method: 'POST',
        path: '/wishlists',
        handler: handler.postWishlistHandler,
    },
    {
        method: 'DELETE',
        path: '/wishlists',
        handler: handler.deleteWishlistHandler,
    },
  ];
  
module.exports = routes;