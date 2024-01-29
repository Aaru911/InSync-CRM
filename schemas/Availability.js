const mongoose = require('mongoose');

// Define the schema
const availabilitySchema = new mongoose.Schema({
    bookingDate: {
        type: Date,
        required: true,
    },
    acRoomsBooked: {
        type: Number,
        default: 4,
    },
    nonAcRoomsBooked: {
        type: Number,
        default: 4,
    },
});

const availability = mongoose.model('availability', availabilitySchema);
module.exports = availability;