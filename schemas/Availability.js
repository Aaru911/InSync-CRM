const mongoose = require('mongoose');

// Define the schema
const AvailabilitySchema = new mongoose.Schema({
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

const Availability = mongoose.model('Availability', AvailabilitySchema);
module.exports = Availability;