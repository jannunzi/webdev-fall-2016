module.exports = function () {
    var mongoose = require('mongoose');
    var UserSchema = mongoose.Schema({
        username: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModelSandbox'}]
    }, {collection: 'sandbox.user'});
    return UserSchema;
};