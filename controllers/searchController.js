const counties = require('../data/counties.json');
const constituencies = require('../data/constituencies.json');
const holidays = require('../data/holidays.json');
const institutions = require('../data/institutions.json');
const ministries = require('../data/ministries.json');
const exchangeRates = require('../data/exchange-rates.json');
const postalCodes = require('../data/postal-codes.json');
const wardsData = require('../data/wards.json');

const searchConfigs = [
  {
    name: 'counties',
    data: counties,
    fields: ['name', 'headquarters', 'region', 'governor', 'description'],
    endpoint: '/api/v1/counties',
  },
  {
    name: 'constituencies',
    data: constituencies,
    fields: ['name', 'county_name'],
    endpoint: '/api/v1/constituencies',
  },
  {
    name: 'holidays',
    data: holidays,
    fields: ['name', 'type'],
    endpoint: '/api/v1/holidays',
  },
  {
    name: 'institutions',
    data: institutions,
    fields: ['name', 'type', 'category', 'county_name', 'constituency', 'address'],
    endpoint: '/api/v1/institutions',
  },
  {
    name: 'ministries',
    data: ministries,
    fields: ['ministry', 'cabinet_secretary'],
    endpoint: '/api/v1/ministries',
  },
  {
    name: 'exchange_rates',
    data: exchangeRates,
    fields: ['currency', 'currency_name'],
    endpoint: '/api/v1/exchange-rates',
  },
  {
    name: 'postal_codes',
    data: postalCodes,
    fields: ['county_name', 'primary_postal_code'],
    endpoint: '/api/v1/postal-codes',
  },
  {
    name: 'wards',
    data: wardsData,
    fields: ['ward', 'sub_county_name', 'county_name'],
    endpoint: '/api/v1/wards',
  },
];

function globalSearch(req, res) {
  const { q, type } = req.query;

  if (!q || q.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Query param ?q= must be at least 2 characters',
      statusCode: 400,
    });
  }

  const term = q.toLowerCase().trim();

  const configs = type
    ? searchConfigs.filter((c) => c.name === type.toLowerCase())
    : searchConfigs;

  const results = {};
  let totalCount = 0;

  configs.forEach((config) => {
    const matches = config.data.filter((item) =>
      config.fields.some(
        (field) => item[field] && item[field].toLowerCase().includes(term)
      )
    );
    results[config.name] = {
      count: matches.length,
      endpoint: config.endpoint,
      data: matches,
    };
    totalCount += matches.length;
  });

  res.status(200).json({
    success: true,
    query: q,
    type: type || 'all',
    total_results: totalCount,
    results,
  });
}

module.exports = { globalSearch };
