const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const authToken = req.cookies.AuthToken;

    if (!authToken) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decodedToken = jwt.verify(authToken, process.env.AUTH_JWT_TOKEN);

    if (!decodedToken) {
      return res.status(401).json({
        message: "Token Invalid",
      });
    }
    req.user = decodedToken.user;
    next();
  } catch (error) {
    console.log("Error in middleware : ", error.message);
  }
};

module.exports = authMiddleware;
