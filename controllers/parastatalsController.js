const parastatals = require('../data/parastatals.json');

const VALID_SECTORS = [
  'Agriculture',
  'Education & Research',
  'Energy',
  'Finance & Regulation',
  'Health',
  'ICT & Innovation',
  'Infrastructure & Transport',
  'Justice & Governance',
  'Labour & Social Welfare',
  'Land & Water',
  'Media & Culture',
  'Security & Public Safety',
  'Tourism & Wildlife',
  'Trade & Industry',
  'Youth & Sports',
  'Other',
];

// GET /api/v1/parastatals
// ?sector=Health  ?is_university=false  ?q=kra  ?page=1&limit=50
const getAllParastatals = (req, res) => {
  let result = [...parastatals];
  const { sector, is_university, q, page, limit } = req.query;

  if (sector) {
    result = result.filter(
      (p) => p.sector.toLowerCase() === sector.toLowerCase()
    );
  }

  if (is_university !== undefined) {
    const flag = is_university === 'true';
    result = result.filter((p) => p.is_university === flag);
  }

  if (q) {
    const term = q.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        (p.abbreviation && p.abbreviation.toLowerCase().includes(term))
    );
  }

  const pageNum = parseInt(page || '1', 10);
  const limitNum = parseInt(limit || '50', 10);
  const total = result.length;
  const start = (pageNum - 1) * limitNum;
  const paginated = result.slice(start, start + limitNum);

  res.status(200).json({
    success: true,
    total,
    count: paginated.length,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
    established_under: 'State Corporations Act, Cap 446',
    data: paginated,
  });
};

// GET /api/v1/parastatals/:id
const getParastatalById = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const item = parastatals.find((p) => p.id === id);

  if (!item) {
    const err = new Error(`Parastatal with ID ${id} not found`);
    err.statusCode = 404;
    return next(err);
  }

  res.status(200).json({ success: true, data: item });
};

// GET /api/v1/parastatals/sector/:sector
const getParastatalsBySector = (req, res, next) => {
  const sector = decodeURIComponent(req.params.sector);
  const result = parastatals.filter(
    (p) => p.sector.toLowerCase() === sector.toLowerCase()
  );

  if (result.length === 0) {
    const err = new Error(`No parastatals found for sector "${sector}"`);
    err.statusCode = 404;
    return next(err);
  }

  res.status(200).json({
    success: true,
    sector,
    count: result.length,
    data: result,
  });
};

// GET /api/v1/parastatals/sectors
const getSectorList = (req, res) => {
  const counts = {};
  parastatals.forEach((p) => {
    counts[p.sector] = (counts[p.sector] || 0) + 1;
  });

  const data = Object.entries(counts)
    .map(([sector, count]) => ({ sector, count }))
    .sort((a, b) => b.count - a.count);

  res.status(200).json({
    success: true,
    count: data.length,
    data,
  });
};

// GET /api/v1/parastatals/search?q=
const searchParastatals = (req, res) => {
  const { q } = req.query;

  if (!q || q.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: "Query param ?q= must be at least 2 characters",
      statusCode: 400,
    });
  }

  const term = q.toLowerCase().trim();
  const result = parastatals.filter(
    (p) =>
      p.name.toLowerCase().includes(term) ||
      p.sector.toLowerCase().includes(term) ||
      (p.abbreviation && p.abbreviation.toLowerCase().includes(term))
  );

  res.status(200).json({
    success: true,
    query: q,
    count: result.length,
    data: result,
  });
};

module.exports = {
  getAllParastatals,
  getParastatalById,
  getParastatalsBySector,
  searchParastatals,
  getSectorList,
};
