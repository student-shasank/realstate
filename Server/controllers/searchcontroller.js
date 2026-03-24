import Listing from "../models/Listing.js";

export const searchListings = async (req, res) => {
  try {
    const {
      beds,
      baths,
      min_price,
      max_price,
      property_type,
      propertyStatus,
      developer,
      purpose,
      emirates,
      handoverYear,
      limit = 20,
    } = req.query;

    const query = {};

    const emiratesArray = emirates
      ? emirates
          .split(",")
          .map((item) => item.trim().toLowerCase())
          .filter(Boolean)
      : [];

    if (emiratesArray.length > 0) {
      query.emirates = { $in: emiratesArray };
    }

    if (beds) {
      query.bedrooms = { $gte: Number(beds) };
    }

    if (baths) {
      query.bathrooms = { $gte: Number(baths) };
    }

    if (property_type && property_type !== "All") {
      query.type = property_type;
    }

    if (propertyStatus && propertyStatus !== "All") {
      query.propertyStatus = propertyStatus.trim().toLowerCase();
    }
if (developer) {
  const developersArray = developer
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  query.developer = {
    $in: developersArray,
  };
}

    if (purpose) {
      query.purpose = purpose.trim().toLowerCase();
    }

    if (min_price || max_price) {
      query.price = {};
      if (min_price) query.price.$gte = Number(min_price);
      if (max_price) query.price.$lte = Number(max_price);
    }

    // ✅ HANDOVER YEAR MULTI-SELECT + POST 2030
    if (handoverYear) {
      const handoverArray = handoverYear
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const exactYears = handoverArray.filter(
        (item) => item.toLowerCase() !== "post 2030"
      );

      const hasPost2030 = handoverArray.some(
        (item) => item.toLowerCase() === "post 2030"
      );

      const handoverConditions = [];

      if (exactYears.length > 0) {
        handoverConditions.push({
          "projectInfo.handoverDate": { $in: exactYears },
        });
      }

      if (hasPost2030) {
        handoverConditions.push({
          $expr: {
            $gt: [{ $toInt: "$projectInfo.handoverDate" }, 2030],
          },
        });
      }

      if (handoverConditions.length === 1) {
        Object.assign(query, handoverConditions[0]);
      } else if (handoverConditions.length > 1) {
        query.$or = handoverConditions;
      }
    }

    console.log("REQ QUERY:", req.query);
    console.log("MONGO QUERY:", JSON.stringify(query, null, 2));

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