const express = require("express");
const router = express.Router();
const bookingController = require("../../controllers/bookingControllers");
const verifyJWT = require("../../middleware/verifyJWT");

router.get("/availability", bookingController.getAvailability);

// PROTECTED ROUTES (Must be logged in to book)
router.use(verifyJWT);

router
  .route("/")
  .post(bookingController.createBooking)
  .get(bookingController.getMyBookings);

module.exports = router;
