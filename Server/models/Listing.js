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
    default: "Approved" 
  },
  brn: { 
    type: String, 
    enum: ["Approved", "Pending", "Rejected"], 
    default: "Approved" 
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
      enum: ["off-plan", "ready" ,"preconstruction"],    // physical state of property
    },
    propertyStatus: {
      type: String,
      enum: ["pending", "active", "rejected", "sold"],
      default: "pending",             // admin approval status
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
  },
  { timestamps: true }
);

export default mongoose.model("Listing", ListingSchema);