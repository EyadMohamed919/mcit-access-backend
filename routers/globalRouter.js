const express = require("express");
const router = express.Router();
const path = require("path");
const os = require("os");
const {getAllTrainingPrograms} = require("../controllers/TrainingProgramsController");
const {getAllProjects, addNewProjects} = require("../controllers/ProjectController");
const {getAllEvents} = require("../controllers/EventController");
const {getAllGovernorates} = require("../controllers/GovController");
const {getAllOutputs} = require("../controllers/OutputController");
function getPrimaryLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    const virtualKeywords = ['vbox', 'vmware', 'wsl', 'hyper-v', 'virtual', 'vethernet'];

    let fallbackIp = null;

    for (const interfaceName in interfaces) {
        const lowerName = interfaceName.toLowerCase();
        const isVirtual = virtualKeywords.some(keyword => lowerName.includes(keyword));

        for (const layer of interfaces[interfaceName]) {
            const isIPv4 = layer.family === 'IPv4' || layer.family === 4;

            if (isIPv4 && !layer.internal) {
                if (!isVirtual) {
                    return layer.address;
                }
                if (!fallbackIp) {
                    fallbackIp = layer.address;
                }
            }
        }
    }

    return fallbackIp || '127.0.0.1';
}

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

router.get("/Dashboard", requireAuth, async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const projects = await getAllProjects(req.session.user_id);
    res.render("Dashboard", {
        title: "Dashboard Page",
        username: req.session.username,
        id: req.session.user_id,
        host: hostData,
        projects:projects,
        stats: {
            totalEvents: 20,
            totalTrainees: 3400
        }
    });
});



router.get("/Events", requireAuth,async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const projects = await getAllProjects(req.session.user_id);

    // projects.forEach(async project => {
    //     let eventsPerProject = await getAllEvents(project.pr_id);
    //     events.push(eventsPerProject)
    // });
    const events = await getAllEvents(projects[0]['Projects.pr_id']);
    
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
        projectTitle: projects[0].Pr_title,
        events:events,
        stats:{
            totalAttendees:totalAttendees,
            totalGovs: totalGovs
        }
    });
});

router.get("/TrainingPrograms", requireAuth, async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const projects = await getAllProjects(req.session.user_id);
    const programs = await getAllTrainingPrograms(projects[0]['Projects.pr_id']);
    
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
        projectTitle: projects[0].Pr_title,
        programs:programs,
        stats:{
            totalHours: totalHours,
            totalProjects: uniqueProjects.size
        }
    });
});

router.get("/AddProject", requireAuth, async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    res.render("AddProject", {
        title: "Add Project Page",
        host: hostData,
    });
});

router.get("/AddEvent", requireAuth, async (req, res)=>{
    let hostData = "http://" + getPrimaryLocalIpAddress() + ":8080";
    const projects = await getAllProjects(req.session.user_id);
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

module.exports = router;


        