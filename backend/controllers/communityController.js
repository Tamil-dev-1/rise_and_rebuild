export const getCommunityAccess = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Community access granted.",
      membership: {
        planId: req.membership.planId,
        planName: req.membership.planName,
      },
    });
  } catch (error) {
    console.error("Community Access Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while checking community access.",
    });
  }
};