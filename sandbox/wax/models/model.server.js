module.exports = function () {

    var api = {
        "findAppByName" : findAppByName
    };
    return api;

    function findAppByName(appName) {
        var data = require("./"+appName+".mock.json");
        return data;
    }
};