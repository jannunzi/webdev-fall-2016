(function () {
    angular
        .module("EmbeddedHtmExample", [])
        .controller("HtmlController", HtmlController);

    function HtmlController($sce) {
        var vm = this;
        vm.safeHtml = safeHtml;
        vm.htmls = [
            {html: "<h2>Header 123</h2><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. </p>"},
            {html: "<h2>Header abc</h2><p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using. </p>"}
        ];

        function safeHtml(html) {
            return $sce.trustAsHtml(html);
        }
    }
})();