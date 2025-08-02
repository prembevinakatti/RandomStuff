const commentModel = require("../models/comment.model");
const { io } = require("../server");

module.exports.comment = async (req, res) => {
  try {
    const { projectId, commentedUser, commentText } = req.body;
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!projectId || !commentedUser || !commentText) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const comment = await commentModel.create({
      projectId,
      commentedUser,
      commentText,
    });

    if (!comment) {
      return res.status(500).json({ message: "Failed to create comment" });
    }

    const fullComment = await comment.populate("commentedUser", "username");

    io.emit("getComment", {
      projectId: fullComment.projectId,
      commentedUser: fullComment.commentedUser,
      commentText: fullComment.commentText,
      createdAt: fullComment.createdAt,
    });

    return res.status(201).json({
      message: "Commented Successfully ",
      success: true,
      comment: comment,
    });
  } catch (error) {
    console.log("Error submitting comment : ", error.message);
  }
};

module.exports.getCommentsByPost = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!projectId) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const comments = await commentModel
      .find({ projectId: projectId })
      .populate({
        path: "commentedUser",
        populate: {
          path: "profileId",
        },
      });

    if (!comments) {
      return res.status(404).json({ message: "No comments found" });
    }

    return res.status(200).json({
      message: "Comments Fetched Successfully",
      success: true,
      comments: comments,
    });
  } catch (error) {
    console.log("Error getting comments by post : ", error.message);
    return res.status(500).json({
      message: "Error Getting Comment from Particualr Posts : ",
      error: error.message,
    });
  }
};
