const app = global.router
const mongo = require('../mongodb.js');
app.get('/login', (req, res) => {
    console.log(localStorage.getItem('user'), localStorage.getItem('pass'));
    res.render("login");
});
app.post('/login', (req, res) => {
    console.log(req.body);
    localStorage.setItem('user', req.body.username);
    localStorage.setItem('pass', req.body.password);
    mongo.connect();
    res.redirect("/");
});

module.exports = app;