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
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://recruitment-management-system-1-id3s.onrender.com",
  "https://recruitment-management-system-0wtk.onrender.com",
].filter(Boolean);

mongoDB();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

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
