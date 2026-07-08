import express from "express";
import {
  getAllApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = express.Router();

router.get("/", getAllApplications);
router.post("/", verifyToken, createApplication);
router.put(
  "/:id",
  verifyToken,
  verifyRole(["Admin", "Recruiter"]),
  updateApplication,
);
router.delete(
  "/:id",
  verifyToken,
  verifyRole(["Admin", "Recruiter"]),
  deleteApplication,
);

export default router;
