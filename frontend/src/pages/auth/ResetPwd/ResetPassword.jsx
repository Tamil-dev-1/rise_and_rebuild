import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ResetPwd.css";

/**
 * ResetPassword
 *
 * Single-state form: new password + confirm password, each with a
 * show/hide toggle, client-side validation, and a submit handler that
 * posts to a reset-password endpoint (token typically comes from the
 * URL query string, e.g. /reset-password?token=...).
 */
export default function ResetPassword() {

  const { token } = useParams();
  const navigate = useNavigate();


  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!password || !confirmPassword) {
      return "Please fill in both fields.";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, confirmPassword, }),
      });

      if (response.ok) {
        alert("Password reset successfully.");
        navigate("/login");
      } else {
        const data = await response.json().catch(() => ({}));
        setError(
          data.message || "This reset link is invalid or has expired."
        );
      }
    } catch (err) {
      setError("Unable to reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rp-page">
      <div className="rp-card">
        <div className="rp-brandmark" aria-hidden="true">
          <svg viewBox="0 0 120 60" className="rp-brandmark-svg">
            <path d="M20 46 C20 20, 40 10, 40 10" />
            <path d="M100 46 C100 20, 80 10, 80 10" />
            <line x1="40" y1="46" x2="80" y2="46" />
            <circle cx="60" cy="46" r="8" />
          </svg>
        </div>
        <p className="rp-eyebrow">Season 2 &middot; Rise &amp; Rebuild</p>

        <h1 className="rp-title">Reset Your Password</h1>
        <p className="rp-subtitle">Create a new password for your account.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="rp-field mb-3">
            <label htmlFor="rp-password" className="rp-label form-label">
              New Password
            </label>
            <div className="rp-input-wrap">
              <input
                id="rp-password"
                type={showPassword ? "text" : "password"}
                className={`form-control rp-input${error ? " rp-input-error" : ""
                  }`}
                placeholder="Enter new password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                autoComplete="new-password"
                disabled={loading}
              />
              <button
                type="button"
                className="rp-eye-btn"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
          </div>

          <div className="rp-field mb-2">
            <label htmlFor="rp-confirm" className="rp-label form-label">
              Confirm Password
            </label>
            <div className="rp-input-wrap">
              <input
                id="rp-confirm"
                type={showConfirm ? "text" : "password"}
                className={`form-control rp-input${error ? " rp-input-error" : ""
                  }`}
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(ev) => setConfirmPassword(ev.target.value)}
                autoComplete="new-password"
                disabled={loading}
              />
              <button
                type="button"
                className="rp-eye-btn"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                <EyeIcon open={showConfirm} />
              </button>
            </div>
          </div>

          {error && (
            <div className="rp-error" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn rp-submit-btn w-100"
            disabled={loading}
          >
            {loading ? (
              <span className="rp-btn-loading">
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Resetting&hellip;
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <div className="rp-back-wrap">
          <a
            href="/login"
            className="rp-back-link"
            onClick={() => navigate("/login")}
          >
            &larr; Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}

function EyeIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M3 3l18 18M10.6 10.7a3 3 0 0 0 4.2 4.2M6.6 6.8C4.4 8.2 2.9 10.2 2 12c0 0 3.5 7 10 7 2 0 3.7-.6 5.1-1.5M9.9 5.2A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7-.5 1-1.3 2.3-2.4 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
