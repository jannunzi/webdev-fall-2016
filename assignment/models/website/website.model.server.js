module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);
    var api = {
        createWebsite: createWebsite,
        findWebsitesForUser: findWebsitesForUser,
        setModel: setModel
    };
    return api;
    function setModel(_model) {
        model = _model;
    }
    function findWebsitesForUser(userId) {
        return model.userModel.findWebsitesForUser(userId);
    }
    function createWebsite(userId, website) {
        return WebsiteModel
            .create(website)
            .then(function(websiteObj){
                model.userModel
                    .findUserById(userId)
                    .then(function(userObj){
                        userObj.websites.push(websiteObj);
                        websiteObj._user = userObj._id;
                        websiteObj.save();
                        return userObj.save();
                    }, function(error){
                        console.log(error);
                    });
            });
    }
};