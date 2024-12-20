const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    Image: {
        type: Buffer,
        required: true,
    },
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Mobile: {
        type: String,
        minlength: 10,
        maxlength: 10,
        required: true,
    },
    Designation: {
        type: String,
        enum: ["HR", "MANAGER", "SALES"],
        require: true,
    },
    Gender: {
        type: String,
        enum: ["MALE", "FEMALE", "OTHER"],
        require: true,
    },
    Course: {
        type: String,
        enum: ["MCA", "BCA", "BSC"],
        require: true,
    },
    Createdate: {
        type: Date,
        require: true,
        immutable: true,
    }
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;