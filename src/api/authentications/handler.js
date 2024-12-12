const autoBind = require("auto-bind");

class AuthenticationsHandler {
	constructor(
		authenticationsService,
		usersService,
		tokenManager,
		validator
	) {
		this._authenticationsService = authenticationsService;
		this._usersService = usersService;
		this._tokenManager = tokenManager;
		this._validator = validator;

		autoBind(this);
	}

	async postLoginHandler(request, h) {
		this._validator.validatePostAuthenticationPayload(request.payload);

		const { email, password } = request.payload;
          const id = await this._usersService.verifyUserCredential(email, password);

		const accessToken = this._tokenManager.generateAccessToken({ id });
          const refreshToken = this._tokenManager.generateRefreshToken({ id });
               await this._authenticationsService.addRefreshToken(refreshToken);

          const response = h.response({
               status: "success",
               message: "Authentication berhasil ditambahkan",
               data: {
                    accessToken,
                    refreshToken,
               },
          });
     
          response.code(201);
          return response;
	}

     async putAuthenticationHandler(request, h) {
          this._validator.validatePutAuthenticationPayload(request.payload);
          
          const { refreshToken } = request.payload;
               await this._authenticationsService.verifyRefreshToken(refreshToken);
          const { id } = this._tokenManager.verifyRefreshToken(refreshToken);

          const accessToken = this._tokenManager.generateAccessToken({ id });
               return h.response({
                    status: "success",
                    message: "Token diperbarui",
                    data: {
                         accessToken,
                    },
               }).code(200);
     }

     async deleteAuthenticationHandler(request, h) {
          this._validator.validateDeleteAuthenticationPayload(request.payload);
          const { refreshToken } = request.payload;

          await this._authenticationsService.deleteRefreshToken(refreshToken);
               return h.response({
                    status: "success",
                    message: "Refresh token dihapus",
               }).code(200);
     }
}

module.exports = AuthenticationsHandler;
