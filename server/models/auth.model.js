const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const authModel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: Number,
    required: true,
  },
  otpExpire: {
    type: Date,
    required: true,
  },
  // profileId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "Profile",
  // },
});

authModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("Auth", authModel);
