const authModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const transporter = require("../services/email.service");
const generateOtp = require("../utils/generateOtp");
const sendOtpEmail = require("../utils/mailer");

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

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: newUser?.email,
      subject: "Welcome to RandomStuff",
      text: `Hello ${newUser?.username},\n\nWelcome to our website! We’re glad to have you on board.\n\nBest regards,\nTeam`,
    };

    await transporter.sendMail(mailOption);

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

module.exports.getUser = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(404).json({ message: "UserId Required" });
    }

    const user = await authModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    return res
      .status(200)
      .json({ message: "user found", success: true, user: user });
  } catch (error) {
    console.log("error", error.message);
  }
};

module.exports.requestOtp = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await authModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const otp = generateOtp();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 min

    user.otp = otp;
    user.otpExpire = otpExpiry;
    await user.save();

    await sendOtpEmail(email, otp);
    return res.status(200).json({ message: "otp sent successfully" });
  } catch (error) {
    console.log("error", error.message);
    return res.status(404).json({ message: "error", error: error.message });
  }
};

module.exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    if (user.otp !== otp) {
      return res.status(404).json({ message: "otp does not match" });
    }

    if (otpExpire < Date.now()) {
      return res.status(404).json({ message: "otp expired" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    return res.status(200).json({ message: "otp verified successfully" });
  } catch (error) {
    console.log("error", error.message);
    return res.status(404).json({ message: "error", error: error.message });
  }
};
