import mongoose from "mongoose";

const rateLimitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    count: {
        type: Number,
        default: 1,
    },
    lastRequestAt: {
        type: Date,
        default: Date.now,
    },
});

const RateLimit = mongoose.model("RateLimit", rateLimitSchema);

export default RateLimit;
