(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService, $location) {
        var vm = this;
        var userId    = $routeParams.uid;
        var websiteId = $routeParams.wid;
        vm.updateWebsite = updateWebsite;
        vm.removeWebsite = removeWebsite;

        function init() {
            vm.website = WebsiteService.findWebsiteById(websiteId);
        }
        init();

        function updateWebsite(website) {
            WebsiteService.updateWebsite(website);
            $location.url("/user/"+userId+"/website");
        }

        function removeWebsite(wid) {
            WebsiteService.removeWebsite(wid);
            $location.url("/user/"+userId+"/website");
        }
    }
})();