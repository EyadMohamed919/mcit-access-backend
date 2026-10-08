const express = require("express");
const router = express.Router();
const {getPrimaryLocalIpAddress} = require("../config/network");

const { getProductsByProjectID } = require("../controllers/ProductController");
const {getAllTrainingPrograms} = require("../controllers/TrainingProgramsController");
const {getAllProjects, addNewProjects} = require("../controllers/ProjectController");
const {getAllEvents} = require("../controllers/EventController");
const {getAllGovernorates} = require("../controllers/GovController");
const {getAllOutputs} = require("../controllers/OutputController");
const {getAllTraineesByProjectID} = require("../controllers/TraineesController");


const requireProjectAuth = (req, res, next) => {
    if (req.session.projectID) {
        next();
    } else {
        res.redirect("/error/ErrorNoProject");
    }
};

const requireAuth = (req, res, next) => {
    if (req.session.username) {
        
        next();
    } else {
        res.redirect("/");
    }
};



router.get("/", (req, res)=>{
    hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    res.render("Login", {
        title: "Login Page",
        username: "Eyad",
        host:hostData
    });

    
});

router.get("/Settings", requireAuth, async (req, res) => {
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    
    const projects = await getAllProjects(req.session.user_id, req.session, res);

    res.render("Settings", {
        title: "الإعدادات - Settings",
        username: req.session.username,
        currentProjectID: req.session.projectID,
        projects: projects || [],
        host: hostData
    });
});


router.get("/Dashboard", requireAuth, async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const session = req.session;
    const projects = await getAllProjects(req.session.user_id, session, res);
    
    let totalEvents = 0;
    let totalTrainees = 0;

    for (const project of projects) 
    {
        let projectID = project.pr_ID;
        if (projectID) {
          let events = await getAllEvents(projectID);
          let trainees = await getAllTraineesByProjectID(projectID);
          totalEvents = totalEvents + events.length;
          totalTrainees = totalTrainees + trainees.length;
        }
    }
    
    res.render("Dashboard", {
        title: "Dashboard Page",
        username: req.session.username,
        id: req.session.user_id,
        host: hostData,
        projects:projects,
        stats: {
            totalEvents: totalEvents,
            totalTrainees: totalTrainees
        }
    });
});



router.get("/Events", requireProjectAuth,async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const events = await getAllEvents(req.session.projectID);

    let totalAttendees = 0;
    let governorates = 0;
    if (events && events.length > 0) {
        totalAttendees = events.reduce((sum, ev) => sum + (Number(ev.ben_no) || 0), 0);
        governorates = events.reduce((acc, event)=>{
            if(!acc[event.gov_id])
            {
                acc[event.gov_id] = event.gov_id;
            }

            return acc;
        }, {});
    }
    else
    {
        console.log("Events is empty");
    }

    const totalGovs = Object.keys(governorates).length;

    res.render("Events", {
        title: "Events Page",
        username: req.session.username,
        id: req.session.user_id,
        host: hostData,
        projectTitle: req.session.projectTitle,
        events:events,
        stats:{
            totalAttendees:totalAttendees,
            totalGovs: totalGovs
        }
    });
});

router.get("/TrainingPrograms", requireProjectAuth, async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const programs = await getAllTrainingPrograms(req.session.projectID);
    
    let totalHours = 0;
    let uniqueProjects = new Set();

    if (programs && programs.length > 0) 
    {
        totalHours = programs.reduce((sum, prog) => sum + (Number(prog.tp_hours) || 0), 0);

        uniqueProjects = new Set(
            programs
                .map(prog => prog.pr_id)
                .filter(id => id !== null && id !== undefined)
        );
    } 
    else 
    {
        console.log("Training programs list is empty");
    }
    


    res.render("TrainingProgram", {
        title: "Training Program Page",
        username: req.session.username,
        id: req.session.user_id,
        host: hostData,
        projectTitle: req.session.projectTitle,
        programs:programs,
        stats:{
            totalHours: totalHours,
            totalProjects: uniqueProjects.size
        }
    });
});


router.get("/Outputs", requireProjectAuth, async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const outputs = await getAllOutputs(req.session.projectID)    
    let totalOutputs = outputs.length;

    res.render("Outputs", {
        title: "Outputs Page",
        username: req.session.username,
        id: req.session.user_id,
        host: hostData,
        projectTitle: req.session.projectTitle,
        outputs:outputs,
        stats:{
            totalOutputs: totalOutputs,
        }
    });
});

router.get("/Trainees", requireProjectAuth, async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const trainees = await getAllTraineesByProjectID(req.session.projectID);
    const governorates = await getAllGovernorates();  
    let totalTrainees = trainees.length;

    res.render("Trainees", {
        title: "Trainees Page",
        username: req.session.username,
        id: req.session.user_id,
        host: hostData,
        projectTitle: req.session.projectTitle,
        trainees:trainees,
        governorates:governorates,
        stats:{
            totalTrainees: totalTrainees,
        }
    });
});

router.get("/Products", requireProjectAuth, async (req, res) => {
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const products = await getProductsByProjectID(req.session.projectID);
    let totalProducts = products ? products.length : 0;

    res.render("Products", {
        title: "Products Page",
        username: req.session.username,
        id: req.session.user_id,
        host: hostData,
        projectTitle: req.session.projectTitle,
        products: products,
        stats: {
            totalProducts: totalProducts,
        }
    });
});












module.exports = router;


        