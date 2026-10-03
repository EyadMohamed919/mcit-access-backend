const express = require("express");
const router = express.Router();
const { addNewOutput, deleteOutputByID } = require("../controllers/OutputController");

router.post("/AddOutput", addNewOutput);
router.post("/DeleteOutput", deleteOutputByID)

module.exports = router;