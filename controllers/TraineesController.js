const { getAllTrainees, addNewTrainee } = require("../models/TraineesModel");

const getAllTraineesByProjectID = async (projectID) => {
    const trainees = await getAllTrainees(projectID);
    return trainees;   
}
const createTrainee = async (req, res) => {
    try {
        await addNewTrainee(req.body);
        res.redirect("/Trainees");
    } catch (error) {
        console.error("Failed to add trainee record:", error.message);
        res.status(500).send("خطأ في حفظ البيانات");
    }
};

module.exports = { getAllTraineesByProjectID , createTrainee };