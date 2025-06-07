const axios = require("axios");

const captchaVerify = async (req, res, next) => {
  try {
    const { captcha } = req.body;

    if (!captcha) {
      return res.status(400).json({
        success: false,
        message: "Captcha token is missing.",
      });
    }

    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`
    );

    if (!response.data.success) {
      return res.status(400).json({
        success: false,
        message: "Captcha verification failed.",
      });
    }

    next();
  } catch (error) {
    console.log("Error in captcha verify middleware : ", error.message);
  }
};

module.exports = captchaVerify;
