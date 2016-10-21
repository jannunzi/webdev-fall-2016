(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        // var websites = [
        //     {_id: 321, name: 'facebook.com', uid: 123},
        //     {_id: 432, name: 'wikipedia.org', uid: 123},
        //     {_id: 543, name: 'twitter.com', uid: 234}
        // ];

        var api = {
            findWebsitesForUser: findWebsitesForUser,
            findWebsiteById: findWebsiteById,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            removeWebsite: removeWebsite
        };
        return api;

        function removeWebsite(wid) {
            for (var w in websites) {
                if (websites[w]._id === wid) {
                    websites.splice(w, 1);
                }
            }
        }

        function updateWebsite(website) {
            for (var w in websites) {
                if (websites[w]._id === website._id) {
                    websites[w] = website;
                }
            }
        }

        function createWebsite(website) {
            websites.push(website);
        }

        function findWebsiteById(wid) {
            for (var w in websites) {
                if (websites[w]._id === wid) {
                    return websites[w];
                }
            }
            return null;
        }

        function findWebsitesForUser(uid) {
            // var result = [];
            // for(var w in websites) {
            //     if(websites[w].uid === uid) {
            //         result.push(websites[w]);
            //     }
            // }
            // return result;
            $http.get("/websites");
        }
    }
})();