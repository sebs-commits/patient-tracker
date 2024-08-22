const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify JWT token
const authenticate = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: "Invalid token" });
  }
};

const authorize = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res
      .status(403)
      .json({ message: "Access denied, insufficient permissions" });
  }
  next();
};

module.exports = { authenticate, authorize };
