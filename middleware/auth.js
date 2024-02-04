const { check } = require('../mongodb.js');
exports.authMiddleware = async(req, res, next) => {
    if(parseInt(await check()) == 0|| parseInt(await check()) == 3|| parseInt(await check())==99){
        res.redirect("/login");
    }
    else{
        next(); 
    }
}