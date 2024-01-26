const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User"); // Add this line to import the User model

dotenv.config();

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      (req.header("Authorization") || "").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Token Missing" });
    }

    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({ success: false, message: "Token is invalid" });
    }

    next();

  } catch (error) {
    return res.status(401).json({ message: "Something went wrong while validating the token" });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({ email: req.user.email });

    if (userDetails.accountType !== "Admin") {
      return res.status(401).json({
        message: "This is a Protected Route for Admin",
      });
    }

    next();

  } catch (error) {
    return res.status(500).json({ message: "Access Denied" });
  }
};
