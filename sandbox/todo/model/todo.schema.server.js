module.exports = function () {
    var mongoose = require('mongoose');
    var TodoSchema = mongoose.Schema({
        title: String,
        created: {type: Date, default: Date.now}
    },  {collection: 'todo123'});
    return TodoSchema;
};