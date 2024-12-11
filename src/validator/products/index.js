const InvariantError = require('../../exceptions/InvariantError');
const { ProductPayloadSchema } = require('./schema');

const ProductsValidator = {
  validateProductPayload: (payload) => {
    const validationResult = ProductPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ProductsValidator;
