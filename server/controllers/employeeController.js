const { omitUndefined } = require("mongoose");
const Employee = require("../models/EmployeeModel")

async function getEmployee(req, res, next) {
    try {
        const { id, search } = req.query;

        let data;

        if (id) {
            let data = await Employee.findById(id);
            data = { id: data._id, img: data.Image, firstName: data.FirstName, lastName: data.LastName, email: data.Email, mobile: data.Mobile, designation: data.Designation, gender: data.Gender, course: data.Course, createDate: data.Createdate }
        }
        else if (search) {
            let employeeData = await Employee.find({
                $or: [
                    { FirstName: new RegExp(".*" + search.split("").join(".*") + ".*", "i") },
                    { LastName: new RegExp(".*" + search.split("").join(".*") + ".*", "i") },
                    { Mobile: new RegExp(".*" + search.split("").join(".*") + ".*", "i") },
                    { Email: new RegExp(".*" + search.split("").join(".*") + ".*", "i") },
                ]
            });

            data = employeeData.map((data) => { return { id: data._id, img: data.Image, firstName: data.FirstName, lastName: data.LastName, email: data.Email, mobile: data.Mobile, designation: data.Designation, gender: data.Gender, course: data.Course, createDate: data.Createdate } });
        }
        else {
            let employeeData = await Employee.find();

            data = employeeData.map((data) => { return { id: data._id, img: data.Image, firstName: data.FirstName, lastName: data.LastName, email: data.Email, mobile: data.Mobile, designation: data.Designation, gender: data.Gender, course: data.Course, createDate: data.Createdate } });
        }

        const totalDocumentCount = await Employee.countDocuments();

        return res.status(200).send({ success: true, msg: "Successfully retrieved Employee.", data: data, totalDocumentCount });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, msg: "Could not retrieve Employee." });
    }
}

async function createEmployee(req, res, next) {
    try {
        const { firstName, lastName, email, mobile, designation, gender, course, profilePic } = req.body;

        const data = await Employee.create({ FirstName: firstName, LastName: lastName, Email: email, Mobile: mobile, Designation: designation, Gender: gender, Course: course, Image: Object.values(profilePic), Createdate: Date.now() });

        res.status(201).send({ success: true, msg: "Successfully retrieved Employee.", data: data });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: "Could not create Employee." });
    }
}

async function updateEmployee(req, res, next) {
    try {
        const { id, firstName, lastName, email, mobile, designation, gender, course, profilePic } = req.body;

        const data = await Employee.findByIdAndUpdate(id,
            {
                FirstName: firstName && firstName != "" ? firstName : undefined,
                LastName: lastName && lastName != "" ? lastName : undefined,
                Email: email && email != "" ? email : undefined,
                Mobile: mobile && mobile != "" ? mobile : undefined,
                Designation: designation && designation != "" ? designation : undefined,
                Gender: gender && gender != "" ? gender : undefined,
                Course: course && course != "" ? course : undefined,
                Image: profilePic && Object.values(profilePic).length != 0 ? Object.values(profilePic) : undefined
            },
            { new: true }
        );

        return res.status(201).send({ success: true, msg: "Successfully updated Employee.", data: {id: data.id, firstName: data.FirstName, lastName: data.LastName, email: data.Email, mobile: data.Mobile, designation: data.Designation, gender: data.Gender, course: data.Course, image: data.Image} });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, msg: "Could not update Employee." });
    }
}

async function deleteEmployee(req, res, next) {
    try {
        const { id } = req.query;

        const data = await Employee.findByIdAndDelete(id);

        return res.status(200).send({ success: true, msg: "Successfully deleted Employee."});
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, msg: "Could not delete Employee." });
    }
}

module.exports = { getEmployee, createEmployee, updateEmployee, deleteEmployee };