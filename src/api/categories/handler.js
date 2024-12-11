const autoBind = require("auto-bind");

class CategoriesHandler {
    constructor(service) {
      this._service = service;

      autoBind(this);
    }
  
    async postCategoryHandler(request, h) {
      const { name, description } = request.payload;
  
      const categoryId = await this._service.addCategory({ name, description });

      const response = h.response({
            status: 'success',
            data: {
                categoryId,
            },
       });
  
       response.code(201);
       return response;
    }
  
    async getCategoriesHandler() {
      const categories = await this._service.getCategories();
      return {
        status: 'success',
        data: { categories },
      };
    }
  
    async getCategoryByIdHandler(request) {
      const { id } = request.params;
      const category = await this._service.getCategoryById(id);
  
      return {
        status: 'success',
        data: { category },
      };
    }
  
    async putCategoryByIdHandler(request) {
      const { id } = request.params;
      const { name, description } = request.payload;
  
      await this._service.updateCategoryById(id, { name, description });
  
      return {
        status: 'success',
        message: 'Kategori berhasil diperbarui',
      };
    }
  
    async deleteCategoryByIdHandler(request) {
      const { id } = request.params;
  
      await this._service.deleteCategoryById(id);
  
      return {
        status: 'success',
        message: 'Kategori berhasil dihapus',
      };
    }
  
    async postProductToCategoryHandler(request, h) {
      const { categoryId } = request.params;
      const { productId } = request.payload;
  
      const relationId = await this._service.addProductToCategory({ productId, categoryId });
  
      return h.response({
        status: 'success',
        message: 'Produk berhasil ditambahkan ke kategori',
        data: { relationId },
      }).code(201);
    }
  
    async getProductsByCategoryIdHandler(request) {
      const { categoryId } = request.params;
      const products = await this._service.getProductsByCategoryId(categoryId);
  
      return {
        status: 'success',
        data: { products },
      };
    }
}
  
  module.exports = CategoriesHandler;
  