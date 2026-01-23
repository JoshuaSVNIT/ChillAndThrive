const express = require("express");
const router = express.Router();
const eventControllers = require("../../../controllers/CMS/eventControllers");
router.get("/", eventControllers.getAllEvents);

module.exports = router;
