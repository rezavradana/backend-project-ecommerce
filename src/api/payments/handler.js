const autoBind = require("auto-bind");

class PaymentHandler {
    constructor(service) {
      this._service = service;

      autoBind(this);
    }

    async processPayment(request, h) {
        try {
            
            const { orderId, amount, itemsArray, customer } = request.payload;
            const resultPayment = await this._service.createPayment({ orderId, amount, itemsArray, customer });
            
            const response = h.response({
                status: 'success',
                data: {
                    resultPayment,
                },
           });
    
           response.code(201);
           return response;
        } catch (error) {
            console.log(error.message);
        }
    }

    async getPaymentStatus(request, h) {
        const orderId = request.params.orderId;
        
        const statusPayment = await this._service.getPaymentStatus(orderId);
        
        const response = h.response({
            status: 'success',
            data: {
                statusPayment,
            },
       });

       response.code(200);
       return response;
    }
}
  
module.exports = PaymentHandler;
  