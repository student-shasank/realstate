// listingModel.js
//
// UPDATED to match the payload actually sent by ListingCreation.jsx.
// Fields that the frontend explicitly sends as `null` / DB-generated
// placeholders (qr_code, qr_code_ext, public_url, off_plan_link,
// offer_link, map_img, map_url, latlong, broker_info_json,
// inventory_json, resale_units, adm_number, pdf_url, created_at,
// youtube_links) are intentionally NOT stored — they're either
// duplicates of another field we already store (adm_number ==
// regulatoryInfo.permitNumber, pdf_url == brochureUrl, created_at ==
// listingDate/addedOn) or are meant to be backend/DB generated later.
// If a real consumer needs any of them, add them back explicitly
// instead of storing dead columns.

import mongoose from "mongoose";

/* ────────────────────────────────────────────────────────────────
 * Existing structured sub-schemas (kept, some extended)
 * ──────────────────────────────────────────────────────────────── */

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

// Structured location object — this is what the detail-page mapper
// reads (location.address, location.coordinates, etc). Populated from
// the form's `location_detail` object, NOT the flat `location` string
// (see `locationText` below for that).
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
  timelineQuarter: { type: String },
  onBookingPercent: { type: Number },
  onConstructionPercent: { type: Number },
  onHandoverPercent: { type: Number },
  postHandoverPercent: { type: Number },
  installmentPlan: [installmentSchema],
  steps: [paymentPlanStepSchema],
});

// Extended: now also carries baths/highest values/availability counts/
// image, since the form's unit-type rows collect all of this. This is
// the single source of truth for "unit types" — we do NOT keep a
// separate duplicate `typical_units` array, since it's the exact same
// data in a different shape. Any legacy consumer that expects the
// off-plan `typical_units` shape should be updated to read this array
// and remap field names, rather than us storing the data twice.
const unitTypeSchema = new mongoose.Schema({
  bedrooms: { type: String },
  baths: { type: Number },
  sqFt: { type: Number },
  highestSqFt: { type: Number },
  startingPrice: { type: Number },
  highestPrice: { type: Number },
  availableUnits: { type: Number },
  totalUnits: { type: Number },
  image: { type: String },
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

/* ────────────────────────────────────────────────────────────────
 * NEW sub-schemas required by the updated form
 * ──────────────────────────────────────────────────────────────── */

const featuredSchema = new mongoose.Schema(
  {
    banner: { type: Boolean, default: false },
    topListing: { type: Boolean, default: false },
    search: { type: Boolean, default: false },
    crmHome: { type: Boolean, default: false },
    leadShare: { type: Boolean, default: false },
    realtorsIn: { type: Boolean, default: false },
  },
  { _id: false }
);

const developerEntrySchema = new mongoose.Schema(
  {
    developerId: { type: String },
    type: { type: String, default: "Developer" },
    isCustomDeveloper: { type: Boolean, default: true },
    name: { type: String },
    email: { type: String },
    website: { type: String },
    address: { type: String },
    workingTime: [{ type: mongoose.Schema.Types.Mixed }],
    description: { type: String },
  },
  { _id: false }
);

// Flat mirror of buildingInfo, kept as an array because some listings
// (multi-tower projects) may eventually have more than one building.
// The form only fills one entry today — populated from buildingInfo.
const buildingEntrySchema = new mongoose.Schema(
  {
    name: { type: String },
    yearOfCompletion: { type: Number },
    totalFloors: { type: Number },
    swimmingPools: { type: String },
    totalParkingSpaces: { type: Number },
    elevators: { type: String },
  },
  { _id: false }
);

const nearbyLocationSchema = new mongoose.Schema(
  {
    name: { type: String },
    area: { type: String },
    distance: { type: String },
  },
  { _id: false }
);

const facilitySchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    image: { type: String },
  },
  { _id: false }
);

const salesExecutiveSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    languages: { type: String },
    role: { type: String },
    message: { type: String },
    useWhatsappBusinessApi: { type: Boolean, default: false },
    whatsappApiEnabled: { type: Boolean, default: false },
    companyWhatsappUrl: { type: String },
    image: { type: String },
  },
  { _id: false }
);

const attachmentSchema = new mongoose.Schema(
  {
    attachmentTitle: { type: String },
    attachmentUrl: { type: String },
    fileType: { type: String },
  },
  { _id: false }
);

const amenitiesAndFeaturesSchema = new mongoose.Schema(
  {
    amenities: [{ type: mongoose.Schema.Types.Mixed }],
    featuresNames: [{ type: String }],
  },
  { _id: false }
);

// Categorized gallery images, matching the off-plan doc's `images`
// shape. `allImages` is the flattened mirror (feature first) that the
// listings grid card / detail page carousel actually read.
const imagesSchema = new mongoose.Schema(
  {
    feature: { type: String },
    interior: [{ type: String }],
    exterior: [{ type: String }],
    general: [{ type: String }],
    lobby: [{ type: String }],
  },
  { _id: false }
);

const cityDataSchema = new mongoose.Schema(
  { id: { type: String }, name: { type: String } },
  { _id: false }
);
const countryDataSchema = new mongoose.Schema(
  { id: { type: String }, name: { type: String } },
  { _id: false }
);
const districtDataSchema = new mongoose.Schema(
  { id: { type: String }, name: { type: String } },
  { _id: false }
);

/* ────────────────────────────────────────────────────────────────
 * Main schema
 * ──────────────────────────────────────────────────────────────── */

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

    // ── Status flags ──────────────────────────────────────────
    // completionStatus/propertyStatus/availability/status/projectStatus
    // are ALL forced server-side on this create endpoint (see
    // controller) — never trust the client value for any of these.
    completionStatus: {
      type: String,
      enum: ["off-plan", "ready", "preconstruction"],
      default: "ready",
    },
    propertyStatus: {
      type: String,
      enum: ["pending", "active", "rejected", "sold"],
      default: "active",
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
    // Root-level Off-Plan vs Ready flag (legacy mirror `status` field,
    // below, already covers this via its enum) plus the field the
    // detail-page badge actually reads:
    
project_status: {
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
      default: "On sale ",
    },

    isFeatured: { type: Boolean, default: false },
    featured: featuredSchema,

    furnishing: { type: String },

    bedrooms: { type: Number },
    bathrooms: { type: Number },
    garage: { type: Number },
    rooms: { type: Number },
    builtUpArea: { type: Number },
    totalBuildingArea: { type: Number },
    plotArea: { type: Number },

    developer: { type: String },
    developerId: { type: String },
    developerAddress: { type: String },
    developerDescription: { type: String },
    developerEmail: { type: String },
    developerPhone: { type: String },
    developerWebsite: { type: String },
    developerWorkingTime: [{ type: mongoose.Schema.Types.Mixed }],
    developerImageUrl: { type: String },
    developersData: [developerEntrySchema],

    ownership: { type: String },
    usage: { type: String, enum: ["residential", "commercial"] },

    yearBuilt: { type: Number },
    handoverDate: { type: String },
    expectedCompletionDate: { type: String },
    listingDate: { type: Date },
    addedOn: { type: Date },

    description: { type: String },
    features: [{ type: String }],
    facilities: [facilitySchema],
    amenitiesAndFeatures: amenitiesAndFeaturesSchema,

    images: imagesSchema,
    all_images: [{ type: String }],
    videos: [{ type: String }],
    youtubeVideoId: { type: String },
    youtubeLinks: [{ type: String }],
    brochureUrl: { type: String },
    attachments: [attachmentSchema],

    // Agent (rich, detail-page facing)
    agent: agentSchema,
    // Sales executive(s) — off-plan-shaped, carries extra fields
    // (languages/role/message/whatsapp-api) beyond `agent`.
    salesExecutives: [salesExecutiveSchema],

    internal: internalSchema,
    validatedInfo: validatedInfoSchema,
    projectInfo: projectInfoSchema,

    // Structured location (from `location_detail` in the form)
    location: locationSchema,
    // Flat "Title - City - Country" mirror (from `location` string in
    // the form) — kept separate from the object above on purpose.
    locationText: { type: String },
    projectLocation: { type: String },
    projectCity: { type: String },
    cityData: cityDataSchema,
    countryData: countryDataSchema,
    districtData: [districtDataSchema],
    nearbyLocations: [nearbyLocationSchema],

    buildingInfo: buildingInfoSchema,
    buildings: [buildingEntrySchema],

    unitTypes: [unitTypeSchema],
    floorPlans: [floorPlanSchema],

    paymentPlan: paymentPlanSchema,
    investmentInsights: investmentInsightsSchema,
    regulatoryInfo: regulatoryInfoSchema,

    commissionPercentage: { type: Number },
    commissionPercentageMax: { type: Number },
    companyProjectId: { type: String },
    featureImageAltText: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
    website: [{ type: String }],

    hasProperty: { type: Boolean, default: true },
    inventoryOnRequest: { type: Boolean, default: false },
    inventoryStatus: { type: Boolean, default: true },
    noRealInventory: { type: Boolean, default: false },
    priceUponRequest: { type: Boolean, default: false },
    totalProperties: { type: Number },

    // Cheap legacy mirrors so we don't need to re-derive on every read.
    parkingInfo: { type: mongoose.Schema.Types.Mixed },
    legacyPaymentPlans: [{ type: mongoose.Schema.Types.Mixed }],
    areaStart: { type: Number },
    areaEnd: { type: Number },
    areaSize: { type: String, default: "sqft" },
    priceStart: { type: Number },
    priceEnd: { type: Number },

    // ── Legacy / search-compatible mirror fields ──────────────
    // Auto-derived from the fields above — never set by the admin
    // form directly. Keeps the existing searchListings/sortListings
    // controller working without touching it.
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
    // NOTE: was `Number` before — changed to `String` because unit
    // types can carry more than one distinct bath count, and we mirror
    // that the same way `beds` already does ("1,2").
    beds: { type: String }, // comma-separated, e.g. "0,1,2"
    baths: { type: String }, // comma-separated, e.g. "1,2"
    property_category: [{ type: String }],
    expected_delivery_date: { type: String }, // "YYYY-MM-DD" so `$regex: "^YYYY-"` matches
    created_date: { type: Date },
  },
  { timestamps: true }
);

// ── Indexes ──────────────────────────────────────────────────────
ListingSchema.index({
  completionStatus: 1,
  propertyStatus: 1,
  availability: 1,
  createdAt: -1,
});

ListingSchema.index({
  status: 1,
  city_name: 1,
  min_price: 1,
  max_price: 1,
  created_date: -1,
});

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