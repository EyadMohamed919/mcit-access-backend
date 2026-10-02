const db = require("../config/db");

async function getAllEventsByProjectID(pr_id)
{
    
    try {
        if(!pr_id)
        {
            throw new Error("ProjectID is empty in getAllEventsByProjectID() in EventModel.js"); 
        }
        const events = await db.query(`SELECT * FROM Events WHERE pr_id = ${pr_id}`)
        return events;
    } catch (error) {
        console.log("********** ERROR IN EventModel.js **********");
        console.error(error.message);
    }
    
}

module.exports = {getAllEventsByProjectID}