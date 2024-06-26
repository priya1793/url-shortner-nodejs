const express = require("express");
const { userLogin, userRegistration } = require("../controllers/user");
const router = express.Router();

router.post("/", userRegistration);
router.post("/login", userLogin);

module.exports = router;
