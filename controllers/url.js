const shortid = require("shortid");
const Url = require("../models/url");

async function updateVisitedHistory(req, res) {
  const shortId = req.params.shortId;
  const urlEntry = await Url.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitedHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(urlEntry?.redirectUrl);
}

async function generateShortUrl(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "Url is required" });
  }

  const shortId = shortid();

  await Url.create({
    shortId,
    redirectUrl: body.url,
    visitedHistory: [],
    createdBy: req.user._id,
  });

  // return res.json({ id: shortId });
  return res.render("home", {
    id: shortId,
  });
}

async function getAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await Url.findOne({ shortId });

  return res.json({
    totalClicks: result.visitedHistory.length,
    anayltics: result.visitedHistory,
  });
}

module.exports = {
  updateVisitedHistory,
  generateShortUrl,
  getAnalytics,
};
