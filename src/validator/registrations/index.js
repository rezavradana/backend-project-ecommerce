const InvariantError = require("../../exceptions/InvariantError");
const { RegistrationPayloadSchema } = require("./schema");

const RegistrationsValidator = {
     validateRegistrationPayload: (payload) => {
          const validationRegistrationResult = RegistrationPayloadSchema.validate(payload);
               if (validationRegistrationResult.error) {
                    throw new InvariantError(validationRegistrationResult.error.message);
               }
     },
};

module.exports = RegistrationsValidator;
