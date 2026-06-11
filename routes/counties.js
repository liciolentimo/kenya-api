const express = require('express');
const { getCounties, getCountyById, getConstituenciesByCounty } = require('../controllers/countiesController');

const router = express.Router();

router.get('/', getCounties);
router.get('/:id/constituencies', getConstituenciesByCounty);
router.get('/:id', getCountyById);

module.exports = router;
