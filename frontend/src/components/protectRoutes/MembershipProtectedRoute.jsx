
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const MembershipProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkMembership = async () => {
      try {
        const token = sessionStorage.getItem("authToken");

        // 1. User is not logged in
        if (!token) {
          setLoading(false);
          return;
        }

        // 2. Get latest user information from backend
        const response = await fetch(
          "http://localhost:5000/api/auth/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        // 3. Token invalid or expired
        if (!response.ok || !data.success) {
          sessionStorage.removeItem("authToken");
          sessionStorage.removeItem("user");

          setLoading(false);
          return;
        }

        // 4. Save latest user information
        setUser(data.user);

        sessionStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      } catch (error) {
        console.error("Membership Protection Error:", error);

        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("user");

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkMembership();
  }, []);

  // While checking backend
  if (loading) {
    return <div>Checking membership...</div>;
  }

  // 5. User is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 6. Account is not active
  if (user.accountStatus !== "ACTIVE") {
    return <Navigate to="/login" replace />;
  }

  // 7. Get membership status
  const membershipStatus = user.membership?.status;

  // 8. User has not selected a membership
  if (!membershipStatus || membershipStatus === "NONE") {
    return <Navigate to="/membership" replace />;
  }

  // 9. User selected a plan but payment is not completed
  if (membershipStatus === "PENDING") {
    return <Navigate to="/payment" replace />;
  }

  // 10. Membership has expired
  if (membershipStatus === "EXPIRED") {
    return <Navigate to="/payment" replace />;
  }

  // 11. Membership was cancelled
  if (membershipStatus === "CANCELLED") {
    return <Navigate to="/membership" replace />;
  }

  // 12. Only ACTIVE membership can access dashboard
  if (membershipStatus === "ACTIVE") {
    return children;
  }

  // 13. Safety fallback
  return <Navigate to="/membership" replace />;
};

export default MembershipProtectedRoute;

