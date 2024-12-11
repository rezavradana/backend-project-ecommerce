const {
     PostAuthenticationPayloadSchema,
     PutAuthenticationPayloadSchema,
     DeleteAuthenticationPayloadSchema,
} = require("./schema");
const InvariantError = require("../../exceptions/InvariantError");

const AuthenticationsValidator = {
     validatePostAuthenticationPayload: (payload) => {
          const validationAuthenticationResult = PostAuthenticationPayloadSchema.validate(payload);
               if (validationAuthenticationResult.error) {
                    throw new InvariantError(validationAuthenticationResult.error.message);
               }
     },

     validatePutAuthenticationPayload: (payload) => {
          const validationAuthenticationResult = PutAuthenticationPayloadSchema.validate(payload);
               if (validationAuthenticationResult.error) {
                    throw new InvariantError(validationAuthenticationResult.error.message);
               }
     },

     validateDeleteAuthenticationPayload: (payload) => {
          const validationAuthenticationResult = DeleteAuthenticationPayloadSchema.validate(payload);
               if (validationAuthenticationResult.error) {
                    throw new InvariantError(validationAuthenticationResult.error.message);
               }
     },
};

module.exports = AuthenticationsValidator;
