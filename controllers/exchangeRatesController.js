const rates = require('../data/exchange-rates.json');

function getExchangeRates(req, res) {
  const firstRate = rates[0] || {};
  res.json({
    success: true,
    base_currency: 'KES',
    last_updated: firstRate.last_updated || '2026-04-23',
    source: firstRate.source || 'Central Bank of Kenya',
    count: rates.length,
    data: rates,
  });
}

function getExchangeRateByCurrency(req, res) {
  const currency = req.params.currency.toUpperCase();
  const rate = rates.find((item) => item.currency === currency);

  if (!rate) {
    const availableCodes = rates.map((r) => r.currency).join(', ');
    return res.status(404).json({
      success: false,
      error: `Currency '${req.params.currency}' not found. Use GET /api/v1/exchange-rates to see all available currencies.`,
      available_currencies: availableCodes,
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
