import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";

import mongoDB from "./config/db.js";
import attributeRoutes from "./routes/attributeRoutes.js";
import cvRoutes from "./routes/cvRoutes.js";
import logRegRoutes from "./routes/log&ragRoutes.js";
import positionRoutes from "./routes/positionRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const port = process.env.PORT || 3000;

mongoDB();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_RENDER,
  "http://localhost:5173",
  "https://recruitment-management-system-1-id3s.onrender.com",
].filter(Boolean);

const corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

if (allowedOrigins.length > 0) {
  corsOptions.origin = (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("CORS policy does not allow this origin."));
  };
} else {
  corsOptions.origin = true;
}

app.use(cors(corsOptions));

app.use("/logReg", logRegRoutes);
app.use("/position", positionRoutes);
app.use("/positions", positionRoutes);
app.use("/cvs", cvRoutes);
app.use("/attribute", attributeRoutes);
app.use("/dashboard", dashboardRouter);
app.use("/applications", applicationRoutes);
app.use("/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server run at http://localhost:${port}`);
});
