const routes = (handler) => [
    {
        method: 'POST',
        path: '/cart',
        handler: handler.postCartHandler,
    },
    {
        method: 'GET',
        path: '/cart',
        handler: handler.postCartHandler,
    },
    {
        method: 'PUT',
        path: '/cart',
        handler: handler.postCartHandler,
    },
    {
        method: 'DELETE',
        path: '/cart',
        handler: handler.deleteCartHandler,
    },
  ];
  
module.exports = routes;