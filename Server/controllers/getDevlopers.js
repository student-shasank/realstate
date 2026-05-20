import Listing from "../models/Listing.js";

export const getDevelopers = async (req, res) => {
  try {
    const developers = await Listing.aggregate([
      {
        $project: {
          developer_name: {
            $trim: {
              input: {
                $ifNull: ["$developer_name", ""],
              },
            },
          },
          developer_image: 1,
        },
      },
      {
        $match: {
          developer_name: { $ne: "" },
        },
      },
      {
        $group: {
          _id: { $toLower: "$developer_name" },
          name: { $first: "$developer_name" },
          image: { $first: "$developer_image" },
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
          image: 1,
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