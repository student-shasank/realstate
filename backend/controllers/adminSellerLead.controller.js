import SellerLead from "../models/SellerLead.js";
import Listing from "../models/Listing.js";

// GET ALL LEADS
export const getSellerLeads = async (req, res) => {
  try {
    const leads = await SellerLead.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch seller leads",
    });
  }
};

// APPROVE LEAD
export const approveSellerLead = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await SellerLead.findById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    // 🛑 STOP duplicate approve
    if (lead.approvalStatus === "approved") {
      return res.status(400).json({
        success: false,
        message: "Lead already approved",
      });
    }

    res.status(200).json({
      success: true,
      message: "Approval started",
    });

    (async () => {
      const listing = await Listing.create({
        title: `${lead.propertyType || "Property"} in ${lead.propertyLocation}`,
        price: Number(lead.askingPrice) || 0,
        bedrooms: parseInt(lead.bedrooms) || 0,

        location: {
          location: lead.propertyLocation || "",
          city: "Dubai",
          country: "UAE",
          community: lead.community || lead.propertyLocation || "",
          subCommunity: "",
          coordinates: {
            type: "Point",
            coordinates: [55.2708, 25.2048],
          },
        },

        images: lead.images?.filter(Boolean) || [],
        videos: lead.videos?.filter(Boolean) || [],

        propertyStatus: lead.completionStatus || "Ready",
        availability: "Available",
      });

      lead.approvalStatus = "approved";
      lead.convertedToListing = listing._id;

      await lead.save();

      console.log("✅ Listing created:", listing._id);
    })();

  } catch (error) {
    console.log("APPROVE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to approve lead",
    });
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

    res.status(200).json({
      success: true,
      lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to reject lead",
    });
  }
};