module.exports = function (app) {
    app.get('/ejs/math', math);

    function math(req, res) {
        res.render('ejs/math/math');
    }
};