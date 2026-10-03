const { getAllTraineesByProgID, addNewTrainee } = require("../models/TraineesModel");

const getTraineesPage = async (req, res) => {
    try {
        const progID = req.query.prog_id || 1; 
        const trainees = await getAllTraineesByProgID(progID);

        res.render("Trainees", {
            title: "Trainees Page",
            username: req.session ? req.session.username : 'المستخدم',
            trainees: trainees || [],
            stats: {
                totalRecords: trainees ? trainees.length : 0
            }
        });
    } catch (error) {
        console.error("Error loading Trainees page:", error.message);
        res.status(500).send("خطأ في تحميل البيانات");
    }
};

const renderAddTraineeForm = (req, res) => {
    res.render("forms/AddTrainee", {
        title: "Add Trainee Record",
        username: req.session ? req.session.username : 'المستخدم'
    });
};

const createTrainee = async (req, res) => {
    try {
        await addNewTrainee(req.body);
        res.redirect("/Trainees");
    } catch (error) {
        console.error("Failed to add trainee record:", error.message);
        res.status(500).send("خطأ في حفظ البيانات");
    }
};

module.exports = { getTraineesPage, renderAddTraineeForm, createTrainee };