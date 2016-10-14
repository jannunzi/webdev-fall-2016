(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            {name: 'facebook.com', uid: 123},
            {name: 'wikipedia.org', uid: 123},
            {name: 'twitter.com', uid: 234}
        ];

        var api = {
            findWebsitesForUser: findWebsitesForUser
        };
        return api;

        function findWebsitesForUser(uid) {
            var result = [];
            for(var w in websites) {
                if(websites[w].uid === uid) {
                    result.push(websites[w]);
                }
            }
            return result;
        }
    }
})();