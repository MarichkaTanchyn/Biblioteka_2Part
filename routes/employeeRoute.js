const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
router.get('/',employeeController.showEmployeeList);
router.get('/add',employeeController.showAddEmployeeForm);
router.get('/details/:empId',employeeController.showEmployeeDetails);
router.get('/edit/:empId', employeeController.showEditEmployee);
module.exports = router;