module.exports = function () {
    var model = null;
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModelSandbox", UserSchema);
    var api = {
        empty: empty,
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        setModel: setModel,
        UserModel: UserModel
    };
    return api;
    function setModel(_model) {
        model = _model;
    }
    function empty() {
        return UserModel.remove({});
    }
    function findUserByUsername(username) {
        return UserModel
            .findOne({username: username})
            // .populate('websites', 'name')
            // .exec();
    }
    function createUser(user) {
        return UserModel.create(user);
    }
};