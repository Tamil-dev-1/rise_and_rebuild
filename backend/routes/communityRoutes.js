import express from "express";

import {
  getCommunityAccess,
} from "../controllers/communityController.js";

import userAuthMiddleware from "../middleware/userAuthMiddleware.js";
import membershipMiddleware from "../middleware/membershipMiddleware.js";

import MEMBERSHIP_PERMISSIONS from "../data/membershipPermissions.js";

const router = express.Router();

router.get(
  "/access",
  userAuthMiddleware,
  membershipMiddleware(
    MEMBERSHIP_PERMISSIONS.community
  ),
  getCommunityAccess
);

export default router;