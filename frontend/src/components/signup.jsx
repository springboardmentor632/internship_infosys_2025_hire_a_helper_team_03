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
      // No alert, just show message below
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-container" style={{ background: '#f3f3f3', minHeight: '100vh', padding: 20 }}>
      <div className="main-card" style={{ display: 'flex', borderRadius: 24, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', maxWidth: 1000, margin: '40px auto', minHeight: 500 }}>
        {/* Left Section: Create Account Form */}
        <div className="form-section">
          <div>
            <h2 className="title">Create Account</h2>
            <p className="subtitle">Join the HireHelper community</p>
          </div>

          <form className="form-content" onSubmit={handleSubmit}>
            {error && (
              <div style={{ color: "red", marginBottom: 10 }}>{error}</div>
            )}
            {success && (
              <div style={{ color: "green", marginBottom: 10 }}>{success}</div>
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
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="input-field"
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
            />

            {/* Phone Number */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="input-field full-width"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input-field full-width"
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

            <button type="submit" className="submit-btn">
              Create Account
            </button>
          </form>

          <div className="existing">
            Already Have an Account?
            <span
              className="signIn"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              Sign in
            </span>
          </div>
          {success && (
            <div style={{ color: "green", marginTop: 10, textAlign: "center" }}>
              {success}
            </div>
          )}
        </div>

        {/* Right Section: Welcome Illustration */}
        <div className="welcome-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '60px', background: '#2B59FF', minHeight: '100%', width: '100%' }}>
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
