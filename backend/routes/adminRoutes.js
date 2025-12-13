import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";

import { 
  dashboard,
  createListing, 
  deleteListing,
   updateListingStatus,
   updateAvailability

 } from "../controllers/adminController.js";

const router = Router();

router.get("/dashboard", protect, adminOnly, dashboard);

// Create Listing
//  router.post("/listing", protect, adminOnly, createListing);
 router.post("/listing",  protect, adminOnly, upload.array("images", 10), createListing);

// Delete Listing
router.delete("/listing/:id", protect, adminOnly, deleteListing);
router.put(
  "/listings/:id/status",
  protect,
  adminOnly,
  updateListingStatus
);

router.put("/listings/:id/availability", protect,adminOnly, updateAvailability);


export default router;























