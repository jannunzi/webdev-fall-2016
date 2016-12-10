module.exports = function (app) {
    app.get("/wax/:applicationName/index.html", indexController);
    app.get("/wax/:applicationName", indexController);
    app.get("/wax/:applicationName/app.js", appController);
    app.get("/wax/:applicationName/config.js", configController);
    app.get("/wax/:applicationName/controllers/:entityName/list/:listController", listController);
    app.get("/wax/:applicationName/controllers/:entityName/details/:detailsController", detailsController);
    app.get("/wax/:applicationName/templates/:entityName/list/:listTemplate", listTemplate);
    app.get("/wax/:applicationName/templates/:entityName/details/:detailsTemplate", detailsTemplate);
    app.get("/wax/:applicationName/services/:entityName/:serviceJS", service);

    app.get("/wax/:applicationName/api/:entityName", findAll);
    app.get("/wax/:applicationName/api/:entityName/:entityId", findById);
    app.post("/wax/:applicationName/api/:entityName", insert);
    app.put("/wax/:applicationName/api/:entityName/:entityId", update);
    app.delete("/wax/:applicationName/api/:entityName/:entityId", remove);
    app.put("/wax/:applicationName/api/:entityName/:entityId/:relatedEntityName/map", setMap);
    app.get("/wax/:applicationName/api/:entityName/:entityId/:relatedEntityName/map", getMap);

    app.get("/wax/:applicationName/templates/:entityName/map/:relatedEntityName/:mapListTemplate", mapListTemplate)
    app.get("/wax/:applicationName/controllers/:entityName/map/:relatedEntityName/:mapListController", mapListController)

    var model = require("./models/wax.model.server")();

    function mapListController(req, res) {
        var applicationName = req.params.applicationName;
        var application = model.findApplicationByName(applicationName);
        var entityName = req.params.entityName;
        var entity = application.entities[entityName];
        var relatedEntityName = req.params.relatedEntityName;
        var relatedEntityNameCapitalized = capitalizeFirstLetter(relatedEntityName);
        var relatedEntity = entity.relations[relatedEntityName];
        var scope = {
            application: application,
            applicationName: applicationName,
            entity: entity,
            entityName: entityName,
            relatedEntityName: req.params.relatedEntityName,
            relatedEntityNameCapitalized: relatedEntityNameCapitalized,
            relatedEntity: entity.relations[relatedEntityName]
        };
        res.render("wax/mapListController", scope);
    }

    function mapListTemplate(req, res) {
        var applicationName = req.params.applicationName;
        var application = model.findApplicationByName(applicationName);
        var entityName = req.params.entityName;
        var entity = application.entities[entityName];
        var relatedEntityName = req.params.relatedEntityName;
        var relatedEntityNameCapitalized = capitalizeFirstLetter(relatedEntityName);
        var relatedEntity = entity.relations[relatedEntityName];
        var scope = {
            application: application,
            applicationName: applicationName,
            entity: entity,
            entityName: entityName,
            relatedEntityName: req.params.relatedEntityName,
            relatedEntityNameCapitalized: relatedEntityNameCapitalized,
            relatedEntity: entity.relations[relatedEntityName]
        };
        res.render("wax/mapListTemplate", scope);
    }

    function setMap(req, res) {
        var entityName = req.params.entityName;
        var entityId = req.params.entityId;
        var relatedEntityName = req.params.relatedEntityName;
        var relatedEntityIds = req.body;
        model
            .setMap(entityName, entityId, relatedEntityName, relatedEntityIds)
            .then(function(status){
                res.json(status);
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }

    function getMap(req, res) {
        var entityName = req.params.entityName;
        var entityId = req.params.entityId;
        var relatedEntityName = req.params.relatedEntityName;
        model
            .getMap(entityName, entityId, relatedEntityName)
            .then(function(relatedEntityInstances){
                res.json(relatedEntityInstances);
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }

    function remove(req, res) {
        var applicationName = req.params.applicationName;
        var entityName = req.params.entityName;
        var entityId = req.params.entityId;
        model
            .remove(entityName, entityId)
            .then(function(status){
                res.json(status);
            }, function (err) {
                res.sendStatus(400).send(err);
            });
    }

    function update(req, res) {
        var applicationName = req.params.applicationName;
        var entityName = req.params.entityName;
        var instance = req.body;
        var entityId = req.params.entityId;
        model
            .update(entityName, entityId, instance)
            .then(function(status){
                res.json(status);
            }, function (err) {
                res.sendStatus(400).send(err);
            })
    }

    function insert(req, res) {
        var applicationName = req.params.applicationName;
        var entityName = req.params.entityName;
        var instance = req.body;
        model
            .create(entityName, instance)
            .then(function(doc){
                res.json(doc);
            }, function (err) {
                res.sendStatus(400).send(err);
            })
    }

    function findById(req, res) {
        var applicationName = req.params.applicationName;
        var entityName = req.params.entityName;
        var entityId = req.params.entityId;
        model
            .findById(entityName, entityId)
            .then(function(doc){
                res.json(doc);
            }, function (err) {
                res.sendStatus(400).send(err);
            })
    }

    function findAll(req, res) {
        var applicationName = req.params.applicationName;
        var entityName = req.params.entityName;
        model
            .findAll(entityName)
            .then(function(docs){
                res.json(docs);
            }, function (err) {
                res.sendStatus(400).send(err);
            })
    }

    function service(req, res) {
        var applicationName = req.params.applicationName;
        var application = model.findApplicationByName(req.params.applicationName);
        var entityName = req.params.entityName;
        var entityNameCapitalized = capitalizeFirstLetter(entityName);

        var scope = {
            applicationName: applicationName,
            application: application,
            entityName: entityName,
            entityNameCapitalized: capitalizeFirstLetter(req.params.entityName),
            entity: application.entities[req.params.entityName],
            serviceJS: req.params.serviceJS
        };
        res.setHeader('content-type', 'text/javascript');
        res.render("wax/service.ejs", scope);
    }

    function listTemplate(req, res) {
        var application = model.findApplicationByName(req.params.applicationName);
        var scope = {
            applicationName: req.params.applicationName,
            entityName: req.params.entityName,
            entityNameCapitalized: capitalizeFirstLetter(req.params.entityName),
            entity: application.entities[req.params.entityName],
            listTemplate: req.params.listTemplate,
            application: application
        };
        res.setHeader('content-type', 'text/javascript');
        res.render("wax/listTemplate.ejs", scope);
    }

    function detailsTemplate(req, res) {
        var scope = {
            applicationName: req.params.applicationName,
            entityName: req.params.entityName,
            entityNameCapitalized: capitalizeFirstLetter(req.params.entityName),
            detailsTemplate: req.params.detailsTemplate,
            application: model.findApplicationByName(req.params.applicationName)
        };
        res.setHeader('content-type', 'text/javascript');
        res.render("wax/detailsTemplate.ejs", scope);
    }

    function detailsController(req, res) {
        var scope = {
            applicationName: req.params.applicationName,
            entityName: req.params.entityName,
            entityNameCapitalized: capitalizeFirstLetter(req.params.entityName),
            detailsController: req.params.detailsController,
            application: model.findApplicationByName(req.params.applicationName)
        };
        res.setHeader('content-type', 'text/javascript');
        res.render("wax/detailsController.ejs", scope);
    }

    function listController(req, res) {
        var scope = {
            applicationName: req.params.applicationName,
            entityName: req.params.entityName,
            entityNameCapitalized: capitalizeFirstLetter(req.params.entityName),
            listController: req.params.listController,
            application: model.findApplicationByName(req.params.applicationName)
        };
        res.setHeader('content-type', 'text/javascript');
        res.render("wax/listController.ejs", scope);
    }

    function appController(req, res) {
        var application = model.findApplicationByName(req.params.applicationName);
        res.setHeader('content-type', 'text/javascript');
        res.render("wax/app.ejs", application);
    }

    function configController(req, res) {
        var application = model.findApplicationByName(req.params.applicationName);
        res.setHeader('content-type', 'text/javascript');
        res.render("wax/config.ejs", application);
    }

    function indexController(req, res) {
        var application = model.findApplicationByName(req.params.applicationName);
        res.render("wax/index.ejs", application);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
};