(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($scope) {
        $scope.hello = "hello from login controller";
    }
})();