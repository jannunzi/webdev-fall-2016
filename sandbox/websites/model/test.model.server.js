module.exports = function () {
    var model = require('./model.server')();

    // testEmptyAll();
   // testCreateUser('alice');
   //  testCreateWebsite('facebook');
   //  testCreateWebsite('twitter');
    //  testAddWebsiteToUser('facebook', 'alice');
    // testAddWebsiteToUser2('facebook', 'alice');
    // testAddWebsiteToUser2('twitter',  'alice');
  //  testRetrieveUser('alice');
  //  testRetrieveWebsite('facebook');
    testRemoveWebsite('facebook');
  //   testRemoveWebsite('twitter');

    function testEmptyAll() {
        model.userModel.empty();
        model.websiteModel.empty();
    }

    function testRemoveWebsite(websiteName) {
        model.websiteModel.removeWebsite(websiteName)
            .then(function(user){
                console.log(user);
            });
    }

    function testAddWebsiteToUser2(websiteName, username) {
        model.websiteModel.addWebsiteToUser(websiteName, username)
            .then(function (user) {
                console.log(user);
            })
    }
    
    function testRetrieveWebsite(name) {
        model.websiteModel.findWebsiteByName(name)
            .then(function (website) {
                console.log(website);
            });
    }
    function testRetrieveUser(username) {
        model.userModel.findUserByUsername(username)
            .then(function (user) {
                console.log(user);
            });
    }

    function testAddWebsiteToUser(websiteName, username) {
        var website = null;
        var user = null;
        model.websiteModel.findWebsiteByName(websiteName)
            .then(
                function (result) {
                    website = result;
                    return model.userModel.findUserByUsername(username);
                }
            )
            .then(
                function (result) {
                    user = result;
                    console.log(user);
                    user.websites.push(website);
                    website._user = user._id;
                    website.save(function(result){
                        console.log(result);
                    });
                    user.save(function(userObj){
                        console.log('saved');
                        console.log(userObj);
                    });
                }
            );
    }
    
    function testCreateUser(username) {
        var user = {username: username};
        model.userModel.createUser(user);
    }
    function testCreateWebsite(name) {
        var website = {name: name};
        model.websiteModel.createWebsite(website);
    }
};