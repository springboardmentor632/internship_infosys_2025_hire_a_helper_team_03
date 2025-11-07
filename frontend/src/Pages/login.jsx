import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaHandshakeAngle } from "react-icons/fa6";
import OTPVerification from "../Components/OTPVerification";
import { API_ENDPOINTS } from "../config/api";
import "./signup.css";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "", remember: false });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOTPScreen, setShowOTPScreen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get success message from navigation state
  const successMessage = location.state?.message;

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
    setLoading(true);
    try {
      console.log('Attempting login with:', { 
        email: formData.email, 
        password: formData.password 
      });

      const res = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password 
        }),
      });

      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);
      
      if (!res.ok) {
        // Check if email verification is needed
        if (data.needsVerification) {
          setError("Email not verified. Sending OTP...");
          setUserEmail(data.email || formData.email);
          
          // Send OTP
          try {
            const otpRes = await fetch(API_ENDPOINTS.SEND_OTP, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: formData.email }),
            });
            const otpData = await otpRes.json();
            
            if (otpRes.ok) {
              setShowOTPScreen(true);
            } else {
              throw new Error(otpData.message || "Failed to send OTP");
            }
          } catch (otpErr) {
            setError(otpErr.message);
          }
          return;
        }
        throw new Error(data.message || "Login failed");
      }
      
      // Store token, user info, and login state in localStorage
      if (data.token) {
        console.log('Storing token and user data');
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', 'true');
        
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          // Dispatch custom event to notify sidebar of user login
          window.dispatchEvent(new Event('userLogin'));
        }
      }
      
      console.log('Navigating to dashboard');
      navigate("/dashboard");
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // If OTP screen should be shown, render OTP verification component
  if (showOTPScreen) {
    return (
      <OTPVerification
        email={userEmail}
        firstName={userFirstName}
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

        {/* Right Section: Login Form */}
        <div className="form-section">
          <div style={{ width: "100%", maxWidth: 448 }}>
            <h2 className="title">Welcome back</h2>
            <p className="subtitle">Sign in to your account to continue</p>

            <form onSubmit={handleSubmit}>
              {successMessage && (
                <div style={{ color: "#10B981", marginBottom: 16, textAlign: "center", fontSize: 14, padding: "10px", backgroundColor: "#D1FAE5", borderRadius: "8px" }}>
                  {successMessage}
                </div>
              )}
              {error && (
                <div style={{ color: "#EF4444", marginBottom: 16, textAlign: "center", fontSize: 14 }}>{error}</div>
              )}

              {/* Email Address */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  style={{ marginBottom: 0 }}
                  required
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#374151', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                  Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                    style={{ marginBottom: 0 }}
                    required
                  />
                  <span 
                    className="password-toggle-icon" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </span>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="checkbox-group" style={{ margin: 0 }}>
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <span 
                  onClick={() => navigate("/forgot-password")}
                  style={{ 
                    color: '#667eea', 
                    fontSize: 14, 
                    fontWeight: 600, 
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#5568d3'}
                  onMouseLeave={(e) => e.target.style.color = '#667eea'}
                >
                  Forgot Password?
                </span>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24">
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="existing">
              Don't have an account?
              <span className="signIn" onClick={() => navigate("/signup")}>
                Sign up
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}