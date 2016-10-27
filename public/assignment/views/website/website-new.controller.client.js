(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        vm.createWebsite = createWebsite;
        
        function init() {
            var promise = WebsiteService.findWebsitesForUser(userId);
            promise
                .success(function(websites){
                    vm.websites = websites;
                });
            }
        init();

        function createWebsite(website) {
            website._id = (new Date()).getTime();
            website.uid = userId;
            WebsiteService
                .createWebsite(userId, website)
                .success(function () {
                    $location.url("/user/"+userId+"/website");
                });
        }
    }
})();