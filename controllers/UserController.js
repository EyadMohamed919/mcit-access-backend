const {getUserByUserName} = require("../models/UserModel");

const login = async (req, res) =>{
    const name = req.body.name;
    const password = req.body.password;
    const user = await getUserByUserName(name);
    if(user.password == password)
    {
        res.redirect("/Dashboard")
    }
    res.send(user.username);
}

module.exports = {login}