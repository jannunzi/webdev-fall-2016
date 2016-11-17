var q = require('q');

module.exports = function () {
    var mongoose = require('mongoose');
    var TodoSchema = require('./todo.schema.server.js')();
    var TodoModel  = mongoose.model('TodoModel', TodoSchema);
    var api = {
        createTodo: createTodo,
        getAllTodos: getAllTodos
    };
    return api;
    
    function getAllTodos() {
        return TodoModel.find().exec();
    }

    function createTodo(todo) {
        return TodoModel.create(todo);
    }
};