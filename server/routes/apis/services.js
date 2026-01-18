const express = require("express");
const router = express.Router();
const serviceControllers = require("../../controllers/serviceControllers");

// 👇 ADD THIS LINE TO DEBUG
// console.log("Loaded Controller:", serviceControllers);

router.get("/", serviceControllers.getAllServices);

module.exports = router;
