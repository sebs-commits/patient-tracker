const express = require("express");
require("dotenv").config();
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { registerUser, loginUser } = require("../controllers/authController");

// Register a new user
router.post("/register", registerUser);
// Login a user and generate a token
router.post("/login", loginUser);
module.exports = router;
