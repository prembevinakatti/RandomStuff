const adminModel = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(404).json({ message: "All fields are required" });
    }

    const user = await adminModel.findOne({ email });

    if (user) {
      return res
        .status(404)
        .json({ message: "User already existed in database" });
    }

    const newuser = await adminModel.create({
      username,
      password,
      email,
    });

    const AdminToken = jwt.sign({ user: newuser }, process.env.ADMIN_JWT_TOKEN);
    res.cookie("AdminToken", AdminToken);

    return res
      .status(200)
      .json({ message: "user created successfully", user: newuser });
  } catch (error) {
    console.log("error", error.message);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({ message: "All fields are required" });
    }

    const user = await adminModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const AdminToken = jwt.sign({ user: user }, process.env.ADMIN_JWT_TOKEN);
    res.cookie("AdminToken", AdminToken);

    return res
      .status(200)
      .json({ message: "login successfully", success: true, user });
  } catch (error) {
    console.log("error", error.message);
  }
};

module.exports.logout = (req, res) => {
  try {
    res.clearCookie("AdminToken");
    return res
      .status(200)
      .json({ message: "user logout successfully", success: true });
  } catch (error) {
    return res.status(404).json({ message: "error", error: error.message });
  }
};
