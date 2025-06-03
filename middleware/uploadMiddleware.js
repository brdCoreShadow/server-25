const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");

const pathToEnv = path.join(__dirname, "..", "config", ".env");
dotenv.config({ path: pathToEnv });


cloudinary.config({
  cloud_name: process.env.CLDNRY_CLOUD_NAME,
  api_key: process.env.CLDNRY_API_KEY,
  api_secret: process.env.CLDNRY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "extensions",
  allowedFormats: ["jpg", "png", "svg"],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadCloud = multer({ storage });
module.exports = uploadCloud;