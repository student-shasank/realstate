import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
// Yahan apni us file ka path dena jahan Cloudinary config likha hai
import cloudinary from "../config/cloudinary.js"; 

// 1. Cloudinary Storage Engine Setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "communities", // Cloudinary dashboard mein is naam ka folder auto-create ho jayega
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    public_id: (req, file) => {
      // Image ka naam: img-timestamp-filename
      const fileName = file.originalname.split(".")[0].replace(/\s+/g, "-");
      return `img-${Date.now()}-${fileName}`;
    },
  },
});

// 2. File Filter (Sirf Images allow karne ke liye)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// 3. Final Multer Instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
limits: { fileSize: 10 * 1024 * 1024 }, // Max 5MB per image
});

export default upload;