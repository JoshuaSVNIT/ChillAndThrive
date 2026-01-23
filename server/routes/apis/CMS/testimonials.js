const express = require("express");
const router = express.Router();
const testimonialControllers = require("../../../controllers/CMS/testimonialControllers");

router.get("/", testimonialControllers.getAllTestimonials);

module.exports = router;
