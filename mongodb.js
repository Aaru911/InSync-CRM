const mongoose = require('mongoose');
const dotenv = require('dotenv');
const enquiry = require('./schemas/enquiry.js');
const availability = require('./schemas/Availability.js');
const user = require('./schemas/user.js');
dotenv.config();
// Database connection

mongoose.connect(process.env.DB_CONNECT).then(() => {
  console.log("Database connected successfully");
}).catch((err) => {
  console.log(err);
});

module.exports = {enquiry, availability,user};