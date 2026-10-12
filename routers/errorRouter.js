const express = require("express");
const router = express.Router();


// *************** ERROR Routers ************
router.get("/ErrorNoProject", (req, res)=>{
    res.render("ErrorNoProject");
});

router.get("/ErrorNoEvent", (req, res)=>{
    res.render("ErrorNoEvent");
});

module.exports = router;