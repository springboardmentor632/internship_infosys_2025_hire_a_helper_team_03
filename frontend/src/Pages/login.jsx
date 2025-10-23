import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "", remember: false });
  const [error, setError] = useState("");
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
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      // Store token, user info, and login state in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', 'true');
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-container">
      <div className="main-card">
        {/* Left: Blue Welcome Section (Hidden on mobile) */}
        <div className="welcome-section" style={{ flex: 1.2, alignItems: 'flex-start', textAlign: 'left' }}>
          <div style={{ maxWidth: 420 }}>
            <h1 style={{ fontSize: 44, fontWeight: 800, marginBottom: 8, lineHeight: 1.1, color: '#fff' }}>
              Welcome Back<br />
              <span style={{ color: "#f472b6" }}>to HireHelper</span>
            </h1>
            <div style={{ fontSize: 16, marginBottom: 32, marginTop: 8, opacity: 0.9, color: '#fff' }}>
              Login to access your account
            </div>
          </div>
          <img
            src="/Illustration.png"
            alt="Login illustration for HireHelper"
            style={{ width: "100%", maxWidth: 420, marginTop: 24 }}
          />
        </div>

        {/* Right: Login Form Section */}
        <div className="form-section" style={{ flex: 1 }}>
          {/* Mobile Icon (Visible only on mobile) */}
          <div className="mobile-icon-container">
            📱
          </div>

          <div style={{ width: "100%", maxWidth: 340, margin: '0 auto' }}>
            <h2 className="title">Welcome Back</h2>
            <div className="subtitle">Sign in to continue</div>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="input-field full-width"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input-field full-width"
                required
              />
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              {error && (
                <div style={{ color: "red", marginBottom: 10, textAlign: "center" }}>{error}</div>
              )}
              <button type="submit" className="submit-btn">
                Sign In
              </button>
            </form>

            <div className="existing">
              Don't have an account?{' '}
              <span
                className="signIn"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}