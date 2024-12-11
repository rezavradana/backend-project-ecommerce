require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const Inert = require("@hapi/inert");

// ? Products
const products = require('./api/products');
const ProductService = require('./services/postgres/ProductsService');

// ? Users
const users = require("./api/users");
const UsersService = require("./services/postgres/UsersServices");
const UsersValidator = require("./validator/users");

// ? Authentications
const authentications = require("./api/authentications");
const AuthenticationsService = require("./services/postgres/AuthenticationsServices");
const TokenManager = require("./tokenize/TokenManager");
const AuthenticationsValidator = require("./validator/authentications");

const init = async () => {
	const productsService = new ProductService();
	const usersService = new UsersService();
	const authenticationsService = new AuthenticationsService();

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
				validator: UsersValidator,
			},
		},
		{
			plugin: authentications,
			options: {
				authenticationsService,
				usersService,
				tokenManager: TokenManager,
				validator: AuthenticationsValidator,
			},
		},
	])

	await server.start();
	console.log(`Server berjalan pada ${server.info.uri}`);
};

init();