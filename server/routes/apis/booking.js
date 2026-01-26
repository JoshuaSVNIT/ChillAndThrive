const express = require("express");
const router = express.Router();
const bookingController = require("../../controllers/bookingControllers");
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/rolesList");

router.get("/availability", bookingController.getAvailability);

// PROTECTED ROUTES (Must be logged in to book)
router.use(verifyJWT);

router
  .route("/")
  .post(bookingController.createBooking)
  .get(bookingController.getMyBookings);

router
  .route("/all")
  .get(verifyRoles(ROLES_LIST.Admin), bookingController.getAllBookings);
module.exports = router;
