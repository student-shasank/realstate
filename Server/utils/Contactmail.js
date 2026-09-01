import nodemailer from "nodemailer";

/**
 * Sends the "New Contact Enquiry" email to the admin.
 * Same pattern as sendEnquiryEmail (Gmail service transporter, SMTP_USER/SMTP_PASS).
 * @param {Object} data - { name, phone, email, enquiry, message }
 */
export const contactMail = async ({ name, phone, email, enquiry, message }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const html = `
  <div style="font-family: Arial, sans-serif; line-height:1.5;">

  <h2>New Contact Enquiry — Yupland</h2>

  <h3>Enquirer Details</h3>
  <p><b>Name:</b> ${name || "-"}</p>
  <p><b>Email:</b> ${email || "-"}</p>
  <p><b>Phone:</b> ${phone || "-"}</p>
  <p><b>Enquiry Type:</b> ${enquiry || "General"}</p>

  <hr/>

  <h3>Message</h3>
  <p>${message || "-"}</p>

  <hr/>
  <p style="font-size:12px;color:gray;">
  Sent automatically from website contact form
  </p>

  </div>
  `;

  await transporter.sendMail({
    from: `"Yupland Website" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: email || undefined, // reply seedha enquirer ko jaaye
    subject: `New Enquiry from ${name || "Website Visitor"} - Yupland`,
    html,
  });
};