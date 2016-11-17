(function () {
    angular
        .module("MovieApp")
        .factory("MovieService", MovieService);
    
    function MovieService($http) {
        var api = {
            "searchMovieByTitle": searchMovieByTitle,
            "searchMovieByImdbID": searchMovieByImdbID
        };
        return api;

        function searchMovieByTitle(title) {
            var url = "http://www.omdbapi.com/?s=" + title;
            return $http.get(url);
        }
        function searchMovieByImdbID(imdbID) {
            var url = "http://www.omdbapi.com?i=" + imdbID;
            return $http.get(url);
        }
    }
})();