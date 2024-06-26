const express = require("express");
const router = express.Router();
const Url = require("../models/url");
const { roleRestrictedUser } = require("../middleware/auth");

router.get("/admin/urls", roleRestrictedUser(["ADMIN"]), async (req, res) => {
  const urlsList = await Url.find({});

  return res.render("home", {
    urls: urlsList,
  });
});

router.get("/", roleRestrictedUser(["USER", "ADMIN"]), async (req, res) => {
  // get all the urls list associated with the logged in user
  const urlsList = await Url.find({ createdBy: req.user._id });

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
