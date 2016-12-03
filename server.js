var express = require('express');
var app = express();

var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');


var bodyParser = require('body-parser');
app.use(bodyParser.json({type: 'website/json'}));
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// require ("./test/app.js")(app);

require("./assignment/app.js")(app);
require("./ejs/app.js")(app);

var websites = [
    {_id: 321, name: 'facebook.com', uid: 123},
    {_id: 432, name: 'wikipedia.org', uid: 123},
    {_id: 543, name: 'twitter.com', uid: 234}
];

app.get("/websites", function(req, res){
    res.send(websites);
});

require("./experiments/app.js")(app);
require("./lecture/app.js")(app);
require("./sandbox/todo/app.js")(app);
require("./experiments/todo/app.js")(app);
require("./sandbox/http/proxy")(app);
// require("./sandbox/websites/model/test.model.server")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);
