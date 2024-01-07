const mongoose = require('mongoose');

// Define the schema
const EnquirySchema = new mongoose.Schema({

  name: {
    type: String,
    default: 'Anonymous',
  },
  phone: {
    type: Number,   
  },
  nop: {
    type: Number,
    default: 1,
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
    // validate: {
    //     validator: function(value) {
    //         const currentDate = new Date();
    //         let day = date.getDate();
    //         let month = date.getMonth() + 1;
    //         let year = date.getFullYear();
    //         currentDate = day + '-' + month + '-' + year;
    //         return value >= currentDate;
    //     },
    //     message: 'Check-in date cannot be in the past',
    // },
},
checkout: {
    type: Date,
    dateFormat: 'DD/MM/YYYY',
    // validate: {
    //     validator: function(value) {
    //         const currentDate = new Date();
    //         let day = date.getDate();
    //         let month = date.getMonth() + 1;
    //         let year = date.getFullYear();
    //         return value >= currentDate;
    //     },
    //     message: 'Check-out date cannot be in the past',
    // },
}
});

// Create a model based on the schema
const enquiry = mongoose.model('enquiry', EnquirySchema);
module.exports = enquiry;
