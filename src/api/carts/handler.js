const autoBind = require('auto-bind');

class CartHandler {
    constructor(service) {
        this._service = service;
    
        autoBind(this);
    }

    async postCartHandler(request, h) {
        const { id: userId } = request.auth.credentials;
        
        const cartId = await this._service.addItemToCart(userId, request.payload);

        const response = h.response({
            status: 'success',
            data: {
              cartId,
            },
        });
      
        response.code(201);
        return response;
    }

    async getCartHandler(request, h) {
        const { id: userId } = request.auth.credentials;
        
        const carts = await this._service.getCart(userId);

        const response = h.response({
            status: 'success',
            data: {
              carts,
            },
        });
      
        response.code(200);
        return response;
    }

    async updateItemQuantityInCartHandler(request, h) {
        const { id: userId } = request.auth.credentials;
        
        await this._service.updateItemQuantity(userId, request.payload);

        return {
            status: 'success',
            message: 'Item di keranjang berhasil diperbarui',
        };
    }

    async deleteCartHandler(request, h) {
        const { id: userId } = request.auth.credentials;
        
        await this._service.deleteItemInCart(userId, request.payload);

        return {
          status: 'success',
          message: 'Item di keranjang berhasil dihapus',
        };
    }
}

module.exports = CartHandler;