const app = global.router
const mongo = require('../mongodb.js');

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

module.exports = app;