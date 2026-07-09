import express from "express";
import {
  getAllCVs,
  updateCV,
  getCandidateCv,
} from "../controllers/cvController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { updateCVValidation } from "../validators/cvValidators.js";

const router = express.Router();

router.get(
  "/",
  verifyToken,
  verifyRole(["Admin", "Recruiter", "Leader"]),
  getAllCVs,
);
router.get("/:candidateId", verifyToken, getCandidateCv);
router.put(
  "/update/:candidateId",
  verifyToken,
  updateCVValidation,
  validateRequest,
  updateCV,
);

export default router;
