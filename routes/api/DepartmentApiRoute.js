const express = require('express');
const router = express.Router();
const empApiController = require('../../api/DepartmentAPI');
router.get('/', empApiController.getDepartments);
router.get('/:deptId', empApiController.getDepartmentsById);
router.post('/', empApiController.createDepartment);
router.put('/:deptId', empApiController.updateDepartment);
router.delete('/:deptId', empApiController.deleteDepartment);
module.exports = router;
