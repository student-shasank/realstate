import multer from "multer";
import path from "path";
import fs from "fs";

// 1. Storage setup: images kahan aur kis naam se save hongi
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/communities";
    // Agar folder nahi hai toh bana do
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Unique name: timestamp + random number + original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

// 2. Filter: Sirf images allow karne ke liye
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// 3. Export Multer instance
export default multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Max 5MB
});