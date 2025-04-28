const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topicController");

const {
  createTopic,
  getAllTopics,
  updateTopic,
  deleteTopic,
  addProblemToTopic,
} = topicController;

router.post("/", createTopic);
router.get("/", getAllTopics);
router.patch("/:id", updateTopic);
router.delete("/:id", deleteTopic);

// Add a problem to a topic
router.post("/add-problem", addProblemToTopic);

module.exports = router;
