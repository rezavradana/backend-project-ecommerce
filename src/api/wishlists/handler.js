const autoBind = require('auto-bind');

class WishlistsHandler {
    constructor(service) {
        this._service = service;
    
        autoBind(this);
    }

    async postWishlistHandler(request, h) {
        const { productId } = request.payload;
        const { id: userId } = request.auth.credentials;

        await this._service.isProductInWishlist(userId, productId);
        
        const wishlistId = await this._service.addWishlist(userId, productId);

        const response = h.response({
            status: 'success',
            data: {
              wishlistId,
            },
        });
      
        response.code(201);
        return response;
    }

    async deleteWishlistHandler(request, h) {
        const { productId } = request.payload;
        const { id: userId } = request.auth.credentials;
        
        await this._service.deleteWishlist(userId, productId);

        return {
          status: 'success',
          message: 'Wishlist berhasil dihapus',
        };
    }
}

module.exports = WishlistsHandler;