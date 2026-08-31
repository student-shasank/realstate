import mongoose from "mongoose";

const sellerLeadSchema = new mongoose.Schema(
  {
    // Step 1
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    countryCode: {
      type: String,
      default: "+971",
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    whatsappSame: {
      type: Boolean,
      default: true,
    },
    whatsappNumber: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    propertyLocation: {
      type: String,
      required: true,
      trim: true,
    },

    // Step 2
    propertyType: {
      type: String,
      enum: ["Apartment", "Villa", "Townhouse", "Penthouse", "Land", "Commercial", ""],
      default: "",
    },
    bedrooms: {
      type: String,
      enum: ["Studio", "1", "2", "3", "4+", ""],
      default: "",
    },
    completionStatus: {
      type: String,
      enum: ["Off Plan", "Ready", ""],
      default: "",
    },
    community: {
      type: String,
      trim: true,
      default: "",
    },
    projectName: {
      type: String,
      trim: true,
      default: "",
    },
    unitNumber: {
      type: String,
      trim: true,
      default: "",
    },
    size: {
      type: Number,
      default: null,
    },
    askingPrice: {
      type: Number,
      default: null,
    },
    ownershipType: {
      type: String,
      enum: ["Owner", "Agent", "Other", ""],
      default: "",
    },

    // Seller Intent
    sellTimeline: {
      type: String,
      enum: [
        "Immediately",
        "Within 1 month",
        "Within 3 months",
        "Within 6 months",
        "Just exploring",
        "",
      ],
      default: "",
    },
    negotiable: {
      type: String,
      enum: ["Yes", "No", "Depends on the offer", ""],
      default: "",
    },
    reasonForSelling: {
      type: String,
      enum: [
        "Investment exit",
        "Upgrading to a larger property",
        "Relocating",
        "Portfolio rebalancing",
        "Completion of payment plan",
        "Looking to realise profit",
        "Other",
        "",
      ],
      default: "",
    },
    reasonForSellingOther: {
      type: String,
      trim: true,
      default: "",
    },
    hasAgent: {
      type: String,
      enum: ["Yes", "No", ""],
      default: "",
    },

    // Media
    images: [
      {
        type: String,
      },
    ],
    videos: [
      {
        type: String,
      },
    ],

    additionalNotes: {
      type: String,
      trim: true,
      default: "",
    },

    consent: {
      type: Boolean,
      default: false,
    },

    leadStatus: {
      type: String,
      enum: ["incomplete", "complete"],
      default: "incomplete",
    },

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    formStepCompleted: {
      type: Number,
      default: 1,
    },

    convertedToListing: {
      type: Boolean,
      default: false,
    },

    convertedListingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SellerLead", sellerLeadSchema);