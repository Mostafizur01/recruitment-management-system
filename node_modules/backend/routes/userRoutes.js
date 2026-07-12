import express from "express";
import { getUserProfile, getAllUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = express.Router();

router.get("/me", verifyToken, getUserProfile);
router.get("/", verifyToken, verifyRole(["Admin", "Recruiter"]), getAllUser);

export default router;
