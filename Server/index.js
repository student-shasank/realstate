import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/databaseConnection.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Database
connectDB();

// Routes
app.use("/api/user/auth", authRoutes);
app.use("/api/user/show", userRoutes);
app.use("/api/user/listing", userRoutes);

// Health check (important)
app.get("/", (req, res) => {
  res.send("API is running on Vercel 🚀");
});

// ✅ EXPORT APP (NO app.listen)
export default app;
