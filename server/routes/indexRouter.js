const express = require("express");

const employeeRouter = require("./employeeRouter");
const loginRouter = require("./loginRouter");

const router = express.Router();

router.use("/employee", employeeRouter);

router.use("/login", loginRouter);

module.exports = router;