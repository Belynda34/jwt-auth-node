const express = require("express");
const { createEmployee, getEmployees } = require("../controllers/EmployeeController.js");
const {isAuthenticated} = require("../middlewares/isAuthenticated.js");
// const {authorize} = require("../middlewares/authorize.js")
 
const router = express.Router();

router.use(isAuthenticated);

router.post('/create',createEmployee)
router.get('/', getEmployees)


module.exports= router