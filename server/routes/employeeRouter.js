const express = require("express");

const Employee = require("../models/EmployeeModel");
const { isAuthenticated } = require("../middlewares/auth");
const { getEmployee, createEmployee, updateEmployee, deleteEmployee } = require("../controllers/employeeController");

const router = express.Router();

router.get("/", isAuthenticated, getEmployee);

router.post("/", isAuthenticated, createEmployee);

router.put("/", isAuthenticated, updateEmployee);

router.delete("/", isAuthenticated, deleteEmployee);

module.exports = router