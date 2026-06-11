const express = require('express');
const { getCounties, getCountyById, getCountyGovernors, getConstituenciesByCounty } = require('../controllers/countiesController');

const router = express.Router();

router.get('/', getCounties);
router.get('/governors', getCountyGovernors);
router.get('/:id/constituencies', getConstituenciesByCounty);
router.get('/:id', getCountyById);

module.exports = router;
