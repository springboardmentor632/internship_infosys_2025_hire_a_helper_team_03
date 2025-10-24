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
        <div className="flex flex-col justify-center items-center w-full bg-white p-8">
  <h2 className="text-3xl font-bold text-blue-800 mb-6">Create Account</h2>
  <form className="flex flex-col w-full max-w-sm space-y-4">
    <input
      type="text"
      placeholder="Full Name"
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
    <input
      type="email"
      placeholder="Email"
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
    <input
      type="password"
      placeholder="Password"
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
    <input
      type="password"
      placeholder="Confirm Password"
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
    <button
      type="submit"
      className="bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
    >
      Sign Up
    </button>
    <p className="text-sm text-gray-600 text-center">
      Already have an account?{" "}
      <a href="/login" className="text-blue-600 hover:underline">
        Sign In
      </a>
    </p>
  </form>
</div>

      </div>
    </div>
  );
}
