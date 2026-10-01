const db = require("../config/db");

async function getProjectsByUserID(id)
{
    try {
        const projects = await db.query(`SELECT Projects.*, FORMAT(Projects.pr_StartDatedate, 'yyyy-mm-dd') AS pr_StartDate,
        FORMAT(Projects.pr_EndDate, 'yyyy-mm-dd') AS pr_EndDate FROM Projects 
        INNER JOIN user_proj ON Projects.pr_id = user_proj.pr_id
         WHERE user_proj.user_id = ${id}`);
        return projects;
    } catch (error) {
        console.log(error);
    }
    
}

async function addProject(projectData, userId) {
    try {
        const {
            Pr_title,
            pr_title_en,
            Program_ID,
            pr_vision,
            pr_mission,
            pr_StrategicObjective,
            pr_StartDatedate,
            pr_EndDate,
            pr_PhaseNo,
            pr_desc,
            sector_id,
            Target
        } = projectData;

        const escapeSql = (str) => (str && str.trim() !== '' ? `'${str.replace(/'/g, "''")}'` : 'NULL');
        const startDateVal = pr_StartDatedate && pr_StartDatedate.trim() !== '' ? `'${pr_StartDatedate}'` : 'NULL';
        const endDateVal = pr_EndDate && pr_EndDate.trim() !== '' ? `'${pr_EndDate}'` : 'NULL';

        const insertProjectSql = `
            INSERT INTO Projects (
                Pr_title, pr_title_en, Program_ID, pr_vision, pr_mission, 
                pr_StrategicObjective, pr_StartDatedate, pr_EndDate, 
                pr_PhaseNo, pr_desc, sector_id, Target
            ) VALUES (
                ${escapeSql(Pr_title)}, 
                ${escapeSql(pr_title_en)}, 
                ${Program_ID ? Number(Program_ID) : 'NULL'}, 
                ${escapeSql(pr_vision)}, 
                ${escapeSql(pr_mission)}, 
                ${escapeSql(pr_StrategicObjective)}, 
                ${startDateVal}, 
                ${endDateVal}, 
                ${pr_PhaseNo ? Number(pr_PhaseNo) : 'NULL'}, 
                ${escapeSql(pr_desc)}, 
                ${sector_id ? Number(sector_id) : 'NULL'}, 
                ${Target ? Number(Target) : 'NULL'}
            )
        `;

        // 1. Execute INSERT (Use db.execute if using node-adodb)
        // If your custom wrapper uses db.execute() for non-SELECT queries, call that here:
        if (typeof db.execute === 'function') {
            await db.execute(insertProjectSql);
        } else {
            await db.query(insertProjectSql);
        }

        // 2. Fetch the newly inserted Project ID by query
        let newProjectId = null;
        try {
            const idResult = await db.query('SELECT MAX(pr_id) AS new_id FROM Projects');
            if (idResult && idResult.length > 0) {
                newProjectId = idResult[0].new_id;
            }
        } catch (idErr) {
            console.error("Could not fetch last inserted ID:", idErr.message);
        }

        // 3. Insert into link table user_proj
        if (newProjectId && userId) {
            const linkUserSql = `
                INSERT INTO user_proj (user_id, pr_id) 
                VALUES (${Number(userId)}, ${Number(newProjectId)})
            `;
            
            if (typeof db.execute === 'function') {
                await db.execute(linkUserSql);
            } else {
                await db.query(linkUserSql);
            }
        }

        return { success: true, pr_id: newProjectId };

    } catch (error) {
        console.error("Database Error in addProject:", error.message);
        return { success: false, message:error.message};
        throw error;
    }
}

module.exports = { addProject };

module.exports = {getProjectsByUserID, addProject}