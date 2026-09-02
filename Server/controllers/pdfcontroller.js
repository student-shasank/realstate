import Listing from "../models/Listing.js";
import { sendOfferLinkEmail } from "../utils/sendOfferLinkEmail.js";

export const sendListingPdf = async (req, res) => {
try {
const { listingId, email } = req.body;


// =========================
// VALIDATION
// =========================

if (!listingId || !email) {
  return res.status(400).json({
    success: false,
    message: "listingId and email are required",
  });
}

// =========================
// FIND LISTING
// =========================

const listing = await Listing.findById(listingId).lean();

if (!listing) {
  return res.status(404).json({
    success: false,
    message: "Listing not found",
  });
}

// =========================
// CHECK OFFER LINK
// =========================

if (!listing.offer_link) {
  return res.status(404).json({
    success: false,
    message: "Offer link not available for this listing",
  });
}

// =========================
// SEND OFFER EMAIL
// =========================

await sendOfferLinkEmail({
  to: email,
  title: listing.title,
  offerLink: listing.offer_link,
});

return res.status(200).json({
  success: true,
  message: "Offer link sent successfully",
});


} catch (error) {
console.error("SEND LISTING OFFER ERROR:", error);


return res.status(500).json({
  success: false,
  message: "Failed to send offer link",
});


}
};
