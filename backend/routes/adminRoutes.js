// import { Router } from "express";
// import { protect } from "../middleware/authMiddleware.js";
// import { adminOnly } from "../middleware/roleMiddleware.js";
// import upload from "../middleware/upload.js";

// import { 
//   dashboard,
//   createListing, 
//   deleteListing,
//    updateListingStatus,
//    updateAvailability

//  } from "../controllers/adminController.js";

// const router = Router();

// router.get("/dashboard", protect, adminOnly, dashboard);

// // Create Listing
// //  router.post("/listing", protect, adminOnly, createListing);
//  router.post("/listing",  protect, adminOnly, upload.array("images", 10), createListing);

// // Delete Listing
// router.delete("/listing/:id", protect, adminOnly, deleteListing);
// router.put(
//   "/listings/:id/status",
//   protect,
//   adminOnly,
//   updateListingStatus
// );

// router.put("/listings/:id/availability", protect,adminOnly, updateAvailability);


// export default router;

import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";

import {
  dashboard,
  createListing,
  deleteListing,
  updateListingStatus,
  updateAvailability,
  // Naya Controller Import karein
  createCommunity,
  updateListingFeatured,

} from "../controllers/adminController.js";

const router = Router();

// --- Dashboard ---
router.get("/dashboard", protect, adminOnly, dashboard);

// --- Listings ---
router.post("/listing", protect, adminOnly, upload.array("images", 10), createListing);
router.delete("/listing/:id", protect, adminOnly, deleteListing);
router.put("/listings/:id/status", protect, adminOnly, updateListingStatus);
router.put("/listings/:id/availability", protect, adminOnly, updateAvailability);
router.put(
  "/listings/:id/featured",
  protect,
  adminOnly,
  updateListingFeatured
);

// --- Communities (Naya Route) ---
// Yahan hum .fields() use karenge kyunki frontend se alag-alag key names aa rahe hain
const communityUpload = upload.fields([
  { name: "heroImage_0", maxCount: 1 },
  { name: "heroImage_1", maxCount: 1 },
  { name: "heroImage_2", maxCount: 1 },
  { name: "overviewImage", maxCount: 1 },
  { name: "marketImage", maxCount: 1 }
]);

router.post(
  "/communities",

  communityUpload,
  createCommunity
);

export default router;























