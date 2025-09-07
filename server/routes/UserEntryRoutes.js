const express = require("express");
const router = express.Router();
const PlayerEntryController = require("../controllers/UserEntryController");

router.post("/sign-up", PlayerEntryController.createUserPost);

module.exports = router;
