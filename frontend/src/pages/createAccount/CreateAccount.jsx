import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateAccount.css";

// Simple inline eye / eye-off icons so the component has zero icon-library dependency
const EyeIcon = ({ off }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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

// Decorative "rising sun over horizon" signature mark — ties back to "RISE & REBUILD"
const RiseMark = () => (
  <svg className="rise-mark" width="120" height="46" viewBox="0 0 120 46" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="riseGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="var(--gold-1)" />
        <stop offset="100%" stopColor="var(--gold-2)" />
      </linearGradient>
    </defs>
    <path d="M4 34 A56 56 0 0 1 116 34" stroke="url(#riseGrad)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="60" cy="34" r="9" fill="url(#riseGrad)" opacity="0.9" />
    <line x1="4" y1="40" x2="116" y2="40" stroke="var(--border-soft)" strokeWidth="1" />
  </svg>
);

export default function CreateAccount() {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Enter your full name.";
    if (!form.email.trim()) {
      next.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.password) {
      next.password = "Create a password.";
    } else if (form.password.length < 8) {
      next.password = "Password must be at least 8 characters.";
    }
    if (!form.confirmPassword) {
      next.confirmPassword = "Confirm your password.";
    } else if (form.confirmPassword !== form.password) {
      next.confirmPassword = "Passwords don't match.";
    }
    if (!form.agree) next.agree = "You must agree to the Terms & Conditions.";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
      // Hook up real account-creation logic here
      console.log("Account payload:", form);
    }
  };

  return (
    <div className="rr-page">
      <div className="rr-card">
        <RiseMark />
        <p className="rr-eyebrow">Season 2 &middot; Rise &amp; Rebuild</p>
        <h1 className="rr-title">Create Your Account</h1>
        <p className="rr-subtitle">
          Create an account to continue with your Season&nbsp;2 membership.
        </p>

        {submitted ? (
          <div className="rr-success" role="status">
            <p className="rr-success-title">You're in.</p>
            <p className="rr-success-copy">
              Your account has been created. Welcome to Season 2 of Rise &amp; Rebuild.
            </p>
          </div>
        ) : (
          <form className="rr-form" onSubmit={handleSubmit} noValidate>
            <div className="rr-field">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Name"
                value={form.fullName}
                onChange={handleChange}
                className={`rr-input ${errors.fullName ? "is-invalid" : ""}`}
              />
              {errors.fullName && <span className="rr-error">{errors.fullName}</span>}
            </div>

            <div className="rr-field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="user@gmail.com"
                value={form.email}
                onChange={handleChange}
                className={`rr-input ${errors.email ? "is-invalid" : ""}`}
              />
              {errors.email && <span className="rr-error">{errors.email}</span>}
            </div>

            <div className="rr-field">
              <label htmlFor="password">Password</label>
              <div className="rr-input-group">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className={`rr-input ${errors.password ? "is-invalid" : ""}`}
                />
                <button
                  type="button"
                  className="rr-toggle-visibility"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon off={showPassword} />
                </button>
              </div>
              {errors.password && <span className="rr-error">{errors.password}</span>}
            </div>

            <div className="rr-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="rr-input-group">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`rr-input ${errors.confirmPassword ? "is-invalid" : ""}`}
                />
                <button
                  type="button"
                  className="rr-toggle-visibility"
                  onClick={() => setShowConfirm((s) => !s)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  <EyeIcon off={showConfirm} />
                </button>
              </div>
              {errors.confirmPassword && <span className="rr-error">{errors.confirmPassword}</span>}
            </div>

            <div className={`rr-checkbox-row ${errors.agree ? "is-invalid" : ""}`}>
              <input
                id="agree"
                name="agree"
                type="checkbox"
                checked={form.agree}
                onChange={handleChange}
              />
              <label htmlFor="agree">
                I agree to the <a href="#terms">Terms &amp; Conditions</a>
              </label>
            </div>
            {errors.agree && <span className="rr-error rr-error-checkbox">{errors.agree}</span>}

            <button type="submit" className="rr-submit">
              Create Account
            </button>

            <p className="rr-footer">
              Already have an account? <a href="#login">Login</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
