import express from "express";
import {
  getSellerLeads,
  approveSellerLead,
  rejectSellerLead,
  updateInternalNote,
   permanentDeleteLead,  
} from "../controllers/adminSellerLead.controller.js";

const router = express.Router();

router.get("/", getSellerLeads);
router.patch("/:id/approve", approveSellerLead);
router.patch("/:id/reject", rejectSellerLead);

router.patch("/:id/internal-note", updateInternalNote); // 👈 add
router.delete("/:id/permanent", permanentDeleteLead); // 👈 hard delete

export default router;