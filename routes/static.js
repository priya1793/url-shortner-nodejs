const express = require("express");
const router = express.Router();

const Url = require("../models/url");

router.get("/", async (req, res) => {
  // check if user does exist?
  if (!req.user) {
    return res.redirect("/login");
  }

  // get all the urls list associated with the logged in user
  const urlsList = await Url.find({ createdBy: req.user._id });

  console.log("urlslist", req.user._id);

  return res.render("home", {
    urls: urlsList,
  });
});

router.get("/register", (req, res) => {
  return res.render("register");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
