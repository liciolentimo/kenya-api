const parks = require('../data/parks.json');

const getAllParks = (req, res) => {
  let result = [...parks];

  if (req.query.type) {
    result = result.filter((p) => p.type.toLowerCase() === req.query.type.toLowerCase());
  }
  if (req.query.marine === 'true') {
    result = result.filter((p) => p.marine === true);
  }
  if (req.query.big_cats === 'true') {
    result = result.filter((p) => p.big_cats === true);
  }
  if (req.query.most_visited === 'true') {
    result = result.filter((p) => p.most_visited === true);
  }
  if (req.query.county_id) {
    const cid = parseInt(req.query.county_id, 10);
    result = result.filter((p) => p.county_ids.includes(cid));
  }

  res.status(200).json({
    success: true,
    count: result.length,
    managed_by: 'Kenya Wildlife Service (KWS)',
    data: result,
  });
};

const getParkById = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const park = parks.find((p) => p.id === id);

  if (!park) {
    const err = new Error(`Park with ID ${id} not found`);
    err.statusCode = 404;
    return next(err);
  }

  res.status(200).json({ success: true, data: park });
};

const getParksByCounty = (req, res, next) => {
  const cid = parseInt(req.params.county_id, 10);
  const result = parks.filter((p) => p.county_ids.includes(cid));

  if (result.length === 0) {
    const err = new Error(`No parks found for county ID ${cid}`);
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

const getParksByType = (req, res) => {
  const type = decodeURIComponent(req.params.type).toLowerCase();
  const result = parks.filter((p) => p.type.toLowerCase() === type);

  res.status(200).json({
    success: true,
    type: decodeURIComponent(req.params.type),
    count: result.length,
    data: result,
  });
};

const searchParks = (req, res) => {
  const { q } = req.query;

  if (!q || q.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Query param ?q= must be at least 2 characters',
      statusCode: 400,
    });
  }

  const term = q.toLowerCase().trim();
  const result = parks.filter(
    (p) =>
      p.name.toLowerCase().includes(term) ||
      p.famous_for.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.region.toLowerCase().includes(term) ||
      p.counties.some((c) => c.toLowerCase().includes(term))
  );

  res.status(200).json({
    success: true,
    query: q,
    count: result.length,
    data: result,
  });
};

module.exports = {
  getAllParks,
  getParkById,
  getParksByCounty,
  getParksByType,
  searchParks,
};
