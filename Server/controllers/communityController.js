import Community from "../models/Community.js";

/**
 * @desc    Fetch limited community data for navigation/dropdown
 * @route   GET /api/communities/navigation
 */
export const getCommunityNavigation = async (req, res) => {
  try {
    // ✅ Yahan "overview" add kar diya hai taaki image aur connectivity mil sake
    const communities = await Community.find(
      { status: "published" }, 
      "title slug overview marketSupply" 
    );

    res.status(200).json({
      success: true,
      count: communities.length,
      data: communities
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Resource fetch failed", 
      error: error.message 
    });
  }
};

/**
 * @desc    Fetch full community details by unique slug
 * @route   GET /api/communities/profile/:slug
 */
export const getCommunityPublicProfile = async (req, res) => {
  try {
    const community = await Community.findOne({ 
      slug: req.params.slug, 
      status: "published" 
    });
    
    if (!community) {
      return res.status(404).json({ success: false, message: "Community profile not found" });
    }

    res.status(200).json({ success: true, data: community });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};