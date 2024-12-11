const Joi = require("joi");

const RegistrationPayloadSchema = Joi.object({
     username: Joi.string().required(),
     email: Joi.string().required(),
     password: Joi.string().required(),
});

module.exports = { RegistrationPayloadSchema };
