const {
  getFacilities,
  getFacilityByCode,
  getCacheStats,
  FACILITY_TYPES,
  KEPH_LEVELS,
  OWNER_CATEGORIES,
} = require('../services/healthFacilitiesService');

const counties = require('../data/counties.json');

function buildKMHFRParams(req) {
  const {
    page, page_size, county, facility_type,
    keph_level, owner_category, operation_status,
    open_24hrs, has_beds, has_cots,
  } = req.query;

  const params = {
    format: 'json',
    page: page || 1,
    page_size: page_size || 30,
  };

  if (county)            params.county            = county;
  if (facility_type)     params.facility_type     = facility_type;
  if (keph_level)        params.keph_level        = keph_level;
  if (owner_category)    params.owner_category    = owner_category;
  if (operation_status)  params.operation_status  = operation_status;
  if (open_24hrs === 'true') params.open_24hrs    = true;
  if (has_beds === 'true')   params.has_beds      = true;
  if (has_cots === 'true')   params.has_cots      = true;

  return params;
}

const listFacilities = async (req, res, next) => {
  try {
    const params = buildKMHFRParams(req);
    const data = await getFacilities(params);

    res.status(200).json({
      success: true,
      total: data.count,
      count: data.results?.length || 0,
      page: parseInt(params.page, 10),
      next: data.next ? true : false,
      previous: data.previous ? true : false,
      source: 'Kenya Master Health Facility Registry (KMHFR)',
      source_url: 'https://kmhfr.health.go.ke',
      from_cache: data.from_cache,
      data: data.results || [],
    });
  } catch (err) {
    err.statusCode = 503;
    err.message = err.code === 'NO_TOKEN'
      ? 'KMHFR_API_TOKEN is not configured on this server'
      : 'Could not reach KMHFR — try again shortly';
    next(err);
  }
};

const getFacility = async (req, res, next) => {
  try {
    const data = await getFacilityByCode(req.params.code);

    if (!data || data.detail === 'Not found.') {
      const err = new Error(`Facility with code "${req.params.code}" not found`);
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json({
      success: true,
      source: 'Kenya Master Health Facility Registry (KMHFR)',
      from_cache: data.from_cache,
      data,
    });
  } catch (err) {
    if (err.code === 'NO_TOKEN') {
      err.statusCode = 503;
      err.message = 'KMHFR_API_TOKEN is not configured on this server';
    } else if (err.message && err.message.includes('404')) {
      err.statusCode = 404;
      err.message = `Facility with code "${req.params.code}" not found`;
    } else {
      err.statusCode = 503;
      err.message = 'Could not reach KMHFR — try again shortly';
    }
    next(err);
  }
};

const getFacilitiesByCounty = async (req, res, next) => {
  try {
    const countyId = parseInt(req.params.county_id, 10);
    const county = counties.find((c) => c.id === countyId);

    if (!county) {
      const err = new Error(`County with ID ${countyId} not found`);
      err.statusCode = 404;
      return next(err);
    }

    const params = buildKMHFRParams(req);
    params.county = county.name;

    const data = await getFacilities(params);

    res.status(200).json({
      success: true,
      county_id: countyId,
      county_name: county.name,
      total: data.count,
      count: data.results?.length || 0,
      page: parseInt(params.page, 10),
      next: data.next ? true : false,
      previous: data.previous ? true : false,
      source: 'Kenya Master Health Facility Registry (KMHFR)',
      from_cache: data.from_cache,
      data: data.results || [],
    });
  } catch (err) {
    err.statusCode = 503;
    err.message = err.code === 'NO_TOKEN'
      ? 'KMHFR_API_TOKEN is not configured on this server'
      : 'Could not reach KMHFR — try again shortly';
    next(err);
  }
};

const searchFacilities = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Query param ?q= must be at least 2 characters',
        statusCode: 400,
      });
    }

    const params = buildKMHFRParams(req);
    params.search = q.trim();

    const data = await getFacilities(params);

    res.status(200).json({
      success: true,
      query: q,
      total: data.count,
      count: data.results?.length || 0,
      source: 'Kenya Master Health Facility Registry (KMHFR)',
      from_cache: data.from_cache,
      data: data.results || [],
    });
  } catch (err) {
    err.statusCode = 503;
    err.message = err.code === 'NO_TOKEN'
      ? 'KMHFR_API_TOKEN is not configured on this server'
      : 'Could not reach KMHFR — try again shortly';
    next(err);
  }
};

const getFacilityTypes = (req, res) => {
  res.status(200).json({
    success: true,
    count: FACILITY_TYPES.length,
    data: FACILITY_TYPES,
  });
};

const getKephLevels = (req, res) => {
  const data = Object.entries(KEPH_LEVELS).map(([level, name]) => ({ level, name }));
  res.status(200).json({
    success: true,
    description: 'Kenya Essential Package for Health (KEPH) levels',
    count: data.length,
    data,
  });
};

module.exports = {
  listFacilities,
  getFacility,
  getFacilitiesByCounty,
  getFacilityTypes,
  getKephLevels,
  searchFacilities,
};
