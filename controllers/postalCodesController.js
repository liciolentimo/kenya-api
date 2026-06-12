const postalCodes = require('../data/postal-codes.json');

const getAllPostalCodes = (req, res) => {
  res.status(200).json({
    success: true,
    count: postalCodes.length,
    source: 'Posta Kenya / PostZipCode.com',
    data: postalCodes,
  });
};

const getPostalCodeByCounty = (req, res, next) => {
  const id = parseInt(req.params.county_id, 10);
  const entry = postalCodes.find((p) => p.county_id === id);
  if (!entry) {
    const err = new Error(`No postal code data found for county ID ${id}`);
    err.statusCode = 404;
    return next(err);
  }
  res.status(200).json({ success: true, data: entry });
};

const getPostalCodeByConstituency = (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({
      success: false,
      error: 'Query param ?name= is required',
      statusCode: 400,
    });
  }
  const term = name.toLowerCase();
  const results = [];
  postalCodes.forEach((county) => {
    county.constituencies.forEach((c) => {
      if (c.name.toLowerCase().includes(term)) {
        results.push({
          county_id:           county.county_id,
          county_name:         county.county_name,
          constituency:        c.name,
          postal_code:         c.postal_code,
          county_postal_range: county.postal_code_range,
        });
      }
    });
  });
  if (results.length === 0) {
    return res.status(404).json({
      success: false,
      error: `No postal code found for constituency "${name}"`,
      statusCode: 404,
    });
  }
  res.status(200).json({ success: true, count: results.length, data: results });
};

const searchPostalCodes = (req, res) => {
  const { q } = req.query;
  if (!q || q.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Query param ?q= must be at least 2 characters',
      statusCode: 400,
    });
  }
  const term = q.toLowerCase().trim();
  const results = [];
  postalCodes.forEach((county) => {
    if (
      county.county_name.toLowerCase().includes(term) ||
      county.primary_postal_code.includes(term)
    ) {
      results.push({
        type:                'county',
        county_id:           county.county_id,
        county_name:         county.county_name,
        primary_postal_code: county.primary_postal_code,
        postal_code_range:   county.postal_code_range,
      });
    }
    county.constituencies.forEach((c) => {
      if (c.name.toLowerCase().includes(term) || c.postal_code.includes(term)) {
        results.push({
          type:         'constituency',
          county_id:    county.county_id,
          county_name:  county.county_name,
          constituency: c.name,
          postal_code:  c.postal_code,
        });
      }
    });
  });
  res.status(200).json({
    success: true,
    query: q,
    count: results.length,
    data: results,
  });
};

module.exports = {
  getAllPostalCodes,
  getPostalCodeByCounty,
  getPostalCodeByConstituency,
  searchPostalCodes,
};
