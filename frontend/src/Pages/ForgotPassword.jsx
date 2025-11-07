import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHandshakeAngle, FaArrowLeft } from "react-icons/fa6";
import { API_ENDPOINTS } from "../config/api";
import "./signup.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(API_ENDPOINTS.FORGOT_PASSWORD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send reset code");
      }

      setSuccess("Reset code sent to your email!");
      
      // Redirect to reset password page after 1.5 seconds
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="main-card">
        {/* Left Section: Welcome & Features */}
        <div className="welcome-section">
          <div className="logo-container">
            <div className="logo-icon">
              <FaHandshakeAngle className="text-white text-2xl" />
            </div>
            <div className="logo-text">
              <span style={{ fontWeight: 700 }}>Hire</span>
              <span style={{ fontWeight: 600, fontSize: "22px" }}>Helper</span>
            </div>
          </div>

          <div>
            <h1 className="welcome-text">Reset Your Password</h1>
            <p className="welcome-subtitle">
              Enter your email address and we'll send you a code to reset your password
            </p>

            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span className="feature-text">Secure password reset</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span className="feature-text">OTP verification</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span className="feature-text">Quick & easy process</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Forgot Password Form */}
        <div className="form-section">
          <div style={{ width: "100%", maxWidth: 448 }}>
            <h2 className="title">Forgot Password?</h2>
            <p className="subtitle">
              No worries! Enter your email and we'll send you a reset code
            </p>

            <form onSubmit={handleSubmit}>
              {error && (
                <div
                  style={{
                    color: "#EF4444",
                    marginBottom: 16,
                    textAlign: "center",
                    fontSize: 14,
                    padding: "10px",
                    backgroundColor: "#FEE2E2",
                    borderRadius: "8px",
                  }}
                >
                  {error}
                </div>
              )}
              {success && (
                <div
                  style={{
                    color: "#10B981",
                    marginBottom: 16,
                    textAlign: "center",
                    fontSize: 14,
                    padding: "10px",
                    backgroundColor: "#D1FAE5",
                    borderRadius: "8px",
                  }}
                >
                  {success}
                </div>
              )}

              {/* Email Address */}
              <div style={{ marginBottom: 24 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#374151",
                    marginBottom: 8,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  style={{ marginBottom: 0 }}
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    <svg
                      className="animate-spin"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        style={{ opacity: 0.25 }}
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        style={{ opacity: 0.75 }}
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending Code...
                  </span>
                ) : (
                  "Send Reset Code"
                )}
              </button>
            </form>

            <div className="existing">
              <span
                className="signIn"
                onClick={() => navigate("/signin")}
                style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}
              >
                <FaArrowLeft size={14} />
                Back to Sign In
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
