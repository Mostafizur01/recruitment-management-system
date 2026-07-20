import express from "express";
import {
  createCV,
  getAllCVs,
  updateCV,
  getCandidateCv,
} from "../controllers/cvController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { updateCVValidation } from "../validators/cvValidators.js";

const router = express.Router();

// Get all CVs - Only Admin and Recruiter
router.get("/", verifyToken, verifyRole(["admin", "recruiter"]), getAllCVs);

// Create CV - Only Candidate
router.post("/create", verifyToken, verifyRole(["candidate"]), createCV);

// Get single CV - Candidate (owner), Admin, and Recruiter (view-only)
router.get("/:candidateId", verifyToken, getCandidateCv);

// Update CV - Admin Only
router.put(
  "/update/:candidateId",
  verifyToken,
  verifyRole(["admin"]),
  validateRequest,
  updateCV,
);

export default router;
