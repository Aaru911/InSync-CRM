const express= require('express');
const app = express();
const dotenv = require('dotenv');
const router = (global.router = (express.Router()));

dotenv.config();

app.use(express.static('public'));
app.use(express.json());
app.set("view engine", "hbs");
app.use(express.urlencoded({extended:false}));

app.use('/', require('./routes/app_route.js'));
app.use('/entries', require('./routes/entries_route.js'));
app.use('/led', require('./routes/led_route.js'));

app.use(router);

app.listen(process.env.PORT, () => {
  console.log("http://localhost:"+process.env.PORT);
});