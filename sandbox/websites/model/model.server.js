module.exports = function () {
    var model = {};
    var userModel = require('./user/user.model.server')();
    var websiteModel = require('./website/website.model.server')();
    model = {
        userModel: userModel,
        websiteModel: websiteModel
    };
    userModel.setModel(model);
    websiteModel.setModel(model);
    return model;
};