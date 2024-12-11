require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const Inert = require("@hapi/inert");

// ? Products
const products = require('./api/products');
const ProductService = require('./services/postgres/ProductsService');

// ? Users
const UsersService = require("./services/postgres/UsersServices");

const init = async () => {
	const productsService = new ProductService();
	const usersService = new UsersService();

	const server = Hapi.server({
		port: process.env.PORT,
		host: process.env.HOST,
		routes: {
			cors: {
				origin: ["*"],
			},
		},
	});

     await server.register([
          {
               plugin: Jwt,
          },
          {
			plugin: Inert,
		},
     ]);

     server.auth.strategy("ecommerce_jwt", "jwt", {
		keys: process.env.ACCESS_TOKEN_KEY,
		verify: {
			aud: false,
			iss: false,
			sub: false,
			maxAgeSec: process.env.ACCESS_TOKEN_AGE,
		},
		validate: (artifacts) => ({
			isValid: true,
			credentials: {
				id: artifacts.decoded.payload.id,
			},
		}),
	});

	await server.register([
		{
			plugin: products,
			options: {
				service: productsService,
			},
		},
		{
			plugin: users,
			options: {
				service: usersService,
			},
		},
	])

	await server.start();
	console.log(`Server berjalan pada ${server.info.uri}`);
};

init();