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

async function getAgeGroups()
{
    try {
        
        const typesForTrainees = await db.query(`SELECT * FROM Types WHERE type_id in (11, 12, 44, 57, 58)`)
        return typesForTrainees;
    } catch (error) {
        console.log("********** ERROR IN TypeModel.js **********");
        console.error(error.message);
    }
}

async function getOutputTypes()
{
    try {
        
        const typesForTrainees = await db.query(`SELECT * FROM Types WHERE type_id in (11, 12, 13, 14, 22, 23, 26, 31, 32, 33, 35, 39, 58)`)
        return typesForTrainees;
    } catch (error) {
        console.log("********** ERROR IN TypeModel.js **********");
        console.error(error.message);
    }
}

async function getTrainingProgramTypes()
{
    try {
        
        const typesForTrainees = await db.query(`SELECT * FROM Types WHERE type_id in (11, 12, 57, 58)`)
        return typesForTrainees;
    } catch (error) {
        console.log("********** ERROR IN TypeModel.js **********");
        console.error(error.message);
    }
}


module.exports = {getAllTypesForTrainees, getAgeGroups, getOutputTypes, getTrainingProgramTypes}