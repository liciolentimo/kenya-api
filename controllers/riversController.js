const rivers = require('../data/rivers.json');

const getAllRivers = (req, res) => {
  let result = [...rivers];
  const { sort, drainage_system } = req.query;

  if (drainage_system) {
    result = result.filter(
      (r) => r.drainage_system.toLowerCase() === drainage_system.toLowerCase()
    );
  }
  if (sort === 'length_desc') {
    result.sort((a, b) => b.length_km - a.length_km);
  }
  if (sort === 'length_asc') {
    result.sort((a, b) => a.length_km - b.length_km);
  }

  res.status(200).json({ success: true, count: result.length, data: result });
};

const getRiverById = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const river = rivers.find((r) => r.id === id);

  if (!river) {
    const err = new Error(`River with ID ${id} not found`);
    err.statusCode = 404;
    return next(err);
  }
  res.status(200).json({ success: true, data: river });
};

const getRiversByCounty = (req, res, next) => {
  const cid = parseInt(req.params.county_id, 10);
  const result = rivers.filter((r) => r.county_ids.includes(cid));

  if (result.length === 0) {
    const err = new Error(`No rivers found for county ID ${cid}`);
    err.statusCode = 404;
    return next(err);
  }

  res.status(200).json({ success: true, county_id: cid, count: result.length, data: result });
};

const getRiversByDrainageSystem = (req, res) => {
  const system = decodeURIComponent(req.params.system);
  const result = rivers.filter(
    (r) => r.drainage_system.toLowerCase() === system.toLowerCase()
  );

  res.status(200).json({
    success: true,
    drainage_system: system,
    count: result.length,
    data: result,
  });
};

const searchRivers = (req, res) => {
  const { q } = req.query;
  if (!q || q.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Query param ?q= must be at least 2 characters',
      statusCode: 400,
    });
  }

  const term = q.toLowerCase().trim();
  const result = rivers.filter(
    (r) =>
      r.name.toLowerCase().includes(term) ||
      r.source.toLowerCase().includes(term) ||
      r.mouth.toLowerCase().includes(term) ||
      r.description.toLowerCase().includes(term) ||
      r.counties.some((c) => c.toLowerCase().includes(term))
  );

  res.status(200).json({ success: true, query: q, count: result.length, data: result });
};

module.exports = {
  getAllRivers,
  getRiverById,
  getRiversByCounty,
  getRiversByDrainageSystem,
  searchRivers,
};
