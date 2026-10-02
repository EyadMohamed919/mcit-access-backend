const db = require("../config/db");

async function getAllOutputsByUserID(pr_id)
{
    try {
        const outputs = await db.query(`SELECT Outputs.* FROM Outputs
        WHERE Outputs.pr_ID = ${pr_id}`);
        return outputs;
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {getAllOutputsByUserID};