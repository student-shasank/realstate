// adminController.js
import Listing from "../models/Listing.js";
import Community from "../models/Community.js";
import { geocodeAddress } from "../utils/geocode.js";

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-") + "-" + Date.now();
};

// ── Helpers ──────────────────────────────────────────────────
const lc = (val) => (val ? String(val).toLowerCase().trim() : undefined);
const parseJSON = (val) => {
  if (!val) return [];
  try { return JSON.parse(val); } catch { return []; }
};
const parseArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val.map(lc).filter(Boolean);
  return String(val).split(",").map(lc).filter(Boolean);
};

// ── DASHBOARD ─────────────────────────────────────────────────
// export const dashboard = async (req, res) => {
//   try {
//     const [
//       totalListings,
//       activeListings,
//       pendingListings,
//       featuredListings,
//       listings,
//     ] = await Promise.all([
//       Listing.countDocuments(),
//       Listing.countDocuments({ propertyStatus: "active" }),
//       Listing.countDocuments({ propertyStatus: "pending" }),
//       Listing.countDocuments({ isFeatured: true }),
//       Listing.find().sort({ createdAt: -1 }).limit(2000),
//     ]);

//     return res.json({
//   message: "Admin Dashboard Access",
//   admin: req.user,
//   stats: { totalListings, activeListings, pendingListings, featuredListings },
//   listings,
// });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
// ── DASHBOARD with Pagination + MongoDB Search ─────────────────
export const dashboard = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search = "",
      status = "",
    } = req.query;

    const pageNum  = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const skip     = (pageNum - 1) * limitNum;

    // ── Build match filter ──────────────────────────────────────
    const matchStage = {};

    if (status && status !== "All") {
      matchStage.propertyStatus = status.toLowerCase();
    }

    if (search.trim()) {
      matchStage.$or = [
        { title:          { $regex: search, $options: "i" } },
        { city_name:      { $regex: search, $options: "i" } },
        { district_name:  { $regex: search, $options: "i" } },
        { developer_name: { $regex: search, $options: "i" } },
      ];
    }

    // ── Run aggregation + count in parallel ────────────────────
    const [result, stats] = await Promise.all([
      Listing.aggregate([
        { $match: matchStage },
        { $sort:  { createdAt: -1 } },
        { $skip:  skip },
        { $limit: limitNum },
      ]),

      Listing.aggregate([
        {
          $facet: {
            total:    [{ $count: "count" }],
            active:   [{ $match: { propertyStatus: "active"   } }, { $count: "count" }],
            pending:  [{ $match: { propertyStatus: "pending"  } }, { $count: "count" }],
            featured: [{ $match: { isFeatured: true           } }, { $count: "count" }],
          },
        },
      ]),
    ]);

    const s = stats[0];

    return res.json({
      message: "Admin Dashboard Access",
      admin: req.user,
      stats: {
        totalListings:    s.total[0]?.count    || 0,
        activeListings:   s.active[0]?.count   || 0,
        pendingListings:  s.pending[0]?.count  || 0,
        featuredListings: s.featured[0]?.count || 0,
      },
      listings:    result,
      currentPage: pageNum,
      totalPages:  Math.ceil((s.total[0]?.count || 0) / limitNum),
      totalCount:  s.total[0]?.count || 0,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
// ── CREATE LISTING ────────────────────────────────────────────
// ── CREATE LISTING ────────────────────────────────────────────
// ── CREATE LISTING ────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────
// Helpers: derive the legacy/search-compatible mirror fields
// (status, city_name, district_name, developer_name, min_price,
// max_price, beds, baths, property_category, expected_delivery_date,
// created_date) from the structured payload, so the existing
// searchListings/sortListings controller keeps working unmodified.
// ─────────────────────────────────────────────────────────────────

const STATUS_FROM_COMPLETION = {
  ready: "Ready",
  "off-plan": "On Sale",
  preconstruction: "Pre-Construction",
};

/**
 * Comma-separated distinct bedroom counts, e.g. "0,1,2".
 * Prefers unitTypes (multiple configs); falls back to the single
 * top-level `bedrooms` field when there are no unit types.
 */
const buildBedsString = (unitTypes, fallbackBedrooms) => {
  const values = new Set();

  if (Array.isArray(unitTypes)) {
    unitTypes.forEach((u) => {
      const raw = u?.bedrooms;
      if (raw === undefined || raw === null || raw === "") return;
      const num = Number(raw);
      values.add(Number.isNaN(num) ? String(raw).trim() : num);
    });
  }

  if (
    values.size === 0 &&
    fallbackBedrooms !== undefined &&
    fallbackBedrooms !== null &&
    fallbackBedrooms !== ""
  ) {
    const num = Number(fallbackBedrooms);
    values.add(Number.isNaN(num) ? fallbackBedrooms : num);
  }

  return Array.from(values).join(",");
};

/**
 * { min_price, max_price } across unitTypes.startingPrice, falling
 * back to the single top-level `price` for both bounds.
 */
const buildPriceRange = (unitTypes, fallbackPrice) => {
  const prices = Array.isArray(unitTypes)
    ? unitTypes
        .map((u) => Number(u?.startingPrice))
        .filter((n) => !Number.isNaN(n) && n > 0)
    : [];

  if (prices.length === 0) {
    const p = fallbackPrice ? Number(fallbackPrice) : undefined;
    return { min_price: p, max_price: p };
  }

  return {
    min_price: Math.min(...prices),
    max_price: Math.max(...prices),
  };
};

const QUARTER_END_MONTH_DAY = { 1: "03-31", 2: "06-30", 3: "09-30", 4: "12-31" };

/**
 * Converts things like "Q3 2029" into "2029-09-30" so the search
 * controller's `handoverYear` regex (`^${year}-`) still matches.
 * Leaves already-ISO strings untouched; bare years become Dec 31.
 */
const buildExpectedDeliveryDate = (handoverDate) => {
  if (!handoverDate) return undefined;
  const str = String(handoverDate).trim();

  if (/^\d{4}-\d{2}-\d{2}/.test(str)) return str;

  const qMatch = str.match(/Q([1-4])\D*(\d{4})/i);
  if (qMatch) {
    const [, q, year] = qMatch;
    return `${year}-${QUARTER_END_MONTH_DAY[q]}`;
  }

  const yearMatch = str.match(/^(\d{4})$/);
  if (yearMatch) return `${yearMatch[1]}-12-31`;

  return undefined;
};

// listingController.js
//
// UPDATED to match ListingCreation.jsx's payload + the new listingModel.js.
//
// Keep your existing imports for: Listing model, Community model, and
// whatever helper module already exports `generateSlug`,
// `STATUS_FROM_COMPLETION`, and `buildExpectedDeliveryDate` — those are
// unchanged and reused below. `buildBedsString` / `buildPriceRange` are
// REPLACED by the more general helpers defined in this file
// (buildCsvField / buildRange), since we now also need a baths CSV and
// an area range, not just beds + price.
//
// import Listing from "../models/listingModel.js";
// import Community from "../models/communityModel.js";
// import { generateSlug, STATUS_FROM_COMPLETION, buildExpectedDeliveryDate } from "../utils/listingHelpers.js";

/* ────────────────────────────────────────────────────────────────
 * Local helpers
 * ──────────────────────────────────────────────────────────────── */

// Generic "comma separated distinct values" builder — used for both
// beds ("0,1,2") and baths ("1,2"), replacing the old beds-only helper.
const buildCsvField = (unitTypes, fieldName, fallbackValue) => {
  if (Array.isArray(unitTypes) && unitTypes.length > 0) {
    const values = [
      ...new Set(
        unitTypes
          .map((u) => u?.[fieldName])
          .filter((v) => v !== undefined && v !== null && v !== "")
          .map(String)
      ),
    ];
    if (values.length) return values.join(",");
  }
  return fallbackValue !== undefined && fallbackValue !== null
    ? String(fallbackValue)
    : undefined;
};

// Generic min/max range builder — used for both price and area ranges.
const buildRange = (unitTypes, lowField, highField, fallback) => {
  const lows = (unitTypes || [])
    .map((u) => Number(u?.[lowField]))
    .filter((n) => !Number.isNaN(n));
  const highs = (unitTypes || [])
    .map((u) => Number(u?.[highField] ?? u?.[lowField]))
    .filter((n) => !Number.isNaN(n));

  const start = lows.length ? Math.min(...lows) : Number(fallback);
  const end = highs.length ? Math.max(...highs) : Number(fallback);

  return {
    start: Number.isNaN(start) ? undefined : start,
    end: Number.isNaN(end) ? undefined : end,
  };
};

const bedroomLabel = (b) => {
  const s = String(b ?? "").trim();
  if (s === "0" || s.toLowerCase() === "studio") return "Studio";
  return s ? `${s} BR` : "";
};

const buildParkingInfo = (unitTypes, bedrooms, totalParkingSpaces) => {
  const bedroomLabels = [
    ...new Set((unitTypes || []).map((u) => bedroomLabel(u.bedrooms)).filter(Boolean)),
  ];
  const key = bedroomLabels.join(",") || bedroomLabel(bedrooms);
  return {
    title: "parkings",
    data: [{ [key || "N/A"]: `${totalParkingSpaces ?? 0} parking` }],
  };
};

const inferMilestoneType = (label = "") => {
  const l = String(label).toLowerCase();
  if (l.includes("book")) return "on_booking";
  if (l.includes("handover") || l.includes("completion")) return "on_handover";
  return "during_construction";
};

const buildLegacyPaymentPlans = (paymentPlan) => {
  if (!paymentPlan) return [];
  const steps = Array.isArray(paymentPlan.steps) ? paymentPlan.steps : [];
  return [
    {
      title: paymentPlan.planName,
      down_payment: paymentPlan.downPayment,
      timeline_quarter: paymentPlan.timelineQuarter,
      info: {
        on_booking_percent: paymentPlan.onBookingPercent ?? null,
        on_construction_percent: paymentPlan.onConstructionPercent ?? null,
        on_handover_percent: paymentPlan.onHandoverPercent ?? null,
        post_handover_percent: paymentPlan.postHandoverPercent ?? null,
      },
      milestones: steps.map((s) => ({
        milestone: s.label,
        milestone_type: inferMilestoneType(s.label),
        percentage: s.percent != null ? `${s.percent}%` : undefined,
      })),
    },
  ];
};

const toBool = (v) => v === true || v === "true";

/* ────────────────────────────────────────────────────────────────
 * Controller
 * ──────────────────────────────────────────────────────────────── */

export const createListing = async (req, res) => {
  try {
    // The frontend sends the ENTIRE payload as one JSON string under
    // "data" (fd.append("data", JSON.stringify(payload))), with files
    // as separate multipart fields. Legacy fallback: raw req.body if
    // "data" isn't present.
    let b;
    if (req.body?.data) {
      try {
        b = JSON.parse(req.body.data);
      } catch (e) {
        return res.status(400).json({
          success: false,
          error: "Invalid JSON in 'data' field",
        });
      }
    } else {
      b = req.body;
    }

    // Normalize req.files into a { fieldname: [file, ...] } map regardless
    // of whether multer was configured with upload.any() (req.files is an
    // ARRAY) or upload.fields() (req.files is already an object). We need
    // upload.any() on this route because facilities_image_{i} and
    // unitType_image_{i} are dynamic field names that .fields() can't
    // declare in advance.
    const rawFiles = req.files || {};
    const filesArray = Array.isArray(rawFiles) ? rawFiles : Object.values(rawFiles).flat();
    const files = {};
    filesArray.forEach((f) => {
      if (!files[f.fieldname]) files[f.fieldname] = [];
      files[f.fieldname].push(f);
    });

    // ── Categorized gallery images ──────────────────────────────
    // New multipart field names: images_feature (single),
    // images_interior / images_exterior / images_general / images_lobby
    // (each multiple). Replaces the old flat "images" field.
    const featureImageUrl = files["images_feature"]
      ? files["images_feature"][0].path
      : b.images?.feature;

    const catImages = (cat) =>
      files[`images_${cat}`]
        ? files[`images_${cat}`].map((f) => f.path)
        : Array.isArray(b.images?.[cat])
        ? b.images[cat]
        : [];

    const interiorUrls = catImages("interior");
    const exteriorUrls = catImages("exterior");
    const generalUrls = catImages("general");
    const lobbyUrls = catImages("lobby");

    const imagesObj = {
      feature: featureImageUrl,
      interior: interiorUrls,
      exterior: exteriorUrls,
      general: generalUrls,
      lobby: lobbyUrls,
    };

    // Flat mirror, feature first — this is what the grid card / detail
    // page carousel actually read.
    const all_images = [
      ...(featureImageUrl ? [featureImageUrl] : []),
      ...interiorUrls,
      ...exteriorUrls,
      ...generalUrls,
      ...lobbyUrls,
    ];

    // Videos (unchanged)
    const videoUrls = files["videos"]
      ? files["videos"].map((f) => f.path)
      : Array.isArray(b.videos)
      ? b.videos
      : [];

    // Single-file fields
    const agentProfileUrl = files["agentProfile"]
      ? files["agentProfile"][0].path
      : b.agent?.profileImage;

    const communityImageUrl = files["communityImage"]
      ? files["communityImage"][0].path
      : b.location_detail?.communityImage || b.location?.communityImage;

    const developerImageUrl = files["developerImage"]
      ? files["developerImage"][0].path
      : undefined;

    // ── Required fields ─────────────────────────────────────────
    if (!b.title || !b.price) {
      return res
        .status(400)
        .json({ success: false, error: "Title and price are required" });
    }

    const uniqueSlug = generateSlug(b.title);

    if (!b.community) {
      return res.status(400).json({
        success: false,
        message: "Community is required",
      });
    }

    const communityExists = await Community.findById(b.community);
    if (!communityExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid community selected",
      });
    }
    const communityId = communityExists._id;

    // ── Arrays (already parsed JSON, just guard) ────────────────
    const installmentPlan = Array.isArray(b.paymentPlan?.installmentPlan)
      ? b.paymentPlan.installmentPlan
      : [];
    const steps = Array.isArray(b.paymentPlan?.steps) ? b.paymentPlan.steps : [];
    const floorPlans = Array.isArray(b.floorPlans) ? b.floorPlans : [];
    const features = Array.isArray(b.features) ? b.features : [];
    const nearbyLocations = Array.isArray(b.nearby_locations)
      ? b.nearby_locations
      : [];

    // Unit types + per-index uploaded images (unitType_image_{i})
    const rawUnitTypes = Array.isArray(b.unitTypes) ? b.unitTypes : [];
    const unitTypes = rawUnitTypes.map((ut, i) => ({
      bedrooms: ut.bedrooms,
      baths: ut.baths !== undefined && ut.baths !== "" ? Number(ut.baths) : undefined,
      sqFt: ut.sqFt !== undefined && ut.sqFt !== "" ? Number(ut.sqFt) : undefined,
      highestSqFt:
        ut.highestSqFt !== undefined && ut.highestSqFt !== ""
          ? Number(ut.highestSqFt)
          : undefined,
      startingPrice:
        ut.startingPrice !== undefined && ut.startingPrice !== ""
          ? Number(ut.startingPrice)
          : undefined,
      highestPrice:
        ut.highestPrice !== undefined && ut.highestPrice !== ""
          ? Number(ut.highestPrice)
          : undefined,
      availableUnits:
        ut.availableUnits !== undefined && ut.availableUnits !== ""
          ? Number(ut.availableUnits)
          : undefined,
      totalUnits:
        ut.totalUnits !== undefined && ut.totalUnits !== ""
          ? Number(ut.totalUnits)
          : undefined,
      availability: ut.availability || "available",
      image: files[`unitType_image_${i}`]
        ? files[`unitType_image_${i}`][0].path
        : ut.image,
    }));

    // Facilities + per-index uploaded images (facilities_image_{i})
    const rawFacilities = Array.isArray(b.facilities) ? b.facilities : [];
    const facilities = rawFacilities.map((f, i) => ({
      name: f.name,
      description: f.description || undefined,
      image: files[`facilities_image_${i}`]
        ? files[`facilities_image_${i}`][0].path
        : f.image,
    }));

    // ── 🔒 IMPORTANT: forced status / authoritative fields ──────
    // Every listing created through this endpoint is forced to
    // "Ready" — active, available, ready — no matter what the client
    // sends. This includes the root `status` / `project_status`
    // fields the detail-page badge reads: the frontend already forces
    // these client-side too, but that's not something the backend can
    // trust — a client could always send its own values directly to
    // this endpoint. Backend forcing here is the actual source of
    // truth.
    const FORCED_STATUS = {
      completionStatus: "ready",
      propertyStatus: "active",
      availability: "available",
      status: "Ready", 
project_status: "Ready",
    };

    // ── Derived / mirror values ──────────────────────────────────
    const bedsCsv = buildCsvField(unitTypes, "bedrooms", b.bedrooms);
    const bathsCsv = buildCsvField(unitTypes, "baths", b.bathrooms);

    const priceRange = buildRange(unitTypes, "startingPrice", "highestPrice", b.price);
    const areaRange = buildRange(unitTypes, "sqFt", "highestSqFt", b.builtUpArea);

    const featured = b.featured || {};
    const isFeatured = Object.values(featured).some((v) => v === true || v === "true");

    const buildings =
      String(b.type).toLowerCase() === "apartment" && b.buildingInfo?.buildingName
        ? [
            {
              name: b.buildingInfo.buildingName,
              yearOfCompletion: b.buildingInfo.yearOfCompletion,
              totalFloors: b.buildingInfo.totalFloors,
              swimmingPools: b.buildingInfo.swimmingPools,
              totalParkingSpaces: b.buildingInfo.totalParkingSpaces,
              elevators: b.buildingInfo.elevators,
            },
          ]
        : [];

    const developersData = b.developer
      ? [
          {
            developerId: b.developerId || undefined,
            type: "Developer",
            isCustomDeveloper: !b.developerId,
            name: b.developer,
            email: b.developerEmail,
            website: b.developerWebsite,
            address: b.developerAddress,
            workingTime: [],
            description: b.developerDescription,
          },
        ]
      : [];

    const salesExecutives = b.agent
      ? [
          {
            name: b.agent.name,
            email: b.agent.email,
            phone: b.agent.phone,
            languages: b.salesLanguages,
            role: b.salesRole,
            message: b.salesMessage,
            useWhatsappBusinessApi: toBool(b.salesUseWhatsappApi),
            whatsappApiEnabled: toBool(b.salesWhatsappApiEnabled),
            companyWhatsappUrl: b.salesCompanyWhatsappUrl || undefined,
            image: agentProfileUrl,
          },
        ]
      : [];

    const attachments = b.brochureUrl
      ? [{ attachmentTitle: "Brochure", attachmentUrl: b.brochureUrl, fileType: "brochure" }]
      : [];

    const parkingInfo = buildParkingInfo(
      unitTypes,
      b.bedrooms,
      b.buildingInfo?.totalParkingSpaces
    );

    const legacyPaymentPlans = buildLegacyPaymentPlans(b.paymentPlan);

    const combinedProjectLocation = [b.location_detail?.subCommunity, b.location_detail?.city]
      .filter(Boolean)
      .join(", ");

    const listingPayload = {
      title: b.title,
      referenceNo: b.referenceNo,
      slug: uniqueSlug,
      price: Number(b.price),
      currency: b.currency || "AED",
      serviceCharges: b.serviceCharges ? Number(b.serviceCharges) : undefined,
      type: b.type,
      purpose: b.purpose || "sell",
      community: communityId,

      completionStatus: FORCED_STATUS.completionStatus,
      propertyStatus: FORCED_STATUS.propertyStatus,
      listingStatus: b.listingStatus,
      availability: FORCED_STATUS.availability,
     
project_status: FORCED_STATUS.
project_status,

      isFeatured,
      featured,

      furnishing: b.furnishing,
      bedrooms: b.bedrooms ? Number(b.bedrooms) : undefined,
      bathrooms: b.bathrooms ? Number(b.bathrooms) : undefined,
      garage: b.garage ? Number(b.garage) : undefined,
      rooms: b.rooms ? Number(b.rooms) : undefined,
      builtUpArea: b.builtUpArea ? Number(b.builtUpArea) : undefined,
      totalBuildingArea: b.totalBuildingArea ? Number(b.totalBuildingArea) : undefined,
      plotArea: b.plotArea ? Number(b.plotArea) : undefined,

      developer: b.developer,
      developerId: b.developerId || undefined,
      developerAddress: b.developerAddress,
      developerDescription: b.developerDescription,
      developerEmail: b.developerEmail,
      developerPhone: b.developerPhone,
      developerWebsite: b.developerWebsite,
      developerWorkingTime: [],
      developerImageUrl,
      developersData,

      ownership: b.ownership,
      usage: b.usage,

      yearBuilt: b.yearBuilt ? Number(b.yearBuilt) : undefined,
      handoverDate: b.handoverDate,
      expectedCompletionDate: b.expected_completion_date || b.handoverDate,
      listingDate: b.listingDate ? new Date(b.listingDate) : undefined,
      addedOn: b.addedOn ? new Date(b.addedOn) : new Date(),

      description: b.description,
      features,
      facilities,
      amenitiesAndFeatures: {
        amenities: [],
        featuresNames: facilities.map((f) => f.name).filter(Boolean),
      },

      images: imagesObj,
      all_images,
      videos: videoUrls,
      youtubeVideoId: b.youtubeVideoId,
      youtubeLinks: b.youtubeVideoId ? [b.youtubeVideoId] : [],
      brochureUrl: b.brochureUrl,
      attachments,

      agent: b.agent
        ? {
            name: b.agent.name,
            agency: b.agent.agency,
            phone: b.agent.phone,
            whatsapp: b.agent.whatsapp,
            email: b.agent.email,
            profileImage: agentProfileUrl,
            isResponsiveBroker: toBool(b.agent.isResponsiveBroker),
          }
        : undefined,
      salesExecutives,

      internal: b.internal
        ? {
            internalListingId: b.internal.internalListingId,
            sourceBrokerageName: b.internal.sourceBrokerageName,
            listingAgentName: b.internal.listingAgentName,
            listingAgentPhone: b.internal.listingAgentPhone,
            listingAgentEmail: b.internal.listingAgentEmail,
            listingSourceType: b.internal.listingSourceType || "direct",
            listingValidUntil: b.internal.listingValidUntil
              ? new Date(b.internal.listingValidUntil)
              : undefined,
          }
        : undefined,

      validatedInfo: b.validatedInfo
        ? {
            ownership: b.validatedInfo.ownership,
            builtUpArea: b.validatedInfo.builtUpArea
              ? Number(b.validatedInfo.builtUpArea)
              : undefined,
            plotArea: b.validatedInfo.plotArea
              ? Number(b.validatedInfo.plotArea)
              : undefined,
            usage: b.validatedInfo.usage,
            developer: b.validatedInfo.developer,
          }
        : undefined,

      projectInfo: b.projectInfo
        ? {
            name: b.projectInfo.name,
            status: b.projectInfo.status,
            completion: b.projectInfo.completion,
            handoverDate: b.projectInfo.handoverDate,
            developer: b.projectInfo.developer,
            lastInspected: b.projectInfo.lastInspected,
          }
        : undefined,

      regulatoryInfo: b.regulatoryInfo
        ? {
            permitNumber: b.regulatoryInfo.permitNumber,
            zoneName: b.regulatoryInfo.zoneName,
            rera: b.regulatoryInfo.rera || "Approved",
            brn: b.regulatoryInfo.brn || "Approved",
            registeredAgency: b.regulatoryInfo.registeredAgency || "RTO",
          }
        : undefined,

      // Structured location (from location_detail), NOT the flat
      // `location` string — see locationText below for that.
      location: b.location_detail
        ? {
            address: b.location_detail.address,
            community: b.location_detail.community,
            subCommunity: b.location_detail.subCommunity,
            city: b.location_detail.city,
            country: b.location_detail.country,
            emirates: b.location_detail.emirates,
            communityImage: communityImageUrl,
            coordinates: b.location_detail.coordinates || {
              type: "Point",
              coordinates: [0, 0],
            },
          }
        : undefined,
      locationText: typeof b.location === "string" ? b.location : undefined,
      projectLocation: b.project_location || combinedProjectLocation,
      projectCity: b.project_city || b.location_detail?.city,
      cityData: { id: b.cityId || undefined, name: b.location_detail?.city },
      countryData: { id: b.countryId || undefined, name: b.location_detail?.country },
      districtData: [
        {
          id: b.districtId || undefined,
          name: b.location_detail?.subCommunity || b.location,
        },
      ],
      nearbyLocations: nearbyLocations
        .filter((n) => n.name)
        .map((n) => ({ name: n.name, area: n.area || undefined, distance: n.distance })),

      buildingInfo: b.buildingInfo
        ? {
            buildingName: b.buildingInfo.buildingName,
            yearOfCompletion: b.buildingInfo.yearOfCompletion,
            totalFloors: b.buildingInfo.totalFloors,
            swimmingPools: b.buildingInfo.swimmingPools,
            totalParkingSpaces: b.buildingInfo.totalParkingSpaces,
            totalBuildingArea: b.buildingInfo.totalBuildingArea,
            elevators: b.buildingInfo.elevators,
          }
        : undefined,
      buildings,

      unitTypes,
      floorPlans,

      paymentPlan: b.paymentPlan
        ? {
            planName: b.paymentPlan.planName,
            downPayment: b.paymentPlan.downPayment
              ? Number(b.paymentPlan.downPayment)
              : undefined,
            timelineQuarter: b.paymentPlan.timelineQuarter,
            onBookingPercent: b.paymentPlan.onBookingPercent
              ? Number(b.paymentPlan.onBookingPercent)
              : undefined,
            onConstructionPercent: b.paymentPlan.onConstructionPercent
              ? Number(b.paymentPlan.onConstructionPercent)
              : undefined,
            onHandoverPercent: b.paymentPlan.onHandoverPercent
              ? Number(b.paymentPlan.onHandoverPercent)
              : undefined,
            postHandoverPercent: b.paymentPlan.postHandoverPercent
              ? Number(b.paymentPlan.postHandoverPercent)
              : undefined,
            installmentPlan,
            steps,
          }
        : undefined,
      legacyPaymentPlans,

      investmentInsights: b.investmentInsights
        ? {
            rentalYield: b.investmentInsights.rentalYield,
            priceTrend: b.investmentInsights.priceTrend,
            pricePerSqFt: b.investmentInsights.pricePerSqFt
              ? Number(b.investmentInsights.pricePerSqFt)
              : undefined,
          }
        : undefined,

      commissionPercentage: b.commission_percentage ? Number(b.commission_percentage) : undefined,
      commissionPercentageMax: b.commission_percentage_max
        ? Number(b.commission_percentage_max)
        : undefined,
      companyProjectId: b.company_project_id || undefined,
      featureImageAltText: b.feature_image_alt_text || undefined,
      metaTitle: b.meta_title || undefined,
      metaDescription: b.meta_description || undefined,
      website: Array.isArray(b.website) ? b.website : [],

      hasProperty: true,
      inventoryOnRequest: toBool(b.inventory_on_request),
      inventoryStatus: b.inventory_status !== false,
      noRealInventory: toBool(b.no_real_inventory),
      priceUponRequest: toBool(b.price_upon_request),
      totalProperties: b.total_properties
        ? Number(b.total_properties)
        : unitTypes.length || undefined,

      parkingInfo,
      areaStart: areaRange.start,
      areaEnd: areaRange.end,
      areaSize: "sqft",
      priceStart: priceRange.start,
      priceEnd: priceRange.end,

      // ── Legacy / search-compatible mirror fields ──────────────
      status: FORCED_STATUS.status,
      city_name: b.location_detail?.city,
      district_name: b.location_detail?.subCommunity || b.location_detail?.address,
      developer_name: b.developer,
      beds: bedsCsv,
      baths: bathsCsv,
      property_category: b.type ? [b.type] : [],
      expected_delivery_date: buildExpectedDeliveryDate(b.handoverDate),
      created_date: new Date(),
      min_price: priceRange.start,
      max_price: priceRange.end,
    };

    const listing = await Listing.create(listingPayload);

    return res.status(201).json({
      success: true,
      message: "Listing created successfully",
      listing,
    });
  } catch (error) {
    console.error("CREATE LISTING ERROR:", error);
    return res
      .status(500)
      .json({ success: false, error: error.message || "Server error" });
  }
};

// ── UPDATE LISTING STATUS (admin approve/reject) ──────────────
export const updateListingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ["pending", "active", "rejected", "sold"];
    if (!allowed.includes(lc(status))) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed: ${allowed.join(", ")}`,
      });
    }

    const listing = await Listing.findByIdAndUpdate(
      id,
      { propertyStatus: lc(status) },   // ✅ propertyStatus — admin approval
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    return res.status(200).json({
      success: true,
      message: `Listing status updated to "${lc(status)}"`,
      listing,
    });
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error while updating status" });
  }
};

// ── UPDATE FEATURED ───────────────────────────────────────────
export const updateListingFeatured = async (req, res) => {
  try {
    const { id } = req.params;
    const { isFeatured } = req.body;

    const listing = await Listing.findByIdAndUpdate(
      id,
      { isFeatured: isFeatured === true || isFeatured === "true" },
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    return res.status(200).json({
      success: true,
      message: `Listing featured status updated`,
      listing,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating featured" });
  }
};

// ── UPDATE AVAILABILITY ───────────────────────────────────────
export const updateAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { availability } = req.body;

    const allowed = ["available", "unavailable"];
    if (!allowed.includes(lc(availability))) {
      return res.status(400).json({
        success: false,
        message: `Invalid value. Allowed: ${allowed.join(", ")}`,
      });
    }

    const listing = await Listing.findByIdAndUpdate(
      id,
      { availability: lc(availability) },
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    return res.status(200).json({
      success: true,
      message: `Availability updated to "${lc(availability)}"`,
      listing,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update availability" });
  }
};

// ── DELETE LISTING ────────────────────────────────────────────
export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findByIdAndDelete(id);
    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    return res.status(200).json({ success: true, message: "Listing deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// ── GET ALL LISTINGS (with filters) ──────────────────────────
export const getAllListings = async (req, res) => {
  try {
    const {
      propertyStatus, completionStatus, type,
      purpose, isFeatured, availability,
      page = 1, limit = 20,
    } = req.query;

    const filter = {};
    if (propertyStatus)  filter.propertyStatus  = lc(propertyStatus);
    if (completionStatus) filter.completionStatus = lc(completionStatus);
    if (type)            filter.type             = lc(type);
    if (purpose)         filter.purpose          = lc(purpose);
    if (availability)    filter.availability     = lc(availability);
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === "true";

    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Listing.countDocuments(filter);
    const listings = await Listing.find(filter)
       .populate("community") 
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    return res.status(200).json({
      success: true,
      total,
      page:       Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      listings,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// ── GET SINGLE LISTING ────────────────────────────────────────
export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
                                   .populate("community");
    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }
    return res.status(200).json({ success: true, listing });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// ── CREATE COMMUNITY ──────────────────────────────────────────
export const createCommunity = async (req, res) => {
  try {
    const bodyData = JSON.parse(req.body.data);
    const files = req.files;

    // ✅ Hero images ab array ke andar hain: files.heroImages = [ {path...}, {path...}, ... ]
    if (bodyData.hero?.cards && files["heroImages"]) {
      files["heroImages"].forEach((file, idx) => {
        if (bodyData.hero.cards[idx]) {
          bodyData.hero.cards[idx].image = file.path;
        }
      });
    }

    // Overview image
    if (files["overviewImage"]) {
      bodyData.overview.image = files["overviewImage"][0].path;
    }

    // Market data image
    if (files["marketImage"]) {
      bodyData.marketSupply.image = files["marketImage"][0].path;
    }

    const saved = await new Community(bodyData).save();

    return res.status(201).json({
      success: true,
      message: "Community created successfully",
      data: saved,
    });
  } catch (error) {
    console.error("COMMUNITY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating community",
      error: error.message,
    });
  }
};
// ── GET COMMUNITIES (for dropdown) ──────────────────────────
export const getCommunities = async (req, res) => {
  try {
    const communities = await Community
      .find()
      .select("_id name slug")
      .sort({ name: 1 });

    return res.status(200).json(communities);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch communities",
      error: error.message,
    });
  }
};