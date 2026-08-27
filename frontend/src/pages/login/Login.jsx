import React, { useState } from "react";

import "./Login.css";

// Inline eye / eye-off icon — zero icon-library dependency
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

// Decorative "rising sun over horizon" signature mark — shared with the Create Account page
const RiseMark = () => (
  <svg className="rise-mark" width="120" height="46" viewBox="0 0 120 46" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="riseGradLogin" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="var(--gold-1)" />
        <stop offset="100%" stopColor="var(--gold-2)" />
      </linearGradient>
    </defs>
    <path d="M4 34 A56 56 0 0 1 116 34" stroke="url(#riseGradLogin)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="60" cy="34" r="9" fill="url(#riseGradLogin)" opacity="0.9" />
    <line x1="4" y1="40" x2="116" y2="40" stroke="var(--border-soft)" strokeWidth="1" />
  </svg>
);

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) {
      next.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.password) {
      next.password = "Enter your password.";
    }
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitting(true);
      // Simulate an auth call — swap for real login logic
      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
        console.log("Login payload:", form);
      }, 700);
    }
  };

  return (
    <div className="rr-page">
      <div className="rr-card">
        <RiseMark />
        <p className="rr-eyebrow">Season 2 &middot; Rise &amp; Rebuild</p>
        <h1 className="rr-title">Welcome Back</h1>
        <p className="rr-subtitle">Login to your Season&nbsp;2 account.</p>

        {submitted ? (
          <div className="rr-success" role="status">
            <p className="rr-success-title">You're signed in.</p>
            <p className="rr-success-copy">
              Welcome back to Season 2 of Rise &amp; Rebuild.
            </p>
          </div>
        ) : (
          <form className="rr-form" onSubmit={handleSubmit} noValidate>
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
                autoComplete="email"
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
                  autoComplete="current-password"
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

            <div className="rr-forgot-row">
              <a href="#forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="rr-submit" disabled={submitting}>
              {submitting ? (
                <span className="rr-spinner" aria-hidden="true" />
              ) : (
                "Login"
              )}
            </button>

            <p className="rr-footer">
              Don&apos;t have an account? <a href="#register">Register</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
