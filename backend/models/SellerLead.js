import mongoose from "mongoose";

const sellerLeadSchema = new mongoose.Schema(
  {
    ownerName: String,
    contactNumber: String,
    whatsappNumber: String,
    email: String,

    propertyLocation: String,
    propertyType: String,
    bedrooms: String,
    completionStatus: String,
    community: String,
    projectName: String,
    unitNumber: String,
    size: String,
    askingPrice: Number,
    ownershipType: String,

    sellTimeline: String,
    negotiable: String,
    reasonForSelling: String,
    reasonForSellingOther: String,
    hasAgent: String,

    additionalNotes: String,

    images: [String],
    videos: [String],

    leadStatus: {
      type: String,
      enum: ["incomplete", "complete"],
      default: "complete",
    },

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    convertedToListing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
  },
  { timestamps: true }
);

export default mongoose.model("SellerLead", sellerLeadSchema);