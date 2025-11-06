import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
    try {
        const headerKey = process.env.TOKEN_HEADER_KEY;
        const token = req.header(headerKey);

        if (!token) {
            return res.status(401).json({
                message: "Access denied. No token provided.",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        console.log(decoded);

        // Find user by ID from token
        const user = await User.findById(decoded.id).select("-password -token");
        console.log(user);

        if (!user) {
            return res.status(401).json({
                message: "Invalid token. User not found.",
            });
        }

        // Attach user to request object for use in routes
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid token.",
                error: error.message,
            });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token has expired.",
                error: error.message,
            });
        }
        return res.status(500).json({
            message: "Error verifying token",
            error: error.message,
        });
    }
};
