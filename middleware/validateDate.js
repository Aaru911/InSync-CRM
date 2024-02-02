
exports.validateDateMiddleware = (req, res, next) => {
    const { checkin, checkout } = req.body;

    if (checkin < checkout) {
        console.log("Check-in date is correct");
        next(); 
    } else {
        console.log("Check-in date should be less than check-out date");
        return res.redirect("/entries/add");
    }
};

