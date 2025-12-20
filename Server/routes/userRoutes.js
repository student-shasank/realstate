import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { dashboard, getListings } from "../controllers/Usercontroller.js";
import {sendListingPdf} from "../controllers/pdfController.js"
import {searchListings} from "../controllers/searchController.js"

const router = Router();

router.get("/dashboard", protect, dashboard);

router.get("/listings", getListings);
router.post("/send-pdf", sendListingPdf);
router.get("/search", searchListings);


export default router;
