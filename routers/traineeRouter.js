const express = require("express");
const router = express.Router();
const { addNewTrainee, deleteTraineeByID } = require("../controllers/TraineesController");

router.post("/AddTrainee", addNewTrainee);
router.post("/DeleteTrainee", deleteTraineeByID)

module.exports = router;