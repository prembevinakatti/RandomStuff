const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.post("/create", profileController.createProfile);
router.get("/:userId", profileController.getProfileByUserId);
router.put("/:userId", profileController.updateProfile);
router.delete("/:userId", profileController.deleteProfile);
router.get("/", profileController.getAllProfiles);

module.exports = router;
