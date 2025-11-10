import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHandshakeAngle, FaEye, FaEyeSlash } from "react-icons/fa6";
import { API_ENDPOINTS } from "../config/api";
import "./signup.css";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const inputRefs = useRef([]);

  // Redirect if no email
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = pastedData.split("");

    if (newOtp.every((char) => !isNaN(char))) {
      setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);
      inputRefs.current[Math.min(newOtp.length, 5)]?.focus();
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter complete 6-digit code");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(API_ENDPOINTS.VERIFY_RESET_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      setSuccess("Code verified! Now set your new password.");
      setOtpVerified(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const otpValue = otp.join("");
      const res = await fetch(API_ENDPOINTS.RESET_PASSWORD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Password reset failed");
      }

      setSuccess("Password reset successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/signin", {
          state: { message: "Password reset successfully! Please sign in with your new password." },
        });
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (!canResend) return;

    setError("");
    setSuccess("");
    setResendLoading(true);

    try {
      const res = await fetch(API_ENDPOINTS.FORGOT_PASSWORD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to resend code");
      }

      setSuccess("New code sent to your email!");
      setTimer(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError(err.message);
    } finally {
      setResendLoading(false);
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
              {otpVerified
                ? "Enter your new password below"
                : "Enter the code sent to your email"}
            </p>

            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">{otpVerified ? "✓" : "1"}</div>
                <span className="feature-text">Verify reset code</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">{otpVerified ? "2" : "○"}</div>
                <span className="feature-text">Set new password</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span className="feature-text">Secure & encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Reset Password Form */}
        <div className="form-section">
          <div style={{ width: "100%", maxWidth: 448 }}>
            <h2 className="title">
              {otpVerified ? "Set New Password" : "Verify Reset Code"}
            </h2>
            <p className="subtitle">
              {otpVerified ? (
                "Choose a strong password"
              ) : (
                <>
                  Code sent to <strong>{email}</strong>
                </>
              )}
            </p>

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

            {!otpVerified ? (
              // OTP Verification Form
              <form onSubmit={handleVerifyOTP}>
                {/* OTP Input Boxes */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    justifyContent: "center",
                    marginBottom: 24,
                  }}
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      style={{
                        width: "50px",
                        height: "50px",
                        textAlign: "center",
                        fontSize: "24px",
                        fontWeight: "600",
                        border: "2px solid #E5E7EB",
                        borderRadius: "8px",
                        outline: "none",
                        transition: "all 0.2s",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#667eea";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(102, 126, 234, 0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#E5E7EB";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  ))}
                </div>

                {/* Timer / Resend */}
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  {!canResend ? (
                    <p style={{ color: "#6B7280", fontSize: 14 }}>
                      Resend code in <strong>{timer}s</strong>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={resendLoading}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#667eea",
                        fontWeight: "600",
                        cursor: "pointer",
                        fontSize: 14,
                        textDecoration: "underline",
                      }}
                    >
                      {resendLoading ? "Sending..." : "Resend Code"}
                    </button>
                  )}
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
                      Verifying...
                    </span>
                  ) : (
                    "Verify Code"
                  )}
                </button>
              </form>
            ) : (
              // Password Reset Form
              <form onSubmit={handleResetPassword}>
                {/* New Password */}
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
                    New Password
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="input-field"
                      style={{ marginBottom: 0 }}
                      required
                    />
                    <span
                      className="password-toggle-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash size={18} />
                      ) : (
                        <FaEye size={18} />
                      )}
                    </span>
                  </div>
                </div>

                {/* Confirm Password */}
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
                    Confirm Password
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input-field"
                      style={{ marginBottom: 0 }}
                      required
                    />
                    <span
                      className="password-toggle-icon"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash size={18} />
                      ) : (
                        <FaEye size={18} />
                      )}
                    </span>
                  </div>
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
                      Resetting Password...
                    </span>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            )}

            <div className="existing">
              Remember your password?
              <span
                className="signIn"
                onClick={() => navigate("/signin")}
                style={{ cursor: "pointer" }}
              >
                Sign In
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
