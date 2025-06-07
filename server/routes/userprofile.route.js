const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createProfile,
  getProfileByUserId,
  updateProfile,
  getAllProfiles,
} = require("../controllers/profile.controller");

router.route("/createProfile").post(authMiddleware, createProfile);
router.route("/getProfileByUserId").get(authMiddleware, getProfileByUserId);
router.route("/updateProfile").put(authMiddleware, updateProfile);
router.route("/getAllProfiles").get(authMiddleware, getAllProfiles);

module.exports = router;
