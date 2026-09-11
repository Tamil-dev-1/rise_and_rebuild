
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
      } finally {
        setLoading(false);
      }
    };

    checkMembership();
  }, []);

  // While checking the backend
  if (loading) {
    return <div>Checking membership...</div>;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Account is not active
  if (user.accountStatus !== "ACTIVE") {
    return <Navigate to="/login" replace />;
  }

  // Membership is not active
  if (user.membership?.status !== "ACTIVE") {
    return <Navigate to="/payment" replace />;
  }

  // User is logged in and membership is active
  return children;
};

export default MembershipProtectedRoute;

