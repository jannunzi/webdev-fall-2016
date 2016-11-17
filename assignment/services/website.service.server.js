module.exports = function(app, model) {
    var websites = [
        {_id: 321, name: 'facebook.com', uid: 123},
        {_id: 432, name: 'wikipedia.org', uid: 123},
        {_id: 543, name: 'twitter.com', uid: 234}
    ];

    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.post("/api/user/:userId/website", createWebsite);

    function createWebsite(req, res) {
        var website = {name: 'facebook'};
        // websites.push(website);
        // res.send(websites);
        model.websiteModel
            .createWebsite(req.params.userId, website)
            .then(function (website) {
                console.log(website);
                res.json(website);
            });
    }

    function findAllWebsitesForUser(req, res) {
        model.websiteModel
            .findWebsitesForUser(req.params.userId)
            .then(function(websites){
                res.json(websites);
            });
    }

};