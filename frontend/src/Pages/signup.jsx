import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaHandshakeAngle } from "react-icons/fa6";
import OTPVerification from "../Components/OTPVerification";
import { API_ENDPOINTS } from "../config/api";
import "./signup.css";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    agreeToTerms: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOTPScreen, setShowOTPScreen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!formData.agreeToTerms) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }
    setLoading(true);
    try {
      // Step 1: Register user (creates unverified account)
      const registerRes = await fetch(API_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });
      const registerData = await registerRes.json();
      if (!registerRes.ok) throw new Error(registerData.message || "Registration failed");
      
      // Step 2: Send OTP to email
      const otpRes = await fetch(API_ENDPOINTS.SEND_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
        }),
      });
      const otpData = await otpRes.json();
      if (!otpRes.ok) throw new Error(otpData.message || "Failed to send OTP");
      
      // Step 3: Show success and move to OTP verification screen
      setSuccess("Account created! OTP sent to your email.");
      setTimeout(() => {
        setShowOTPScreen(true);
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // If OTP screen should be shown, render OTP verification component
  if (showOTPScreen) {
    return (
      <OTPVerification
        email={formData.email}
        firstName={formData.firstName}
        onBack={() => setShowOTPScreen(false)}
      />
    );
  }

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
              <span style={{ fontWeight: 600, fontSize: '22px' }}>Helper</span>
            </div>
          </div>

          <div>
            <h1 className="welcome-text">Connect. Help. Accomplish.</h1>
            <p className="welcome-subtitle">
              Join thousands of users who find and offer help for everyday tasks
            </p>

            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span className="feature-text">Post tasks in minutes</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span className="feature-text">Browse available opportunities</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span className="feature-text">Real-time notifications</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Sign Up Form */}
        <div className="form-section">
          <div style={{ width: "100%", maxWidth: 448 }}>
            <h2 className="title">Create Account</h2>
            <p className="subtitle">Sign up to your account to continue</p>

            <form onSubmit={handleSubmit}>
              {error && (
                <div style={{ color: "#EF4444", marginBottom: 16, textAlign: "center", fontSize: 14 }}>{error}</div>
              )}
              {success && (
                <div style={{ color: "#10B981", marginBottom: 16, textAlign: "center", fontSize: 14 }}>{success}</div>
              )}

              {/* First Name & Last Name */}
              <div className="form-row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              {/* Email Address */}
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="input-field full-width"
                required
              />

              {/* Phone Number */}
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="input-field full-width"
                required
              />

              {/* Password */}
              <div className="password-input-wrapper full-width">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <span 
                  className="password-toggle-icon" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </span>
              </div>

              {/* Terms & Conditions Checkbox */}
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="terms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <label htmlFor="terms">
                  I agree to <span className="link">Terms & Conditions</span>
                </label>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24">
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="existing">
              Already have an account?
              <span className="signIn" onClick={() => navigate("/signin")}>
                Sign In
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}