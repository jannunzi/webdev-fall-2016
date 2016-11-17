(function(){
    angular
        .module("TodoApp")
        .controller("TodoListController", TodoListController)
        .controller("TodoEditController", TodoEditController);

    function TodoListController(TodoService) {
        var vm = this;
        vm.stop = stop;
        vm.createTodo = createTodo;
        vm.deleteTodo = deleteTodo;

        function init() {
            getAllTodos();
        }
        init();
        
        function stop(start, end) {
            console.log("stopSorting");
            console.log([start, end]);
        }

        function getAllTodos() {
            TodoService
                .getAllTodos()
                .success(function(todos){
                    vm.todos = todos;
                });
        }

        function deleteTodo(id) {
            TodoService
                .deleteTodo(id)
                .success(getAllTodos);
        }

        function createTodo(todo) {
            TodoService
                .createTodo(todo)
                .success(function (rew) {
                    console.log(rew);
                })
                .error(function(error){
                    console.log(error);
                })
        }
    }

    function TodoEditController(TodoService) {
        console.log("TodoEditController");
    }
})();