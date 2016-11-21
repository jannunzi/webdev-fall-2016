
module.exports = function(app, model) {

    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
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
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var users = [
        {username: 'alice', password: 'ewq', _id: 123, first: 'Alice', last: 'Wonderland'},
        {username: 'bob', password: 'ewq', _id: 234, first: 'Bob', last: 'Dylan'},
        {username: 'charlie', password: 'ewq', _id: 345, first: 'Charlie', last: 'Brown'}
    ];

    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', unregisterUser);

    
    function logout(req, res) {
        req.logout();
        res.send(200);
    }
    
    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }
    
    function unregisterUser(req, res) {
        var uid = req.params.uid;
        model
            .userModel
            .removeUser(uid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
        // for(var u in users) {
        //     if(users[u]._id == uid) {
        //         users.splice(u, 1);
        //     }
        // }
        // res.send(200);
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        model
            .userModel
            .updateUser(uid, user)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        // for(var u in users) {
        //     if(users[u]._id == uid) {
        //         users[u] = user;
        //     }
        // }
        // res.send(200);
    }

    function createUser(req, res) {
        var user = req.body;
        // user._id = (new Date()).getTime();
        // users.push(user);
        model
            .userModel
            .createUser(user)
            .then(
                function(newUser) {
                    res.send(newUser);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
        if(query.password && query.username) {
            findUserByCredentials(req, res);
        } else if(query.username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (users) {
                    if(users) {
                        res.json(users[0]);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        // for(var u in users) {
        //     if(users[u].username === username &&
        //        users[u].password === password) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }
        // res.send('0');
    }
    function findUserByUsername(req, res) {
        var username = req.query.username;
        for(var u in users) {
            if(users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }
    function findUserById(req, res) {
        var userId = req.params.uid;
        model
            .userModel
            .findUserById(userId)
            .then(
                function (user) {
                    if(user) {
                        res.send(user);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }
};