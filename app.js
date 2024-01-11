const express= require('express');
const dotenv = require('dotenv');
const mongo = require('./mongodb.js');
const hbs = require('hbs');
const http = require('http');
var os = require('os');
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

app.post('/add', async (req, res) => {
    var enquiry = req.body;
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

app.get('/led', async (req, res) => {
  var IOT_data = '';
  res.render('led', {data:IOT_data});
  // http.get("http://"+process.env.IOT1, (resp) => {
  //   var IOT_data = '';
  //   resp.on('data', (chunk) => {
  //     IOT_data += chunk;
  //   });
  //   resp.on('end', () => {
  //     res.render('led', {data:IOT_data});
  //   });
  // });
});

// app.post('/led', async (req, res) => {
//   action1=req.body.led1;
//   action2=req.body.led2;
//   action3=req.body.led3;
//   if (action1 === 'on') {
//     await http.get("http://"+process.env.IOT1+"/led1?action=on", (resp) => {});
//   } else{
//     await http.get("http://"+process.env.IOT1+"/led1?action=off", (resp) => {});
//   }
//   if (action2 === 'on') {
//     await http.get("http://"+process.env.IOT1+"/led2?action=on", (resp) => {});
//   } else{
//     await http.get("http://"+process.env.IOT1+"/led2?action=off", (resp) => {});
//   }
//   if (action3 === 'on') {
//     await http.get("http://"+process.env.IOT1+"/led3?action=on", (resp) => {});
//   } else{
//     await http.get("http://"+process.env.IOT1+"/led3?action=off", (resp) => {});
//   }
//   res.redirect('/led');
// });

// app.post('/led', async (req, res) => {
//   const action1 = req.body.led1;
//   const action2 = req.body.led2;
//   const num = [];
//   const actions = [];
//   if (action1 === 'on') {
//     num[0] = '1';
//   } else {
//     num[0] = '0';
//   }
//   if (action2 === 'on') {
//     num[1] = '1';
//   } else {
//     num[1] = '0';
//   }

//   // Construct an array of promises for HTTP requests
//   num.forEach((val, index) => {
//     const action = val === '1' ? 'on' : 'off';
//     actions.push(new Promise((resolve, reject) => {
//       http.get(`http://`+process.env.IOT1+`/led${index + 1}?action=${action}`, (resp) => {
//         resolve();
//       }).on('error', (err) => {
//         reject(err);
//       });
//     }));
//   });

//   try {
//     // Wait for all requests to finish before redirecting
//     await Promise.all(actions);
//     res.redirect('/led');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error processing requests');
//   }
// });

app.listen(process.env.PORT, () => {
  console.log("http://"+networkInterfaces.en0[1].address+":"+process.env.PORT);
});