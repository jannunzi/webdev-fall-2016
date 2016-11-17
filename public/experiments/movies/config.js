(function() {
    angular
        .module("MovieApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "MovieSearchController",
                controllerAs: "model"
            })
            .when("/search/:title", {
                templateUrl: "views/search/search.view.html",
                controller: "MovieSearchController",
                controllerAs: "model"
            })
            .when("/details/:imdbID/:title", {
                templateUrl: "views/details/details.view.html",
                controller: "MovieDetailsController",
                controllerAs: "model"
            });
    }
})();