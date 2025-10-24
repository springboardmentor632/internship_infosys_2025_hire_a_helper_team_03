import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
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
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-container">
      <div className="login-card">
        {/* LEFT SIDE */}
        <div className="left-section">
          <h1 className="brand-title"> HireHelper</h1>
          <h3 className="headline">Connect. Help. Accomplish.</h3>
          <p className="subtext">
            Join thousands of users who find and offer help for everyday tasks
          </p>
          <ul className="features-list">
            <li>✅ Post tasks in minutes</li>
            <li>✅ Browse available opportunities</li>
            <li>✅ Real-time notifications</li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-section">
          <h2 className="title">Welcome back</h2>
          <p className="subtitle">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              required
            />

            <div className="form-options">
              <label>
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />{" "}
                Remember me
              </label>
              <span className="forgot">Forgot password?</span>
            </div>

            {error && <div className="error-msg">{error}</div>}

            <button type="submit" className="submit-btn">
              Sign In
            </button>

            <div className="signup-link">
              Don’t have an account?{" "}
              <span onClick={() => navigate("/signup")}>Sign up</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
