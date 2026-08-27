// controllers/similarListingController.js
import mongoose from "mongoose";
import Listing from "../models/Listing.js"; // apne actual model path/name se match karo

/**
 * GET /api/listings/similar
 * Query params: community, city, excludeId, limit
 *
 * IMPORTANT (fix #1): Listing schema mein "community" field ObjectId type hai
 * (kisi Community collection ka reference), string nahi — isliye usme
 * regex daalne se CastError aa raha tha.
 *
 * Actual location data in fields mein store hoti hai:
 *   - Community/District → district_data: [{ id, name }]
 *   - City                → city_data.name  (fallback: project_city)
 *
 * Isliye yahan community param ko "district_data.name" se match karte hain,
 * aur city param ko "city_data.name" ya "project_city" se.
 *
 * IMPORTANT (fix #2): "Sold Out" projects similar listings mein show nahi
 * hone chahiye — user ko koi aisa project recommend karne ka koi matlab
 * nahi jo ab bik hi nahi sakta.
 *
 * 🔧 FIX #3 (this update): the previous exact-string filter
 * `project_status: { $ne: "Sold Out" }` only catches a PERFECT
 * case/whitespace match. Real documents come from multiple entry
 * paths (auto-synced off-plan feed vs. manually created "Ready"
 * listings), so the same status can end up stored as "Sold Out",
 * "sold out", "SOLD OUT", or with stray whitespace (" Sold Out ").
 * Any of those variants would silently slip past a strict $ne and
 * still show up as sold-out cards in the carousel — which matches
 * exactly what was seen in production (Ellington DT1, Mon Reve,
 * Fairmont all still rendering despite the earlier fix).
 *
 * NOT_SOLD_OUT_FILTER below uses a case-insensitive regex that
 * matches "sold out" with any spacing/casing and excludes it via
 * $not, so this is robust regardless of how the value was entered.
 *
 * If listings STILL show up after this change, the backend
 * process almost certainly wasn't restarted after the file was
 * saved (nodemon/pm2 needs a restart to pick up controller
 * changes) — that's the other common cause of "the fix is in the
 * file but doesn't seem to apply".
 */
const NOT_SOLD_OUT_FILTER = {
  project_status: { $not: /^\s*sold\s*out\s*$/i },
};

export const getSimilarListings = async (req, res) => {
  try {
    const { community, city, excludeId, limit } = req.query;

    const resultLimit = Math.min(Number(limit) || 3, 12);

    if (!community && !city) {
      return res.status(200).json({
        success: true,
        message: "No location provided",
        listings: [],
      });
    }

    // Base filter — exclude current property (only if excludeId is a valid
    // ObjectId) AND always exclude Sold Out projects (case/whitespace
    // insensitive) from recommendations.
    const baseFilter = {
      ...NOT_SOLD_OUT_FILTER,
    };
    if (excludeId && mongoose.Types.ObjectId.isValid(excludeId)) {
      baseFilter._id = { $ne: excludeId };
    }

    let listings = [];

    // Step 1: try matching by community/district (more precise)
    if (community) {
      const communityRegex = new RegExp(`^${community.trim()}$`, "i");

      listings = await Listing.find({
        ...baseFilter,
        "district_data.name": communityRegex,
      })
        .sort({ createdAt: -1 })
        .limit(resultLimit)
        .lean();
    }

    // Step 2: agar community se kam results mile, city se fill karo
    if (listings.length < resultLimit && city) {
      const remaining = resultLimit - listings.length;
      const alreadyFetchedIds = listings.map((l) => l._id);
      const cityRegex = new RegExp(`^${city.trim()}$`, "i");

      const cityListings = await Listing.find({
        ...baseFilter,
        _id: { $nin: alreadyFetchedIds },
        $or: [
          { "city_data.name": cityRegex },
          { project_city: cityRegex },
        ],
      })
        .sort({ createdAt: -1 })
        .limit(remaining)
        .lean();

      listings = [...listings, ...cityListings];
    }

    return res.status(200).json({
      success: true,
      count: listings.length,
      listings,
    });
  } catch (error) {
    console.error("Error fetching similar listings:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch similar listings",
    });
  }
};