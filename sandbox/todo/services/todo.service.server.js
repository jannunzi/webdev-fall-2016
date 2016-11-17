module.exports = function(app) {

    app.post("/api/sandbox/todo", createTodo);
    app.get("/api/sandbox/todo", getAllTodos);
    app.get("/api/sandbox/todo/:tid", getTodoById);
    app.put("/api/sandbox/todo", reorderTodo);
    app.put("/api/sandbox/todo/:tid", updateTodo);
    app.delete("/api/sandbox/todo/:tid", deleteTodo);

    // var todos = [
    //     {_id: 123, title: 'Todo 123', status: "PROGRESS"},
    //     {_id: 234, title: 'Todo 234', status: "PROGRESS"},
    //     {_id: 345, title: 'Todo 345', status: "COMPLETED"},
    //     {_id: 456, title: 'Todo 456', status: "PROGRESS"},
    //     {_id: 567, title: 'Todo 567', status: "COMPLETED"}
    // ];

    // var model = require('../model/todo.model.server')();
    var mongoose = require('mongoose');
    var TodoSchema = mongoose.Schema({
        title: String,
        created: {type: Date, default: Date.now}
    },  {collection: 'todo123'});
    var TodoModel  = mongoose.model('TodoModel', TodoSchema);

    function createTodo(req, res) {
        var todo = req.body;

        TodoModel
            .create(todo)
            .then(
                function (todoObj) {
                    req.json(todoObj);
                },
                function (err) {
                    req.json(err);
                }
            );

        // todos.push(todo);
        // model
        //     .createTodo(todo)
        //     .then(
        //         function (todo) {
        //             res.json(todo);
        //         },
        //         function (error) {
        //             res.sendStatus(404);
        //         }
        //     );
    }

    function getAllTodos(req, res) {
        // model
        //     .getAllTodos();
        TodoModel
            .find()
            .then(
                function (todos) {
                    res.json(todos);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
        // res.json(todos);
    }

    function reorderTodo(req, res) {
        var start = req.query.start;
        var end = req.query.end;
        if(start && end) {
            todos.splice(end, 0, todos.splice(start, 1)[0]);
        }
        res.sendStatus(200);
    }

    function updateTodo(req, res) {
        var todo = req.body;
        var tid = req.params.tid;
        var start = req.query.start;
        var end = req.query.end;
        if(start && end) {
            todos.splice(end, todos.splice(start, 1)[0]);
        }
        res.json(todos);
    }

    function getTodoById(req, res) {

    }

    function deleteTodo(req, res) {
        TodoModel
            .remove({_id: req.params.tid})
            .then(
                function (status) {
                    console.log(status);
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }
};