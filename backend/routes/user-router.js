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

router.get("/info/:id", async (req, res) => {
	const id = req.params.id
	const user = await User.findById(id)
	if(user) {
		return res.status(200).json(user)
	} else {
		console.log("Error getting the account");
		return res.status(500).json({})
	}
	
})

router.patch("/update/:id", async (req, res) => {
	const id = req.params.id
	const user = await User.findByIdAndUpdate(id, {email: req.body.email, firstName: req.body.first, lastName: req.body.last, phone: req.body.phone}, {new: true})
	return res.status(200).json(user)
})

router.patch("/deposit/:id", async (req, res) => {
	const id = req.params.id

	try {
		const user = await User.findById(id)

		if (user){
			let updateProp;
			
			if (user.deposit){
				console.log("updated deposit key")
				updateProp = {$set: { deposit: user.deposit + parseInt(req.body.deposit)}}
			} else {
				console.log("added deposit key");
				updateProp = {$set: { deposit: parseInt(req.body.deposit)}}
			}

			const updateAccount = await User.updateOne({ _id: id}, updateProp)

			if(updateAccount.acknowledged) {
				return res.status(200).json({message: "Update successful"})
			} else {
				console.log("update didn't modify");
				return res.status(500).json({message: "Update failed"})
			}
		} 
	} catch (error) {
		console.error("Error during update", error)
		return res.status(500).json({error: "Internal server error", details: error.message})
	}
	/*if (user.deposit){
		const resp = await User.updateOne({_id: id}, {$set: { deposit: user.deposit + parseInt(req.body.deposit)}})
		return res.status(200).json(resp)
	} else {
		console.log("no deposit key yet");
		const resp = await User.updateOne({_id: id}, {$set: { deposit: req.body.deposit}})
		return res.status(200).json(resp)
	}*/
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

// TO CHECK THE LOGIN INFORMATION
router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: 'Email and password are required.' });
	}

	// TO VALIDATE THE EMAIL
	try {
		const user = await User.findOne({ email: email })
		
		if (!user) {
			throw new Error("Email not found. Try again.")		
		} 
		if (user.password === password) {
			console.log("success");
			const id = user._id
			res.status(200).json({id})
		} else {
			res.status(401).json({ error: 'Invalid email or password.' });
		}
	} catch (error) {
		console.log(error.message);
		const {message} = error
		res.status(500).json({message})
	}
})


export default router