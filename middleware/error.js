module.exports = function (err, req, res, next) {
  logger.error({ message: err.message });
  res.status(500).send("Something Failed");
};
