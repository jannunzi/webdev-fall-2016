module.exports = function (app, model) {
    app.get("/sandbox/wax/:applicationName", index);
    app.get("/sandbox/wax/:applicationName/index.html", index);

    var entityController = null;

    function index(req, res) {
        var data = model.findAppByName(req.params.applicationName);
        if(entityController == null) {
            entityController = require("./entity.controller.server")(app, model, req.params.applicationName);
        }
        res.render("sandbox/wax/index.ejs", data);
    }
};