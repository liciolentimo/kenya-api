const institutions = require('../data/institutions.json');
const counties = require('../data/counties.json');
const { VALID_TYPES, VALID_CATEGORIES } = require('../config/institutionConstants');

function createError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function normalizeKey(key) {
  return (key || '').trim().toLowerCase();
}

async function getAllInstitutions(req, res, next) {
  try {
    const { page = '1', limit = '10', type, category } = req.query;
    let results = institutions;

    if (type) {
      const normalizedType = normalizeKey(type);
      if (!VALID_TYPES.some((valid) => normalizeKey(valid) === normalizedType)) {
        return next(createError('Invalid institution type', 400));
      }
      results = results.filter((item) => normalizeKey(item.type) === normalizedType);
    }

    if (category) {
      const normalizedCategory = normalizeKey(category);
      if (!VALID_CATEGORIES.some((valid) => normalizeKey(valid) === normalizedCategory)) {
        return next(createError('Invalid institution category', 400));
      }
      results = results.filter((item) => normalizeKey(item.category) === normalizedCategory);
    }

    const pageNumber = Math.max(1, Number(page) || 1);
    const pageSize = Math.max(1, Number(limit) || 10);
    const total = results.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const startIndex = (pageNumber - 1) * pageSize;
    const data = results.slice(startIndex, startIndex + pageSize);

    res.json({
      success: true,
      count: data.length,
      page: pageNumber,
      totalPages,
      total,
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function getInstitutionById(req, res, next) {
  const id = Number(req.params.id);
  const institution = institutions.find((item) => item.id === id);

  if (!institution) {
    return next(createError(`Institution with ID ${req.params.id} not found`, 404));
  }

  res.json({
    success: true,
    data: institution,
  });
}

async function getInstitutionsByCounty(req, res, next) {
  const countyId = Number(req.params.county_id);
  const county = counties.find((item) => item.id === countyId);

  if (!county) {
    return next(createError(`County with ID ${req.params.county_id} not found`, 404));
  }

  const data = institutions.filter((item) => item.county_id === countyId);

  res.json({
    success: true,
    count: data.length,
    county_id: countyId,
    county_name: county.name,
    data,
  });
}

async function getInstitutionsByType(req, res, next) {
  const type = decodeURIComponent(req.params.type).trim();
  const normalizedType = normalizeKey(type);

  if (!VALID_TYPES.some((valid) => normalizeKey(valid) === normalizedType)) {
    return next(createError('Invalid institution type', 400));
  }

  const data = institutions.filter((item) => normalizeKey(item.type) === normalizedType);

  res.json({
    success: true,
    count: data.length,
    type,
    data,
  });
}

async function searchInstitutions(req, res, next) {
  const query = req.query.q?.trim();

  if (!query || query.length < 2) {
    return next(createError('Search query must contain at least 2 characters', 400));
  }

  const normalizedQuery = query.toLowerCase();
  const data = institutions
    .filter((item) => {
      const matchesName = item.name.toLowerCase().includes(normalizedQuery);
      const matchesAddress = item.address.toLowerCase().includes(normalizedQuery);
      const matchesCounty = item.county_name.toLowerCase().includes(normalizedQuery);
      const matchesConstituency = item.constituency?.toLowerCase().includes(normalizedQuery);
      return matchesName || matchesAddress || matchesCounty || matchesConstituency;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  res.json({
    success: true,
    count: data.length,
    query,
    data,
  });
}

module.exports = {
  getAllInstitutions,
  getInstitutionById,
  getInstitutionsByCounty,
  getInstitutionsByType,
  searchInstitutions,
};
