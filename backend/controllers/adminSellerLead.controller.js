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

    // ❌ duplicate check
    if (lead.approvalStatus === "approved") {
      return res.status(400).json({ success: false, message: "Already approved" });
    }

    // 🔥 title generate
    const title = `${lead.propertyType || "Property"} in ${lead.propertyLocation || "Dubai"}`;

    // 🔥 SAFE ENUM HELPER
    const safeEnum = (val, allowed, def) =>
      allowed.includes(val) ? val : def;

    // 🔥 LISTING CREATE
    const listing = await Listing.create({
      // ✅ REQUIRED
      title,
      slug: generateSlug(title),
      price: Number(lead.askingPrice) || 1000,
      currency: "AED",

      // ✅ CLASSIFICATION (VERY IMPORTANT ⚠️)
      type: (lead.propertyType || "apartment").toLowerCase(),

      purpose: "sell",

      completionStatus: safeEnum(
        (lead.completionStatus || "").toLowerCase(),
        ["off-plan", "ready", "preconstruction"],
        "ready"
      ),

      propertyStatus: "active", // ✅ approved → active
      listingStatus: "resale",  // ✅ REQUIRED ENUM
      availability: "available",

      furnishing: "unfurnished",

      ownership: lead.ownershipType || "",

      // ✅ SPECS
      bedrooms: lead.bedrooms ? Number(lead.bedrooms) : undefined,
      builtUpArea: lead.size ? Number(lead.size) : undefined,

      // ✅ DESCRIPTION
      description: lead.additionalNotes || "No description provided",

      // ✅ MEDIA (SAFE)
      images: Array.isArray(lead.images) ? lead.images.filter(Boolean) : [],
      videos: Array.isArray(lead.videos) ? lead.videos.filter(Boolean) : [],

      // ✅ LOCATION (CRITICAL)
      location: {
        address: lead.propertyLocation || "N/A",
        community: lead.community || lead.propertyLocation || "N/A",
        subCommunity: "",
        city: "Dubai",
        country: "UAE",
        emirates: "Dubai",
        coordinates: {
          type: "Point",
          coordinates: [55.2708, 25.2048], // Dubai default
        },
      },

      // ✅ AGENT
      agent: {
        name: lead.ownerName || "Unknown",
        phone: lead.contactNumber
          ? `${lead.countryCode || ""}${lead.contactNumber}`
          : "",
        whatsapp: lead.whatsappNumber || "",
        email: lead.email || "",
        isResponsiveBroker: false,
      },

      // ✅ OPTIONAL SAFE FIELDS
      addedOn: new Date(),
    });

    // 🔗 UPDATE LEAD
    lead.approvalStatus = "approved";
    lead.convertedToListing = listing._id;

    await lead.save();

    return res.status(200).json({
      success: true,
      message: "Lead approved and listing created",
      lead,
      listing,
    });

  } catch (error) {
    console.error("APPROVE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to approve lead",
    });
  }
};
// export const approveSellerLead = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const lead = await SellerLead.findById(id);
//     if (!lead) {
//       return res.status(404).json({ success: false, message: "Lead not found" });
//     }

//     // Duplicate approve check
//     if (lead.approvalStatus === "approved") {
//       return res.status(400).json({ success: false, message: "Lead already approved" });
//     }

//     // Title banao
//     const title = `${lead.propertyType || "Property"} in ${lead.propertyLocation || "Dubai"}`;

//     // Listing create karo
//     const listing = await Listing.create({
//       // Core
//       title,
//       slug: generateSlug(title),
//       price:    Number(lead.askingPrice) || 0,
//       currency: "AED",

//       // Classification
//       type:             (lead.propertyType || "").toLowerCase(),
//       completionStatus: (lead.completionStatus || "ready").toLowerCase(),
//       propertyStatus:   "active",       // approved = active listing
//       availability:     "available",
//       ownership:        (lead.ownershipType || "").toLowerCase(),

//       // Specs
//       bedrooms: parseInt(lead.bedrooms) || undefined,
//       builtUpArea: lead.size ? Number(lead.size) : undefined,

//       // Media
//       images: lead.images?.filter(Boolean) || [],
//       videos: lead.videos?.filter(Boolean) || [],

//       // Location
//       location: {
//         address:   (lead.propertyLocation || "").toLowerCase(),
//         community: (lead.community || lead.propertyLocation || "").toLowerCase(),
//         city:      "dubai",
//         country:   "uae",
//         emirates:  "dubai",
//         coordinates: {
//           type: "Point",
//           coordinates: [55.2708, 25.2048],  // Default Dubai coords
//         },
//       },

//       // Agent — seller info se
//       agent: {
//         name:      lead.ownerName  || "",
//         phone:     lead.contactNumber ? `${lead.countryCode || ""}${lead.contactNumber}` : "",
//         whatsapp:  lead.whatsappNumber || "",
//         email:     lead.email || "",
//       },
//     });

//     // Lead update karo
//     lead.approvalStatus     = "approved";
//     lead.convertedToListing = listing._id;
//     await lead.save();

//     return res.status(200).json({
//       success: true,
//       message: "Lead approved and listing created",
//       listing,
//     });

//   } catch (error) {
//     console.error("APPROVE ERROR:", error);
//     return res.status(500).json({ success: false, message: "Failed to approve lead" });
//   }
// };

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

export const updateInternalNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { internalNote } = req.body;

    const lead = await SellerLead.findByIdAndUpdate(
      id,
      { internalNote: internalNote || "" },
      { new: true }
    );

    return res.status(200).json({ success: true, lead });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update note" });
  }
};

export const permanentDeleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    await SellerLead.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Lead permanently deleted"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Delete failed"
    });
  }
};