const express = require('express');
const router = express.Router();
const employmentController = require('../controllers/employmentController');
router.get('/',employmentController.showEmploymentList);
router.get('/add',employmentController.showAddEmploymentForm);
router.get('/details/:empId',employmentController.showEmploymentDetails);
router.get('/edit/:empId', employmentController.showEditEmployment);
module.exports = router;