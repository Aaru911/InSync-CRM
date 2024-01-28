const app = global.router
const express = require('express');
app.use(express.static('public'));
const mongo = require('../mongodb.js');
const hbs = require('hbs');


app.get('/customer/add', (req, res) => {
    res.render("add");
});

module.exports = app;