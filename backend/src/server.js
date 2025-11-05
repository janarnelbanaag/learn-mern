import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

// middlewares
app.use(express.json());

app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
	console.log("Server started on PORT:", PORT);
});
