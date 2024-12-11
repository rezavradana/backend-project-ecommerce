const autoBind = require('auto-bind');

class ProductsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    
        autoBind(this);
    }

    async postProductHandler(request, h) {
        this._validator.validateProductPayload(request.payload);

        const productId = await this._service.addProduct(request.payload);

        const response = h.response({
            status: 'success',
            data: {
              productId,
            },
        });
      
        response.code(201);
        return response;
    }

    async getProductsHandler(request, h) {
        const products = await this._service.getProducts();
        return {
          status: 'success',
          data: {
            products,
          },
        };
    }

    async getProductByIdHandler(request, h) {
        const { id } = request.params;
        const product = await this._service.getProductById(id);
        return {
          status: 'success',
          data: {
            product,
          },
        };
    }

    async putProductByIdHandler(request, h) {
        this._validator.validateProductPayload(request.payload);
        const { id } = request.params;
    
        await this._service.editProductById(id, request.payload);
    
        return {
          status: 'success',
          message: 'Product berhasil diperbarui',
        };
    }

    async deleteProductByIdHandler(request, h) {
        const { id } = request.params;
        await this._service.deleteProductById(id);
        return {
          status: 'success',
          message: 'Product berhasil dihapus',
        };
    }
}

module.exports = ProductsHandler;