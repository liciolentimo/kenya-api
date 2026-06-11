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

module.exports = {
  getCounties,
  getCountyById,
};
