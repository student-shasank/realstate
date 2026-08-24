// listingModel.js
import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  name: { type: String },
  agency: { type: String },
  phone: { type: String },
  whatsapp: { type: String },
  email: { type: String },
  profileImage: { type: String },
  isResponsiveBroker: { type: Boolean, default: false },
});

const internalSchema = new mongoose.Schema({
  internalListingId: { type: String },
  sourceBrokerageName: { type: String },
  listingAgentName: { type: String },
  listingAgentPhone: { type: String },
  listingAgentEmail: { type: String },
  listingSourceType: {
    type: String,
    enum: ["direct", "shared", "api"],
    default: "direct",
  },
  listingValidUntil: { type: Date },
});

const validatedInfoSchema = new mongoose.Schema({
  ownership: { type: String },
  builtUpArea: { type: Number },
  plotArea: { type: Number },
  usage: { type: String },
  developer: { type: String },
});

const projectInfoSchema = new mongoose.Schema({
  name: { type: String },
  status: { type: String },
  completion: { type: String },
  handoverDate: { type: String },
  developer: { type: String },
  lastInspected: { type: String },
});

const locationSchema = new mongoose.Schema({
  address: { type: String },
  subCommunity: { type: String },
  city: { type: String },
  country: { type: String },
  community: { type: String },
  emirates: { type: String },
  communityImage: { type: String },
  coordinates: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number] },
  },
});
locationSchema.index({ coordinates: "2dsphere" });

const installmentSchema = new mongoose.Schema({
  month: { type: String },
  percent: { type: Number },
});

const paymentPlanStepSchema = new mongoose.Schema({
  label: { type: String },
  percent: { type: Number },
});

const paymentPlanSchema = new mongoose.Schema({
  planName: { type: String },
  downPayment: { type: Number },
  installmentPlan: [installmentSchema],
  steps: [paymentPlanStepSchema],
});

const unitTypeSchema = new mongoose.Schema({
  bedrooms: { type: String },
  sqFt: { type: Number },
  startingPrice: { type: Number },
  availability: {
    type: String,
    enum: ["available", "unavailable", "sold out"],
    default: "available",
  },
});

const regulatoryInfoSchema = new mongoose.Schema({
  permitNumber: { type: String },
  zoneName: { type: String },
  rera: {
    type: String,
    enum: ["Approved", "Pending", "Rejected"],
    default: "Approved",
  },
  brn: {
    type: String,
    enum: ["Approved", "Pending", "Rejected"],
    default: "Approved",
  },
  registeredAgency: { type: String, default: "RTO" },
});

const floorPlanSchema = new mongoose.Schema({
  bedrooms: { type: String },
  sqFt: { type: Number },
  startingPrice: { type: Number },
  planImage: { type: String },
  description: { type: String },
});

const buildingInfoSchema = new mongoose.Schema({
  buildingName: { type: String },
  yearOfCompletion: { type: Number },
  totalFloors: { type: Number },
  swimmingPools: { type: String, enum: ["available", "not available"] },
  totalParkingSpaces: { type: Number },
  totalBuildingArea: { type: Number },
  elevators: { type: String, enum: ["available", "not available"] },
});

const investmentInsightsSchema = new mongoose.Schema({
  rentalYield: { type: String, enum: ["good", "average", "low"] },
  priceTrend: { type: String, enum: ["increasing", "stable", "decreasing"] },
  pricePerSqFt: { type: Number },
});

const ListingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    referenceNo: { type: String },
    slug: { type: String, unique: true },

    price: { type: Number, required: true },
    currency: { type: String, default: "AED" },
    serviceCharges: { type: Number },

    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },

    type: { type: String },
    purpose: {
      type: String,
      enum: ["buy", "sell"],
      default: "sell",
    },
    completionStatus: {
      type: String,
      enum: ["off-plan", "ready", "preconstruction"], // physical state of property
      default: "ready",
    },
    propertyStatus: {
      type: String,
      enum: ["pending", "active", "rejected", "sold"],
      default: "active", // admin approval status
    },
    listingStatus: {
      type: String,
      enum: ["resale", "new launch", "secondary"],
    },
    availability: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    isFeatured: { type: Boolean, default: false },
    furnishing: { type: String },

    bedrooms: { type: Number },
    bathrooms: { type: Number },
    garage: { type: Number },
    rooms: { type: Number },
    builtUpArea: { type: Number },
    totalBuildingArea: { type: Number },
    plotArea: { type: Number },

    developer: { type: String },
    ownership: { type: String },

    yearBuilt: { type: Number },
    handoverDate: { type: String },
    listingDate: { type: Date },
    addedOn: { type: Date },

    description: { type: String },
    features: [{ type: String }],

    images: [{ type: String }],
    videos: [{ type: String }],
    youtubeVideoId: { type: String },
    brochureUrl: { type: String },

    agent: agentSchema,
    internal: internalSchema,
    validatedInfo: validatedInfoSchema,
    projectInfo: projectInfoSchema,
    location: locationSchema,
    buildingInfo: buildingInfoSchema,
    unitTypes: [unitTypeSchema],
    floorPlans: [floorPlanSchema],
    paymentPlan: paymentPlanSchema,
    investmentInsights: investmentInsightsSchema,
    regulatoryInfo: regulatoryInfoSchema,

    // ── Legacy / search-compatible mirror fields ──────────────────
    // These exist ONLY so the existing searchListings/sortListings
    // controller (which was written for an older, flatter data shape)
    // keeps working without being modified. They are auto-populated
    // from the structured fields above at creation time — never edited
    // directly by the admin form. Do not remove without also checking
    // the search controller's field usage.
    status: {
      type: String,
      enum: [
        "Announced",
        "EOI",
        "Start of Sales",
        "On Sale",
        "Out Of Stock",
        "Sold Out",
        "Ready",
        "Pre-Construction",
      ],
    },
    city_name: { type: String },
    district_name: { type: String },
    developer_name: { type: String },
    min_price: { type: Number },
    max_price: { type: Number },
    beds: { type: String }, // comma-separated, e.g. "0,1,2"
    baths: { type: Number },
    property_category: [{ type: String }],
    expected_delivery_date: { type: String }, // "YYYY-MM-DD" so `$regex: "^YYYY-"` matches
    created_date: { type: Date },
  },
  { timestamps: true }
);

// ── Indexes ──────────────────────────────────────────────────────
// NOTE: indexes must be declared on the schema BEFORE the model is
// compiled with mongoose.model(). Declaring them after export (as
// before) still "worked" by accident, but it's the wrong place and
// makes it easy to reference stale/incorrect field names — which is
// exactly what happened below (city_name/district_name/developer_name
// don't exist anywhere in this schema).

// Fast lookups for the "Ready listings" queries (status + availability
// + newest first) used by the admin dashboard / public listing pages.
ListingSchema.index({
  completionStatus: 1,
  propertyStatus: 1,
  availability: 1,
  createdAt: -1,
});

// Supports the legacy searchListings/sortListings controller, which
// filters/sorts on these mirror fields instead of the structured ones.
ListingSchema.index({
  status: 1,
  city_name: 1,
  min_price: 1,
  max_price: 1,
  created_date: -1,
});

// Text search across the fields that actually exist on this schema.
ListingSchema.index({
  title: "text",
  description: "text",
  developer: "text",
  "location.address": "text",
  "location.city": "text",
  "location.subCommunity": "text",
  "projectInfo.name": "text",
  "buildingInfo.buildingName": "text",
});

export default mongoose.model("Listing", ListingSchema);