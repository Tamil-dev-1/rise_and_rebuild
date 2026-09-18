import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        // =====================================================
        // 1. Check logged-in user
        // =====================================================
        const authToken = sessionStorage.getItem("authToken");

        if (authToken) {
          try {
            const response = await fetch(
              "http://localhost:5000/api/auth/me",
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              }
            );

            const data = await response.json();

            if (response.ok && data.success) {
              // Logged-in user is allowed
              sessionStorage.setItem(
                "user",
                JSON.stringify(data.user)
              );

              setAllowed(true);
              return;
            }

            // Invalid auth token
            sessionStorage.removeItem("authToken");
            sessionStorage.removeItem("user");
          } catch (error) {
            console.error("Auth check error:", error);
          }
        }

        // =====================================================
        // 2. Check newly registered user
        // =====================================================
        const registrationToken =
          sessionStorage.getItem("registrationToken");

        const leadId = sessionStorage.getItem("leadId");

        if (registrationToken && leadId) {
          // Newly registered user is allowed
          setAllowed(true);
          return;
        }

        // =====================================================
        // 3. No authentication / registration
        // =====================================================
        setAllowed(false);

      } catch (error) {
        console.error("ProtectRoute Error:", error);
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, []);

  // =====================================================
  // While checking access
  // =====================================================
  if (loading) {
    return <div>Checking account...</div>;
  }

  // =====================================================
  // User is not registered or logged in
  // =====================================================
  if (!allowed) {
    return <Navigate to="/register" replace />;
  }

  // =====================================================
  // User is allowed
  // =====================================================
  return children;
};

export default ProtectRoute;