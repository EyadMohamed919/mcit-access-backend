const db = require("../config/db");

async function getAllTrainingProgramsByProjectID(pr_ID)
{
    try {
        const trainingPrograms = await db.query(`SELECT * FROM Training_Programs WHERE pr_ID = ${pr_ID}`);
        return trainingPrograms    
    } catch (error) {
        console.log(error);
    }
}

async function getAllTrainingProgramsByUserID(user_id)
{
    try {
        const trainingPrograms = await db.query(`SELECT * FROM ((Training_Programs
        INNER JOIN Projects ON Training_Programs.pr_ID = Projects.pr_ID)
        INNER JOIN user_proj ON Projects.pr_ID = user_proj.pr_id)
        WHERE user_proj.user_id = ${user_id}`);
        return trainingPrograms    
    } catch (error) {
        console.log("********** ERROR IN getAllTrainingProgramsByUserID()<TrainingProgramModel.js");
        console.log(error);
    }
}

async function deleteTrainingProgram(prog_ID) {
    try {
        if (!prog_ID) {
            console.error("deleteTrainingProgram error: prog_ID is missing");
            return { success: false };
        }

        const sql = `DELETE FROM Training_Programs WHERE prog_ID = ${Number(prog_ID)}`;
        console.log("--> Executing Delete Query:", sql);

        if (typeof db.execute === 'function') {
            await db.execute(sql);
        } else {
            await db.query(sql);
        }

        return { success: true };
    } catch (error) {
        console.error("Error in prog_ID:", error.message);
        throw error;
    }
}

async function addTrainingProgram(programData) {
    try {
        const {
            prog_title,
            prog_title_En,
            prog_description,
            prog_duration,
            pr_ID,
            type_id
        } = programData;

        const escapeSql = (str) => (str && str.trim() !== '' ? `'${str.replace(/'/g, "''")}'` : 'NULL');

        const sql = `
            INSERT INTO Training_Programs (
                prog_title, 
                prog_title_En, 
                prog_description, 
                prog_duration, 
                pr_ID, 
                type_id
            ) VALUES (
                ${escapeSql(prog_title)}, 
                ${escapeSql(prog_title_En)}, 
                ${escapeSql(prog_description)}, 
                ${prog_duration ? Number(prog_duration) : 'NULL'}, 
                ${pr_ID ? Number(pr_ID) : 'NULL'}, 
                ${type_id ? Number(type_id) : 'NULL'}
            )
        `;

        console.log("--> Executing Training Program Insert SQL:", sql);

        if (typeof db.execute === 'function') {
            await db.execute(sql);
        } else {
            await db.query(sql);
        }

        return { success: true };
    } catch (error) {
        console.error("Error in addTrainingProgram model:", error.message);
        throw error;
    }
}

module.exports = {getAllTrainingProgramsByProjectID, deleteTrainingProgram, addTrainingProgram, getAllTrainingProgramsByUserID}