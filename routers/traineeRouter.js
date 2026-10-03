const express = require("express");
const router = express.Router();
const { addNewTrainee, deleTraineeByID } = require("../controllers/TraineesController");

router.post("/AddTrainee", addNewTrainee);
router.post("/DeleteTrainee", deleTraineeByID)

module.exports = router;