const Joi = require("joi");

const UserPayloadSchema = Joi.object({
     username: Joi.string().required(),
     email: Joi.string().required(),
     password: Joi.string().required(),
});

module.exports = { UserPayloadSchema };
