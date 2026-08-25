import Listing from "../models/Listing.js";

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

/**
 * Safely push conditions into query.$and
 */
const addAndCondition = (query, condition) => {
  if (!query.$and) query.$and = [];
  query.$and.push(condition);
};

/**
 * Normalize beds string "0,1,1.5,2,2.5" → check if requested bed count exists
 * DB stores beds as comma-separated string e.g. "0,1,1.5,2,2.5"
 * We match if the requested bed value exists anywhere in that string
 */
const buildBedsCondition = (beds) => {
  if (!beds) return null;

  if (beds === "Studio" || beds === "0") {
    return {
      beds: { $regex: /(^|,)\s*0\s*(,|$)/ },
    };
  }

  const bedNum = parseFloat(beds);
  if (isNaN(bedNum)) return null;

  return {
    beds: { $regex: `(^|,)\\s*${bedNum}\\s*(,|$)` },
  };
};

/**
 * Completion status normalization
 */
const COMPLETION_MAP = {
  "off-plan": "On Sale",
  offplan: "On Sale",
  "off plan": "On Sale",
  onsale: "On Sale",
  "on sale": "On Sale",
  ready: "Ready",
  completed: "Ready",
  preconstruction: "Pre-Construction",
  "pre-construction": "Pre-Construction",
};

const normalizeCompletion = (value) => {
  if (!value) return null;
  return COMPLETION_MAP[value.toLowerCase().trim()] || null;
};

/**
 * Sale status normalization (frontend value → DB value)
 * Shared by searchListings & sortListings so both stay in sync.
 *
 * NOTE: "out_of_stock" from the frontend filter is intentionally mapped
 * to "Sold Out" — that's the actual value stored in project_status for
 * out-of-stock properties. There is no separate "Out Of Stock" value in
 * the DB, so both out_of_stock and sold_out resolve to "Sold Out".
 */
const SALE_STATUS_MAP = {
  on_sale: "On Sale",
  announced: "Announced",
  presale_eoi: "EOI",
  eoi: "EOI",
  start_of_sales: "Start of Sales",
  out_of_stock: "Sold Out",
  sold_out: "Sold Out",
  ready: "Ready",
};

/**
 * Build the mapped saleStatus array from raw query param
 */
const buildSaleStatusArray = (saleStatus) => {
  if (!saleStatus) return [];
  return saleStatus
    .split(",")
    .map((s) => SALE_STATUS_MAP[s.trim().toLowerCase()])
    .filter(Boolean);
};

/**
 * Apply saleStatus / completion filtering onto the query.
 * Only checks `project_status` — whatever value comes in for saleStatus
 * (or completion/propertyStatus) is searched against project_status only.
 */
const applyStatusFilter = (query, { saleStatus, completion, propertyStatus }) => {
  const saleStatusArray = buildSaleStatusArray(saleStatus);

  if (saleStatusArray.length > 0) {
    addAndCondition(query, {
      project_status: { $in: saleStatusArray },
    });
    return;
  }

  // No saleStatus → fall back to completion/propertyStatus
  const completionRaw = (completion || propertyStatus)
    ?.toLowerCase()
    .replace(/[\s-]/g, "");

  if (completionRaw === "offplan") {
    addAndCondition(query, {
      project_status: { $in: ["Announced", "EOI", "Start of Sales", "On Sale"] },
    });
    return;
  }

  const mappedStatus = normalizeCompletion(completion || propertyStatus);
  if (mappedStatus) {
    addAndCondition(query, { project_status: mappedStatus });
  }
};

// ─────────────────────────────────────────────
// CONTROLLER: EXISTING SEARCH ENDPOINT
// ─────────────────────────────────────────────

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
      propertyStatus,
      developer,
      emirates,
      handoverYear,
      saleStatus,
      location,
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    // ───── Location Search ─────
    const loc = location?.trim();
    if (loc) {
      addAndCondition(query, {
        $or: [
          { title: { $regex: loc, $options: "i" } },
          { location: { $regex: loc, $options: "i" } },
          { district_name: { $regex: loc, $options: "i" } },
          { city_name: { $regex: loc, $options: "i" } },
        ],
      });
    }

    // ───── Emirates ─────
    if (emirates) {
      const emiratesArray = emirates
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);

      if (emiratesArray.length > 0) {
        addAndCondition(query, {
          $or: emiratesArray.map((em) => ({
            city_name: { $regex: `^${em}$`, $options: "i" },
          })),
        });
      }
    }

    // ───── Status Filter (checks status AND project_status) ─────
    applyStatusFilter(query, { saleStatus, completion, propertyStatus });

    // ───── Property Type ─────
    const pType = (propertyType || property_type)?.trim();
    if (pType && pType.toLowerCase() !== "all") {
      const escapedType = pType.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      addAndCondition(query, {
        property_category: {
          $elemMatch: { $regex: escapedType, $options: "i" },
        },
      });
    }

    // ───── Bedrooms ─────
    if (beds) {
      const bedsCondition = buildBedsCondition(beds);

      if (bedsCondition) {
        addAndCondition(query, {
          $or: [bedsCondition],
        });
      }
    }

    // ───── Bathrooms ─────
    if (baths) {
      const bathNum = parseFloat(baths);

      if (!isNaN(bathNum)) {
        addAndCondition(query, {
          $or: [
            { baths: { $gte: bathNum } },
            { baths: { $gte: String(bathNum) } },
            { baths: null },
          ],
        });
      }
    }

    // ───── Price Range ─────
    const reqMin = Number(minPrice || min_price || 0) || null;
    const reqMax = Number(maxPrice || max_price || 0) || null;

    if (reqMin || reqMax) {
      const priceConditions = {};
      if (reqMin) priceConditions.max_price = { $gte: reqMin };
      if (reqMax) priceConditions.min_price = { $lte: reqMax };
      addAndCondition(query, priceConditions);
    }

    // ───── Developer ─────
    if (developer) {
      const developersArray = developer
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean);

      if (developersArray.length > 0) {
        addAndCondition(query, {
          $or: developersArray.map((dev) => ({
            developer_name: { $regex: dev, $options: "i" },
          })),
        });
      }
    }

    // ───── Handover Year ─────
    if (handoverYear) {
      const yearsArray = handoverYear
        .split(",")
        .map((y) => y.trim().replace(/^Q[1-4]\s*/i, ""))
        .filter((y) => /^\d{4}$/.test(y));

      if (yearsArray.length > 0) {
        addAndCondition(query, {
          $or: yearsArray.map((year) => ({
            expected_delivery_date: { $regex: `^${year}-` },
          })),
        });
      }
    }

    console.log("📥 REQ QUERY:", req.query);
    console.log("🔍 MONGO QUERY:", JSON.stringify(query, null, 2));

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    console.log("📄 PAGINATION DEBUG:", {
      requestedPage: Number(page),
      pageNum,
      limitNum,
      skip,
      expectedRange: `Item ${skip + 1} to ${skip + limitNum}`,
    });

    const [total, listings] = await Promise.all([
      Listing.countDocuments(query),
      Listing.find(query)
        .sort({ isFeatured: -1, created_date: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
    ]);

    console.log("📊 RESPONSE DEBUG:", {
      totalDocuments: total,
      returnedCount: listings.length,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      firstItemId: listings[0]?._id,
      lastItemId: listings[listings.length - 1]?._id,
    });

    return res.status(200).json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      count: listings.length,
      data: listings,
    });
  } catch (error) {
    console.error("❌ SEARCH ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ─────────────────────────────────────────────
// CONTROLLER: SORT ENDPOINT
// GET /api/projects/sort
// Same filters as searchListings — plus a `sortBy` query param
// that decides Mongo `.sort()`.
// ─────────────────────────────────────────────

const SORT_MAP = {
  most_popular: { isFeatured: -1, created_date: -1 },
  featured: { isFeatured: -1, created_date: -1 },
  newest: { created_date: -1 },
  price_asc: { min_price: 1 },
  price_desc: { max_price: -1 },
  beds_asc: { beds: 1 },   // NOTE: beds string field hai, lexical sort hoga
  beds_desc: { beds: -1 }, // (numeric sort ke liye future me min_beds field banao)
};

export const sortListings = async (req, res) => {
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
      propertyStatus,
      developer,
      emirates,
      handoverYear,
      saleStatus,
      location,
      sortBy = "most_popular",
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    // ───── Location Search ─────
    const loc = location?.trim();
    if (loc) {
      addAndCondition(query, {
        $or: [
          { title: { $regex: loc, $options: "i" } },
          { location: { $regex: loc, $options: "i" } },
          { district_name: { $regex: loc, $options: "i" } },
          { city_name: { $regex: loc, $options: "i" } },
        ],
      });
    }

    // ───── Emirates ─────
    if (emirates) {
      const emiratesArray = emirates
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);

      if (emiratesArray.length > 0) {
        addAndCondition(query, {
          $or: emiratesArray.map((em) => ({
            city_name: { $regex: `^${em}$`, $options: "i" },
          })),
        });
      }
    }

    // ───── Status Filter (checks status AND project_status) ─────
    applyStatusFilter(query, { saleStatus, completion, propertyStatus });

    // ───── Property Type ─────
    const pType = (propertyType || property_type)?.trim();
    if (pType && pType.toLowerCase() !== "all") {
      const escapedType = pType.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      addAndCondition(query, {
        property_category: {
          $elemMatch: { $regex: escapedType, $options: "i" },
        },
      });
    }

    // ───── Bedrooms ─────
    if (beds) {
      const bedsCondition = buildBedsCondition(beds);
      if (bedsCondition) {
        addAndCondition(query, { $or: [bedsCondition] });
      }
    }

    // ───── Bathrooms ─────
    if (baths) {
      const bathNum = parseFloat(baths);
      if (!isNaN(bathNum)) {
        addAndCondition(query, {
          $or: [
            { baths: { $gte: bathNum } },
            { baths: { $gte: String(bathNum) } },
            { baths: null },
          ],
        });
      }
    }

    // ───── Price Range ─────
    const reqMin = Number(minPrice || min_price || 0) || null;
    const reqMax = Number(maxPrice || max_price || 0) || null;

    if (reqMin || reqMax) {
      const priceConditions = {};
      if (reqMin) priceConditions.max_price = { $gte: reqMin };
      if (reqMax) priceConditions.min_price = { $lte: reqMax };
      addAndCondition(query, priceConditions);
    }

    // ───── Developer ─────
    if (developer) {
      const developersArray = developer
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean);

      if (developersArray.length > 0) {
        addAndCondition(query, {
          $or: developersArray.map((dev) => ({
            developer_name: { $regex: dev, $options: "i" },
          })),
        });
      }
    }

    // ───── Handover Year ─────
    if (handoverYear) {
      const yearsArray = handoverYear
        .split(",")
        .map((y) => y.trim().replace(/^Q[1-4]\s*/i, ""))
        .filter((y) => /^\d{4}$/.test(y));

      if (yearsArray.length > 0) {
        addAndCondition(query, {
          $or: yearsArray.map((year) => ({
            expected_delivery_date: { $regex: `^${year}-` },
          })),
        });
      }
    }

    console.log("📥 [SORT] REQ QUERY:", req.query);
    console.log("🔍 [SORT] MONGO QUERY:", JSON.stringify(query, null, 2));

    const sortOption = SORT_MAP[sortBy] || SORT_MAP.most_popular;
    console.log("↕️ [SORT] sortBy:", sortBy, "→", sortOption);

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    console.log("📄 [SORT] PAGINATION DEBUG:", {
      requestedPage: Number(page),
      pageNum,
      limitNum,
      skip,
      expectedRange: `Item ${skip + 1} to ${skip + limitNum}`,
    });

    const [total, listings] = await Promise.all([
      Listing.countDocuments(query),
      Listing.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limitNum)
        .lean(),
    ]);

    console.log("📊 [SORT] RESPONSE DEBUG:", {
      totalDocuments: total,
      returnedCount: listings.length,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      firstItemId: listings[0]?._id,
      lastItemId: listings[listings.length - 1]?._id,
    });

    return res.status(200).json({
      success: true,
      sortBy,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      count: listings.length,
      data: listings,
    });
  } catch (error) {
    console.error("❌ SORT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};