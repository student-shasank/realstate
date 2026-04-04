import Listing from "../models/Listing.js";

export const searchListings = async (req, res) => {
  try {
    const {
      beds,
      baths,
      minPrice,
      maxPrice,
      min_price,
      max_price,
      propertyType,
      property_type,
      completion,
      propertyStatus, // frontend se aata hai
      developer,
      purpose,
      emirates,
      handoverYear,
      location,
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    // active + available
    query.propertyStatus = "active";
    query.availability = "available";

    // ───── Location ─────
    const loc = location?.trim();
    if (loc) {
      query.$or = [
        { "location.address": { $regex: loc, $options: "i" } },
        { "location.community": { $regex: loc, $options: "i" } },
        { "location.city": { $regex: loc, $options: "i" } },
        { title: { $regex: loc, $options: "i" } },
      ];
    }

    // ───── Emirates ─────
   if (emirates) {
  const emiratesArray = emirates
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  query.$and = [
    ...(query.$and || []),
    {
      $or: emiratesArray.map((em) => ({
        "location.emirates": { $regex: `^${em}$`, $options: "i" }
      }))
    }
  ];
}
    // ───── Completion Status ────
    const completionValue = completion || propertyStatus;

    if (completionValue) {
      const completionMap = {
        "off-plan": "off-plan",
        "offplan": "off-plan",
        "off plan": "off-plan",
        "ready": "ready",
        "preconstruction": "preconstruction",
      };

      const mapped =
        completionMap[completionValue.toLowerCase().trim()];

      if (mapped) query.completionStatus = mapped;
    }

    // ───── Property Type ─────
    const pType = propertyType || property_type;
    if (pType && pType !== "All") {
      query.type = pType.toLowerCase();
    }

    // ───── Bedrooms ─────
    if (beds && beds !== "Studio") {
      query.bedrooms = { $gte: Number(beds) };
    } else if (beds === "Studio") {
      query.bedrooms = 0;
    }

    // ───── Bathrooms ─────
    if (baths) {
      query.bathrooms = { $gte: Number(baths) };
    }

    // ───── Purpose ─────
    if (purpose) {
      query.purpose = purpose.toLowerCase();
    }

    // ───── Price ─────
    const finalMinPrice = minPrice || min_price;
    const finalMaxPrice = maxPrice || max_price;

    if (finalMinPrice || finalMaxPrice) {
      query.price = {};
      if (finalMinPrice) query.price.$gte = Number(finalMinPrice);
      if (finalMaxPrice) query.price.$lte = Number(finalMaxPrice);
    }

    // ───── Developer ─────
    if (developer) {
      const developersArray = developer
        .split(",")
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean);

      if (developersArray.length > 0) {
        query.developer = { $in: developersArray };
      }
    }

    // ───── Handover Year ─────
    // ── Handover Year (ignore Q1,Q2,Q3,Q4) ──
if (handoverYear) {
  const handoverArray = handoverYear
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const yearConditions = handoverArray.map((year) => ({
    "projectInfo.handoverDate": {
      $regex: year, // sirf year search karega
      $options: "i",
    },
  }));

  if (yearConditions.length > 0) {
    query.$and = [...(query.$and || []), { $or: yearConditions }];
  }
}

    // debug
    console.log("REQ QUERY:", req.query);
    console.log("MONGO QUERY:", JSON.stringify(query, null, 2));

    // pagination
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Listing.countDocuments(query);

    const listings = await Listing.find(query)
      .sort({ isFeatured: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    return res.status(200).json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      count: listings.length,
      data: listings,
    });

  } catch (error) {
    console.error("SEARCH ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};