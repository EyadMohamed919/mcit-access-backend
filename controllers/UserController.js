// controllers/UserController.js
const { getUserByUserName } = require("../models/UserModel");

const login = async (req, res) => {
    try {
        const name = req.body.name;
        const password = req.body.password;

        const user = await getUserByUserName(name);

        if (user && user.password == password) {
            req.session.username = user.username;
            req.session.user_id = user.ID;

            return req.session.save((err) => {
                if (err) {
                    console.error("Session save error:", err);
                    return res.status(500).send("Session save failed");
                }
                return res.redirect("/Dashboard");
            });
        } else {
            return res.redirect("/");
        }
    } catch (error) {
        console.error("Login controller error:", error);
        return res.redirect("/");
    }
};

module.exports = { login };