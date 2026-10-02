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

async function deleteTrainingProgram(prog_ID) {
    try {
        if (!prog_ID) {
            console.error("deleteTrainingProgram error: prog_ID is missing");
            return { success: false };
        }

        const sql = `DELETE FROM TrainingProgram WHERE prog_ID = ${Number(prog_ID)}`;
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

module.exports = {getAllTrainingProgramsByProjectID, deleteTrainingProgram}