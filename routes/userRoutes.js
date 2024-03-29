// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {login,signup,home} = require("../controllers/Auth")
const { auth } = require("../middleware/auth")

// Routes for Login, Signup, and Authentication

//---------------------------------------Authentication routes---------------------------------------

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for user main
router.get("/home",auth, home)

// Export the router for use in the main application
module.exports = router
