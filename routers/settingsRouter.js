const express = require("express");
const router = express.Router();

const requireAuth = (req, res, next) => {
    if (req.session.username) {
        
        next();
    } else {
        res.redirect("/");
    }
};

router.post("/changeProject", requireAuth, (req, res) => {
    const { new_project_id, new_project_title } = req.body;

    
    if (new_project_id) {
        req.session.projectID = new_project_id;
        req.session.projectTitle = new_project_title || "مستند بدون عنوان";

        if (req.session.projectID == 6) {
            req.session.projectTitle = "كنانة اونلاين (مشاركات)";
        }
        if (req.session.projectID == 7) {
            req.session.projectTitle = "كنانة اونلاين (منشورات)";
        }
        
        req.session.save((err) => {
            if (err) {
                console.error("Error saving session:", err);
                return res.status(500).send("خطأ أثناء تحديث الجلسة");
            }
            res.redirect("/Dashboard");
        });
    } else {
        res.redirect("/Settings");
    }
});

module.exports = router;