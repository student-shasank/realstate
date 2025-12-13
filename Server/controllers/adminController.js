import Listing from "../models/Listing.js";
import cloudinary from "../config/cloudinary.js";




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



// Create Listing with Cloudinary Upload


export const createListing = async (req, res) => {
  try {
    const imageUrls = [];

    // 1️⃣ Upload PHYSICAL FILES (form-data)
    if (req.files && req.files.length > 0) {
      const uploads = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "listings" },
            (err, result) => {
              if (err) return reject(err);
              resolve(result.secure_url);
            }
          ).end(file.buffer);
        });
      });

      const uploadedFiles = await Promise.all(uploads);
      imageUrls.push(...uploadedFiles);
    }

    // 2️⃣ Accept IMAGE URLs from req.body (JSON)
    if (req.body.images) {
      let urls = [];

      if (typeof req.body.images === "string") {
        // If it's a single value, convert to array
        urls = [req.body.images];
      } else {
        urls = req.body.images;
      }

      imageUrls.push(...urls);
    }

    // 3️⃣ Create Listing
    const listing = await Listing.create({
      ...req.body,
      images: imageUrls,
    });

    return res.json({
      success: true,
      message: "Listing created successfully",
      listing,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
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


