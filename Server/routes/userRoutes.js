import { Router } from "express";
import { protect} from "../middleware/authMiddleware.js";
import { dashboard, getListingById, getListings } from "../controllers/Usercontroller.js";
import { sendListingPdf } from "../controllers/pdfController.js"
import { searchListings } from "../controllers/searchController.js"
import { toggleFavoriteListing } from "../controllers/toggleFavoriteListing.js";
import { protect2 } from "../middleware/Favmiddleware.js";

const router = Router();

router.get("/dashboard", protect, dashboard);

router.get("/listings", getListings);
 
router.post("/send-pdf", sendListingPdf);
router.get("/search", searchListings);

router.get("/detail/:id", getListingById);

router.post("/favorites", protect2, toggleFavoriteListing);


export default router;
