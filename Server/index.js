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
app.set("trust proxy", true);

// Database
 await connectDB();

// Routes
app.use("/api/user/auth", authRoutes);
app.use("/api/user/show", userRoutes);
app.use("/api/user/listing", userRoutes);

// Test route (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("Server is running on Vercel 🚀");
});

// ❌ DO NOT use app.listen()
// ✅ EXPORT app
export default app;
