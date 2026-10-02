const express = require("express");
const router = express.Router();
const {deleteTrainingProgramByID, addNewTrainingProgram} = require("../controllers/TrainingProgramsController"); 

router.post("/DeleteTrainingProgram", deleteTrainingProgramByID);
router.post("/AddTrainingProject", addNewTrainingProgram)
module.exports = router;