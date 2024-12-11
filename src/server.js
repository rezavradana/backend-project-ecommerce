require('dotenv').config();
const Hapi = require("@hapi/hapi");

// Products
const products = require('./api/products');
const ProductsService = require('./services/postgres/ProductsService');
const ProductsValidator = require('./validator/products');

// Wishlists
const wishlists = require('./api/wishlists');
const WishlistsService = require('./services/postgres/WishlistsService')

const init = async () => {
	const productsService = new ProductsService();
	const wishlistsService = new WishlistsService();

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
			  validator: ProductsValidator,
			},
		},
		{
			plugin: wishlists,
			options: {
			  service: wishlistsService,
			},
		},
	])

    await server.start();
	console.log(`Server berjalan pada ${server.info.uri}`);
};

init();