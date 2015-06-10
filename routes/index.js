module.exports = function (app) {
    app.get('/', index);
};

var index = function (req, res) {
    res.render('index', { title: 'Hullo Wurld', EXAMPLEDATA: 'this is the very beginning of music JS 2015'});
};