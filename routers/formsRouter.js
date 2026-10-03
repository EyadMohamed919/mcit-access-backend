const express = require("express");
const router = express.Router();
const {getPrimaryLocalIpAddress} = require("../config/network");

const {getAllProjects, addNewProjects} = require("../controllers/ProjectController");
const {getAllGovernorates} = require("../controllers/GovController");
const {getAllOutputs} = require("../controllers/OutputController");
const {getAllProtocolsWithoutGovID} = require("../controllers/GovController");

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