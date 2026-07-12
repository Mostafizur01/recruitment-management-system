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

const corsOptions = {
  origin:
    process.env.FRONTEND_URL ||
    "https://recruitment-management-system-eight.vercel.app" ||
    process.env.FRONTEND_URL_LOCAL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  Credentials: true,
};

app.use(cors(corsOptions));

mongoDB();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
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
