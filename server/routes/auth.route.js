const express = require("express");
const {
  register,
  login,
  logout,
  getUser,
  requestOtp,
  verifyOtp,
  changepassword,
  forgotpassword,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/authMiddleware");
const captchaVerify = require("../middleware/captchaVerify");

const router = express.Router();

router.route("/register").post(captchaVerify,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/getUser").get(getUser);
router.route("/requestOtp").post(authMiddleware, requestOtp);
router.route("/verifyOtp").post(authMiddleware, verifyOtp);
router.route("/changePassword").post(authMiddleware,changepassword)
router.route("/forgotPassword").post(authMiddleware,forgotpassword)

module.exports = router;
