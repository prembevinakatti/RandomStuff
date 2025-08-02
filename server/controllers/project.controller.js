const notificationModel = require("../models/notification.model");
const projectModel = require("../models/project.model");
const { io } = require("../server");

module.exports.uploadProject = async (req, res) => {
  try {
    const {
      projectTitle,
      projectImages,
      projectDescription,
      projectSummary,
      githubLink,
      previewLink,
      projectTechnologies,
    } = req.body;
    const userId = req.user._id;

    if (
      !projectTitle ||
      !projectSummary ||
      !projectImages ||
      !projectDescription ||
      !githubLink ||
      !previewLink ||
      !projectTechnologies
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const project = await projectModel.create({
      userId,
      projectTitle,
      projectDescription,
      projectImages,
      projectSummary,
      projectTechnologies,
      previewLink,
      githubLink,
    });

    io.emit("newProjectUpload", project);

    return res.status(201).json({
      message: "Project Uploaded successfully",
      success: true,
      project: project,
    });
  } catch (error) {
    console.log("Error Uploaded Project in server : ", error.message);
    return res.status(500).json({ message: "Error Uploaded Project" });
  }
};

module.exports.getAllProjects = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const allProjects = await projectModel.find({}).populate({
      path: "userId",
      populate: {
        path: "profileId",
      },
    });
    if (!allProjects) {
      return res.status(404).json({ message: "No Projects Found" });
    }

    return res.status(200).json({
      message: "All Projects fetched successfully",
      success: true,
      projects: allProjects,
    });
  } catch (error) {
    console.log("Error in getAllProjects in server : ", error.message);
    return res.status(500).json({ message: "Error fetching projects" });
  }
};

module.exports.getProjectById = async (req, res) => {
  try {
    const userId = req.user._id;
    const projectId = req.params.projectId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    if (!projectId) {
      return res.status(404).json({ message: "Project Not Found" });
    }

    const project = await projectModel.findById(projectId).populate({
      path: "userId",
      populate: {
        path: "profileId",
      },
    });

    if (!project) {
      return res.status(404).json({ message: "Project Not Found" });
    }

    return res.status(200).json({
      message: "Project fetched successfully",
      success: true,
      project: project,
    });
  } catch (error) {
    console.log("Error in getProjectById in server : ", error.message);
    return res.status(500).json({ message: "Error fetching project" });
  }
};

module.exports.deleteProject = async (req, res) => {
  try {
    const userId = req.user._id;
    const projectId = req.params.projectId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    if (!projectId) {
      return res.status(404).json({ message: "Project Not Found" });
    }

    const project = await projectModel.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({ message: "Error Deleting Project" });
    }

    return res.status(200).json({
      message: "Project deleted successfully",
      success: true,
      project: project,
    });
  } catch (error) {
    console.log("Error in Deleting Project in server : ", error.message);
    return res.status(500).json({ message: "Error deleting project" });
  }
};

module.exports.likeUnlinkProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const userId = req.user._id;

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required." });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    const project = await projectModel.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project Not Found" });
    }

    const alreadyLiked = project.likes.includes(userId.toString());

    const sendNotification = async ({
      senderId,
      recipientId,
      message,
      link,
    }) => {
      const notification = await notificationModel.create({
        sender: senderId,
        recipient: recipientId,
        message,
        link,
      });

      const populatedNotification = await notificationModel
        .findById(notification._id)
        .populate("sender")
        .populate("recipient");

      console.log("Emitting Populated Notification:", populatedNotification);

      io.to(recipientId.toString()).emit(
        "newNotification",
        populatedNotification
      );
    };

    if (alreadyLiked) {
      project.likes = project.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      project.likes.push(userId);
      await sendNotification({
        senderId: req.user._id,
        recipientId: project.userId,
        message: "liked your project",
        link: `/project/${project._id}`,
      });
    }

    await project.save();

    io.emit("projectLikeUpdated", {
      projectId: project._id.toString(),
      totalLikes: project.likes.length,
    });

    return res.status(200).json({
      message: alreadyLiked
        ? "Project unliked successfully"
        : "Project liked successfully",
      totalLikes: project.likes.length,
      liked: !alreadyLiked,
    });
  } catch (error) {
    console.error("Error in liking/unliking project:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getUserProjects = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(404).json({ message: "User Id Required" });
    }

    const projects = await projectModel.find({ userId: userId }).populate({
      path: "userId",
      populate: {
        path: "profileId",
      },
    });

    if (!projects) {
      return res
        .status(404)
        .json({ message: "Projects Not Found", success: false });
    }

    return res.status(200).json({
      message: "Projects Fetched Successfully",
      success: true,
      projects: projects,
    });
  } catch (error) {
    console.error("Error getting project:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
