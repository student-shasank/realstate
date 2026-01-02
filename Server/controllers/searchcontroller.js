import Listing from "../models/Listing.js";

export const searchListings = async (req, res) => {
  try {
    const {
      location,
      beds,
      baths,
      min_price,
      max_price,
      property_type,
      completion,
      limit = 20,
    } = req.query;

    const query = {};

    // ✅ LOCATION (Dubai default)
    query["location.city"] = {
      $regex: location?.trim() || "Dubai",
      $options: "i",
    };

    // ✅ BEDROOMS (>=)
    if (beds) {
      query.bedrooms = { $gte: Number(beds) };
    }

    // ✅ BATHROOMS (>=)
    if (baths) {
      query.bathrooms = { $gte: Number(baths) };
    }

    // ✅ PROPERTY TYPE (map correctly)
    if (property_type && property_type !== "All") {
      query.type = property_type;
    }

    // ✅ COMPLETION STATUS
    if (completion && completion !== "All") {
      query.completionStatus = completion;
    }

    // ✅ PRICE RANGE
    if (min_price || max_price) {
      query.price = {};
      if (min_price) query.price.$gte = Number(min_price);
      if (max_price) query.price.$lte = Number(max_price);
    }

    const listings = await Listing.find(query)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: listings.length,
      filtersApplied: query,
      data: listings,
    });

  } catch (error) {
    console.error("SEARCH ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
