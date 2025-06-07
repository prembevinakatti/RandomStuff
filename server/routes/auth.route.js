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
  // resetpassword,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/getUser").get(getUser);
router.route("/requestOtp").post(authMiddleware, requestOtp);
router.route("/verifyOtp").post(authMiddleware, verifyOtp);
router.route("/changepassword").post(authMiddleware,changepassword)
router.route("/forgotpassword").post(authMiddleware,forgotpassword)
// router.route("/resetpassword").post(authMiddleware,resetpassword)

module.exports = router;
