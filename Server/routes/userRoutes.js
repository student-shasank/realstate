import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { dashboard, getListings } from "../controllers/Usercontroller.js";

const router = Router();

router.get("/dashboard", protect, dashboard);

router.get("/listings", getListings);

export default router;
