import React, { useState } from "react";
import "./ForgotPwd.css";
import { Link } from 'react-router-dom';

/**
 * ForgotPassword
 *
 * Two states:
 *  A. "form"  - email input, user requests a reset link
 *  B. "sent"  - confirmation screen after a successful API response
 *
 * Wire up `onSubmit` (or edit the fetch call below) to point at your
 * real password-reset endpoint.
 */
export default function ForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("form"); // "form" | "sent"
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      // Always show the same confirmation state whether or not the
      // account exists — this avoids leaking which emails are registered.
      if (response.ok) {
        setStatus("sent");
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Unable to reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-page">
      <div className="fp-card">
        <div className="fp-brandmark" aria-hidden="true">
          <svg viewBox="0 0 120 60" className="fp-brandmark-svg">
            <path d="M20 46 C20 20, 40 10, 40 10" />
            <path d="M100 46 C100 20, 80 10, 80 10" />
            <line x1="40" y1="46" x2="80" y2="46" />
            <circle cx="60" cy="46" r="8" />
          </svg>
        </div>
        <p className="fp-eyebrow">Season 2 &middot; Rise &amp; Rebuild</p>

        {status === "form" ? (
          <>
            <h1 className="fp-title">Forgot Your Password?</h1>
            <p className="fp-subtitle">
              Enter your email address and we&rsquo;ll send you a password
              reset link.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="fp-field mb-3">
                <label htmlFor="fp-email" className="fp-label form-label">
                  Email Address
                </label>
                <input
                  id="fp-email"
                  type="email"
                  className={`form-control fp-input${error ? " fp-input-error" : ""
                    }`}
                  placeholder="user@gmail.com"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  autoComplete="email"
                  disabled={loading}
                />
                {error && (
                  <div className="fp-error" role="alert">
                    {error}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn fp-submit-btn w-100"
                disabled={loading}
              >
                {loading ? (
                  <span className="fp-btn-loading">
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Sending&hellip;
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            <div className="fp-back-wrap">
              <a
                href="/login"
                className="fp-back-link"
                onClick={(ev) => {
                  if (onBackToLogin) {
                    ev.preventDefault();
                    onBackToLogin();
                  }
                }}
              >
                &larr; Back to Login
              </a>
            </div>
          </>
        ) : (
          <div className="fp-sent">
            <div className="fp-sent-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="32" height="32">
                <path
                  d="M2 6.5C2 5.12 3.12 4 4.5 4h15C20.88 4 22 5.12 22 6.5v11c0 1.38-1.12 2.5-2.5 2.5h-15A2.5 2.5 0 0 1 2 17.5v-11Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M3 6.5 12 13l9-6.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="fp-title fp-title-sm">Check Your Email</h1>
            <p className="fp-subtitle">
              If an account exists with <strong>{email}</strong>, a password
              reset link has been sent.
            </p>
            <p className="fp-subtitle fp-subtitle-muted">
              Please check your inbox and spam folder.
            </p>

            <button
              type="button"
              className="btn fp-submit-btn w-100"
              onClick={() => {
                if (onBackToLogin) onBackToLogin();
              }}
            >
              <Link to="/login">Back to Login</Link>
            </button>
          </div>
        )}

        <p className="fp-footer-note">
          Don&rsquo;t have an account? <Link to="/create-account">Create account</Link>
        </p>
      </div>
    </div>
  );
}
