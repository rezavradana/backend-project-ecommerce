const autoBind = require("auto-bind");

class OrderHandler {
    constructor(service) {
      this._service = service;

      autoBind(this);
    }

    async createOrderHandler(request, h) {
        try {
            const { id: userId } = request.auth.credentials;
            const { totalAmount } = request.payload;

            const id = await this._service.createOrder(userId, totalAmount);
            const response = h.response({
                status: 'success',
                data: {
                    id,
                },
           });

           response.code(201);
           return response;
        } catch (error) {
            return h.response({ error: error.message }).code(500);
        }
    }

    async getOrderHandler(request, h) {
        try {
            const { id: userId } = request.auth.credentials;
            const order = await this._service.getOrderByUserId(userId);
            return h.response(order).code(200);
        } catch (error) {
            return h.response({ error: error.message }).code(404);
        }
    }

    async deleteOrderHandler(request, h) {
        try {
            const orderId = request.params.orderId;
            await this._service.cancelOrder(orderId);
            return h.response({ message: 'Order cancelled' }).code(200);
        } catch (error) {
            return h.response({ error: error.message }).code(500);
        }
    }

    async createOrderItemsHandler(request, h) {
        try {
            const { orderId, productId, quantity, pricePerItem, totalPrice } = request.payload;
            const order = await this._service.createOrderItems({ orderId, productId, quantity, pricePerItem, totalPrice });
            return h.response(order).code(201);
        } catch (error) {
            return h.response({ error: error.message }).code(500);
        }
    }

}
  
module.exports = OrderHandler;
  