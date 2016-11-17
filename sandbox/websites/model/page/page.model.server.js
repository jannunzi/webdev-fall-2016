module.exports = function () {
    var mongoose = require('mongoose');
    var model = null;
    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model('PageModelSandbox', PageSchema);
    var api = {
        createPage: createPage,
        addPageToWebsite: addPageToWebsite,
        setModel: setModel,
        PageModel: PageModel
    };
    return api;
    function addPageToWebsite(websiteName, pageObj) {
        var newPage = null;
        createPage(pageObj)
            .then(function(result){
                newPage = result;
                return model.websiteModel.findWebsiteByName(websiteName);
            })
            .then(function (website) {
                website.pages.push(newPage);
                return website.save();
            });
    }
    function setModel(_model) {
        model = _model;
    }
    function createPage(page) {
        return PageModel.create(page);
    }
};