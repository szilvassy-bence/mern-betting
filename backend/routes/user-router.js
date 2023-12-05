import express from "express";
import { body, validationResult } from "express-validator";
const router = express.Router();
import User from "../models/UserModel.js"


// WHAT TO IMPLEMENT
// Cryping the password
// checking authorization with token, by creating a Middleware
// authentication and authorization JWT
// error handling with a middleware that also logs errors
/* const myMiddleware = (req, res, next) => {
  if (req.headers.authorization === 'secret-token') {
    // Continue to the next middleware if the token is valid
    next();
  } else {
    // Terminate the middleware chain and send a forbidden response
    res.status(403).send('Forbidden');
  }
}; */




router.get("/", (req, res) => {
	res.send("Siker")
})

// to make a registration
// i need the model's required information sent by req.body
router.post("/register",
	body("firstName", "First name must not be empty, must have at least two characters, the first character must be a character from a-z or A-Z.")
		.trim()
		.isLength({min:2})
		.matches(/^[a-zA-Z][a-zA-z0-9-_]{2,23}$/),

	body("lastName", "Last name must not be empty, must have at least two characters, the first character must be a character from a-z or A-Z.")
		.trim()
		.isLength({min:2})
		.matches(/^[a-zA-Z][a-zA-z0-9-_]{2,23}$/),
		
	body("email", "Email must be a valid email address.")
		.trim()
		.isEmail()
		.custom(async value => {
			console.log(value);
			const existingUser = await User.findOne({email: value});
			console.log(existingUser);
			if (existingUser) {
				throw new Error("Email is already in use.")
			}
		}),

	body("phone", "Phone must not be empty.")
		.trim()
		.isLength({min:1}),

	body("password", "Password must be at least 8 characters and include at least one small letter, one capital letter, and one number, and one special characters from: !@#$%.")
		.trim()
		.isLength({min:1})
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/),


	async (req, res) => {

		const data = req.body;
		data.createdAt = new Date();

    // Extract the validation errors from a request.
    const errors = validationResult(req);
		console.log(errors);

		if (!errors.isEmpty()) {
			console.log("Errors is not empty:", errors);
			return res.status(500).json({errors})
		}


		try {
			const user = await User.create(data);
			res.status(200).json(user)
		} catch(err) {
			console.log(err, "Error creating the user");
			return res.status(500).json(err)
		}
	})

export default router