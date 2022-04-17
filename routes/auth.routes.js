const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

const router = Router();

router.post(
	"/singup",
	[
		check("email", "incorrect email").isEmail(),
		check("password", "min password length is 8 characters").isLength({ min: 8 }),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if ( !errors.isEmpty() ) return res.status(400).json({ errors: errors.array(), message: "incorrect data on registration" });

			const { email, password } = req.body;
			const candidate = await User.findOne({ email });
			if (candidate) return res.status(400).json({ message: "user with this email already exists" });
			
			const hashedPassword = await bcrypt.hash(password, 10);
			
			const user = new User({ email, password: hashedPassword });
			await user.save();
			res.status(201).json({ message: "user has been successfully created" });

		} catch (e) {
			res.status(500).json({ message: "something was wrong. try again :/" });
		}
});

router.post(
	"/login",
	[
		check("email", "enter the correct email").isEmail(),
		check("password", "enter the correct password").exists(),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if ( !errors.isEmpty() ) return res.status(400).json({ errors: errors.array(), message: "incorrect data when entering the system" });
			
			const { email, password } = req.body;
			const user = await User.findOne({ email });
			if (!user) return res.status(400).json({ message: "user is not found" });
			
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) return res.status(400).json({ message: "invalid password, try again" });

			const token = jwt.sign(
				{userId: user.id},
				config.get("jwtSecretKey"),
				{ expiresIn: "1h" }
			);
			res.status(200).json({ token, userId: user.id });
	
		} catch (e) {
			res.status(500).json({ message: "something was wrong. try again ://" });
		}
});

module.exports = router;