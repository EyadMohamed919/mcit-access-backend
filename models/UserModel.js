const db = require("../config/db");

function getUserByUserName(name)
{
    try {
        const user = db.query(`SELECT * FROM users WHERE username = '${name}' LIMIT 1`);
        return user;
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {getUserByUserName}