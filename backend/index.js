import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/databaseConnection.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import sellerLeadRoutes from "./routes/adminSellerLead.routes.js";
import contactRoute from "./routes/contactRoute.js"



dotenv.config();
const app = express();

connectDB();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes );
app.use("/api/admin/contact", contactRoute);
app.use("/api/admin/seller-leads", sellerLeadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("http://localhost:5000"));
