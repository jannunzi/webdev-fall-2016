(function(){
    angular
        .module("MovieApp")
        .controller("MovieSearchController", MovieSearchController);

    function MovieSearchController(MovieService, $routeParams, $location) {
        var vm = this;
        vm.searchMovieByTitle = searchMovieByTitle;
        vm.title = $routeParams.title;

        function init() {
            if(vm.title) {
                // $location.path("#/search/"+title);
                searchMovieByTitle(vm.title);
            }
        }
        init();
        
        function searchMovieByTitle(title) {
            MovieService
                .searchMovieByTitle(title)
                .success(function (result) {
                    vm.movies = result.Search;
                });
        }
    }
})();