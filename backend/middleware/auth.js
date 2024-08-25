const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify JWT token
const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      console.log("No token provided");
      return res
        .status(401)
        .json({ message: "Access denied, no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Token verified, user:", req.user);
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res
      .status(400)
      .json({ message: "Invalid token", error: error.message });
  }
};

// Middleware to check user role authorization
const authorize = (requiredRole) => (req, res, next) => {
  try {
    console.log("Authorize middleware triggered");
    console.log("req.user:", req.user); // Log the decoded user object

    const userRole = req.user.role; // Extract the user's role from the JWT token
    console.log("User role:", userRole); // Log the user's role
    console.log("Required role:", requiredRole); // Log the required role

    if (userRole !== requiredRole) {
      console.log(
        `Access denied: required role ${requiredRole}, but user has role ${userRole}`
      );
      return res.status(403).json({
        message: "Access denied, insufficient permissions",
        expectedRole: requiredRole,
        userRole: userRole,
      });
    }

    console.log("User role authorized:", userRole); // Log successful authorization
    next(); // If roles match, proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authorization error:", error.message);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { authenticate, authorize };
