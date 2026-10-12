const db = require("../config/db");

async function getAllTypesForTrainees()
{
    try {
        
        const typesForTrainees = await db.query(`SELECT * FROM Types WHERE type_id in (13, 14, 44)`)
        return typesForTrainees;
    } catch (error) {
        console.log("********** ERROR IN TypeModel.js **********");
        console.error(error.message);
    }
}

module.exports = {getAllTypesForTrainees}