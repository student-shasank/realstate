// import mongoose from "mongoose";

// const ListingSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     price: { type: Number, required: true },
//     location: { type: String, required: true },
//     description: { type: String },
    
//   },
// );

// export default mongoose.model("Listing", ListingSchema);

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
  location: String, // Palm Jumeirah
  city: String,     // Dubai
  country: String,  // UAE
  coordinates: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: {
      type: [Number], // [lng, lat]
      index: "2dsphere"
    }
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


// Export as Listing (NOT Property)
export default mongoose.model("Listing", ListingSchema);

