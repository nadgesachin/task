// adminRoutes.js

// Import the required modules
const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const { settings } = require("../controllers/Auth");
const { auth,isAdmin } = require("../middleware/auth");  // Add this line for importing isAdmin middleware

// Routes for Admin Settings, Authorization

//-------------------Admin Settings---------------------------------------

// Route for admin settings with Authorization
router.post("/settings", auth, isAdmin, settings);  // Ensure you have 'auth' middleware as well

// Export the router for use in the main application
module.exports = router;
