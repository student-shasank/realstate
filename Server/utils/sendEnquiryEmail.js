import nodemailer from "nodemailer";

export const sendEnquiryEmail = async ({ listing, to }) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const internal = listing?.internal || {};

  const html = `
  <div style="font-family: Arial, sans-serif; line-height:1.5;">
  
  <h2>New Listing Enquiry</h2>

  <h3>Listing Details</h3>
  <p><b>Title:</b> ${listing?.title || "-"}</p>
  <p><b>Price:</b> ${listing?.price || "-"} ${listing?.currency || ""}</p>

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
    subject: `New Enquiry for ${listing?.title}`,
    html,
  });
};