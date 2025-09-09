import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "leads", 
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// Multer middleware
const upload = multer({ storage });

export default upload;
