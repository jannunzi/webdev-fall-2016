(function () {
    angular
        .module("AngularValidateApp", [])
        .controller("validationController", validationController);
    
    function validationController($scope) {
        var vm = this;
        vm.updateUser = updateUser;

        function updateUser(user) {
            console.log(user);
            console.log($scope);
        }
    }
})();