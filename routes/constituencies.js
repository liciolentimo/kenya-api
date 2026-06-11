const express = require('express');
const { getAllConstituencies, getConstituencyById } = require('../controllers/constituenciesController');

const router = express.Router();

router.get('/', getAllConstituencies);
router.get('/:id', getConstituencyById);

module.exports = router;
