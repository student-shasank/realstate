import Listing from "../models/Listing.js";
import Community from "../models/Community.js";

import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const dashboard = async (req, res) => {
  try {
    const listings = await Listing.find()
      .populate("community")
      .select("-internal")
      .sort({
        isFeatured: -1,   //  featured first
        createdAt: -1     // latest after that
      });

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
        .populate("community")
        .sort({  isFeatured: -1,updatedAt: -1 })
         .select("-internal")           
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

    const listing = await Listing.findById(id)
     .populate("community") 
    .select("-internal");
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



export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 👉 Update name
    if (name) user.name = name;

    // 👉 Update email
    if (email) user.email = email;

    // 👉 Update password (hashed)
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};