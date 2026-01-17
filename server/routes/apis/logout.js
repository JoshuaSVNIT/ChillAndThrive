const express = require("express");
const router = express.Router();
const logoutControllers = require("../../controllers/logoutControllers");

// 👇 ADD THIS LINE TO DEBUG
// console.log("Loaded Controller:", logoutControllers);

router.get("/", logoutControllers.handleLogout);
//according to internet .get due to "getting" logout action
//Prankster could sent '/' from browser and logout the user

module.exports = router;
