const db = require("../config/db");

function getUserByUserName(name)
{
    const user = db.query(`SELECT * FROM users WHERE username = '${name}' LIMIT 1`);
    return user;
}

module.exports = {getUserByUserName}