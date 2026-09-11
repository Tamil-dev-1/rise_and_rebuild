import React, { useState } from "react";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import "./login.css";

// ============================================================
// Inline eye / eye-off icon
// ============================================================

const EyeIcon = ({ off }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {off ? (
      <>
        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5.5 0-9.5-4-11-7 .9-1.6 2.3-3.4 4.2-4.9" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c5.5 0 9.5 4 11 7-.6 1.1-1.5 2.4-2.6 3.6" />
        <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    ) : (
      <>
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

// ============================================================
// Rise & Rebuild decorative mark
// ============================================================

const RiseMark = () => (
  <svg
    className="login-rise-mark"
    width="120"
    height="46"
    viewBox="0 0 120 46"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient
        id="login-rise-gradient"
        x1="0"
        y1="0"
        x2="1"
        y2="0"
      >
        <stop
          offset="0%"
          stopColor="var(--login-gold-1)"
        />

        <stop
          offset="100%"
          stopColor="var(--login-gold-2)"
        />
      </linearGradient>
    </defs>

    <path
      d="M4 34 A56 56 0 0 1 116 34"
      stroke="url(#login-rise-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
    />

    <circle
      cx="60"
      cy="34"
      r="9"
      fill="url(#login-rise-gradient)"
      opacity="0.9"
    />

    <line
      x1="4"
      y1="40"
      x2="116"
      y2="40"
      stroke="var(--login-border-soft)"
      strokeWidth="1"
    />
  </svg>
);

// ============================================================
// Login Form
// ============================================================

export default function LoginForm() {
  const navigate = useNavigate();

  // Get selected plan passed from Membership page
  const location = useLocation();

  const selectedPlan = location.state;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [errors, setErrors] = useState({});

  const [submitting, setSubmitting] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [serverError, setServerError] =
    useState("");

  // ============================================================
  // Handle input changes
  // ============================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    setServerError("");
  };

  // ============================================================
  // Frontend validation
  // ============================================================

  const validate = () => {
    const next = {};

    if (!form.email.trim()) {
      next.email = "Enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      next.email =
        "Enter a valid email address.";
    }

    if (!form.password) {
      next.password =
        "Enter your password.";
    }

    return next;
  };

  // ============================================================
  // Login submit
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    // Validate form
    const next = validate();

    setErrors(next);

    if (Object.keys(next).length !== 0) {
      return;
    }

    setSubmitting(true);

    try {
      // ========================================================
      // Login API
      // ========================================================

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      console.log(
        "Login API response:",
        data
      );

      // ========================================================
      // Backend returned an error
      // ========================================================

      if (!response.ok) {
        setServerError(
          data.message || "Login failed."
        );

        return;
      }

      // ========================================================
      // Login successful
      // ========================================================

      // Store login JWT
      sessionStorage.setItem(
        "authToken",
        data.token
      );

      // Store user information
      sessionStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Show success state
      setSubmitted(true);

      // ========================================================
      // IMPORTANT:
      //
      // If the user came from Membership page with
      // a selected plan, send them to Payment.
      //
      // Example:
      //
      // Membership
      //      ↓
      // Select Yearly
      //      ↓
      // Login
      //      ↓
      // Payment
      //
      // ========================================================

      if (selectedPlan) {
        console.log(
          "Selected plan after login:",
          selectedPlan
        );

        navigate("/payment", {
          state: selectedPlan,
        });

        return;
      }

      // ========================================================
      // Normal login flow
      //
      // If there is no selected plan, check membership status.
      // ========================================================

      const membershipStatus =
        data.user?.membership?.status;

      console.log(
        "Membership Status:",
        membershipStatus
      );

      // ========================================================
      // Active member → Dashboard
      // ========================================================

      if (
        membershipStatus === "ACTIVE"
      ) {
        navigate("/dashboard");
      }

      // ========================================================
      // Pending / no membership → Payment
      // ========================================================

      else {
        navigate("/payment");
      }
    } catch (error) {
      console.error(
        "Login Error:",
        error
      );

      setServerError(
        "Unable to connect to the server."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="login-page">

      <div className="login-card">

        <RiseMark />

        <p className="login-eyebrow">
          Season 2 · Rise &amp; Rebuild
        </p>

        <h1 className="login-title">
          Welcome Back
        </h1>

        <p className="login-subtitle">
          Login to your Season 2 account.
        </p>

        {submitted ? (
          <div
            className="login-success"
            role="status"
          >
            <p className="login-success-title">
              You're signed in.
            </p>

            <p className="login-success-copy">
              Welcome back to Season 2 of
              Rise &amp; Rebuild.
            </p>
          </div>
        ) : (
          <form
            className="login-form"
            onSubmit={handleSubmit}
            noValidate
          >

            {/* ==================================================
                Email
            ================================================== */}

            <div className="login-field">

              <label htmlFor="login-email">
                Email Address
              </label>

              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="user@gmail.com"
                value={form.email}
                onChange={handleChange}
                className={`login-input ${
                  errors.email
                    ? "login-invalid"
                    : ""
                }`}
                autoComplete="email"
              />

              {errors.email && (
                <span className="login-error">
                  {errors.email}
                </span>
              )}

            </div>

            {/* ==================================================
                Password
            ================================================== */}

            <div className="login-field">

              <label htmlFor="login-password">
                Password
              </label>

              <div className="login-input-group">

                <input
                  id="login-password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="••••••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className={`login-input ${
                    errors.password
                      ? "login-invalid"
                      : ""
                  }`}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="login-toggle"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  <EyeIcon
                    off={showPassword}
                  />
                </button>

              </div>

              {errors.password && (
                <span className="login-error">
                  {errors.password}
                </span>
              )}

              {serverError && (
                <div className="login-server-error">
                  {serverError}
                </div>
              )}

            </div>

            {/* ==================================================
                Forgot Password
            ================================================== */}

            <div className="login-forgot-row">

              <Link to="/forgot-password">
                Forgot Password?
              </Link>

            </div>

            {/* ==================================================
                Login Button
            ================================================== */}

            <button
              type="submit"
              className="login-submit"
              disabled={submitting}
            >

              {submitting ? (
                <span
                  className="login-spinner"
                  aria-hidden="true"
                />
              ) : (
                "Login"
              )}

            </button>

            {/* ==================================================
                Create Account
            ================================================== */}

            <p className="login-footer">

              Don't have an account?{" "}

              <Link
                to="/membership"
                className="login-create-link"
              >
                Create account
              </Link>

            </p>

          </form>
        )}

      </div>

    </div>
  );
}