const express = require('express');
const { getExchangeRates, getExchangeRateByCurrency } = require('../controllers/exchangeRatesController');

const router = express.Router();

router.get('/', getExchangeRates);
router.get('/:currency', getExchangeRateByCurrency);

module.exports = router;
