const db = require("../config/db");

async function getAllOutputsByUserID(user_id)
{
    try {
        const outputs = await db.query(`SELECT Outputs.* FROM Outputs
        INNER JOIN user_proj ON user_proj.pr_id = Outputs.pr_ID  
        WHERE user_proj.user_id = ${user_id}`);
        return outputs;
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {getAllOutputsByUserID};