import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { registerLead } from '../controllers/leadController.js'


const router = express.Router();

// Public route
router.post('/register', registerLead);

// protected route

router.get(
  "/membership",
  authMiddleware,
  (req, res) => {

    res.status(200).json({
      success: true,
      message: "Authorized membership access",
      leadId: req.leadId,
    });

  }
);

export default router;