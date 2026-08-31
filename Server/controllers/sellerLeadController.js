import SellerLead from "../models/SellerLead.js";
import Listing from "../models/Listing.js" ;

// STEP 1 - Create Seller Lead
export const createSellerLead = async (req, res) => {
  try {
    const {
      ownerName,
      countryCode,
      contactNumber,
      whatsappSame,
      whatsappNumber,
      email,
      propertyLocation,
    } = req.body;

    if (!ownerName || !contactNumber || !email || !propertyLocation) {
      return res.status(400).json({
        success: false,
        message: "Owner name, contact number, email, and property location are required",
      });
    }

    const sellerLead = await SellerLead.create({
      ownerName,
      countryCode: countryCode || "+971",
      contactNumber,
      whatsappSame: whatsappSame ?? true,
      whatsappNumber: whatsappSame ? `${countryCode || "+971"}${contactNumber}` : whatsappNumber,
      email,
      propertyLocation,
      leadStatus: "incomplete",
      approvalStatus: "pending",
      formStepCompleted: 1,
    });

    res.status(201).json({
      success: true,
      message: "Seller lead created successfully",
      lead: sellerLead,
      leadId: sellerLead._id,
    });
  } catch (error) {
    console.error("CREATE SELLER LEAD ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create seller lead",
      error: error.message,
    });
  }
};

// STEP 2 - Update Seller Lead
export const updateSellerLead = async (req, res) => {
  try {
    const { id } = req.params;

    const sellerLead = await SellerLead.findById(id);
    if (!sellerLead) {
      return res.status(404).json({
        success: false,
        message: "Seller lead not found",
      });
    }
console.log("REQ.FILES =>", req.files);
console.log("REQ.BODY =>", req.body);
   const imageUrls =
  req.files?.images?.map((file) => file.path || file.secure_url) || [];

const videoUrls =
  req.files?.videos?.map((file) => file.path || file.secure_url) || [];

    const updatedLead = await SellerLead.findByIdAndUpdate(
      id,
      {
        ...req.body,
        consent: req.body.consent === "true",

        // ✅ FIX: append instead of overwrite
        images: [...(sellerLead.images || []), ...imageUrls],
        videos: [...(sellerLead.videos || []), ...videoUrls],

        leadStatus: "complete",
        formStepCompleted: 2,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Seller lead updated successfully",
      lead: updatedLead,
    });
  } catch (error) {
    console.error("UPDATE SELLER LEAD ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update seller lead",
    });
  }
};

// // ADMIN - Get All Seller Leads
// export const getAllSellerLeads = async (req, res) => {
//   try {
//     const { leadStatus, approvalStatus } = req.query;

//     const query = {};

//     if (leadStatus) {
//       query.leadStatus = leadStatus;
//     }

//     if (approvalStatus) {
//       query.approvalStatus = approvalStatus;
//     }

//     const leads = await SellerLead.find(query).sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: leads.length,
//       leads,
//     });
//   } catch (error) {
//     console.error("GET ALL SELLER LEADS ERROR:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch seller leads",
//       error: error.message,
//     });
//   }
// };

// // ADMIN - Get Single Seller Lead
// export const getSellerLeadById = async (req, res) => {
//   try {
//     const lead = await SellerLead.findById(req.params.id).populate("convertedListingId");

//     if (!lead) {
//       return res.status(404).json({
//         success: false,
//         message: "Seller lead not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       lead,
//     });
//   } catch (error) {
//     console.error("GET SELLER LEAD BY ID ERROR:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch seller lead",
//       error: error.message,
//     });
//   }
// };

// ADMIN - Approve Seller Lead and Convert to Listing
// export const approveSellerLead = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const lead = await SellerLead.findById(id);

//     if (!lead) {
//       return res.status(404).json({
//         success: false,
//         message: "Seller lead not found",
//       });
//     }

//     if (lead.convertedToListing) {
//       return res.status(400).json({
//         success: false,
//         message: "This lead has already been converted into a listing",
//       });
//     }

//     const listingData = {
//       title: lead.projectName || lead.propertyType || "Property Listing",
//       price: lead.askingPrice || 0,
//       currency: "AED",
//       type: lead.propertyType || "",
//       purpose: "sell",
//       completionStatus: lead.completionStatus || "",
//       propertyStatus:
//         lead.completionStatus === "Off Plan"
//           ? "offplan"
//           : lead.completionStatus === "Ready"
//           ? "ready"
//           : "",
//       bedrooms: lead.bedrooms === "Studio" ? 0 : parseInt(lead.bedrooms) || 0,
//       builtUpArea: lead.size || 0,
//       images: lead.images || [],
//       addedOn: new Date(),
//       availability: "Available",
//       location: {
//         location: lead.community || lead.propertyLocation || "",
//         city: "Dubai",
//         country: "UAE",
//       },
//       validatedInfo: {
//         ownership: lead.ownershipType || "",
//         builtUpArea: lead.size || 0,
//       },
//       projectInfo: {
//         name: lead.projectName || "",
//         completion: lead.completionStatus || "",
//       },
//     };

//     const newListing = await Listing.create(listingData);

//     lead.approvalStatus = "approved";
//     lead.convertedToListing = true;
//     lead.convertedListingId = newListing._id;

//     await lead.save();

//     res.status(200).json({
//       success: true,
//       message: "Seller lead approved and converted to listing",
//       lead,
//       listing: newListing,
//     });
//   } catch (error) {
//     console.error("APPROVE SELLER LEAD ERROR:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to approve seller lead",
//       error: error.message,
//     });
//   }
// };

// // ADMIN - Reject Seller Lead
// export const rejectSellerLead = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const lead = await SellerLead.findById(id);

//     if (!lead) {
//       return res.status(404).json({
//         success: false,
//         message: "Seller lead not found",
//       });
//     }

//     lead.approvalStatus = "rejected";
//     await lead.save();

//     res.status(200).json({
//       success: true,
//       message: "Seller lead rejected successfully",
//       lead,
//     });
//   } catch (error) {
//     console.error("REJECT SELLER LEAD ERROR:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to reject seller lead",
//       error: error.message,
//     });
//   }
// };