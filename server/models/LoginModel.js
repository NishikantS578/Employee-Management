const mongoose = require("mongoose")

const loginSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
});

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;