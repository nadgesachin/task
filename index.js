// Importing necessary modules and packages
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// Loading environment variables from .env file
dotenv.config();

// Setting up port number
const PORT = process.env.PORT || 4000;

// Connecting to database
database.connect();
 
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors(
		{origin: "*",
		credentials: true
	}));

//http://localhost:5500/api/v1

// Setting up routes
app.use("/api/v1/auth/user", userRoutes);
app.use("/api/v1/auth/admin", adminRoutes);

// Testing the server
// app.get("/", (req, res) => {
// 	return res.json({
// 		success: true,
// 		message: "Testing Server is running..",
// 	});
// });

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
})

// End of code.
