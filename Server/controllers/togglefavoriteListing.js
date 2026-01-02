import User from "../models/User.js";

export const toggleFavoriteListing = async (req, res) => {
  try {
    const user = req.user; // already attached by middleware
    const { listingId } = req.body;

    if (!listingId) {
      return res.status(400).json({ message: "Listing ID is required" });
    }

    const alreadyFavorite = user.favorites.some(
      (id) => id.toString() === listingId
    );

    if (alreadyFavorite) {
      // remove from favorites
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== listingId
      );
    } else {
      // add to favorites
      user.favorites.push(listingId);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: alreadyFavorite
        ? "Removed from favorites"
        : "Added to favorites",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Favorite error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
