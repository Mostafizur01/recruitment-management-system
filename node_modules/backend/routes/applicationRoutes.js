import express from "express";
import {
  getAllApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { createApplicationValidation } from "../validators/applicationValidators.js";

const router = express.Router();

router.get(
  "/",
  verifyToken,
  verifyRole(["Admin", "Recruiter", "Leader", "Candidate"]),
  getAllApplications,
);
router.post(
  "/apply/:positionId",
  verifyToken,
  createApplicationValidation,
  validateRequest,
  createApplication,
);
router.put(
  "/:id",
  verifyToken,
  verifyRole(["Admin", "Recruiter", "Leader"]),
  updateApplication,
);
router.delete(
  "/:id",
  verifyToken,
  verifyRole(["Admin", "Recruiter", "Leader"]),
  deleteApplication,
);

export default router;
