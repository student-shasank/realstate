import Contact from "../models/Contact.js";


export const createContact = async (req, res) => {
  try {
    const { name, phone, email, enquiry, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required.",
      });
    }

    // Save to MongoDB first, so we never lose an enquiry even if email fails
    const contact = await Contact.create({
      name,
      phone,
      email,
      enquiry,
      message,
    });

    // Attempt to send the email notification to admin
    try {
      await contactMail({ name, phone, email, enquiry, message });
      contact.emailStatus = "sent";
    } catch (mailErr) {
      console.error("Email send failed:", mailErr.message);
      contact.emailStatus = "failed";
    }

    await contact.save();

    return res.status(201).json({
      message: "Your message has been sent successfully!",
      data: contact,
    });
  } catch (error) {
    console.error("Contact form error:", error.message);
    return res.status(500).json({
      message: "Something went wrong while sending your message.",
    });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json({ data: contacts });
  } catch (error) {
    console.error("Fetch contacts error:", error.message);
    return res.status(500).json({
      message: "Something went wrong while fetching enquiries.",
    });
  }
};