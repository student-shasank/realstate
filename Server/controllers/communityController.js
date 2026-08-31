import Community from "../models/Community.js";

/**
 * @desc    Fetch limited community data for navigation/dropdown
 * @route   GET /api/communities/navigation
 */
// export const getCommunityNavigation = async (req, res) => {
//   try {
//     // 1. Params nikaalna (Default: page 1, limit 9)
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 9;
//     const skip = (page - 1) * limit;

//     // 2. Database query with Skip and Limit
//     const communities = await Community.find(
//       { status: "published" }, 
//       "title slug overview marketSupply" 
//     )
//     .sort({ createdAt: -1 }) // Nayi communities pehle dikhane ke liye
//     .skip(skip)
//     .limit(limit);

//     // 3. Total count nikalna pagination check ke liye
//     const totalPublished = await Community.countDocuments({ status: "published" });

//     // 4. Check karna ki kya aur data bacha hai
//     const hasMore = skip + communities.length < totalPublished;

//     res.status(200).json({
//       success: true,
//       count: communities.length,
//       total: totalPublished,
//       hasMore: hasMore, // Frontend isi se decide karega scroll karna hai ya nahi
//       data: communities
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       message: "Resource fetch failed", 
//       error: error.message 
//     });
//   }
// };
export const getCommunityNavigation = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;
    const search = req.query.search?.trim() || "";

    const filter = { status: "published" };
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const communities = await Community.find(
      filter,
      "title slug city overview marketSupply"   // ✅ city add kiya
    )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPublished = await Community.countDocuments(filter);
    const totalPages = Math.max(1, Math.ceil(totalPublished / limit));

    res.status(200).json({
      success: true,
      count: communities.length,
      total: totalPublished,
      totalPages,
      currentPage: page,
      data: communities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Resource fetch failed",
      error: error.message,
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