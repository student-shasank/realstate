import Listing from "../models/Listing.js";
import cloudinary from "../config/cloudinary.js";
import { geocodeAddress } from "../utils/geocode.js";
import Community from "../models/Community.js";




export const dashboard = async (req, res) => {
  try {
    // Fetch all listings from the database
    const listings = await Listing.find();

    // Send listings along with admin info
    res.json({ 
      message: "Admin Dashboard Access", 
      admin: req.user,
      listings 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const createListing = async (req, res) => {
  try {
    const imageUrls = [];

    // ✅ Images (multer-storage-cloudinary already uploads)
    if (req.files?.length) {
      imageUrls.push(...req.files.map((file) => file.path));
    }

    // ✅ Parse features (comma separated string -> array)
    const featuresArr =
      typeof req.body.features === "string" && req.body.features.trim()
        ? req.body.features.split(",").map((x) => x.trim()).filter(Boolean)
        : [];

    // ✅ Parse installmentPlan (JSON string -> array)
    let installmentPlanArr = [];
    if (req.body.installmentPlan) {
      try {
        installmentPlanArr = JSON.parse(req.body.installmentPlan);
      } catch (e) {
        installmentPlanArr = [];
      }
    }

    // ✅ Location (flat)
    const locationText = (req.body.location || "").toLowerCase().trim();
    const city = (req.body.city || "").toLowerCase().trim();
    const country = (req.body.country || "").toLowerCase().trim();

    if (!locationText || !city || !country) {
      return res.status(400).json({
        success: false,
        error: "Location, city and country are required",
      });
    }

    const { lat, lng } = await geocodeAddress({
      location: locationText,
      city,
      country,
    });

    // ✅ Map flat fields -> schema nested objects
    const listingPayload = {
      // Property details
      title: req.body.title,
      referenceNo: req.body.referenceNo,
      price: req.body.price ? Number(req.body.price) : undefined,
       isFeatured:
    req.body.isFeatured === "true" || req.body.isFeatured === true,
      currency: req.body.currency || "AED",
      
      type: req.body.type,
      purpose: req.body.purpose,
     completionStatus: req.body.completionStatus || "Pending",
      addedOn: req.body.addedOn ? new Date(req.body.addedOn) : undefined,

      // Specs
      bedrooms: req.body.bedrooms ? Number(req.body.bedrooms) : undefined,
      bathrooms: req.body.bathrooms ? Number(req.body.bathrooms) : undefined,
      builtUpArea: req.body.builtUpArea ? Number(req.body.builtUpArea) : undefined,
      plotArea: req.body.plotArea ? Number(req.body.plotArea) : undefined,
      furnishing: req.body.furnishing,

      // Arrays
      features: featuresArr,
      images: imageUrls,

      // ✅ Agent (nested)
      // agent: req.body.agentName
      //   ? {
      //       name: req.body.agentName,
      //       agency: req.body.agency,
      //       phone: req.body.phone,
      //       whatsapp: req.body.whatsapp,
      //       isResponsiveBroker:
      //         req.body.isResponsiveBroker === "true" ||
      //         req.body.isResponsiveBroker === true,
      //     }
      //   : undefined,

      // ✅ Internal (nested)
      internal: req.body.internalListingId
        ? {
            internalListingId: req.body.internalListingId,
            sourceBrokerageName: req.body.sourceBrokerageName,
            listingAgentName: req.body.listingAgentName,
            listingAgentPhone: req.body.listingAgentPhone,
            listingAgentEmail: req.body.listingAgentEmail,
            listingSourceType: req.body.listingSourceType || "Direct",
            listingValidUntil: req.body.listingValidUntil
              ? new Date(req.body.listingValidUntil)
              : undefined,
          }
        : undefined,

      // ✅ Validated info (nested)
      validatedInfo: {
        developer: req.body.developer,
        ownership: req.body.ownership,
        builtUpArea: req.body.validatedBuiltUpArea
          ? Number(req.body.validatedBuiltUpArea)
          : undefined,
        plotArea: req.body.validatedPlotArea
          ? Number(req.body.validatedPlotArea)
          : undefined,
        usage: req.body.usage,
      },

      // ✅ Project info (nested)
      projectInfo: {
        name: req.body.projectName,
        status: req.body.projectStatus,
        completion: req.body.projectCompletion,
        handoverDate: req.body.handoverDate,
        developer: req.body.projectDeveloper,
        lastInspected: req.body.lastInspected,
      },

      // ✅ Payment plan (nested)
      paymentPlan: {
        downPayment: req.body.downPayment ? Number(req.body.downPayment) : undefined,
        installmentPlan: installmentPlanArr,
      },

      // ✅ Location (nested)
      location: {
        location: locationText,
        city,
        country,
        coordinates: {
          type: "Point",
          coordinates: [lng, lat],
        },
      },
    };

    const listing = await Listing.create(listingPayload);

    return res.status(201).json({
      success: true,
      message: "Listing created successfully",
      listing,
    });
  } catch (error) {
    console.error("CREATE LISTING ERROR:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Server error",
    });
  }
};
// UPDATE LISTING STATUS
// -------------------------------------------------------
export const updateListingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate
    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Update listing
    const listing = await Listing.findByIdAndUpdate(
      id,
      { completionStatus: status },
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    return res.status(200).json(listing);

  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({
      message: "Server error while updating status",
    });
  }
};
// update featured listings status
export const updateListingFeatured = async (req, res) => {
  try {
    const { id } = req.params;
    const { isFeatured } = req.body;

    const listing = await Listing.findByIdAndUpdate(
      id,
      { isFeatured },
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: "Error updating featured" });
  }
};

// export const createListing = async (req, res) => {
//   try {
//     const { title, price, location, description } = req.body;

//     const listing = await Listing.create({
//       title,
//       price,
//       location,
//       description,
//     });

//     res.json({
//       message: "Listing created successfully",
//       listing
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Delete Listing
export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    await Listing.findByIdAndDelete(id);

    res.json({ message: "Listing deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const updateAvailability = async (req, res) => {
  const { id } = req.params;
  const { availability } = req.body;

  try {
    const listing = await Listing.findById(id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    listing.availability = availability;
    await listing.save();

    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: "Failed to update availability" });
  }
};



export const createCommunity = async (req, res) => {
  try {
    // 1. Frontend se bheja gaya JSON data parse karein
    const bodyData = JSON.parse(req.body.data);
    const files = req.files;

    // 2. Hero Images mapping
    // Multer-Cloudinary 'path' mein seedha URL deta hai (https://res.cloudinary.com/...)
    if (bodyData.hero && bodyData.hero.cards) {
      bodyData.hero.cards.forEach((card, idx) => {
        const fieldName = `heroImage_${idx}`;
        if (files[fieldName]) {
          // Yahan 'path' ka matlab ab Cloudinary URL hai
          card.image = files[fieldName][0].path; 
        }
      });
    }

    // 3. Overview Image mapping
    if (files["overviewImage"]) {
      bodyData.overview.image = files["overviewImage"][0].path;
    }

    // 4. Market Data Image mapping
    if (files["marketImage"]) {
      bodyData.marketSupply.image = files["marketImage"][0].path;
    }

    // 5. MongoDB mein Save karein
    const newCommunity = new Community(bodyData);
    const savedCommunity = await newCommunity.save();

    res.status(201).json({
      success: true,
      message: "Community page created successfully!",
      data: savedCommunity
    });

  } catch (error) {
    console.error("Community Creation Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating community",
      error: error.message
    });
  }
};