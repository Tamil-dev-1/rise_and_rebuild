import express from "express";
import { registerUser, loginUser, forgotPassword,
    resetPassword,changeMembershipPlan,getCurrentUser,
 } from "../controllers/authController.js"
import authMiddleware from "../middleware/authMiddleware.js";
import userAuthMiddleware from "../middleware/userAuthMiddleware.js"

const router = express.Router();

// Register
router.post("/register", authMiddleware, registerUser);

// Login
router.post("/login", loginUser);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPassword);

// Change membership plan
router.put(
  "/membership",
  userAuthMiddleware,
  changeMembershipPlan
);

router.get(
  "/me",
  userAuthMiddleware,
  getCurrentUser
);

export default router;