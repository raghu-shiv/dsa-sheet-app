const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  youtubeUrl: String,
  leetcodeUrl: String,
  articleUrl: String,
  level: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
});

module.exports = mongoose.model("Problem", problemSchema);
