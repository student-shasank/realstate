import Listing from "../models/Listing.js";
import { generateListingPdf } from "../utils/generatePdf.js";
import { sendEmailWithPdf } from "../utils/sendEmail.js";
import fs  from "fs"

export const sendListingPdf = async (req, res) => {
  try {
    const { listingId, email } = req.body;

    if (!listingId || !email) {
      return res.status(400).json({ message: "listingId & email required" });
    }

    const listing = await Listing.findById(listingId).lean();

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const pdfData = {
      title: listing.title,
      price: `${listing.currency} ${listing.price}`,
      location: listing.location?.community,
      bedrooms: listing.bedrooms,
      bathrooms: listing.bathrooms,
      area: listing.builtUpArea,
      images: listing.images || [] // 👈 Cloudinary URLs
    };

    const pdfBuffer = await generateListingPdf(pdfData);
    fs.writeFileSync("temporary.pdf",pdfBuffer)
    // await sendEmailWithPdf(email, pdfBuffer);

    res.json({ success: true, message: "PDF sent successfully" });

  } catch (error) {
    console.error("SEND LISTING PDF ERROR:", error);
    res.status(500).json({ message: "Failed to send PDF" });
  }
};
