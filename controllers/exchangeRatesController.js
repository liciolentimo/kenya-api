const { fetchLiveRates } = require('../services/exchangeRateService');

async function getAllRates(req, res, next) {
  try {
    const ratesPayload = await fetchLiveRates();
    let { data } = ratesPayload;

    if (req.query.q) {
      const term = String(req.query.q).trim().toLowerCase();
      data = data.filter(
        (r) =>
          r.currency.toLowerCase().includes(term) ||
          r.currency_name.toLowerCase().includes(term)
      );
    }

    res.status(200).json({
      success: true,
      base_currency: ratesPayload.base_currency,
      last_updated: ratesPayload.last_updated,
      next_update: ratesPayload.next_update,
      source: ratesPayload.source,
      ...(ratesPayload.stale && {
        stale: true,
        warning: ratesPayload.warning,
      }),
      count: data.length,
      data,
    });
  } catch (err) {
    err.statusCode = 503;
    err.message = 'Unable to fetch live exchange rates at this time';
    next(err);
  }
}

async function getRateByCurrency(req, res, next) {
  try {
    const code = req.params.currency.toUpperCase();
    const ratesPayload = await fetchLiveRates();
    const rate = ratesPayload.data.find((r) => r.currency === code);

    if (!rate) {
      const err = new Error(
        `Currency '${code}' not found. Use GET /api/v1/exchange-rates to see all available currencies.`
      );
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json({
      success: true,
      base_currency: ratesPayload.base_currency,
      last_updated: ratesPayload.last_updated,
      source: ratesPayload.source,
      data: rate,
    });
  } catch (err) {
    err.statusCode = 503;
    err.message = 'Unable to fetch live exchange rates at this time';
    next(err);
  }
}

module.exports = { getAllRates, getRateByCurrency };
