const Employee = require("../models/EmployeeModel")

async function getEmployee(req, res, next){
    try{
        const {id} = req.query;

        const data = await Employee.findById(id);

        res.status(200).send({success: true, msg: "Successfully retrieved Employee.", data: data});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, msg: "Could not retrieve Employee."});
    }
}

async function createEmployee(req, res, next){
    try{
        const {image, name, email, mobile, designation, gender, course} = req.body;

        const data = await Employee.create({Image: image, Name: name, Email: email, Mobile: mobile, Designation: designation, Gender: gender, Course: course});

        res.status(201).send({success: true, msg: "Successfully retrieved Employee.", data: data});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, msg: "Could not create Employee."});
    }
}

async function updateEmployee(req, res, next){
    try{
        const {id, image, name, email, mobile, designation, gender, course} = req.body;

        const data = await Employee.findByIdAndUpdate(id, {Image: image, Name: name, Email: email, Mobile: mobile, Designation: designation, Gender: gender, Course: course}, {new: true});

        res.status(201).send({success: true, msg: "Successfully updated Employee.", data: data});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, msg: "Could not update Employee."});
    }
}

async function deleteEmployee(req, res, next){
    try{
        const {id} = req.query;

        const data = await Employee.findByIdAndDelete(id);

        res.status(200).send({success: true, msg: "Successfully deleted Employee.", data: data});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success: false, msg: "Could not delete Employee."});
    }
}

module.exports = {getEmployee, createEmployee, updateEmployee, deleteEmployee};