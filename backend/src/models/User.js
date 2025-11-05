import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        token: String,
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// removes password and token from the response
// userSchema.methods.toJSON = function () {
//     const obj = this.toObject();
//     delete obj.password;
//     delete obj.token;
//     return obj;
// };

userSchema.methods.generateToken = function () {
    return jwt.sign(
        { id: this._id, name: this.username },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "1s",
        }
    );
};

// To verify a token, use jwt.verify():
// const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
// This will throw an error if the token is invalid or expired
// See middleware/authMiddleware.js for a complete implementation

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
