const app = global.router
const express = require('express');
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.render("index");
});

module.exports = app;