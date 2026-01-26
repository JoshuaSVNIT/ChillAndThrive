const express = require("express");
const router = express.Router();
const paymentController = require("../../controllers/paymentControllers");

router.post("/order", paymentController.createOrder);

module.exports = router;
