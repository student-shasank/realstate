import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/databaseConnection.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// IMPORTANT: connect DB safely
connectDB();

app.use(express.json());
app.use(cors());
app.set("trust proxy", true);
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user/auth", authRoutes);
app.use("/api/user/show", userRoutes);
app.use("/api/user/listing", userRoutes);

// ❌ REMOVE app.listen()
// ✅ EXPORT app instead
export default app;
