module.exports = function(app) {

    var model = require("./models/model.server")();

    require("./services/user.service.server.js")(app, model);
    require("./services/website.service.server.js")(app, model);
};