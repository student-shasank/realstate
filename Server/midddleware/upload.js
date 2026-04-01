import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "seller-images";
    let resource_type = "image";

    if (file.mimetype.startsWith("video/")) {
      folder = "seller-videos";
      resource_type = "video";
    }

    const fileName = file.originalname
      .split(".")[0]
      .replace(/\s+/g, "-");

    return {
      folder,
      resource_type,
      public_id: `file-${Date.now()}-${fileName}`,
    };
  },
});

// ✅ Improved filter (mimetype + extension check)
const fileFilter = (req, file, cb) => {
  console.log("Incoming file type:", file.mimetype);

  const allowedMime = ["image/", "video/"];
  const allowedExt = [".jpg", ".jpeg", ".png", ".mp4", ".mkv"];

  const ext = file.originalname
    .toLowerCase()
    .slice(file.originalname.lastIndexOf("."));

  const isValidMime = allowedMime.some(type =>
    file.mimetype.startsWith(type)
  );

  const isValidExt = allowedExt.includes(ext);

  if (isValidMime && isValidExt) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type: ${file.mimetype}`), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});

export default upload;