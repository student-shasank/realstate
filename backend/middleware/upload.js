import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js"; 

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // 1. Determine Folder Name based on fieldname
    let folderName = "properties/misc"; // Default folder
    let resourceType = "image"; // Default type

    // Logic for different fields
    if (file.fieldname === "images") {
      folderName = "properties/gallery";
    } else if (file.fieldname === "videos") {
      folderName = "properties/videos";
      resourceType = "video"; // Video ke liye yeh zaruri hai
    } else if (file.fieldname === "agentProfile") {
      folderName = "agents/profiles";
    } else if (file.fieldname === "floorPlanImage") {
      folderName = "properties/floorplans";
    } else if (file.fieldname.startsWith("heroImage") || file.fieldname === "overviewImage") {
      folderName = "communities/assets"; // Community specific folder
    }

    const fileName = file.originalname.split(".")[0].replace(/\s+/g, "-");

    return {
      folder: folderName,
      resource_type: resourceType,
      allowed_formats: ["jpg", "png", "jpeg", "webp", "mp4"], // MP4 add kiya
      public_id: `file-${Date.now()}-${fileName}`,
    };
  },
});

const fileFilter = (req, file, cb) => {
  // Image aur Video dono allow karein
  if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { 
    fileSize: 50 * 1024 * 1024 // 50MB limit (Video ke liye thoda bada rakha hai)
  }, 
});

export default upload;