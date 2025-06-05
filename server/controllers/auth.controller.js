const authModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(404).json({ message: "All fields are required" });
    }

    const user = await authModel.findOne({ email });

    if (user) {
      return res
        .status(404)
        .json({ message: "User already existed in database" });
    }

    const newUser = await authModel.create({
      username,
      password,
      email,
    });

    const AuthToken = jwt.sign({ user: newUser }, process.env.AUTH_JWT_TOKEN);
    res.cookie("AuthToken", AuthToken);

    return res.status(200).json({
      message: "user created successfully",
      success: true,
      user: newUser,
    });
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

    const user = await authModel.findOne({ email });

    if (!user) {
      return res.status(204).json({ message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(200).json({ message: "password does not match" });
    }

    const AuthToken = jwt.sign({ user: user }, process.env.AUTH_JWT_TOKEN);
    res.cookie("AuthToken", AuthToken);

    return res
      .status(200)
      .json({ message: "user login successfull", success: true, user: user });
  } catch (error) {
    console.log("error", error.message);
  }
};

module.exports.logout = (req, res) => {
  try {
    res.clearCookie("AuthToken");
    return res
      .status(200)
      .json({ message: "user logout successfully", success: true });
  } catch (error) {
    return res.status(404).json({ message: "error", error: error.message });
  }
};
