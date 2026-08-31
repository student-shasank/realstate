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
  getAllListings,
  getListingById,
  createCommunity,
  updateListingFeatured,
  getCommunities,
} from "../controllers/adminController.js";

const router = Router();

// --- Dashboard ---
router.get("/dashboard", protect, adminOnly, dashboard);

// --- Listings ---
//
// ⚠️ Using upload.any() here instead of upload.fields([...]) because the
// new createListing controller expects DYNAMIC field names for per-row
// images: facilities_image_0, facilities_image_1, ... and
// unitType_image_0, unitType_image_1, ... — multer's .fields() needs every
// field name declared upfront, which doesn't work for an arbitrary number
// of rows. upload.any() accepts any field name; the controller groups
// req.files back into a { fieldname: [file] } map itself.
//
// Fixed field names the controller also expects (still fine under
// upload.any()): images_feature, images_interior, images_exterior,
// images_general, images_lobby, agentProfile, communityImage,
// developerImage, videos.
const listingUpload = upload.any();

router.post("/listings", protect, adminOnly, listingUpload, createListing);
router.get("/listings", protect, adminOnly, getAllListings);
router.get("/listings/:id", protect, adminOnly, getListingById);
router.delete("/listings/:id", protect, adminOnly, deleteListing);
router.patch("/listings/:id/status", protect, adminOnly, updateListingStatus);
router.patch("/listings/:id/availability", protect, adminOnly, updateAvailability);
router.patch("/listings/:id/featured", protect, adminOnly, updateListingFeatured);

// --- Communities ---
const communityUpload = upload.fields([
  { name: "heroImages", maxCount: 3 },
  { name: "overviewImage", maxCount: 1 },
  { name: "marketImage", maxCount: 1 },
]);

router.post("/communities", protect, adminOnly, communityUpload, createCommunity);
router.get("/communities", getCommunities);

export default router;