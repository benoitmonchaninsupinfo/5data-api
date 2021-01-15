const express = require('express');
const router = express.Router();

const StudentController = require('../controllers/StudentController');
const studentController = new StudentController();

router.get('/', (req, res) => {
    studentController.findAllStudent(req, res);
});

router.get('/best', (req, res) => {
    studentController.findBestStudents(req, res);
});

router.get('/count', (req, res) => {
    studentController.findStudentsCountByCampus(req, res);
});

module.exports = router;
