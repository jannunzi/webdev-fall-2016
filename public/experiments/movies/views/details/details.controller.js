(function() {
    angular
        .module("MovieApp")
        .controller("MovieDetailsController", MovieDetailsController);
    
    function MovieDetailsController($routeParams, MovieService) {
        var vm = this;
        var imdbID = $routeParams.imdbID;
        vm.title = $routeParams.title;
        console.log("Hello from Details Controller: " + imdbID);

        function init() {
            MovieService
                .searchMovieByImdbID(imdbID)
                .success(function(response){
                    vm.movie = response;
                });
        }
        init();
    }
})();