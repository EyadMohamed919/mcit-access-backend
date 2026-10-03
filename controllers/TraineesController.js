const { getAllTrainees, addTrainee, deleteTrainee } = require("../models/TraineesModel");

const getAllTraineesByProjectID = async (projectID) => {
    const trainees = await getAllTrainees(projectID);
    return trainees;   
}
const addNewTrainee = async (req, res) => {
    try {
        await addTrainee(req.body);
        res.redirect("/Trainees");
    } catch (error) {
        console.error("Failed to add trainee record:", error.message);
        res.status(500).send("خطأ في حفظ البيانات");
    }
};

const deleteTraineeByID = async (req, res) =>{
    try {
        const {benID} = req.body;
        await deleteTrainee(benID);
        res.redirect("/Trainees");
    } catch (error) {
        console.error("Failed to delete Trainee:", error);
        res.status(500).send("خطأ أثناء حذف البيانات");
    }
}

module.exports = { getAllTraineesByProjectID, addNewTrainee, deleteTraineeByID};