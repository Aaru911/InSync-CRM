const app = global.router
const {authMiddleware} = require('../middleware/auth.js');

app.get('/quote',authMiddleware,(req, res) => {
    res.render("invoice/quote");
});

app.get('/invoices',(req, res) => {
    res.send("Welcome to the invoice app");
});

module.exports = app;