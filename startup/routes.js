const cors = require("cors");
const express = require("express");
const auth = require("../routes/authRoutes");
const problems = require("../routes/problemRoutes");
const topics = require("../routes/topicRoutes");
const users = require("../routes/userRoutes");

module.exports = function (app) {
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
  app.use(express.json());

  app.use("/api/problems", problems);
  app.use("/api/topics", topics);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
};
