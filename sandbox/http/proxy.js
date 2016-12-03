module.exports = function (app) {
    var http = require('http');

    // try this by using the URL
    // http://localhost:3000/api/movie/title/batman
    app.get('/api/movie/title/:title', findMovieByTitle)

    function findMovieByTitle(req, res) {
        var options = {
            host: 'www.omdbapi.com',
            path: '/?t=' + req.params.title
        };
        callback = function(response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                console.log(str);
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(str);
            });
        }

        http.request(options, callback).end();
    }
};