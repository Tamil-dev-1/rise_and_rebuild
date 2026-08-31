import express from "express";
import { registerUser, loginUser, forgotPassword,
    resetPassword,
 } from "../controllers/authController.js"
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

// Register
router.post("/register", authMiddleware, registerUser);

// Login
router.post("/login", loginUser);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPassword);

export default router;