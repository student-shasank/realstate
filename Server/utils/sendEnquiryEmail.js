import nodemailer from "nodemailer";

export const sendEnquiryEmail = async ({
  listing,
  to,
  enquirer,
  requestType,
}) => {

  console.log(
    "EMAIL RAW DATA:",
    JSON.stringify(listing, null, 2)
  );

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

  const agent = listing?.sales_executives?.[0] || {};

  const requestLabel =
    requestType === "brochure"
      ? "Brochure Download Request"
      : requestType === "availability"
      ? "Check Availability Request"
      : "General Enquiry";

  const formatPrice = (price) => {
    if (
      price === null ||
      price === undefined ||
      price === "" ||
      Number(price) === 0
    ) {
      return "On Request";
    }

    return Number(price).toLocaleString();
  };

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">

      <h2>New Listing Enquiry — ${requestLabel}</h2>

      <h3>Enquirer Details</h3>

      <p><b>Name:</b> ${enquirer?.name || "-"}</p>

      <p><b>Email:</b> ${enquirer?.email || "-"}</p>

      <p><b>Phone:</b> ${enquirer?.phone || "-"}</p>

      <hr/>

      <h3>Listing Details</h3>

      <p><b>MongoDB ID:</b> ${listing?._id || "-"}</p>

      <p><b>External Listing ID:</b> ${listing?.id ?? "-"}</p>

      <p><b>Title:</b> ${listing?.title || "-"}</p>

      <p>
        <b>Property Type:</b>
        ${
          Array.isArray(listing?.property_types)
            ? listing.property_types.join(", ")
            : listing?.types || "-"
        }
      </p>

      <p>
        <b>Status:</b>
        ${listing?.status || listing?.project_status || "-"}
      </p>

      <p>
        <b>Price Range:</b>
        ${formatPrice(listing?.price_start)}
        -
        ${formatPrice(listing?.price_end)}
        ${listing?.currency || ""}
      </p>

      <p>
        <b>Location:</b>
        ${
          listing?.location ||
          listing?.project_location ||
          "-"
        }
      </p>

      <p>
        <b>City:</b>
        ${
          listing?.project_city ||
          listing?.city_data?.name ||
          "-"
        }
      </p>

      <p>
        <b>Expected Completion:</b>
        ${listing?.expected_completion_date || "-"}
      </p>

      <hr/>

      <h3>Developer Details</h3>

      <p>
        <b>Developer:</b>
        ${listing?.developer_name || "-"}
      </p>

      <p>
        <b>Developer Email:</b>
        ${listing?.developer_email || "-"}
      </p>

      <p>
        <b>Developer Phone:</b>
        ${listing?.developer_phone || "-"}
      </p>

      <p>
        <b>Developer Website:</b>
        ${listing?.developer_website || "-"}
      </p>

      <hr/>

      <h3>Sales Agent Details</h3>

      <p><b>Agent Name:</b> ${agent?.name || "-"}</p>

      <p><b>Agent Email:</b> ${agent?.email || "-"}</p>

      <p><b>Agent Phone:</b> ${agent?.phone || "-"}</p>

      <p><b>Agent Role:</b> ${agent?.role || "-"}</p>

      <p><b>Languages:</b> ${agent?.languages || "-"}</p>

      <hr/>

      <p style="font-size: 12px; color: gray;">
        Sent automatically from the website enquiry system.
      </p>

    </div>
  `;

  await transporter.sendMail({
    from: `"Real Estate CRM" <${process.env.SMTP_USER}>`,
    to,

    replyTo: enquirer?.email || undefined,

    subject: `${requestLabel} — ${
      listing?.title || "Listing"
    }`,

    html,
  });
};