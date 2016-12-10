module.exports = function (app, model) {
    app.get("/sandbox/wax/:applicationName/config.js", config);

    function config(req, res) {
        var data = model.findAppByName(req.params.applicationName);
        res.render("sandbox/wax/config.ejs", data);
    }
};