import express from "express";
import {
  getUserProfile,
  getAllUser,
  updateUserPhoto,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = express.Router();

router.get("/me", verifyToken, getUserProfile);
router.put("/:userId/photo", verifyToken, updateUserPhoto);
router.get("/", verifyToken, verifyRole(["admin", "recruiter"]), getAllUser);

export default router;
