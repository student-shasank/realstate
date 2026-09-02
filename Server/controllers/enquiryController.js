import mongoose from "mongoose";
import Listing from "../models/Listing.js";
import { sendEnquiryEmail } from "../utils/sendEnquiryEmail.js";

export const sendListingEnquiry = async (req, res) => {
  try {
    const { listingId, name, email, phone, requestType } = req.body;

    if (!listingId) {
      return res.status(400).json({
        success: false,
        message: "listingId required",
      });
    }

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "name, email and phone are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(listingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid listingId",
      });
    }

    // RAW MongoDB document fetch
    const listing = await Listing.collection.findOne({
      _id: new mongoose.Types.ObjectId(listingId),
    });

    console.log(
      "RAW LISTING DATA:",
      JSON.stringify(listing, null, 2)
    );

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    const toEmail = process.env.ENQUIRY_TO_EMAIL;

    if (!toEmail) {
      return res.status(400).json({
        success: false,
        message: "No receiver email found",
      });
    }

    await sendEnquiryEmail({
      listing,
      to: toEmail,
      enquirer: {
        name,
        email,
        phone,
      },
      requestType: requestType || "general",
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