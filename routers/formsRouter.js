const express = require("express");
const router = express.Router();
const {getPrimaryLocalIpAddress} = require("../config/network");
const {getEvent} = require("../controllers/EventController");
const {getAllProjects, addNewProjects} = require("../controllers/ProjectController");
const {getAllGovernorates} = require("../controllers/GovController");
const {getAllOutputs} = require("../controllers/OutputController");
const {getAllProtocolsWithoutGovID} = require("../controllers/ProtocolController");
const {getAllTrainingPrograms, getAllTrainingProgramsByUser} = require("../controllers/TrainingProgramsController");
const {getTraineeByID} = require("../controllers/TraineesController");

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

router.get("/EditEvent/:id", requireProjectAuth, async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const session = req.session;
    const projects = await getAllProjects(req.session.user_id, session, res);
    const govs = await getAllGovernorates();
    const outputs = await getAllOutputs(req.session.user_id);
    const eventID = req.params.id 
    const event = await getEvent(eventID);
    res.render("EditEvent", {
        title: "Edit Event Page",
        host: hostData,
        projects:projects,
        govs:govs,
        outputs:outputs,
        event:event
    });
});

router.get("/EditTrainee/:id", requireProjectAuth, async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const session = req.session;
    const trainingPrograms = await getAllTrainingProgramsByUser(req.session.user_id, session, res);
    const govs = await getAllGovernorates();
    const traineeID = req.params.id 
    const trainee = await getTraineeByID(traineeID);
    res.render("EditTrainee", {
        title: "Edit Trainee Page",
        host: hostData,
        govs:govs,
        trainingPrograms:trainingPrograms,
        trainee:trainee
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