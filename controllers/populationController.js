const population = require('../data/population.json');
const counties = require('../data/counties.json');

function getPopulationSummary(req, res) {
  const totalPopulation = population.reduce((sum, item) => sum + (item.population || 0), 0);
  const mostPopulous = population.reduce((max, item) => (!max || item.population > max.population ? item : max), null);
  const leastPopulous = population.reduce((min, item) => (!min || item.population < min.population ? item : min), null);
  const sortedByArea = counties.slice().sort((a, b) => (b.area_km2 || 0) - (a.area_km2 || 0));
  const largestCounty = sortedByArea[0] || null;
  const smallestCounty = sortedByArea[sortedByArea.length - 1] || null;

  res.json({
    success: true,
    data: {
      total_population: totalPopulation,
      most_populous_county: mostPopulous
        ? { name: mostPopulous.county_name, population: mostPopulous.population }
        : null,
      least_populous_county: leastPopulous
        ? { name: leastPopulous.county_name, population: leastPopulous.population }
        : null,
      largest_county_by_area: largestCounty
        ? { name: largestCounty.name, area_km2: largestCounty.area_km2 }
        : null,
      smallest_county_by_area: smallestCounty
        ? { name: smallestCounty.name, area_km2: smallestCounty.area_km2 }
        : null,
      census_year: 2019,
      source: 'Kenya National Bureau of Statistics',
    },
  });
}

function getPopulationByCounty(req, res) {
  res.json({
    success: true,
    count: population.length,
    data: population,
  });
}

module.exports = {
  getPopulationSummary,
  getPopulationByCounty,
};
