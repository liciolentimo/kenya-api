const population = require('../data/population.json');

function getPopulationSummary(req, res) {
  res.json({
    success: true,
    data: population.summary,
  });
}

function getPopulationByCounty(req, res) {
  res.json({
    success: true,
    count: population.counties.length,
    data: population.counties,
  });
}

module.exports = {
  getPopulationSummary,
  getPopulationByCounty,
};
