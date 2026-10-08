const express = require("express");
const router = express.Router();
const { addNewEvent, deleteEventByID, editEvent } = require("../controllers/EventController");

router.post("/AddEvent", addNewEvent);
router.post("/EditEvent", editEvent);
router.post("/DeleteEvent", deleteEventByID)

module.exports = router;