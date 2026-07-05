import express from "express";
import {
  getAllCVs,
  updateCV,
  getCandidateCv,
} from "../controllers/cvController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = express.Router();

router.get("/:candidateId", verifyToken, getCandidateCv);
router.put("/:candidateId", verifyToken, updateCV);
router.get("/", verifyToken, verifyRole(["Admin", "Recruiter"]), getAllCVs);

export default router;
