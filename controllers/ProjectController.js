const {getProjectsByUserID, addProject} = require("../models/ProjectModel");

const getAllProjects = async (id) =>{
    const projects = await getProjectsByUserID(id);
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