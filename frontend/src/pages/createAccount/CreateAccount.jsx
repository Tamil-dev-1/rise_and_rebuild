
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./CreateAccount.css";

// Eye / Eye-off icon
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

// Rise & Rebuild decorative mark
const RiseMark = () => (
  <svg
    className="ca-rise-mark"
    width="120"
    height="46"
    viewBox="0 0 120 46"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient
        id="ca-rise-gradient"
        x1="0"
        y1="0"
        x2="1"
        y2="0"
      >
        <stop offset="0%" stopColor="var(--ca-gold-1)" />
        <stop offset="100%" stopColor="var(--ca-gold-2)" />
      </linearGradient>
    </defs>

    <path
      d="M4 34 A56 56 0 0 1 116 34"
      stroke="url(#ca-rise-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
    />

    <circle
      cx="60"
      cy="34"
      r="9"
      fill="url(#ca-rise-gradient)"
      opacity="0.9"
    />

    <line
      x1="4"
      y1="40"
      x2="116"
      y2="40"
      stroke="var(--ca-border-soft)"
      strokeWidth="1"
    />
  </svg>
);

export default function CreateAccount() {
  const location = useLocation();
  const navigate = useNavigate();

  // Selected membership plan coming from Membership page
  const selectedPlan = location.state;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    setServerError("");
  };

  // Validate form
  const validate = () => {
    const next = {};

    if (!form.fullName.trim()) {
      next.fullName = "Enter your full name.";
    }

    if (!form.email.trim()) {
      next.email = "Enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      next.email = "Enter a valid email address.";
    }

    if (!form.password) {
      next.password = "Create a password.";
    } else if (form.password.length < 8) {
      next.password =
        "Password must be at least 8 characters.";
    }

    if (!form.confirmPassword) {
      next.confirmPassword = "Confirm your password.";
    } else if (
      form.confirmPassword !== form.password
    ) {
      next.confirmPassword = "Passwords don't match.";
    }

    if (!form.agree) {
      next.agree =
        "You must agree to the Terms & Conditions.";
    }

    return next;
  };

  // Submit Create Account form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const next = validate();

    setErrors(next);

    if (Object.keys(next).length !== 0) {
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      // JWT token created during lead registration
      const token = sessionStorage.getItem("registrationToken");

      if (!token) {
        setServerError(
          "Registration session expired. Please register again."
        );
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            fullName: form.fullName,
            email: form.email,
            password: form.password,
            planId: selectedPlan?.planId,

          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setServerError(
          data.message || "Unable to create account."
        );
        return;
      }

      // Account successfully created
      setSubmitted(true);

      console.log("Account created:", data);

      // Redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Create Account Error:", error);

      setServerError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ca-page">
      <div className="ca-card">

        {/* Decorative Rise & Rebuild mark */}
        <RiseMark />

        {/* Eyebrow */}
        <p className="ca-eyebrow">
          Season 2 · Rise & Rebuild
        </p>

        {/* Title */}
        <h1 className="ca-title">
          Create Your Account
        </h1>

        {/* Subtitle */}
        <p className="ca-subtitle">
          Create an account to continue with your Season 2
          membership.
        </p>

        {/* ============================= */}
        {/* SELECTED MEMBERSHIP PLAN */}
        {/* ============================= */}

        {selectedPlan && (
          <div className="selected-plan">
            <p className="selected-plan-label">
              Selected Plan
            </p>

            <h3 className="selected-plan-name">
              {selectedPlan.planName}
            </h3>

            <div className="selected-plan-price">
              <strong>
                ₹{selectedPlan.price}
              </strong>

              <span>
                {selectedPlan.period}
              </span>
            </div>
          </div>
        )}

        {/* ============================= */}
        {/* SUCCESS MESSAGE */}
        {/* ============================= */}

        {submitted ? (
          <div
            className="ca-success"
            role="status"
          >
            <p className="ca-success-title">
              You're in.
            </p>

            <p className="ca-success-copy">
              Your account has been created.
              Welcome to Season 2 of Rise & Rebuild.
            </p>
          </div>
        ) : (
          <form
            className="ca-form"
            onSubmit={handleSubmit}
            noValidate
          >

            {/* ============================= */}
            {/* FULL NAME */}
            {/* ============================= */}

            <div className="ca-field">
              <label htmlFor="ca-fullName">
                Full Name
              </label>

              <input
                id="ca-fullName"
                name="fullName"
                type="text"
                placeholder="Name"
                value={form.fullName}
                onChange={handleChange}
                className={`ca-input ${errors.fullName
                  ? "ca-invalid"
                  : ""
                  }`}
              />

              {errors.fullName && (
                <span className="ca-error">
                  {errors.fullName}
                </span>
              )}
            </div>

            {/* ============================= */}
            {/* EMAIL */}
            {/* ============================= */}

            <div className="ca-field">
              <label htmlFor="ca-email">
                Email Address
              </label>

              <input
                id="ca-email"
                name="email"
                type="email"
                placeholder="user@gmail.com"
                value={form.email}
                onChange={handleChange}
                className={`ca-input ${errors.email
                  ? "ca-invalid"
                  : ""
                  }`}
              />

              {errors.email && (
                <span className="ca-error">
                  {errors.email}
                </span>
              )}
            </div>

            {/* ============================= */}
            {/* PASSWORD */}
            {/* ============================= */}

            <div className="ca-field">
              <label htmlFor="ca-password">
                Password
              </label>

              <div className="ca-input-group">
                <input
                  id="ca-password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="••••••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className={`ca-input ${errors.password
                    ? "ca-invalid"
                    : ""
                    }`}
                />

                <button
                  type="button"
                  className="ca-toggle"
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
                <span className="ca-error">
                  {errors.password}
                </span>
              )}
            </div>

            {/* ============================= */}
            {/* CONFIRM PASSWORD */}
            {/* ============================= */}

            <div className="ca-field">
              <label htmlFor="ca-confirmPassword">
                Confirm Password
              </label>

              <div className="ca-input-group">
                <input
                  id="ca-confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirm
                      ? "text"
                      : "password"
                  }
                  placeholder="••••••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`ca-input ${errors.confirmPassword
                    ? "ca-invalid"
                    : ""
                    }`}
                />

                <button
                  type="button"
                  className="ca-toggle"
                  onClick={() =>
                    setShowConfirm(
                      (prev) => !prev
                    )
                  }
                  aria-label={
                    showConfirm
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  <EyeIcon
                    off={showConfirm}
                  />
                </button>
              </div>

              {errors.confirmPassword && (
                <span className="ca-error">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            {/* ============================= */}
            {/* TERMS & CONDITIONS */}
            {/* ============================= */}

            <div
              className={`ca-checkbox-row ${errors.agree
                ? "ca-checkbox-invalid"
                : ""
                }`}
            >
              <input
                id="ca-agree"
                name="agree"
                type="checkbox"
                checked={form.agree}
                onChange={handleChange}
              />

              <label htmlFor="ca-agree">
                I agree to the{" "}
                <a href="#terms">
                  Terms & Conditions
                </a>
              </label>
            </div>

            {errors.agree && (
              <span className="ca-error">
                {errors.agree}
              </span>
            )}

            {/* ============================= */}
            {/* SERVER ERROR */}
            {/* ============================= */}

            {serverError && (
              <div className="ca-server-error">
                {serverError}
              </div>
            )}

            {/* ============================= */}
            {/* SUBMIT BUTTON */}
            {/* ============================= */}

            <button
              type="submit"
              className="ca-submit"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

            {/* ============================= */}
            {/* LOGIN LINK */}
            {/* ============================= */}

            <p className="ca-footer">
              Already have an account?{" "}

              <Link
                to="/login"
                className="ca-login-link"
              >
                Login
              </Link>
            </p>

          </form>
        )}
      </div>
    </div>
  );
}

