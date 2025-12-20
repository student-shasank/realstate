import PDFDocument from "pdfkit";

export const generateListingPdf = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 40,
      });

      const buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      // =========================
      // 📄 PDF CONTENT (NO IMAGE)
      // =========================

      doc.fontSize(22).text(data.title, {
        align: "center",
        underline: true,
      });

      doc.moveDown(2);

      doc.fontSize(14);
      doc.text(`Price: ${data.price}`);
      doc.moveDown(0.5);

      doc.text(`Location: ${data.location || "N/A"}`);
      doc.moveDown(0.5);

      doc.text(`Bedrooms: ${data.bedrooms}`);
      doc.moveDown(0.5);

      doc.text(`Bathrooms: ${data.bathrooms}`);
      doc.moveDown(0.5);

      doc.text(`Area: ${data.area} sqft`);

      doc.moveDown(2);

      doc
        .fontSize(10)
        .fillColor("gray")
        .text("This PDF is generated automatically.", {
          align: "center",
        });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
