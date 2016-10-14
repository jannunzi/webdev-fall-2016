(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        var userId = parseInt($routeParams['uid']);

        vm.websites = WebsiteService.findWebsitesForUser(userId);
    }
})();