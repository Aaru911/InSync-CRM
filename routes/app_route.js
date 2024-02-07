const app = global.router
const express = require('express');
const local = require('../utils/local.js');
const {authMiddleware} = require('../middleware/auth.js');
local();
  
app.use(express.static('public'));
app.get('/', authMiddleware,(req, res) => {
    //res.render("index");
    res.redirect("/customer/view");
});
app.get('/quote',(req, res) => {
    res.render("invoice/quote");
});

module.exports = app;