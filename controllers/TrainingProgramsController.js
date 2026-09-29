const {getAllTrainingProgramsByProjectID} = require("../models/TrainingProgramModel");

const getAllTrainingPrograms = async (id)=>{
    const trainingPrograms = await getAllTrainingProgramsByProjectID(id);
    return trainingPrograms;
}

module.exports = {getAllTrainingPrograms};