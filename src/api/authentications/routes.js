const routes = (handler) => [
	{
		method: "POST",
		path: "/login",
		handler: handler.postLoginHandler,
	},
     {
          method: "PUT",
          path: "/authentications",
          handler: handler.putAuthenticationHandler,
     },
     {
          method: "DELETE",
          path: "/authentications",
          handler: handler.deleteAuthenticationHandler,
     },
];

module.exports = routes;
