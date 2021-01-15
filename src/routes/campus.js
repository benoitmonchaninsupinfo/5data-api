const express = require('express');
const router = express.Router();

const CampusController = require('../controllers/CampusController');
const campusController = new CampusController();

router.get('/', (req, res) => {
    campusController.findAllCampus(req, res);
});

module.exports = router;
