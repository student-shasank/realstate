import SellerLead from "../models/SellerLead.js";
import Listing from "../models/Listing.js";

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-") + "-" + Date.now();
};

// GET ALL LEADS
export const getSellerLeads = async (req, res) => {
  try {
    const leads = await SellerLead.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, leads });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch seller leads" });
  }
};

// APPROVE LEAD → Convert to Listing
export const approveSellerLead = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await SellerLead.findById(id);
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    // Duplicate approve check
    if (lead.approvalStatus === "approved") {
      return res.status(400).json({ success: false, message: "Lead already approved" });
    }

    // Title banao
    const title = `${lead.propertyType || "Property"} in ${lead.propertyLocation || "Dubai"}`;

    // Listing create karo
    const listing = await Listing.create({
      // Core
      title,
      slug: generateSlug(title),
      price:    Number(lead.askingPrice) || 0,
      currency: "AED",

      // Classification
      type:             (lead.propertyType || "").toLowerCase(),
      completionStatus: (lead.completionStatus || "ready").toLowerCase(),
      propertyStatus:   "active",       // approved = active listing
      availability:     "available",
      ownership:        (lead.ownershipType || "").toLowerCase(),

      // Specs
      bedrooms: parseInt(lead.bedrooms) || undefined,
      builtUpArea: lead.size ? Number(lead.size) : undefined,

      // Media
      images: lead.images?.filter(Boolean) || [],
      videos: lead.videos?.filter(Boolean) || [],

      // Location
      location: {
        address:   (lead.propertyLocation || "").toLowerCase(),
        community: (lead.community || lead.propertyLocation || "").toLowerCase(),
        city:      "dubai",
        country:   "uae",
        emirates:  "dubai",
        coordinates: {
          type: "Point",
          coordinates: [55.2708, 25.2048],  // Default Dubai coords
        },
      },

      // Agent — seller info se
      agent: {
        name:      lead.ownerName  || "",
        phone:     lead.contactNumber ? `${lead.countryCode || ""}${lead.contactNumber}` : "",
        whatsapp:  lead.whatsappNumber || "",
        email:     lead.email || "",
      },
    });

    // Lead update karo
    lead.approvalStatus     = "approved";
    lead.convertedToListing = listing._id;
    await lead.save();

    return res.status(200).json({
      success: true,
      message: "Lead approved and listing created",
      listing,
    });

  } catch (error) {
    console.error("APPROVE ERROR:", error);
    return res.status(500).json({ success: false, message: "Failed to approve lead" });
  }
};

// REJECT LEAD
export const rejectSellerLead = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await SellerLead.findByIdAndUpdate(
      id,
      { approvalStatus: "rejected" },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    return res.status(200).json({ success: true, message: "Lead rejected", lead });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to reject lead" });
  }
};