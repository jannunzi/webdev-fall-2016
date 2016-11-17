(function(){
    angular
        .module("utility", [])
        .directive("sortable", sortable);
    
    function sortable() {

        function linker(scope, element, attributes) {
            var start = -1;
            var end = -1;
            element
                .sortable({
                    start: function(event, ui) {
                        start = $(ui.item).index();
                    },
                    stop: function(event, ui) {
                        end = $(ui.item).index();
                        scope.sortableController.sort(start, end);
                    }
                });
        }

        return {
            scope: {},
            link: linker,
            controller: sortableController,
            controllerAs: 'sortableController'
        }
    }
    
    function sortableController(TodoService) {
        var vm = this;
        vm.sort = sort;

        function sort(start, end) {
            TodoService.sort(start, end);
        }
    }
})();