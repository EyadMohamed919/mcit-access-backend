const db = require("../config/db");

async function getAllGovs()
{
    const govs = await db.query("SELECT * FROM Governorates");
    return govs;
}

module.exports = {getAllGovs};