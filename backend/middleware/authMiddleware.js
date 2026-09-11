import  jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // No authorization header
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token required",
      });
    }

    // Expected format:
    // Bearer eyJhbGciOiJIUzI1NiIs...
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET
);

if (!decoded.leadId) {
  return res.status(401).json({
    success: false,
    message: "Invalid registration token.",
  });
}

req.leadId = decoded.leadId;

next();

  } catch (error) {
    console.error("JWT Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;