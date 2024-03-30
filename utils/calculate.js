var base = 2000;
var AC = 500;
var weekend = 500;
const find = (enquiry) => {

    const checkIn = enquiry.checkin;
    const checkOut = enquiry.checkout;
    const acRooms = enquiry.ac;
    const nonAcRooms = enquiry.nonac;
    const extra = 0;
    let total = 0;

    //calculate sundays and sat between checkin and checkout   
    var check_in = new Date(checkIn);
    var check_out = new Date(checkOut);
    var firstDate = new Date(checkIn);
    var secondDate = new Date(checkOut);
    var total_no_of_rooms = parseInt(acRooms) + parseInt(nonAcRooms);
    var no_of_weekends = 0;

    for (var d = new Date(checkIn); d <= new Date(checkOut); d.setDate(d.getDate() + 1)) {
        if (d.getTime() !== check_out.getTime() && (d.getDay() === 6 || d.getDay() === 0)) { // 6 is Saturday, 0 is Sunday
            no_of_weekends++;
        }
    }

    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var no_of_days = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    total=(no_of_days * base * total_no_of_rooms) + (no_of_weekends * weekend * total_no_of_rooms) + (AC * parseInt(acRooms)) + parseInt(extra);
    let data = { extra: extra, total: total };
    console.log(data);
    return data;
}
module.exports = { find };