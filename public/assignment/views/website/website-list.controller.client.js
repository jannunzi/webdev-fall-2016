(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        vm.userId = parseInt($routeParams['uid']);

        function init() {
            var promise = WebsiteService.findWebsitesForUser(vm.userId);
            promise
                .success(function(websites){
                    vm.websites = websites;
                });
        }
        init();
    }
})();