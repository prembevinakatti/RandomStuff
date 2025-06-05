const express = require("express");
const router = express.Router();
const passport = require("passport");

// Import passport strategies setup to register strategies
require("../config/passport");

// Now you can use the strategies:
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
);

module.exports = router;
