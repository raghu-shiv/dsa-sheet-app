const logger = require("../utils/logger");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

module.exports = function (app) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      logger.info("MongoDB connected");
      app.listen(port, () => logger.info(`Server running on port ${port}`));
    })
    .catch((err) => logger.error(err.message));
};
