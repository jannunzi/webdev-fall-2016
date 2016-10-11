
angular
    .module('WebAppMaker', ['ngRoute'])
    .config(Config);

function Config($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login.html'
        })
        .when('/register', {
            templateUrl: 'register.html'
        });
}