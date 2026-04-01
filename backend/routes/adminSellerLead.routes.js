import express from "express";
import {
  getSellerLeads,
  approveSellerLead,
  rejectSellerLead,
} from "../controllers/adminSellerLead.controller.js";

const router = express.Router();

router.get("/", getSellerLeads);
router.patch("/:id/approve", approveSellerLead);
router.patch("/:id/reject", rejectSellerLead);

export default router;