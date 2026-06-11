const constituencies = require('../data/constituencies.json');

function getAllConstituencies(req, res) {
  res.json({
    success: true,
    count: constituencies.length,
    data: constituencies,
  });
}

function getConstituencyById(req, res, next) {
  const id = Number(req.params.id);
  const item = constituencies.find((c) => c.id === id);

  if (!item) {
    return res.status(404).json({
      success: false,
      error: `Constituency with ID ${req.params.id} not found`,
      statusCode: 404,
    });
  }

  res.json({
    success: true,
    data: item,
  });
}

module.exports = {
  getAllConstituencies,
  getConstituencyById,
};
