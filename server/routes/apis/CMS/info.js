const express = require("express");
const {
  getAwareness,
  getFAQ,
  getMyths,
} = require("../../../controllers/CMS/infoControllers.js");

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Info API is working!" });
});
router.get("/awareness", getAwareness);
router.get("/faq", getFAQ);
router.get("/myths", getMyths);

module.exports = router;
