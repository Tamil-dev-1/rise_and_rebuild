import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get logged-in user
  const storedUser = sessionStorage.getItem("user");

  // If user information doesn't exist
  if (!storedUser) {
    navigate("/login");
    return null;
  }

  const user = JSON.parse(storedUser);

  // Existing membership from logged-in user's session
  const membership = user.membership;

  // Newly selected plan from Membership page
  const selectedPlan = location.state;

  // Use newly selected plan if available.
  // Otherwise use the user's existing membership.
  const paymentPlan = selectedPlan || membership;

  // If membership information doesn't exist
  if (!paymentPlan) {
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
              {paymentPlan.planName}
            </h2>
          </div>

          <div className="payment-price">

            <strong>
              ₹{paymentPlan.price}
            </strong>

            <span>
              {paymentPlan.period}
            </span>

          </div>

        </div>

        {/* Membership Status */}
        <div className="payment-status">

          <span>
            Membership Status
          </span>

          <strong>
            {paymentPlan?.status || "PENDING"}
          </strong>

        </div>

        {/* Payment Button */}
        <button
          type="button"
          className="payment-button"
          onClick={() => {
            console.log("Payment Plan:", paymentPlan);

            // Razorpay integration will be added here later
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