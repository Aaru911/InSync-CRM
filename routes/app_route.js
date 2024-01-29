const app = global.router
const express = require('express');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
  
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.render("index");
});

module.exports = app;