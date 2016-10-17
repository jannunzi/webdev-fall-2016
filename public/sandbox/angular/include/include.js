(function(){
    angular
        .module("IncludeExampleApp", [])
        .controller("IncludeController", IncludeController);

    function IncludeController() {
        var vm = this;
        vm.widgets = [
            {type: "YOUTUBE"},
            {type: "IMAGE"},
            {type: "HEADING"}
        ];
    }
})();