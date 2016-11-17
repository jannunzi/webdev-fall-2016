module.exports = function () {
    var mongoose = require("mongoose");
    var model = null;
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModelSandbox", WebsiteSchema);
    var api = {
        empty: empty,
        createWebsite: createWebsite,
        findWebsiteByName: findWebsiteByName,
        addWebsiteToUser: addWebsiteToUser,
        removeWebsite: removeWebsite,
        setModel: setModel,
        WebsiteModel: WebsiteModel
    };
    return api;

    function empty() {
        return WebsiteModel.remove({});
    }
    function setModel(_model) {
        model = _model;
    }
    function removeWebsite(websiteName) {
        var website = null;
        var websiteId = null;
        // return WebsiteModel.remove({name: websiteName});
        return findWebsiteByName(websiteName)
            .then(function(result){
                website = result;
                console.log(website);
                websiteId = website._id;
                website.remove();
                return model.userModel.findUserByUsername(website._user.username);
            })
            .then(function(user){
                var index = user.websites.indexOf(websiteId);
                user.websites.splice(index, 1);
                return user.save();
            });
    }
    function addWebsiteToUser(websiteName, username) {
        var website = null;
        return findWebsiteByName(websiteName)
            .then(
                function (result) {
                    website = result;
                    return model.userModel.findUserByUsername(username);
                }
            )
            .then(
                function (result) {
                    var user = result;
                    website._user = user._id;
                    website.save();
                    user.websites.push(website);
                    return user.save();
                }
            );
    }
    function createWebsite(website) {
        return WebsiteModel.create(website);
    }
    function findWebsiteByName(name) {
        return WebsiteModel
            .findOne({name: name})
            .populate('_user', 'username')
            .exec();
    }
};