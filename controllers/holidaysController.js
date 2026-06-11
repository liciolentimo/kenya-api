const holidays = require('../data/holidays.json');

function getHolidays(req, res) {
  const { year } = req.query;
  let results = holidays;

  if (year) {
    results = results.filter((holiday) => holiday.date.startsWith(`${year}-`));
  }

  if (req.query.q) {
    const term = String(req.query.q).trim().toLowerCase();
    results = results.filter(
      (h) =>
        h.name.toLowerCase().includes(term) ||
        h.type.toLowerCase().includes(term)
    );
  }

  res.json({
    success: true,
    count: results.length,
    data: results,
  });
}

function getHolidayById(req, res) {
  const id = Number(req.params.id);
  const holiday = holidays.find((item) => item.id === id);

  if (!holiday) {
    return res.status(404).json({
      success: false,
      error: `Holiday with ID ${req.params.id} not found`,
      statusCode: 404,
    });
  }

  res.json({
    success: true,
    data: holiday,
  });
}

module.exports = {
  getHolidays,
  getHolidayById,
};
