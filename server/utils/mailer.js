const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function sendOtpEmail(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for RandomStuff",
    text: `Your OTP is ${otp}. Please do not share this OTP with anyone. It is valid for 10 minutes.`,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendOtpEmail };
