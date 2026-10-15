const express = require("express");
const router = express.Router();
const {deleteTrainingProgramByID, addNewTrainingProgram, editTrainingProgramRecord} = require("../controllers/TrainingProgramsController"); 

router.post("/DeleteTrainingProgram", deleteTrainingProgramByID);
router.post("/AddTrainingProject", addNewTrainingProgram);
router.post("/EditTrainingProgram", editTrainingProgramRecord);
module.exports = router;