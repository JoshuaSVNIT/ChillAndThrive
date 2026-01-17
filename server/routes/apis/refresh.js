const express = require("express");
const router = express.Router();
const refreshTokenController = require("../../controllers/refreshTokenControllers");

// 👇 ADD THIS LINE TO DEBUG
// console.log("Loaded Controller:", refreshTokenController);

router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;
