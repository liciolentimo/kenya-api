const express = require('express');
const { getPopulationSummary, getPopulationByCounty } = require('../controllers/populationController');

const router = express.Router();

router.get('/', getPopulationSummary);
router.get('/counties', getPopulationByCounty);

module.exports = router;
