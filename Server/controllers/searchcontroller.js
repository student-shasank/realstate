import Listing from "../models/Listing.js";

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

/** Safely push conditions into query.$and */
const addAndCondition = (query, condition) => {
  if (!query.$and) query.$and = [];
  query.$and.push(condition);
};

/** Escape user input before using it inside a $regex (prevents regex-injection / ReDoS / crashes) */
const escapeRegex = (str = "") => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Beds: DB stores project-level `beds` as a comma string e.g. "0,1,1.5,2,2.5"
 * (many projects will have this as null — a unit-level project with no
 * flat beds summary. If your real unit data lives elsewhere, e.g.
 * `typical_units[].bedrooms`, extend this fallback accordingly.)
 */
const buildBedsCondition = (beds) => {
  if (!beds) return null;

  const isStudio = beds === "Studio" || beds === "0";
  const bedNum = isStudio ? 0 : parseFloat(beds);
  if (isNaN(bedNum)) return null;

  const escaped = escapeRegex(String(bedNum));
  return {
    $or: [
      { beds: { $regex: `(^|,)\\s*${escaped}\\s*(,|$)` } },
      // fallback: unit-level bedroom info, if your schema stores it there
      { "typical_units.bedrooms": bedNum },
    ],
  };
};

/** Completion status normalization (frontend value → DB `project_status` value) */
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
 * Sale status normalization (frontend value → DB `project_status` value).
 * out_of_stock / sold_out both resolve to "Sold Out" — there is no
 * separate "Out Of Stock" value in the DB.
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

const buildSaleStatusArray = (saleStatus) => {
  if (!saleStatus) return [];
  return saleStatus
    .split(",")
    .map((s) => SALE_STATUS_MAP[s.trim().toLowerCase()])
    .filter(Boolean);
};

/** Apply saleStatus / completion filtering onto `project_status` */
const applyStatusFilter = (query, { saleStatus, completion, propertyStatus }) => {
  const saleStatusArray = buildSaleStatusArray(saleStatus);

  if (saleStatusArray.length > 0) {
    addAndCondition(query, { project_status: { $in: saleStatusArray } });
    return;
  }

  const completionRaw = (completion || propertyStatus)?.toLowerCase().replace(/[\s-]/g, "");

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
// PRICE FILTER (AED) — FIXED
// ─────────────────────────────────────────────

/**
 * Cleans an incoming price value from the request (minPrice/maxPrice etc).
 * Handles values like: 500000, "500000", "AED 500,000", "500,000.50",
 * " 1200000 ", "aed1200000" — strips everything except digits and a
 * single decimal point, then parses to a Number.
 * Returns null for 0 / "" / null / undefined / NaN (= "no filter set").
 */
const parseAedAmount = (raw) => {
  if (raw === undefined || raw === null || raw === "") return null;

  const cleaned = String(raw)
    .replace(/aed/gi, "")
    .replace(/[^0-9.]/g, ""); // strip currency symbols, commas, spaces, letters

  if (cleaned === "") return null;

  const v = Number(cleaned);
  return Number.isFinite(v) && v > 0 ? v : null;
};

/**
 * Mongo aggregation expression that turns a possibly-messy string field
 * (e.g. "31,150,000.00", "AED 31150000", " 31150000.00 ") into a clean
 * double, so $gte/$lte comparisons against AED amounts work reliably
 * regardless of how the field was stored.
 */
const cleanPriceFieldExpr = (fieldPath) => ({
  $convert: {
    input: {
      $trim: {
        input: {
          $replaceAll: {
            input: {
              $replaceAll: {
                input: {
                  $toUpper: { $toString: { $ifNull: [fieldPath, "0"] } },
                },
                find: "AED",
                replacement: "",
              },
            },
            find: ",",
            replacement: "",
          },
        },
      },
    },
    to: "double",
    onError: 0,
    onNull: 0,
  },
});

/**
 * Price range filter (AED) — STRICT, based on `price_start` only
 * (i.e. the "Starting at AED ..." value shown on the listing card).
 *
 * We deliberately do NOT use `price_end` / range-overlap logic here:
 * a project should only match if its own starting/unit price actually
 * falls inside the requested budget, not just because some far more
 * expensive unit inside the project happens to be >= minPrice.
 *
 * - minPrice only  → price_start >= minPrice
 * - maxPrice only  → price_start <= maxPrice
 * - both           → minPrice <= price_start <= maxPrice
 *
 * DB stores `price_start` as a string, sometimes with commas / "AED"
 * prefixes / stray whitespace, so we normalize it to a clean double
 * (in AED) via $expr before comparing.
 */
const applyPriceFilter = (query, { minPrice, maxPrice, min_price, max_price }) => {
  const reqMin = parseAedAmount(minPrice ?? min_price);
  const reqMax = parseAedAmount(maxPrice ?? max_price);

  if (!reqMin && !reqMax) return;

  const startPriceExpr = cleanPriceFieldExpr("$price_start");
  const exprAnd = [];

  if (reqMin) exprAnd.push({ $gte: [startPriceExpr, reqMin] });
  if (reqMax) exprAnd.push({ $lte: [startPriceExpr, reqMax] });

  addAndCondition(query, { $expr: { $and: exprAnd } });
};

/**
 * Emirates / city filter.
 * DB has no flat `city_name` field. City lives in `city_data.name`
 * and, redundantly, in `project_city`. We match either.
 */
const applyEmiratesFilter = (query, emirates) => {
  if (!emirates) return;
  const emiratesArray = emirates.split(",").map((e) => e.trim()).filter(Boolean);
  if (emiratesArray.length === 0) return;

  addAndCondition(query, {
    $or: emiratesArray.flatMap((em) => {
      const esc = escapeRegex(em);
      return [
        { "city_data.name": { $regex: `^${esc}$`, $options: "i" } },
        { project_city: { $regex: `^${esc}$`, $options: "i" } },
      ];
    }),
  });
};

/**
 * District / free-text location search.
 * `district_name` doesn't exist — DB has `district_data: [{ name }]`.
 */
const applyLocationFilter = (query, location) => {
  const loc = location?.trim();
  if (!loc) return;

  const esc = escapeRegex(loc);
  const regex = new RegExp(esc, "i"); // ✅ RegExp object — mongoose subdocument cast crash avoid karta hai

  addAndCondition(query, {
    $or: [
      { title: regex },
      { location: regex },
      { project_location: regex },
      { project_city: regex },
      { "city_data.name": regex },
      { "district_data.name": regex },
    ],
  });
};

/**
 * Property type filter.
 * DB field is `property_types` (flat array of strings, e.g.
 * ['Apartments']), not `property_category`.
 */
const applyPropertyTypeFilter = (query, propertyType) => {
  const pType = propertyType?.trim();
  if (!pType || pType.toLowerCase() === "all") return;
  const esc = escapeRegex(pType);
  addAndCondition(query, {
    property_types: { $elemMatch: { $regex: esc, $options: "i" } },
  });
};

/** Bathrooms filter — do NOT silently include listings with baths:null */
const applyBathsFilter = (query, baths) => {
  if (!baths) return;
  const bathNum = parseFloat(baths);
  if (isNaN(bathNum)) return;
  addAndCondition(query, {
    $or: [{ baths: { $gte: bathNum } }, { baths: { $gte: String(bathNum) } }],
  });
};

/** Developer filter */
const applyDeveloperFilter = (query, developer) => {
  if (!developer) return;
  const developersArray = developer.split(",").map((d) => d.trim()).filter(Boolean);
  if (developersArray.length === 0) return;
  addAndCondition(query, {
    $or: developersArray.map((dev) => ({
      developer_name: { $regex: escapeRegex(dev), $options: "i" },
    })),
  });
};

/**
 * Handover year filter.
 * DB field is `expected_completion_date` (e.g. '2028-06-30'),
 * not `expected_delivery_date`.
 */
const applyHandoverYearFilter = (query, handoverYear) => {
  if (!handoverYear) return;
  const yearsArray = handoverYear
    .split(",")
    .map((y) => y.trim().replace(/^Q[1-4]\s*/i, ""))
    .filter((y) => /^\d{4}$/.test(y));
  if (yearsArray.length === 0) return;
  addAndCondition(query, {
    $or: yearsArray.map((year) => ({
      expected_completion_date: { $regex: `^${year}-` },
    })),
  });
};

/**
 * Builds the full Mongo query object from raw req.query.
 * Shared by both searchListings and sortListings so filter logic
 * only lives in ONE place.
 */
const buildListingQuery = (params) => {
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
  } = params;

  const query = {};

  applyLocationFilter(query, location);
  applyEmiratesFilter(query, emirates);
  applyStatusFilter(query, { saleStatus, completion, propertyStatus });
  applyPropertyTypeFilter(query, propertyType || property_type);

  if (beds) {
    const bedsCondition = buildBedsCondition(beds);
    if (bedsCondition) addAndCondition(query, bedsCondition);
  }

  applyBathsFilter(query, baths);
  applyPriceFilter(query, { minPrice, maxPrice, min_price, max_price });
  applyDeveloperFilter(query, developer);
  applyHandoverYearFilter(query, handoverYear);

  return query;
};

/** Safe pagination parsing */
const parsePagination = (page, limit) => {
  const pageNum = Math.max(1, Number.isFinite(Number(page)) ? Number(page) : 1);
  const limitRaw = Number.isFinite(Number(limit)) ? Number(limit) : 20;
  const limitNum = Math.min(100, Math.max(1, limitRaw));
  const skip = (pageNum - 1) * limitNum;
  return { pageNum, limitNum, skip };
};

const runListingQuery = async (query, sort, page, limit) => {
  const { pageNum, limitNum, skip } = parsePagination(page, limit);

  const [total, listings] = await Promise.all([
    Listing.countDocuments(query),
    Listing.find(query).sort(sort).skip(skip).limit(limitNum).lean(),
  ]);

  return {
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum) || 0,
    count: listings.length,
    data: listings,
  };
};

/**
 * Numeric price sort via aggregation.
 * price_start / price_end are stored as strings in DB (e.g. "2792000.00"),
 * so we convert them to clean doubles before sorting, using the same
 * cleaning logic used in applyPriceFilter.
 *
 * priceField: "price_start" | "price_end"
 * direction: 1 (low → high) | -1 (high → low)
 */
const runPriceSortQuery = async (query, priceField, direction, page, limit) => {
  const { pageNum, limitNum, skip } = parsePagination(page, limit);

  const pipeline = [
    { $match: query },
    {
      $addFields: {
        __sortPrice: cleanPriceFieldExpr(`$${priceField}`),
      },
    },
    {
      $facet: {
        data: [
          { $sort: { __sortPrice: direction, _id: 1 } }, // _id: 1 = stable tie-break
          { $skip: skip },
          { $limit: limitNum },
          { $project: { __sortPrice: 0 } },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ];

  const [result] = await Listing.aggregate(pipeline);
  const total = result?.totalCount?.[0]?.count || 0;
  const listings = result?.data || [];

  return {
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum) || 0,
    count: listings.length,
    data: listings,
  };
};

// ─────────────────────────────────────────────
// CONTROLLER: SEARCH ENDPOINT
// GET /api/projects/search
// ─────────────────────────────────────────────
export const searchListings = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const query = buildListingQuery(req.query);

    if (process.env.NODE_ENV !== "production") {
      console.log("🔍 [SEARCH] MONGO QUERY:", JSON.stringify(query, null, 2));
    }

    const result = await runListingQuery(
      query,
      { isFeatured: -1, created_date: -1 },
      page,
      limit
    );

    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error("❌ SEARCH ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────
// CONTROLLER: SORT ENDPOINT
// GET /api/projects/sort
// Same filters as searchListings — plus a `sortBy` query param.
// ─────────────────────────────────────────────
const SORT_MAP = {
  most_popular: { isFeatured: -1, created_date: -1 },
  featured: { isFeatured: -1, created_date: -1 },
  newest: { created_date: -1 },
  beds_asc: { beds: 1 }, // NOTE: `beds` is a string field → lexical sort, not numeric
  beds_desc: { beds: -1 },
};

export const sortListings = async (req, res) => {
  try {
    const { page = 1, limit = 20, sortBy = "most_popular" } = req.query;
    const query = buildListingQuery(req.query);

    if (process.env.NODE_ENV !== "production") {
      console.log("🔍 [SORT] MONGO QUERY:", JSON.stringify(query, null, 2));
      console.log("↕️ [SORT] sortBy:", sortBy);
    }

    let result;

    if (sortBy === "price_asc") {
      // Low → High, based on price_start (starting price shown on card)
      result = await runPriceSortQuery(query, "price_start", 1, page, limit);
    } else if (sortBy === "price_desc") {
      // High → Low, based on price_start (same field used for asc, for consistent ordering)
      result = await runPriceSortQuery(query, "price_start", -1, page, limit);
    } else {
      const sortOption = SORT_MAP[sortBy] || SORT_MAP.most_popular;
      result = await runListingQuery(query, sortOption, page, limit);
    }

    return res.status(200).json({ success: true, sortBy, ...result });
  } catch (error) {
    console.error("❌ SORT ERROR:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};