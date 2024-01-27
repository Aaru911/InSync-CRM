const app = global.router
const express = require('express');
app.use(express.static('public'));
const mongo = require('../mongodb.js');


app.get('/entries/add', (req, res) => {
    res.render("add");
});

app.post('/entries/add', async (req, res) => {
    var enquiry = req.body;
    if(enquiry.checkin < enquiry.checkout){
        try {
            await mongo.enquiry.insertMany(enquiry);
        } catch (error) {
            console.log(error);
            res.redirect("add");
        }
        res.redirect("view");
    }
    else{
        console.log("Checkin date should be less than checkout date");
        res.redirect("add");
    }

});

app.get('/entries/view', async (req, res) => {
    const data= req.query;
    var filter = {};
    if(data.check_in != undefined){
        console.log(data.check_in);
        filter = {'checkin': new Date(data.check_in)};
    }
        try {
            await mongo.enquiry.find(filter).then((data) => {
                res.render("view", { data: data });
            });
        } catch (error) {
            console.log("No data found");
            res.redirect("/entries/view");
        }
});

app.get('/entries/edit/:id', async (req, res) => {
    try {
        await mongo.enquiry.findOne({ _id: req.params.id }).then((data) => {
            res.render("edit", { data: data });
        });
    } catch (error) {
        console.log(error);
    }

});

app.post('/entries/update/:id', async (req, res) => {
    var enquiry = req.body;
    if(enquiry.checkin < enquiry.checkout){
        try {
            await mongo.enquiry.updateOne({ _id: req.params.id }, enquiry);
        } catch (error) {
            console.log(error);
        }
        res.redirect('/entries/view');
    }else{
        console.log("Checkin date should be less than checkout date");
        res.redirect("/entries/edit/"+req.params.id);    
    }

});

app.get('/entries/delete/:id', async (req, res) => {
    try {
        await mongo.enquiry.deleteOne({ _id: req.params.id });
    } catch (error) {
        console.log(error);
    }
    res.redirect('/entries/view');
});


module.exports = app;