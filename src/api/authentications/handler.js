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

          // ? Validasi Email dan Password
          const id = await this._usersService.verifyUserCredential(email, password);
               if (!user) {
                    return h.response({
					status: "fail",
					message: "Email atau Password salah!!",
				}).code(400); 
               }

		// ? Membuat Token JWT
		const accessToken = this._tokenManager.generateAccessToken({ id });
               return {
                    status: "success",
                    message: "Login berhasil",
                    data: {
                         accessToken,
                         refreshToken,
                    },
		};
	}

     async putAuthenticationHandler(request, h) {
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
          const { refreshToken } = request.payload;

          await this._authenticationsService.deleteRefreshToken(refreshToken);

               return h.response({
                    status: "success",
                    message: "Refresh token dihapus",
               }).code(200);
     }
}

module.exports = AuthenticationsHandler;
