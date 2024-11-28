const Login = require("../models/LoginModel")

async function isAuthenticated(req, res, next) {
    try {
        const credentials = req.headers.authorization;

        const credentialString = Buffer.from(credentials.split(' ')[1], "base64").toString();

        const [userName, password] = credentialString.split(":");

        const adminLogin = await Login.findOne({ Username: userName, Password: password });

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