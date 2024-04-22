var jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyUser = (req, res, next) => {
  try {
    if (req.path === "/user-login" || req.path === "/user-register") {
      next();
    } else {
      var token = req.session.user;
      // Decode jwt token if authorized
      jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
          return res.status(401).json({
            message: process.env.UNAUTHORIZED,
            status: false,
          });
        }
        if (decoded && decoded.id) {
          req.user = decoded;
          next();
        } else {
          return res.status(401).json({
            message: process.env.UNAUTHORIZED,
            status: false,
          });
        }
      });
    }
  } catch (e) {
    res.status(400).json({
      message: process.env.ERROR_MESSAGE,
      status: false,
    });
  }
};

module.exports = {
  verifyUser,
};
