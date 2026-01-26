const express = require("express");
const router = express.Router();
const userControllers = require("../../controllers/userControllers");
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/rolesList");

router.use(verifyJWT);
//the next() inside verifyJWT tells it to move forward to next 👇 code
router.route("/myProfile").get(userControllers.myProfile); // View single profile

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), userControllers.getAllUsers) // Admin sees list
  .delete(verifyRoles(ROLES_LIST.Admin), userControllers.deleteUser); // Admin deletes user

router
  .route("/:id")
  .get(verifyRoles(ROLES_LIST.Admin), userControllers.getUser); // View single profile

module.exports = router;
