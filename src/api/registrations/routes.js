const routes = (handler) => [
     {
          method: "POST",
          path: "/register",
          handler: handler.postUserHandler,
     },
];

module.exports = routes;
