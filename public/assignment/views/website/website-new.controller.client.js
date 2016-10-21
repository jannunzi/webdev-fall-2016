(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        vm.createWebsite = createWebsite;
        
        function init() {
            vm.websites = WebsiteService.findWebsitesForUser(userId);
        }
        init();

        function createWebsite(website) {
            website._id = (new Date()).getTime();
            website.uid = userId;
            console.log(website);
            WebsiteService.createWebsite(website);
            $location.url("/user/"+userId+"/website");
        }
    }
})();