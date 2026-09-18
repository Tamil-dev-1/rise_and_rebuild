import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

export default function Payment() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkUserMembership = async () => {
      try {
        const token = sessionStorage.getItem("authToken");

        // 1. User is not logged in
        if (!token) {
          navigate("/login", { replace: true });
          return;
        }

        // 2. Get latest user + membership from backend
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

        // 3. Invalid / expired token
        if (!response.ok || !data.success) {
          sessionStorage.removeItem("authToken");
          sessionStorage.removeItem("user");

          navigate("/login", { replace: true });
          return;
        }

        // 4. Save latest user information
        sessionStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        setUser(data.user);

        // 5. Check membership status
        const membershipStatus =
          data.user.membership?.status;

        // 6. Membership already active
        if (membershipStatus === "ACTIVE") {
          navigate("/dashboard", { replace: true });
          return;
        }

        // 7. No membership selected
        if (
          !membershipStatus ||
          membershipStatus === "NONE"
        ) {
          navigate("/membership", { replace: true });
          return;
        }

        // 8. EXPIRED membership
        if (membershipStatus === "EXPIRED") {
          // Renewal page will be added later.
          // For now, keep the user on Payment.
          setLoading(false);
          return;
        }

        // 9. PENDING membership
        // User should remain on Payment page.
        setLoading(false);
      } catch (error) {
        console.error("Payment Membership Check Error:", error);

        setError(
          "Unable to verify your membership. Please try again."
        );

        setLoading(false);
      }
    };

    checkUserMembership();
  }, [navigate]);

  // While checking backend
  if (loading) {
    return (
      <div className="payment-page">
        <div className="payment-card">
          <p>Checking your membership...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="payment-page">
        <div className="payment-card">
          <h2>Something went wrong</h2>

          <p>{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No user
  if (!user) {
    return null;
  }

  const membership = user.membership;

  // No membership
  if (!membership) {
    return (
      <div className="payment-page">
        <div className="payment-card">
          <h2>Membership Not Found</h2>

          <p>
            We couldn't find your membership details.
          </p>

          <button
            type="button"
            onClick={() => navigate("/membership")}
          >
            Choose Membership
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-card">

        {/* Eyebrow */}
        <p className="payment-eyebrow">
          RISE &amp; REBUILD · SEASON 2
        </p>

        {/* Heading */}
        <h1>
          Complete Your Membership
        </h1>

        <p className="payment-subtitle">
          You're one step away from starting
          your Season 2 journey.
        </p>

        {/* Selected Plan */}
        <div className="payment-plan">

          <div>
            <span className="payment-label">
              Selected Plan
            </span>

            <h2>
              {membership.planName}
            </h2>
          </div>

          <div className="payment-price">

            <strong>
              ₹{membership.price}
            </strong>

            <span>
              {membership.period}
            </span>

          </div>

        </div>

        {/* Membership Status */}
        <div className="payment-status">

          <span>
            Membership Status
          </span>

          <strong>
            {membership.status}
          </strong>

        </div>

        {/* Payment Button */}
        <button
          type="button"
          className="payment-button"
          onClick={() => {
            console.log(
              "Current Membership:",
              membership
            );

            // Razorpay integration will be added
            // after Phase 2, 3 and 4 are completed.
          }}
        >
          Proceed to Payment
        </button>

        {/* Change Plan */}
        <button
          type="button"
          className="payment-back"
          onClick={() => navigate("/membership")}
        >
          Change Plan
        </button>

      </div>
    </div>
  );
}