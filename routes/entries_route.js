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
    sort = {'checkin': -1};
    try {
        await mongo.enquiry.find(null,null,{sort}).then((data) => {
            res.render("view", { data: data });
        });
    } catch (error) {
        console.log(error);
    }
});

app.post('/entries/view', async (req, res) => {
    var data= req.body;
    var filter = {};
    var sort = {'checkin': -1};

    if(data.Till != ''){
        const d1 = new Date(data.Till);
        d1.setDate(d1.getDate() + 1);
        data.Till = d1;
    }

    if(data.From != '' && data.Till != ''){
        console.log(data.From, data.Till);
        filter = {'checkin': {'$gte':new Date(data.From), '$lt':new Date(data.Till)}};
    }
    else if(data.From != '' && data.Till == ''){
        filter = {'checkin': new Date(data.From)};
    }
    else{
        filter=null
    }

    if(data.order == 'asc'){
        sort = {'checkin': 1};
    }
    else if(data.order == 'desc'){
        sort = {'checkin': -1};
    }
    else{
        sort={'checkin': -1};
    }
    
    if(data.search != ''){
        filter = {
            'name': {'$regex': data.search, '$options': 'i'},
          };
    }
    try {
        await mongo.enquiry.find(filter, null,{ sort }).then((data) => {
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