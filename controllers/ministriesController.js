const ministries = require('../data/ministries.json');

function getAllMinistries(req, res) {
  let result = [...ministries];

  if (req.query.appointed) {
    result = result.filter((m) => m.appointed === req.query.appointed);
  }

  if (req.query.q) {
    const term = String(req.query.q).trim().toLowerCase();
    result = result.filter(
      (m) =>
        m.ministry.toLowerCase().includes(term) ||
        m.cabinet_secretary.toLowerCase().includes(term)
    );
  }

  res.status(200).json({
    success: true,
    count: result.length,
    source: 'Office of the President of Kenya',
    data: result,
  });
}

function getMinistryById(req, res, next) {
  const id = parseInt(req.params.id, 10);
  const ministry = ministries.find((m) => m.id === id);

  if (!ministry) {
    const err = new Error(`Ministry with ID ${id} not found`);
    err.statusCode = 404;
    return next(err);
  }

  res.status(200).json({ success: true, data: ministry });
}

function searchMinistries(req, res) {
  const { q } = req.query;

  if (!q || q.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Query param ?q= must be at least 2 characters',
      statusCode: 400,
    });
  }

  const term = q.toLowerCase();
  const result = ministries.filter(
    (m) =>
      m.ministry.toLowerCase().includes(term) ||
      m.cabinet_secretary.toLowerCase().includes(term)
  );

  res.status(200).json({
    success: true,
    query: q,
    count: result.length,
    data: result,
  });
}

module.exports = { getAllMinistries, getMinistryById, searchMinistries };
