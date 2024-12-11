const Hapi = require("@hapi/hapi");

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