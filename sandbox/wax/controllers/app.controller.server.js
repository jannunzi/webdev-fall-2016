module.exports = function (app, model) {
    app.get("/sandbox/wax/:applicationName/app.js", angularApp);

    function angularApp(req, res) {
        var data = model.findAppByName(req.params.applicationName);
        res.render("sandbox/wax/app.ejs", data);
    }
};