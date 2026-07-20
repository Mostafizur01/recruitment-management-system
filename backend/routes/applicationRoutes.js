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
  verifyRole(["admin", "recruiter", "leader", "candidate"]),
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
  verifyRole(["admin", "recruiter", "leader"]),
  updateApplication,
);
router.delete(
  "/:id",
  verifyToken,
  verifyRole(["admin", "recruiter", "leader"]),
  deleteApplication,
);

export default router;
