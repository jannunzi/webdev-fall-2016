module.exports = function (app) {
    var model = require("./model/form.model.server")();
    var controller = require("./controllers/form.controller.server")(app, model);
};