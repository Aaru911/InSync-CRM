const mongoose = require('mongoose');


// Define the schema
const EnquirySchema = new mongoose.Schema({

  name: {
    type: String,
    default: 'Anonymous',
    required: true,
  },
  phone: {
    type: Number,   
    required: true,
  },
  nop: {
    type: Number,
    default: 1,
    required: true,
  },
  ac: {
    type: Number,
    default: 0,
  },
  nonac: {
    type: Number,
    default: 0,
  },
checkin: {
    type: Date,
    dateFormat: 'DD/MM/YYYY',
},
checkout: {
    type: Date,
    dateFormat: 'DD/MM/YYYY',  
},
});


// Create a model based on the schema
const enquiry = mongoose.model('enquiry', EnquirySchema);

module.exports = enquiry;
