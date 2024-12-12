const routes = (handler) => [
     {
          method: "POST",
          path: "/registrations",
          handler: handler.postRegistrationHandler,
     },
     {
          method: "GET",
          path: "/users/{id}",
          handler: handler.getUserByIdHandler,
     },
];

module.exports = routes;
