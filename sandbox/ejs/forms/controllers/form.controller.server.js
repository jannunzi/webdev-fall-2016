module.exports = function (app, model) {
    app.post("/sandbox/ejs/form", postForm);
    app.get("/sandbox/ejs/form", findAllForms);
    app.get("/sandbox/ejs/form/:formId/edit", findFormById);
    app.get("/sandbox/ejs/form/:formId/delete", deleteForm);

    function postForm(req, res) {
        if(req.body.action == "create") {
            createForm(req, res);
        } else if(req.body.action == "update") {
            updateForm(req, res);
        }
    }

    function updateForm(req, res) {
        model.updateForm(req.body);
        res.redirect("/sandbox/ejs/form");
    }

    function createForm(req, res) {
        model.createForm(req.body);
        res.redirect("/sandbox/ejs/form");
    }

    function deleteForm(req, res) {
        model.deleteForm(req.params.formId);
        // var data = {
        //     forms : model.findAllForms()
        // };
        // res.render("sandbox/ejs/forms/form-list.view.server.ejs", data);
        res.redirect("/sandbox/ejs/form");
    }

    function findFormById(req, res) {
        var data = {
            forms : model.findAllForms(),
            form : model.findFormById(req.params.formId)
        };
        res.render("sandbox/ejs/forms/form-list.view.server.ejs", data);
    }

    function findAllForms(req, res) {
        var data = {
            forms : model.findAllForms()
        };
        res.render("sandbox/ejs/forms/form-list.view.server.ejs", data);
    }
};