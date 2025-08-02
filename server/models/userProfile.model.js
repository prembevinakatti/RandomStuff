const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", required: true },

  profileimage: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
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
  totalProjects: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
