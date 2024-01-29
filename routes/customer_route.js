const app = global.router
const express = require('express');
app.use(express.static('public'));
const mongo = require('../mongodb.js');


app.get('/customer/add', (req, res) => {
    res.render("customer/add");
});

app.post('/customer/add',async (req, res) => {
    var data=req.body;
    console.log(data);
    try {
        await mongo.user.insertMany(data);
    } catch (error) {
        console.log(error);   
    }
    res.redirect("/customer/view");
});

app.get('/customer/view',async (req, res) => {
    try {
        await mongo.user.find().then((data) => {
            res.render("customer/view", { data: data });
        });
    } catch (error) {
        console.log("No data found");
        console.log(error);
    }
});

app.post('/customer/view', async (req, res) => {
    var data= req.body;
    if(data.search != ''){
        filter = {
            $or: [
            {'name': {'$regex': data.search, '$options': 'i'}},
            {'phone': parseInt(data.search)},
            {'email': {'$regex': data.search, '$options': 'i'}}
            ]
          };
    }
    console.log(filter);
    try {
        await mongo.user.find(filter,null,null).then((data) => {
            res.render("customer/view", { data: data });
        });
    } catch (error) {
        console.log("No data found");
        console.log(error);
        res.redirect("/customer/view");
    }
});

app.get('/customer/view/reset', (req, res) => {
    res.redirect("/customer/view");
});

app.get('/customer/delete/:id',async (req, res) => {
    try {
        await mongo.user.deleteOne({ _id: req.params.id });
    } catch (error) {
        console.log(error);
    }
    res.redirect("/customer/view");
});

app.get('/customer/edit/:id',async (req, res) => {
    try {
        await mongo.user.findById(req.params.id).then((data) => {
            res.render("customer/edit", { data: data });
        });
    } catch (error) {
        console.log("No data found");
        console.log(error);
    }
});

app.post('/customer/update/:id',async (req, res) => {
    try {
        await mongo.user.updateOne({ _id: req.params.id }, req.body);
    } catch (error) {
        console.log(error);
    }
    res.redirect("/customer/view");
});
module.exports = app;