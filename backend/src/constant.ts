import { CorsOptions } from "cors";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
// WHITELIST
export const whitelist = ["http://localhost:3000"];

// CORS
export const corsOptions: CorsOptions = {
  origin: true,
  credentials: true,
};

export const port = process.env.PORT || 4000;

export const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const bddUrl = process.env.DATABASE_URL;

export const secret = process.env.SESSION_SECRET || "session_secret_not_found";

export const jwtToken = process.env.JWT_SECRET || "jwt_secret_not_found";

export const storage = multer.diskStorage({
  destination: "./src/uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
export const upload = multer({ storage: storage }).fields([
  { name: "files", maxCount: 4 },
  { name: "pp", maxCount: 1 },
  { name: "images", maxCount: 4 },
  { name: "model3D", maxCount: 4 },
]);
