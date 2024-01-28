const express= require('express');
const app = express();
const dotenv = require('dotenv');
const router = (global.router = (express.Router()));
const hbs = require('hbs');

dotenv.config();

app.use(express.static('public'));
app.use(express.json());
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.urlencoded({extended:false}));

app.use('/', require('./routes/app_route.js'));
app.use('/entries', require('./routes/entries_route.js'));
app.use('/led', require('./routes/led_route.js'));
app.use('/customer', require('./routes/customer_route.js'));

app.use(router);

app.listen(process.env.PORT, () => {
  console.log("http://localhost:"+process.env.PORT);
});