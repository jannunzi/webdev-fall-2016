(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService) {
        var vm = this;
        var websiteId = parseInt($routeParams.wid);
        
        function init() {
            vm.website = WebsiteService.findWebsiteById(websiteId);
        }
        init();
    }
})();