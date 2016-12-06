module.exports = function (app) {

    var forms = require("./forms.mock.json");

    var api = {
        createForm: createForm,
        updateForm: updateForm,
        findAllForms : findAllForms,
        findFormById: findFormById,
        deleteForm: deleteForm
    };
    return api;

    function createForm(form) {
        form._id = (new Date).getTime();
        forms.push(form);
    }
    function updateForm(form) {
        for(var f in forms) {
            if(forms[f]._id == form._id) {
                forms[f] = form;
            }
        }
    }
    function deleteForm(formId) {
        for(var f in forms) {
            if(forms[f]._id == formId) {
                forms.splice(f, 1);
            }
        }
    }
    function findFormById(formId) {
        for(var f in forms) {
            if(forms[f]._id == formId) {
                return forms[f];
            }
        }
    }
    function findAllForms() {
        return forms;
    }
};