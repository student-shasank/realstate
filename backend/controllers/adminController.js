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
export const createListing = async (req, res) => {
  try {
    const b = req.body;

    // Images: files OR JSON array
    const files = req.files || {}; // Pehle files object ko handle karo

// 1. Main Gallery Images (Multiple)
const imageUrls = files['images'] 
  ? files['images'].map((f) => f.path) 
  : (typeof b.images === "string" ? JSON.parse(b.images) : b.images || []);

// 2. Videos (Multiple) - Cloudinary videos array
const videoUrls = files['videos'] 
  ? files['videos'].map((f) => f.path) 
  : (typeof b.videos === "string" ? JSON.parse(b.videos) : b.videos || []);

// 3. Agent Profile (Single)
const agentProfileUrl = files['agentProfile'] 
  ? files['agentProfile'][0].path 
  : (typeof b.agent === "string" ? JSON.parse(b.agent).profileImage : b.agent?.profileImage);

// 4. Community Image (Single)
const communityImageUrl = files['communityImage'] 
  ? files['communityImage'][0].path 
  : (typeof b.location === "string" ? JSON.parse(b.location).communityImage : b.location?.communityImage);

    // Required fields
    if (!b.title || !b.price) {
      return res
        .status(400)
        .json({ success: false, error: "Title and price are required" });
    }

    // Slug
    const uniqueSlug = generateSlug(b.title);
    // ✅ validate community
// community required
if (!b.community) {
  return res.status(400).json({
    success: false,
    message: "Community is required",
  });
}

// validate community
let communityId;

const communityExists = await Community.findById(b.community);

if (!communityExists) {
  return res.status(400).json({
    success: false,
    message: "Invalid community selected",
  });
}

communityId = communityExists._id;
    // Parse arrays safely
    const parseJSONSafe = (val) => {
      if (!val) return [];
      if (typeof val === "string") return JSON.parse(val);
      if (Array.isArray(val)) return val;
      return [];
    };

    const installmentPlan = parseJSONSafe(b.installmentPlan);
    const steps = parseJSONSafe(b.paymentPlan?.steps);
    const unitTypes = parseJSONSafe(b.unitTypes);
    const floorPlans = parseJSONSafe(b.floorPlans);
    const features = parseJSONSafe(b.features);

    const listingPayload = {
      title: b.title,
      referenceNo: b.referenceNo,
      slug: uniqueSlug,
      price: Number(b.price),
      currency: b.currency || "AED",
      serviceCharges: b.serviceCharges ? Number(b.serviceCharges) : undefined,
      type: b.type,
      purpose: b.purpose || "sell",
      completionStatus: b.completionStatus,
       community: communityId,
      propertyStatus: b.propertyStatus || "pending",
      listingStatus: b.listingStatus,
      availability: b.availability || "available",
      isFeatured: b.isFeatured === true || b.isFeatured === "true",
      furnishing: b.furnishing,
      bedrooms: b.bedrooms ? Number(b.bedrooms) : undefined,
      bathrooms: b.bathrooms ? Number(b.bathrooms) : undefined,
      garage: b.garage ? Number(b.garage) : undefined,
      rooms: b.rooms ? Number(b.rooms) : undefined,
      builtUpArea: b.builtUpArea ? Number(b.builtUpArea) : undefined,
      totalBuildingArea: b.totalBuildingArea ? Number(b.totalBuildingArea) : undefined,
      plotArea: b.plotArea ? Number(b.plotArea) : undefined,
      developer: b.developer,
      ownership: b.ownership,
      yearBuilt: b.yearBuilt ? Number(b.yearBuilt) : undefined,
      handoverDate: b.handoverDate,
      listingDate: b.listingDate ? new Date(b.listingDate) : undefined,
      addedOn: b.addedOn ? new Date(b.addedOn) : new Date(),
      description: b.description,
      features,
      images: imageUrls,
      videos:videoUrls,
      youtubeVideoId: b.youtubeVideoId,
      brochureUrl: b.brochureUrl,

      // Agent
      agent: b.agent ? {
        name: b.agent.name,
        agency: b.agent.agency,
        phone: b.agent.phone,
        whatsapp: b.agent.whatsapp,
        email: b.agent.email,
        profileImage: agentProfileUrl,
        isResponsiveBroker: b.agent.isResponsiveBroker === true || b.agent.isResponsiveBroker === "true"
      } : undefined,

      // Internal
      internal: b.internal ? {
        internalListingId: b.internal.internalListingId,
        sourceBrokerageName: b.internal.sourceBrokerageName,
        listingAgentName: b.internal.listingAgentName,
        listingAgentPhone: b.internal.listingAgentPhone,
        listingAgentEmail: b.internal.listingAgentEmail,
        listingSourceType: b.internal.listingSourceType || "direct",
        listingValidUntil: b.internal.listingValidUntil ? new Date(b.internal.listingValidUntil) : undefined
      } : undefined,

      // Validated info
      validatedInfo: b.validatedInfo ? {
        ownership: b.validatedInfo.ownership,
        builtUpArea: b.validatedInfo.builtUpArea ? Number(b.validatedInfo.builtUpArea) : undefined,
        plotArea: b.validatedInfo.plotArea ? Number(b.validatedInfo.plotArea) : undefined,
        usage: b.validatedInfo.usage,
        developer: b.validatedInfo.developer
      } : undefined,

      // Project info
      projectInfo: b.projectInfo ? {
        name: b.projectInfo.name,
        status: b.projectInfo.status,
        completion: b.projectInfo.completion,
        handoverDate: b.projectInfo.handoverDate,
        developer: b.projectInfo.developer,
        lastInspected: b.projectInfo.lastInspected
      } : undefined,

      regulatoryInfo: b.regulatoryInfo ? {
        permitNumber: b.regulatoryInfo.permitNumber,
        zoneName: b.regulatoryInfo.zoneName,
        rera: b.regulatoryInfo.rera || "Approved",
        brn: b.regulatoryInfo.brn || "Approved",
        registeredAgency: b.regulatoryInfo.registeredAgency || "RTO"
      } : undefined,

      // Location
      location: b.location ? {
        address: b.location.address,
        community: b.location.community,
        subCommunity: b.location.subCommunity,
        city: b.location.city,
        country: b.location.country,
        emirates: b.location.emirates,
        communityImage:communityImageUrl,
        coordinates: b.location.coordinates || { type: "Point", coordinates: [0, 0] }
      } : undefined,

      // Building info
      buildingInfo: b.buildingInfo ? {
        buildingName: b.buildingInfo.buildingName,
        yearOfCompletion: b.buildingInfo.yearOfCompletion,
        totalFloors: b.buildingInfo.totalFloors,
        swimmingPools: b.buildingInfo.swimmingPools,
        totalParkingSpaces: b.buildingInfo.totalParkingSpaces,
        totalBuildingArea: b.buildingInfo.totalBuildingArea,
        elevators: b.buildingInfo.elevators
      } : undefined,

      unitTypes,
      floorPlans,

      // Payment plan
      paymentPlan: b.paymentPlan ? {
        planName: b.paymentPlan.planName,
        downPayment: b.paymentPlan.downPayment ? Number(b.paymentPlan.downPayment) : undefined,
        installmentPlan,
        steps
      } : undefined,

      // Investment insights
      investmentInsights: b.investmentInsights ? {
        rentalYield: b.investmentInsights.rentalYield,
        priceTrend: b.investmentInsights.priceTrend,
        pricePerSqFt: b.investmentInsights.pricePerSqFt ? Number(b.investmentInsights.pricePerSqFt) : undefined
      } : undefined,
    };

    const listing = await Listing.create(listingPayload);

    return res.status(201).json({
      success: true,
      message: "Listing created successfully",
      listing,
    });
  } catch (error) {
    console.error("CREATE LISTING ERROR:", error);
    return res.status(500).json({ success: false, error: error.message || "Server error" });
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