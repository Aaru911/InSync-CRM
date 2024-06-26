const app = global.router
const express = require('express');
app.use(express.static('public'));
const mongo = require('../mongodb.js');
const {authMiddleware} = require('../middleware/auth.js');
const {validateDateMiddleware}=require('../middleware/validateDate');
const  {get_add_entries,post_add_entries,post_view_entries,post_view_entries_update_record}=require('../controller/entries_controller');


var filter = {};
var sort = {'checkin': -1};
app.get('/add',authMiddleware, get_add_entries);

app.post('/add',authMiddleware,validateDateMiddleware, post_add_entries);

app.get('/view',authMiddleware, async (req, res) => {
    try {
        const data= await mongo.enquiry.find(filter,null,{sort});
        sort_str=JSON.stringify(sort)  
        for (const obj of data) {
            obj.user= await mongo.user.findOne({'_id':obj.user});
        }
        res.render("entries/view", {data: data , filter:filter, sort:sort_str});
    } catch (error) {
        console.log("No data found");
        console.log(error);
    }
});

app.post('/view',authMiddleware, async (req, res) => {

    var data= req.body;

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

    if(data.sort != ''&& data.order != ''){
        sort={
            [data.sort] : data.order
        }
    }

    if(data.search != ''){
        filter = {
            'name': {'$regex': data.search, '$options': 'i'},
          };
    }
    console.log("Filter",filter,"\n",sort);
    res.redirect("/entries/view");
});

app.get('/view/reset',authMiddleware, async (req, res) => {
    console.log("Reset");
    filter = {};
    sort = {'checkin': -1};
    res.redirect("/entries/view");  
});

app.get('/edit/:id', authMiddleware, async (req, res) => {
    try {
        const data = await mongo.enquiry.findOne({ _id: req.params.id });
        data.user = await mongo.user.findOne({ _id: data.user });
        res.render("entries/edit", { data: data });
    } catch (error) {
        console.log(error);
    }

});
app.post('/entries/update_record',authMiddleware, post_view_entries_update_record);

app.post('/entries/update/:id',authMiddleware,validateDateMiddleware,post_view_entries);

app.get('/entries/delete/:id',authMiddleware, async (req, res) => {
    try {
        await mongo.enquiry.deleteOne({ _id: req.params.id });
    } catch (error) {
        console.log(error);
    }
    res.redirect('/entries/view');
});


module.exports = app;