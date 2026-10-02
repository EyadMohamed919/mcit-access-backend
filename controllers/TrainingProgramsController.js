const {getAllTrainingProgramsByProjectID, deleteTrainingProgram, addTrainingProgram} = require("../models/TrainingProgramModel");

const getAllTrainingPrograms = async (id)=>{
    const trainingPrograms = await getAllTrainingProgramsByProjectID(id);
    return trainingPrograms;
}

const deleteTrainingProgramByID = async (req, res) =>{
    try {
        const {trainingProgramID} = req.body;
        await deleteTrainingProgram(trainingProgramID);
        res.redirect("/TrainingPrograms");
    } catch (error) {
        console.error("Failed to delete training program:", error);
        res.status(500).send("خطأ أثناء حذف البيانات");
    }
}

const addNewTrainingProgram = async (req, res) => {
    try {
        console.log("--> Received Form Data for Training Program:", req.body);

        await addTrainingProgram(req.body);

        res.redirect('/TrainingPrograms');
    } catch (error) {
        console.error("Failed to create training program:", error);
        res.status(500).send("خطأ أثناء حفظ بيانات البرنامج التدريبي");
    }
};

module.exports = {getAllTrainingPrograms, deleteTrainingProgramByID, addNewTrainingProgram};