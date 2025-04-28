const express = require("express");
const router = express.Router();
const problemController = require("../controllers/problemController");

const { createProblem, getAllProblems, updateProblem, deleteProblem } =
  problemController;

router.post("/", createProblem);
router.get("/", getAllProblems);
router.patch("/:id", updateProblem);
router.delete("/:id", deleteProblem);

module.exports = router;
