const express = require("express");
const router = express.Router();
const { addNewOutput } = require("../controllers/OutputController");

router.post("/AddOutput", addNewOutput);
// router.post("/DeleteEvent", deleteEventByID)

module.exports = router;