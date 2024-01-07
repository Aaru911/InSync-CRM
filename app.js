const express= require('express');
const dotenv = require('dotenv');
const mongo = require('./mongodb.js');
const hbs = require('hbs');
var os = require('os');
const e = require('express');
var networkInterfaces = os.networkInterfaces();

dotenv.config();
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.set("view engine", "hbs");
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
  res.render("index");
});

app.get('/add', (req, res) => {
  res.render("add");
});

// app.post('/add',async(req, res) => {
//   var enquiry=req.body;
//   try {
//     await mongo.enquiry.insertMany(enquiry);
//   } catch (error) {
    
//   }
// });

app.post('/add', async (req, res) => {
    var enquiry = req.body;
    console.log(enquiry);
    await mongo.enquiry.insertMany(enquiry);
    res.redirect("view");
});

app.get('/view',async(req, res) => {
  await mongo.enquiry.find({}).then((data)=>{
    res.render("view",{data:data});
  });
});

app.get('/edit/:id',async(req, res) => {
  await mongo.enquiry.findOne({_id:req.params.id}).then((data)=>{
    res.render("edit",{data:data});
  });
});

app.post('/update/:id',async(req, res) => {
  var enquiry=req.body;
  await mongo.enquiry.updateOne({_id:req.params.id},enquiry);
  res.redirect('/view');
});

app.get('/delete/:id',async(req, res) => {
  await mongo.enquiry.deleteOne({_id:req.params.id});
  res.redirect('/view');
});

app.listen(process.env.PORT, () => {
  console.log("http://"+networkInterfaces.en0[1].address+":"+process.env.PORT);
});