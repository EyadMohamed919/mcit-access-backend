const db = require("../config/db");

async function getUserByUserName(name)
{
    try {
        
        const user = await db.query(`SELECT * FROM users WHERE username = '${name}'`);
        console.log("Returned user: " + user[0]["username"]);
        return user[0];
    } catch (error) {
        console.log("----- ERROR IN UserModel.js -----");
        console.log(error);
    }
    
}

module.exports = {getUserByUserName}