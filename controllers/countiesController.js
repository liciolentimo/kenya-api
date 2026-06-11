const counties = require('../data/counties.json');

function getCounties(req, res) {
  res.json({
    success: true,
    count: counties.length,
    data: counties,
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

  res.json({
    success: true,
    data: county,
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
