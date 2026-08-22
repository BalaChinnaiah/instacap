const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


async function registerUser(req, res) {

    try {

        const { username, email, password } = req.body;


        // Validate input

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        // Check existing user

        const existingUser = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });


        if (existingUser) {
            return res.status(409).json({
                message: "Username or email already exists"
            });
        }


        // Hash password

        const hashedPassword = await bcrypt.hash(password, 10);


        // Create user

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });


        // Create JWT

        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );


        // Store JWT in cookie

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function loginUser(req, res) {

    try {

        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }


        // Find user

        const user = await userModel.findOne({
            email
        });


        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        // Compare password

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );


        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        // Generate JWT

        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );


        // Store cookie

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function logoutUser(req, res) {

    res.clearCookie("token");

    return res.status(200).json({
        message: "Logout successful"
    });
}

async function getCurrentUser(req, res) {

    try {

        const user = await userModel
            .findById(req.user.userId)
            .select("-password");


        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }


        return res.status(200).json({

            message: "Current user fetched successfully",

            user

        });

    } catch (error) {

        return res.status(500).json({

            message: "Failed to fetch user"

        });

    }
}


module.exports = {
    registerUser, loginUser, logoutUser, getCurrentUser
};