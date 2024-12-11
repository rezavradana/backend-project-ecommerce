const RegistrationsHandler = require("./handler");
const routes = require("./routes");

module.exports = {
     name: "register",
     version: "1.0.0",
     register: async (server, { service, validator  }) => {
          const registrationsHandler = new RegistrationsHandler(service, validator);
          server.route(routes(registrationsHandler));
     },
};
