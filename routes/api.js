const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.redirect("/user/login");
});

router.get("/logout", (req, res, next) => {
  res.redirect("/user/login");
});

module.exports = router;
