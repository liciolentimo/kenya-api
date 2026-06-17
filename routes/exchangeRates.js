const express = require('express');
const { getAllRates, getRateByCurrency } = require('../controllers/exchangeRatesController');

const router = express.Router();

router.get('/', getAllRates);
router.get('/:currency', getRateByCurrency);

module.exports = router;
