import { Router } from "express";
import { protect} from "../middleware/authMiddleware.js";
import { dashboard, getListingById, getListings,updateUser } from "../controllers/usercontroller.js";

import { sendListingPdf } from "../controllers/pdfcontroller.js"
import { searchListings } from "../controllers/searchcontroller.js"
import { toggleFavoriteListing } from "../controllers/togglefavoriteListing.js";
import { protect2 } from "../middleware/Favmiddleware.js";
import { 
  getCommunityNavigation, 
  getCommunityPublicProfile 
} from "../controllers/communityController.js";
import { getDevelopers }  from "../controllers/getDevlopers.js"

const router = Router();

router.get("/dashboard", protect, dashboard);

router.put("/update/:id",  updateUser);
router.get("/listings", getListings);
 
router.post("/send-pdf", sendListingPdf);
router.get("/search", searchListings);

router.get("/detail/:id", getListingById);

router.post("/favorites", protect2, toggleFavoriteListing);


router.get("/navigation", getCommunityNavigation); // Dropdown ke liye
router.get("/profile/:slug", getCommunityPublicProfile);
router.get("/developers", getDevelopers);


export default router;
