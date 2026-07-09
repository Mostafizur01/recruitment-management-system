import express from "express";
import {
  createPosition,
  allPosition,
  getPositionById,
  updatePosition,
  deletePosition,
} from "../controllers/positionController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createPositionValidation,
  updatePositionValidation,
} from "../validators/positionValidators.js";

const router = express.Router();

router.get("/", allPosition);
router.get("/:id", getPositionById);
router.post(
  "/",
  verifyToken,
  verifyRole(["Admin", "Recruiter", "Leader"]),
  createPositionValidation,
  validateRequest,
  createPosition,
);
router.put(
  "/:id",
  verifyToken,
  verifyRole(["Admin", "Recruiter", "Leader"]),
  updatePositionValidation,
  validateRequest,
  updatePosition,
);
router.delete(
  "/:id",
  verifyToken,
  verifyRole(["Admin", "Recruiter", "Leader"]),
  deletePosition,
);

export default router;
