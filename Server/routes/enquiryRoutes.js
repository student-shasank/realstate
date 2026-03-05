import express from "express";
import { sendListingEnquiry } from "../controllers/enquiryController.js";

const router = express.Router();

router.post("/listing", sendListingEnquiry);

export default router;