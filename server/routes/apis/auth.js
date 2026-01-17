const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authControllers");

// 👇 ADD THIS LINE TO DEBUG
// console.log("Loaded Controller:", authController);

router.post("/", authController.handleLogin);

module.exports = router;
