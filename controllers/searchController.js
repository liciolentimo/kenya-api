const counties = require('../data/counties.json');
const constituencies = require('../data/constituencies.json');
const holidays = require('../data/holidays.json');
const institutions = require('../data/institutions.json');
const ministries = require('../data/ministries.json');
const postalCodes = require('../data/postal-codes.json');
const wardsData = require('../data/wards.json');
const parksData = require('../data/parks.json');
const presidentsFile = require('../data/presidents.json');
const presidentsData = presidentsFile.presidents;
const { fetchLiveRates } = require('../services/exchangeRateService');

const STATIC_CONFIGS = [
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
  {
    name: 'parks',
    data: parksData,
    fields: ['name', 'famous_for', 'region', 'description'],
    endpoint: '/api/v1/parks',
  },
  {
    name: 'presidents',
    data: presidentsData,
    fields: ['name', 'political_party', 'description'],
    endpoint: '/api/v1/presidents',
  },
];

async function globalSearch(req, res) {
  const { q, type } = req.query;

  if (!q || q.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Query param ?q= must be at least 2 characters',
      statusCode: 400,
    });
  }

  let exchangeRatesData = [];
  try {
    const ratesPayload = await fetchLiveRates();
    exchangeRatesData = ratesPayload.data;
  } catch (e) {
    // fail gracefully — exclude exchange_rates from results
  }

  const searchConfigs = [
    ...STATIC_CONFIGS,
    {
      name: 'exchange_rates',
      data: exchangeRatesData,
      fields: ['currency', 'currency_name'],
      endpoint: '/api/v1/exchange-rates',
    },
  ];

  const term = q.toLowerCase().trim();

  const configs = type
    ? searchConfigs.filter((c) => c.name === type.toLowerCase())
    : searchConfigs;

  const results = {};
  let totalCount = 0;

  configs.forEach((config) => {
    const matches = config.data.filter((item) =>
      config.fields.some((field) => item[field] && item[field].toLowerCase().includes(term))
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
