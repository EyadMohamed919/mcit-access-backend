const {getAllTrainingProgramsByProjectID, deleteTrainingProgram} = require("../models/TrainingProgramModel");

const getAllTrainingPrograms = async (id)=>{
    const trainingPrograms = await getAllTrainingProgramsByProjectID(id);
    return trainingPrograms;
}

const deleteTrainingProgramByID = async (req, res) =>{
    try {
        const {trainingProgramID} = req.body;
        await deleteProject(trainingProgramID);
        res.redirect("/TrainingPrograms");
    } catch (error) {
        console.error("Failed to delete training program:", error);
        res.status(500).send("خطأ أثناء حذف البيانات");
    }
}

module.exports = {getAllTrainingPrograms, deleteTrainingProgramByID};