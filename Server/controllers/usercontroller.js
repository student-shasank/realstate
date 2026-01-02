import Listing from "../models/Listing.js";

export const dashboard = async (req, res) => {
  try {
    const listings = await Listing.find();

    res.status(200).json({
      success: true,
      user: req.user,
      total: listings.length,
      listings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard data",
      error: error.message,
    });
  }
};

export const getListings = async (req, res) => {
  try {
    // ✅ Use query param (BEST PRACTICE)
    const page = parseInt(req.query.page, 10) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    // ✅ SINGLE SOURCE OF TRUTH
    const matchQuery = {
      completionStatus: "Approved",
      // availability: "Available", // uncomment if needed
    };

    // ✅ Fetch + Count using SAME filters
    const [listings, total] = await Promise.all([
      Listing.find(matchQuery)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit),

      Listing.countDocuments(matchQuery),
    ]);

    res.status(200).json({
      success: true,
      page,
      perPage: limit,
      total,
      totalPages: Math.ceil(total / limit),
      listings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch listings",
      error: error.message,
    });
  }
};




export const getListingById = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
