module.exports = function () {
    var mongoose = require('mongoose');
    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.Object, ref: 'UserModelSandbox'},
        name: String,
        pages: [{type: mongoose.Schema.Types.Object, ref: 'PageModelSandbox'}]
    }, {collection: 'sandbox.website'});
    return WebsiteSchema;
};