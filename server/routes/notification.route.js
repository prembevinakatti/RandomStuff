const express = require("express");
const router = express.Router();
const {
  getUserNotifications,
  markAsRead,
} = require("../controllers/notification.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getUserNotifications);
router.patch("/:id/read", authMiddleware, markAsRead);

module.exports = router;
