import nodemailer from "nodemailer";

export const sendOfferLinkEmail = async ({
to,
title,
offerLink,
}) => {

// =====================================
// SMTP CONFIGURATION
// ONLY FOR OFFER LINK EMAIL
// =====================================

const transporter = nodemailer.createTransport({
host: "smtp.gmail.com",
port: 465,
secure: true,


auth: {
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
},

tls: {
  rejectUnauthorized: false,
},


});

// =====================================
// EMAIL TEMPLATE
// =====================================

const html = ` <div
   style="
     font-family: Arial, sans-serif;
     max-width: 600px;
     margin: 0 auto;
     padding: 20px;
     line-height: 1.6;
   "
 >


  <h2 style="color: #01155E;">
    Your Property Offer
  </h2>

  <p>Hello,</p>

  <p>
    Thank you for your interest in
    <strong>${title || "this property"}</strong>.
  </p>

  <p>
    You can view your property offer by clicking the button below.
  </p>

  <div style="margin: 30px 0;">
    <a
      href="${offerLink}"
      target="_blank"
      style="
        display: inline-block;
        background: #01155E;
        color: #ffffff;
        padding: 12px 25px;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
      "
    >
      View Offer
    </a>
  </div>

  <p>
    If the button doesn't work, use this link:
  </p>

  <p>
    <a
      href="${offerLink}"
      target="_blank"
    >
      ${offerLink}
    </a>
  </p>

  <hr/>

  <p
    style="
      color: #777;
      font-size: 12px;
    "
  >
    This email was sent automatically from our property enquiry system.
  </p>

</div>


`;

// =====================================
// SEND EMAIL
// =====================================

return transporter.sendMail({
from: `"Real Estate CRM" <${process.env.SMTP_USER}>`,
to,
subject: `Property Offer — ${title || "Listing"}`,
html,
});
};
