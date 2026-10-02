const express = require("express");
const router = express.Router();
const { addNewEvent, deleteEventByID } = require("../controllers/EventController");

router.post("/AddEvent", addNewEvent);
router.post("/DeleteEvent", deleteEventByID)

module.exports = router;