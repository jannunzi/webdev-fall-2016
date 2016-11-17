module.exports = function(app) {
    app.get("/api/experiments/todo", getAllTodos);
    app.put("/api/experiments/todo", updateTodos);

    var todos = [
        {_id: 123, title: 'Todo 123'},
        {_id: 234, title: 'Todo 234'},
        {_id: 345, title: 'Todo 345'},
        {_id: 456, title: 'Todo 456'},
        {_id: 567, title: 'Todo 567'}
    ];

    function updateTodos(req, res) {
        var start = req.query.start;
        var end   = req.query.end;
        todos.splice(end, 0, todos.splice(start, 1)[0]);
    }

    function getAllTodos(req, res) {
        res.json(todos);
    }
};