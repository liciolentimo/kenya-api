const counties = require('../data/counties.json');
const populationData = require('../data/population.json');

function buildPopulationLookup() {
  return populationData.reduce((acc, item) => {
    acc[item.county_id] = item.population;
    return acc;
  }, {});
}

function getCounties(req, res) {
  const regionQuery = req.query.region ? String(req.query.region).trim().toLowerCase() : null;
  const sortQuery = req.query.sort ? String(req.query.sort).trim() : null;
  const populationLookup = buildPopulationLookup();

  let results = counties.map((county) => ({
    ...county,
    population: populationLookup[county.id] ?? null,
  }));

  if (regionQuery) {
    results = results.filter((county) => String(county.region || '').toLowerCase() === regionQuery);
  }

  if (sortQuery === 'area_asc') {
    results.sort((a, b) => (a.area_km2 || 0) - (b.area_km2 || 0));
  } else if (sortQuery === 'area_desc') {
    results.sort((a, b) => (b.area_km2 || 0) - (a.area_km2 || 0));
  } else if (sortQuery === 'population_asc') {
    results.sort((a, b) => (a.population || 0) - (b.population || 0));
  } else if (sortQuery === 'population_desc') {
    results.sort((a, b) => (b.population || 0) - (a.population || 0));
  }

  res.json({
    success: true,
    count: results.length,
    data: results,
  });
}

function getCountyById(req, res, next) {
  const id = Number(req.params.id);
  const county = counties.find((item) => item.id === id);

  if (!county) {
    return res.status(404).json({
      success: false,
      error: `County with ID ${req.params.id} not found`,
      statusCode: 404,
    });
  }

  const populationLookup = buildPopulationLookup();
  const data = {
    ...county,
    population: populationLookup[county.id] ?? null,
  };

  res.json({
    success: true,
    data,
  });
}

function getConstituenciesByCounty(req, res, next) {
  try {
    const countyId = Number(req.params.id);
    const county = counties.find((c) => c.id === countyId);

    if (!county) {
      const err = new Error(`County with ID ${req.params.id} not found`);
      err.statusCode = 404;
      return next(err);
    }

    const constituencies = require('../data/constituencies.json');
    const data = constituencies.filter((item) => item.county_id === countyId);

    res.json({
      success: true,
      count: data.length,
      county_id: countyId,
      county_name: county.name,
      data,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCounties,
  getCountyById,
  getConstituenciesByCounty,
};
