import RateLimit from "../models/RateLimit.js";

export const rateLimitMiddleware =
    (limit = 10, window = 60 * 1000) =>
    async (req, res, next) => {
        try {
            const id = req.user.id;

            const now = Date.now();
            const windowStart = now - window;

            let record = await RateLimit.findOne({ userId: id });

            if (!record) {
                await RateLimit.create({ userId: id });
                return next();
            }

            if (record.lastRequestAt.getTime() < windowStart) {
                record.count = 1;
                record.lastRequestAt = now;
                await record.save();
                return next();
            }

            if (record.count >= limit) {
                const timeLeft = Math.ceil(
                    (record.lastRequestAt.getTime() + window - now) / 1000
                );
                return res.status(429).json({
                    message: `Too many requests. Try again in ${timeLeft}s.`,
                });
            }

            record.count++;
            record.lastRequestAt = now;
            await record.save();
            next();
        } catch (error) {
            console.error("Error in rateLimitMiddleware:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
