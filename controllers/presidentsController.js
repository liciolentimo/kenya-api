const fileData = require('../data/presidents.json');
const presidents = fileData.presidents;

const getAllPresidents = (req, res) => {
  let result = [...presidents];

  if (req.query.party) {
    const term = req.query.party.toLowerCase();
    result = result.filter((p) => p.political_party.toLowerCase().includes(term));
  }

  const response = {
    success: true,
    count: result.length,
    data: result,
  };

  if (req.query.include_pre_republic === 'true') {
    response.pre_republic_heads_of_state = fileData.pre_republic_heads_of_state || [];
  }

  res.status(200).json(response);
};

const getPresidentById = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const president = presidents.find((p) => p.id === id);

  if (!president) {
    const err = new Error(`President with ID ${id} not found`);
    err.statusCode = 404;
    return next(err);
  }

  res.status(200).json({ success: true, data: president });
};

const getIncumbentPresident = (req, res, next) => {
  const incumbent = presidents.find((p) => p.is_incumbent === true);

  if (!incumbent) {
    const err = new Error('No incumbent president found in records');
    err.statusCode = 404;
    return next(err);
  }

  res.status(200).json({ success: true, data: incumbent });
};

const searchPresidents = (req, res) => {
  const { q } = req.query;

  if (!q || q.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Query param ?q= must be at least 2 characters',
      statusCode: 400,
    });
  }

  const term = q.toLowerCase().trim();
  const result = presidents.filter(
    (p) =>
      p.name.toLowerCase().includes(term) ||
      p.political_party.toLowerCase().includes(term) ||
      p.deputies.some((d) => d.toLowerCase().includes(term)) ||
      (p.description && p.description.toLowerCase().includes(term))
  );

  res.status(200).json({
    success: true,
    query: q,
    count: result.length,
    data: result,
  });
};

module.exports = {
  getAllPresidents,
  getPresidentById,
  getIncumbentPresident,
  searchPresidents,
};
