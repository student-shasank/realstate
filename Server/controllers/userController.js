import Listing from "../models/Listing.js";

export const dashboard = async (req, res) => {
  try {
    const listings = await Listing.find(); // get all listings

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

