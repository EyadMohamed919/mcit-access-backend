const db = require("../config/db");

async function getAllEventsByProjectID(pr_id)
{
    try {
        const events = await db.query(`SELECT * FROM Events WHERE pr_id = ${pr_id}`)
        return events;
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {getAllEventsByProjectID}