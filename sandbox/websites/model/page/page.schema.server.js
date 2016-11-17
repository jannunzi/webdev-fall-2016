module.exports = function () {
    var mongoose = require('mongoose');
    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.Object, ref: 'WebsiteModelSandbox'},
        name: String
    }, {collection: 'sandbox.page'});
    return PageSchema;
};
