const express = require("express");
const router = express.Router();
const registerController = require("../../controllers/registerControllers");

// 👇 ADD THIS LINE TO DEBUG
// console.log("Loaded Controller:", registerController);

router.post("/", registerController.handleNewuser);

module.exports = router;
