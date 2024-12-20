const Login = require("../models/LoginModel")

async function isAuthenticated(req, res, next) {
    try {
        let adminLogin = true;
        
        if (!adminLogin){
            throw "err";
        }

        return next();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: "Access Denied" });
    }
}

module.exports = { isAuthenticated };