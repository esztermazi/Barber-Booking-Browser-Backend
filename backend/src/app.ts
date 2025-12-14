import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { auth } from "./middleware/auth.js";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

import barbersRoute from "./routes/barbers.js";
import bookingsRoute from "./routes/bookings.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

const swaggerDocument = YAML.load(
  path.join(__dirname, "../swagger/openapi.yaml")
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(auth);
app.use("/barbers", barbersRoute);
app.use("/bookings", bookingsRoute);

app.get("/", (_req, res) => {
  res.json({ message: "BBB Backend API is running" });
});

export default app;
