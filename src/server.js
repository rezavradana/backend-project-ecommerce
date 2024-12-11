const Hapi = require("@hapi/hapi");

// Products
const products = require('./api/products');
const ProductService = require('./services/postgres/ProductsService');

const init = async () => {
	const productsService = new ProductService();

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
	])

    await server.start();
	console.log(`Server berjalan pada ${server.info.uri}`);
};

init();