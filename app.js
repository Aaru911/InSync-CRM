const express= require('express');
const app = express();
const dotenv = require('dotenv');
const mongo = require('./mongodb.js');
const router = (global.router = (express.Router()));
const app_route = require('./routes/app_route.js');
const entries_route = require('./routes/entries_route.js');
const led_route = require('./routes/led_route.js');
const customer_route = require('./routes/customer_route.js');
const login_route = require('./routes/login_route.js');
const invoices_route = require('./routes/invoices_route.js');
const morgan = require("morgan");
const hbs = require('hbs');

app.use(morgan('dev'));
dotenv.config();

app.use(express.static('public'));
app.use(express.json());
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.urlencoded({extended:false}));

app.use('/', app_route);
app.use('/entries', entries_route);
app.use('/led', led_route);
app.use('/customer', customer_route);
app.use('/login', login_route);
app.use(`/invoices`, invoices_route);

app.use(router);

app.listen(process.env.PORT, () => {
  console.log("http://localhost:"+process.env.PORT);
  mongo.connect();
});