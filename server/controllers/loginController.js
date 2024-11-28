const Login = require("../models/LoginModel")

async function getLogin(req, res, next){
    try{
        const {userName, password} = req.query;

        const data = await Login.findOne({Username: userName, Password: password});

        res.status(200).send({success: true, msg: "Successfully retrieved Login.", data: data});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, msg: "Could not create Login."});
    }
}

async function createLogin(req, res, next){
    try{
        const {userName, password} = req.body;

        const data = await Login.create({Username: userName, Password: password});

        res.status(201).send({success: true, msg: "Successfully created Login.", data: data});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, msg: "Could not create Login."});
    }
}

module.exports = {getLogin, createLogin}