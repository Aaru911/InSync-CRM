const app = global.router
const express = require('express');
app.use(express.static('public'));
const mongo = require('../mongodb.js');
const {authMiddleware} = require('../middleware/auth.js');

app.get('/treanding', authMiddleware,(req, res) => {
    res.render("dashboard/treanding");
});
app.get('/pending', authMiddleware,(req, res) => {
    res.render("dashboard/pending");
});

module.exports = app;