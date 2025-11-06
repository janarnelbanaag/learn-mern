import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required",
            });
        }

        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const user = new User({ username, password });
        user.token = user.generateToken();
        await user.save();

        res.status(201).json(user);
    } catch (error) {
        console.error("Error in signup controller:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: {
                name: error.name,
                message: error.message,
            },
        });
    }
};
