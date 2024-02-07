const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

// Define the schema
const EnquirySchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "user",
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
  Rates:{
    type: Number,
  },
  Pending_amount:{
    type: Number,
  }
}); // Add closing brace here

// Create a model based on the schema
const enquiry = mongoose.model('enquiry', EnquirySchema);

module.exports = enquiry;
