const express = require("express");
const {
  uploadProject,
  getAllProjects,
  getProjectById,
  deleteProject,
  likeUnlinkProject,
  getUserProjects,
} = require("../controllers/project.controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/uploadProject").post(authMiddleware, uploadProject);
router.route("/getAllProjects").get(authMiddleware, getAllProjects);
router.route("/getProjectById/:projectId").get(authMiddleware, getProjectById);
router
  .route("/deleteProjectById/:projectId")
  .delete(authMiddleware, deleteProject);
router.route("/likeUnlike/:projectId").put(authMiddleware, likeUnlinkProject);
router.route("/getUserProjects").get(authMiddleware, getUserProjects);

module.exports = router;
