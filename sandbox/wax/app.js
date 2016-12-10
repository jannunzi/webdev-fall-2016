module.exports = function (app) {
    var model = require("./models/model.server.js")();
    require("./controllers/index.controller.server.js")(app, model);
    require("./controllers/app.controller.server.js")(app, model);
    require("./controllers/config.controller.server.js")(app, model);
};