const rates = require('../data/exchange-rates.json');

function getExchangeRates(req, res) {
  res.json({
    success: true,
    count: rates.length,
    data: rates,
  });
}

function getExchangeRateByCurrency(req, res) {
  const currency = req.params.currency.toUpperCase();
  const rate = rates.find((item) => item.currency === currency);

  if (!rate) {
    return res.status(404).json({
      success: false,
      error: `Exchange rate for ${req.params.currency} not found`,
      statusCode: 404,
    });
  }

  res.json({
    success: true,
    data: rate,
  });
}

module.exports = {
  getExchangeRates,
  getExchangeRateByCurrency,
};
