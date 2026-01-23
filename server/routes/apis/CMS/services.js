const express = require("express");
const router = express.Router();
const serviceControllers = require("../../../controllers/CMS/serviceControllers");

router.get("/", serviceControllers.getAllServices);

module.exports = router;
