const express = require("express");
const router = express.Router();
const { addNewTrainee, deleteTraineeByID, editTrainee } = require("../controllers/TraineesController");

router.post("/AddTrainee", addNewTrainee);
router.post("/EditTrainee", editTrainee)
router.post("/DeleteTrainee", deleteTraineeByID)


module.exports = router;