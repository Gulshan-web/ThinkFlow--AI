import express from "express";

import dotenv from "dotenv";

import aiRoutes from "./routes/ai.js";

dotenv.config();

console.log("GROQ =", process.env.GROQ_API_KEY);

const app = express();

import cors from "cors";

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://thinkflow-frontend-w42x.onrender.com",
    ],
    methods: ["GET", "POST", "OPTIONS"],
  })
);

app.use(express.json());

app.use("/api", aiRoutes);

app.get("/", (req, res) => {
    res.send("ThinkFlow AI Server Running 🚀");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
    console.error("❌ Server Error:", err);
});

process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("❌ Unhandled Rejection:", err);
});