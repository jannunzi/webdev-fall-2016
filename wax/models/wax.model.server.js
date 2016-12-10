module.exports = function () {

    var mongojs = require('mongojs');
    var db = null;

    var q = require('q');

    var application = null;

    var api = {
        findApplicationByName: findApplicationByName,
        findAll: findAll,
        findById: findById,
        create: create,
        update: update,
        remove: remove,
        setMap: setMap,
        getMap: getMap
    };
    return api;

    function setMap(entityName, entityId, relatedEntityName, relatedEntityIds) {
        var deferred = q.defer();
        var promises = [];
        removeMap(entityName, relatedEntityName)
            .then(function(){
                for(var id in relatedEntityIds) {
                    var relatedEntityId = relatedEntityIds[id];
                    var promise = insertMap(entityName, entityId, relatedEntityName, relatedEntityId);
                    promises.push(promise);
                }
                q.all(promises)
                    .then(function(relations){
                        console.log(relations)
                        deferred.resolve(relations);
                    }, function(err){
                        console.log(err);
                    });
            });
        return deferred.promise;
    }

    function removeMap(entityName, relatedEntityName) {
        var deferred = q.defer();

        var parent = entityName;
        var child = relatedEntityName;
        if(application.entities[entityName].relations[relatedEntityName].role == "parent") {
            parent = relatedEntityName;
            child = entityName;
        }

        var collection = db.collection(parent + "_2_" + child);
        collection.remove({}, function(err, status){
            deferred.resolve(status);
        });

        return deferred.promise;
    }

    function insertMap(entityName, entityId, relatedEntityName, relatedEntityId) {
        var deferred = q.defer();

        var parent = entityName;
        var child = relatedEntityName;
        var query = {parent: entityId, child: relatedEntityId};
        if(application.entities[entityName].relations[relatedEntityName].role == "parent") {
            parent = relatedEntityName;
            child = entityName;
            query = {parent: relatedEntityId, child: entityId};
        }

        var collection = db.collection(parent + "_2_" + child);
        collection.findOne(query,
            function(err, relation){
                if(!relation) {
                    collection.insert(query,
                        function(err, relation){
                            deferred.resolve(relation);
                        });
                } else {
                    deferred.resolve(relation);
                }
            });
        return deferred.promise;
    }

    function setMap2(entityName, entityId, relatedEntityName, relatedEntityIds) {
        var deferred = q.defer();
        var set = {$set: {}};
        set.$set[relatedEntityName] = relatedEntityIds;

        db[entityName].update({_id: mongojs.ObjectId(entityId)}, set,
            function(err, status){
                deferred.resolve(status);
            });
        return deferred.promise;
    }

    function getMap(entityName, entityId, relatedEntityName) {
        var deferred = q.defer();

        var parent = entityName;
        var child = relatedEntityName;
        var query = {parent: entityId};
        var other = "child";
        if(application.entities[entityName].relations[relatedEntityName].role == "parent") {
            parent = relatedEntityName;
            child = entityName;
            query = {child: entityId};
            other = "parent";
        }

        var collection = db.collection(parent + "_2_" + child);
        collection.find(query,
            function(err, relations){
                var promises = [];
                for(var r in relations) {
                    var relation = relations[r];
                    var relatedEntityId = relation[other];
                    var promise = findById(relatedEntityName, relatedEntityId);
                    promises.push(promise);
                }
                q.all(promises)
                    .then(function(relatedEntityInstances){
                        console.log(relatedEntityInstances)
                        deferred.resolve(relatedEntityInstances);
                    }, function(err){
                        console.log(err);
                    });
            });
        return deferred.promise;
    }

    function getMap2(entityName, entityId, relatedEntityName) {
        var deferred = q.defer();
        db[entityName].findOne({_id: mongojs.ObjectId(entityId)},
            function(err, entityInstance){
                var relatedEntityInstanceIds = entityInstance[relatedEntityName];
                var promises = [];
                // var relatedEntityInstances = [];
                if(relatedEntityInstanceIds) {
                    for(var i in relatedEntityInstanceIds) {
                        var relatedEntityInstanceId = relatedEntityInstanceIds[i];
                        var promise = findById(relatedEntityName, relatedEntityInstanceId);
                        promises.push(promise);
                    }
                }
                q.all(promises)
                    .then(function(relatedEntityInstances){
                        console.log(relatedEntityInstances)
                        deferred.resolve(relatedEntityInstances);
                    }, function(err){
                        console.log(err);
                    });
            });
        return deferred.promise;
    }

    function remove(entityName, entityId) {
        var deferred = q.defer();
        db[entityName].remove({_id: mongojs.ObjectId(entityId)},
            function(err, status){
                deferred.resolve(status);
            });
        return deferred.promise;
    }

    function update(entityName, entityId, instance) {
        var deferred = q.defer();
        delete instance._id;
        db[entityName].update({_id: mongojs.ObjectId(entityId)}, {$set: instance},
            function(err, status){
                deferred.resolve(status);
            });
        return deferred.promise;
    }

    function create(entityName, instance) {
        var deferred = q.defer();
        db[entityName].insert(instance,
            function(err, doc){
                deferred.resolve(doc);
            });
        return deferred.promise;
    }

    function findById(entityName, entityId) {
        var deferred = q.defer();
        db[entityName].findOne({_id: mongojs.ObjectId(entityId)},
            function(err, doc){
                deferred.resolve(doc);
        });
        return deferred.promise;
    }

    function findAll(entityName) {
        var deferred = q.defer();
        db[entityName].find(function(err, docs){
            deferred.resolve(docs);
        });
        return deferred.promise;
    }

    function findApplicationByName(applicationName) {
        if(db == null) {
            application = require("./"+applicationName+".json");
            var connectionString = "wax_" + applicationName;
            var collections = [];
            for(var c in application.entities) {
                collections.push(application.entities[c].name + "");
            }
            db = mongojs(connectionString, collections);
        }
        return application;
    }
};