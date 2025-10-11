
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
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-container" style={{ background: "#f3f3f3", minHeight: "100vh", padding: 20 }}>
      <div className="main-card" style={{ display: "flex", borderRadius: 24, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.08)", maxWidth: 1000, margin: "40px auto", minHeight: 500 }}>
        {/* Left: Blue Welcome Section */}
        <div style={{ background: "#2563eb", color: "#fff", flex: 1.2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "48px 32px", position: "relative" }}>
          <div style={{ maxWidth: 420 }}>
            <h1 style={{ fontSize: 44, fontWeight: 800, marginBottom: 8, lineHeight: 1.1 }}>
              Welcome Back<br />
              <span style={{ color: "#f472b6" }}>to HireHelper</span>
            </h1>
            <div style={{ fontSize: 16, marginBottom: 32, marginTop: 8, opacity: 0.9 }}>
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
        <div style={{ background: "#fff", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "48px 32px" }}>
          <div style={{ width: "100%", maxWidth: 340 }}>
            <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 4 }}>Login</h2>
            <div style={{ color: "#555", fontSize: 15, marginBottom: 24 }}>Enter your account details</div>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                style={{ width: "100%", padding: "14px 16px", borderRadius: 10, border: "none", background: "#f3f4f6", marginBottom: 18, fontSize: 16 }}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={{ width: "100%", padding: "14px 16px", borderRadius: 10, border: "none", background: "#f3f4f6", marginBottom: 10, fontSize: 16 }}
                required
              />
              <div style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  style={{ marginRight: 8 }}
                />
                <label htmlFor="remember" style={{ fontSize: 15, color: "#444" }}>Remember me</label>
              </div>
              {error && (
                <div style={{ color: "red", marginBottom: 10 }}>{error}</div>
              )}
              <button
                type="submit"
                style={{ width: "100%", background: "#2563eb", color: "#fff", border: "none", borderRadius: 12, padding: "14px 0", fontWeight: 600, fontSize: 17, marginBottom: 16, marginTop: 8, cursor: "pointer" }}
              >
                Sign In
              </button>
            </form>
            <div style={{ textAlign: "center", fontSize: 15, marginTop: 8 }}>
              Don't have an account ?{' '}
              <span
                style={{ color: "#2563eb", cursor: "pointer", fontWeight: 500 }}
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
