const express = require("express");
const router = express.Router();
const { addNewEvent } = require("../controllers/EventController");

router.post("/AddEvent", addNewEvent);

module.exports = router;