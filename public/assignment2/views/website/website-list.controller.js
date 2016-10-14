(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($scope) {

        var websites = [
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 123, "name": "Facebook", "description": "Most popular social service"},
            {"_id": 234, "name": "Wikipedia", "description": "World's encyclopedia"}
        ];

        $scope.websites = websites;

        console.log("Hello from WebsiteListController");
    }
})();