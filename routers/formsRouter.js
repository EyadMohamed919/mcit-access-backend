const express = require("express");
const router = express.Router();
const {getPrimaryLocalIpAddress} = require("../config/network");
const {getEvent, getAllEvents} = require("../controllers/EventController");
const {getAllProjects, addNewProjects} = require("../controllers/ProjectController");
const {getAllGovernorates} = require("../controllers/GovController");
const {getAllOutputs} = require("../controllers/OutputController");
const {getAllProtocolsWithoutGovID} = require("../controllers/ProtocolController");
const {getAllTrainingPrograms, getAllTrainingProgramsByUser} = require("../controllers/TrainingProgramsController");
const {getTraineeByID, getAllTraineesByProjectID, getAllTraineesWithNoID} = require("../controllers/TraineesController");
const {getAllTraineeTypes, getAllAgeGroups} = require("../controllers/TypeController");

const requireProjectAuth = (req, res, next) => {
    if (!req.session.username) {
        res.redirect("/");
    }
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
    const outputs = await getAllOutputs(req.session.projectID);
    const events = await getAllEvents(req.session.projectID);

    // gettings events titles
    let eventsTitle = new Map();
    events.forEach(event => {
        if(!eventsTitle.has(event.event_name_en))
        {
            eventsTitle.set(event.event_name_en, event.event_name_en);
        }
    });

    eventsTitle = Array.from(eventsTitle.keys());
    res.render("AddEvent", {
        title: "Add Event Page",
        host: hostData,
        projects:projects,
        govs:govs,
        outputs:outputs,
        events:events,
        eventsTitle:eventsTitle
    });
});

router.get("/EditEvent/:id", requireProjectAuth, async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const session = req.session;
    const projects = await getAllProjects(req.session.user_id, session, res);
    const govs = await getAllGovernorates();
    const outputs = await getAllOutputs(req.session.projectID);
    const eventID = req.params.id 
    let event = [];
    const events = await getAllEvents(req.session.projectID);

    // gettings events titles
    let eventsTitle = new Map();
    events.forEach(e => {
        // Finding matching event
        if(e.event_id == eventID)
        {
            event = e;
        }
        if(!eventsTitle.has(e.event_name_en))
        {
            eventsTitle.set(e.event_name_en, e.event_name_en);
        }
    });

    
    if(event.length <= 0)
    {
        res.redirect("/error/ErrorNoEvent");
        return;
    }
    eventsTitle = Array.from(eventsTitle.keys());

    res.render("EditEvent", {
        title: "Edit Event Page",
        host: hostData,
        projects:projects,
        govs:govs,
        outputs:outputs,
        event:event,
        events:events,
        eventsTitle:eventsTitle
    });
});

router.get("/AddTrainee", requireProjectAuth, async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const session = req.session;
    const trainingPrograms = await getAllTrainingProgramsByUser(req.session.user_id);
    const govs = await getAllGovernorates();
    const outputs = await getAllOutputs(req.session.projectID);
    const trainees = await getAllTraineesWithNoID();
    const traineeTypes = await getAllTraineeTypes();
    const ageGroups = await getAllAgeGroups();
    let centers = new Map();

    trainees.forEach(trainee => {
        if(!centers.has(trainee["Training Center"]))
        {
            if(trainee["Training Center"] != "" && trainee["Training Center"] != 0)
            {
                centers.set(trainee["Training Center"], trainee["Training Center"]);
            }
        }
    });

    centers = Array.from(centers.keys());
    res.render("AddTrainee", {
        title: "Add Trainee Page",
        host: hostData,
        trainingPrograms:trainingPrograms,
        govs:govs,
        centers:centers,
        outputs:outputs,
        traineeTypes:traineeTypes,
        ageGroups:ageGroups
    });
});

router.get("/EditTrainee/:id", requireProjectAuth, async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const session = req.session;
    const trainingPrograms = await getAllTrainingProgramsByUser(req.session.user_id, session, res);
    const govs = await getAllGovernorates();
    const traineeID = req.params.id 
    let t = []

    const traineeTypes = await getAllTraineeTypes();
    const ageGroups = await getAllAgeGroups();
    const outputs = await getAllOutputs(req.session.projectID);
    const trainees = await getAllTraineesWithNoID();
    let centers = new Map();

    trainees.forEach(trainee => {
        if(trainee.ben_id == traineeID)
        {
            t = trainee
        }
        if(!centers.has(trainee["Training Center"]))
        {
            if(trainee["Training Center"] != "" && trainee["Training Center"] != 0)
            {
                centers.set(trainee["Training Center"], trainee["Training Center"]);
            }
        }
    });

    if(t.length <= 0)
    {
        res.redirect("/error/ErrorNoTrainee");
    }
    centers = Array.from(centers.keys());

    res.render("EditTrainee", {
        title: "Edit Trainee Page",
        host: hostData,
        govs:govs,
        trainingPrograms:trainingPrograms,
        trainee:t,
        outputs:outputs,
        centers:centers,
        traineeTypes:traineeTypes,
        ageGroups:ageGroups
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