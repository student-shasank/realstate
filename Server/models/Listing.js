import mongoose from "mongoose";

// Agent Schema
const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  agency: { type: String },
  phone: { type: String },
  whatsapp: { type: String },
  isResponsiveBroker: { type: Boolean, default: false },
  profileImage: { type: String } // Cloudinary URL
});

// Validated Information Schema
const validatedInfoSchema = new mongoose.Schema({
  developer: { type: String },
  ownership: { type: String }, // Freehold, Leasehold
  builtUpArea: { type: Number },
  plotArea: { type: Number },
  usage: { type: String } // Residential / Commercial
});

// Project Information Schema
const projectInfoSchema = new mongoose.Schema({
  name: { type: String },
  status: { type: String }, // Active / Completed
  completion: { type: String },
  handoverDate: { type: String },
  developer: { type: String },
  lastInspected: { type: String }
});

// Location Schema
const locationSchema = new mongoose.Schema({
  city: String,
  community: String,
  subCommunity: String,
  coordinates: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], default: [0, 0] } // [lng, lat]
  }
});
locationSchema.index({ coordinates: "2dsphere" });

// ⭐ FINAL LISTING SCHEMA ⭐
const ListingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    referenceNo: { type: String },

    price: { type: Number, required: true },
    currency: { type: String, default: "AED" },

    type: { type: String },
    purpose: { type: String },
    completionStatus: { type: String },
    addedOn: { type: Date },
    availability: {
      type: String,
      enum: ["Available", "Unavailable"],
      default: "Available",
    },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    builtUpArea: { type: Number },
    plotArea: { type: Number },
    furnishing: { type: String },

    features: [{ type: String }],
    images: [{ type: String }],

    agent: agentSchema,
    validatedInfo: validatedInfoSchema,
    projectInfo: projectInfoSchema,
    location: locationSchema,

    paymentPlan: {
      downPayment: Number,
      installmentPlan: [{ month: String, percent: Number }]
    }
  },
  { timestamps: true }
);

// 🔹 INDEXES FOR SEARCH OPTIMIZATION
ListingSchema.index({ "location.city": 1 });      // regex / prefix search
ListingSchema.index({ bedrooms: 1 });            // >= comparison
ListingSchema.index({ bathrooms: 1 });           // >= comparison
ListingSchema.index({ price: 1 });               // price range
ListingSchema.index({ type: 1 });                // property type
ListingSchema.index({ completionStatus: 1 });    // completion filter

export default mongoose.model("Listing", ListingSchema);
