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
  verifyRole(["admin", "recruiter", "leader"]),
  createPositionValidation,
  validateRequest,
  createPosition,
);
router.put(
  "/:id",
  verifyToken,
  verifyRole(["admin", "recruiter", "leader"]),
  updatePositionValidation,
  validateRequest,
  updatePosition,
);
router.delete(
  "/:id",
  verifyToken,
  verifyRole(["admin", "recruiter", "leader"]),
  deletePosition,
);

export default router;
