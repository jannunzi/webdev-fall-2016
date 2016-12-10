module.exports = function (app, model, applicationName) {

    var application = model.findAppByName(applicationName);
    for(var e in application.entities) {
        app.get("/sandbox/wax/:applicationName/entity/:entityName/list.html", entityListController);
        app.get("/sandbox/wax/:applicationName/entity/:entityName/details.html", entityDetailsController);
    }

    function entityListController(req, res) {
        var entityName = req.params.entityName;
        res.render("sandbox/wax/entity/list.ejs", application);
    }

    function entityDetailsController(req, res) {
        var entityName = req.params.entityName;
        res.render("sandbox/wax/entity/details.ejs", application);
    }
};