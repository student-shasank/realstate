import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/databaseConnection.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import communityRoutes from './routes/userRoutes.js';


dotenv.config();
const app = express();

connectDB();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));



app.use(express.urlencoded({ extended: true })); // add this

// Routes
app.use("/api/user/auth", authRoutes);
app.use("/api/user/show", userRoutes);
app.use("/api/user/listing", userRoutes);
app.use("/api/user/communities", communityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("http://localhost:5000"));
