import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes";
import { corsOptions, port } from "./constant";
import path from "path";
import compression from "compression";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// INIT
dotenv.config();
const app = express();

// JSON FORMAT
app.use(express.json());

// MIDDLEWARE
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan("combined"));
app.use(compression());
app.use(cors(corsOptions));

// STATIC ASSETS
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// BACKEND'S HOME
app.get("/", (_, res) => {
  res.send("Hello, World!");
});

// ROUTES
app.use("/api", router);

// START THE SERVER
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
