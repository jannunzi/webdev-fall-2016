module.exports = function (app) {
    app.get("/ejs/hello", sayHello);
    app.get("/ejs/home", homeController);
    app.get("/ejs/contact", contactController);
    app.get("/ejs/about", aboutController);
    app.get("/ejs/profile/:username", profileController);

    function profileController(req, res) {
        var username = req.params.username;
        var data = {
            username: username
        };
        res.render('profile', data);
    }

    function aboutController(req, res) {
        res.render('about');
    }

    function contactController(req, res) {
        res.render('contact');
    }

    function homeController(req, res) {
        var data = {
            html: '<h3>Welcome</h3>'
        };
        res.render('home', data);
    }

    function sayHello(req, res) {
        var data = {
            instructor: 'Alice Wonderland',
            courses: [
                {name: 'cs5610'},
                {name: 'cs4550'},
                {name: 'cs5200'}
            ]
        };
        res.render('hello', data);
    }
}