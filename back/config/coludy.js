import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import dotenv from "dotenv";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDY_NAME,
  api_key: process.env.CLOUDY_API_KEY,
  api_secret: process.env.CLOUDY_API_KEY_SECRET
})
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'uploads',
      allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});
export const upload = multer({ storage });