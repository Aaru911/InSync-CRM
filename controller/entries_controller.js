const mongo = require('../mongodb.js');
const { find } = require('../utils/calculate.js');

exports.get_add_entries = async (req, res) => {
    try {
        const data = await mongo.user.find();
        res.render("entries/add", { data });
    } catch (error) {
        console.log(error);
    }
};

exports.post_add_entries = async (req, res) => {
    var enquiry = req.body;
    enquiry.user = new mongo.ObjectId(enquiry.user_id);
    const data = find(enquiry);
    enquiry.Paid = 0;
    enquiry.Pending_amount = data.total;
    try {
        await mongo.enquiry.insertMany(enquiry);
    } catch (error) {
        console.log(error);
        res.redirect("/entries/add");
    }
    res.redirect("/entries/view");
}

exports.post_view_entries = async (req, res) => {
    var enquiry = req.body;
    const data = find(enquiry);
    console.log(data);
    enquiry.Paid = 0;
    enquiry.Pending_amount = data.total;
    if (enquiry.checkin < enquiry.checkout) {
        try {
            await mongo.enquiry.updateOne({ _id: req.params.id }, enquiry);
        } catch (error) {
            console.log(error);
        }
        res.redirect('/entries/view');
    } else {
        console.log("Checkin date should be less than checkout date");
        res.redirect("/entries/edit/" + req.params.id);
    }
}