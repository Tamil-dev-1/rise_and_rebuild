
import User from "../models/User.js";

export const createPaymentOrder = async (req, res) => {
  try {
    // Logged-in user's ID comes from userAuthMiddleware
    const userId = req.userId;

    // 1. Check user authentication
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required.",
      });
    }

    // 2. Find the logged-in user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // 3. Check whether user has selected a membership plan
    if (!user.membership?.planId) {
      return res.status(400).json({
        success: false,
        message: "No membership plan selected.",
      });
    }

    // 4. Check membership status
    if (user.membership.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "Membership is not pending payment.",
      });
    }

    // 5. Get membership information
    const membership = user.membership;

    // TEMPORARY TEST RESPONSE
    // Razorpay order creation will be added later.
    return res.status(200).json({
      success: true,
      message: "Payment details prepared successfully.",
      payment: {
        userId: user._id,
        planId: membership.planId,
        planName: membership.planName,
        price: membership.price,
        period: membership.period,
        status: membership.status,
      },
    });
  } catch (error) {
    console.error("Create Payment Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while preparing payment.",
    });
  }
};

