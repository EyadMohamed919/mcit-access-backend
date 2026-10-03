const express = require("express");
const router = express.Router();
const {getPrimaryLocalIpAddress} = require("../config/network");

const {getAllProjects, addNewProjects} = require("../controllers/ProjectController");
const {getAllGovernorates} = require("../controllers/GovController");
const {getAllOutputs} = require("../controllers/OutputController");
const {getAllProtocolsWithoutGovID} = require("../controllers/ProtocolController");
const {getAllTrainingPrograms, getAllTrainingProgramsByUser} = require("../controllers/TrainingProgramsController");

const requireProjectAuth = (req, res, next) => {
    if (req.session.projectID) {
        next();
    } else {
        res.redirect("/error/ErrorNoProject");
    }
};

// **************** FORMS *****************
router.get("/AddProject", requireProjectAuth, async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    res.render("AddProject", {
        title: "Add Project Page",
        host: hostData,
    });
});

router.get("/AddEvent", requireProjectAuth, async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const session = req.session;
    const projects = await getAllProjects(req.session.user_id, session, res);
    const govs = await getAllGovernorates();
    const outputs = await getAllOutputs(req.session.user_id);
    res.render("AddEvent", {
        title: "Add Event Page",
        host: hostData,
        projects:projects,
        govs:govs,
        outputs:outputs
    });
});

router.get("/AddTrainingProgram", requireProjectAuth, async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const session = req.session;
    const projects = await getAllProjects(req.session.user_id, session, res);
    res.render("AddTrainingProgram", {
        title: "Add Training Program Page",
        host: hostData,
        projects:projects
    });
});

router.get("/AddOutput", requireProjectAuth, async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const session = req.session;
    const projects = await getAllProjects(req.session.user_id, session, res);
    const protocols = await getAllProtocolsWithoutGovID();
    res.render("AddOutput", {
        title: "Add Output Page",
        host: hostData,
        projects:projects,
        protocols:protocols
    });
});

router.get("/AddTrainee", requireProjectAuth, async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const session = req.session;
    const trainingPrograms = await getAllTrainingProgramsByUser(req.session.user_id);
    const govs = await getAllGovernorates();
    res.render("AddTrainee", {
        title: "Add Trainee Page",
        host: hostData,
        trainingPrograms:trainingPrograms,
        govs:govs
    });
});

router.get("/AddProduct", requireProjectAuth, async (req, res) => {
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const session = req.session;
    const projects = await getAllProjects(req.session.user_id, session, res);
    const outputs = await getAllOutputs(req.session.projectID); 

    res.render("AddProduct", {
        title: "Add Product Page",
        host: hostData,
        projects: projects,
        outputs: outputs
    });
});

module.exports = router;