import jwt from "jsonwebtoken";

const userAuthMiddleware = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token required",
      });
    }

    // Expected:
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
//    console.log("USER TOKEN DECODED:", decoded);
    // Login token must contain userId
    if (!decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid user token.",
      });
    }

    // Store user ID in request
    req.userId = decoded.userId;

    // Store role too
    req.userRole = decoded.role;

    next();

  } catch (error) {
    console.error("User JWT Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired user token",
    });
  }
};

export default userAuthMiddleware;