(function(){
    angular
        .module("SwitchExampleApp", [])
        .controller("SwitchController", SwitchController);

    function SwitchController() {
        var vm = this;
        vm.widgets = [
            {type: "YOUTUBE"},
            {type: "IMAGE"},
            {type: "HEADING"}
        ];
    }
})();