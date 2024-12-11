const AuthenticationsHandler = require("./handler");
const routes = require("./routes");

module.exports = {
     name: "authentications",
     version: "1.0.0",
     register: async (Server, {
          authenticationsService,
          usersService,
          tokenManager,
          validator,
     }) => {
          const authenticationsHandler = new AuthenticationsHandler(
               authenticationsService,
               usersService,
               tokenManager,
               validator,
          );

          Server.route(routes(authenticationsHandler));
     },
};
