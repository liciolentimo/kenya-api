const wards = require('../data/wards.json');

function getUniqueSubCounties(county_id) {
  const seen = new Set();
  return wards
    .filter((w) => w.county_id === county_id)
    .filter((w) => {
      if (seen.has(w.sub_county_name)) return false;
      seen.add(w.sub_county_name);
      return true;
    })
    .map((w) => ({
      sub_county_id:   w.sub_county_id,
      sub_county_name: w.sub_county_name,
      county_id:       w.county_id,
      county_name:     w.county_name,
    }));
}

// GET /api/v1/wards  ?county_id  ?sub_county  ?page  ?limit
const getAllWards = (req, res) => {
  let result = [...wards];
  const { county_id, sub_county, page, limit } = req.query;

  if (county_id) {
    result = result.filter((w) => w.county_id === parseInt(county_id, 10));
  }

  if (sub_county) {
    const term = sub_county.toLowerCase();
    result = result.filter((w) => w.sub_county_name.toLowerCase().includes(term));
  }

  const pageNum   = parseInt(page  || '1',  10);
  const limitNum  = parseInt(limit || '50', 10);
  const total     = result.length;
  const start     = (pageNum - 1) * limitNum;
  const paginated = result.slice(start, start + limitNum);

  res.status(200).json({
    success:    true,
    total,
    count:      paginated.length,
    page:       pageNum,
    totalPages: Math.ceil(total / limitNum),
    data:       paginated,
  });
};

// GET /api/v1/wards/county/:county_id — grouped by sub-county
const getWardsByCounty = (req, res, next) => {
  const id     = parseInt(req.params.county_id, 10);
  const result = wards.filter((w) => w.county_id === id);

  if (result.length === 0) {
    const err = new Error(`No wards found for county ID ${id}`);
    err.statusCode = 404;
    return next(err);
  }

  const grouped = {};
  result.forEach((w) => {
    if (!grouped[w.sub_county_name]) {
      grouped[w.sub_county_name] = {
        sub_county_id:   w.sub_county_id,
        sub_county_name: w.sub_county_name,
        wards:           [],
      };
    }
    grouped[w.sub_county_name].wards.push(w.ward);
  });

  res.status(200).json({
    success:      true,
    county_id:    id,
    county_name:  result[0].county_name,
    sub_counties: Object.keys(grouped).length,
    ward_count:   result.length,
    data:         Object.values(grouped),
  });
};

// GET /api/v1/wards/sub-county?name=
const getWardsBySubCounty = (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({
      success:    false,
      error:      'Query param ?name= is required',
      statusCode: 400,
    });
  }

  const term   = name.toLowerCase();
  const result = wards.filter((w) => w.sub_county_name.toLowerCase().includes(term));

  if (result.length === 0) {
    return res.status(404).json({
      success:    false,
      error:      `No wards found for sub-county "${name}"`,
      statusCode: 404,
    });
  }

  const grouped = {};
  result.forEach((w) => {
    const key = w.sub_county_name;
    if (!grouped[key]) {
      grouped[key] = {
        sub_county_id:   w.sub_county_id,
        sub_county_name: key,
        county_id:       w.county_id,
        county_name:     w.county_name,
        wards:           [],
      };
    }
    grouped[key].wards.push(w.ward);
  });

  res.status(200).json({
    success: true,
    count:   result.length,
    data:    Object.values(grouped),
  });
};

// GET /api/v1/wards/sub-counties/:county_id
const getSubCountiesByCounty = (req, res, next) => {
  const id     = parseInt(req.params.county_id, 10);
  const result = getUniqueSubCounties(id);

  if (result.length === 0) {
    const err = new Error(`No sub-counties found for county ID ${id}`);
    err.statusCode = 404;
    return next(err);
  }

  const countyName = wards.find((w) => w.county_id === id)?.county_name || '';

  res.status(200).json({
    success:     true,
    county_id:   id,
    county_name: countyName,
    count:       result.length,
    data:        result,
  });
};

// GET /api/v1/wards/search?q=
const searchWards = (req, res) => {
  const { q } = req.query;

  if (!q || q.trim().length < 2) {
    return res.status(400).json({
      success:    false,
      error:      'Query param ?q= must be at least 2 characters',
      statusCode: 400,
    });
  }

  const term   = q.toLowerCase().trim();
  const result = wards.filter(
    (w) =>
      w.ward.toLowerCase().includes(term) ||
      w.sub_county_name.toLowerCase().includes(term) ||
      w.county_name.toLowerCase().includes(term)
  );

  res.status(200).json({
    success: true,
    query:   q,
    count:   result.length,
    data:    result,
  });
};

module.exports = {
  getAllWards,
  getWardsByCounty,
  getWardsBySubCounty,
  searchWards,
  getSubCountiesByCounty,
};
