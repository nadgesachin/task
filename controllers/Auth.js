const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");

// Loading environment variables from .env file
dotenv.config();

// Signup Controller for Registering USers

exports.signup = async (req, res) => {
  try {
    // Destructure fields from the request body
    const {firstName,lastName,email,password,confirmPassword,accountType} = req.body
    // Check if All Details are there or not
    if (!firstName ||!lastName ||!email ||!password ||!confirmPassword||!accountType) {
      return res.status(403).send({message: "All Fields are required"})
    }
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({message:"Password and Confirm Password do not match, Please try again."})
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({message: "User already exists, Please sign in to continue."})
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    //Save Data in Database1
    const user = await User.create({firstName,lastName,email,password:hashedPassword,accountType})

    return res.status(200).json({user,message: "User registered successfully"})
  } catch (error) {
    return res.status(500).json({message: "User cannot be registered, Please try again."})
    console.error(error)
  }
}

// Login controller for authenticating users
exports.login = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body
 
    // Check if email or password is missing
    if (!email || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({message: `Please Fill up All the Required Fields`})
    }

    // Find user with provided email
    const user = await User.findOne({ email });

    // If user not found with provided email
    if (!user) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({message: `User is not Registered with Us Please SignUp to Continue`})
    }

    // Generate JWT token and Compare Password
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id},
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      )

      // Save token to user document in database
      user.token = token
      user.password = undefined

      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }
      res.cookie("token", token, options).status(200).json({token,user,message: `User Login Success`})
    } else {
      return res.status(401).json({message: `Password is incorrect`})
    }
  } catch (error) {
    console.error(error)
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({message: `Login Failure Please Try Again`})
  }
}

// Login controller for authenticating users
exports.home = async (req, res) => {
    try {
    return res.status(200).json({message: `You are in Home Page`})
    } catch (error) {
      console.error(error)
      // Return 500 Internal Server Error status code with error message
      return res.status(500).json({message: `Something Goes Wrong`})
    }
  }

// Login controller for authenticating users
exports.settings = async (req, res) => {
  try {
  return res.status(200).json({message: `You are in Admin Settings Page`})
  } catch (error) {
    console.error(error)
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({message: `Something Goes Wrong`})
  }
}

  