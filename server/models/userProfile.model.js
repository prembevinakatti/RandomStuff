const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", required: true },
  contactno: { type: String, required: true },

  profileimage: {
    type: String,
  },
  address: {
    city: String,
    state: String,
    country: String,
    pincode: String,
  },
  professioninfo: {
    occupation: String,
    organization: String,
    experience: String,
    skills: String,
    education: String,
  },
  social: {
    linkedin: String,
    github: String,
    portfolio: String,
  },
  projects: {
    totalprojects: String,
    projectsforshowcase: String,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
