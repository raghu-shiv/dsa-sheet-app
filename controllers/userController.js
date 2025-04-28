const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { User, validate } = require("../models/User");
const logger = require("../utils/logger");

exports.getUser = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
};

exports.findOrCreateUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already registered");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["id", "name", "email"]));
};

exports.getCompletedProblems = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ completedProblems: user.completedProblems });
  } catch (error) {
    logger.error("Error fetching completed problems:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateCompletedProblems = async (req, res) => {
  try {
    const { problemId } = req.body;

    // Defensive checks
    if (!problemId || typeof problemId !== "string") {
      logger.error("Invalid or missing problemId in request body");
      return res.status(400).json({ message: "Invalid Problem ID" });
    }

    if (!req.user || !req.user._id) {
      logger.error("Unauthorized request - user not found in req");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      logger.error(`User not found with ID: ${req.user._id}`);
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure completedProblems array exists
    if (!Array.isArray(user.completedProblems)) {
      user.completedProblems = [];
    }

    // Convert all IDs to string for comparison
    const completedProblemIds = user.completedProblems.map((id) =>
      id.toString()
    );

    const index = completedProblemIds.indexOf(problemId);

    if (index !== -1) {
      // Unmarking: problem exists, so remove
      user.completedProblems = user.completedProblems.filter(
        (id) => id.toString() !== problemId
      );
      logger.info(`Problem ID ${problemId} removed from completed problems`);
    } else {
      // Marking: problem doesn't exist, so add
      user.completedProblems.push(problemId);
      logger.info(`Problem ID ${problemId} added to completed problems`);
    }

    // console.log("Before Saving - completedProblems:", user.completedProblems);
    await user.save();

    return res.status(200).json({
      message: "Completed problems updated successfully",
      completedProblems: user.completedProblems.map((id) => id.toString()),
    });
  } catch (error) {
    console.error("Error saving user:", error); // print error stack

    logger.error(`Error updating completed problems: ${error.stack}`);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
