const InvariantError = require("../../exceptions/InvariantError");
const { UserPayloadSchema } = require("./schema");

const UsersValidator = {
     validateUserPayload: (payload) => {
          const validationUserResult = UserPayloadSchema.validate(payload);
               if (validationUserResult.error) {
                    throw new InvariantError(validationUserResult.error.message);
               }
     },
};

module.exports = UsersValidator;
