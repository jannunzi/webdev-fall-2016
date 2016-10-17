(function(){
    angular
        .module("SceIframeExample", [])
        .controller("YouTubeController", YouTubeController);

    function YouTubeController($sce) {
        var vm = this;
        vm.safeUrl = safeUrl;

        var youTubeUrls = [
            {url: 'https://www.youtube.com/embed/lc8804tkoaM'},
            {url: 'https://www.youtube.com/embed/v_-MLIn3O-c'},
            {url: 'https://www.youtube.com/embed/sC9abcLLQpI'}
        ];

        vm.urls = youTubeUrls;

        function safeUrl(url) {
            return $sce.trustAsResourceUrl(url);
        }
    }
})();
