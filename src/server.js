require('dotenv').config();
const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const Inert = require("@hapi/inert");
const ClientError = require('./exceptions/ClientError');

// ? Users
const users = require("./api/users");
const UsersService = require("./services/postgres/UsersServices");
const UsersValidator = require("./validator/users");

// ? Authentications
const authentications = require("./api/authentications");
const AuthenticationsService = require("./services/postgres/AuthenticationsServices");
const TokenManager = require("./tokenize/TokenManager");
const AuthenticationsValidator = require("./validator/authentications");

// ? Products
const products = require('./api/products');
const ProductsService = require('./services/postgres/ProductsService');
const ProductsValidator = require('./validator/products');

// ? Wishlists
const wishlists = require('./api/wishlists');
const WishlistsService = require('./services/postgres/WishlistsService')

// ? Carts
const carts = require('./api/carts');
const CartsService = require('./services/postgres/CartsService');

// ? Categories
const categories = require('./api/categories');
const CategoriesService = require('./services/postgres/CategoriesService');

const init = async () => {
	const usersService = new UsersService();
	const authenticationsService = new AuthenticationsService();
	const productsService = new ProductsService();
	const wishlistsService = new WishlistsService();
	const cartsService = new CartsService();
	const categoriesService = new CategoriesService();

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
		{
			plugin: products,
			options: {
				service: productsService,
				validator: ProductsValidator,
			},
		},
		{
			plugin: wishlists,
			options: {
				service: wishlistsService,
			},
		},
		{
			plugin: carts,
			options: {
				service: cartsService,
			},
		},
		{
			plugin: categories,
			options: {
				service: categoriesService,
			},
		},
	])

	server.ext('onPreResponse', (request, h) => {
		// mendapatkan konteks response dari request
		const { response } = request;
	
		// penanganan client error secara internal.
		if (response instanceof ClientError) {
		  const newResponse = h.response({
			status: 'fail',
			message: response.message,
		  });
		  newResponse.code(response.statusCode);
		  return newResponse;
		}
	
		return h.continue;
	});

	await server.start();
	console.log(`Server berjalan pada ${server.info.uri}`);
};

init();