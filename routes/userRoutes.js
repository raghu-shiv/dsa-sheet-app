const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");

const {
  getUser,
  findOrCreateUser,
  getCompletedProblems,
  updateCompletedProblems,
} = userController;

router.get("/me", auth, getUser);
router.post("/", findOrCreateUser);
router.get("/completed-problems", auth, getCompletedProblems);
router.patch("/completed-problems", auth, updateCompletedProblems);

module.exports = router;
