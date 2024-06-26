const express = require("express");
const {
  updateVisitedHistory,
  getAnalytics,
  generateShortUrl,
} = require("../controllers/url");

const router = express.Router();

router.get("/:shortId", updateVisitedHistory);

router.post("/", generateShortUrl);

router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
