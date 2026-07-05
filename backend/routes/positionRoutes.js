import express from "express";
import {
  createPositon,
  allPosition,
  updatePosition,
  deletePosition,
} from "../controllers/positionController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = express.Router();

router.get("/", allPosition);
router.post(
  "/",
  verifyToken,
  verifyRole(["Admin", "Recruiter"]),
  createPositon,
);
router.put(
  "/:id",
  verifyToken,
  verifyRole(["Admin", "Recruiter"]),
  updatePosition,
);
router.delete(
  "/:id",
  verifyToken,
  verifyRole(["Admin", "Recruiter"]),
  deletePosition,
);

export default router;
