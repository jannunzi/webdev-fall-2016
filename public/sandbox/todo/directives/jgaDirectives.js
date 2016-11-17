(function(){
    angular
        .module("jga", [])
        .directive("jgaSortable", jgaSortable);
    
    function jgaSortable() {
        var start = -1;
        var end = -1;
        function link(scope, element, attr) {
            element
                .sortable({
                    axis: "y",
                    start: function(event, ui) {
                        start = $(ui.item).index();
                        console.log(start);
                    },
                    stop: function(event, ui) {
                        var item = $(ui.item);
                        item.css("width", "100%");
                        end = item.index();
                        console.log(end);
                        scope.ctrl.stop(start, end);
                    }
                });
        }
        return {
            link: link,
            scope: {
                stop: '&'
            },
            controller: jgaSortableController,
            controllerAs: 'ctrl'
        };
    }

    function jgaSortableController(TodoService) {
        var vm = this;
        vm.stop = stop;
        function stop(start, stop) {
            TodoService
                .reorderTodo(start, stop);
        }
    }
})();