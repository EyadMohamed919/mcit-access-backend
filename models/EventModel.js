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

async function addEvent(eventData) {
    try {
        const {
            event_name,
            event_name_en,
            pr_id,
            event_Date,
            out_id,
            gov_id,
            Age_Group_ID,
            ben_no,
            ben_female,
            ben_male,
            event_desc
        } = eventData;

        const escapeSql = (str) => (str && str.trim() !== '' ? `'${str.replace(/'/g, "''")}'` : 'NULL');
        
        const eventDateVal = event_Date && event_Date.trim() !== '' ? `'${event_Date}'` : 'NULL';

        const sql = `
            INSERT INTO Events (
                event_name_en, 
                pr_id, 
                event_Date, 
                out_id, 
                gov_id, 
                Age_Group_ID, 
                ben_no, 
                ben_female, 
                ben_male, 
                event_desc
            ) VALUES (
                ${escapeSql(event_name_en)}, 
                ${pr_id ? Number(pr_id) : 'NULL'}, 
                ${eventDateVal}, 
                ${out_id && out_id !== '' ? Number(out_id) : 'NULL'}, 
                ${gov_id && gov_id !== '' ? Number(gov_id) : 'NULL'}, 
                ${Age_Group_ID ? Number(Age_Group_ID) : 'NULL'}, 
                ${ben_no ? Number(ben_no) : 0}, 
                ${ben_female ? Number(ben_female) : 0}, 
                ${ben_male ? Number(ben_male) : 0}, 
                ${escapeSql(event_desc)}
            )
        `;

        console.log("--> Executing Event Insert SQL:", sql);

        if (typeof db.execute === 'function') {
            await db.execute(sql);
        } else {
            await db.query(sql);
        }

        return { success: true };
    } catch (error) {
        console.error("Error in addEvent model:", error.message);
        throw error;
    }
}

async function deleteEvent(event_id) {
    try {
        if (!event_id) {
            console.error("deleteEvent error: event_id is missing");
            return { success: false };
        }

        const sql = `DELETE FROM Events WHERE event_id = ${Number(event_id)}`;
        console.log("--> Executing Delete Query:", sql);

        if (typeof db.execute === 'function') {
            await db.execute(sql);
        } else {
            await db.query(sql);
        }

        return { success: true };
    } catch (error) {
        console.error("Error in deleteEvent:", error.message);
        throw error;
    }
}

module.exports = {getAllEventsByProjectID, addEvent, deleteEvent}