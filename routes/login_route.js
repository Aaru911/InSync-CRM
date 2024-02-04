const app = global.router
const mongo = require('../mongodb.js');
app.get('/login', (req, res) => {
    res.render("login");
});
app.post('/login', async(req, res) => {
    console.log(req.body);
    localStorage.setItem('user', req.body.username);
    localStorage.setItem('pass', req.body.password);
    await mongo.connect();
    if(parseInt(await mongo.check())== 1 || parseInt(await mongo.check())== 2){
        res.redirect("/");
    }
    else{
        res.redirect("/login");
    }
});

module.exports = app;