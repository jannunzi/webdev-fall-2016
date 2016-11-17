(function () {
    angular
        .module("TodoApp")
        .factory("TodoService", TodoService)
    function TodoService($http) {

        var api = {
            getAllTodos: getAllTodos,
            sort: sort
        };
        return api;

        function sort(start, end) {
            var url = "/api/experiments/todo?start=START&end=END";
            url = url
                .replace("START", start)
                .replace("END", end);
            $http.put(url);
        }

        function getAllTodos() {
            var url = "/api/experiments/todo";
            return $http.get(url);
        }
    }
})();