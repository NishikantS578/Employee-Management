const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    Image: {
        type: Buffer,
        required: true,
        
    },
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Mobile: {
        type: Number,
        min: 1000000000,
        max: 9999999999,
        required: true,
    },
    Designation: {
        type: String,
        enum: ["HR", "Manager", "Sales"],
        require: true,
    },
    Gender: {
        type: String,
        enum: ["M", "F"],
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