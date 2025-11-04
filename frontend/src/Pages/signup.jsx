import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      const res = await fetch("http://localhost:5000/api/auth/register", {
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
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      setSuccess("Account created successfully! Sign in to verify your account.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="main-card">
        {/* Left Section: Create Account Form */}
        <div className="form-section">
          <div style={{ width: "100%", maxWidth: 500, margin: '0 auto' }}>
            <h2 className="title">Create Account</h2>
            <p className="subtitle">Join the HireHelper community</p>

            <form onSubmit={handleSubmit}>
              {error && (
                <div style={{ color: "red", marginBottom: 10, textAlign: "center" }}>{error}</div>
              )}
              {success && (
                <div style={{ color: "green", marginBottom: 10, textAlign: "center" }}>{success}</div>
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
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input-field full-width"
                required
              />

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
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="existing">
              Already Have an Account?
              <span
                className="signIn"
                onClick={() => navigate("/signin")}
                style={{ cursor: "pointer" }}
              >
                Sign in
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Welcome Illustration (Hidden on mobile) */}
        <div className="welcome-section" style={{ alignItems: 'flex-start' }}>
          <div style={{ maxWidth: 420 }}>
            <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 8, lineHeight: 1.1, color: '#fff' }}>
              Welcome Back<br />
              <span style={{ color: '#EC4899' }}>to HireHelper</span>
            </h1>
            <div style={{ fontSize: 16, marginBottom: 32, marginTop: 8, opacity: 0.9, color: '#fff' }}>
              Signup for your account
            </div>
          </div>
          <div className="illustration-container" style={{ marginTop: 40, width: '100%', maxWidth: 400 }}>
            <img
              src="/Illustration.png"
              alt="Sign up illustration for HireHelper"
              className="illustration-img"
              style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}