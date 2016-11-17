(function(){
    angular
        .module("TodoApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/todo", {
                templateUrl: "views/todo/todo-list.view.client.html",
                controller: "TodoListController",
                controllerAs: "model"
            })
            .when("/todo/:tid", {
                templateUrl: "views/todo/todo-edit.view.client.html",
                controller: "TodoEditController",
                controllerAs: "model"
            })
            .otherwise({
                redirect: "todo"
            });
    }
})();