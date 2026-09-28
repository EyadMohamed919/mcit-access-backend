const db = require("../config/db");

async function getUserByUserName(name)
{
    try {
        const user = await db.query(`SELECT * FROM users WHERE username = '${name}'`);
        return user[0];
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {getUserByUserName}