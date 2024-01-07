const mongoose = require('mongoose');

// Define the schema
const UserSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Info:{
        Address:{
            type:String,
        },
        phone: {
            type: Number,   
        },
        email: {
            type: String,
        },
    },
    reviews:{
        rating:{
            type:Number,
            default:0,
        },
        comment:{
            type:String,
        }
    }
    
    
});
// user: {
//     type: mongoose.Schema.ObjectId,
//     ref: "User",
//     required: true,
//   },