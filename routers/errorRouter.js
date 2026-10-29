const express = require("express");
const router = express.Router();
// *************** ERROR Routers ************
router.get("/ErrorNoProject", (req, res)=>{
    res.render("ErrorNoProject");
});

router.get("/ErrorNoEvent", (req, res)=>{
    res.render("ErrorNoEvent");
});

router.get("/ErrorNoTrainee", (req, res)=>{
    res.render("ErrorNoTrainee");
});

module.exports = router;