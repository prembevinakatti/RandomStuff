const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  comment,
  getCommentsByPost,
} = require("../controllers/comment.controller");

const router = express.Router();

router.route("/addComment").post(authMiddleware, comment);
router.route("/getComment/:projectId").get(authMiddleware, getCommentsByPost);

module.exports = router;
