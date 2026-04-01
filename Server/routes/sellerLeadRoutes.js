import express from "express";
import {
  createSellerLead,
  updateSellerLead
} from "../controllers/sellerLeadController.js";

import uploads from "../midddleware/upload.js"

const router = express.Router();

router.post("/", createSellerLead);

// 🔥 THIS IS THE FIX
router.put(
  "/:id",
  uploads.fields([
    { name: "images", maxCount: 20 },
    { name: "videos", maxCount: 10 }
  ]),
  updateSellerLead
);

export default router;