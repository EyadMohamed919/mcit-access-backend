const db = require("../config/db");

async function getProjectsByUserID(id)
{
    try {
        const projects = await db.query(`SELECT * FROM Projects 
        JOIN user_proj ON Projects.pr_id = user_proj.pr_id
         WHERE user_proj = ${id}`);
        return projects;
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {getProjectsByUserID}