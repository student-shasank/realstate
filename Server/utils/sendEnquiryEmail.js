import nodemailer from "nodemailer";

export const sendEnquiryEmail = async ({ listing, to, enquirer, requestType }) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const internal = listing?.internal || {};

  const requestLabel =
    requestType === "brochure"
      ? "Brochure Download Request"
      : requestType === "availability"
      ? "Check Availability Request"
      : "General Enquiry";

  const html = `
  <div style="font-family: Arial, sans-serif; line-height:1.5;">
  
  <h2>New Listing Enquiry — ${requestLabel}</h2>

  <h3>Enquirer Details</h3>
  <p><b>Name:</b> ${enquirer?.name || "-"}</p>
  <p><b>Email:</b> ${enquirer?.email || "-"}</p>
  <p><b>Phone:</b> ${enquirer?.phone || "-"}</p>

  <hr/>

  <h3>Listing Details</h3>
  <p><b>Title:</b> ${listing?.title || "-"}</p>
  <p><b>Price Range:</b> ${
    listing?.min_price ? Number(listing.min_price).toLocaleString() : "-"
  } - ${
    listing?.max_price ? Number(listing.max_price).toLocaleString() : "-"
  } ${listing?.currency || ""}</p>
  <p><b>Location:</b> ${listing?.location || "-"}</p>
  <p><b>Developer:</b> ${listing?.developer_name || "-"}</p>

  <hr/>

  <h3>Internal Details</h3>
  <p><b>Internal Listing ID:</b> ${internal?.internalListingId || "-"}</p>
  <p><b>Brokerage:</b> ${internal?.sourceBrokerageName || "-"}</p>
  <p><b>Agent Name:</b> ${internal?.listingAgentName || "-"}</p>
  <p><b>Agent Phone:</b> ${internal?.listingAgentPhone || "-"}</p>
  <p><b>Agent Email:</b> ${internal?.listingAgentEmail || "-"}</p>
  <p><b>Source Type:</b> ${internal?.listingSourceType || "-"}</p>

  <hr/>
  <p style="font-size:12px;color:gray;">
  Sent automatically from website enquiry system
  </p>

  </div>
  `;

  await transporter.sendMail({
    from: `"Real Estate CRM" <${process.env.SMTP_USER}>`,
    to: to,
    replyTo: enquirer?.email || undefined, // reply seedha enquirer ko jaaye
    subject: `${requestLabel} — ${listing?.title || "Listing"}`,
    html,
  });
};