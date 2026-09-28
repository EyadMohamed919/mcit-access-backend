const {getProjectsByUserID} = require("../models/ProjectModel");

const getAllProjects = async (id) =>{
    const projects = await getProjectsByUserID(id);
    return projects;
}

module.exports = {getAllProjects}