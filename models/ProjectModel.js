const db = require("../config/db");

async function getProjectsByUserID(id)
{
    try {
        const projects = await db.query(`SELECT *, FORMAT(Projects.pr_StartDatedate, 'yyyy-mm-dd') AS pr_StartDate,
        FORMAT(Projects.pr_EndDate, 'yyyy-mm-dd') AS pr_EndDate FROM Projects 
        INNER JOIN user_proj ON Projects.pr_id = user_proj.pr_id
         WHERE user_proj.user_id = ${id}`);
        return projects;
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {getProjectsByUserID}