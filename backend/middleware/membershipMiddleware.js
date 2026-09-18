import User from "../models/User.js";

const membershipMiddleware = (allowedPlans = []) => {
  return async (req, res, next) => {
    try {
      // 1. userAuthMiddleware should run before this middleware
      if (!req.userId) {
        return res.status(401).json({
          success: false,
          message: "User authentication required.",
        });
      }

      // 2. Find the logged-in user
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      // 3. Check account status
      if (user.accountStatus !== "ACTIVE") {
        return res.status(403).json({
          success: false,
          message: "Your account is not active.",
        });
      }

      // 4. Check membership status
      const membershipStatus = user.membership?.status;

      if (membershipStatus !== "ACTIVE") {
        return res.status(403).json({
          success: false,
          message: "Active membership is required.",
          membershipStatus,
        });
      }

      // 5. Get user's current plan
      const planId = user.membership?.planId;

      if (!planId) {
        return res.status(403).json({
          success: false,
          message: "Membership plan not found.",
        });
      }

      // 6. Check whether the user's plan is allowed
      if (!allowedPlans.includes(planId)) {
        return res.status(403).json({
          success: false,
          message: "Your membership plan does not have access to this feature.",
        });
      }

      // 7. Store membership information for the controller
      req.membership = user.membership;

      // 8. Permission granted
      next();

    } catch (error) {
      console.error("Membership Middleware Error:", error);

      return res.status(500).json({
        success: false,
        message: "Server error while checking membership permission.",
      });
    }
  };
};

export default membershipMiddleware;