const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Loading environment variables from .env file
dotenv.config();

//database connection
exports.connect = () => {
	mongoose
		.connect(process.env.MONGODB_URL, {
			useNewUrlparser: true,
			useUnifiedTopology: true,
		})
		.then(console.log(`DB Connection Success`))
		.catch((err) => {
			console.log(`DB Connection Failed: `,err);
			process.exit(1);
		});
};
