const express = require("express");
const router = express.Router();
const { addNewOutput, deleteOutputByID, editOutputRecord } = require("../controllers/OutputController");

router.post("/AddOutput", addNewOutput);
router.post("/DeleteOutput", deleteOutputByID);
router.post("/EditOutput", editOutputRecord);

module.exports = router;