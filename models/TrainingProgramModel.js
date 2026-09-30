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

module.exports = {getAllTrainingProgramsByProjectID}