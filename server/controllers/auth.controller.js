const authModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const transporter = require("../services/email.service");
const generateOtp = require("../utils/generateOtp");
const { sendOtpEmail } = require("../utils/mailer");

module.exports.register = async (req, res) => {
  try {
    const { username, email, contactNumber, password } = req.body;

    if (!username || !email || !contactNumber || !password) {
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
      contactNumber,
      email,
    });

    const AuthToken = jwt.sign({ user: newUser }, process.env.AUTH_JWT_TOKEN);
    res.cookie("AuthToken", AuthToken);

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: newUser?.email,
      subject: "🎉 Welcome to RandomStuff – Let's Build Something Great!",
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2>Hey ${newUser?.username},</h2>
      <p>Welcome to <strong>RandomStuff</strong>! 🚀</p>
      <p>We're thrilled to have you join our creative community of builders, developers, and innovators.</p>
      
      <p>Here’s what you can do next:</p>
      <ul>
        <li>🚀 Share your projects and ideas</li>
        <li>💬 Connect and collaborate with others</li>
        <li>🔥 Explore trending creations</li>
      </ul>

      <p>If you ever need help, feel free to reach out to our support team.</p>

      <p>Let’s build something amazing together!</p>

      <br />
      <p>Cheers,</p>
      <p><strong>Team RandomStuff</strong></p>

      <hr style="margin: 20px 0;" />

      <p style="font-size: 14px;">
        Developed with ❤️ by <strong>Onkar Bevinakatti</strong><br />
        <a href="https://onkarportfolio.onrender.com/" target="_blank" style="color: limegreen; text-decoration: none;">
          View My Portfolio
        </a>
      </p>
    </div>
  `,
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
      return res.status(404).json({ message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email or Password is incorrect" });
    }

    const AuthToken = jwt.sign({ user: user }, process.env.AUTH_JWT_TOKEN, {
      expiresIn: "1d",
    });
    res.cookie("AuthToken", AuthToken, {
      httpOnly: true,
      secure: true, // Only over HTTPS
      sameSite: "None", // Required for cross-site requests (e.g., frontend on different domain)
      maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
    });

    return res
      .status(200)
      .json({ message: "User Login Successfull", success: true, user: user });
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
    const email = req.user.email;

    if (!email) {
      return res.status(404).json({ message: "email required" });
    }

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
    return res
      .status(200)
      .json({ message: "otp sent successfully", success: true });
  } catch (error) {
    console.log("error", error.message);
    return res.status(404).json({ message: "error", error: error.message });
  }
};

module.exports.verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.user.email;

    if (!email || !otp) {
      return res.status(404).json({ message: "email and otp required" });
    }

    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    if (user.otp !== otp) {
      return res.status(404).json({ message: "otp does not match" });
    }

    if (user.otpExpire < Date.now()) {
      return res.status(404).json({ message: "otp expired" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    return res
      .status(200)
      .json({ message: "otp verified successfully", success: true });
  } catch (error) {
    console.log("error", error.message);
    return res.status(404).json({ message: "error", error: error.message });
  }
};

module.exports.changepassword = async (req, res) => {
  try {
    const userId = req.user._id;

    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (newPassword !== confirmNewPassword) {
      return res.status(401).json({ message: "Password does not match" });
    }

    const user = await authModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Current Password" });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.log("error", error.message);
  }
};

module.exports.forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(404).json({ message: "email required" });
    }
    const user = await user.findOne({ email });
    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    const resetLink = "";

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: newUser?.email,
      subject: "Request for Password Reset",
      text: `Click the link below to reset your password. This link will expire in 1 hour"${resetLink}"`,
    };

    await transporter.sendMail(mailOption);

    return res
      .status(200)
      .json({ message: "Password reset link sent to your mail" });
  } catch (error) {
    console.log("error", error.message);
  }
};
