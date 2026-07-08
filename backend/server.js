// all the libary
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// all the  router
import mongoDB from "./config/db.js";
import attributeRoutes from "./routes/attributeRoutes.js";
import cvRoutes from "./routes/cvRoutes.js";
import logRegRoutes from "./routes/log&ragRoutes.js";
import positionRoutes from "./routes/positionRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
mongoDB();

app.use(express.json());
app.use(cors());

app.use("/logReg", logRegRoutes);
app.use("/position", positionRoutes);
app.use("/cvs", cvRoutes);
app.use("/attribute", attributeRoutes);
app.use("/dashboard", dashboardRouter);
app.use("/applications", applicationRoutes);

app.listen(port, () => {
  console.log(`Server run at http://localhost:${port}`);
});
