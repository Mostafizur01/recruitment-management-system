import express from "express";
import {
  getAllCVs,
  updateCV,
  getCandidateCv,
} from "../controllers/cvController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = express.Router();

router.get("/", verifyToken, verifyRole(["Admin", "Recruiter"]), getAllCVs);
router.get("/:candidateId", verifyToken, getCandidateCv);
router.put("/update/:candidateId", verifyToken, updateCV);

export default router;
