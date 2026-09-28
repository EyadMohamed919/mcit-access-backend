const {getUserByUserName} = require("../models/UserModel");

const login = (req, res) =>{
    const name = req.body.name;
    res.send(name);
}

module.exports = {login}