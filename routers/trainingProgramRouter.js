const express = require("express");
const router = express.Router();
const {deleteTrainingProgramByID} = require("../controllers/TrainingProgramsController"); 

router.post("/DeleteTrainingProgram", deleteTrainingProgramByID);

module.exports = router;