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
    getAllListings,     // ← add
  getListingById, 
  // Naya Controller Import karein
  createCommunity,
  updateListingFeatured,
  getCommunities,

} from "../controllers/adminController.js";

const router = Router();

// --- Dashboard ---
// adminRoutes.js — final clean version
router.get("/dashboard",  protect, adminOnly, dashboard);
const listingUpload = upload.fields([
  { name: "images", maxCount: 15 },           // Property Photos
  { name: "agentProfile", maxCount: 1 },      // Agent Photo
  { name: "communityImage", maxCount: 1 },    // Community Photo
  { name: "floorPlanImage", maxCount: 5 },    // Floor Plans
  { name: "videos", maxCount: 2 }             // Videos (MP4)
]);
// Listings
// Dono handle karo — singular + plural
router.post("/listings", protect, adminOnly, listingUpload, createListing);
router.post("/listings", protect, adminOnly, listingUpload, createListing);
router.get("/listings/:id",                 protect, adminOnly, getListingById);
router.delete("/listings/:id",              protect, adminOnly, deleteListing);
router.patch("/listings/:id/status",        protect, adminOnly, updateListingStatus);
router.patch("/listings/:id/availability",  protect, adminOnly, updateAvailability);
router.patch("/listings/:id/featured",      protect, adminOnly, updateListingFeatured);


// --- Communities (Naya Route) ---
// Yahan hum .fields() use karenge kyunki frontend se alag-alag key names aa rahe hain
const communityUpload = upload.fields([
  { name: "heroImages", maxCount: 3 }, // indexing ki jagah array
  { name: "overviewImage", maxCount: 1 },
  { name: "marketImage", maxCount: 1 }
]);

router.post(
  "/communities",

  communityUpload,
  createCommunity
);
router.get("/communities", getCommunities);

export default router;























