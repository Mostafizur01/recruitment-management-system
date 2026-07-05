import express from "express";
import {
  createAttribute,
  getAttribute,
} from "../controllers/attributeController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = express.Router();

router.get("/", getAttribute);
router.post(
  "/",
  verifyToken,
  verifyRole(["Admin", "Recruiter"]),
  createAttribute,
);

export default router;
