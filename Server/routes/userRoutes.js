import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { dashboard } from "../controllers/Usercontroller.js";

const router = Router();

router.get("/dashboard", protect, dashboard);

export default router;
