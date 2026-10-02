const express = require("express");
const router = express.Router();


// *************** ERROR Routers ************
router.get("/ErrorNoProject", (req, res)=>{
    res.render("ErrorNoProject");
});

module.exports = router;