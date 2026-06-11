function notFound(req, res) {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
    statusCode: 404,
  });
}

module.exports = notFound;
