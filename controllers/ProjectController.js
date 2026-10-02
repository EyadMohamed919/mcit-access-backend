const {getProjectsByUserID, addProject} = require("../models/ProjectModel");

const getAllProjects = async (id, session, res) =>{
    const projects = await getProjectsByUserID(id);
    console.log(session);
    if(!projects[0].pr_ID)
    {
        res.redirect("/error/ErrorNoProject");
    }
    
    if(!session.projectID)
    {
        session.projectID = projects[0].pr_ID;
        session.projectTitle = projects[0].Pr_title;
    
        session.save((err) => {
            if (err) {
                console.log("********** ERROR IN ProjectController.js **********");
                console.error("Session save error:", err);
            }
           
        });
    }

    return projects;
}

const addNewProjects = async (projectData, userID) =>{
    try {
        return await addProject(projectData, userID);
    } catch (error) {
        console.log(error);
    }
}
module.exports = {getAllProjects, addNewProjects}