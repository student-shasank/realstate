import Listing from "../models/Listing.js";

export const getDevelopers = async (req, res) => {
  try {
    const developers = await Listing.aggregate([
      {
        $project: {
          developer: {
            $trim: {
              input: {
                $ifNull: ["$developer", ""],
              },
            },
          },
        },
      },
      {
        $match: {
          developer: { $ne: "" },
        },
      },
      {
        $group: {
          _id: { $toLower: "$developer" }, // duplicate remove
          name: { $first: "$developer" },  // original name
        },
      },
      {
        $project: {
          _id: 0,
          name: {
            $concat: [
              { $toUpper: { $substrCP: ["$name", 0, 1] } },
              {
                $substrCP: [
                  "$name",
                  1,
                  { $subtract: [{ $strLenCP: "$name" }, 1] },
                ],
              },
            ],
          },
        },
      },
      {
        $sort: { name: 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      developers,
    });
  } catch (error) {
    console.error("GET DEVELOPERS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch developers",
    });
  }
};