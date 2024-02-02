const app = global.router
const express = require('express');
const local = require('../utils/local.js');
local();
  
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.render("index");
});

module.exports = app;