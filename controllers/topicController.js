const Topic = require("../models/Topic");
const logger = require("../utils/logger");

exports.createTopic = async (req, res) => {
  try {
    const topic = await Topic.create(req.body);
    res.status(201).json(topic);
  } catch (err) {
    logger.error("Create Topic: " + err.message);
    res.status(500).json({ error: "Failed to create topic" });
  }
};

exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find().populate("problems");
    res.json(topics);
  } catch (err) {
    logger.error("Get Topics: " + err.message);
    res.status(500).json({ error: "Failed to get topics" });
  }
};

exports.addProblemToTopic = async (req, res) => {
  try {
    const { topicId, problemId } = req.body;
    const topic = await Topic.findById(topicId);
    if (!topic) return res.status(404).json({ error: "Topic not found" });

    topic.problems.push(problemId);
    await topic.save();

    res.json({ message: "Problem added to topic", topic });
  } catch (err) {
    logger.error("Add Problem to Topic: " + err.message);
    res.status(500).json({ error: "Failed to add problem to topic" });
  }
};

exports.updateTopic = async (req, res) => {
  try {
    const updated = await Topic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Topic not found" });
    res.json(updated);
  } catch (err) {
    logger.error("Update Topic: " + err.message);
    res.status(500).json({ error: "Failed to update topic" });
  }
};

exports.deleteTopic = async (req, res) => {
  try {
    const deleted = await Topic.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Topic not found" });
    res.json({ message: "Topic deleted" });
  } catch (err) {
    logger.error("Delete Topic: " + err.message);
    res.status(500).json({ error: "Failed to delete topic" });
  }
};
