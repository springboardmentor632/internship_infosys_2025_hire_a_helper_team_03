import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaHandshakeAngle } from "react-icons/fa6";
import { API_ENDPOINTS } from "../config/api";
import "../Pages/signup.css";

export default function OTPVerification({ email, firstName, onBack }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

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
    
    if (newOtp.every(char => !isNaN(char))) {
      setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);
      inputRefs.current[Math.min(newOtp.length, 5)]?.focus();
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    
    if (otpValue.length !== 6) {
      setError("Please enter complete 6-digit OTP");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(API_ENDPOINTS.VERIFY_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      setSuccess("Email verified successfully! Redirecting to login...");
      
      setTimeout(() => {
        navigate("/signin", {
          state: { message: "Email verified successfully! Please sign in." },
        });
      }, 1500);
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
      const res = await fetch(API_ENDPOINTS.SEND_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }

      setSuccess("New OTP sent to your email!");
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
            <h1 className="welcome-text">Verify Your Email</h1>
            <p className="welcome-subtitle">
              Enter the 6-digit code sent to your email address
            </p>

            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span className="feature-text">Secure verification</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span className="feature-text">Quick & easy process</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span className="feature-text">10-minute validity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: OTP Form */}
        <div className="form-section">
          <div style={{ width: "100%", maxWidth: 448 }}>
            <h2 className="title">Enter OTP</h2>
            <p className="subtitle">
              We sent a code to <strong>{email}</strong>
            </p>

            <form onSubmit={handleVerifyOTP}>
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
                      e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
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
                    Resend OTP in <strong>{timer}s</strong>
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
                    {resendLoading ? "Sending..." : "Resend OTP"}
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
                  "Verify Email"
                )}
              </button>
            </form>

            <div className="existing">
              Want to use a different email?
              <span className="signIn" onClick={onBack} style={{ cursor: "pointer" }}>
                Go Back
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
