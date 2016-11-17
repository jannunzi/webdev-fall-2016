(function(){
    angular
        .module("TodoApp")
        .factory("TodoService", TodoService);

    function TodoService($http) {
        var api = {
            createTodo: createTodo,
            getAllTodos: getAllTodos,
            getTodoById: getTodoById,
            updateTodo: updateTodo,
            reorderTodo: reorderTodo,
            deleteTodo: deleteTodo
        };
        return api;

        function createTodo(todo) {
            var url = "/api/sandbox/todo";
            return $http.post(url, todo);
        }
        function getAllTodos() {
            var url = "/api/sandbox/todo";
            return $http.get(url);
        }
        function getTodoById(tid) {
            var url = "/api/sandbox/todo/" + tid;
            return $http.get(url);
        }
        function updateTodo(tid, todo) {
            var url = "/api/sandbox/todo/" + tid;
            return $http.put(url, todo);
        }
        function reorderTodo(startIndex, endIndex) {
            var url = "/api/sandbox/todo?start=START&end=END";
            url = url
                .replace("START", startIndex)
                .replace("END", endIndex);
            return $http.put(url);
        }
        function deleteTodo(tid) {
            var url = "/api/sandbox/todo/" + tid;
            return $http.delete(url);
        }
    }
})();