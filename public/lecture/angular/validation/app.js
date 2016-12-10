(function(){
    angular
        .module("ValidationApp", [])
        .controller("ValidationController", ValidationController);
    
    function ValidationController($scope) {
        var vm = this;
        vm.submitForm = submitForm;
        vm.error = null;

        function submitForm(user) {
            console.log($scope.form1);
            console.log(user);
            if($scope.form1.$valid) {
                vm.error = null;
                console.log("It is ok to go to the server now");
                // SomeService.create(user);
            } else {
                vm.error = "something wrong with the form";
            }
        }
    }
})();