const autoBind = require("auto-bind");

class RegistrationsHandler {
     constructor(service, validator) {
          this._service = service;
          this._validator = validator;

          autoBind(this);
     }

     async postUserHandler(request, h) {
          this._validator.validateRegistrationPayload(request.payload);

          const { username, email, password } = request.payload;
          const userId = await this._service.addUser({ username, email, password });

          const response = h.response({
               status: "success",
               message: 'Akun berhasil dibuat',
               data: {
                    userId,
               },
          });

          response.code(201);
          return response;
     }
}

module.exports = RegistrationsHandler;
