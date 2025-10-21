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

      // Save email to localStorage for OTP page to access
      localStorage.setItem("email", formData.email);

      setSuccess("Account created successfully! Redirecting to OTP verification...");

      // Navigate to OTP verification page
      navigate("/verifyotp");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-container">
      <div className="main-card">
        {/* Left Section: Create Account Form */}
        <div className="form-section">
          <div style={{ width: "100%", maxWidth: 500, margin: "0 auto" }}>
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
          </div>
        </div>

        {/* Right Section: Welcome Illustration (Hidden on mobile) */}
        <div className="welcome-section" style={{ alignItems: "flex-start" }}>
          <div style={{ maxWidth: 420 }}>
            <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 8, lineHeight: 1.1, color: "#fff" }}>
              Welcome Back
              <br />
              <span style={{ color: "#EC4899" }}>to HireHelper</span>
            </h1>
            <div style={{ fontSize: 16, marginBottom: 32, marginTop: 8, opacity: 0.9, color: "#fff" }}>
              Signup for your account
            </div>
          </div>
          <div className="illustration-container" style={{ marginTop: 40, width: "100%", maxWidth: 400 }}>
            <img
              src="/Illustration.png"
              alt="Sign up illustration for HireHelper"
              className="illustration-img"
              style={{ maxWidth: "100%", height: "auto", display: "block", margin: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
