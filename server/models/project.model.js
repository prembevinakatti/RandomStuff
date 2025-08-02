const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Auth",
  },
  projectTitle: {
    type: String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  projectSummary: {
    type: String,
    // required: true,
  },
  projectTechnologies: [
    {
      type: String,
      required: true,
    },
  ],
  projectImages: [
    {
      type: String,
      required: true,
    },
  ],
  githubLink: {
    type: String,
    required: true,
  },
  previewLink: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.model("Project", projectSchema);
