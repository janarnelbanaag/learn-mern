import express from "express";
import { connectDB } from "./config/db.js";

const app = express();

app.get("/products", (req, res) => {
    res.send("Server is ready");
});

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});
