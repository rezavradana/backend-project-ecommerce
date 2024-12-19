const routes = (handler) => [
     {
          method: "POST",
          path: "/registrations",
          handler: handler.postRegistrationHandler,
     },
     {
          method: "GET",
          path: "/users",
          handler: handler.getUserByIdHandler,
          options: {
               auth: 'ecommerce_jwt',
          },
     },
];

module.exports = routes;
