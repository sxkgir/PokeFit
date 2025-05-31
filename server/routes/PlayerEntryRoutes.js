const express = require("express");
const router = express.Router();
const PlayerEntryController = require("../controllers/PlayerEntryController");

router.get("/:userID", PlayerEntryController.findPlayer);
router.post("/create", PlayerEntryController.addPlayer);

module.exports = router;