const db = require("../config/db");

async function getUserByUserName(name)
{
    try {
        console.log(name);
        const user = await db.query(`SELECT * FROM users WHERE username = '${name}'`);
        // console.log(user[0]);
        return user[0];
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {getUserByUserName}