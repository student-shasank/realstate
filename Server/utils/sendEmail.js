import nodemailer from "nodemailer";

export const sendEmailWithPdf = async (to, pdfBuffer) => {
  try {  
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: "gazickkishan@gmail.com",      // MUST be a Gmail account
        pass: "Kishan@1234",   // App Password, NOT normal password
      },
    });

    await transporter.verify(); // checks connection

    await transporter.sendMail({
      from: `"Listings" <yourgmail@gmail.com>`, // MUST match auth user
      to,
      subject: "Property Listing PDF",
      text: "Please find attached property details.",
      attachments: [
        {
          filename: "listing.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    console.log("Email sent successfully!");
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    throw new Error("Failed to send email");
  }
};



