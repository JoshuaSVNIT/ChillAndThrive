const express = require("express");
const path = require("path");
const router = express.Router();

// temporary

router.get(["/", "/index", "/index.html"], (req, res) => {
  res.sendFile(path.join(__dirname, "..", "htmls", "index.html"));
});
router.get(["/page2.html", "/page2"], (req, res) => {
  res.sendFile(path.join(__dirname, "..", "htmls", "page2.html"));
});

module.exports = router;
