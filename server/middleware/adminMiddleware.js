const jwt = require("jsonwebtoken");

const adminMiddleware = async (req, res, next) => {
  try {
    const adminToken = req.cookies.AdminToken;

    if (!adminToken) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decodedToken = jwt.verify(adminToken, process.env.ADMIN_JWT_TOKEN);

    if (!decodedToken) {
      return res.status(401).json({
        message: "Token Invalid",
      });
    }

    req.admin = decodedToken.admin;
    next();
  } catch (error) {
    console.log("Error in admin middleware : ", error.message);
  }
};

module.exports = adminMiddleware;
