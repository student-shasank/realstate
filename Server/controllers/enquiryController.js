import Listing from "../models/Listing.js";
import { sendEnquiryEmail } from "../utils/sendEnquiryEmail.js";

export const sendListingEnquiry = async (req, res) => {
  try {
    // only listingId from body
    const { listingId } = req.body;

    if (!listingId) {
      return res.status(400).json({
        success: false,
        message: "listingId required",
      });
    }

    // Fetch listing from database
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // Decide email receiver
    const toEmail =  process.env.ENQUIRY_TO_EMAIL;

    if (!toEmail) {
      return res.status(400).json({
        success: false,
        message: "No receiver email found",
      });
    }

    // Send email
    sendEnquiryEmail({
      listing,
      to: toEmail,
    });

    return res.status(200).json({
      success: true,
      message: "Enquiry email sent successfully",
    });

  } catch (error) {
    console.error("Enquiry Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};