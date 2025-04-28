const Problem = require("../models/Problem");
const logger = require("../utils/logger");

exports.createProblem = async (req, res) => {
  try {
    const problem = await Problem.create(req.body);
    res.status(201).json(problem);
  } catch (err) {
    logger.error("Create Problem: " + err.message);
    res.status(500).json({ error: "Failed to create problem" });
  }
};

exports.getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    logger.error("Get Problems: " + err.message);
    res.status(500).json({ error: "Failed to get problems" });
  }
};

exports.updateProblem = async (req, res) => {
  try {
    const updated = await Problem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Problem not found" });
    res.json(updated);
  } catch (err) {
    logger.error("Update Problem: " + err.message);
    res.status(500).json({ error: "Failed to update problem" });
  }
};

exports.deleteProblem = async (req, res) => {
  try {
    const deleted = await Problem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Problem not found" });
    res.json({ message: "Problem deleted" });
  } catch (err) {
    logger.error("Delete Problem: " + err.message);
    res.status(500).json({ error: "Failed to delete problem" });
  }
};
