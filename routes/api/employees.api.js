const express = require('express');
const router = express.Router();

const employeesApiController = require('../../src/controllers/api/EmployeesApiController');

router.get('/get-all', employeesApiController.getAll);
router.post('/create', employeesApiController.create);
router.put('/update/:id', employeesApiController.update);
router.delete('/delete/:id', employeesApiController.delete);

module.exports = router;