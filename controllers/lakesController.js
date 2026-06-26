const lakes = require('../data/lakes.json');

// GET /api/v1/lakes
// ?type=Freshwater  ?rift_valley=true  ?transboundary=true  ?sort=size_desc
const getAllLakes = (req, res) => {
  let result = [...lakes];
  const { type, rift_valley, transboundary, sort } = req.query;

  if (type) {
    result = result.filter(
      (l) => l.lake_type.toLowerCase() === type.toLowerCase()
    );
  }
  if (rift_valley === 'true') {
    result = result.filter((l) => l.is_rift_valley === true);
  }
  if (transboundary === 'true') {
    result = result.filter((l) => l.transboundary === true);
  }
  if (sort === 'size_desc') {
    result.sort((a, b) => b.surface_area_km2 - a.surface_area_km2);
  }
  if (sort === 'size_asc') {
    result.sort((a, b) => a.surface_area_km2 - b.surface_area_km2);
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result,
  });
};

// GET /api/v1/lakes/:id
const getLakeById = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const lake = lakes.find((l) => l.id === id);

  if (!lake) {
    const err = new Error(`Lake with ID ${id} not found`);
    err.statusCode = 404;
    return next(err);
  }
  res.status(200).json({ success: true, data: lake });
};

// GET /api/v1/lakes/county/:county_id
const getLakesByCounty = (req, res, next) => {
  const cid = parseInt(req.params.county_id, 10);
  const result = lakes.filter((l) => l.county_ids.includes(cid));

  if (result.length === 0) {
    const err = new Error(`No lakes found for county ID ${cid}`);
    err.statusCode = 404;
    return next(err);
  }

  res.status(200).json({
    success: true,
    county_id: cid,
    count: result.length,
    data: result,
  });
};

// GET /api/v1/lakes/search?q=
const searchLakes = (req, res) => {
  const { q } = req.query;
  if (!q || q.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Query param ?q= must be at least 2 characters',
      statusCode: 400,
    });
  }

  const term = q.toLowerCase().trim();
  const result = lakes.filter(
    (l) =>
      l.name.toLowerCase().includes(term) ||
      l.key_feature.toLowerCase().includes(term) ||
      l.description.toLowerCase().includes(term) ||
      l.counties.some((c) => c.toLowerCase().includes(term))
  );

  res.status(200).json({
    success: true,
    query: q,
    count: result.length,
    data: result,
  });
};

module.exports = {
  getAllLakes,
  getLakeById,
  getLakesByCounty,
  searchLakes,
};
