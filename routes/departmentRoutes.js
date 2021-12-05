const express = require('express');
const router = express.Router();
const deptController = require('../controllers/departmentController');

router.get('/',deptController.showDeptList);
router.get('/add',deptController.showAddDeptForm);
router.get('/details/:empId',deptController.showDeptDetails);
router.get('/edit/:empId', deptController.showDept);
// router.post('/add', deptController.addDept);
// router.post('/edit', deptController.updateDept);
// router.get('/delete/:id', deptController.deleteDept);

module.exports = router;