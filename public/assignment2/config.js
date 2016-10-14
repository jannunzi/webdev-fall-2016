(function() {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home.html"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html"
            })
            .when("/profile", {
                templateUrl: "views/user/profile.view.client.html"
            })
            .when("/website", {
                templateUrl: "views/website/website-list.html",
                controller: "WebsiteListController"
            })
            .when("/website/new", {
                templateUrl: "views/website/website-new.html"
            })
            .when("/website/:wid", {
                templateUrl: "views/website/website-edit.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();