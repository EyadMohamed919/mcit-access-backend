const db = require("../config/db");

async function getAllProtocols()
{
    try {
        const protocols = await db.query("SELECT * FROM Protocols");
        return protocols;
    } catch (error) {
        console.log("************* ERROR IN ProtocolsModel.js");
        console.error(error.message);
    }
    
}

module.exports = {getAllProtocols}