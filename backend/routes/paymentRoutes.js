
import express from "express";

import {
  createPaymentOrder,
} from "../controllers/paymentController.js";

import userAuthMiddleware from "../middleware/userAuthMiddleware.js";

const router = express.Router();

router.post(
  "/create-order",
  userAuthMiddleware,
  createPaymentOrder
);

export default router;

