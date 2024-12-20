const autoBind = require("auto-bind");

class UsersHandler {
     constructor(service, validator) {
          this._service = service;
          this._validator = validator;

          autoBind(this);
     }

     async postRegistrationHandler(request, h) {
          this._validator.validateUserPayload(request.payload);

          const { username, email, password } = request.payload;
          const userId = await this._service.addUser({ username, email, password });

          const response = h.response({
               status: "success",
               message: "Akun berhasil dibuat",
               data: {
                    userId,
               },
          });

          response.code(201);
          return response;
     }

     async getUserByIdHandler(request) {
          const { id: userId } = request.auth.credentials;
          const user = await this._service.getUserById(userId);

          return {
               status: "success",
               data: {
                    user,
               },
          };
     }
}

module.exports = UsersHandler;
