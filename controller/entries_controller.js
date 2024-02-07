const mongo = require('../mongodb.js');

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
    console.log(enquiry);
    enquiry.user = new mongo.ObjectId(enquiry.user_id);
    try {
        await mongo.enquiry.insertMany(enquiry);
    } catch (error) {
        console.log(error);
        res.redirect("/entries/add");
    }
    res.redirect("/entries/view");
} 
