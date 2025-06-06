const express = require("express");
const {
  register,
  login,
  logout,
  getUser,
  requestOtp,
  verifyOtp,
} = require("../controllers/auth.controller");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/getUser").get(getUser);
router.route("/requestOtp").post(requestOtp);
router.route("/verifyOtp").post(verifyOtp);

module.exports = router;
