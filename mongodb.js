const mongoose = require('mongoose');
const dotenv = require('dotenv');
const enquiry = require('./schemas/enquiry.js');
const availability = require('./schemas/Availability.js');
const user = require('./schemas/user.js');
dotenv.config();
// Database connection

const connect= async () => {
const user_name = localStorage.getItem('user');
const password = localStorage.getItem('pass');
DB_CONNECT = "mongodb+srv://"+user_name+":"+password+process.env.DB_CONNECT;
  await mongoose.connect(DB_CONNECT).then(() => {
    console.log("Database connected successfully");
  }).catch((err) => {
    console.log("Error connecting to database Bad Aithentication or Network Error");
    disconnect();
    //console.log(err);
  });
}
const disconnect = async () => {
  await mongoose.disconnect().then(() => {
    console.log("Database disconnected successfully");
  }).catch((err) => {
    console.log("Error disconnecting to database");
  });

}

const check = async () => {
  return await mongoose.connection.readyState;
}
module.exports = {enquiry, availability, user, connect, check, disconnect,ObjectId: mongoose.Types.ObjectId};
