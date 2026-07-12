import express from "express";
import { login, register, getMe } from "../controllers/log&ragController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  loginValidation,
  registerValidation,
} from "../validators/authValidators.js";

const router = express.Router();

router.post("/register", registerValidation, validateRequest, register);
router.post("/login", loginValidation, validateRequest, login);
router.get("/me", verifyToken, getMe);

export default router;
